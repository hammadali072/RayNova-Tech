import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { GradientButton } from '../GradientButton';
import { useState } from 'react';
import { db } from '../../firebase'; // Adjust path according to your project structure
import { ref, push, set } from 'firebase/database';

export function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Reset states
        setSubmitError('');
        setIsSubmitting(true);

        try {
            // Create a reference to the 'contacts' node in Firebase
            const contactsRef = ref(db, 'contacts');

            // Generate a new unique ID for this contact submission
            const newContactRef = push(contactsRef);

            // Prepare the contact data object
            const contactData = {
                id: newContactRef.key,
                name: formData.name.trim(),
                email: formData.email.trim().toLowerCase(),
                phone: formData.phone.trim() || null,
                company: formData.company.trim() || null,
                service: formData.service,
                message: formData.message.trim(),
                status: 'new', // Status can be: new, read, responded, archived
                createdAt: new Date().toISOString(),
                ipAddress: '', // You can add IP tracking if needed
                userAgent: navigator.userAgent || 'Unknown',
                source: 'website_contact_form'
            };

            // Save to Firebase
            await set(newContactRef, contactData);

            // Reset form on success
            setFormData({
                name: '',
                email: '',
                phone: '',
                company: '',
                service: '',
                message: ''
            });

            // Show success message
            setSubmitSuccess(true);

            // Hide success message after 5 seconds
            setTimeout(() => {
                setSubmitSuccess(false);
            }, 5000);

            console.log('Contact form submitted successfully:', contactData);

        } catch (error: any) {
            console.error('Error submitting contact form:', error);
            setSubmitError('Failed to submit your message. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        // Clear any previous success/error messages when user starts typing
        if (submitSuccess) setSubmitSuccess(false);
        if (submitError) setSubmitError('');
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
            content: ['+44 7848 101848', '+41 79 726 55 55', '+1 646 777 1766'],
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
                                                <p className="text-[#c9a227] mb-1">
                                                    {Array.isArray(info.content)
                                                        ? info.content.map((item: string, idx: number) => (
                                                            <span key={idx} className="block">{item}</span>
                                                        ))
                                                        : info.content}
                                                </p>
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
                                {/* Success Message */}
                                {submitSuccess && (
                                    <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-xl text-green-300">
                                        <div className="flex items-center gap-2">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className="text-sm">Thank you! Your message has been sent successfully. We'll get back to you soon.</span>
                                        </div>
                                    </div>
                                )}

                                {/* Error Message */}
                                {submitError && (
                                    <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300">
                                        <div className="flex items-center gap-2">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.22 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                            </svg>
                                            <span className="text-sm">{submitError}</span>
                                        </div>
                                    </div>
                                )}

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
                                            disabled={isSubmitting}
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
                                            disabled={isSubmitting}
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
                                            disabled={isSubmitting}
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
                                            disabled={isSubmitting}
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
                                        className="w-full bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-xl px-4 py-3 text-[#efe9d6] focus:outline-none focus:border-[#c9a227]/60 focus:ring-2 focus:ring-[#c9a227]/20 transition-all duration-300"
                                        disabled={isSubmitting}
                                    >
                                        <option value="">Select a service</option>
                                        <option value="ai-website">AI-Integrated Website Development</option>
                                        <option value="text-chatbot">Text Chatbot Development</option>
                                        <option value="voice-chatbot">Voice Chatbot Development</option>
                                        <option value="ai-consulting">AI Consulting</option>
                                        <option value="custom-solution">Custom AI Solution</option>
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
                                        disabled={isSubmitting}
                                    />
                                </div>

                                {/* Submit Button */}
                                <GradientButton
                                    size="lg"
                                    className="w-full"
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    <span className="flex items-center justify-center gap-2">
                                        {isSubmitting ? (
                                            <>
                                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                Send Message
                                                <Send className="w-5 h-5" />
                                            </>
                                        )}
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