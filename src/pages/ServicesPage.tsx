import { Header } from '../components/Header';
import { PageBanner } from '../components/PageBanner';
import { Services } from '../components/Services';
import { Features } from '../components/Features';
import { Process } from '../components/Process';
import { CTA } from '../components/CTA';
import { Footer } from '../components/Footer';

export function ServicesPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <PageBanner 
        title="Our Services"
        subtitle="Comprehensive AI-powered solutions designed to transform your business and drive exceptional growth"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' }
        ]}
      />
      <Services />
      <Features />
      <Process />
      <CTA />
      <Footer />
    </div>
  );
}
