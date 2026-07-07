import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import './DisplayHeading.css';

type DisplayHeadingProps = {
  children: ReactNode;
  as?: 'h1' | 'h2';
  className?: string;
  stagger?: boolean;
};

export default function DisplayHeading({
  children,
  as: Tag = 'h1',
  className = '',
  stagger = true,
}: DisplayHeadingProps) {
  if (!stagger || typeof children !== 'string') {
    return (
      <Tag className={`display-heading ${className}`.trim()}>{children}</Tag>
    );
  }

  const lines = children.split('\n').filter(Boolean);

  return (
    <Tag className={`display-heading ${className}`.trim()}>
      {lines.map((line, i) => (
        <motion.span
          key={i}
          className="display-heading__line"
          style={{ '--line-index': i } as React.CSSProperties}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: i * 0.1,
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {line}
        </motion.span>
      ))}
    </Tag>
  );
}
