import AdminPageShell from '../components/AdminPageShell';

type SectionPlaceholderPageProps = {
  title: string;
  description: string;
};

export default function SectionPlaceholderPage({
  title,
  description,
}: SectionPlaceholderPageProps) {
  return (
    <AdminPageShell title={title} description={description}>
      <section className="admin-panel">
        <p className="admin-panel__lead">
          Ez a szekció a tartalomkezelő első verziójában még csak előkészítve van. A
          legfontosabb adatok (csapat, partnerek, referenciák, kezdőlap hero, beállítások,
          pályázatok szövegek) már szerkeszthetők.
        </p>
      </section>
    </AdminPageShell>
  );
}
