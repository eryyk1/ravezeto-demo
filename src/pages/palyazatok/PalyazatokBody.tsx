import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { PalyazatokSettings } from '../../services/content/types';

type PalyazatokBodyProps = {
  content: PalyazatokSettings;
  formSlot?: ReactNode;
};

export default function PalyazatokBody({ content, formSlot }: PalyazatokBodyProps) {
  return (
    <>
      <section className="hero">
        <svg className="hero-wm" viewBox="0 0 100 120" aria-hidden="true">
          <path
            d="M14 8 L78 60 L14 112"
            fill="none"
            stroke="currentColor"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="wrap">
          <div className="kicker">{content.heroLabel}</div>
          <h1>
            <span className="q1">{content.q1}</span>
            <span className="q2">
              {content.q2Lead} <span className="mark">{content.q2Mark}</span>
            </span>
          </h1>
          <p className="lead anim">{content.lead}</p>
          <div className="cta-row anim">
            <a className="btn" href="#urlap">
              {content.heroCta}
            </a>
          </div>
        </div>
      </section>

      <section className="deadline-sec">
        <div className="wrap">
          <div className="deadline rev">
            <b>{content.deadlineMessage}</b>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="about rev">
            <p>{content.aboutText}</p>
            <Link to={content.aboutLink}>{content.aboutLinkLabel}</Link>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="partners rev">
            <span className="pl">{content.partnersLabel}</span>
            {content.partners.map((logo) => (
              <img
                key={logo.src}
                className="plogo"
                src={logo.src}
                alt={logo.alt}
                loading="lazy"
              />
            ))}
            <Link to={content.partnersLink}>{content.partnersLinkLabel}</Link>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="head rev">
            <div className="kicker">{content.stepsLabel}</div>
            <h2>{content.stepsTitle}</h2>
          </div>
          <div className="steps rev">
            <div className="step">
              <div className="idx">01</div>
              <p>{content.steps[0]}</p>
            </div>
            <div className="ssep" aria-hidden="true">
              &gt;
            </div>
            <div className="step">
              <div className="idx">02</div>
              <p>{content.steps[1]}</p>
            </div>
            <div className="ssep" aria-hidden="true">
              &gt;
            </div>
            <div className="step">
              <div className="idx">03</div>
              <p>{content.steps[2]}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="sec" id="urlap">
        <div className="wrap">
          <div className="duo rev">
            <div className="kontakt">
              <svg className="k-chev" viewBox="0 0 100 120" aria-hidden="true">
                <path
                  d="M14 8 L78 60 L14 112"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="14"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <svg className="kc-crown" viewBox="0 0 64 42" aria-hidden="true">
                <path
                  d="M10 30 L17 13 L25 26 L32 8 L39 26 L47 13 L54 30 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.6"
                  strokeLinejoin="round"
                />
                <path d="M13 36 H51" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
              </svg>
              <div className="kc">
                <span className="l1">Keep calm</span>
                <span className="l2">and</span>
                <span className="l1">
                  call <b>Rávezető</b>
                </span>
              </div>
              <div className="pwrap">
                <img
                  src={content.contactPortrait}
                  alt={`${content.contactName} portréja`}
                  onError={(e) => e.currentTarget.remove()}
                />
              </div>
              <div>
                <h2>{content.contactName}</h2>
                <div className="role">{content.contactRole}</div>
              </div>
              <div className="elms">
                E-mail:{' '}
                <a href={`mailto:${content.contactEmail}`}>{content.contactEmail}</a>
                <br />
                Telefon:{' '}
                <a href={`tel:${content.contactPhoneTel}`}>{content.contactPhone}</a>
              </div>
            </div>
            <div className="form">
              <h2>{content.formTitle}</h2>
              {formSlot}
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <div className="cols">
            <div className="flogo">
              <img src="/assets/images/palyazatok/img-08.svg" alt="Rávezető Projekt" />
              <div className="tag">Változásokat vezetünk, együtt!</div>
            </div>
            <div>
              1146 Budapest, Izsó u. 7. 1/3.
              <br />
              <a href="mailto:info@ravezeto.hu">info@ravezeto.hu</a> ·{' '}
              <a href="tel:+36705134128">+36 70/513 4128</a>
            </div>
            <div>
              <a href="#" target="_blank" rel="noopener">
                LinkedIn
              </a>
              <br />
              <Link to="/jogi/adatvedelem">Adatvédelem</Link> ·{' '}
              <Link to="/jogi/impresszum">Impresszum</Link>
            </div>
          </div>
          <div className="fcred">
            <div className="fdoc">
              <b>Cégünk felnőttképzési engedéllyel rendelkező intézmény.</b>
              <br />
              Nyilvántartásba vételi számunk: B/2020/001943 · Engedélyszámunk: E/2021/000106
            </div>
          </div>
          <div className="copy">© 2026 Rávezető Projekt Kft.</div>
        </div>
      </footer>
    </>
  );
}
