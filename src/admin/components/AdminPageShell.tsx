import type { ReactNode } from 'react';
import AdminPageHeader from './AdminPageHeader';

type AdminPageShellProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
};

export default function AdminPageShell({
  title,
  description,
  actions,
  children,
}: AdminPageShellProps) {
  return (
    <div className="admin-page">
      <AdminPageHeader title={title} description={description} actions={actions} />
      <div className="admin-page__body">{children}</div>
    </div>
  );
}
