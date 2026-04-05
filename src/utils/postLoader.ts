const postModules = import.meta.glob("../posts/*.mdx", { eager: true }) as Record<string, any>;

// Newest → oldest for the blog index listing
export const postsNewestFirst = Object.values(postModules)
  .map((mod: any) => mod.frontmatter)
  .filter(Boolean)
  .sort(
    (a: any, b: any) =>
      +new Date(b.date + "T00:00:00") - +new Date(a.date + "T00:00:00")
  );

// Oldest → newest for prev/next navigation within a post
export const sortedPosts = Object.values(postModules)
  .filter((mod: any) => mod.frontmatter?.slug)
  .sort(
    (a: any, b: any) =>
      +new Date(a.frontmatter.date + "T00:00:00") -
      +new Date(b.frontmatter.date + "T00:00:00")
  ) as any[];

export const postsBySlug: Record<string, any> = {};
for (const mod of sortedPosts) {
  postsBySlug[mod.frontmatter.slug] = mod;
}
