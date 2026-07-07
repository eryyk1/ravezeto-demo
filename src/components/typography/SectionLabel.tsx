import './SectionLabel.css';

type SectionLabelProps = {
  children: string;
  className?: string;
};

export default function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return (
    <span className={`section-label ${className}`.trim()}>{children}</span>
  );
}
