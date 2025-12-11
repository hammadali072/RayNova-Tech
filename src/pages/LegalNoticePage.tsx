import { Header } from '../components/Header';
import { PageBanner } from '../components/PageBanner';
import { Footer } from '../components/Footer';

export function LegalNoticePage() {
    return (
        <div className="min-h-screen">
            <Header />
            <PageBanner
                title="Legal Notice"
                subtitle="Corporate disclosures and legal information."
                breadcrumbs={[
                    { label: 'Home', href: '/' },
                    { label: 'Legal Notice', href: '/legal-notice' }
                ]}
            />
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-[#232323]/60 backdrop-blur-xl border border-[#c9a227]/10 rounded-3xl p-10 space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold text-[#c9a227] mb-2 uppercase">LEGAL NOTICE (IMPRINT)</h2>
                            <p className="text-[#efe9d6]/50 text-sm mb-6">RAYNOVA TECH — AL RAYAH GLOBAL GROUP LTD<br />Last Updated: December 2025</p>
                            <p className="text-[#efe9d6]/70 leading-relaxed mb-4">
                                This Legal Notice provides the required corporate disclosures for visitors, clients, regulators, and international authorities engaging with RAYNOVA TECH’s digital and operational platforms.
                                <br /><br />
                                RAYNOVA TECH is an executive technology brand operated under the authority of AL RAYAH GLOBAL GROUP LTD, a legally registered private limited company in the United Kingdom.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-[#c9a227] mb-4">1. Company Information</h3>
                            <ul className="list-disc list-inside text-[#efe9d6]/70 ml-4 mb-2">
                                <li><b>Legal Entity:</b> AL RAYAH GLOBAL GROUP LTD</li>
                                <li><b>Trading As:</b> RAYNOVA TECH</li>
                                <li><b>Company Registration Number (UK):</b> 16846341</li>
                                <li><b>Registered Office Address:</b>11-12 Old Bond Street, Mayfair, London, W1S 4PN, United Kingdom
                                </li>
                                <li><b>Jurisdiction of Registration:</b> Companies House — United Kingdom</li>
                                <li><b>Legal Form:</b> Private Company Limited by Guarantee (LTD)</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-[#c9a227] mb-4">2. Contact Information</h3>
                            <ul className="list-disc list-inside text-[#efe9d6]/70 ml-4 mb-2">
                                <li><b>Website:</b> <a href="https://www.raynova.tech" className="underline transition-colors hover:text-[#c9a227]">www.raynova.tech</a> &amp; <a href="https://www.raynovatech.com" className="underline transition-colors hover:text-[#c9a227]">www.raynovatech.com</a></li>
                                <li><b>General Inquiries:</b> <a href="mailto:contact@raynova.tech" className="underline transition-colors hover:text-[#c9a227]">contact@raynova.tech</a> or <a href="mailto:contact@raynovatech.com" className="underline transition-colors hover:text-[#c9a227]">contact@raynovatech.com</a></li>
                                <li><b>Privacy &amp; Data Protection:</b> <a href="mailto:privacy@raynova.tech" className="underline transition-colors hover:text-[#c9a227]">privacy@raynova.tech</a> or <a href="mailto:privacy@raynovatech.com" className="underline transition-colors hover:text-[#c9a227]">privacy@raynovatech.com</a></li>
                                <li><b>Corporate &amp; Compliance Communication:</b> <a href="mailto:legal@raynova.tech" className="underline transition-colors hover:text-[#c9a227]">legal@raynova.tech</a> or <a href="mailto:legal@raynovatech.com" className="underline transition-colors hover:text-[#c9a227]">legal@raynovatech.com</a></li>
                                <li><b>Telephones:</b><br />
                                    UK: <a href="tel:+447848101848" className="underline transition-colors hover:text-[#c9a227]">+44 7848 101848</a> | CH: <a href="tel:+41797265555" className="underline transition-colors hover:text-[#c9a227]">+41 79 726 55 55</a> | USA: <a href="tel:+16467771766" className="underline transition-colors hover:text-[#c9a227]">+1 646 777 1766</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-[#c9a227] mb-4">3. Directors &amp; Responsible Parties</h3>
                            <p className="text-[#efe9d6]/70 leading-relaxed mb-2">
                                Responsible for Content &amp; Operations (as per UK &amp; EU requirements):<br />
                                <b>Konradas Česnulis — Chief Executive Officer</b><br />
                                Acting on behalf of AL RAYAH GLOBAL GROUP LTD
                            </p>
                        </div>
                        <div>
                            <h3 className="text-[#c9a227] mb-4">4. VAT / Tax Identification</h3>
                            <p className="text-[#efe9d6]/70 leading-relaxed mb-2">
                                <b>VAT Registration Number:</b><br />
                                Not applicable / To be updated when issued
                            </p>
                        </div>
                        <div>
                            <h3 className="text-[#c9a227] mb-4">5. Regulatory &amp; Compliance Information</h3>
                            <p className="text-[#efe9d6]/70 leading-relaxed mb-2">
                                RAYNOVA TECH / AL RAYAH GLOBAL GROUP LTD complies with:
                            </p>
                            <ul className="list-disc list-inside text-[#efe9d6]/70 ml-4 mb-2">
                                <li>UK Companies Act 2006</li>
                                <li>UK-GDPR &amp; Data Protection Act 2018</li>
                                <li>EU-GDPR for applicable clients</li>
                                <li>Swiss Federal Act on Data Protection (nFADP)</li>
                                <li>U.S. State privacy regulations (CPRA/CCPA, Texas TDPSA, etc.)</li>
                            </ul>
                            <p className="text-[#efe9d6]/70 leading-relaxed">
                                For privacy matters, consult our <a href="/privacy" className="underline transition-colors hover:text-[#c9a227]">Privacy Policy</a> and <a href="/cookie-policy" className="underline transition-colors hover:text-[#c9a227]">Cookie Policy</a> located on this website.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-[#c9a227] mb-4">6. Professional Liability &amp; Disclaimer</h3>
                            <p className="text-[#efe9d6]/70 leading-relaxed mb-2">
                                RAYNOVA TECH provides digital, technological, automation, and AI consultancy services.<br />
                                All information on this website is published in good faith and for general informational purposes.<br />
                                We make no guarantees regarding completeness, accuracy, or outcomes outside contractually defined obligations.
                            </p>
                            <p className="text-[#efe9d6]/70 leading-relaxed mb-2">
                                RAYNOVA TECH is not liable for:
                            </p>
                            <ul className="list-disc list-inside text-[#efe9d6]/70 ml-4 mb-2">
                                <li>External content linked on third-party websites</li>
                                <li>Damages caused by improper or unauthorised use of information</li>
                                <li>Client-side implementation errors outside our operational scope</li>
                            </ul>
                            <p className="text-[#efe9d6]/70 leading-relaxed">
                                All professional services are governed by our official <a href="/terms" className="underline transition-colors hover:text-[#c9a227]">Terms &amp; Conditions</a>, provided prior to engagement.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-[#c9a227] mb-4">7. Intellectual Property Rights</h3>
                            <p className="text-[#efe9d6]/70 leading-relaxed mb-2">
                                All content, branding, design elements, frameworks, text, graphics, logos, and digital assets displayed on this website are the exclusive intellectual property of:
                                <br />
                                <b>AL RAYAH GLOBAL GROUP LTD (DBA: RAYNOVA TECH)</b>
                                <br />
                                Unauthorised use, reproduction, modification, or distribution is strictly prohibited.
                                <br />
                                Requests for permission may be sent to: <a href="mailto:legal@raynova.tech" className="underline transition-colors hover:text-[#c9a227]">legal@raynova.tech</a> or <a href="mailto:legal@raynovatech.com" className="underline transition-colors hover:text-[#c9a227]">legal@raynovatech.com</a>
                            </p>
                        </div>
                        <div>
                            <h3 className="text-[#c9a227] mb-4">8. Online Dispute Resolution (EU Requirement)</h3>
                            <p className="text-[#efe9d6]/70 leading-relaxed mb-2">
                                For clients in the European Union:<br />
                                The European Commission provides an Online Dispute Resolution (ODR) platform:<br />
                                <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="underline transition-colors hover:text-[#c9a227]">https://ec.europa.eu/consumers/odr/</a>
                            </p>
                            <p className="text-[#efe9d6]/70 leading-relaxed">
                                RAYNOVA TECH is not obligated to participate in administrative dispute resolution but may do so voluntarily at its discretion.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-[#c9a227] mb-4">9. Governing Law &amp; Jurisdiction</h3>
                            <p className="text-[#efe9d6]/70 leading-relaxed mb-2">
                                Unless otherwise specified in a signed service agreement:
                            </p>
                            <ul className="list-disc list-inside text-[#efe9d6]/70 ml-4 mb-2">
                                <li><b>Primary Governing Law:</b> United Kingdom (England &amp; Wales)</li>
                                <li><b>Alternative Jurisdiction:</b> As mutually agreed with clients within formal contracts.</li>
                            </ul>
                            <p className="text-[#efe9d6]/70 leading-relaxed">
                                All disputes shall be resolved under fair, professional, and transparent principles aligned with international commercial standards.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-[#c9a227] mb-4">10. Additional Corporate Entities</h3>
                            <p className="text-[#efe9d6]/70 leading-relaxed mb-2">
                                If RAYNOVA TECH expands into subsidiaries, branches, or international offices, they can be listed here.
                            </p>
                            <p className="text-[#efe9d6]/70 leading-relaxed">
                                For now:<br />
                                This website, its content, and all operations fall under the authority of AL RAYAH GLOBAL GROUP LTD, United Kingdom.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-[#c9a227] mb-4">11. Contact for Legal Questions</h3>
                            <p className="text-[#efe9d6]/70 leading-relaxed mb-2">
                                For compliance inquiries, disclosures, regulatory communication, or legal matters, contact:
                            </p>
                            <ul className="list-disc list-inside text-[#efe9d6]/70 ml-4 mb-2">
                                <li>Legal &amp; Compliance Department</li>
                                <li>AL RAYAH GLOBAL GROUP LTD</li>
                                <li>Email: <a href="mailto:legal@raynova.tech" className="underline transition-colors hover:text-[#c9a227]">legal@raynova.tech</a> or <a href="mailto:legal@raynovatech.com" className="underline transition-colors hover:text-[#c9a227]">legal@raynovatech.com</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-[#c9a227] mb-4">12. Final Statement</h3>
                            <p className="text-[#efe9d6]/70 leading-relaxed">
                                RAYNOVA TECH operates with discipline, precision, and unwavering responsibility in all corporate, digital, and professional matters.
                                <br />
                                This Legal Notice reflects our commitment to clarity, accountability, and high-standard governance across all jurisdictions.
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

export default LegalNoticePage;
