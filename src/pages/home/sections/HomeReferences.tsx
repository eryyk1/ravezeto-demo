import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SectionReveal from '../../../components/home/SectionReveal';
import { homeReferencesIntro, homeReferencesMore } from '../../../content/home';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import '../home.css';
import './HomeReferences.css';

const ease = [0.22, 1, 0.36, 1] as const;

export default function HomeReferences() {
  const reduced = useReducedMotion();

  return (
    <SectionReveal className="home-references">
      <div className="content-wrap">
        <header className="home-section-head">
          <p className="home-label">{homeReferencesIntro.label}</p>
          <h2 className="home-section-head__title">{homeReferencesIntro.title}</h2>
        </header>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-5%' }}
          transition={{ duration: 0.65, ease }}
        >
          <Link to={homeReferencesMore.link} className="home-ref-card home-ref-card--cta">
            <p className="home-ref-card__cta-title">{homeReferencesMore.title}</p>
            <span className="home-ref-card__cta-link">
              {homeReferencesMore.cta} <span aria-hidden="true">→</span>
            </span>
          </Link>
        </motion.div>
      </div>
    </SectionReveal>
  );
}
