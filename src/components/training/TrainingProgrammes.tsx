import PremiumButton from '../home/PremiumButton';
import { StaggerGrid, StaggerItem } from '../pages/StaggerReveal';
import type { felnottkepzesProgrammeGroups } from '../../content/felnottkepzes';
import './TrainingProgrammes.css';

type TrainingProgrammesProps = {
  groups: typeof felnottkepzesProgrammeGroups;
  ctaLabel: string;
  ctaLink: string;
};

export default function TrainingProgrammes({ groups, ctaLabel, ctaLink }: TrainingProgrammesProps) {
  return (
    <StaggerGrid className="training-programmes">
      {groups.map((group) => (
        <StaggerItem key={group.id}>
          <section className="training-programmes__group">
            <header className="training-programmes__head">
              <span className="training-programmes__index">{group.index}</span>
              <h3>{group.title}</h3>
            </header>

            <ul className="training-programmes__list">
              {group.items.map((item) => (
                <li key={item.title} className="training-programmes__row">
                  <span className="training-programmes__dot" aria-hidden="true" />
                  <div className="training-programmes__meta">
                    <span className="training-programmes__title">{item.title}</span>
                    <span className="training-programmes__hours">{item.hours}</span>
                  </div>
                  <PremiumButton to={ctaLink} variant="outline">
                    {ctaLabel}
                  </PremiumButton>
                </li>
              ))}
            </ul>
          </section>
        </StaggerItem>
      ))}
    </StaggerGrid>
  );
}
