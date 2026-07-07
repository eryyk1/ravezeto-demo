import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SectionReveal from '../../../components/home/SectionReveal';
import { homeAbout } from '../../../content/home';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import './HomeAbout.css';

const ease = [0.22, 1, 0.36, 1] as const;

export default function HomeAbout() {
  const reduced = useReducedMotion();

  return (
    <SectionReveal className="home-about">
      <div className="home-about__grid">
        <motion.figure
          className="home-about__media"
          initial={reduced ? false : { opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.8, ease }}
        >
          <img src={homeAbout.image} alt="" width={800} height={600} loading="lazy" />
          <figcaption className="home-about__overlay">
            {homeAbout.overlayLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </figcaption>
        </motion.figure>

        <div className="home-about__content">
          <p className="home-label">{homeAbout.label}</p>
          <h2 className="home-about__title">{homeAbout.headline}</h2>
          <p className="home-about__text">{homeAbout.text}</p>
          <Link to={homeAbout.link} className="home-text-link">
            {homeAbout.cta} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </SectionReveal>
  );
}
