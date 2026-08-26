import ClientClose from '../../../components/client/ClientClose';
import { homeContactClose } from '../../../content/home';

export default function HomeClientClose() {
  return (
    <ClientClose
      kicker={homeContactClose.kicker}
      title={homeContactClose.title}
      btnLabel={homeContactClose.cta}
      btnTo={homeContactClose.link}
    />
  );
}
