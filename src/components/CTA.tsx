import { ArrowRight, Sparkles } from 'lucide-react';
import { GradientButton } from './GradientButton';

export function CTA() {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-[#c9a227]/20 via-[#d4b13f]/10 to-[#0e3b2c]/20 rounded-full blur-3xl animate-pulse-glow"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="bg-[#232323]/60 backdrop-blur-xl border border-[#c9a227]/20 rounded-[3rem] p-12 md:p-16 shadow-[0_20px_80px_rgba(201,162,39,0.2)] relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#c9a227]/20 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#0e3b2c]/20 to-transparent rounded-full blur-3xl"></div>

          <div className="relative z-10 text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#0f0f0f]/60 backdrop-blur-xl border border-[#c9a227]/30 px-5 py-3 rounded-full shadow-[0_0_30px_rgba(201,162,39,0.2)]">
              <Sparkles className="w-4 h-4 text-[#c9a227]" />
              <span className="text-[#c9a227] text-sm">Limited Time Offer</span>
            </div>

            <div className="space-y-6">
              <h2 className="text-[#efe9d6] max-w-3xl mx-auto">
                Ready to Transform Your Business with{' '}
                <span className="bg-gradient-to-r from-[#c9a227] via-[#d4b13f] to-[#0e3b2c] bg-clip-text text-transparent">
                  AI Innovation?
                </span>
              </h2>

              <p className="text-[#efe9d6]/70 text-xl max-w-2xl mx-auto leading-relaxed">
                Join hundreds of businesses already using our AI-powered solutions. Get started today and see results in days, not months.
              </p>
            </div>

            <a href="/contact" className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <GradientButton size="lg">
                <span className="flex items-center gap-2">
                  Start Your Free Consultation
                  <ArrowRight className="w-5 h-5" />
                </span>
              </GradientButton>
            </a>

            {/* Trust indicators */}
            <div className="flex items-center justify-center gap-8 pt-8 text-[#efe9d6]/60 text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#c9a227]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#c9a227]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#c9a227]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Money-back guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
