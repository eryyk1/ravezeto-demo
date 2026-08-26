import ScrollReveal from '../../../components/client/ScrollReveal';
import { useHomeReasons } from '../../../services/content/useContent';

export default function HomeClientReasons() {
  const homeReasons = useHomeReasons();
  return (
    <section className="cardp c-hatok">
      <div className="hatok-intro">
        <ScrollReveal as="div" className="kicker">
          {homeReasons.title}
        </ScrollReveal>
        <ScrollReveal as="p" className="sub">
          {homeReasons.intro}
        </ScrollReveal>
      </div>
      <div className="wrap">
        {homeReasons.items.map((item) => (
          <section className="word-sec" key={item.emphasis}>
            <ScrollReveal className="inner">
              <div className="big">
                <b>{item.emphasis}</b>
                {item.rest}
              </div>
              <div className="rest">{item.subtitle}</div>
              <p>{item.text}</p>
            </ScrollReveal>
          </section>
        ))}
      </div>
    </section>
  );
}
