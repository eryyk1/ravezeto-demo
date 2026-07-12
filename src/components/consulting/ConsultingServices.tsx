import PremiumButton from '../home/PremiumButton';
import { StaggerGrid, StaggerItem } from '../pages/StaggerReveal';
import type { tanacsadasServices } from '../../content/tanacsadas';
import './ConsultingServices.css';

type ConsultingServicesProps = {
  services: typeof tanacsadasServices;
};

export default function ConsultingServices({ services }: ConsultingServicesProps) {
  return (
    <StaggerGrid className="consulting-services">
      {services.map((service, index) => (
        <StaggerItem key={service.id}>
          <article
            id={service.id}
            className={`consulting-services__item${index % 2 === 1 ? ' consulting-services__item--reverse' : ''}`}
          >
            <div className="consulting-services__copy">
              <span className="consulting-services__index">{service.index}</span>
              <p className="consulting-services__label">{service.label}</p>
              <h3>{service.title}</h3>
              <p className="consulting-services__intro">{service.intro}</p>
              {'detail' in service && service.detail && (
                <p className="consulting-services__detail">{service.detail}</p>
              )}
              <ul className="consulting-services__problems">
                {service.problems.map((problem) => (
                  <li key={problem}>{problem}</li>
                ))}
              </ul>
              <PremiumButton to={service.link} variant="outline">
                {service.cta}
              </PremiumButton>
            </div>

            <figure className="consulting-services__visual">
              <img src={service.visual} alt="" loading="lazy" decoding="async" aria-hidden="true" />
            </figure>
          </article>
        </StaggerItem>
      ))}
    </StaggerGrid>
  );
}
