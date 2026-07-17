'use client';

import { useEffect, useId, useState } from 'react';

export function Mermaid({ chart }: { chart: string }) {
  const id = useId().replace(/:/g, '');
  const [svg, setSvg] = useState('');

  useEffect(() => {
    let cancelled = false;
    import('mermaid').then(async (mod) => {
      const mermaid = mod.default;
      mermaid.initialize({ startOnLoad: false, theme: 'dark' });
      const { svg } = await mermaid.render(`mermaid-${id}`, chart.trim());
      if (!cancelled) setSvg(svg);
    });
    return () => {
      cancelled = true;
    };
  }, [chart, id]);

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '100%',
        overflowX: 'auto',
        margin: '1.5rem 0',
      }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}