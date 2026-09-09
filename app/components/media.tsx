'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import type { Work } from '../site-data';
export function ProjectMedia({ media }: { media: NonNullable<Work['media']> }) {
  const ref = useRef<HTMLVideoElement>(null);
  const inView = useRef(false);
  const [near, setNear] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries[0].isIntersecting;
        inView.current = visible;
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
  useEffect(() => {
    if (
      near &&
      inView.current &&
      !matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      ref.current?.play().catch(() => {});
    }
  }, [near]);
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
    <video
      ref={ref}
      src={near ? media.src : undefined}
      poster={media.poster}
      autoPlay
      muted
      playsInline
      loop
      preload="metadata"
      controls={false}
      disablePictureInPicture
      controlsList="nodownload nofullscreen noremoteplayback"
      aria-label={media.alt}
      onError={() => setFailed(true)}
    />
  );
}
