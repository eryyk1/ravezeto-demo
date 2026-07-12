import SectionShell from '../shell/SectionShell';
import { StaggerGrid, StaggerItem } from '../pages/StaggerReveal';
import { rolunkBeliefs } from '../../content/rolunkBeliefs';
import { rolunkValues } from '../../content/rolunk';
import SectionLabel from '../typography/SectionLabel';
import './RolunkBeliefs.css';

export default function RolunkBeliefs() {
  return (
    <SectionShell tone="graphite" density="loose" className="rolunk-beliefs">
      <div className="content-wrap page-section">
        <header className="page-section__head rolunk-beliefs__head">
          <SectionLabel>{rolunkBeliefs.label}</SectionLabel>
          <h2 id="rolunk-beliefs-title" className="page-section__title">
            {rolunkBeliefs.title}
          </h2>
          <p className="rolunk-beliefs__intro">{rolunkBeliefs.intro}</p>
        </header>

        <figure className="rolunk-beliefs__visual">
          <img src={rolunkValues.image} alt="Értékeink" loading="lazy" decoding="async" />
        </figure>

        <StaggerGrid className="rolunk-beliefs__sequence">
          {rolunkBeliefs.items.map((item, i) => (
            <StaggerItem key={item.id}>
              <article className={`rolunk-beliefs__row${i % 2 === 1 ? ' rolunk-beliefs__row--alt' : ''}`}>
                <span className="rolunk-beliefs__index" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="rolunk-beliefs__content">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </SectionShell>
  );
}
