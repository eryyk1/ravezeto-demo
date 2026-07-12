import { StaggerGrid, StaggerItem } from '../pages/StaggerReveal';
import type { palyazatokInternational } from '../../pages/palyazatok/palyazatokContent';
import './GrantsInternational.css';

type GrantsInternationalProps = {
  section: typeof palyazatokInternational;
};

export default function GrantsInternational({ section }: GrantsInternationalProps) {
  return (
    <div className="grants-international">
      <figure className="grants-international__visual" aria-hidden="true">
        <img src={section.visual} alt="" loading="lazy" decoding="async" />
      </figure>

      <StaggerGrid className="grants-international__list">
        {section.projects.map((project) => (
          <StaggerItem key={project.id}>
            <article className="grants-international__project">
              <header className="grants-international__head">
                <h3>{project.title}</h3>
                {'period' in project && project.period && (
                  <span className="grants-international__period">{project.period}</span>
                )}
              </header>

              {'description' in project && project.description && (
                <p>{project.description}</p>
              )}

              {'activities' in project && project.activities && (
                <ul>
                  {project.activities.map((activity) => (
                    <li key={activity}>{activity}</li>
                  ))}
                </ul>
              )}
            </article>
          </StaggerItem>
        ))}
      </StaggerGrid>
    </div>
  );
}
