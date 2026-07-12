import InnerPageHero from '../../components/pages/InnerPageHero';
import PageSection from '../../components/pages/PageSection';
import { kapcsolatDetails, kapcsolatForm, kapcsolatHero } from '../../content/kapcsolat';
import './kapcsolat.css';

export default function KapcsolatPage() {
  return (
    <div className="page kapcsolat-page">
      <InnerPageHero
        label={kapcsolatHero.label}
        title={kapcsolatHero.title}
        intro={kapcsolatHero.intro}
        accent="contact"
      />

      <PageSection tone="warm-white" label="Elérhetőség" title="Kapcsolattartási adatok" accent>
        <div className="kapcsolat-grid">
          {kapcsolatDetails.map((block) => (
            <article key={block.title} className="kapcsolat-card">
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
            </article>
          ))}
        </div>
      </PageSection>

      <PageSection tone="stone" label="Kapcsolatfelvétel" title={kapcsolatForm.title} id="kapcsolat-form">
        <form className="kapcsolat-form" action={kapcsolatForm.action} method="POST">
          {kapcsolatForm.fields.map((field) => (
            <label key={field.name} className="kapcsolat-form__field">
              {field.type === 'textarea' ? (
                <textarea
                  name={field.name}
                  required={field.required}
                  rows={5}
                  placeholder={field.placeholder}
                />
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  required={field.required}
                  placeholder={field.placeholder}
                />
              )}
            </label>
          ))}
          <button type="submit" className="kapcsolat-form__submit">
            {kapcsolatForm.submit}
          </button>
        </form>
      </PageSection>
    </div>
  );
}
