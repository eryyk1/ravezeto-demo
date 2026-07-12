import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SectionReveal from '../../../components/home/SectionReveal';
import { homeServices, homeServicesIntro } from '../../../content/home';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import '../home.css';
import './HomeServices.css';

const ease = [0.22, 1, 0.36, 1] as const;

export default function HomeServices() {
  const reduced = useReducedMotion();

  return (
    <SectionReveal className="home-services" id="services">
      <div className="content-wrap">
        <header className="home-section-head">
          <h2 className="home-section-head__title">
            {homeServicesIntro.title}
            {homeServicesIntro.titleLine2 ? (
              <>
                <br />
                {homeServicesIntro.titleLine2}
              </>
            ) : null}
          </h2>
        </header>

        <ul className="home-services__grid">
          {homeServices.map((service, i) => (
            <motion.li
              key={service.title}
              initial={reduced ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5%' }}
              transition={{ duration: 0.55, delay: i * 0.07, ease }}
            >
              <Link to={service.link} className="home-services__card">
                <span className="home-services__icon">
                  <img src={service.icon} alt="" width={36} height={36} loading="lazy" aria-hidden="true" />
                </span>
                <h3 className="home-services__name">{service.title}</h3>
                <p className="home-services__text">{service.text}</p>
                <span className="home-services__arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </SectionReveal>
  );
}
