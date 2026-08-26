import { Outlet } from 'react-router-dom';
import PageMetaManager from '../seo/PageMetaManager';
import { useClientEffects } from '../../hooks/useClientEffects';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import ClientHeader from './ClientHeader';

function ClientSvgFilters() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <filter id="skrough">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.035 0.045"
            numOctaves={2}
            seed={7}
            result="n"
          />
          <feDisplacementMap in="SourceGraphic" in2="n" scale={3.5} />
        </filter>
        <filter id="skrough2">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.02 0.06"
            numOctaves={2}
            seed={12}
            result="n"
          />
          <feDisplacementMap in="SourceGraphic" in2="n" scale={3} />
        </filter>
      </defs>
    </svg>
  );
}

export default function ClientLayout() {
  useScrollReveal();
  useClientEffects();

  return (
    <>
      <PageMetaManager />
      <ClientSvgFilters />
      <a href="#root-content" className="skip-link">
        Ugrás a tartalomhoz
      </a>
      <ClientHeader />
      <main id="root-content">
        <Outlet />
      </main>
    </>
  );
}
