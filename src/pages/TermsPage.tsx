import { Header } from '../components/Header';
import { PageBanner } from '../components/PageBanner';
import { Footer } from '../components/Footer';

export function TermsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <PageBanner
        title="Terms & Conditions"
        subtitle="Please read our terms before using our services."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Terms & Conditions', href: '/terms' }
        ]}
      />
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#232323]/60 backdrop-blur-xl border border-[#c9a227]/10 rounded-3xl p-10 space-y-8">
            <div className="flex flex-col items-center mb-6">
              <h2 className="text-2xl font-bold text-[#c9a227] uppercase mb-2">RAYNOVA TECH — TERMS & CONDITIONS</h2>
              <p className="text-[#efe9d6]/50 text-sm">Last Updated: December 2025</p>
            </div>
            <div className="text-[#efe9d6]/70 leading-relaxed space-y-6">
              <p>
                These Terms &amp; Conditions (“Terms”) govern your access to and use of RAYNOVA TECH’s services, products, platforms, and communications. By using our website or engaging our services, you agree to be bound by these Terms.
                <br /><br />
                RAYNOVA TECH operates under the authority of:<br />
                AL RAYAH GLOBAL GROUP LTD<br />
                Trading As: RAYNOVA TECH<br />
                Registered in the United Kingdom<br />
                Company Registration No.: 16846341<br />
                Registered Address: 11–12 Old Bond Street, Mayfair, London, W1S 4PN
                <br /><br />
                If you do not accept these Terms, you must not use our services.
              </p>
              <h3 className="text-[#c9a227] font-semibold">1. Definitions</h3>
              <ul className="list-disc list-inside ml-4">
                <li>“Company” / “We” / “Us” means AL RAYAH GLOBAL GROUP LTD (DBA RaynovaTech).</li>
                <li>“Client” / “You” means any entity or individual using or purchasing our services.</li>
                <li>“Services” means all digital, automation, AI, consulting, development, or related offerings.</li>
                <li>“Agreement” means these Terms, contractual documents, proposals, SOWs, or written confirmations.</li>
                <li>“Deliverables” means any work product produced for the Client.</li>
              </ul>
              <h3 className="text-[#c9a227] font-semibold">2. Acceptance of Terms</h3>
              <p>Your use of our website or services constitutes acceptance of these Terms. If you represent a company, you affirm that you are authorized to bind that company to this Agreement.</p>
              <h3 className="text-[#c9a227] font-semibold">3. Scope of Services</h3>
              <p>RaynovaTech provides:</p>
              <ul className="list-disc list-inside ml-4">
                <li>AI system development</li>
                <li>Automation engineering</li>
                <li>Software development</li>
                <li>Digital transformation consulting</li>
                <li>Infrastructure, workflow, and operational solutions</li>
                <li>Advisory and implementation services</li>
              </ul>
              <p>Specific scope may be detailed in a Statement of Work (SOW) or formal proposal.</p>
              <h3 className="text-[#c9a227] font-semibold">4. Amendments to Services</h3>
              <p>We may update, refine, or modify any service. Material changes affecting active client contracts will be communicated when applicable.</p>
              <h3 className="text-[#c9a227] font-semibold">5. Eligibility</h3>
              <p>You must be:</p>
              <ul className="list-disc list-inside ml-4">
                <li>At least 18 years old, AND</li>
                <li>Legally authorized to enter commercial agreements.</li>
              </ul>
              <h3 className="text-[#c9a227] font-semibold">6. Use of Services</h3>
              <p>Clients agree not to misuse, interfere with, reverse engineer, extract source code, or violate usage limitations of RaynovaTech systems.</p>
              <h3 className="text-[#c9a227] font-semibold">7. Client Responsibilities</h3>
              <ul className="list-disc list-inside ml-4">
                <li>Provide accurate information and necessary access</li>
                <li>Ensure lawful use of deliverables</li>
                <li>Maintain security of credentials and systems</li>
                <li>Comply with all applicable laws</li>
                <li>Not use services for harmful, deceptive, or unauthorized activities</li>
              </ul>
              <p>Any misuse voids warranties and may terminate the agreement.</p>
              <h3 className="text-[#c9a227] font-semibold">8. AI Disclaimers</h3>
              <ul className="list-disc list-inside ml-4">
                <li>AI output may contain inaccuracies, limitations, or probabilistic content.</li>
                <li>AI systems are tools, not substitutes for professional judgment.</li>
                <li>All final decisions remain the Client’s responsibility.</li>
                <li>AI-generated content must be reviewed and verified before commercial use.</li>
              </ul>
              <p>RAYNOVA TECH is not liable for:</p>
              <ul className="list-disc list-inside ml-4">
                <li>Decisions made based on AI outputs</li>
                <li>Incorrect or incomplete AI-generated information</li>
                <li>Consequences of automated or semi-automated workflows</li>
              </ul>
              <h3 className="text-[#c9a227] font-semibold">9. Third-Party Integrations</h3>
              <p>RAYNOVA TECH may integrate with third-party platforms. We are not responsible for:</p>
              <ul className="list-disc list-inside ml-4">
                <li>Third-party system failures</li>
                <li>API limitations</li>
                <li>External service outages</li>
                <li>Licensing requirements</li>
                <li>Client misconfigurations</li>
              </ul>
              <p>The Client is responsible for maintaining required third-party accounts.</p>
              <h3 className="text-[#c9a227] font-semibold">10. Service Availability</h3>
              <p>We strive for high availability but do not guarantee uninterrupted operation. Maintenance, upgrades, outages, or external disruptions may occur.</p>
              <h3 className="text-[#c9a227] font-semibold">11. Intellectual Property Rights</h3>
              <b>11.1 Company IP</b>
              <p>All proprietary tools, frameworks, systems, methodologies, and internal assets remain the exclusive property of RAYNOVA TECH.</p>
              <b>11.2 Deliverables</b>
              <p>Deliverables are licensed to the Client, not sold, unless explicitly stated.</p>
              <b>11.3 Client IP</b>
              <p>Client-provided materials remain Client property.</p>
              <b>11.4 Restrictions</b>
              <ul className="list-disc list-inside ml-4">
                <li>Sell, sublicense, or redistribute deliverables without written approval</li>
                <li>Claim ownership of RAYNOVA TECH assets</li>
                <li>Remove proprietary notices</li>
              </ul>
              <h3 className="text-[#c9a227] font-semibold">12. Confidentiality</h3>
              <p>Each party agrees to protect confidential information with the same level of care used for its own sensitive information. Confidentiality survives termination.</p>
              <h3 className="text-[#c9a227] font-semibold">13. Data Protection & Privacy</h3>
              <p>
                All data processing complies with:
                <ul className="list-disc list-inside ml-4">
                  <li>UK-GDPR</li>
                  <li>EU-GDPR</li>
                  <li>Swiss nFADP</li>
                  <li>CPRA (California)</li>
                  <li>Texas TDPSA</li>
                  <li>Other applicable laws</li>
                </ul>
                Our Privacy Policy forms part of these Terms.
              </p>
              <h3 className="text-[#c9a227] font-semibold">14. Security</h3>
              <p>We maintain industry-grade technical and organisational measures. However, no system is completely secure, and Client agrees to assume residual risks inherent in digital environments.</p>
              <h3 className="text-[#c9a227] font-semibold">15. Payment Terms</h3>
              <ul className="list-disc list-inside ml-4">
                <li>Payment is due upon invoice.</li>
                <li>Late payments may incur additional charges, including reasonable administrative costs and any other documented costs directly arising from the delay.</li>
                <li>Work may be paused for non-payment.</li>
                <li>Deposits are non-refundable.</li>
                <li>Subscription fees are billed recurring unless cancelled with notice.</li>
              </ul>
              <h3 className="text-[#c9a227] font-semibold">16. Refunds</h3>
              <p>Due to the nature of digital and professional services, no refunds are offered unless explicitly agreed or mandated by law.</p>
              <h3 className="text-[#c9a227] font-semibold">17. Taxes</h3>
              <p>The Client is responsible for applicable taxes unless otherwise agreed.</p>
              <h3 className="text-[#c9a227] font-semibold">18. Term & Termination</h3>
              <ul className="list-disc list-inside ml-4">
                <li>For breach</li>
                <li>For failure to pay</li>
                <li>By mutual agreement</li>
                <li>As defined in a contract or SOW</li>
              </ul>
              <p>Upon termination:</p>
              <ul className="list-disc list-inside ml-4">
                <li>All outstanding balances become due</li>
                <li>Licenses may expire</li>
                <li>Access may be revoked</li>
                <li>Confidentiality obligations continue</li>
              </ul>
              <h3 className="text-[#c9a227] font-semibold">19. Non-Solicitation</h3>
              <p>Client agrees not to solicit or hire RAYNOVA TECH staff or contractors for 24 months following service delivery.</p>
              <h3 className="text-[#c9a227] font-semibold">20. Non-Disparagement</h3>
              <p>Client agrees not to publish false or harmful statements about RAYNOVA TECH.</p>
              <h3 className="text-[#c9a227] font-semibold">21. Export Compliance</h3>
              <p>Client agrees to comply with all applicable export laws, sanctions, and international trade regulations.</p>
              <h3 className="text-[#c9a227] font-semibold">22. Representations & Warranties</h3>
              <p>RaynovaTech provides services with professional diligence but:</p>
              <ul className="list-disc list-inside ml-4">
                <li>Does not guarantee specific outcomes</li>
                <li>Does not guarantee financial or operational results</li>
                <li>Does not warrant third-party products or platforms</li>
              </ul>
              <h3 className="text-[#c9a227] font-semibold">23. Disclaimer of Warranties</h3>
              <p>Services are provided “as is” and “as available.” All implied warranties are disclaimed to the fullest extent permitted by law.</p>
              <h3 className="text-[#c9a227] font-semibold">24. Limitation of Liability</h3>
              <p>To the maximum extent permitted:</p>
              <ul className="list-disc list-inside ml-4">
                <li>RAYNOVA TECH will not be liable for indirect, incidental, consequential, punitive, or special damages.</li>
                <li>Total liability is limited to the amount paid by the Client in the preceding three months.</li>
              </ul>
              <h3 className="text-[#c9a227] font-semibold">25. Indemnification</h3>
              <p>Client agrees to indemnify and hold RAYNOVA TECH harmless against claims arising from:</p>
              <ul className="list-disc list-inside ml-4">
                <li>Misuse of services</li>
                <li>Violations of law</li>
                <li>AI output misuse</li>
                <li>Breach of these Terms</li>
                <li>Third-party disputes caused by Client actions</li>
              </ul>
              <h3 className="text-[#c9a227] font-semibold">26. Force Majeure</h3>
              <p>We are not liable for delays caused by events beyond reasonable control including:</p>
              <ul className="list-disc list-inside ml-4">
                <li>Natural disasters</li>
                <li>Political or regulatory action</li>
                <li>Infrastructure failures</li>
                <li>Internet outages</li>
                <li>Acts of third parties</li>
              </ul>
              <h3 className="text-[#c9a227] font-semibold">27. Governing Law</h3>
              <p>Unless superseded by a written contract: These Terms are governed by the laws of England &amp; Wales.</p>
              <h3 className="text-[#c9a227] font-semibold">28. Dispute Resolution</h3>
              <p>Parties shall seek amicable resolution before escalating. If unresolved:</p>
              <ul className="list-disc list-inside ml-4">
                <li>UK courts (England &amp; Wales) shall have jurisdiction</li>
                <li>Unless an alternative arbitration venue is mutually agreed</li>
              </ul>
              <h3 className="text-[#c9a227] font-semibold">29. Electronic Communications</h3>
              <p>You consent to receive communications electronically. Electronic records are legally binding.</p>
              <h3 className="text-[#c9a227] font-semibold">30. Notices</h3>
              <p>Legal notices must be sent to: <a href="mailto:legal@raynova.tech" className="underline transition-colors hover:text-[#c9a227]">legal@raynova.tech</a> or <a href="mailto:legal@raynovatech.com" className="underline transition-colors hover:text-[#c9a227]">legal@raynovatech.com</a> or to the registered office address.</p>
              <h3 className="text-[#c9a227] font-semibold">31. Assignment</h3>
              <p>RAYNOVA TECH may assign rights under this Agreement. Client may not assign without written consent.</p>
              <h3 className="text-[#c9a227] font-semibold">32. Entire Agreement</h3>
              <p>These Terms, including SOWs, proposals, and policies, constitute the complete agreement.</p>
              <h3 className="text-[#c9a227] font-semibold">33. Severability</h3>
              <p>If any clause is invalid, the remainder remains enforceable.</p>
              <h3 className="text-[#c9a227] font-semibold">34. Waivers</h3>
              <p>Failure to enforce provisions does not waive rights.</p>
              <h3 className="text-[#c9a227] font-semibold">35. Changes to Terms</h3>
              <p>We may update these Terms. Continued use of services signifies acceptance of the updated version.</p>
              <h3 className="text-[#c9a227] font-semibold">36. Language</h3>
              <p>English is the controlling language of this Agreement.</p>
              <h3 className="text-[#c9a227] font-semibold">37. Contact Information</h3>
              <p>
                RAYNOVA TECH — AL RAYAH GLOBAL GROUP LTD<br />
                11–12 Old Bond Street, Mayfair, London, W1S 4PN<br />
                Email: <a href="mailto:legal@raynova.tech" className="underline transition-colors hover:text-[#c9a227]">legal@raynova.tech</a> or <a href="mailto:legal@raynovatech.com" className="underline transition-colors hover:text-[#c9a227]">legal@raynovatech.com</a>
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

export default TermsPage;
