import { Link } from 'react-router-dom';
import './TextLink.css';

type TextLinkProps = {
  to: string;
  children: string;
  className?: string;
  showArrow?: boolean;
};

export default function TextLink({
  to,
  children,
  className = '',
  showArrow = true,
}: TextLinkProps) {
  return (
    <Link to={to} className={`text-link ${className}`.trim()}>
      <span className="text-link__label">{children}</span>
      {showArrow && (
        <span className="text-link__arrow" aria-hidden="true">
          →
        </span>
      )}
    </Link>
  );
}
