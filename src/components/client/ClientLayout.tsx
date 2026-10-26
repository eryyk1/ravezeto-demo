import { useCallback, useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import PageMetaManager from '../seo/PageMetaManager';
import StructuredDataManager from '../seo/StructuredDataManager';
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

/* ------------------------------------------------------------------ */
/* Cookie consent (Google Consent Mode v2 + Google Tag Manager)        */
/* ------------------------------------------------------------------ */

const CONSENT_STORAGE_KEY = 'ravezeto_cookie_consent_v1';

type StoredConsent = {
  version: 1;
  analytics: boolean;
  updatedAt: string;
};

type ConsentWindow = {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};

function readStoredConsent(): StoredConsent | null {
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<StoredConsent> | null;
    if (parsed && parsed.version === 1 && typeof parsed.analytics === 'boolean') {
      return {
        version: 1,
        analytics: parsed.analytics,
        updatedAt: typeof parsed.updatedAt === 'string' ? parsed.updatedAt : '',
      };
    }
  } catch {
    /* storage unavailable or corrupt value: treat as no stored choice */
  }
  return null;
}

function writeStoredConsent(analytics: boolean): void {
  try {
    const value: StoredConsent = {
      version: 1,
      analytics,
      updatedAt: new Date().toISOString(),
    };
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(value));
  } catch {
    /* storage unavailable: the choice applies to this page view only */
  }
}

/**
 * Sends a consent update to Google tags through the dataLayer.
 *
 * index.html defines a global gtag() that pushes its `arguments` object to
 * window.dataLayer. We use it if present, otherwise we push the same
 * `arguments`-style command ourselves (GTM only treats Arguments objects,
 * not plain arrays, as gtag commands).
 */
function pushConsentUpdate(analyticsGranted: boolean): void {
  const w = window as unknown as ConsentWindow;
  w.dataLayer = w.dataLayer || [];

  const consentState = {
    analytics_storage: analyticsGranted ? 'granted' : 'denied',
    // No advertising / marketing features are offered, so these always stay denied.
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  };

  if (typeof w.gtag === 'function') {
    w.gtag('consent', 'update', consentState);
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const push = function (..._args: unknown[]) {
      // eslint-disable-next-line prefer-rest-params
      (w.dataLayer as unknown[]).push(arguments);
    };
    push('consent', 'update', consentState);
  }

  // Plain event so GTM triggers can react to the choice if needed.
  w.dataLayer.push({
    event: 'cookie_consent_update',
    cookie_consent: { analytics: analyticsGranted, marketing: false },
  });
}

const COOKIE_BANNER_CSS = `
.rv-cc-banner {
  position: fixed;
  left: 16px;
  right: 16px;
  bottom: 16px;
  z-index: 2147483000;
  max-width: 720px;
  margin: 0 auto;
  padding: 20px 22px;
  background: #ffffff;
  color: #1c2a33;
  border: 1px solid rgba(28, 42, 51, 0.14);
  border-radius: 14px;
  box-shadow: 0 12px 40px rgba(16, 28, 36, 0.22);
  font-family: 'Mulish', system-ui, -apple-system, 'Segoe UI', sans-serif;
  font-size: 15px;
  line-height: 1.55;
  max-height: calc(100vh - 32px);
  overflow-y: auto;
}
.rv-cc-banner:focus { outline: none; }
.rv-cc-title {
  margin: 0 0 6px;
  font-family: 'Urbanist', system-ui, sans-serif;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.3;
  color: inherit;
}
.rv-cc-text { margin: 0 0 14px; }
.rv-cc-text a { color: inherit; text-decoration: underline; }
.rv-cc-actions { display: flex; flex-wrap: wrap; gap: 10px; }
.rv-cc-btn {
  flex: 1 1 150px;
  min-height: 44px;
  padding: 10px 16px;
  border-radius: 10px;
  border: 2px solid #1c2a33;
  background: transparent;
  color: #1c2a33;
  font-family: 'Urbanist', system-ui, sans-serif;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease;
}
.rv-cc-btn:hover { background: rgba(28, 42, 51, 0.08); }
.rv-cc-btn--primary { background: #1c2a33; color: #ffffff; }
.rv-cc-btn--primary:hover { background: #2c4150; }
.rv-cc-btn:focus-visible,
.rv-cc-reopen:focus-visible,
.rv-cc-option input:focus-visible {
  outline: 3px solid #2f7bd9;
  outline-offset: 2px;
}
.rv-cc-option {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 14px;
  margin: 0 0 10px;
  border: 1px solid rgba(28, 42, 51, 0.14);
  border-radius: 10px;
  cursor: pointer;
}
.rv-cc-option--locked { cursor: default; background: rgba(28, 42, 51, 0.04); }
.rv-cc-option input {
  flex: 0 0 auto;
  width: 20px;
  height: 20px;
  margin: 2px 0 0;
  accent-color: #1c2a33;
}
.rv-cc-option strong { display: block; font-family: 'Urbanist', system-ui, sans-serif; font-size: 16px; }
.rv-cc-option span { display: block; font-size: 14px; color: #44545f; }
.rv-cc-reopen {
  position: fixed;
  left: 16px;
  bottom: 16px;
  z-index: 2147482000;
  min-height: 36px;
  padding: 6px 14px;
  border-radius: 999px;
  border: 1px solid rgba(28, 42, 51, 0.25);
  background: #ffffff;
  color: #1c2a33;
  font-family: 'Mulish', system-ui, sans-serif;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(16, 28, 36, 0.15);
}
.rv-cc-reopen:hover { background: #f1f4f6; }
@media (max-width: 520px) {
  .rv-cc-banner { left: 8px; right: 8px; bottom: 8px; padding: 16px; }
  .rv-cc-btn { flex: 1 1 100%; }
  .rv-cc-reopen { left: 8px; bottom: 8px; }
}
@media (prefers-reduced-motion: reduce) {
  .rv-cc-btn { transition: none; }
}
`;

function CookieConsent() {
  // `ready` stays false until the stored choice has been read on the client.
  const [ready, setReady] = useState(false);
  const [hasChoice, setHasChoice] = useState(false);
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<'main' | 'preferences'>('main');
  const [analyticsDraft, setAnalyticsDraft] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const shouldFocusRef = useRef(false);

  // On first load: apply a previously stored choice, otherwise show the banner.
  // Nothing is ever granted without an explicit user action.
  useEffect(() => {
    const stored = readStoredConsent();
    if (stored) {
      setHasChoice(true);
      setAnalyticsDraft(stored.analytics);
      pushConsentUpdate(stored.analytics);
    } else {
      setOpen(true);
    }
    setReady(true);
  }, []);

  // Move focus into the dialog when it was opened by the user (not on first visit).
  useEffect(() => {
    if (open && shouldFocusRef.current) {
      shouldFocusRef.current = false;
      dialogRef.current?.focus();
    }
  }, [open, view]);

  const save = useCallback((analytics: boolean) => {
    writeStoredConsent(analytics);
    pushConsentUpdate(analytics);
    setAnalyticsDraft(analytics);
    setHasChoice(true);
    setOpen(false);
    setView('main');
  }, []);

  const reopen = useCallback(() => {
    const stored = readStoredConsent();
    setAnalyticsDraft(stored ? stored.analytics : false);
    shouldFocusRef.current = true;
    setView('preferences');
    setOpen(true);
  }, []);

  const openPreferences = useCallback(() => {
    shouldFocusRef.current = true;
    setView('preferences');
  }, []);

  // Escape closes the dialog only if a choice already exists.
  // Dismissing never grants consent and never records a choice.
  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape' && hasChoice) {
      setOpen(false);
      setView('main');
    }
  };

  if (!ready) return null;

  return (
    <>
      <style>{COOKIE_BANNER_CSS}</style>

      {open ? (
        <div
          ref={dialogRef}
          className="rv-cc-banner"
          role="dialog"
          aria-modal="false"
          aria-labelledby="rv-cc-title"
          aria-describedby="rv-cc-desc"
          tabIndex={-1}
          onKeyDown={onKeyDown}
        >
          {view === 'main' ? (
            <>
              <h2 id="rv-cc-title" className="rv-cc-title">
                Sütiket használunk
              </h2>
              <p id="rv-cc-desc" className="rv-cc-text">
                Weboldalunk a működéshez szükséges sütiket mindig használja. Az elemző
                (analitikai) sütiket csak a hozzájárulásoddal engedélyezzük, hogy
                megérthessük, hogyan használják az oldalt, és fejleszthessük azt. A
                döntésedet bármikor módosíthatod.
              </p>
              <div className="rv-cc-actions">
                <button
                  type="button"
                  className="rv-cc-btn rv-cc-btn--primary"
                  onClick={() => save(true)}
                >
                  Összes elfogadása
                </button>
                <button type="button" className="rv-cc-btn" onClick={() => save(false)}>
                  Csak szükséges
                </button>
                <button type="button" className="rv-cc-btn" onClick={openPreferences}>
                  Beállítások
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 id="rv-cc-title" className="rv-cc-title">
                Cookie-beállítások
              </h2>
              <p id="rv-cc-desc" className="rv-cc-text">
                Itt eldöntheted, mely sütik használatát engedélyezed.
              </p>

              <label className="rv-cc-option rv-cc-option--locked">
                <input type="checkbox" checked disabled readOnly />
                <div>
                  <strong>Szükséges sütik</strong>
                  <span>
                    Az oldal alapvető működéséhez kellenek, ezért mindig engedélyezettek.
                  </span>
                </div>
              </label>

              <label className="rv-cc-option">
                <input
                  type="checkbox"
                  checked={analyticsDraft}
                  onChange={(event) => setAnalyticsDraft(event.target.checked)}
                />
                <div>
                  <strong>Elemző sütik</strong>
                  <span>
                    Anonim statisztikákat gyűjtenek arról, hogyan használják az oldalt
                    (Google Analytics).
                  </span>
                </div>
              </label>

              <div className="rv-cc-actions">
                <button
                  type="button"
                  className="rv-cc-btn rv-cc-btn--primary"
                  onClick={() => save(analyticsDraft)}
                >
                  Beállítások mentése
                </button>
                <button type="button" className="rv-cc-btn" onClick={() => save(true)}>
                  Összes elfogadása
                </button>
                <button type="button" className="rv-cc-btn" onClick={() => save(false)}>
                  Csak szükséges
                </button>
              </div>
            </>
          )}
        </div>
      ) : (
        <button type="button" className="rv-cc-reopen" onClick={reopen}>
          Cookie-beállítások
        </button>
      )}
    </>
  );
}

export default function ClientLayout() {
  useScrollReveal();
  useClientEffects();

  return (
    <>
      <PageMetaManager />
      <StructuredDataManager />
      <ClientSvgFilters />
      <a href="#root-content" className="skip-link">
        Ugrás a tartalomhoz
      </a>
      <ClientHeader />
      <main id="root-content">
        <Outlet />
      </main>
      <CookieConsent />
    </>
  );
}
