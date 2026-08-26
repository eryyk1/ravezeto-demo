import { Link } from 'react-router-dom';
import ClientFooter from '../components/client/ClientFooter';
import ScrollReveal from '../components/client/ScrollReveal';

export default function NotFoundPage() {
  return (
    <>
      <section className="hero-sub">
        <div className="wrap">
          <div className="kicker">404 · Az oldal nem található</div>
          <h1>Az oldal nem található</h1>
          <ScrollReveal as="p" className="lead">
            A keresett oldal áthelyezésre került, törölve lett, vagy soha nem létezett. Térjen
            vissza a főoldalra, és folytassa a böngészést.
          </ScrollReveal>
          <ScrollReveal>
            <Link to="/" className="btn">
              Vissza a főoldalra →
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <ClientFooter />
    </>
  );
}
