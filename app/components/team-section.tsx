import Image from 'next/image';
import type { SiteCopy } from '../site-copy';
import { Reveal } from './reveal';
import { SectionLabel } from './section-label';

export function TeamSection({ copy }: { copy: SiteCopy }) {
  return (
    <section id="team" className="section team-section">
      <SectionLabel number="07" note={copy.teamSection.note}>
        {copy.teamSection.label}
      </SectionLabel>
      <Reveal className="team-heading">
        <h2>{copy.teamSection.title}</h2>
      </Reveal>
      <div className="team-grid">
        {copy.team.map((member, index) => (
          <Reveal key={member.image} delay={index * 70}>
            <article className="team-card">
              <div className="team-image-frame">
                <Image
                  src={member.image}
                  alt={member.imageAlt}
                  width={900}
                  height={900}
                  sizes="(max-width: 760px) 90vw, (max-width: 1050px) 45vw, 31vw"
                  unoptimized
                />
              </div>
              <div className="team-card-copy">
                <div className="team-card-meta meta">
                  <span>0{index + 1}</span>
                  <span>{copy.teamSection.cardMeta}</span>
                </div>
                <h3>{member.name}</h3>
                <p className="team-role">{member.role}</p>
                <p className="team-description">{member.description}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
