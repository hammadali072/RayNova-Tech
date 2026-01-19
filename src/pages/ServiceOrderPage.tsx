import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Header } from '../components/Header';
import { PageBanner } from '../components/PageBanner';
import { Footer } from '../components/Footer';
import { GradientButton } from '../components/GradientButton';
import { Upload, CheckCircle } from 'lucide-react';

export function ServiceOrderPage() {
  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get('service') || '';

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    service: preselectedService,
    fullName: '',
    email: '',
    phone: '',
    company: '',
    projectTitle: '',
    projectDescription: '',
    requiredFeatures: '',
    timeline: '',
    budget: '',
    file: null as File | null
  });

  const services = [
    { value: 'ai-website', label: 'AI-Integrated Website Development' },
    { value: 'text-chatbot', label: 'Text Chatbot Development' },
    { value: 'voice-chatbot', label: 'Voice Chatbot Development' },
    { value: 'ai-integration', label: 'AI Integration Services' },
    { value: 'custom', label: 'Custom AI Solution' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Order submitted:', formData);
    setSubmitted(true);
    // Scroll to top to show confirmation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        file: e.target.files[0]
      });
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen">
        <Header />
        <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-[#0f0f0f]"></div>
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[#c9a227]/20 via-[#d4b13f]/10 to-transparent rounded-full blur-3xl animate-pulse-glow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-[#0e3b2c]/30 via-[#c9a227]/10 to-transparent rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }}></div>

          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-[#c9a227]/20 to-[#0e3b2c]/20 rounded-full mb-8 animate-pulse-glow">
              <CheckCircle className="w-12 h-12 text-[#c9a227]" />
            </div>

            <h2 className="text-[#efe9d6] mb-6">
              Order Submitted{' '}
              <span className="bg-gradient-to-r from-[#c9a227] to-[#d4b13f] bg-clip-text text-transparent">
                Successfully!
              </span>
            </h2>

            <p className="text-[#efe9d6]/70 text-lg mb-8 leading-relaxed">
              Thank you for choosing RayNova Tech! We've received your service request and our team will review it shortly. You'll receive a detailed quote within 24-48 hours.
            </p>

            <div className="bg-[#232323]/60 backdrop-blur-xl border border-[#c9a227]/20 rounded-2xl p-8 mb-8">
              <h3 className="text-[#c9a227] mb-4">What Happens Next?</h3>
              <div className="space-y-4 text-left">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#c9a227] to-[#0e3b2c] mt-2"></div>
                  <p className="text-[#efe9d6]/70">Our team will analyze your project requirements</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#c9a227] to-[#0e3b2c] mt-2"></div>
                  <p className="text-[#efe9d6]/70">You'll receive a detailed proposal and quote via email</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#c9a227] to-[#0e3b2c] mt-2"></div>
                  <p className="text-[#efe9d6]/70">We'll schedule a consultation call to discuss your project</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <a href="/">
                <GradientButton>Back to Home</GradientButton>
              </a>
              <button
                onClick={() => setSubmitted(false)}
                className="px-8 py-4 rounded-full border border-[#c9a227]/40 text-[#efe9d6] hover:bg-[#c9a227]/10 transition-all duration-300"
              >
                Submit Another Order
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <PageBanner
        title="Order Your Service"
        subtitle="Fill out the form below and our team will get back to you with a detailed quote"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Order', href: '/order' }
        ]}
      />

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Form - 2/3 width */}
            <div className="lg:col-span-2">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#c9a227]/20 to-[#0e3b2c]/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-100 transition-all duration-500"></div>

                <form onSubmit={handleSubmit} className="relative bg-[#232323]/60 backdrop-blur-xl border border-[#c9a227]/20 rounded-3xl p-8 md:p-10">
                  <h3 className="text-[#efe9d6] mb-8">Project Details</h3>

                  {/* Service Selection */}
                  <div className="space-y-2 mb-6">
                    <label htmlFor="service" className="text-[#efe9d6] text-sm block">
                      Select Service *
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-xl px-4 py-3 text-[#efe9d6] focus:outline-none focus:border-[#c9a227]/60 focus:ring-2 focus:ring-[#c9a227]/20 transition-all duration-300"
                    >
                      <option value="">Choose a service...</option>
                      {services.map((service) => (
                        <option key={service.value} value={service.value}>
                          {service.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Full Name */}
                    <div className="space-y-2">
                      <label htmlFor="fullName" className="text-[#efe9d6] text-sm block">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className="w-full bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-xl px-4 py-3 text-[#efe9d6] placeholder-[#efe9d6]/40 focus:outline-none focus:border-[#c9a227]/60 focus:ring-2 focus:ring-[#c9a227]/20 transition-all duration-300"
                        placeholder="John Doe"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-[#efe9d6] text-sm block">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-xl px-4 py-3 text-[#efe9d6] placeholder-[#efe9d6]/40 focus:outline-none focus:border-[#c9a227]/60 focus:ring-2 focus:ring-[#c9a227]/20 transition-all duration-300"
                        placeholder="john@example.com"
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-[#efe9d6] text-sm block">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-xl px-4 py-3 text-[#efe9d6] placeholder-[#efe9d6]/40 focus:outline-none focus:border-[#c9a227]/60 focus:ring-2 focus:ring-[#c9a227]/20 transition-all duration-300"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>

                    {/* Company */}
                    <div className="space-y-2">
                      <label htmlFor="company" className="text-[#efe9d6] text-sm block">
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-xl px-4 py-3 text-[#efe9d6] placeholder-[#efe9d6]/40 focus:outline-none focus:border-[#c9a227]/60 focus:ring-2 focus:ring-[#c9a227]/20 transition-all duration-300"
                        placeholder="Your Company"
                      />
                    </div>
                  </div>

                  {/* Project Title */}
                  <div className="space-y-2 mb-6">
                    <label htmlFor="projectTitle" className="text-[#efe9d6] text-sm block">
                      Project Title *
                    </label>
                    <input
                      type="text"
                      id="projectTitle"
                      name="projectTitle"
                      value={formData.projectTitle}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-xl px-4 py-3 text-[#efe9d6] placeholder-[#efe9d6]/40 focus:outline-none focus:border-[#c9a227]/60 focus:ring-2 focus:ring-[#c9a227]/20 transition-all duration-300"
                      placeholder="E.g., E-commerce Website with AI Chatbot"
                    />
                  </div>

                  {/* Project Description */}
                  <div className="space-y-2 mb-6">
                    <label htmlFor="projectDescription" className="text-[#efe9d6] text-sm block">
                      Project Description *
                    </label>
                    <textarea
                      id="projectDescription"
                      name="projectDescription"
                      value={formData.projectDescription}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-xl px-4 py-3 text-[#efe9d6] placeholder-[#efe9d6]/40 focus:outline-none focus:border-[#c9a227]/60 focus:ring-2 focus:ring-[#c9a227]/20 transition-all duration-300 resize-none"
                      placeholder="Describe your project in detail..."
                    />
                  </div>

                  {/* Required Features */}
                  <div className="space-y-2 mb-6">
                    <label htmlFor="requiredFeatures" className="text-[#efe9d6] text-sm block">
                      Required Features / Modules *
                    </label>
                    <textarea
                      id="requiredFeatures"
                      name="requiredFeatures"
                      value={formData.requiredFeatures}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-xl px-4 py-3 text-[#efe9d6] placeholder-[#efe9d6]/40 focus:outline-none focus:border-[#c9a227]/60 focus:ring-2 focus:ring-[#c9a227]/20 transition-all duration-300 resize-none"
                      placeholder="List the key features you need (e.g., user authentication, payment gateway, AI chat, etc.)"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Timeline */}
                    <div className="space-y-2">
                      <label htmlFor="timeline" className="text-[#efe9d6] text-sm block">
                        Desired Timeline *
                      </label>
                      <select
                        id="timeline"
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                        required
                        className="w-full bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-xl px-4 py-3 text-[#efe9d6] focus:outline-none focus:border-[#c9a227]/60 focus:ring-2 focus:ring-[#c9a227]/20 transition-all duration-300"
                      >
                        <option value="">Select timeline...</option>
                        <option value="asap">As soon as possible</option>
                        <option value="1-month">Within 1 month</option>
                        <option value="2-3-months">2-3 months</option>
                        <option value="3-6-months">3-6 months</option>
                        <option value="flexible">Flexible</option>
                      </select>
                    </div>

                    {/* Budget */}
                    <div className="space-y-2">
                      <label htmlFor="budget" className="text-[#efe9d6] text-sm block">
                        Total Budget (USD) *
                      </label>
                      <input
                        type="number"
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        required
                        min="0"
                        step="100"
                        className="w-full bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-xl px-4 py-3 text-[#efe9d6] placeholder-[#efe9d6]/40 focus:outline-none focus:border-[#c9a227]/60 focus:ring-2 focus:ring-[#c9a227]/20 transition-all duration-300"
                        placeholder="5000"
                      />
                    </div>
                  </div>

                  {/* File Upload */}
                  <div className="space-y-2 mb-6">
                    <label htmlFor="file" className="text-[#efe9d6] text-sm block">
                      Upload Project Files (Optional)
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        id="file"
                        name="file"
                        onChange={handleFileChange}
                        className="hidden"
                        accept=".pdf,.doc,.docx,.txt,.zip"
                      />
                      <label
                        htmlFor="file"
                        className="w-full bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-xl px-4 py-6 text-[#efe9d6]/60 flex items-center justify-center gap-3 cursor-pointer hover:border-[#c9a227]/60 transition-all duration-300"
                      >
                        <Upload className="w-5 h-5 text-[#c9a227]" />
                        <span>{formData.file ? formData.file.name : 'Click to upload files (PDF, DOC, ZIP)'}</span>
                      </label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <GradientButton size="lg" className="w-full">
                    Submit Order Request
                  </GradientButton>
                </form>
              </div>
            </div>

            {/* Order Summary - 1/3 width */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#c9a227]/20 to-[#0e3b2c]/20 rounded-3xl blur-xl opacity-50"></div>

                  <div className="relative bg-[#232323]/60 backdrop-blur-xl border border-[#c9a227]/20 rounded-3xl p-8">
                    <h3 className="text-[#efe9d6] mb-6">Order Summary</h3>

                    <div className="space-y-6">
                      {/* Selected Service */}
                      <div>
                        <div className="text-[#efe9d6]/60 text-sm mb-2">Selected Service</div>
                        <div className="text-[#c9a227]">
                          {formData.service
                            ? services.find(s => s.value === formData.service)?.label
                            : 'Not selected yet'}
                        </div>
                      </div>

                      {/* Budget */}
                      {formData.budget && (
                        <div>
                          <div className="text-[#efe9d6]/60 text-sm mb-2">Your Budget</div>
                          <div className="text-[#efe9d6] text-xl">
                            ${parseInt(formData.budget).toLocaleString()}
                          </div>
                        </div>
                      )}

                      {/* Timeline */}
                      {formData.timeline && (
                        <div>
                          <div className="text-[#efe9d6]/60 text-sm mb-2">Timeline</div>
                          <div className="text-[#efe9d6]">
                            {formData.timeline === 'asap' && 'As soon as possible'}
                            {formData.timeline === '1-month' && 'Within 1 month'}
                            {formData.timeline === '2-3-months' && '2-3 months'}
                            {formData.timeline === '3-6-months' && '3-6 months'}
                            {formData.timeline === 'flexible' && 'Flexible'}
                          </div>
                        </div>
                      )}

                      <div className="border-t border-[#c9a227]/20 pt-6">
                        <div className="space-y-3 text-[#efe9d6]/70 text-sm">
                          <div className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#c9a227] mt-1.5"></div>
                            <span>Receive detailed quote within 24-48 hours</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#c9a227] mt-1.5"></div>
                            <span>Free consultation call included</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#c9a227] mt-1.5"></div>
                            <span>No commitment required</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
