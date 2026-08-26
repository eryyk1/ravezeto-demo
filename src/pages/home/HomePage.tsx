import HomeClientClose from './sections/HomeClientClose';
import HomeClientHero from './sections/HomeClientHero';
import HomeClientQuote from './sections/HomeClientQuote';
import HomeClientReasons from './sections/HomeClientReasons';
import HomeClientServices from './sections/HomeClientServices';
import HomeClientStats from './sections/HomeClientStats';

export default function HomePage() {
  return (
    <>
      <HomeClientHero />
      <HomeClientQuote />
      <HomeClientReasons />
      <HomeClientServices />
      <HomeClientStats />
      <HomeClientClose />
    </>
  );
}
