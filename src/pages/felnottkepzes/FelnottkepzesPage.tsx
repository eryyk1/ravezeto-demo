import InnerPageHero from '../../components/pages/InnerPageHero';
import PageSection from '../../components/pages/PageSection';
import { StaggerGrid, StaggerItem } from '../../components/pages/StaggerReveal';
import {
  felnottkepzesCategories,
  felnottkepzesContact,
  felnottkepzesHero,
  felnottkepzesLongIntro,
  felnottkepzesMotto,
  felnottkepzesProgrammeGroups,
  felnottkepzesReg,
} from '../../content/felnottkepzes';
import './felnottkepzes.css';

export default function FelnottkepzesPage() {
  return (
    <div className="page felnottkepzes-page">
      <InnerPageHero
        label={felnottkepzesHero.label}
        title={felnottkepzesHero.title}
        intro={felnottkepzesHero.intro}
        accent="education"
      />

      <PageSection
        tone="warm-white"
        label={felnottkepzesLongIntro.label}
        title={felnottkepzesLongIntro.title}
        accent
      >
        <div className="page-prose">
          {felnottkepzesLongIntro.paragraphs.map((p) => (
            <p key={p.slice(0, 30)}>{p}</p>
          ))}
        </div>
        <div className="felnottkepzes-reg">
          {Object.values(felnottkepzesReg).map((line) => (
            <span key={line} className="felnottkepzes-reg__badge">
              {line}
            </span>
          ))}
        </div>
      </PageSection>

      <PageSection tone="stone">
        <blockquote className="felnottkepzes-motto">{felnottkepzesMotto}</blockquote>
      </PageSection>

      <PageSection tone="warm-white" label="Képzési területek" title="Főbb képzési területeink" accent>
        <StaggerGrid className="felnottkepzes-categories">
          {felnottkepzesCategories.map((cat) => (
            <StaggerItem key={cat.title} className="felnottkepzes-categories__item">
              <div>
                <h3>{cat.title}</h3>
                <p>{cat.text}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </PageSection>

      <PageSection tone="stone" label="Programok" title="Referencia képzéseink">
        <div className="felnottkepzes-programmes">
          {felnottkepzesProgrammeGroups.map((group) => (
            <div key={group.title} className="felnottkepzes-programmes__group">
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection tone="warm-white" label="Kapcsolat" title="Elérhetőség">
        <div className="felnottkepzes-contact page-prose">
          <div>
            <h3>{felnottkepzesContact.customerService.title}</h3>
            <p>{felnottkepzesContact.customerService.address}</p>
            <p>{felnottkepzesContact.customerService.hours}</p>
          </div>
          <div>
            <h3>{felnottkepzesContact.office.title}</h3>
            <p>
              <a href={felnottkepzesContact.office.mapUrl} target="_blank" rel="noreferrer">
                {felnottkepzesContact.office.address}
                <br />
                {felnottkepzesContact.office.note}
              </a>
            </p>
          </div>
        </div>
      </PageSection>
    </div>
  );
}
