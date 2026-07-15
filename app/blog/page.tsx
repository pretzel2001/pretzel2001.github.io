import { blog } from "@/.velite";
import Link from "next/link";

export default function BlogPage() {
  const posts = blog.filter((p) => p.isPublished);

  return (
    <div className="max-w-2xl mx-auto py-16">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      <div className="space-y-6">
        {posts.map((post) => (
          <Link key={post.slug} href={post.permalink} className="block">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-muted-foreground">{post.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}