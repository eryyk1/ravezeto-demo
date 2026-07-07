import type { ReactNode } from 'react';
import SectionShell, { type SectionTone } from '../shell/SectionShell';
import SectionLabel from '../typography/SectionLabel';
import { PageReveal } from './StaggerReveal';
import './PageSection.css';

type PageSectionProps = {
  tone: SectionTone;
  label?: string;
  title?: string;
  lead?: string;
  children: ReactNode;
  className?: string;
  density?: 'tight' | 'default' | 'loose';
  id?: string;
  accent?: boolean;
};

export default function PageSection({
  tone,
  label,
  title,
  lead,
  children,
  className = '',
  density = 'loose',
  id,
  accent = false,
}: PageSectionProps) {
  return (
    <SectionShell
      tone={tone}
      density={density}
      id={id}
      className={`page-section-shell${accent ? ' page-section-shell--accent' : ''} ${className}`.trim()}
    >
      <PageReveal>
        <div className="content-wrap page-section">
          {(label || title || lead) && (
            <header className="page-section__head">
              {label && <SectionLabel>{label}</SectionLabel>}
              {title && <h2 className="page-section__title">{title}</h2>}
              {lead && <p className="page-section__lead">{lead}</p>}
            </header>
          )}
          {children}
        </div>
      </PageReveal>
    </SectionShell>
  );
}
