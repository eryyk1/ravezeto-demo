import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export type ToastTone = 'success' | 'error' | 'info';

export type ToastMessage = {
  id: string;
  tone: ToastTone;
  text: string;
};

type AdminUiContextValue = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toasts: ToastMessage[];
  pushToast: (tone: ToastTone, text: string) => void;
  dismissToast: (id: string) => void;
};

const AdminUiContext = createContext<AdminUiContextValue | null>(null);

export function AdminUiProvider({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const pushToast = useCallback((tone: ToastTone, text: string) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setToasts((current) => [...current, { id, tone, text }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 4200);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const value = useMemo(
    () => ({ sidebarOpen, setSidebarOpen, toasts, pushToast, dismissToast }),
    [sidebarOpen, toasts, pushToast, dismissToast],
  );

  return <AdminUiContext.Provider value={value}>{children}</AdminUiContext.Provider>;
}

export function useAdminUi() {
  const context = useContext(AdminUiContext);
  if (!context) throw new Error('useAdminUi must be used within AdminUiProvider');
  return context;
}
