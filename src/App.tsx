import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/shell/Layout';
import PageTransition from './components/shell/PageTransition';
import HomePage from './pages/home/HomePage';
import RolunkPage from './pages/rolunk/RolunkPage';
import TanacsadasPage from './pages/tanacsadas/TanacsadasPage';
import MentallyPage from './pages/mentally/MentallyPage';
import FelnottkepzesPage from './pages/felnottkepzes/FelnottkepzesPage';
import ReferenciakPage from './pages/referenciak/ReferenciakPage';
import PalyazatokPage from './pages/palyazatok/PalyazatokPage';
import KapcsolatPage from './pages/kapcsolat/KapcsolatPage';
import JogiPage from './pages/jogi/JogiPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<PageTransition />}>
          <Route index element={<HomePage />} />
          <Route path="rolunk" element={<RolunkPage />} />
          <Route path="tanacsadas/*" element={<TanacsadasPage />} />
          <Route path="felnottkepzes/*" element={<FelnottkepzesPage />} />
          <Route path="referenciak" element={<ReferenciakPage />} />
          <Route path="palyazatok" element={<PalyazatokPage />} />
          <Route path="mentally" element={<MentallyPage />} />
          <Route path="kapcsolat" element={<KapcsolatPage />} />
          <Route path="jogi/*" element={<JogiPage />} />

          <Route path="csapatunk" element={<Navigate to="/rolunk" replace />} />
          <Route path="felnottkepzesek/*" element={<Navigate to="/felnottkepzes" replace />} />
          <Route path="referenciaink" element={<Navigate to="/referenciak" replace />} />
          <Route path="kapcsolatok" element={<Navigate to="/kapcsolat" replace />} />
          <Route path="szolgaltatasok/*" element={<Navigate to="/tanacsadas" replace />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
