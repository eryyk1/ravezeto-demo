import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './PremiumButton.css';

type PremiumButtonProps = {
  to: string;
  children: string;
  variant?: 'solid' | 'outline';
};

const ease = [0.22, 1, 0.36, 1] as const;

export default function PremiumButton({ to, children, variant = 'solid' }: PremiumButtonProps) {
  return (
    <motion.div
      className="premium-btn-wrap"
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.35, ease }}
    >
      <Link to={to} className={`premium-btn premium-btn--${variant}`}>
        <span className="premium-btn__shine" aria-hidden="true" />
        <span className="premium-btn__label">{children}</span>
        <span className="premium-btn__arrow" aria-hidden="true">
          →
        </span>
      </Link>
    </motion.div>
  );
}
