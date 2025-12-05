import { Header } from '../components/Header';
import { PageBanner } from '../components/PageBanner';
import { Footer } from '../components/Footer';

export function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <PageBanner 
        title="Privacy Policy"
        subtitle="Your privacy is important to us. Learn how we protect your data."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Privacy', href: '/privacy' }
        ]}
      />
      
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#232323]/60 backdrop-blur-xl border border-[#c9a227]/10 rounded-3xl p-10 space-y-8">
            <div>
              <h3 className="text-[#c9a227] mb-4">1. Information We Collect</h3>
              <p className="text-[#efe9d6]/70 leading-relaxed mb-4">
                We collect information that you provide directly to us, including:
              </p>
              <ul className="list-disc list-inside text-[#efe9d6]/70 space-y-2 ml-4">
                <li>Name and contact information</li>
                <li>Email address and phone number</li>
                <li>Company information</li>
                <li>Project requirements and preferences</li>
                <li>Payment and billing information</li>
              </ul>
            </div>

            <div>
              <h3 className="text-[#c9a227] mb-4">2. How We Use Your Information</h3>
              <p className="text-[#efe9d6]/70 leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-[#efe9d6]/70 space-y-2 ml-4">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Send technical notices and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Communicate about products, services, and events</li>
              </ul>
            </div>

            <div>
              <h3 className="text-[#c9a227] mb-4">3. Information Sharing</h3>
              <p className="text-[#efe9d6]/70 leading-relaxed">
                We do not share, sell, rent, or trade your personal information with third parties for their commercial purposes. We may share your information only in the following circumstances: with your consent, to comply with laws, to protect rights and safety, or with service providers who assist us in operating our business.
              </p>
            </div>

            <div>
              <h3 className="text-[#c9a227] mb-4">4. Data Security</h3>
              <p className="text-[#efe9d6]/70 leading-relaxed">
                We take reasonable measures to help protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction. However, no Internet or email transmission is ever fully secure or error-free.
              </p>
            </div>

            <div>
              <h3 className="text-[#c9a227] mb-4">5. Data Retention</h3>
              <p className="text-[#efe9d6]/70 leading-relaxed">
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required or permitted by law.
              </p>
            </div>

            <div>
              <h3 className="text-[#c9a227] mb-4">6. Your Rights</h3>
              <p className="text-[#efe9d6]/70 leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-[#efe9d6]/70 space-y-2 ml-4">
                <li>Access and receive a copy of your personal data</li>
                <li>Rectify inaccurate personal data</li>
                <li>Request deletion of your personal data</li>
                <li>Object to processing of your personal data</li>
                <li>Request restriction of processing your personal data</li>
              </ul>
            </div>

            <div>
              <h3 className="text-[#c9a227] mb-4">7. Cookies and Tracking</h3>
              <p className="text-[#efe9d6]/70 leading-relaxed">
                We use cookies and similar tracking technologies to track activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
              </p>
            </div>

            <div>
              <h3 className="text-[#c9a227] mb-4">8. Changes to This Policy</h3>
              <p className="text-[#efe9d6]/70 leading-relaxed">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </div>

            <div>
              <h3 className="text-[#c9a227] mb-4">9. Contact Us</h3>
              <p className="text-[#efe9d6]/70 leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at privacy@raynova.tech
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
