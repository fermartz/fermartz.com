import type { ComponentType } from "react";

/** Frontmatter shape shared by every MDX blog post. */
export type Frontmatter = {
  title: string;
  date: string;
  slug: string;
  summary?: string;
  tags?: string[];
};

/** A loaded `*.mdx` module: the rendered component plus its frontmatter. */
export type PostModule = {
  default: ComponentType<{ components?: Record<string, unknown> }>;
  frontmatter: Frontmatter;
};

const postModules = import.meta.glob("../posts/*.mdx", { eager: true }) as Record<
  string,
  PostModule
>;

// Single source of truth for "valid" posts so the exported arrays below can't
// diverge in length: a post counts only if it has a frontmatter slug.
const validModules = Object.values(postModules).filter(
  (p): p is PostModule => Boolean(p?.frontmatter?.slug)
);

// Newest → oldest for the blog index listing
export const postsNewestFirst: Frontmatter[] = validModules
  .map((mod) => mod.frontmatter)
  .sort(
    (a, b) => +new Date(b.date + "T00:00:00") - +new Date(a.date + "T00:00:00")
  );

// Oldest → newest for prev/next navigation within a post
export const sortedPosts: PostModule[] = [...validModules].sort(
  (a, b) =>
    +new Date(a.frontmatter.date + "T00:00:00") -
    +new Date(b.frontmatter.date + "T00:00:00")
);

export const postsBySlug: Record<string, PostModule> = {};
for (const mod of sortedPosts) {
  postsBySlug[mod.frontmatter.slug] = mod;
}
