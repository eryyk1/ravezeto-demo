import { SITE_LAST_MODIFIED_LABEL } from '../../seo/config';

export default function ContentFreshness() {
  return (
    <p className="content-freshness" aria-label="Tartalom frissítve">
      Utoljára frissítve: {SITE_LAST_MODIFIED_LABEL}
    </p>
  );
}
