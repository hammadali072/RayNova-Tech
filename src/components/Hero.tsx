import { ImageWithFallback } from './figma/ImageWithFallback';
import { Sparkles, ArrowRight, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GradientButton } from './GradientButton';

export function Hero() {
  const navigate = useNavigate();

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#0f0f0f]"></div>

        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[#c9a227]/20 via-[#d4b13f]/10 to-transparent rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-[#0e3b2c]/30 via-[#c9a227]/10 to-transparent rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-[400px] h-[400px] bg-gradient-to-br from-[#c9a227]/15 to-transparent rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '4s' }}></div>

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'linear-gradient(#c9a227 1px, transparent 1px), linear-gradient(90deg, #c9a227 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#232323]/80 backdrop-blur-xl border border-[#c9a227]/30 px-5 py-3 rounded-full shadow-[0_0_30px_rgba(201,162,39,0.2)]">
              <Sparkles className="w-4 h-4 text-[#c9a227]" />
              <span className="text-[#c9a227] text-sm">AI-Powered Digital Excellence</span>
            </div>

            <div className="space-y-6">
              <h1 className="text-[#efe9d6] leading-tight">
                Transform Your Business with{' '}
                <span className="bg-gradient-to-r from-[#c9a227] via-[#d4b13f] to-[#0e3b2c] bg-clip-text text-transparent">
                  Next-Gen AI Solutions
                </span>
              </h1>

              <p className="text-[#efe9d6]/70 text-xl leading-relaxed">
                RayNova Tech delivers cutting-edge websites powered by artificial intelligence and intelligent chatbot solutions that revolutionize customer engagement.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <GradientButton size="lg" onClick={() => navigate("/services")}>
                <span className="flex items-center gap-2">
                  Explore Our Services
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </GradientButton>

              {/* <button className="flex items-center gap-3 text-[#efe9d6] hover:text-[#c9a227] transition-colors duration-300 group">
                <div className="w-14 h-14 rounded-full bg-[#232323]/80 backdrop-blur-xl border border-[#c9a227]/30 flex items-center justify-center group-hover:border-[#c9a227]/60 group-hover:shadow-[0_0_20px_rgba(201,162,39,0.3)] transition-all duration-300">
                  <Play className="w-5 h-5 ml-1" />
                </div>
                <span>Watch Demo</span>
              </button> */}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="space-y-1">
                <div className="text-3xl bg-gradient-to-r from-[#c9a227] to-[#d4b13f] bg-clip-text text-transparent">150+</div>
                <div className="text-[#efe9d6]/60 text-sm">Projects Delivered</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl bg-gradient-to-r from-[#c9a227] to-[#d4b13f] bg-clip-text text-transparent">98%</div>
                <div className="text-[#efe9d6]/60 text-sm">Client Satisfaction</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl bg-gradient-to-r from-[#c9a227] to-[#d4b13f] bg-clip-text text-transparent">24/7</div>
                <div className="text-[#efe9d6]/60 text-sm">Support Available</div>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#c9a227]/30 via-[#d4b13f]/20 to-[#0e3b2c]/30 rounded-[3rem] blur-3xl" />
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1618758992242-2d4bc63a1be7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBSSUyMGFydGlmaWNpYWwlMjBpbnRlbGxpZ2VuY2V8ZW58MXx8fHwxNzY0Mjk1OTI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Transform Your Business with Next-Gen AI Solutions, RayNova Tech delivers cutting-edge websites powered by artificial intelligence and intelligent chatbot solutions that revolutionize customer engagement."
                className="rounded-3xl shadow-2xl border border-[#c9a227]/20 w-full"
              />

              {/* Floating cards */}
              <div className="absolute -bottom-6 -left-6 bg-[#232323]/90 backdrop-blur-xl border border-[#c9a227]/30 rounded-2xl p-4 shadow-[0_20px_60px_rgba(0,0,0,0.5)] animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#c9a227] to-[#0e3b2c] flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-[#efe9d6]" />
                  </div>
                  <div>
                    <div className="text-[#efe9d6] text-sm">AI Powered</div>
                    <div className="text-[#efe9d6]/60 text-xs">Smart Solutions</div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 bg-[#232323]/90 backdrop-blur-xl border border-[#c9a227]/30 rounded-2xl p-4 shadow-[0_20px_60px_rgba(0,0,0,0.5)] animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0e3b2c] to-[#c9a227] flex items-center justify-center">
                    <ArrowRight className="w-6 h-6 text-[#efe9d6]" />
                  </div>
                  <div>
                    <div className="text-[#efe9d6] text-sm">Fast Delivery</div>
                    <div className="text-[#efe9d6]/60 text-xs">Quality Results</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
