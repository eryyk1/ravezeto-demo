import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AdminUiProvider } from './context/AdminUiContext';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import HomeEditPage from './pages/home/HomeEditPage';
import TeamListPage from './pages/team/TeamListPage';
import TeamEditPage from './pages/team/TeamEditPage';
import PartnersListPage from './pages/partners/PartnersListPage';
import PartnerEditPage from './pages/partners/PartnerEditPage';
import ReferencesListPage from './pages/references/ReferencesListPage';
import ReferenceEditPage from './pages/references/ReferenceEditPage';
import SettingsPage from './pages/settings/SettingsPage';
import PalyazatokEditPage from './pages/palyazatok/PalyazatokEditPage';
import SectionPlaceholderPage from './pages/SectionPlaceholderPage';
import './admin.css';

export default function AdminApp() {
  return (
    <AuthProvider>
      <AdminUiProvider>
        <Routes>
          <Route path="login" element={<AdminLoginPage />} />
          <Route element={<ProtectedAdminRoute />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="home" element={<HomeEditPage />} />
            <Route
              path="rolunk"
              element={
                <SectionPlaceholderPage
                  title="Rólunk"
                  description="A Rólunk oldal további szövegei és képei hamarosan szerkeszthetők lesznek."
                />
              }
            />
            <Route
              path="szolgaltatasok"
              element={
                <SectionPlaceholderPage
                  title="Szolgáltatások"
                  description="A Tanácsadás és Felnőttképzés szolgáltatás-leírásai hamarosan szerkeszthetők lesznek."
                />
              }
            />
            <Route path="team" element={<TeamListPage />} />
            <Route path="team/:id" element={<TeamEditPage />} />
            <Route path="references" element={<ReferencesListPage />} />
            <Route path="references/:id" element={<ReferenceEditPage />} />
            <Route path="partners" element={<PartnersListPage />} />
            <Route path="partners/:id" element={<PartnerEditPage />} />
            <Route path="palyazatok" element={<PalyazatokEditPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
          <Route path="*" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </AdminUiProvider>
    </AuthProvider>
  );
}
