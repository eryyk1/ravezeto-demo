import { useCallback, useEffect, useState, type FormEvent } from 'react';
import AdminField from '../../components/AdminField';
import AdminPageShell from '../../components/AdminPageShell';
import { useAdminUi } from '../../context/AdminUiContext';
import {
  createAdminUser,
  deleteAdminUser,
  fetchAdminUsers,
  patchAdminUser,
  resetAdminUserPassword,
  type AdminUserRecord,
} from '../../../services/auth/adminUsersApi';
import type { AdminRole } from '../../../services/auth/types';
import { useAuth } from '../../context/AuthContext';

function roleLabel(role: AdminRole): string {
  return role === 'foadmin' ? 'Főadmin' : 'Admin';
}

export default function AdminUsersPage() {
  const { session } = useAuth();
  const { pushToast } = useAdminUi();
  const [users, setUsers] = useState<AdminUserRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState<AdminRole>('admin');
  const [passwordUserId, setPasswordUserId] = useState<string | null>(null);
  const [passwordValue, setPasswordValue] = useState('');

  const reload = useCallback(async () => {
    setLoading(true);
    const result = await fetchAdminUsers();
    setLoading(false);
    if (!result.ok) {
      pushToast('error', result.error);
      return;
    }
    setUsers(result.users);
  }, [pushToast]);

  useEffect(() => {
    void reload();
  }, [reload]);

  async function handleCreate(event: FormEvent) {
    event.preventDefault();
    const result = await createAdminUser({
      email: newEmail.trim(),
      password: newPassword,
      role: newRole,
    });
    if (!result.ok) {
      pushToast('error', result.error);
      return;
    }
    pushToast('success', 'Felhasználó létrehozva.');
    setCreateOpen(false);
    setNewEmail('');
    setNewPassword('');
    setNewRole('admin');
    await reload();
  }

  async function toggleActive(user: AdminUserRecord) {
    const result = await patchAdminUser(user.id, { active: !user.active });
    if (!result.ok) {
      pushToast('error', result.error);
      return;
    }
    pushToast('success', user.active ? 'Felhasználó letiltva.' : 'Felhasználó engedélyezve.');
    await reload();
  }

  async function handleDelete(user: AdminUserRecord) {
    if (!window.confirm(`Biztosan törli: ${user.email}?`)) return;
    const result = await deleteAdminUser(user.id);
    if (!result.ok) {
      pushToast('error', result.error);
      return;
    }
    pushToast('success', 'Felhasználó törölve.');
    await reload();
  }

  async function handlePasswordReset(event: FormEvent) {
    event.preventDefault();
    if (!passwordUserId) return;
    const result = await resetAdminUserPassword(passwordUserId, passwordValue);
    if (!result.ok) {
      pushToast('error', result.error);
      return;
    }
    pushToast('success', 'Jelszó frissítve.');
    setPasswordUserId(null);
    setPasswordValue('');
  }

  return (
    <AdminPageShell
      title="Felhasználók"
      description="Admin fiókok kezelése — csak Főadmin számára."
      actions={
        <button type="button" className="admin-btn admin-btn--primary" onClick={() => setCreateOpen(true)}>
          + Új felhasználó
        </button>
      }
    >
      {loading ? <p className="admin-muted">Betöltés…</p> : null}

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Szerepkör</th>
              <th>Státusz</th>
              <th className="admin-table__actions-head">Műveletek</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td data-label="Email">
                  <strong>{user.email}</strong>
                  {session?.user.id === user.id ? (
                    <span className="admin-muted"> (Ön)</span>
                  ) : null}
                </td>
                <td data-label="Szerepkör">{roleLabel(user.role)}</td>
                <td data-label="Státusz">
                  <span className={`admin-badge${user.active ? '' : ' admin-badge--muted'}`}>
                    {user.active ? 'Aktív' : 'Letiltva'}
                  </span>
                </td>
                <td className="admin-table__actions" data-label="Műveletek">
                  <button
                    type="button"
                    className="admin-btn admin-btn--sm admin-btn--ghost"
                    onClick={() => {
                      setPasswordUserId(user.id);
                      setPasswordValue('');
                    }}
                  >
                    Jelszó
                  </button>
                  <button
                    type="button"
                    className="admin-btn admin-btn--sm admin-btn--ghost"
                    onClick={() => void toggleActive(user)}
                  >
                    {user.active ? 'Letiltás' : 'Engedélyezés'}
                  </button>
                  <button
                    type="button"
                    className="admin-btn admin-btn--sm admin-btn--ghost"
                    onClick={() => void handleDelete(user)}
                  >
                    Törlés
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {createOpen ? (
        <div className="admin-modal-backdrop" role="presentation" onClick={() => setCreateOpen(false)}>
          <form
            className="admin-modal"
            onClick={(event) => event.stopPropagation()}
            onSubmit={(event) => void handleCreate(event)}
          >
            <h2>Új admin felhasználó</h2>
            <AdminField label="Email" htmlFor="admin-user-email">
              <input
                id="admin-user-email"
                type="email"
                required
                autoComplete="off"
                value={newEmail}
                onChange={(event) => setNewEmail(event.target.value)}
              />
            </AdminField>
            <AdminField label="Ideiglenes jelszó" htmlFor="admin-user-password">
              <input
                id="admin-user-password"
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
              />
            </AdminField>
            <AdminField label="Szerepkör" htmlFor="admin-user-role">
              <select
                id="admin-user-role"
                value={newRole}
                onChange={(event) => setNewRole(event.target.value as AdminRole)}
              >
                <option value="admin">Admin</option>
                <option value="foadmin">Főadmin</option>
              </select>
            </AdminField>
            <div className="admin-modal__actions">
              <button type="button" className="admin-btn admin-btn--ghost" onClick={() => setCreateOpen(false)}>
                Mégse
              </button>
              <button type="submit" className="admin-btn admin-btn--primary">
                Létrehozás
              </button>
            </div>
          </form>
        </div>
      ) : null}

      {passwordUserId ? (
        <div className="admin-modal-backdrop" role="presentation" onClick={() => setPasswordUserId(null)}>
          <form
            className="admin-modal"
            onClick={(event) => event.stopPropagation()}
            onSubmit={(event) => void handlePasswordReset(event)}
          >
            <h2>Új jelszó beállítása</h2>
            <AdminField label="Új jelszó" htmlFor="admin-reset-password">
              <input
                id="admin-reset-password"
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                value={passwordValue}
                onChange={(event) => setPasswordValue(event.target.value)}
              />
            </AdminField>
            <div className="admin-modal__actions">
              <button type="button" className="admin-btn admin-btn--ghost" onClick={() => setPasswordUserId(null)}>
                Mégse
              </button>
              <button type="submit" className="admin-btn admin-btn--primary">
                Mentés
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </AdminPageShell>
  );
}
