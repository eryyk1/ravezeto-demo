import { jsonResponse } from '../../lib/http.js';
import { requireFoadmin } from '../../lib/adminAccess.js';
import { readAdminUsers, writeAdminUsers } from '../../lib/adminUserStore.js';
import {
  ADMIN_ROLES,
  createAdminUser,
  deleteAdminUser,
  listAdminUsers,
  resetAdminUserPassword,
  updateAdminUser,
} from '../../lib/adminUsersService.js';

function userStoreDeps(env) {
  return {
    readUsers: () => readAdminUsers(env),
    writeUsers: (record) => writeAdminUsers(env, record),
  };
}

export async function handleAdminUsersList(request, env) {
  const auth = await requireFoadmin(request, env);
  if (auth.error) return auth.error;

  const users = await listAdminUsers(() => readAdminUsers(env));
  return jsonResponse({ users });
}

export async function handleAdminUsersCreate(request, env) {
  const auth = await requireFoadmin(request, env);
  if (auth.error) return auth.error;

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'Érvénytelen kérés.' }, 400);
  }

  const email = String(body?.email ?? '').trim();
  const password = String(body?.password ?? '');
  const role = body?.role === ADMIN_ROLES.FOADMIN ? ADMIN_ROLES.FOADMIN : ADMIN_ROLES.ADMIN;

  if (!email || !password) {
    return jsonResponse({ error: 'Email és jelszó megadása kötelező.' }, 400);
  }

  const deps = userStoreDeps(env);
  const result = await createAdminUser({ email, password, role }, deps.readUsers, deps.writeUsers);
  if (!result.ok) {
    return jsonResponse({ error: result.error ?? 'Nem sikerült létrehozni.' }, result.status ?? 400);
  }
  return jsonResponse({ user: result.user }, 201);
}

export async function handleAdminUsersPatch(request, env, userId) {
  const auth = await requireFoadmin(request, env);
  if (auth.error) return auth.error;

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'Érvénytelen kérés.' }, 400);
  }

  const patch = {};
  if (body?.active !== undefined) patch.active = Boolean(body.active);
  if (body?.role !== undefined) patch.role = body.role;

  const deps = userStoreDeps(env);
  const result = await updateAdminUser(userId, patch, deps.readUsers, deps.writeUsers, auth.user);
  if (!result.ok) {
    return jsonResponse({ error: result.error ?? 'Nem sikerült frissíteni.' }, result.status ?? 400);
  }
  return jsonResponse({ user: result.user });
}

export async function handleAdminUsersPassword(request, env, userId) {
  const auth = await requireFoadmin(request, env);
  if (auth.error) return auth.error;

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'Érvénytelen kérés.' }, 400);
  }

  const password = String(body?.password ?? '');
  const deps = userStoreDeps(env);
  const result = await resetAdminUserPassword(
    userId,
    password,
    deps.readUsers,
    deps.writeUsers,
    auth.user,
  );
  if (!result.ok) {
    return jsonResponse({ error: result.error ?? 'Nem sikerült módosítani.' }, result.status ?? 400);
  }
  return jsonResponse({ ok: true });
}

export async function handleAdminUsersDelete(request, env, userId) {
  const auth = await requireFoadmin(request, env);
  if (auth.error) return auth.error;

  const deps = userStoreDeps(env);
  const result = await deleteAdminUser(userId, deps.readUsers, deps.writeUsers, auth.user);
  if (!result.ok) {
    return jsonResponse({ error: result.error ?? 'Nem sikerült törölni.' }, result.status ?? 400);
  }
  return jsonResponse({ ok: true });
}

export async function routeAdminUsers(request, env, path) {
  const match = path.match(/^\/api\/admin\/users(?:\/([^/]+))?(?:\/(password))?$/);
  if (!match) return null;

  const userId = match[1];
  const sub = match[2];

  if (!userId && request.method === 'GET') {
    return handleAdminUsersList(request, env);
  }
  if (!userId && request.method === 'POST') {
    return handleAdminUsersCreate(request, env);
  }
  if (userId && sub === 'password' && request.method === 'POST') {
    return handleAdminUsersPassword(request, env, userId);
  }
  if (userId && !sub && request.method === 'PATCH') {
    return handleAdminUsersPatch(request, env, userId);
  }
  if (userId && !sub && request.method === 'DELETE') {
    return handleAdminUsersDelete(request, env, userId);
  }

  return jsonResponse({ error: 'Method not allowed' }, 405);
}
