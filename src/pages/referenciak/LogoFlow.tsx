import ScrollReveal from '../../components/client/ScrollReveal';
import type { ReferenciakLogoCell } from './referenciakPageData';

type LogoFlowProps = {
  forwardTrack: readonly ReferenciakLogoCell[];
  backTrack: readonly ReferenciakLogoCell[];
  onPartnerHover?: (slug: string | null) => void;
};

function LogoCell({
  item,
  ariaHidden,
  onPartnerHover,
}: {
  item: ReferenciakLogoCell;
  ariaHidden?: boolean;
  onPartnerHover?: (slug: string | null) => void;
}) {
  return (
    <div
      className="cell"
      data-p={item.slug}
      aria-hidden={ariaHidden || undefined}
      onMouseEnter={() => onPartnerHover?.(item.slug)}
      onMouseLeave={() => onPartnerHover?.(null)}
    >
      <img
        src={item.logo}
        alt={ariaHidden ? '' : item.name}
        loading="eager"
        decoding="async"
        fetchPriority="high"
      />
    </div>
  );
}

function LogoTrack({
  items,
  back = false,
  ariaHidden = false,
  onPartnerHover,
}: {
  items: readonly ReferenciakLogoCell[];
  back?: boolean;
  ariaHidden?: boolean;
  onPartnerHover?: (slug: string | null) => void;
}) {
  const loop = [...items, ...items];

  return (
    <div className={`lg-track${back ? ' back' : ''}`} aria-hidden={ariaHidden || undefined}>
      {loop.map((item, index) => (
        <LogoCell
          key={`${item.slug}-${index}`}
          item={item}
          ariaHidden={ariaHidden}
          onPartnerHover={onPartnerHover}
        />
      ))}
    </div>
  );
}

export default function LogoFlow({ forwardTrack, backTrack, onPartnerHover }: LogoFlowProps) {
  return (
    <ScrollReveal className="lg-flow" onMouseLeave={() => onPartnerHover?.(null)}>
      <LogoTrack items={forwardTrack} onPartnerHover={onPartnerHover} />
      <LogoTrack items={backTrack} back ariaHidden onPartnerHover={onPartnerHover} />
    </ScrollReveal>
  );
}
