import { useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import HomeHeader from '../../../components/home/HomeHeader';
import HeroBackground from '../../../components/home/HeroBackground';
import HeroUniverse from '../../../components/home/HeroUniverse';
import PremiumButton from '../../../components/home/PremiumButton';
import { homeHero, homeTrustPoints } from '../../../content/home';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import '../home.css';
import './HomeHero.css';

const ease = [0.22, 1, 0.36, 1] as const;

const copyContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const labelItem = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

const headlineContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const headlineLine = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

const afterHeadline = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease, delay: 0.45 },
  },
};

export default function HomeHero() {
  const reduced = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);

  const onHeroMove = useCallback(
    (e: React.MouseEvent) => {
      if (reduced || !heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      heroRef.current.style.setProperty('--spot-x', `${x}%`);
      heroRef.current.style.setProperty('--spot-y', `${y}%`);
    },
    [reduced],
  );

  return (
    <section ref={heroRef} className="home-hero" id="hero" onMouseMove={onHeroMove}>
      <HeroBackground reduced={reduced} />
      <div className="home-hero__spotlight" aria-hidden="true" />

      <div className="home-hero__content">
        <HomeHeader />

        <div className="home-hero__body home-hero__wrap">
          <motion.div
            className="home-hero__copy"
            variants={reduced ? undefined : copyContainer}
            initial={reduced ? false : 'hidden'}
            animate="show"
          >
            <motion.p className="home-hero__label" variants={reduced ? undefined : labelItem}>
              {homeHero.label}
            </motion.p>

            <motion.h1 className="home-hero__title" variants={reduced ? undefined : headlineContainer}>
              {homeHero.headlineLines.map((line, i) => (
                <motion.span
                  key={line}
                  className={`home-hero__title-line${
                    i === homeHero.headlineLines.length - 1 ? ' home-hero__title-line--accent' : ''
                  }`}
                  variants={reduced ? undefined : headlineLine}
                >
                  {line}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p className="home-hero__intro" variants={reduced ? undefined : afterHeadline}>
              {homeHero.intro}
            </motion.p>

            <motion.div className="home-hero__actions" variants={reduced ? undefined : afterHeadline}>
              <PremiumButton to={homeHero.ctaPrimaryLink}>{homeHero.ctaPrimary}</PremiumButton>
              <PremiumButton to={homeHero.ctaSecondaryLink} variant="outline">
                {homeHero.ctaSecondary}
              </PremiumButton>
            </motion.div>

            <motion.ul
              className="home-hero__trust"
              initial={reduced ? false : 'hidden'}
              animate="show"
              variants={
                reduced
                  ? undefined
                  : {
                      hidden: {},
                      show: { transition: { staggerChildren: 0.1, delayChildren: 0.65 } },
                    }
              }
            >
              {homeTrustPoints.map((point, i) => (
                <motion.li
                  key={point.label}
                  variants={
                    reduced
                      ? undefined
                      : {
                          hidden: { opacity: 0, y: 10 },
                          show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
                        }
                  }
                  whileHover={reduced ? undefined : { y: -2 }}
                >
                  {i > 0 && <span className="home-hero__trust-sep" aria-hidden="true" />}
                  <motion.span
                    className="home-hero__trust-icon"
                    whileHover={reduced ? undefined : { scale: 1.08, y: -1 }}
                    transition={{ duration: 0.25, ease }}
                  >
                    <img src={point.icon} alt="" width={28} height={28} />
                  </motion.span>
                  <span className="home-hero__trust-label">{point.label}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div
            className="home-hero__visual"
            initial={reduced ? false : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease }}
          >
            <HeroUniverse />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
