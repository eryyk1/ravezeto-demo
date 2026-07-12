import './KapcsolatMap.css';

type KapcsolatMapProps = {
  embedUrl: string;
  title?: string;
};

export default function KapcsolatMap({ embedUrl, title = 'RÁvezető iroda térképen' }: KapcsolatMapProps) {
  return (
    <div className="kapcsolat-map">
      <iframe
        src={embedUrl}
        title={title}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
