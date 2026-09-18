import { useMemo } from 'react';
import ScrollReveal from '../../components/client/ScrollReveal';
import { usePreloadImages } from '../../hooks/usePreloadImages';
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
      <img src={item.logo} alt={ariaHidden ? '' : item.name} loading="lazy" decoding="async" />
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
  const uniqueUrls = useMemo(
    () => [...new Set([...forwardTrack, ...backTrack].map((logo) => logo.logo))],
    [forwardTrack, backTrack],
  );
  const imagesReady = usePreloadImages(uniqueUrls);

  return (
    <ScrollReveal
      className={`lg-flow${imagesReady ? ' lg-flow--ready' : ''}`}
      onMouseLeave={() => onPartnerHover?.(null)}
    >
      <div className="lg-flow__preload" aria-hidden="true">
        {uniqueUrls.map((url) => (
          <img key={url} src={url} alt="" decoding="async" fetchPriority="high" />
        ))}
      </div>
      <LogoTrack items={forwardTrack} onPartnerHover={onPartnerHover} />
      <LogoTrack items={backTrack} back ariaHidden onPartnerHover={onPartnerHover} />
    </ScrollReveal>
  );
}
