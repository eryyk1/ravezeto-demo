import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  accent?: 'gold' | 'purple' | 'blue' | 'brown';
}

export function PageHero({ title, subtitle, accent = 'gold' }: PageHeroProps) {
  return (
    <section className={`page-hero accent-${accent}`}>
      <div className="page-hero-inner">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </section>
  );
}

interface ContentSectionProps {
  title?: string;
  children: ReactNode;
  variant?: 'default' | 'quote' | 'split';
}

export function ContentSection({ title, children, variant = 'default' }: ContentSectionProps) {
  return (
    <section className={`content-section variant-${variant}`}>
      {title && <h2>{title}</h2>}
      <div className="content-body">{children}</div>
    </section>
  );
}

interface ButtonLinkProps {
  to: string;
  children: ReactNode;
  variant?: 'gold' | 'purple' | 'blue' | 'brown';
}

export function ButtonLink({ to, children, variant = 'gold' }: ButtonLinkProps) {
  return (
    <Link to={to} className={`btn btn-${variant}`}>
      {children}
    </Link>
  );
}

interface StatGridProps {
  stats: string[];
}

export function StatGrid({ stats }: StatGridProps) {
  return (
    <section className="stat-grid">
      {stats.map((stat) => (
        <div key={stat} className="stat-card">
          <p>{stat}</p>
        </div>
      ))}
    </section>
  );
}

interface ReasonGridProps {
  reasons: { title: string; text: string }[];
}

export function ReasonGrid({ reasons }: ReasonGridProps) {
  return (
    <section className="reason-grid">
      <div className="reason-grid-header">
        <h2>Hat ok, amiért minket érdemes választani</h2>
        <p>
          16 évünk, több mint 400 fejlesztési és képzési projektünk nem jöhetett volna létre, ha
          nem így dolgozunk
        </p>
      </div>
      <div className="reason-cards">
        {reasons.map((reason) => (
          <article key={reason.title} className="reason-card">
            <h3>{reason.title}</h3>
            <p>{reason.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
