import SectionShell from '../shell/SectionShell';
import { rolunkBeliefs } from '../../content/rolunkBeliefs';
import SectionLabel from '../typography/SectionLabel';
import './RolunkBeliefs.css';

export default function RolunkBeliefs() {
  return (
    <SectionShell tone="stone" density="loose" className="rolunk-beliefs">
      <div className="content-wrap page-section">
        <header className="page-section__head rolunk-beliefs__head">
          <SectionLabel>{rolunkBeliefs.label}</SectionLabel>
          <h2 id="rolunk-beliefs-title" className="page-section__title">
            {rolunkBeliefs.title}
          </h2>
          <p className="page-section__lead">{rolunkBeliefs.intro}</p>
        </header>

        <div className="rolunk-beliefs__grid">
          {rolunkBeliefs.items.map((item, i) => (
            <article key={item.id} className="rolunk-beliefs__card">
              <span className="rolunk-beliefs__icon" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
