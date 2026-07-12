import type { kapcsolatDetails } from '../../pages/kapcsolat/kapcsolatContent';
import './KapcsolatDetails.css';

type KapcsolatDetailsProps = {
  blocks: typeof kapcsolatDetails;
};

export default function KapcsolatDetails({ blocks }: KapcsolatDetailsProps) {
  return (
    <div className="kapcsolat-grid">
      {blocks.map((block) => (
        <article key={block.id} className="kapcsolat-card">
          <h2>{block.title}</h2>
          {block.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
          {'links' in block &&
            block.links?.map((link) => (
              <p key={link.href}>
                <a
                  href={link.href}
                  {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {link.label}
                </a>
              </p>
            ))}
        </article>
      ))}
    </div>
  );
}
