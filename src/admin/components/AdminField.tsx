type AdminFieldProps = {
  label: string;
  htmlFor?: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
};

export default function AdminField({ label, htmlFor, hint, error, children }: AdminFieldProps) {
  return (
    <label className="admin-field" htmlFor={htmlFor}>
      <span className="admin-field__label">{label}</span>
      {children}
      {hint ? <span className="admin-field__hint">{hint}</span> : null}
      {error ? <span className="admin-field__error">{error}</span> : null}
    </label>
  );
}
