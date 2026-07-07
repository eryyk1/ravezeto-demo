import HomeHero from './sections/HomeHero';
import HomeFundingStrip from '../../components/home/HomeFundingStrip';
import HomeQuote from './sections/HomeQuote';
import HomeAbout from './sections/HomeAbout';
import HomeServices from './sections/HomeServices';
import HomeStats from './sections/HomeStats';
import HomeReferences from './sections/HomeReferences';
import HomeMentally from './sections/HomeMentally';
import HomeFooter from '../../components/home/HomeFooter';
import './home.css';

/** Homepage — reference mockup blueprint */
export default function HomePage() {
  return (
    <div className="home-page">
      <HomeHero />
      <HomeFundingStrip />
      <HomeQuote />
      <HomeAbout />
      <HomeServices />
      <HomeStats />
      <HomeReferences />
      <HomeMentally />
      <HomeFooter />
    </div>
  );
}
