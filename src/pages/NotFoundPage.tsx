import PremiumButton from '../components/home/PremiumButton';
import DisplayHeading from '../components/typography/DisplayHeading';
import SectionLabel from '../components/typography/SectionLabel';
import './NotFoundPage.css';

export default function NotFoundPage() {
  return (
    <div className="page not-found-page">
      <section className="not-found-page__hero">
        <div className="not-found-page__bg" aria-hidden="true" />
        <div className="content-wrap not-found-page__inner">
          <SectionLabel>404</SectionLabel>
          <DisplayHeading as="h1" stagger={false}>
            Az oldal nem található
          </DisplayHeading>
          <p className="not-found-page__lead">
            A keresett oldal áthelyezésre került, törölve lett, vagy soha nem létezett. Térjen
            vissza a főoldalra, és folytassa a böngészést.
          </p>
          <PremiumButton to="/">Vissza a főoldalra</PremiumButton>
        </div>
      </section>
    </div>
  );
}
