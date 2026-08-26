import ClientClose from '../../../components/client/ClientClose';
import { useHomeContactClose } from '../../../services/content/useContent';

export default function HomeClientClose() {
  const homeContactClose = useHomeContactClose();
  return (
    <ClientClose
      kicker={homeContactClose.kicker}
      title={homeContactClose.title}
      btnLabel={homeContactClose.cta}
      btnTo={homeContactClose.link}
    />
  );
}
