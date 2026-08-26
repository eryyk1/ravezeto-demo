import './GoldMark.css';

type GoldMarkProps = {
  children: string;
};

export default function GoldMark({ children }: GoldMarkProps) {
  return (
    <span className="gold-mark">
      {children}
      <svg className="gold-mark__line" viewBox="0 0 200 20" preserveAspectRatio="none" aria-hidden="true">
        <path d="M4,12 C50,7 120,15 196,9" pathLength={300} />
      </svg>
    </span>
  );
}
