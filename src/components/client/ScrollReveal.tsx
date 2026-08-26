import type { ElementType, HTMLAttributes, ReactNode } from 'react';

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
} & HTMLAttributes<HTMLElement>;

export default function ScrollReveal({
  children,
  className = '',
  as: Tag = 'div',
  ...rest
}: ScrollRevealProps) {
  return (
    <Tag className={`rev${className ? ` ${className}` : ''}`} {...rest}>
      {children}
    </Tag>
  );
}
