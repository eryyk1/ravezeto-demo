import './SectionEdge.css';

type SectionEdgeProps = {
  /** Background color of the section below */
  fill: string;
  variant?: 'slant-up' | 'slant-down' | 'notch-left' | 'curve';
  className?: string;
  flip?: boolean;
};

/** Visual bridge between sections — prevents flat merges */
export default function SectionEdge({
  fill,
  variant = 'slant-up',
  className = '',
  flip = false,
}: SectionEdgeProps) {
  const paths: Record<string, string> = {
    'slant-up': 'M0 100 L100 0 L100 100 Z',
    'slant-down': 'M0 0 L100 0 L100 100 L0 60 Z',
    'notch-left': 'M0 40 L30 0 L100 0 L100 100 L0 100 Z',
    curve: 'M0 80 Q50 0 100 80 L100 100 L0 100 Z',
  };

  return (
    <div
      className={`section-edge section-edge--${variant} ${flip ? 'section-edge--flip' : ''} ${className}`.trim()}
      aria-hidden="true"
    >
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="section-edge__svg">
        <path d={paths[variant]} fill={fill} />
      </svg>
    </div>
  );
}
