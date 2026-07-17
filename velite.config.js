import { defineConfig, s } from "velite";
import rehypeSlug from "rehype-slug";

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  mdx: {
    rehypePlugins: [rehypeSlug],
  },
  collections: {
    blog: {
      name: "Post",
      pattern: "blog/**/*.mdx",
      schema: s
        .object({
          title: s.string(),
          description: s.string(),
          date: s.isodate(),
          isPublished: s.boolean().default(true),
          cover: s.image().optional(),
          tags: s.array(s.string()).default([]),
          slug: s.path(),
          toc: s.toc(),
          content: s.mdx(),
        })
        .transform((data) => ({
          ...data,
          slug: data.slug.replace(/^blog\//, ""),
          permalink: `/blog/${data.slug.replace(/^blog\//, "")}`,
        })),
    },
  },
});