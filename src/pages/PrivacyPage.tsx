import { Header } from '../components/Header';
import { PageBanner } from '../components/PageBanner';
import { Footer } from '../components/Footer';

export function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <PageBanner
        title="Privacy Policy"
        subtitle="How we collect, use, and protect your information."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Privacy', href: '/privacy' }
        ]}
      />

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#232323]/60 backdrop-blur-xl border border-[#c9a227]/10 rounded-3xl p-10 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-[#c9a227] mb-2 uppercase">RAYNOVATECH PRIVACY POLICY</h2>
              <p className="text-[#efe9d6]/50 text-sm mb-6">Last Updated: December 2025</p>
              <p className="text-[#efe9d6]/70 leading-relaxed mb-4">
                RAYNOVA TECH, operating under AL RAYAH GLOBAL GROUP LTD, upholds a standard of conduct defined by integrity, accountability, and disciplined stewardship. We safeguard all personal information entrusted to us with the highest degree of responsibility, transparency, and professional excellence. This Privacy Policy explains how we collect, use, protect, and govern personal information across all jurisdictions in which we operate, including the United Kingdom, the European Union, Switzerland, the United States, and beyond.
              </p>
            </div>

            <div>
              <h3 className="text-[#c9a227] mb-4">1. Data Controller</h3>
              <p className="text-[#efe9d6]/70 leading-relaxed mb-2">
                The organisation responsible for your personal information (“Data Controller”) is:
              </p>
              <ul className="list-disc list-inside text-[#efe9d6]/70 ml-4 mb-2">
                <li>AL RAYAH GLOBAL GROUP LTD</li>
                <li>Trading As: RAYNOVA TECH</li>
                <li>Registered Address: 11–12 Old Bond Street, Mayfair, London, W1S 4PN, United Kingdom</li>
                <li>Email: <a href="mailto:privacy@raynova.tech" className="underline transition-colors hover:text-[#c9a227]">privacy@raynova.tech</a> or <a href="mailto:privacy@raynovatech.com" className="underline transition-colors hover:text-[#c9a227]">privacy@raynovatech.com</a></li>
              </ul>
              <p className="text-[#efe9d6]/70 leading-relaxed">
                A Data Protection Officer or designated representative may be appointed if required by law; such details will be provided upon request.
              </p>
            </div>

            <div>
              <h3 className="text-[#c9a227] mb-4">2. Information We Collect</h3>
              <p className="text-[#efe9d6]/70 leading-relaxed mb-2">
                We collect information provided directly by you or generated through your interaction with our services, including:
              </p>
              <ul className="list-disc list-inside text-[#efe9d6]/70 ml-4 mb-2">
                <li>Name, email address, phone number</li>
                <li>Company and organisational information</li>
                <li>Service requests, technical requirements, and project specifications</li>
                <li>Billing and payment information</li>
                <li>Correspondence and communication records</li>
                <li>Technical information such as IP address, device data, and browser type</li>
                <li>Usage data via cookies and analytics tools</li>
              </ul>
              <p className="text-[#efe9d6]/70 leading-relaxed">
                We do not intentionally collect sensitive categories of data unless explicitly provided for a defined purpose.
              </p>
            </div>

            <div>
              <h3 className="text-[#c9a227] mb-4">3. Legal Basis for Processing (UK-GDPR & EU-GDPR)</h3>
              <p className="text-[#efe9d6]/70 leading-relaxed mb-2">
                We process personal data under the following legal bases:
              </p>
              <ul className="list-disc list-inside text-[#efe9d6]/70 ml-4 mb-2">
                <li><b>Contractual Necessity:</b> To deliver, manage, and fulfil the services you request.</li>
                <li><b>Legitimate Interests:</b> To operate, maintain, and improve our services; ensure security; prevent misuse; and support operational needs.</li>
                <li><b>Consent:</b> When you voluntarily submit information or opt into communications.</li>
                <li><b>Legal Obligation:</b> To satisfy tax, accounting, anti-fraud, and regulatory requirements.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-[#c9a227] mb-4">4. How We Use Your Information</h3>
              <ul className="list-disc list-inside text-[#efe9d6]/70 ml-4 mb-2">
                <li>Deliver and optimise our services and solutions</li>
                <li>Provide client support and technical assistance</li>
                <li>Communicate updates, project progress, and relevant service information</li>
                <li>Process payments and maintain accurate financial records</li>
                <li>Enhance platform performance and security</li>
                <li>Analyse usage patterns and improve user experience</li>
                <li>Strengthen operational processes and quality assurance</li>
              </ul>
              <p className="text-[#efe9d6]/70 leading-relaxed">
                We do not sell, rent, or trade personal information.
              </p>
            </div>

            <div>
              <h3 className="text-[#c9a227] mb-4">5. Information Sharing</h3>
              <p className="text-[#efe9d6]/70 leading-relaxed mb-2">
                We share information only where operationally necessary, legally permissible, and contractually safeguarded:
              </p>
              <ul className="list-disc list-inside text-[#efe9d6]/70 ml-4 mb-2">
                <li>
                  <b>Service Providers:</b> We work with trusted partners to support our services, including:
                  <ul className="list-disc list-inside ml-6">
                    <li>Hosting and infrastructure providers</li>
                    <li>Cloud services and storage</li>
                    <li>Payment processors</li>
                    <li>Analytics and performance tools</li>
                    <li>Communication platforms</li>
                    <li>Contracted development teams (including our engineering partners in Pakistan)</li>
                  </ul>
                  These partners process data strictly under our direction and confidentiality obligations.
                </li>
                <li>
                  <b>Legal Requirements:</b> We may disclose information to comply with:
                  <ul className="list-disc list-inside ml-6">
                    <li>Applicable laws</li>
                    <li>Regulatory duties</li>
                    <li>Court orders or government requests</li>
                    <li>Fraud prevention and security protocols</li>
                  </ul>
                </li>
                <li>
                  <b>Business Transactions:</b> In the event of a reorganisation, merger, or acquisition, data may be transferred under continued protective measures.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-[#c9a227] mb-4">6. International Data Transfers</h3>
              <p className="text-[#efe9d6]/70 leading-relaxed mb-2">
                Your data may be transferred to jurisdictions outside the UK, EU, or Switzerland, including the United States and Pakistan.
              </p>
              <p className="text-[#efe9d6]/70 leading-relaxed mb-2">
                Where transfers occur, we implement recognised safeguards such as:
              </p>
              <ul className="list-disc list-inside text-[#efe9d6]/70 ml-4 mb-2">
                <li>Standard Contractual Clauses (SCCs)</li>
                <li>UK International Data Transfer Addendum (IDTA)</li>
                <li>Swiss-compliant contractual protections</li>
                <li>Appropriate technical and organisational controls</li>
              </ul>
              <p className="text-[#efe9d6]/70 leading-relaxed">
                These safeguards ensure an equivalent level of data protection worldwide.
              </p>
            </div>

            <div>
              <h3 className="text-[#c9a227] mb-4">7. Your Rights (UK, EU & Swiss Residents)</h3>
              <p className="text-[#efe9d6]/70 leading-relaxed mb-2">
                You may exercise the following rights:
              </p>
              <ul className="list-disc list-inside text-[#efe9d6]/70 ml-4 mb-2">
                <li>Access your personal data</li>
                <li>Request correction or updates</li>
                <li>Request deletion (“right to erasure”)</li>
                <li>Restrict or object to processing</li>
                <li>Request data portability</li>
                <li>Withdraw consent, where applicable</li>
              </ul>
              <p className="text-[#efe9d6]/70 leading-relaxed">
                Requests may be submitted to <a href="mailto:privacy@raynova.tech" className="underline transition-colors hover:text-[#c9a227]">privacy@raynova.tech</a> or <a href="mailto:privacy@raynovatech.com" className="underline transition-colors hover:text-[#c9a227]">privacy@raynovatech.com</a>. We shall respond within 30 days, in accordance with legal requirements.
              </p>
            </div>

            <div>
              <h3 className="text-[#c9a227] mb-4">8. United States Privacy Rights</h3>
              <p className="text-[#efe9d6]/70 leading-relaxed mb-2">
                This section applies to clients residing in the United States.
              </p>
              <ul className="list-disc list-inside text-[#efe9d6]/70 ml-4 mb-2">
                <li>
                  <b>California (CPRA/CCPA):</b>
                  <ul className="list-disc list-inside ml-6">
                    <li>Request access, deletion, and correction of your data</li>
                    <li>Request disclosure of categories of data collected</li>
                    <li>Opt out of sale or sharing (we do not sell data)</li>
                    <li>Exercise rights without discrimination</li>
                  </ul>
                </li>
                <li>
                  <b>Texas (TDPSA):</b>
                  <ul className="list-disc list-inside ml-6">
                    <li>Access, correction, and deletion</li>
                    <li>Opt-out of targeted advertising or profiling</li>
                  </ul>
                </li>
                <li>
                  <b>Other U.S. States:</b> If your state has applicable privacy legislation, you may exercise similar rights as described above.
                </li>
              </ul>
              <p className="text-[#efe9d6]/70 leading-relaxed">
                All requests should be directed to: <a href="mailto:privacy@raynova.tech" className="underline transition-colors hover:text-[#c9a227]">privacy@raynova.tech</a> or <a href="mailto:privacy@raynovatech.com" className="underline transition-colors hover:text-[#c9a227]">privacy@raynovatech.com</a>
              </p>
            </div>

            <div>
              <h3 className="text-[#c9a227] mb-4">9. Cookies & Tracking Technologies</h3>
              <p className="text-[#efe9d6]/70 leading-relaxed mb-2">
                We use cookies and similar technologies for:
              </p>
              <ul className="list-disc list-inside text-[#efe9d6]/70 ml-4 mb-2">
                <li>Essential site functionality</li>
                <li>Security and system integrity</li>
                <li>Analytics and performance insights</li>
                <li>Enhancing user experience</li>
              </ul>
              <p className="text-[#efe9d6]/70 leading-relaxed">
                You may manage or disable cookies through your browser settings. A supplementary cookie policy or banner may apply depending on jurisdiction.
              </p>
            </div>

            <div>
              <h3 className="text-[#c9a227] mb-4">10. Automated Decision-Making & Profiling</h3>
              <p className="text-[#efe9d6]/70 leading-relaxed mb-2">
                RAYNOVA TECH uses automated tools and analytics to enhance service quality, detect anomalies, and optimise system performance.
              </p>
              <p className="text-[#efe9d6]/70 leading-relaxed mb-2">
                We do not engage in automated decision-making that produces legal or significant effects on individuals.
              </p>
              <p className="text-[#efe9d6]/70 leading-relaxed">
                All consequential decisions involving clients are reviewed and determined by qualified personnel.
              </p>
            </div>

            <div>
              <h3 className="text-[#c9a227] mb-4">11. Data Security</h3>
              <p className="text-[#efe9d6]/70 leading-relaxed mb-2">
                We maintain advanced administrative, technical, and organisational measures to protect personal information from:
              </p>
              <ul className="list-disc list-inside text-[#efe9d6]/70 ml-4 mb-2">
                <li>Unauthorised access</li>
                <li>Loss or theft</li>
                <li>Misuse or alteration</li>
                <li>Destruction or corruption</li>
              </ul>
              <p className="text-[#efe9d6]/70 leading-relaxed">
                We continuously review and strengthen our security framework to ensure operational excellence and data integrity.
              </p>
            </div>

            <div>
              <h3 className="text-[#c9a227] mb-4">12. Data Retention</h3>
              <p className="text-[#efe9d6]/70 leading-relaxed mb-2">
                We retain personal data only for as long as necessary to fulfil the purposes outlined in this policy, including:
              </p>
              <ul className="list-disc list-inside text-[#efe9d6]/70 ml-4 mb-2">
                <li>Service delivery</li>
                <li>Operational requirements</li>
                <li>Legal and regulatory compliance</li>
              </ul>
              <p className="text-[#efe9d6]/70 leading-relaxed">
                Data is securely deleted or anonymised once retention obligations are satisfied.
              </p>
            </div>

            <div>
              <h3 className="text-[#c9a227] mb-4">13. Children’s Privacy</h3>
              <p className="text-[#efe9d6]/70 leading-relaxed mb-2">
                Our services are not directed to individuals under:
              </p>
              <ul className="list-disc list-inside text-[#efe9d6]/70 ml-4 mb-2">
                <li>13 years of age in the United States, or</li>
                <li>16 years of age in the UK/EU</li>
              </ul>
              <p className="text-[#efe9d6]/70 leading-relaxed">
                We do not knowingly collect data from minors. If such information is inadvertently collected, it will be promptly removed.
              </p>
            </div>

            <div>
              <h3 className="text-[#c9a227] mb-4">14. Complaints & Supervisory Authorities</h3>
              <p className="text-[#efe9d6]/70 leading-relaxed mb-2">
                If you believe your rights have been infringed, you may submit a complaint to:
              </p>
              <ul className="list-disc list-inside text-[#efe9d6]/70 ml-4 mb-2">
                <li>United Kingdom: Information Commissioner’s Office (ICO)</li>
                <li>European Union: Your local supervisory authority</li>
                <li>Switzerland: Federal Data Protection and Information Commissioner (FDPIC)</li>
              </ul>
              <p className="text-[#efe9d6]/70 leading-relaxed">
                We encourage resolving concerns through our internal privacy team at: <a href="mailto:privacy@raynova.tech" className="underline transition-colors hover:text-[#c9a227]">privacy@raynova.tech</a> or <a href="mailto:privacy@raynovatech.com" className="underline transition-colors hover:text-[#c9a227]">privacy@raynovatech.com</a>
              </p>
            </div>

            <div>
              <h3 className="text-[#c9a227] mb-4">15. Changes to This Policy</h3>
              <p className="text-[#efe9d6]/70 leading-relaxed">
                We may update this Privacy Policy to reflect legal, operational, or strategic developments. Updates will be posted with a revised “Last Updated” date. Continued use of our services indicates acceptance of the updated terms.
              </p>
            </div>

            <div>
              <h3 className="text-[#c9a227] mb-4">16. Contact Us</h3>
              <p className="text-[#efe9d6]/70 leading-relaxed mb-2">
                For inquiries, rights requests, or privacy matters:
              </p>
              <ul className="list-disc list-inside text-[#efe9d6]/70 ml-4 mb-2">
                <li>RAYNOVA TECH — AL RAYAH GLOBAL GROUP LTD</li>
                <li>Email: <a href="mailto:privacy@raynova.tech" className="underline transition-colors hover:text-[#c9a227]">privacy@raynova.tech</a> or <a href="mailto:privacy@raynovatech.com" className="underline transition-colors hover:text-[#c9a227]">privacy@raynovatech.com</a></li>
                <li>Website: <a href="https://www.raynova.tech" className="underline transition-colors hover:text-[#c9a227]">www.raynova.tech</a> or <a href="https://www.raynovatech.com" className="underline transition-colors hover:text-[#c9a227]">www.raynovatech.com</a></li>
              </ul>
              <p className="text-[#efe9d6]/70 leading-relaxed">
                We conduct all data governance with precision, clarity, and a commitment to principled stewardship.
              </p>
            </div>

            <div className="pt-6 border-t border-[#c9a227]/20">
              <p className="text-[#efe9d6]/50 text-sm">
                Last updated: December 2025
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
