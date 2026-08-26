import { Link } from 'react-router-dom';
import ScrollReveal from '../../../components/client/ScrollReveal';
import { useHomeServices, useHomeServicesIntro } from '../../../services/content/useContent';

export default function HomeClientServices() {
  const homeServicesIntro = useHomeServicesIntro();
  const homeServices = useHomeServices(true);
  return (
    <section className="panel cardp stick pF" id="szolgaltatasok">
      <div className="wrap">
        <div className="fgrid">
          <ScrollReveal className="fintro">
            <div className="kicker">{homeServicesIntro.kicker}</div>
            <h2>{homeServicesIntro.title}</h2>
            <p className="intro">{homeServicesIntro.intro}</p>
          </ScrollReveal>
          <ScrollReveal className="facc">
            {homeServices.map((service, index) => (
              <details key={service.id} open={index === 0}>
                <summary>
                  <span>{service.title}</span>
                  <span className="pm">+</span>
                </summary>
                <div className="body">
                  {service.text}{' '}
                  {service.external ? (
                    <a
                      className="go"
                      href={service.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {service.cta} →
                    </a>
                  ) : (
                    <Link className="go" to={service.link}>
                      {service.cta} →
                    </Link>
                  )}
                </div>
              </details>
            ))}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
