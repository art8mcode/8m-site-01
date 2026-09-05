'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Pause, Play } from 'lucide-react';
import type { Work } from '../site-data';
export function ProjectMedia({ media }: { media: NonNullable<Work['media']> }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries[0].isIntersecting;
        if (visible) setNear(true);
        if (!visible || reduced.matches) el.pause();
        else el.play().catch(() => {});
      },
      { rootMargin: '100px' },
    );
    observer.observe(el);
    const stop = () => {
      if (reduced.matches) el.pause();
    };
    reduced.addEventListener('change', stop);
    return () => {
      observer.disconnect();
      reduced.removeEventListener('change', stop);
    };
  }, []);
  if (media.type === 'image' || failed)
    return (
      <Image
        src={media.type === 'image' ? media.src : media.poster}
        alt={media.alt}
        fill
        unoptimized
        sizes="(max-width: 700px) 90vw, 45vw"
      />
    );
  return (
    <>
      <video
        ref={ref}
        src={near ? media.src : undefined}
        poster={media.poster}
        muted
        playsInline
        loop
        preload="none"
        aria-label={media.alt}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => setFailed(true)}
      />
      <button
        className="media-control"
        aria-label={playing ? 'Призупинити відео' : 'Відтворити відео'}
        onClick={() => {
          const el = ref.current;
          if (el) {
            if (el.paused) el.play().catch(() => setFailed(true));
            else el.pause();
          }
        }}
      >
        {playing ? <Pause size={16} /> : <Play size={16} />}
      </button>
    </>
  );
}
