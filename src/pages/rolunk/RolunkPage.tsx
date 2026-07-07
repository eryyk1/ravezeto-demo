import InnerPageHero from '../../components/pages/InnerPageHero';
import PageSection from '../../components/pages/PageSection';
import { StaggerGrid, StaggerItem } from '../../components/pages/StaggerReveal';
import {
  rolunkHero,
  rolunkStory,
  rolunkTeam,
  rolunkTestimonials,
  rolunkTimeline,
  rolunkValues,
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
        <div className="rolunk-story">
          <div className="rolunk-story__prose page-prose">
            {rolunkStory.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <aside className="rolunk-story__aside">
            <p className="rolunk-story__motto">Citius · Altius · Fortius</p>
            <p className="rolunk-story__note">
              Emberközpontú szervezetfejlesztés — közös gondolkodással, elhivatott szakemberekkel.
            </p>
          </aside>
        </div>
      </PageSection>

      <div className="page-divider" aria-hidden="true">
        <span className="page-divider__mark" />
      </div>

      <PageSection tone="stone" label="Történet" title="Kulcsfontosságú mérföldkövek">
        <ol className="rolunk-timeline">
          {rolunkTimeline.map((item) => (
            <li key={item.year} className="rolunk-timeline__item">
              <span className="rolunk-timeline__year">{item.year}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </PageSection>

      <PageSection
        tone="warm-white"
        label={rolunkTeam.label}
        title={rolunkTeam.title}
        lead={rolunkTeam.intro}
        accent
      >
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

      <PageSection tone="stone" label={rolunkValues.label} title={rolunkValues.title}>
        <StaggerGrid className="rolunk-values">
          {rolunkValues.items.map((item) => (
            <StaggerItem key={item.title} className="rolunk-values__item">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </PageSection>

      <PageSection tone="green-forest" title="Partnereink mondták" accent>
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
    </div>
  );
}
