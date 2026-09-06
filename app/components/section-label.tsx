import type { ReactNode } from 'react';
import { Reveal } from './reveal';
export function SectionLabel({
  number,
  children,
  note,
}: {
  number: string;
  children: ReactNode;
  note?: string;
}) {
  return (
    <Reveal className="section-label">
      <span>
        {number} / {children}
      </span>
      {note && <span>{note}</span>}
    </Reveal>
  );
}
