import { blog } from "@/.velite";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

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

  return (
    <article className="prose dark:prose-invert max-w-2xl mx-auto py-16">
      <h1>{post.title}</h1>
      <MDXRemote source={post.content} />
    </article>
  );
}