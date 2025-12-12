import { Header } from '../components/Header';
import { PageBanner } from '../components/PageBanner';
import { Blog } from '../components/Blog';
import { Footer } from '../components/Footer';

export function BlogPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <PageBanner
        title="Our Blog"
        subtitle="Stay updated with the latest insights, trends, and innovations in AI and web development"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Blog', href: '/blog' }
        ]}
      />
      <Blog />
      <Footer />
    </div>
  );
}
