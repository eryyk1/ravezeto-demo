import { useAdminUi } from '../context/AdminUiContext';

export default function AdminToasts() {
  const { toasts, dismissToast } = useAdminUi();

  if (!toasts.length) return null;

  return (
    <div className="admin-toasts" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className={`admin-toast admin-toast--${toast.tone}`}>
          <span>{toast.text}</span>
          <button type="button" onClick={() => dismissToast(toast.id)} aria-label="Bezárás">
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
