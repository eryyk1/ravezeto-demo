import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './palyazatok.css';

export type PartnerLogoItem = {
  slug: string;
  name: string;
  logo: string;
};

type PalyazatokPartnersProps = {
  partners: readonly PartnerLogoItem[];
  label: string;
  referenciakLink: string;
  referenciakLabel: string;
};

const VISIBLE_COUNT = 6;

function PartnerCard({
  partner,
  loading = 'lazy',
}: {
  partner: PartnerLogoItem;
  loading?: 'lazy' | 'eager';
}) {
  return (
    <div className="paly-partners__card" role="listitem">
      <img src={partner.logo} alt={partner.name} loading={loading} decoding="async" />
    </div>
  );
}

export default function PalyazatokPartners({
  partners,
  label,
  referenciakLink,
  referenciakLabel,
}: PalyazatokPartnersProps) {
  const modalTitleId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const visiblePartners = partners.slice(0, VISIBLE_COUNT);
  const hasMore = partners.length > VISIBLE_COUNT;

  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  const openModal = useCallback(() => {
    setModalOpen(true);
  }, []);

  useEffect(() => {
    if (!modalOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [modalOpen, closeModal]);

  return (
    <div className="paly-partners">
      <span className="paly-partners__label">{label}</span>

      <div className="paly-partners__grid" role="list" aria-label={label.replace(/:$/, '')}>
        {visiblePartners.map((partner) => (
          <PartnerCard key={partner.slug} partner={partner} loading="eager" />
        ))}
      </div>

      <div className="paly-partners__actions">
        {hasMore ? (
          <button type="button" className="paly-partners__more" onClick={openModal}>
            További partnerek
          </button>
        ) : null}
        <Link to={referenciakLink} className="paly-partners__ref-link">
          {referenciakLabel}
        </Link>
      </div>

      {modalOpen ? (
        <div className="paly-partners-modal" role="presentation">
          <button
            type="button"
            className="paly-partners-modal__backdrop"
            aria-label="Bezárás"
            onClick={closeModal}
          />
          <div
            className="paly-partners-modal__panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby={modalTitleId}
          >
            <header className="paly-partners-modal__header">
              <h2 id={modalTitleId} className="paly-partners-modal__title">
                Együttműködő partnereink
              </h2>
              <button
                ref={closeButtonRef}
                type="button"
                className="paly-partners-modal__close"
                aria-label="Bezárás"
                onClick={closeModal}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </header>
            <div
              className="paly-partners__grid paly-partners__grid--modal"
              role="list"
              aria-label="Összes partner"
            >
              {partners.map((partner) => (
                <PartnerCard key={partner.slug} partner={partner} />
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
