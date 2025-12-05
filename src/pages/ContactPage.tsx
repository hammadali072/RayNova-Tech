import { Header } from '../components/Header';
import { PageBanner } from '../components/PageBanner';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';

export function ContactPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <PageBanner 
        title="Contact Us"
        subtitle="Let's discuss how we can help transform your business with AI-powered solutions"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Contact', href: '/contact' }
        ]}
      />
      <Contact />
      <Footer />
    </div>
  );
}
