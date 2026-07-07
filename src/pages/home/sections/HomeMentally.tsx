import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SectionReveal from '../../../components/home/SectionReveal';
import { homeMentally } from '../../../content/home';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import '../home.css';
import './HomeMentally.css';

const ease = [0.22, 1, 0.36, 1] as const;

export default function HomeMentally() {
  const reduced = useReducedMotion();

  return (
    <SectionReveal className="home-mentally">
      <div className="home-mentally__bg" aria-hidden="true" />
      <div className="content-wrap home-mentally__grid">
        <div className="home-mentally__copy">
          <p className="home-label home-label--light">{homeMentally.brand}</p>
          <h2 className="home-mentally__title">{homeMentally.headline}</h2>
          <p className="home-mentally__text">{homeMentally.text}</p>
          <Link to={homeMentally.link} className="home-text-link home-text-link--light">
            {homeMentally.cta} <span aria-hidden="true">→</span>
          </Link>
        </div>

        <motion.div
          className="home-mentally__device"
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.85, ease }}
        >
          <motion.div
            className="home-mentally__device-frame"
            animate={reduced ? undefined : { y: [0, -6, 0] }}
            transition={reduced ? undefined : { duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <img
              src={homeMentally.productImage}
              alt=""
              width={640}
              height={480}
              loading="lazy"
              decoding="async"
            />
          </motion.div>
        </motion.div>
      </div>
    </SectionReveal>
  );
}
