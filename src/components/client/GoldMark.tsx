import type { ReactNode } from 'react';

type GoldMarkProps = {
  children: ReactNode;
  className?: string;
};

export default function GoldMark({ children, className = '' }: GoldMarkProps) {
  return (
    <span className={`mark${className ? ` ${className}` : ''}`}>
      {children}
    </span>
  );
}
