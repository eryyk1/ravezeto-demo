import AdminPageHeader from '../components/AdminPageHeader';

type SectionPlaceholderPageProps = {
  title: string;
  description: string;
};

export default function SectionPlaceholderPage({
  title,
  description,
}: SectionPlaceholderPageProps) {
  return (
    <>
      <AdminPageHeader title={title} description={description} />
      <section className="admin-panel">
        <p>
          Ez a szekció a tartalomkezelő első verziójában még csak előkészítve van. A
          legfontosabb adatok (csapat, partnerek, referenciák, kezdőlap hero, beállítások,
          pályázatok szövegek) már szerkeszthetők.
        </p>
      </section>
    </>
  );
}
