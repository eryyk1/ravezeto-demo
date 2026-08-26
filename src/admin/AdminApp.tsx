import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AdminUiProvider } from './context/AdminUiContext';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import HomeEditPage from './pages/home/HomeEditPage';
import RolunkEditPage from './pages/rolunk/RolunkEditPage';
import ServicesHubPage from './pages/services/ServicesHubPage';
import TanacsadasEditPage from './pages/services/TanacsadasEditPage';
import FelnottkepzesEditPage from './pages/services/FelnottkepzesEditPage';
import ServiceListPage from './pages/services/ServiceListPage';
import ServiceEditPage from './pages/services/ServiceEditPage';
import TeamListPage from './pages/team/TeamListPage';
import TeamEditPage from './pages/team/TeamEditPage';
import PartnersListPage from './pages/partners/PartnersListPage';
import PartnerEditPage from './pages/partners/PartnerEditPage';
import ReferencesListPage from './pages/references/ReferencesListPage';
import ReferenceEditPage from './pages/references/ReferenceEditPage';
import ReferenciakPageEditPage from './pages/references/ReferenciakPageEditPage';
import KapcsolatEditPage from './pages/kapcsolat/KapcsolatEditPage';
import SettingsPage from './pages/settings/SettingsPage';
import PalyazatokEditPage from './pages/palyazatok/PalyazatokEditPage';
import VersionsPage from './pages/VersionsPage';
import './admin.css';

function AdminBodyClass() {
  useEffect(() => {
    document.body.classList.add('admin-mode');
    return () => document.body.classList.remove('admin-mode');
  }, []);
  return null;
}

export default function AdminApp() {
  return (
    <AuthProvider>
      <AdminUiProvider>
        <AdminBodyClass />
        <Routes>
          <Route path="login" element={<AdminLoginPage />} />
          <Route element={<ProtectedAdminRoute />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="home" element={<HomeEditPage />} />
            <Route path="rolunk" element={<RolunkEditPage />} />
            <Route path="szolgaltatasok" element={<ServicesHubPage />} />
            <Route path="szolgaltatasok/tanacsadas" element={<TanacsadasEditPage />} />
            <Route path="szolgaltatasok/felnottkepzes" element={<FelnottkepzesEditPage />} />
            <Route path="szolgaltatasok/list" element={<ServiceListPage />} />
            <Route path="szolgaltatasok/list/:id" element={<ServiceEditPage />} />
            <Route path="kapcsolat" element={<KapcsolatEditPage />} />
            <Route path="team" element={<TeamListPage />} />
            <Route path="team/:id" element={<TeamEditPage />} />
            <Route path="references" element={<ReferencesListPage />} />
            <Route path="references/page" element={<ReferenciakPageEditPage />} />
            <Route path="references/:id" element={<ReferenceEditPage />} />
            <Route path="partners" element={<PartnersListPage />} />
            <Route path="partners/:id" element={<PartnerEditPage />} />
            <Route path="palyazatok" element={<PalyazatokEditPage />} />
            <Route path="verziok" element={<VersionsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
          <Route path="*" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </AdminUiProvider>
    </AuthProvider>
  );
}
