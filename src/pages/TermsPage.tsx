import { Header } from '../components/Header';
import { PageBanner } from '../components/PageBanner';
import { Footer } from '../components/Footer';

export function TermsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <PageBanner 
        title="Terms of Service"
        subtitle="Please read these terms carefully before using our services"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Terms', href: '/terms' }
        ]}
      />
      
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#232323]/60 backdrop-blur-xl border border-[#c9a227]/10 rounded-3xl p-10 space-y-8">
            <div>
              <h3 className="text-[#c9a227] mb-4">1. Acceptance of Terms</h3>
              <p className="text-[#efe9d6]/70 leading-relaxed">
                By accessing and using RayNova Tech's services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </div>

            <div>
              <h3 className="text-[#c9a227] mb-4">2. Use License</h3>
              <p className="text-[#efe9d6]/70 leading-relaxed mb-4">
                Permission is granted to temporarily access the services provided by RayNova Tech for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside text-[#efe9d6]/70 space-y-2 ml-4">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose</li>
                <li>Attempt to decompile or reverse engineer any software</li>
                <li>Remove any copyright or other proprietary notations</li>
              </ul>
            </div>

            <div>
              <h3 className="text-[#c9a227] mb-4">3. Service Terms</h3>
              <p className="text-[#efe9d6]/70 leading-relaxed">
                RayNova Tech reserves the right to modify or discontinue any service at any time without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuance of service.
              </p>
            </div>

            <div>
              <h3 className="text-[#c9a227] mb-4">4. Intellectual Property</h3>
              <p className="text-[#efe9d6]/70 leading-relaxed">
                All content, features, and functionality of our services are owned by RayNova Tech and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>
            </div>

            <div>
              <h3 className="text-[#c9a227] mb-4">5. Limitation of Liability</h3>
              <p className="text-[#efe9d6]/70 leading-relaxed">
                In no event shall RayNova Tech or its suppliers be liable for any damages arising out of the use or inability to use the services, even if RayNova Tech has been notified orally or in writing of the possibility of such damage.
              </p>
            </div>

            <div>
              <h3 className="text-[#c9a227] mb-4">6. Governing Law</h3>
              <p className="text-[#efe9d6]/70 leading-relaxed">
                These terms shall be governed and construed in accordance with the laws of the jurisdiction in which RayNova Tech operates, without regard to its conflict of law provisions.
              </p>
            </div>

            <div>
              <h3 className="text-[#c9a227] mb-4">7. Contact Information</h3>
              <p className="text-[#efe9d6]/70 leading-relaxed">
                If you have any questions about these Terms, please contact us at legal@raynova.tech
              </p>
            </div>

            <div className="pt-6 border-t border-[#c9a227]/20">
              <p className="text-[#efe9d6]/50 text-sm">
                Last updated: November 30, 2025
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
