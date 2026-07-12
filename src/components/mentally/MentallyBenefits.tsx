import { StaggerGrid, StaggerItem } from '../pages/StaggerReveal';
import type { mentallyBenefits } from '../../pages/mentally/mentallyContent';
import './MentallyBenefits.css';

type MentallyBenefitsProps = {
  section: typeof mentallyBenefits;
};

export default function MentallyBenefits({ section }: MentallyBenefitsProps) {
  return (
    <div className="mentally-benefits">
      <StaggerGrid className="mentally-benefits__grid">
        {section.items.map((item) => (
          <StaggerItem key={item.id}>
            <article className="mentally-benefits__card">
              <h3 className="mentally-benefits__card-title">{item.title}</h3>
              <p className="mentally-benefits__card-text">{item.text}</p>
            </article>
          </StaggerItem>
        ))}
      </StaggerGrid>

      <div className="mentally-benefits__comparison">
        <figure className="mentally-benefits__figure">
          <figcaption className="mentally-benefits__figure-label">
            {section.comparison.beforeLabel}
          </figcaption>
          <div className="mentally-benefits__figure-frame">
            <img
              src={section.comparison.beforeImage}
              alt={section.comparison.beforeLabel}
              className="mentally-benefits__figure-image"
              loading="lazy"
              decoding="async"
            />
          </div>
        </figure>

        <figure className="mentally-benefits__figure mentally-benefits__figure--after">
          <figcaption className="mentally-benefits__figure-label">
            {section.comparison.afterLabel}
          </figcaption>
          <div className="mentally-benefits__figure-frame">
            <img
              src={section.comparison.afterImage}
              alt={section.comparison.afterLabel}
              className="mentally-benefits__figure-image"
              loading="lazy"
              decoding="async"
            />
          </div>
        </figure>
      </div>
    </div>
  );
}
