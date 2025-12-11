import { Header } from '../components/Header';
import { PageBanner } from '../components/PageBanner';
import { Footer } from '../components/Footer';

export function CookiePolicyPage() {
    return (
        <div className="min-h-screen">
            <Header />
            <PageBanner
                title="Cookie Policy"
                subtitle="How we use cookies and similar technologies."
                breadcrumbs={[
                    { label: 'Home', href: '/' },
                    { label: 'Cookie Policy', href: '/cookie-policy' }
                ]}
            />
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-[#232323]/60 backdrop-blur-xl border border-[#c9a227]/10 rounded-3xl p-10 space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold text-[#c9a227] mb-2 uppercase">RAYNOVATECH COOKIE POLICY</h2>
                            <p className="text-[#efe9d6]/50 text-sm mb-6">Last Updated: December 2025</p>
                            <p className="text-[#efe9d6]/70 leading-relaxed mb-4">
                                This Cookie Policy explains how RAYNOVA TECH, operating under AL RAYAH GLOBAL GROUP LTD, uses cookies and similar technologies across our website and digital services. We maintain a standard of clarity, precision, and responsible digital stewardship. By visiting our website, you acknowledge the practices described herein.
                                <br /><br />
                                If required by your jurisdiction, our cookie banner allows you to accept, reject, or customise your cookie preferences before non-essential cookies are placed on your device.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-[#c9a227] mb-4">1. What Are Cookies?</h3>
                            <p className="text-[#efe9d6]/70 leading-relaxed mb-2">
                                Cookies are small data files stored on your device when you visit a website. They perform various essential and functional roles, including enabling proper website performance, enhancing user experience, analysing usage, and supporting security. Cookies may be:
                            </p>
                            <ul className="list-disc list-inside text-[#efe9d6]/70 ml-4 mb-2">
                                <li>Session Cookies — erased when you close your browser</li>
                                <li>Persistent Cookies — remain on your device for a defined period</li>
                                <li>First-party Cookies — placed by our domain</li>
                                <li>Third-party Cookies — placed by trusted partners providing analytics, security, or integration tools</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-[#c9a227] mb-4">2. How We Use Cookies</h3>
                            <p className="text-[#efe9d6]/70 leading-relaxed mb-2">
                                RAYNOVA TECH uses cookies to maintain the reliability, efficiency, and high-quality experience expected of our digital platforms. Cookies help us:
                            </p>
                            <ul className="list-disc list-inside text-[#efe9d6]/70 ml-4 mb-2">
                                <li>Operate core site functions</li>
                                <li>Maintain platform stability and security</li>
                                <li>Understand website performance</li>
                                <li>Improve service delivery</li>
                                <li>Enable essential integrations</li>
                                <li>Provide a consistent and professional online experience</li>
                            </ul>
                            <p className="text-[#efe9d6]/70 leading-relaxed">
                                We do not use cookies to sell personal information.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-[#c9a227] mb-4">3. Categories of Cookies We Use</h3>
                            <p className="text-[#efe9d6]/70 leading-relaxed mb-2">
                                Cookies used on our website fall into the following categories:
                            </p>
                            <h4 className="font-semibold text-[#c9a227]">3.1 Strictly Necessary Cookies</h4>
                            <p className="text-[#efe9d6]/70 leading-relaxed mb-2">
                                Non-optional — essential for the website to function.
                                <br />Used for:
                            </p>
                            <ul className="list-disc list-inside text-[#efe9d6]/70 ml-8 mb-2">
                                <li>Core navigation and page rendering</li>
                                <li>Security, authentication, and session integrity</li>
                                <li>Form submissions and essential platform operations</li>
                            </ul>
                            <p className="text-[#efe9d6]/70 leading-relaxed mb-2">
                                Disabling these cookies may render the site unusable.
                            </p>
                            <h4 className="font-semibold text-[#c9a227]">3.2 Functional Cookies</h4>
                            <p className="text-[#efe9d6]/70 leading-relaxed mb-2">
                                Enhance performance and user experience.
                                <br />Used for:
                            </p>
                            <ul className="list-disc list-inside text-[#efe9d6]/70 ml-8 mb-2">
                                <li>Remembering preferences</li>
                                <li>Maintaining layout or interface selections</li>
                                <li>Supporting basic site enhancements</li>
                            </ul>
                            <p className="text-[#efe9d6]/70 leading-relaxed mb-2">
                                These cookies improve convenience but are not strictly required.
                            </p>
                            <h4 className="font-semibold text-[#c9a227]">3.3 Analytics & Performance Cookies</h4>
                            <p className="text-[#efe9d6]/70 leading-relaxed mb-2">
                                Used to understand how visitors interact with our website.
                                <br />Examples:
                            </p>
                            <ul className="list-disc list-inside text-[#efe9d6]/70 ml-8 mb-2">
                                <li>Google Analytics or equivalent</li>
                                <li>Performance diagnostics</li>
                                <li>Traffic measurement and aggregated usage insights</li>
                            </ul>
                            <p className="text-[#efe9d6]/70 leading-relaxed mb-2">
                                We use these cookies to improve the platform’s reliability and usability.
                                <br />
                                Where required by law, these cookies are only activated with your consent.
                            </p>
                            <h4 className="font-semibold text-[#c9a227]">3.4 Targeting & Advertising Cookies (If Used)</h4>
                            <p className="text-[#efe9d6]/70 leading-relaxed mb-2">
                                If present, these cookies measure engagement with marketing content or advertisements. RAYNOVA TECH does not sell personal information, and such cookies (if used) operate strictly under defined contractual safeguards.
                            </p>
                            <p className="text-[#efe9d6]/70 leading-relaxed mb-2">
                                RAYNOVA TECH does not currently use advertising or behavioural targeting cookies. If such technologies are introduced in the future, this policy will be updated and your consent will be requested where required.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-[#c9a227] mb-4">4. Third-Party Cookies</h3>
                            <p className="text-[#efe9d6]/70 leading-relaxed mb-2">
                                We may use cookies placed by trusted third-party providers to support infrastructure, analytics, security, and operational performance.
                                <br />Examples may include:
                            </p>
                            <ul className="list-disc list-inside text-[#efe9d6]/70 ml-4 mb-2">
                                <li>Hosting and CDN partners</li>
                                <li>Analytics platforms (e.g., Google Analytics)</li>
                                <li>Payment processors (e.g., Stripe)</li>
                                <li>Cloud service providers</li>
                                <li>Integrated communication or support tools</li>
                            </ul>
                            <p className="text-[#efe9d6]/70 leading-relaxed">
                                These third parties operate under strict contractual and technical safeguards.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-[#c9a227] mb-4">5. International Compliance & Consent Requirements</h3>
                            <p className="text-[#efe9d6]/70 leading-relaxed mb-2">
                                Our cookie practices comply with:
                            </p>
                            <ul className="list-disc list-inside text-[#efe9d6]/70 ml-4 mb-2">
                                <li>UK-GDPR and PECR</li>
                                <li>EU GDPR and ePrivacy Directive</li>
                                <li>Swiss Federal Data Protection Act (nFADP)</li>
                                <li>Relevant U.S. state privacy laws</li>
                            </ul>
                            <p className="text-[#efe9d6]/70 leading-relaxed mb-2">
                                Where required (e.g., EU/UK/CH regions), our cookie banner ensures that:
                            </p>
                            <ul className="list-disc list-inside text-[#efe9d6]/70 ml-8 mb-2">
                                <li>Non-essential cookies are disabled by default</li>
                                <li>You may accept or reject cookies</li>
                                <li>You may customise your preferences</li>
                                <li>Consent is logged and stored</li>
                                <li>You may withdraw consent at any time</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-[#c9a227] mb-4">6. Managing Your Cookie Preferences</h3>
                            <p className="text-[#efe9d6]/70 leading-relaxed mb-2">
                                You may manage or disable cookies through:
                            </p>
                            <b className="text-[#c9a227]">A) Our Cookie Banner:</b>
                            <p className="text-[#efe9d6]/70 leading-relaxed mb-2">
                                Available on your first visit and accessible at any time.
                            </p>
                            <b className="text-[#c9a227]">B) Browser Settings:</b>
                            <p className="text-[#efe9d6]/70 leading-relaxed mb-2">
                                You may configure your browser to:
                            </p>
                            <ul className="list-disc list-inside text-[#efe9d6]/70 ml-8 mb-2">
                                <li>Block all cookies</li>
                                <li>Block third-party cookies</li>
                                <li>Delete cookies after each session</li>
                                <li>Notify you when a cookie is being placed</li>
                            </ul>
                            <p className="text-[#efe9d6]/70 leading-relaxed">
                                Please note: Disabling essential cookies may impact functionality.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-[#c9a227] mb-4">7. Changes to This Cookie Policy</h3>
                            <p className="text-[#efe9d6]/70 leading-relaxed">
                                We may update this Cookie Policy periodically to reflect legal, operational, or technological developments. Changes will be posted with an updated “Last Updated” date. Continued use of our website constitutes acceptance of the revised policy.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-[#c9a227] mb-4">8. Contact Us</h3>
                            <p className="text-[#efe9d6]/70 leading-relaxed mb-2">
                                For any questions, clarification requests, or cookie-related concerns:
                            </p>
                            <ul className="list-disc list-inside text-[#efe9d6]/70 ml-4 mb-2">
                                <li>RaynovaTech — AL RAYAH GLOBAL GROUP LTD</li>
                                <li>Email: <a href="mailto:privacy@raynova.tech" className="underline transition-colors hover:text-[#c9a227]">privacy@raynova.tech</a> or <a href="mailto:privacy@raynovatech.com" className="underline transition-colors hover:text-[#c9a227]">privacy@raynovatech.com</a></li>
                                <li>Website: <a href="https://www.raynova.tech" className="underline transition-colors hover:text-[#c9a227]">www.raynova.tech</a> or <a href="https://www.raynovatech.com" className="underline transition-colors hover:text-[#c9a227]">www.raynovatech.com</a></li>
                            </ul>
                            <p className="text-[#efe9d6]/70 leading-relaxed">
                                We maintain our digital environment with discipline, clarity, and responsible stewardship.
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

export default CookiePolicyPage;
