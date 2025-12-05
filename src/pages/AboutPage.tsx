import { Header } from '../components/Header';
import { PageBanner } from '../components/PageBanner';
import { VisionMission } from '../components/VisionMission';
import { CoreValues } from '../components/CoreValues';
import { Leadership } from '../components/Leadership';
import { Partners } from '../components/Partners';
import { Footer } from '../components/Footer';

export function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <PageBanner 
        title="About Us"
        subtitle="Discover the story behind RayNova Tech and the passionate team driving AI innovation forward"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' }
        ]}
      />
      <VisionMission />
      <CoreValues />
      <Leadership />
      <Partners />
      <Footer />
    </div>
  );
}
