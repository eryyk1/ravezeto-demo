import { Link } from 'react-router-dom';
import { company } from '../../content/company';
import { homeEuMark } from '../../content/home';
import ClientFooter from './ClientFooter';

function ChevTrio() {
  return (
    <svg className="chev-trio" viewBox="0 0 40 46" aria-hidden="true">
      <path
        d="M6 40 L20 28 L34 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity=".35"
      />
      <path
        d="M6 26 L20 14 L34 26"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity=".2"
      />
      <path
        d="M6 12 L20 0 L34 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity=".12"
        transform="translate(0,4)"
      />
    </svg>
  );
}

type ClientCloseProps = {
  kicker: string;
  title: string;
  refsLine?: string;
  btnLabel?: string;
  btnTo?: string;
  euKicker?: string;
  showEuBand?: boolean;
  showFooter?: boolean;
  className?: string;
};

export default function ClientClose({
  kicker,
  title,
  refsLine,
  btnLabel = 'Írjon nekünk',
  btnTo = '/kapcsolat',
  euKicker = 'Támogatott projektjeink',
  showEuBand = true,
  showFooter = true,
  className = '',
}: ClientCloseProps) {
  const refs =
    refsLine ??
    `${company.address} · ${company.email} · ${company.phone}`;

  return (
    <section className={`close${className ? ` ${className}` : ''}`}>
      <div className="wrap rev">
        <ChevTrio />
        <div className="kicker">{kicker}</div>
        <h2>{title}</h2>
        <p className="refs">{refs}</p>
        <Link to={btnTo} className="btn">
          {btnLabel}
        </Link>
      </div>

      {showEuBand && (
        <div className="eu-band">
          <div className="wrap">
            <div className="kicker">{euKicker}</div>
            <Link to={homeEuMark.link} className="eu-ph">
              Széchenyi 2020 / Európai Unió logó helye
            </Link>
          </div>
        </div>
      )}

      {showFooter && <ClientFooter />}
    </section>
  );
}
