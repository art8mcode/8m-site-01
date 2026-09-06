import { ArrowUpRight } from 'lucide-react';
import type { Work } from '../site-data';
import { ProjectMedia } from './media';
export function ProductionExample({ example }: { example: Work }) {
  return (
    <figure className={`production-example production-${example.orientation}`}>
      <figcaption>
        <span className="meta">{example.category}</span>
        <span>{example.direction}</span>
      </figcaption>
      <div className="production-media">
        <ProjectMedia media={example.media} />
        {example.href && (
          <a
            href={example.href}
            className="work-arrow"
            aria-label={`Дізнатися більше: ${example.direction}`}
          >
            <ArrowUpRight />
          </a>
        )}
      </div>
    </figure>
  );
}
