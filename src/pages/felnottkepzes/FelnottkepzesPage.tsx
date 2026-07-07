import InnerPageHero from '../../components/pages/InnerPageHero';
import PageCta from '../../components/pages/PageCta';
import PageSection from '../../components/pages/PageSection';
import SectionShell from '../../components/shell/SectionShell';
import { StaggerGrid, StaggerItem } from '../../components/pages/StaggerReveal';
import {
  felnottkepzesCategories,
  felnottkepzesHero,
  felnottkepzesIntro,
  felnottkepzesProgrammes,
  felnottkepzesReg,
} from '../../content/felnottkepzes';
import './felnottkepzes.css';

const journeySteps = [
  { step: '01', title: 'Igényfelmérés', text: 'Ügyfél igényeinek és tudásszintjének felmérése.' },
  { step: '02', title: 'Programtervezés', text: 'Személyre és szervezetre szabott képzési terv.' },
  { step: '03', title: 'Képzés', text: 'Minőségi, interaktív oktatás tapasztalt trénerekkel.' },
  { step: '04', title: 'Értékelés', text: 'Visszajelzés, tanúsítvány, továbbfejlesztési javaslatok.' },
] as const;

export default function FelnottkepzesPage() {
  return (
    <div className="page felnottkepzes-page">
      <InnerPageHero
        label={felnottkepzesHero.label}
        title={felnottkepzesHero.title}
        intro={felnottkepzesHero.intro}
        accent="education"
      />

      <PageSection tone="warm-white" accent>
        <p className="page-section__lead felnottkepzes-intro">{felnottkepzesIntro}</p>
        <div className="felnottkepzes-reg">
          {Object.values(felnottkepzesReg).map((line) => (
            <span key={line} className="felnottkepzes-reg__badge">
              {line}
            </span>
          ))}
        </div>
      </PageSection>

      <PageSection tone="stone" label="Tanulási út" title="A képzési folyamat">
        <ol className="felnottkepzes-journey">
          {journeySteps.map((s) => (
            <li key={s.step}>
              <span className="felnottkepzes-journey__step">{s.step}</span>
              <div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </PageSection>

      <PageSection tone="warm-white" label="Képzési területek" title="Főbb képzési területeink" accent>
        <StaggerGrid className="felnottkepzes-categories">
          {felnottkepzesCategories.map((cat) => (
            <StaggerItem key={cat.title} className="felnottkepzes-categories__item">
              <img src={cat.illustration} alt="" aria-hidden="true" />
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
          {felnottkepzesProgrammes.map((prog, i) => (
            <div key={prog.title} className="felnottkepzes-programmes__row">
              <span className="felnottkepzes-programmes__num">{String(i + 1).padStart(2, '0')}</span>
              <span className="felnottkepzes-programmes__title">{prog.title}</span>
              <span className="felnottkepzes-programmes__hours">{prog.hours}</span>
            </div>
          ))}
        </div>
      </PageSection>

      <SectionShell tone="green-deep">
        <div className="content-wrap">
          <PageCta
            title="Kérjen ajánlatot képzésre"
            text="Szervezetre szabott, minőségi felnőttképzési programok."
            cta="Kapcsolatfelvétel"
            link="/kapcsolat"
          />
        </div>
      </SectionShell>
    </div>
  );
}
