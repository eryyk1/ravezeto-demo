import { Link } from 'react-router-dom';
import { primaryNav } from '../../content/navigation';

type ClientMobileMenuProps = {
  id: string;
  onLinkClick: () => void;
};

export default function ClientMobileMenu({ id, onLinkClick }: ClientMobileMenuProps) {
  return (
    <div className="mmenu" id={id} aria-hidden="true">
      <nav aria-label="Mobil menü">
        <Link to="/" onClick={onLinkClick}>
          Főoldal
        </Link>
        {primaryNav.map((item) => (
          <Link key={item.path} to={item.path} onClick={onLinkClick}>
            {item.label}
          </Link>
        ))}
        <a href="https://mentally.team" target="_blank" rel="noopener noreferrer" onClick={onLinkClick}>
          Mentally
        </a>
        <Link to="/kapcsolat" className="mcta" onClick={onLinkClick}>
          Kapcsolat
        </Link>
      </nav>
    </div>
  );
}
