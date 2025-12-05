import { Eye, Target } from 'lucide-react';

export function VisionMission() {
  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-[#c9a227]/10 to-transparent rounded-full blur-3xl animate-pulse-glow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-tl from-[#0e3b2c]/15 to-transparent rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block">
            <span className="text-[#c9a227] bg-gradient-to-r from-[#c9a227]/10 to-[#0e3b2c]/10 px-5 py-2.5 rounded-full text-sm border border-[#c9a227]/30 shadow-[0_0_20px_rgba(201,162,39,0.15)]">
              Our Purpose
            </span>
          </div>
          <h2 className="text-[#efe9d6]">
            Vision &{' '}
            <span className="bg-gradient-to-r from-[#c9a227] to-[#d4b13f] bg-clip-text text-transparent">
              Mission
            </span>
          </h2>
        </div>

        {/* Split Design */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Vision */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#c9a227]/20 to-[#0e3b2c]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            
            <div className="relative h-full bg-[#232323]/60 backdrop-blur-xl border border-[#c9a227]/20 rounded-3xl p-10 hover:border-[#c9a227]/40 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(201,162,39,0.25)]">
              {/* Icon */}
              <div className="inline-flex p-6 rounded-3xl bg-gradient-to-br from-[#c9a227]/20 to-[#0e3b2c]/20 backdrop-blur-sm mb-8 group-hover:scale-110 transition-all duration-500 shadow-[0_8px_20px_rgba(201,162,39,0.15)]">
                <Eye className="w-12 h-12 text-[#c9a227]" />
              </div>

              <div className="space-y-6">
                <h3 className="text-[#efe9d6]">Our Vision</h3>
                <p className="text-[#efe9d6]/70 text-lg leading-relaxed">
                  To be the global leader in AI-powered digital solutions, transforming how businesses interact with technology and their customers through innovative, intelligent systems that drive unprecedented growth and efficiency.
                </p>
                <div className="pt-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#c9a227] to-[#0e3b2c] mt-2"></div>
                    <p className="text-[#efe9d6]/60">Leading AI innovation in web development</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#c9a227] to-[#0e3b2c] mt-2"></div>
                    <p className="text-[#efe9d6]/60">Empowering businesses worldwide</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#c9a227] to-[#0e3b2c] mt-2"></div>
                    <p className="text-[#efe9d6]/60">Shaping the future of digital interaction</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mission */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0e3b2c]/20 to-[#c9a227]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            
            <div className="relative h-full bg-[#232323]/60 backdrop-blur-xl border border-[#c9a227]/20 rounded-3xl p-10 hover:border-[#c9a227]/40 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(201,162,39,0.25)]">
              {/* Icon */}
              <div className="inline-flex p-6 rounded-3xl bg-gradient-to-br from-[#0e3b2c]/20 to-[#c9a227]/20 backdrop-blur-sm mb-8 group-hover:scale-110 transition-all duration-500 shadow-[0_8px_20px_rgba(201,162,39,0.15)]">
                <Target className="w-12 h-12 text-[#c9a227]" />
              </div>

              <div className="space-y-6">
                <h3 className="text-[#efe9d6]">Our Mission</h3>
                <p className="text-[#efe9d6]/70 text-lg leading-relaxed">
                  To deliver cutting-edge AI solutions that seamlessly integrate with modern web technologies, providing businesses with intelligent tools that enhance customer engagement, streamline operations, and drive measurable results.
                </p>
                <div className="pt-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#0e3b2c] to-[#c9a227] mt-2"></div>
                    <p className="text-[#efe9d6]/60">Deliver exceptional AI-powered solutions</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#0e3b2c] to-[#c9a227] mt-2"></div>
                    <p className="text-[#efe9d6]/60">Ensure client success through innovation</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#0e3b2c] to-[#c9a227] mt-2"></div>
                    <p className="text-[#efe9d6]/60">Maintain highest quality standards</p>
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
