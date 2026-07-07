import PremiumButton from '../home/PremiumButton';
import './PageCta.css';

type PageCtaProps = {
  title: string;
  text?: string;
  cta: string;
  link: string;
};

export default function PageCta({ title, text, cta, link }: PageCtaProps) {
  return (
    <div className="page-cta">
      <h2 className="page-cta__title">{title}</h2>
      {text && <p className="page-cta__text">{text}</p>}
      <PremiumButton to={link} variant="solid">
        {cta}
      </PremiumButton>
    </div>
  );
}
