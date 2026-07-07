import siteContent from '../data/siteContent.json';

export default function Footer() {
  const { company } = siteContent;

  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <LinkLogo />
          <ul className="footer-links">
            <li>
              <a href={company.facebook} target="_blank" rel="noreferrer">
                Közösségi
              </a>
            </li>
            <li>Copyright © 2025 Rávezető</li>
          </ul>
        </div>
        <div className="footer-contact">
          <p>
            <a
              href="https://www.google.com/maps/search/1146+Budapest,+Izs%C3%B3+u.+7.+1%2F3."
              target="_blank"
              rel="noreferrer"
            >
              {company.address}
            </a>
          </p>
          <p>
            <a href={`mailto:${company.email}`}>{company.email}</a>
          </p>
          <p>
            <a href={`tel:${company.phone.replace(/\s/g, '')}`}>{company.phone}</a>
          </p>
          <p>{company.website}</p>
        </div>
      </div>
    </footer>
  );
}

function LinkLogo() {
  return (
    <div className="footer-logo" aria-label="Rávezető">
      RÁ<span>vezető</span>
    </div>
  );
}
