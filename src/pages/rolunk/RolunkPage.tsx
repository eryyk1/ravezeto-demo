import PageSection from '../../components/pages/PageSection';
import PageCta from '../../components/pages/PageCta';
import RolunkBeliefs from '../../components/rolunk/RolunkBeliefs';
import RolunkHero from '../../components/rolunk/RolunkHero';
import RolunkTestimonials from '../../components/rolunk/RolunkTestimonials';
import RolunkTimeline from '../../components/rolunk/RolunkTimeline';
import { StaggerGrid, StaggerItem } from '../../components/pages/StaggerReveal';
import {
  rolunkClosing,
  rolunkCta,
  rolunkHero,
  rolunkStory,
  rolunkTeam,
  rolunkTestimonials,
  rolunkTimeline,
} from '../../content/rolunk';
import './rolunk.css';

export default function RolunkPage() {
  return (
    <div className="page rolunk-page">
      <RolunkHero
        label={rolunkHero.label}
        title={rolunkHero.title}
        intro={rolunkHero.intro}
        image={rolunkHero.image}
        imageAlt={rolunkHero.imageAlt}
      />

      <PageSection tone="warm-white" label={rolunkStory.label} title={rolunkStory.title} accent>
        <div className="rolunk-story">
          <div className="rolunk-story__prose page-prose">
            <p className="rolunk-story__pull">{rolunkStory.pullQuote}</p>
            {rolunkStory.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
            <aside className="rolunk-story__aside">
              <p className="rolunk-story__motto">{rolunkStory.motto}</p>
              <p className="rolunk-story__note">Gyorsabban, erősebben, magasabbra.</p>
            </aside>
          </div>
          <figure className="rolunk-story__figure">
            <img
              src={rolunkStory.image}
              alt={rolunkStory.imageAlt}
              loading="lazy"
              decoding="async"
            />
          </figure>
        </div>
      </PageSection>

      <RolunkBeliefs />

      <div className="page-divider" aria-hidden="true">
        <span className="page-divider__mark" />
      </div>

      <PageSection
        tone="stone"
        label={rolunkTimeline.label}
        title={rolunkTimeline.title}
        lead={rolunkTimeline.lead}
        accent
      >
        <RolunkTimeline items={rolunkTimeline.items} />
      </PageSection>

      <PageSection tone="warm-white" label={rolunkTeam.label} title={rolunkTeam.title} accent>
        <StaggerGrid className="rolunk-team">
          {rolunkTeam.members.map((member) => (
            <StaggerItem key={member.id}>
              <article className="rolunk-team__card">
                <img
                  src={member.portrait}
                  alt={member.name}
                  className="rolunk-team__photo"
                  style={member.portraitPosition ? { objectPosition: member.portraitPosition } : undefined}
                  loading="lazy"
                  decoding="async"
                />
                <div className="rolunk-team__body">
                  <h3>{member.name}</h3>
                  <p>{member.bio}</p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </PageSection>

      <PageSection tone="green-forest" label="Ügyfeleink" title="Ügyfeleink mondták" accent>
        <RolunkTestimonials items={rolunkTestimonials} />
      </PageSection>

      <PageSection tone="stone">
        <p className="page-section__lead rolunk-closing">{rolunkClosing}</p>
      </PageSection>

      <PageSection tone="warm-white">
        <PageCta
          title={rolunkCta.title}
          text={rolunkCta.text}
          cta={rolunkCta.cta}
          link={rolunkCta.link}
        />
      </PageSection>
    </div>
  );
}
