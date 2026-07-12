import { StaggerGrid, StaggerItem } from '../pages/StaggerReveal';
import type { ReferenciakReference } from '../../content/referenciak';
import './ReferenceFeatured.css';

type ReferenceFeaturedProps = {
  items: ReferenciakReference[];
};

export default function ReferenceFeatured({ items }: ReferenceFeaturedProps) {
  return (
    <StaggerGrid className="reference-featured">
      {items.map((item, index) => (
        <StaggerItem key={item.slug}>
          <article className="reference-featured__card">
            <span className="reference-featured__rank">{String(index + 1).padStart(2, '0')}</span>
            <figure className="reference-featured__logo">
              <img src={item.logo} alt={item.name} loading="lazy" decoding="async" />
            </figure>
            <div className="reference-featured__meta">
              <h3>{item.name}</h3>
              {item.description && <p>{item.description}</p>}
            </div>
          </article>
        </StaggerItem>
      ))}
    </StaggerGrid>
  );
}
