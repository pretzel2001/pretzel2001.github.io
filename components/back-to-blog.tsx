'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function BackToBlogInner() {
  const searchParams = useSearchParams();
  const view = searchParams.get('view');
  const backHref = view === 'dev' ? '/?view=dev#blogs' : '/?view=normal#blogs';

  return (
    <Link
      href={backHref}
      className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
    >
      ← Back to blog
    </Link>
  );
}

export function BackToBlog() {
  return (
    <Suspense fallback={<div className="mb-8 h-5" />}>
      <BackToBlogInner />
    </Suspense>
  );
}