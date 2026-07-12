import { StaggerGrid, StaggerItem } from '../pages/StaggerReveal';
import type { ReferenciakReference } from '../../pages/referenciak/referenciakContent';
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
            <h3 className="reference-featured__name">{item.name}</h3>
          </article>
        </StaggerItem>
      ))}
    </StaggerGrid>
  );
}
