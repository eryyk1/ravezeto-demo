import InnerPageHero from '../../components/pages/InnerPageHero';
import PageSection from '../../components/pages/PageSection';
import RolunkBeliefs from '../../components/rolunk/RolunkBeliefs';
import { StaggerGrid, StaggerItem } from '../../components/pages/StaggerReveal';
import {
  rolunkClosing,
  rolunkHero,
  rolunkStory,
  rolunkTeam,
  rolunkTestimonials,
} from '../../content/rolunk';
import './rolunk.css';

export default function RolunkPage() {
  return (
    <div className="page rolunk-page">
      <InnerPageHero
        label={rolunkHero.label}
        title={rolunkHero.title}
        intro={rolunkHero.intro}
        accent="editorial"
      />

      <PageSection tone="warm-white" label={rolunkStory.label} title={rolunkStory.title} accent>
        <div className="rolunk-story__prose page-prose">
          <p>{rolunkStory.paragraph}</p>
        </div>
      </PageSection>

      <RolunkBeliefs />

      <PageSection tone="warm-white" label={rolunkTeam.label} title={rolunkTeam.title} accent>
        <StaggerGrid className="rolunk-team">
          {rolunkTeam.members.map((member) => (
            <StaggerItem
              key={member.id}
              className={`rolunk-team__card${member.featured ? ' rolunk-team__card--featured' : ''}`}
            >
              <img src={member.portrait} alt={member.name} className="rolunk-team__photo" loading="lazy" />
              <div className="rolunk-team__body">
                <h3>{member.name}</h3>
                <p>{member.bio}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </PageSection>

      <PageSection tone="green-forest" label="Ügyfeleink" title="Ügyfeleink mondták" accent>
        <StaggerGrid className="rolunk-testimonials">
          {rolunkTestimonials.map((t) => (
            <StaggerItem key={t.author} className="rolunk-testimonials__item">
              <blockquote>„{t.quote}"</blockquote>
              <footer>
                <strong>{t.author}</strong>
                <span>{t.role}</span>
              </footer>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </PageSection>

      <PageSection tone="stone">
        <p className="page-section__lead">{rolunkClosing}</p>
      </PageSection>
    </div>
  );
}
