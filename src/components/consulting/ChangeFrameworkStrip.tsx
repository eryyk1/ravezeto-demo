/**
 * Consulting visuals — part of Rávezető identity, not decoration.
 * Phases derived from homepage „Hat ok” partnership language.
 */
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import './ChangeFrameworkStrip.css';

const PHASES = [
  { key: '01', label: 'Diagnózis', note: 'Mi a valódi probléma' },
  { key: '02', label: 'Átvezetés', note: 'A nehézségeken' },
  { key: '03', label: 'Végigvezetés', note: 'A teljes folyamaton' },
  { key: '04', label: 'Fejlődés', note: 'A fejlődés útján' },
] as const;

export default function ChangeFrameworkStrip() {
  const reduced = useReducedMotion();

  return (
    <div className="change-framework" aria-hidden="true">
      <div className="change-framework__track">
        {PHASES.map((phase, i) => (
          <motion.div
            key={phase.key}
            className="change-framework__phase"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: reduced ? 0 : 0.6 + i * 0.1,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <span className="change-framework__key">{phase.key}</span>
            <span className="change-framework__label">{phase.label}</span>
            <span className="change-framework__note">{phase.note}</span>
          </motion.div>
        ))}
        {!reduced && (
          <motion.div
            className="change-framework__progress"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />
        )}
      </div>
    </div>
  );
}
