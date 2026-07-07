import { Link } from 'react-router-dom';
import './PrimaryButton.css';

type PrimaryButtonProps = {
  to: string;
  children: string;
  variant?: 'solid' | 'outline' | 'outline-light' | 'solid-light';
  className?: string;
};

export default function PrimaryButton({
  to,
  children,
  variant = 'solid',
  className = '',
}: PrimaryButtonProps) {
  return (
    <Link
      to={to}
      className={`primary-button primary-button--${variant} ${className}`.trim()}
    >
      {children}
    </Link>
  );
}
