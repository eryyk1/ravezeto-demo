import './NoiseOverlay.css';

type NoiseOverlayProps = {
  intensity?: 'light' | 'medium';
  className?: string;
};

export default function NoiseOverlay({
  intensity = 'light',
  className = '',
}: NoiseOverlayProps) {
  return (
    <div
      className={`noise-overlay noise-overlay--${intensity} ${className}`.trim()}
      aria-hidden="true"
    />
  );
}
