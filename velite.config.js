import { defineConfig, s } from "velite";

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
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
          slug: s.path(),
          content: s.mdx(),
        })
        .transform((data) => ({ ...data, permalink: `/blog/${data.slug}` })),
    },
  },
});