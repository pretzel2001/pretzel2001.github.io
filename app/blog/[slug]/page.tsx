import { blog } from "@/.velite";
import { notFound } from "next/navigation";
import * as runtime from "react/jsx-runtime";
import { Mermaid } from "@/components/mermaid";
import { PostSidebar } from "@/components/post-sidebar";
import { BackToBlog } from "@/components/back-to-blog";

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
    <div className="max-w-5xl mx-auto py-16 px-4">
      <BackToBlog />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-12 mt-6">
        <div>
          <h1 className="text-3xl font-bold mb-6">{post.title}</h1>
          <article className="prose dark:prose-invert max-w-none">
            {mdxComponent({ components: { Mermaid } })}
          </article>
        </div>

        <PostSidebar items={post.toc} tags={post.tags} />
      </div>
    </div>
  );
}