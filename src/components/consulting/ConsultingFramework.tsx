import { tanacsadasFramework } from '../../content/tanacsadasFramework';
import './ConsultingFramework.css';

export default function ConsultingFramework() {
  return (
    <ol className="consulting-framework__steps">
      {tanacsadasFramework.steps.map((step, i) => (
        <li key={step.id} className="consulting-framework__step">
          <div className="consulting-framework__marker">
            <span className="consulting-framework__num">{step.step}</span>
            {i < tanacsadasFramework.steps.length - 1 && (
              <span className="consulting-framework__line" aria-hidden="true" />
            )}
          </div>

          <div className="consulting-framework__body">
            <div className="consulting-framework__top">
              <h3>{step.title}</h3>
              <span>{step.subtitle}</span>
            </div>
            <p className="consulting-framework__summary">{step.summary}</p>
            {'detail' in step && step.detail && (
              <p className="consulting-framework__detail">{step.detail}</p>
            )}
            {'pillars' in step && step.pillars && (
              <ul className="consulting-framework__pillars">
                {step.pillars.map((pillar) => (
                  <li key={pillar}>{pillar}</li>
                ))}
              </ul>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
