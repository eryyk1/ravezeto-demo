import type { ReactNode } from 'react';

type AdminPageHeaderProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
};

export default function AdminPageHeader({ title, description, actions }: AdminPageHeaderProps) {
  return (
    <div className="admin-page-header">
      <div className="admin-page-header__intro">
        <h1 className="admin-page-header__title">{title}</h1>
        {description ? <p className="admin-page-header__description">{description}</p> : null}
      </div>
      {actions ? <div className="admin-page-header__actions">{actions}</div> : null}
    </div>
  );
}
