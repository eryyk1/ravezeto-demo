import DisplayHeading from '../typography/DisplayHeading';
import SectionLabel from '../typography/SectionLabel';
import './InnerPageHero.css';

type InnerPageHeroProps = {
  label?: string;
  title: string;
  intro?: string;
  tone?: 'forest' | 'deep';
  accent?: 'editorial' | 'strategic' | 'product' | 'education' | 'cases' | 'official' | 'contact';
};

export default function InnerPageHero({
  label,
  title,
  intro,
  tone = 'forest',
  accent,
}: InnerPageHeroProps) {
  return (
    <header className={`inner-hero inner-hero--${tone}${accent ? ` inner-hero--${accent}` : ''}`}>
      <div className="inner-hero__bg" aria-hidden="true" />
      {accent && <div className="inner-hero__accent" aria-hidden="true" />}
      <div className="content-wrap inner-hero__wrap">
        {label && <SectionLabel>{label}</SectionLabel>}
        <DisplayHeading as="h1">{title}</DisplayHeading>
        {intro && <p className="inner-hero__intro">{intro}</p>}
      </div>
    </header>
  );
}
