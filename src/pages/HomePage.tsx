import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { Services } from '../components/Services';
import { Features } from '../components/Features';
import { Process } from '../components/Process';
import { About } from '../components/About';
import { Blog } from '../components/Blog';
import { CTA } from '../components/CTA';
import { Footer } from '../components/Footer';

export function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Services />
      <Features />
      <Process />
      <Blog />
      <CTA />
      <Footer />
    </div>
  );
}
