'use client';

import { useEffect, useState } from 'react';

const glyphs = '8mM0123456789#%&';

export function StartupIntro() {
  const [mark, setMark] = useState('··');
  const [state, setState] = useState<'active' | 'leaving' | 'done'>('active');

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let frame = 0;
    let leavingTimer = 0;
    let doneTimer = 0;
    const timer = window.setInterval(() => {
      frame += 1;
      const first =
        frame > 4 ? '8' : glyphs[Math.floor(Math.random() * glyphs.length)];
      const second =
        frame > 8 ? 'm' : glyphs[Math.floor(Math.random() * glyphs.length)];
      setMark(`${first}${second}`);

      if (frame === 10) {
        window.clearInterval(timer);
        setMark('8m');
        leavingTimer = window.setTimeout(() => setState('leaving'), 160);
        doneTimer = window.setTimeout(() => setState('done'), 580);
      }
    }, 72);

    return () => {
      window.clearInterval(timer);
      window.clearTimeout(leavingTimer);
      window.clearTimeout(doneTimer);
    };
  }, []);

  if (state === 'done') return null;

  return (
    <div
      className={`startup-intro ${state === 'leaving' ? 'is-leaving' : ''}`}
      aria-hidden="true"
    >
      <div className="startup-intro-inner">
        <span className="startup-intro-mark">{mark}</span>
        <span className="startup-intro-subtitle">
          marketing &amp; production
        </span>
      </div>
    </div>
  );
}

export function MobileBottomBlur() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      const remaining =
        document.documentElement.scrollHeight - innerHeight - scrollY;
      setVisible(scrollY > 24 && remaining > 12);
    };
    addEventListener('scroll', update, { passive: true });
    addEventListener('resize', update);
    return () => {
      removeEventListener('scroll', update);
      removeEventListener('resize', update);
    };
  }, []);

  return (
    <div
      className={`mobile-bottom-blur ${visible ? 'is-visible' : ''}`}
      aria-hidden="true"
    />
  );
}
