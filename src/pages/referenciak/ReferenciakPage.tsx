import InnerPageHero from '../../components/pages/InnerPageHero';
import PageSection from '../../components/pages/PageSection';
import SectionLabel from '../../components/typography/SectionLabel';
import { StaggerGrid, StaggerItem } from '../../components/pages/StaggerReveal';
import { caseStudyLogoMap } from '../../content/partners';
import {
  referenciakCategories,
  referenciakClientLogos,
  referenciakHero,
  referenciakPartners,
} from '../../content/referenciak';
import './referenciak.css';

export default function ReferenciakPage() {
  return (
    <div className="page referenciak-page">
      <InnerPageHero
        label={referenciakHero.label}
        title={referenciakHero.title}
        intro={referenciakHero.intro}
        accent="cases"
      />

      <PageSection tone="warm-white" label="Partnereink" title="Együttműködőink" accent>
        <StaggerGrid className="referenciak-logo-wall">
          {referenciakClientLogos.map((item) => (
            <StaggerItem key={item.slug} className="referenciak-logo-wall__item">
              <img src={item.logo} alt={item.name} loading="lazy" />
            </StaggerItem>
          ))}
        </StaggerGrid>
      </PageSection>

      {referenciakCategories.map((cat, i) => (
        <PageSection
          key={cat.id}
          tone={i % 2 === 0 ? 'stone' : 'warm-white'}
          id={cat.id}
          accent={i % 2 === 0}
        >
          <div className="referenciak-category__head">
            <img src={cat.illustration} alt="" aria-hidden="true" />
            <div>
              <SectionLabel>{cat.title}</SectionLabel>
              <h2 className="page-section__title">{cat.title}</h2>
            </div>
          </div>
          <StaggerGrid className="referenciak-cases">
            {cat.cases.map((c) => {
              const logo = caseStudyLogoMap[c.client];
              return (
                <StaggerItem key={`${c.client}-${c.year}`} className="referenciak-case">
                  {logo && (
                    <div className="referenciak-case__logo">
                      <img src={logo} alt="" aria-hidden="true" loading="lazy" />
                    </div>
                  )}
                  <header>
                    <h3>{c.client}</h3>
                    <span className="referenciak-case__year">{c.year}</span>
                  </header>
                  <p>{c.text}</p>
                </StaggerItem>
              );
            })}
          </StaggerGrid>
        </PageSection>
      ))}

      <PageSection tone="green-forest" label="Intézményi partnerek" title="Logóink és partnereink" accent>
        <StaggerGrid className="referenciak-partners">
          {referenciakPartners.map((partner) => (
            <StaggerItem key={partner.id} className="referenciak-partners__item">
              <img src={partner.logo} alt={partner.name} loading="lazy" />
            </StaggerItem>
          ))}
        </StaggerGrid>
      </PageSection>
    </div>
  );
}
