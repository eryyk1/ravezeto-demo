import { Link } from 'react-router-dom';
import SectionShell from '../components/shell/SectionShell';
import DisplayHeading from '../components/typography/DisplayHeading';
import './PlaceholderPage.css';

type PlaceholderPageProps = {
  title: string;
  description?: string;
  variant?: 'default' | 'minimal';
};

/** Temporary shell for pages not yet built in Phase 2 sequence */
export default function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <SectionShell tone="warm-white" density="loose">
      <div className="content-wrap placeholder-page">
        <DisplayHeading as="h1" stagger={false}>
          {title}
        </DisplayHeading>
        <p className="placeholder-page__note">
          {description ?? 'Ez az oldal a Phase 2 implementációs sorrendben következik.'}
        </p>
        <Link to="/" className="placeholder-page__back">
          ← Vissza a főoldalra
        </Link>
      </div>
    </SectionShell>
  );
}
