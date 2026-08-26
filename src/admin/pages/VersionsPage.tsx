import AdminPageShell from '../components/AdminPageShell';
import VersionHistoryPanel from '../components/VersionHistoryPanel';

export default function VersionsPage() {
  return (
    <AdminPageShell
      title="Verzióelőzmények"
      description="Korábbi publikált állapotok megtekintése és biztonságos visszaállítása."
    >
      <VersionHistoryPanel />
    </AdminPageShell>
  );
}
