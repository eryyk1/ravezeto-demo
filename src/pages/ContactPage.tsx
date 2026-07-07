import siteContent from '../data/siteContent.json';
import { PageHero, ContentSection } from '../components/PageSections';

export default function ContactPage() {
  const { company } = siteContent;

  return (
    <div className="contact-page">
      <PageHero
        title="Kapcsolat"
        subtitle="Keressen minket bizalommal az alábbi elérhetőségeinken!"
        accent="blue"
      />

      <section className="contact-cards">
        <article className="contact-card">
          <h2>Ügyfélszolgálat</h2>
          <p>{company.address}</p>
          <p>H-P: 9.00–16.00</p>
        </article>
        <article className="contact-card">
          <h2>Irodánk</h2>
          <p>{company.address}</p>
          <p>6. kapucsengő</p>
        </article>
        <article className="contact-card">
          <h2>Elérhetőségek</h2>
          <p>
            <a href={`tel:${company.phone.replace(/\s/g, '')}`}>{company.phone}</a>
          </p>
          <p>
            <a href={`mailto:${company.email}`}>{company.email}</a>
          </p>
          <p>{company.website}</p>
        </article>
        <article className="contact-card">
          <h2>Felnőttképzés</h2>
          <p>{company.trainingReg}</p>
        </article>
      </section>

      <ContentSection title="Impresszum">
        <p>
          Cégnév: {company.name}
          <br />
          Székhely: {company.address}
          <br />
          Telefon: {company.phone}
          <br />
          E-mail: {company.email}
        </p>
      </ContentSection>
    </div>
  );
}
