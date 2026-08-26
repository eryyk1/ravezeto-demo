import { useMemo } from 'react';
import ScrollReveal from '../../components/client/ScrollReveal';
import { usePreloadImages } from '../../hooks/usePreloadImages';

type LogoItem = {
  slug: string;
  name: string;
  logo: string;
};

type LogoFlowProps = {
  logos: readonly LogoItem[];
};

function LogoCell({ item }: { item: LogoItem }) {
  return (
    <div className="cell">
      <img
        src={item.logo}
        alt={item.name}
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
}: {
  items: readonly LogoItem[];
  back?: boolean;
  ariaHidden?: boolean;
}) {
  const loop = [...items, ...items];

  return (
    <div
      className={`lg-track${back ? ' back' : ''}`}
      aria-hidden={ariaHidden || undefined}
    >
      {loop.map((item, index) => (
        <LogoCell key={`${item.slug}-${index}`} item={item} />
      ))}
    </div>
  );
}

export default function LogoFlow({ logos }: LogoFlowProps) {
  const uniqueUrls = useMemo(() => [...new Set(logos.map((logo) => logo.logo))], [logos]);
  const imagesReady = usePreloadImages(uniqueUrls);

  const midpoint = Math.ceil(logos.length / 2);
  const forward = logos.slice(0, midpoint);
  const backward = logos.slice(midpoint);

  return (
    <ScrollReveal className={`lg-flow${imagesReady ? ' lg-flow--ready' : ''}`}>
      <LogoTrack items={forward} />
      <LogoTrack items={backward} back ariaHidden />
    </ScrollReveal>
  );
}
