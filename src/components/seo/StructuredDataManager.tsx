import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useTeamMembers } from '../../services/content/useContent';
import { resolveStructuredData } from '../../seo/structuredData';

const SCRIPT_SELECTOR = 'script[type="application/ld+json"][data-managed="structured-data"]';

export default function StructuredDataManager() {
  const { pathname } = useLocation();
  const team = useTeamMembers(true);

  const graph = useMemo(
    () => resolveStructuredData(pathname, { team }),
    [pathname, team],
  );

  useEffect(() => {
    document.querySelectorAll(SCRIPT_SELECTOR).forEach((node) => node.remove());

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-managed', 'structured-data');
    script.textContent = JSON.stringify(graph);
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [graph]);

  return null;
}
