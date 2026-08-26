import ClientClose from '../../components/client/ClientClose';
import ContentPhotoSlot from '../../components/client/ContentPhotoSlot';
import GoldMark from '../../components/client/GoldMark';
import HeroWatermark from '../../components/client/HeroWatermark';
import ScrollReveal from '../../components/client/ScrollReveal';
import {
  felnottkepzesCategories,
  felnottkepzesContact,
  felnottkepzesCredentials,
  felnottkepzesCta,
  felnottkepzesHero,
  felnottkepzesKeyMessage,
  felnottkepzesMethodTags,
  felnottkepzesMotto,
  felnottkepzesProcess,
  felnottkepzesProgrammeGroups,
} from '../../content/felnottkepzes';
import TrainingCatalog from './TrainingCatalog';
import './felnottkepzes.css';

const trainingCount = felnottkepzesProgrammeGroups.reduce(
  (sum, group) => sum + group.items.length,
  0,
);

const photoPlaceholders = [
  '📷 tréningterem – jelenetfotó helye\n(tompított, meleg tónus)',
  '📷 kommunikációs tréning – jelenetfotó helye',
  '📷 vezetői tréning – jelenetfotó helye',
  '📷 generációs workshop – jelenetfotó helye',
  '📷 stresszkezelési tréning – jelenetfotó helye',
] as const;

export default function FelnottkepzesPage() {
  return (
    <>
      <section className="hero-sub">
        <HeroWatermark />
        <div className="wrap">
          <div className="kicker">{felnottkepzesHero.label}</div>
          <h1>
            {felnottkepzesHero.titleLead}{' '}
            <GoldMark>{felnottkepzesHero.titleMark}</GoldMark>
          </h1>
          <p className="award-line">
            <span className="g">›</span>
            {felnottkepzesHero.awardLine}
          </p>
        </div>
      </section>

      <section className="sec sec-w">
        <div className="wrap">
          <ScrollReveal className="band flip">
            <div>
              <h2 className="sec-t2">{felnottkepzesKeyMessage.title}.</h2>
              <p className="mut">{felnottkepzesCredentials.paragraphs[0]}</p>
              <p className="mut" style={{ marginTop: '1rem' }}>
                {felnottkepzesProcess.lead} Ennek szerves része a tananyagfejlesztés
                is.
              </p>
            </div>
            <ContentPhotoSlot placeholder={photoPlaceholders[0]} alt="" />
          </ScrollReveal>

          <ScrollReveal className="mid">
            <p>{felnottkepzesKeyMessage.text}</p>
            <ScrollReveal
              as="div"
              className="tagrow"
              aria-label="Oktatás-módszertani megoldásaink"
            >
              {felnottkepzesMethodTags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </ScrollReveal>
            <p style={{ marginTop: '1.4rem' }}>
              {felnottkepzesCredentials.paragraphs[2]}
            </p>
          </ScrollReveal>

          <ScrollReveal className="doc">
            <div className="toplab">Engedélyezett felnőttképző intézmény</div>
            <div className="grid">
              <div>
                <div className="lab">Nyilvántartásba vételi számunk</div>
                <div className="num">B/2020/001943</div>
              </div>
              <div>
                <div className="lab">Engedélyszámunk</div>
                <div className="num">E/2021/000106</div>
              </div>
            </div>
            <div className="note">
              Cégünk felnőttképzési engedéllyel rendelkező intézmény.
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="sec strip">
        <ScrollReveal className="wrap">
          <p>{felnottkepzesMotto}</p>
        </ScrollReveal>
      </section>

      <section className="sec sec-w">
        <div className="wrap">
          <ScrollReveal as="div" className="kicker">
            Főbb képzési területeink
          </ScrollReveal>
          <ScrollReveal as="h2" className="sec-t">
            Négy terület, amelyben a legerősebbek vagyunk.
          </ScrollReveal>

          {felnottkepzesCategories.map((category, index) => {
            const flip = index % 2 === 1;
            const photoIndex = index + 1;

            return (
              <ScrollReveal
                key={category.id}
                className={`band${flip ? ' flip' : ''}`}
              >
                {!flip ? (
                  <ContentPhotoSlot
                    placeholder={photoPlaceholders[photoIndex]}
                    alt={category.title}
                  />
                ) : null}
                <div>
                  <h3>{category.title}</h3>
                  <p>{category.text}</p>
                </div>
                {flip ? (
                  <ContentPhotoSlot
                    placeholder={photoPlaceholders[photoIndex]}
                    alt={category.title}
                  />
                ) : null}
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <TrainingCatalog
            groups={felnottkepzesProgrammeGroups}
            trainingCount={trainingCount}
            areaCount={felnottkepzesProgrammeGroups.length}
          />
        </div>
      </section>

      <section className="sec sec-w">
        <div className="wrap">
          <ScrollReveal as="div" className="kicker">
            Elérhetőségeink
          </ScrollReveal>
          <ScrollReveal as="h2" className="sec-t">
            Ügyfélszolgálat és iroda.
          </ScrollReveal>
          <div className="duo">
            <ScrollReveal as="article" className="info">
              <h3>{felnottkepzesContact.customerService.title}</h3>
              <p className="big">{felnottkepzesContact.customerService.address}</p>
              <p>{felnottkepzesContact.customerService.hours}</p>
            </ScrollReveal>
            <ScrollReveal as="article" className="info">
              <h3>{felnottkepzesContact.office.title}</h3>
              <p className="big">{felnottkepzesContact.office.address}</p>
              <p>{felnottkepzesContact.office.note}</p>
              <a
                className="map"
                href={felnottkepzesContact.office.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Megnyitás térképen →
              </a>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <ClientClose
        kicker={felnottkepzesCta.kicker}
        title={felnottkepzesCta.title}
        btnLabel={felnottkepzesCta.btnLabel}
        btnTo={felnottkepzesCta.link}
      />
    </>
  );
}
