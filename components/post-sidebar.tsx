'use client';

function scrollToHeading(url: string) {
  const el = document.querySelector(url);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

export function PostSidebar({
  items,
  tags,
}: {
  items: { title: string; url: string }[];
  tags: string[];
}) {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-24 space-y-6">
        {items?.length > 0 && (
          <nav className="p-4 border border-white/10 rounded-lg">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
              On this page
            </p>
            <ul className="space-y-2">
              {items.map((item) => (
                <li key={item.url}>
                  <a href={item.url} className="text-sm text-muted-foreground hover:text-purple-400 block" onClick={(e) => { e.preventDefault(); scrollToHeading(item.url); }}>
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {tags?.length > 0 && (
          <div className="p-4 border border-white/10 rounded-lg">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
              Keywords
            </p>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag} className="text-xs px-3 py-1 rounded-full bg-purple-400/10 text-purple-400 border border-purple-400/20">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}