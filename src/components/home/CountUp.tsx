import { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

type CountUpProps = {
  value: number;
  suffix?: string;
  className?: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

export default function CountUp({ value, suffix = '', className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-12%' });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(reduced ? value : 0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.6,
      ease,
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, reduced]);

  return (
    <span ref={ref} className={className}>
      {display.toLocaleString('hu-HU')}
      {suffix}
    </span>
  );
}
