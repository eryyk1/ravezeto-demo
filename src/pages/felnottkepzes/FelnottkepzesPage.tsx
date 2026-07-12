import FelnottkepzesHero from '../../components/training/FelnottkepzesHero';
import TrainingAreas from '../../components/training/TrainingAreas';
import TrainingProcess from '../../components/training/TrainingProcess';
import TrainingProgrammes from '../../components/training/TrainingProgrammes';
import PageCta from '../../components/pages/PageCta';
import PageSection from '../../components/pages/PageSection';
import {
  felnottkepzesCategories,
  felnottkepzesContact,
  felnottkepzesCredentials,
  felnottkepzesCta,
  felnottkepzesHero,
  felnottkepzesKeyMessage,
  felnottkepzesMotto,
  felnottkepzesProcess,
  felnottkepzesProgrammeCta,
  felnottkepzesProgrammeGroups,
  felnottkepzesReg,
} from '../../content/felnottkepzes';
import './felnottkepzes.css';

export default function FelnottkepzesPage() {
  return (
    <div className="page felnottkepzes-page">
      <FelnottkepzesHero
        label={felnottkepzesHero.label}
        title={felnottkepzesHero.title}
        intro={felnottkepzesHero.intro}
        image={felnottkepzesHero.image}
        imageAlt={felnottkepzesHero.imageAlt}
      />

      <PageSection tone="graphite" label={felnottkepzesKeyMessage.label} accent>
        <div className="felnottkepzes-key-message">
          <h2 className="felnottkepzes-key-message__title">{felnottkepzesKeyMessage.title}</h2>
          <blockquote className="felnottkepzes-key-message__quote">
            {felnottkepzesKeyMessage.text}
          </blockquote>
        </div>
      </PageSection>

      <PageSection tone="warm-white" label="Miért érdemes befektetni?" title="Kompetenciafejlesztés a szervezeti teljesítményért" accent>
        <div className="page-prose felnottkepzes-intro">
          {felnottkepzesCredentials.paragraphs.map((p) => (
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
        <TrainingAreas categories={felnottkepzesCategories} />
      </PageSection>

      <div className="page-divider" aria-hidden="true">
        <span className="page-divider__mark" />
      </div>

      <PageSection
        tone="stone"
        label={felnottkepzesProcess.label}
        title={felnottkepzesProcess.title}
        lead={felnottkepzesProcess.lead}
        accent
      >
        <TrainingProcess process={felnottkepzesProcess} />
      </PageSection>

      <PageSection tone="warm-white" label="Programok" title="Referencia képzéseink" accent>
        <TrainingProgrammes
          groups={felnottkepzesProgrammeGroups}
          ctaLabel={felnottkepzesProgrammeCta.label}
          ctaLink={felnottkepzesProgrammeCta.link}
        />
      </PageSection>

      <PageSection tone="stone" label="Kapcsolat" title="Elérhetőség">
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

      <PageSection tone="green-forest">
        <PageCta
          title={felnottkepzesCta.title}
          text={felnottkepzesCta.text}
          cta={felnottkepzesCta.cta}
          link={felnottkepzesCta.link}
        />
      </PageSection>
    </div>
  );
}
