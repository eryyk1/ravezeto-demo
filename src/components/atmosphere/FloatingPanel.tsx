import type { ReactNode } from 'react';
import './FloatingPanel.css';

type FloatingPanelProps = {
  children: ReactNode;
  variant?: 'light' | 'dark' | 'glass';
  className?: string;
  tilt?: 'none' | 'left' | 'right';
};

export default function FloatingPanel({
  children,
  variant = 'light',
  className = '',
  tilt = 'none',
}: FloatingPanelProps) {
  return (
    <div
      className={`floating-panel floating-panel--${variant} floating-panel--tilt-${tilt} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
