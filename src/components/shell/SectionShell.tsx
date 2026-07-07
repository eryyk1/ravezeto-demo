import type { ReactNode, CSSProperties } from 'react';
import './SectionShell.css';

export type SectionTone =
  | 'warm-white'
  | 'stone'
  | 'green-brand'
  | 'green-forest'
  | 'green-dark'
  | 'green-deep'
  | 'graphite'
  | 'navy-deep'
  | 'grey-light';

type SectionShellProps = {
  tone: SectionTone;
  children: ReactNode;
  className?: string;
  density?: 'tight' | 'default' | 'loose';
  id?: string;
  'aria-labelledby'?: string;
};

export default function SectionShell({
  tone,
  children,
  className = '',
  density = 'default',
  id,
  'aria-labelledby': labelledBy,
}: SectionShellProps) {
  const pyMap = {
    tight: 'var(--section-py-tight)',
    default: 'var(--section-py)',
    loose: 'var(--section-py-loose)',
  };

  const style = { '--section-py': pyMap[density] } as CSSProperties;

  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`section-shell section-shell--${tone} ${className}`.trim()}
      style={style}
    >
      {children}
    </section>
  );
}
