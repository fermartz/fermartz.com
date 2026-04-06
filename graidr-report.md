# Graidr bug report — three issues found while using the scorer in production

Hi — really enjoying graidr. I wired it up to [fermartz.com](https://github.com/fermartz/fermartz.com) and iterated my score from 82 to 90 over a few runs, which was a fun and genuinely useful exercise. Along the way I debugged a few things that I think are real bugs worth filing. Sharing them here as one consolidated report rather than three separate issues — happy to split them into individual GitHub issues if you prefer.

All findings are against `scorer/score.js`, `packages/cli/graidr-scorer.js`, and `app/leaderboard/page.tsx` as of commit `72da0b0`.

---

## Issue 1 — `potential_secrets` regex false-positives on `task-` package names

**Severity:** Medium — silently drops Safety score by a full 10 deterministic points with no way to fix it from the user's side.

### Evidence

In `scorer/score.js` (line ~101) and the identical line in `packages/cli/graidr-scorer.js` (line ~97):

```js
facts.potential_secrets = shCount(
  "git ls-files -- '*.ts' '*.tsx' '*.js' '*.jsx' '*.json' | xargs grep -Eil '(sk-|sk_live|AKIA|password\\s*=\\s*\"|api_key\\s*=\\s*\")' 2>/dev/null | wc -l"
)
```

The regex `sk-` has no word boundary, so it matches the substring inside any string containing `task-`, `mask-`, `disk-`, `risk-`, etc. Combined with `*.json` being in the file glob, this catches `package-lock.json` entries for extremely common transitive dependencies.

### Reproduction

Any repo that uses `remark-gfm` (directly or transitively — MDX pipelines, most Next.js content sites, etc.) will pull in `mdast-util-gfm-task-list-item` and `micromark-extension-gfm-task-list-item`, both of which land as string literals in `package-lock.json`. Grep confirms:

```bash
$ grep -Ein '(sk-|sk_live|AKIA|password\s*=\s*"|api_key\s*=\s*")' package-lock.json
5744:        "mdast-util-gfm-task-list-item": "^2.0.0",
5818:    "node_modules/mdast-util-gfm-task-list-item": {
5820:      "resolved": "https://registry.npmjs.org/mdast-util-gfm-task-list-item/-/mdast-util-gfm-task-list-item-2.0.0.tgz",
6083:        "micromark-extension-gfm-task-list-item": "^2.0.0",
6176:    "node_modules/micromark-extension-gfm-task-list-item": {
6178:      "resolved": "https://registry.npmjs.org/micromark-extension-gfm-task-list-item/-/micromark-extension-gfm-task-list-item-2.1.0.tgz",
```

Six matches in `ta`**`sk-`**`list-item`. Because the check at line ~124 of `score.js` is a binary cliff:

```js
if (facts.potential_secrets === 0) safety += 10
```

…one noisy match drops Safety by a full 10/100 points with no graduated penalty and no way for the user to fix it (the dependency is transitive through an MDX pipeline).

### Impact

- Any repo with MDX content gets a permanent -10 Safety hit it can't resolve.
- The flag shows up as `"Potential secret found in the codebase"` in `top_issues`, which sounds alarming but has zero signal.
- Makes deterministic scores unstable across the MDX-using vs non-MDX-using halves of the ecosystem.

### Suggested fix

Three small changes, any one of which would resolve it:

1. **Add word boundaries and/or start-of-line anchors** to the regex:
   ```js
   '(\\bsk-[a-zA-Z0-9]|\\bsk_live|\\bAKIA[0-9A-Z]{16}|\\bpassword\\s*=\\s*"|\\bapi_key\\s*=\\s*")'
   ```
   `AKIA` specifically has a documented format (`AKIA` + 16 uppercase alphanumeric chars) that's easy to match precisely.
2. **Exclude lockfiles** from the glob:
   ```js
   "git ls-files -- '*.ts' '*.tsx' '*.js' '*.jsx' '*.json' | grep -v 'package-lock\\.json\\|yarn\\.lock\\|pnpm-lock\\.yaml'"
   ```
3. **Tier the penalty** instead of using a binary cliff — e.g. `-2` per match up to `-10`, so a single false positive doesn't nuke the whole check.

I'd recommend (1) + (2) together.

---

## Issue 2 — Leaderboard RSC has no cache invalidation; scores submit successfully but never appear in the UI

**Severity:** High — the core promise of the product (submit a score, see it on the leaderboard) is broken in production.

### Evidence

`app/leaderboard/page.tsx` is a React Server Component:

```tsx
// app/leaderboard/page.tsx
export default async function LeaderboardPage() {
  const { data: scores } = await supabase
    .from('leaderboard')
    .select('*')
    .order('rank', { ascending: true })

  return <LeaderboardTable scores={scores ?? []} />
}
```

The file does **not** export `revalidate`, `dynamic`, or any ISR/cache configuration. There is no `revalidateTag` / `revalidatePath` call anywhere in the repo, no webhook from Supabase back to Vercel, and no `unstable_cache` wrapper.

With Next.js 15 App Router defaults on Vercel, this means:
- The page is **statically rendered at build time** and served from the full route cache.
- The Supabase client query runs once per deploy, baking its result into the HTML.
- New scores inserted into the `scores` table after deploy **never appear** on the leaderboard until the next Vercel deployment.

### Reproduction

1. Install graidr on a fresh repo via `npx graidr init`.
2. Commit, push, wait for the Action to complete successfully. Action log shows `graidr: done.` — submission succeeded, row is in Supabase.
3. Visit `https://graidr.tools/leaderboard`. New score is not there.
4. Wait an hour, revisit — still not there.
5. Only way to see the score: wait for graidr.tools itself to be redeployed.

I verified this by checking my own Action logs — submission clearly succeeds:

```
graidr: collecting facts...
graidr: computing deterministic scores...
graidr: sampling files...
graidr: scoring with gpt-4o...
  graidr — 87/100 · A
  ...
graidr: submitting score...
graidr: done.
```

`graidr: done.` only prints after `submitScore()` resolves without throwing. The row is in your DB. It just never gets rendered.

### Impact

- Every user who installs graidr expects to see their score on the leaderboard. Most will conclude the Action is silently broken and uninstall it.
- The hero on the landing page says **"Live · Updated continuously"**, which is inconsistent with the actual cache behavior. This is a trust issue for early users.
- Since there are no issues filed, I suspect most people are hitting this, assuming it's their setup, and walking away without saying anything.

### Suggested fix

The one-line fix is to opt the route out of the full-route cache:

```tsx
// app/leaderboard/page.tsx
export const dynamic = 'force-dynamic'  // or: export const revalidate = 0
```

`force-dynamic` renders fresh on every request. `revalidate = 60` would cache for 60s, which is a better balance if the leaderboard traffic is significant.

For the landing page hero score (if it reads the same data), apply the same config.

**Better long-term fix:** wrap the Supabase query in `unstable_cache` with a short revalidation window, and call `revalidateTag('leaderboard')` from the `submit-score` Edge Function after a successful insert. This gives you real-time updates with proper caching semantics.

---

## Issue 3 — PR comments link to `graidr.tools/repo/[owner]/[name]`, but this route does not exist

**Severity:** Low — broken link in user-facing UI.

### Evidence

`scorer/score.js` (and the identical CLI copy) emits a PR comment containing this link:

```js
`Scored with \`${ratedWith}\` · [graidr.tools](https://graidr.tools/repo/${owner}/${name}) · \`${(process.env.GITHUB_SHA || '').slice(0, 7)}\``,
```

But the `app/` directory in the graidr repo contains only:

```
app/page.tsx
app/leaderboard/page.tsx
app/docs/page.tsx
app/layout.tsx
```

There is no `app/repo/[owner]/[name]/page.tsx` or any dynamic segment routing to that URL. So every PR comment graidr posts contains a link that 404s.

### Impact

- Every successful scorer run on a PR posts a comment with a broken link.
- Users clicking through from the PR comment (the most natural discovery path) hit a 404 as their first experience of the web app.

### Suggested fix

Either:
1. **Build the route** — `app/repo/[owner]/[name]/page.tsx` that renders the latest score + history for a specific repo. This is arguably the most valuable view on the whole site.
2. **Point the link at the leaderboard instead** — `https://graidr.tools/leaderboard?highlight=${owner}/${name}` or similar, until the detail page exists.

Option 1 is ideal; option 2 is a one-line scorer patch.

---

## Minor observations (not bugs, just notes)

These aren't issues per se — just things I noticed while reading the code that you might want to be aware of:

### The `scores_commit_sha_unique` constraint is global, not per-repo

`supabase/schema.sql` defines `scores_commit_sha_unique` as a global unique constraint on `commit_sha`. This means:

- **Action re-runs on the same commit** (e.g. if a user is debugging the workflow itself) return `409 score for this commit SHA already exists` from the Edge Function.
- **Two forks of the same template repo** at the same initial SHA will race — the second one to push gets rejected.

Short SHAs are collision-resistant enough that global uniqueness probably works in practice, but the per-repo scoping (`unique(repo_id, commit_sha)`) is the more defensible choice.

### Schema migration `20260405000001_rename_dimensions.sql` renames three columns

`supabase/migrations/20260405000001_rename_dimensions.sql` renames:
- `code_score` → `structure_score`
- `security_score` → `safety_score`
- `ux_score` → `completeness_score`

If this migration hasn't been applied to the production Supabase project, the Edge Function's insert (which writes the new column names) would fail, and the leaderboard RSC would read `undefined` for the three dimension columns. Worth double-checking the production schema matches the migration state.

### README drift

`README.md` still documents the old 12-check Code/Security/UX taxonomy (lines 123-152). `SCORING.md` documents the current 15-check Structure/Safety/Completeness system. These two docs contradict each other.

### The GPT-4o subjective pass flags inline styles every run

Not a bug, but worth mentioning: the scorer's Phase 2 passes sampled files to GPT-4o, which consistently flags "inline styles are an anti-pattern" on any repo using inline styling — even though this is a legitimate architectural choice. Graidr's own frontend uses inline styles extensively (see `components/LeaderboardTable.tsx` and `app/leaderboard/page.tsx`), so graidr scoring graidr would flag itself.

Since this is a model behavior on sampled files, it's hard to fix directly, but you could add explicit prompt guidance like "Inline styles are a valid choice in some architectures — only flag them if the codebase inconsistently mixes inline and extracted styles" to reduce the noise.

---

## Summary

| # | Issue | Severity | Fix complexity |
|---|-------|----------|----------------|
| 1 | `sk-` regex false-positives via `task-` packages in lockfiles | Medium | 1-line regex fix |
| 2 | Leaderboard RSC has no cache invalidation | **High** | 1-line (`export const dynamic = 'force-dynamic'`) |
| 3 | PR comments link to `/repo/[owner]/[name]` but the route doesn't exist | Low | New route or link redirect |

Issue 2 is the important one — it's a show-stopper for the product's core loop that can be fixed in one line.

Happy to open individual GitHub issues for any of these if you prefer, or submit PRs for the one-line fixes (#1 and #2) if that's helpful.

Thanks for building this — it was fun to iterate against, and the deterministic half especially is a clever piece of engineering. The scorer is a solid kernel; most of these are downstream polish.

— [Fer](https://github.com/fermartz) / [fermartz.com](https://fermartz.com)
