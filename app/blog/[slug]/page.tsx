import { blog } from "@/.velite";
import { notFound } from "next/navigation";
import * as runtime from "react/jsx-runtime";

function getMDXComponent(code: string) {
  const fn = new Function(String(code));
  return fn({ ...runtime }).default;
}

export function generateStaticParams() {
  return blog.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blog.find((p) => p.slug === slug);
  if (!post) return notFound();

  const mdxComponent = getMDXComponent(post.content);

  return (
    <article className="prose dark:prose-invert max-w-2xl mx-auto py-16">
      <h1>{post.title}</h1>
      {mdxComponent({})}
    </article>
  );
}