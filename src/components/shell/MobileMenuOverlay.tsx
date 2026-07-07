import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { primaryNav } from '../../content/navigation';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import './MobileMenuOverlay.css';

type MobileMenuOverlayProps = {
  id: string;
  open: boolean;
  onClose: () => void;
};

export default function MobileMenuOverlay({ id, open, onClose }: MobileMenuOverlayProps) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id={id}
          className="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Mobil navigáció"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.35 }}
        >
          <nav aria-label="Mobil menü">
            <ul className="mobile-menu__list">
              {primaryNav.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `mobile-menu__link${isActive ? ' mobile-menu__link--active' : ''}`
                    }
                    onClick={onClose}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
