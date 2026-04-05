import { describe, it, expect } from "vitest";
import { postsNewestFirst, sortedPosts, postsBySlug } from "./postLoader.ts";

describe("postLoader", () => {
  it("loads at least one post", () => {
    expect(postsNewestFirst.length).toBeGreaterThan(0);
    expect(sortedPosts.length).toBe(postsNewestFirst.length);
  });

  it("sorts postsNewestFirst in descending date order", () => {
    for (let i = 1; i < postsNewestFirst.length; i++) {
      const prev = +new Date(postsNewestFirst[i - 1].date);
      const curr = +new Date(postsNewestFirst[i].date);
      expect(prev).toBeGreaterThanOrEqual(curr);
    }
  });

  it("sorts sortedPosts in ascending date order (for prev/next)", () => {
    for (let i = 1; i < sortedPosts.length; i++) {
      const prev = +new Date(sortedPosts[i - 1].frontmatter.date);
      const curr = +new Date(sortedPosts[i].frontmatter.date);
      expect(prev).toBeLessThanOrEqual(curr);
    }
  });

  it("indexes every post by unique slug", () => {
    const slugs = sortedPosts.map((p) => p.frontmatter.slug);
    const unique = new Set(slugs);
    expect(unique.size).toBe(slugs.length);
    for (const slug of slugs) {
      expect(postsBySlug[slug]).toBeDefined();
    }
  });
});
