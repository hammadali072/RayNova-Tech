import { useState } from 'react';
import { Mail, Lock, User, Building, ArrowRight } from 'lucide-react';
import { GradientButton } from '../components/GradientButton';

import logo from "../assets/logo-light.svg";

export function SignUpPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    password: '',
    confirmPassword: '',
    terms: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sign up:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0f0f0f]"></div>
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[#c9a227]/20 via-[#d4b13f]/10 to-transparent rounded-full blur-3xl animate-pulse-glow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-[#0e3b2c]/30 via-[#c9a227]/10 to-transparent rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }}></div>

      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'linear-gradient(#c9a227 1px, transparent 1px), linear-gradient(90deg, #c9a227 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }}></div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <a href="/" className="inline-flex items-center gap-3 group">
            <img className="w-60" src={logo} alt="RayNova Tech" />
          </a>
        </div>

        {/* Sign Up Form */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-[#c9a227]/20 to-[#0e3b2c]/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-100 transition-all duration-500"></div>

          <div className="relative bg-[#232323]/60 backdrop-blur-xl border border-[#c9a227]/20 rounded-3xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-[#efe9d6] mb-2">Create Account</h2>
              <p className="text-[#efe9d6]/60">Join RayNova Tech today</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div className="space-y-2">
                <label htmlFor="name" className="text-[#efe9d6] text-sm block">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#c9a227]" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-xl pl-12 pr-4 py-3 text-[#efe9d6] placeholder-[#efe9d6]/40 focus:outline-none focus:border-[#c9a227]/60 focus:ring-2 focus:ring-[#c9a227]/20 transition-all duration-300"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-[#efe9d6] text-sm block">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#c9a227]" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-xl pl-12 pr-4 py-3 text-[#efe9d6] placeholder-[#efe9d6]/40 focus:outline-none focus:border-[#c9a227]/60 focus:ring-2 focus:ring-[#c9a227]/20 transition-all duration-300"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              {/* Company */}
              <div className="space-y-2">
                <label htmlFor="company" className="text-[#efe9d6] text-sm block">
                  Company Name (Optional)
                </label>
                <div className="relative">
                  <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#c9a227]" />
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-xl pl-12 pr-4 py-3 text-[#efe9d6] placeholder-[#efe9d6]/40 focus:outline-none focus:border-[#c9a227]/60 focus:ring-2 focus:ring-[#c9a227]/20 transition-all duration-300"
                    placeholder="Your Company"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-[#efe9d6] text-sm block">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#c9a227]" />
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-xl pl-12 pr-4 py-3 text-[#efe9d6] placeholder-[#efe9d6]/40 focus:outline-none focus:border-[#c9a227]/60 focus:ring-2 focus:ring-[#c9a227]/20 transition-all duration-300"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-[#efe9d6] text-sm block">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#c9a227]" />
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-xl pl-12 pr-4 py-3 text-[#efe9d6] placeholder-[#efe9d6]/40 focus:outline-none focus:border-[#c9a227]/60 focus:ring-2 focus:ring-[#c9a227]/20 transition-all duration-300"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Terms */}
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                  required
                  className="w-4 h-4 rounded border-[#c9a227]/40 bg-[#0f0f0f] text-[#c9a227] focus:ring-[#c9a227]/20 mt-1"
                />
                <span className="text-[#efe9d6]/70 text-sm">
                  I agree to the{' '}
                  <a href="/terms" className="text-[#c9a227] hover:underline">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="/privacy" className="text-[#c9a227] hover:underline">
                    Privacy Policy
                  </a>
                </span>
              </label>

              {/* Submit */}
              <GradientButton size="lg" className="w-full">
                <span className="flex items-center justify-center gap-2">
                  Create Account
                  <ArrowRight className="w-5 h-5" />
                </span>
              </GradientButton>
            </form>

            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-[#efe9d6]/60 text-sm">
                Already have an account?{' '}
                <a href="/login" className="text-[#c9a227] hover:underline">
                  Sign in
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <a href="/" className="text-[#efe9d6]/60 hover:text-[#c9a227] text-sm transition-colors">
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
