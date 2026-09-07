import { Reveal } from './reveal';
import { SectionLabel } from './section-label';
import { ProductionExample } from './production-example';
import { works } from '../site-data';
import type { SiteCopy } from '../site-copy';

function TitleLines({
  lines,
  mutedLine,
}: {
  lines: string[];
  mutedLine?: number;
}) {
  return lines.map((line, index) => (
    <span key={line} className={index === mutedLine ? 'muted' : undefined}>
      {line}
      {index < lines.length - 1 && <br />}
    </span>
  ));
}

export function ServiceNarratives({ copy }: { copy: SiteCopy }) {
  const narratives = copy.narratives;
  return (
    <>
      <section id="marketing" className="section direction-section">
        <SectionLabel number="01" note={narratives.marketing.note}>
          {narratives.marketing.label}
        </SectionLabel>
        <div className="editorial-layout">
          <Reveal>
            <h2>
              <TitleLines lines={narratives.marketing.title} />
            </h2>
          </Reveal>
          <div className="editorial-copy">
            <Reveal>
              <p className="lead-copy">{narratives.marketing.paragraphs[0]}</p>
            </Reveal>
            <Reveal delay={80}>
              <p>{narratives.marketing.paragraphs[1]}</p>
              <p>{narratives.marketing.paragraphs[2]}</p>
            </Reveal>
            <Reveal delay={160}>
              <div className="tags competency-tags">
                {copy.services[0].tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
      <section id="reels" className="section reels-section">
        <SectionLabel number="02" note={narratives.reels.note}>
          {narratives.reels.label}
        </SectionLabel>
        <div className="editorial-layout reels-intro">
          <Reveal>
            <h2>
              <TitleLines lines={narratives.reels.title} />
            </h2>
          </Reveal>
          <div className="editorial-copy">
            <Reveal>
              <p className="lead-copy">{narratives.reels.paragraphs[0]}</p>
            </Reveal>
            <Reveal delay={80}>
              <p>{narratives.reels.paragraphs[1]}</p>
            </Reveal>
          </div>
        </div>
        <div className="production-grid">
          {works.map((example, i) => {
            const localized = copy.works[i];
            return (
              <Reveal key={example.id} delay={(i % 2) * 80}>
                <ProductionExample
                  example={{
                    ...example,
                    direction: localized.direction,
                    media: { ...example.media, alt: localized.alt },
                  }}
                />
              </Reveal>
            );
          })}
        </div>
      </section>
      <section id="combined" className="section combined-section">
        <SectionLabel number="03" note={narratives.combined.note}>
          {narratives.combined.label}
        </SectionLabel>
        <div className="editorial-layout">
          <Reveal>
            <h2>
              <TitleLines
                lines={narratives.combined.title}
                mutedLine={narratives.combined.mutedLine}
              />
            </h2>
          </Reveal>
          <Reveal className="editorial-copy">
            {narratives.combined.paragraphs.map((paragraph, index) => (
              <p
                key={paragraph}
                className={index === 0 ? 'lead-copy' : undefined}
              >
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>
        <Reveal className="combined-note">
          <p>{narratives.combined.noteBody}</p>
        </Reveal>
      </section>
    </>
  );
}
