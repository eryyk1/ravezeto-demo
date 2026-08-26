import { useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import HomeHeader from '../../../components/home/HomeHeader';
import HeroBackground from '../../../components/home/HeroBackground';
import HeroUniverse from '../../../components/home/HeroUniverse';
import HeroDecorLines from '../../../components/home/HeroDecorLines';
import GoldMark from '../../../components/home/GoldMark';
import PremiumButton from '../../../components/home/PremiumButton';
import { homeHero, homeTrustPoints } from '../../../content/home';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import '../home.css';
import './HomeHero.css';

const ease = [0.22, 1, 0.36, 1] as const;

const headlineContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.1 } },
};

const headlineWord = {
  hidden: { opacity: 0, y: '0.5em' },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const afterHeadline = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease, delay: 0.8 } },
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

  const lines = homeHero.headlineLines;

  return (
    <>
      <HomeHeader />
      <section ref={heroRef} className="home-hero" id="hero" onMouseMove={onHeroMove}>
        <HeroBackground reduced={reduced} />
        <HeroDecorLines />
        <div className="home-hero__spotlight" aria-hidden="true" />
        <div className="home-hero__nebula" aria-hidden="true" />

        <div className="home-hero__content">
          <div className="home-hero__body home-hero__wrap">
            <motion.div
              className="home-hero__copy"
              initial={reduced ? false : 'hidden'}
              animate="show"
            >
              <motion.p className="home-kicker home-kicker--light" variants={reduced ? undefined : afterHeadline}>
                {homeHero.label}
              </motion.p>

              <motion.h1 className="home-hero__title" variants={reduced ? undefined : headlineContainer}>
                {lines.slice(0, -1).map((line) => (
                  <motion.span key={line} className="home-hero__title-line" variants={reduced ? undefined : headlineWord}>
                    {line}
                  </motion.span>
                ))}
                <motion.span
                  className="home-hero__title-line home-hero__title-line--accent"
                  variants={reduced ? undefined : headlineWord}
                >
                  <GoldMark>{lines[lines.length - 1]}</GoldMark>
                </motion.span>
              </motion.h1>

              <motion.p className="home-hero__intro" variants={reduced ? undefined : afterHeadline}>
                {homeHero.intro}
              </motion.p>

              <motion.div className="home-hero__actions" variants={reduced ? undefined : afterHeadline}>
                <PremiumButton to={homeHero.ctaPrimaryLink}>{homeHero.ctaPrimary}</PremiumButton>
                <Link to={homeHero.ctaSecondaryLink} className="home-hero__textlink">
                  {homeHero.ctaSecondary} <span aria-hidden="true">→</span>
                </Link>
              </motion.div>

              <motion.ul className="home-hero__trust" variants={reduced ? undefined : afterHeadline}>
                {homeTrustPoints.map((point, i) => (
                  <li key={point.label}>
                    {i > 0 && <span className="home-hero__trust-sep" aria-hidden="true" />}
                    <span className="home-hero__trust-label">{point.label}</span>
                  </li>
                ))}
              </motion.ul>
            </motion.div>

            <motion.div
              className="home-hero__visual"
              initial={reduced ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.35, ease }}
            >
              <div className="home-hero__universe-glow" aria-hidden="true" />
              <HeroUniverse />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
