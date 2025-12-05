import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { GradientButton } from './GradientButton';
import { useState } from 'react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      content: 'contact@raynova.tech',
      subtext: 'We reply within 24 hours'
    },
    {
      icon: Phone,
      title: 'Call Us',
      content: '+44 7848 101848',
      subtext: 'Mon-Fri from 8am to 6pm'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      content: 'London, UK',
      subtext: '11-12 Old Bond Street, Mayfair London W1S 4PN'
    }
  ];

  return (
    <section id="contact" className="py-32 px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-[#c9a227]/10 to-transparent rounded-full blur-3xl animate-pulse-glow"></div>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-tl from-[#0e3b2c]/15 to-transparent rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20 space-y-4">
          <div className="inline-block">
            <span className="text-[#c9a227] bg-gradient-to-r from-[#c9a227]/10 to-[#0e3b2c]/10 px-5 py-2.5 rounded-full text-sm border border-[#c9a227]/30 shadow-[0_0_20px_rgba(201,162,39,0.15)]">
              Get In Touch
            </span>
          </div>
          <h2 className="text-[#efe9d6]">
            Let's Start a{' '}
            <span className="bg-gradient-to-r from-[#c9a227] to-[#d4b13f] bg-clip-text text-transparent">
              Conversation
            </span>
          </h2>
          <p className="text-[#efe9d6]/70 text-lg max-w-3xl mx-auto">
            Ready to transform your business? Reach out to us and let's discuss how we can help you achieve your goals
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Contact Info - Left Side */}
          <div className="md:col-span-2 space-y-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div key={index} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#c9a227]/10 to-[#0e3b2c]/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                  <div className="relative bg-[#232323]/60 backdrop-blur-xl border border-[#c9a227]/10 rounded-2xl p-6 hover:border-[#c9a227]/30 transition-all duration-300 hover:shadow-[0_10px_40px_rgba(201,162,39,0.15)]">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#c9a227]/20 to-[#0e3b2c]/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-6 h-6 text-[#c9a227]" />
                      </div>
                      <div>
                        <h4 className="text-[#efe9d6] mb-1">{info.title}</h4>
                        <p className="text-[#c9a227] mb-1">{info.content}</p>
                        <p className="text-[#efe9d6]/60 text-sm">{info.subtext}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Additional Info Card */}
            <div className="bg-gradient-to-br from-[#c9a227]/10 to-[#0e3b2c]/10 backdrop-blur-xl border border-[#c9a227]/20 rounded-2xl p-6">
              <h4 className="text-[#efe9d6] mb-3">Working Hours</h4>
              <div className="space-y-2 text-[#efe9d6]/70 text-sm">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="text-[#c9a227]">8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="text-[#c9a227]">9:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="text-[#efe9d6]/50">Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form - Right Side */}
          <div className="md:col-span-3">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#c9a227]/20 to-[#0e3b2c]/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-100 transition-all duration-500"></div>

              <form onSubmit={handleSubmit} className="relative bg-[#232323]/60 backdrop-blur-xl border border-[#c9a227]/20 rounded-3xl p-8 md:p-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-[#efe9d6] text-sm block">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-xl px-4 py-3 text-[#efe9d6] placeholder-[#efe9d6]/40 focus:outline-none focus:border-[#c9a227]/60 focus:ring-2 focus:ring-[#c9a227]/20 transition-all duration-300"
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Email Field */}
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

                  {/* Phone Field */}
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

                  {/* Company Field */}
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

                {/* Service Selection */}
                <div className="space-y-2 mb-6">
                  <label htmlFor="service" className="text-[#efe9d6] text-sm block">
                    Service Interested In *
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full border border-[#c9a227]/20 rounded-xl px-4 py-3 focus:outline-none focus:border-[#c9a227]/60 focus:ring-2 focus:ring-[#c9a227]/20 transition-all duration-300"
                  >
                    <option value="">Select a service</option>
                    <option value="website">AI-Integrated Website Development</option>
                    <option value="text-chatbot">Text Chatbot Development</option>
                    <option value="voice-chatbot">Voice Chatbot Development</option>
                    <option value="consulting">AI Consulting</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Message Field */}
                <div className="space-y-2 mb-6">
                  <label htmlFor="message" className="text-[#efe9d6] text-sm block">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-xl px-4 py-3 text-[#efe9d6] placeholder-[#efe9d6]/40 focus:outline-none focus:border-[#c9a227]/60 focus:ring-2 focus:ring-[#c9a227]/20 transition-all duration-300 resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                {/* Submit Button */}
                <GradientButton size="lg" className="w-full">
                  <span className="flex items-center justify-center gap-2">
                    Send Message
                    <Send className="w-5 h-5" />
                  </span>
                </GradientButton>

                <p className="text-[#efe9d6]/50 text-xs text-center mt-4">
                  By submitting this form, you agree to our privacy policy and terms of service.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
