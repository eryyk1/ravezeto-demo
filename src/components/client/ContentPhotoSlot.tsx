type ContentPhotoSlotProps = {
  src?: string;
  alt: string;
  placeholder?: string;
};

export default function ContentPhotoSlot({ src, alt, placeholder }: ContentPhotoSlotProps) {
  if (src) {
    return (
      <div className="photo-slot">
        <img src={src} alt={alt} loading="lazy" decoding="async" />
      </div>
    );
  }

  if (!placeholder) {
    return <div className="photo-slot" aria-hidden="true" />;
  }

  const lines = placeholder.split('\n');

  return (
    <div className="photo-slot">
      {lines.map((line, index) => (
        <span key={line}>
          {line}
          {index < lines.length - 1 && <br />}
        </span>
      ))}
    </div>
  );
}
