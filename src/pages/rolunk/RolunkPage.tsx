import ClientClose from '../../components/client/ClientClose';
import GoldMark from '../../components/client/GoldMark';
import ScrollReveal from '../../components/client/ScrollReveal';
import { useRolunkContent, useTeamMembers } from '../../services/content/useContent';

function MottoArt() {
  return (
    <div className="motto-art" aria-hidden="true">
      <svg viewBox="0 0 200 170" fill="none">
        <path d="M20 160 L80 100 L140 160 H106 L80 134 L54 160 Z" fill="#9DAD52" opacity=".1" />
        <path d="M20 116 L80 56 L140 116 H106 L80 90 L54 116 Z" fill="#75833A" opacity=".14" />
        <path d="M50 62 L80 32 L110 62 H91 L80 51 L69 62 Z" fill="#D6A548" opacity=".22" />
      </svg>
    </div>
  );
}

export default function RolunkPage() {
  const teamMembers = useTeamMembers(true);
  const { hero: rolunkHero, story: rolunkStory, values: rolunkValues, closing: rolunkClosing, close: rolunkClose } =
    useRolunkContent();
  const mottoParagraph = [rolunkStory.pullQuote, ...rolunkStory.paragraphs].join(' ');

  return (
    <>
      <section className="hero-sub">
        <div className="wrap">
          <div className="kicker">{rolunkHero.label}</div>
          <h1>
            {rolunkHero.title} <GoldMark>{rolunkHero.titleMark}</GoldMark>
          </h1>
          <p className="lead">{rolunkHero.intro}</p>
        </div>
        <div className="wrap" style={{ marginTop: '3rem' }}>
          <ScrollReveal className="team-photo">
            <img src={rolunkHero.image} alt={rolunkHero.imageAlt} loading="lazy" decoding="async" />
          </ScrollReveal>
        </div>
      </section>

      <section className="sec sec-w motto-sec">
        <MottoArt />
        <ScrollReveal className="wrap motto">
          <div className="latin">
            <span className="gm">„</span>
            {rolunkStory.motto}
            <span className="gm">”</span>
          </div>
          <p>{mottoParagraph}</p>
        </ScrollReveal>
      </section>

      <section className="sec">
        <div className="wrap">
          <ScrollReveal as="h2" className="sec-t">
            Csapatunk
          </ScrollReveal>
          <div className="team-grid">
            {teamMembers.map((member) => (
              <ScrollReveal as="article" className="member" key={member.id}>
                <div className="photo">
                  <img
                    src={member.portrait}
                    alt={member.name}
                    loading="lazy"
                    decoding="async"
                    style={
                      member.portraitPosition
                        ? { objectPosition: member.portraitPosition }
                        : undefined
                    }
                  />
                </div>
                <h3>{member.name}</h3>
                <p className="bio">{member.bio}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sec-w">
        <div className="wrap">
          <ScrollReveal as="div" className="kicker">
            {rolunkValues.label}
          </ScrollReveal>
          <ScrollReveal as="h2" className="sec-t">
            {rolunkValues.title}
          </ScrollReveal>
          <ScrollReveal className="values-img">
            <img src={rolunkValues.image} alt={rolunkValues.title} loading="lazy" decoding="async" />
          </ScrollReveal>
          <ScrollReveal className="vlabels">
            {rolunkValues.labels.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </ScrollReveal>
        </div>
      </section>

      <ClientClose
        kicker={rolunkClose.kicker}
        title={rolunkClose.title}
        refsLine={rolunkClosing}
        btnLabel={rolunkClose.cta}
        btnTo={rolunkClose.link}
      />
    </>
  );
}
