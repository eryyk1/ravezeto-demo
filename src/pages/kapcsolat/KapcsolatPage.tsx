import InnerPageHero from '../../components/pages/InnerPageHero';
import PageSection from '../../components/pages/PageSection';
import SectionShell from '../../components/shell/SectionShell';
import PremiumButton from '../../components/home/PremiumButton';
import { StaggerGrid, StaggerItem } from '../../components/pages/StaggerReveal';
import {
  kapcsolatDetails,
  kapcsolatForm,
  kapcsolatHero,
  kapcsolatImpresszum,
  kapcsolatMap,
} from '../../content/kapcsolat';
import './kapcsolat.css';

const nextSteps = [
  { step: '1', text: 'Kitölti az űrlapot vagy felhív minket.' },
  { step: '2', text: '1–2 munkanapon belül visszajelzünk.' },
  { step: '3', text: 'Személyes konzultációt egyeztetünk.' },
] as const;

export default function KapcsolatPage() {
  return (
    <div className="page kapcsolat-page">
      <InnerPageHero
        label={kapcsolatHero.label}
        title={kapcsolatHero.title}
        intro={kapcsolatHero.intro}
        accent="contact"
      />

      <SectionShell tone="green-brand" density="tight">
        <div className="content-wrap kapcsolat-hero-cta">
          <p>Kérjen ajánlatot tanácsadásra, képzésre vagy a Mentally termékre.</p>
          <PremiumButton to="#kapcsolat-form" variant="solid">
            Üzenet küldése
          </PremiumButton>
        </div>
      </SectionShell>

      <PageSection tone="warm-white" accent>
        <StaggerGrid className="kapcsolat-grid">
          {kapcsolatDetails.map((block) => (
            <StaggerItem key={block.title} className="kapcsolat-card">
              <h2>{block.title}</h2>
              {block.lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
              {'links' in block &&
                block.links?.map((link) => (
                  <p key={link.href}>
                    <a href={link.href}>{link.label}</a>
                  </p>
                ))}
            </StaggerItem>
          ))}
        </StaggerGrid>
      </PageSection>

      <PageSection tone="stone" id="kapcsolat-form">
        <div className="kapcsolat-form-layout">
          <div className="kapcsolat-form-section__head">
            <h2 className="page-section__title">{kapcsolatForm.title}</h2>
            <p className="page-section__lead">{kapcsolatForm.intro}</p>
            <ol className="kapcsolat-steps">
              {nextSteps.map((s) => (
                <li key={s.step}>
                  <span>{s.step}</span>
                  {s.text}
                </li>
              ))}
            </ol>
          </div>
          <form className="kapcsolat-form" action={kapcsolatForm.action} method="POST">
            {kapcsolatForm.fields.map((field) => (
              <label key={field.name} className="kapcsolat-form__field">
                <span>
                  {field.label}
                  {field.required && ' *'}
                </span>
                {field.type === 'textarea' ? (
                  <textarea name={field.name} required={field.required} rows={5} />
                ) : (
                  <input type={field.type} name={field.name} required={field.required} />
                )}
              </label>
            ))}
            <button type="submit" className="kapcsolat-form__submit">
              {kapcsolatForm.submit}
            </button>
          </form>
        </div>
      </PageSection>

      <PageSection tone="warm-white" title={kapcsolatMap.title} lead={kapcsolatMap.address}>
        <div className="kapcsolat-map">
          <iframe
            title="Rávezető iroda térképe"
            src={kapcsolatMap.embedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </PageSection>

      <SectionShell tone="stone" density="tight">
        <div className="content-wrap">
          <h2 className="page-section__title">{kapcsolatImpresszum.title}</h2>
          <div className="kapcsolat-impresszum">
            {kapcsolatImpresszum.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
      </SectionShell>
    </div>
  );
}
