import { useRef, useState } from 'react';
import { readImageFile } from '../../services/content/store';

type ImageFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
};

export default function ImageField({ label, value, onChange, hint }: ImageFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 2_000_000) {
      window.alert('A kép mérete legfeljebb 2 MB lehet.');
      return;
    }
    setUploading(true);
    try {
      const dataUrl = await readImageFile(file);
      onChange(dataUrl);
    } catch {
      window.alert('A kép feltöltése sikertelen.');
    } finally {
      setUploading(false);
      event.target.value = '';
    }
  }

  return (
    <div className="admin-image-field">
      <span className="admin-field__label">{label}</span>
      <div className="admin-image-field__preview">
        {value ? <img src={value} alt="" /> : <span>Nincs kép</span>}
      </div>
      <input
        className="admin-input"
        type="url"
        value={value.startsWith('data:') ? '' : value}
        placeholder="/assets/... vagy https://..."
        onChange={(event) => onChange(event.target.value)}
      />
      <div className="admin-image-field__actions">
        <button
          type="button"
          className="admin-btn admin-btn--ghost"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? 'Feltöltés…' : 'Kép feltöltése'}
        </button>
        {value ? (
          <button
            type="button"
            className="admin-btn admin-btn--danger"
            onClick={() => onChange('')}
          >
            Eltávolítás
          </button>
        ) : null}
      </div>
      <input ref={inputRef} type="file" accept="image/*" hidden onChange={handleFileChange} />
      {hint ? <span className="admin-field__hint">{hint}</span> : null}
    </div>
  );
}
