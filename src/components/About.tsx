import { ImageWithFallback } from './figma/ImageWithFallback';
import { Users, Briefcase, Bot, TrendingUp } from 'lucide-react';

export function About() {
  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 relative overflow-hidden">
      {/* Animated background decoration */}
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-gradient-to-r from-[#0e3b2c]/15 to-transparent rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-l from-[#c9a227]/10 to-transparent rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Left: Image */}
          <div className="relative group">
            <div className="absolute -inset-6 bg-gradient-to-r from-[#c9a227]/30 via-[#d4b13f]/20 to-[#0e3b2c]/30 rounded-[3rem] blur-3xl group-hover:blur-2xl transition-all duration-700 opacity-75 group-hover:opacity-100" />
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#c9a227]/20 to-[#0e3b2c]/20 rounded-3xl blur-xl" />
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1674027444485-cec3da58eef4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwbmV0d29ya3xlbnwxfHx8fDE3NjQxNTAxMjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="About RayNova Tech, At RayNova Tech, we specialize in creating cutting-edge web solutions powered by artificial intelligence. Our expertise spans from building responsive, modern websites to developing custom AI chatbots that transform  how businesses interact with their customers. We combine innovative technology with practical business solutions, ensuring every project delivers measurable results and exceptional user experiences."
                className="relative rounded-3xl shadow-2xl w-full h-auto border border-[#c9a227]/20 group-hover:scale-[1.02] transition-transform duration-700"
              />
              {/* Floating decorative elements */}
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-[#c9a227] via-[#d4b13f] to-[#0e3b2c] rounded-3xl opacity-60 blur-2xl animate-float" />
              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-gradient-to-tr from-[#0e3b2c] via-[#c9a227] to-[#d4b13f] rounded-3xl opacity-50 blur-2xl animate-float" style={{ animationDelay: '2s' }} />
            </div>
          </div>

          {/* Right: Content */}
          <div className="space-y-6">
            <div className="inline-block mb-2">
              <span className="text-[#c9a227] bg-gradient-to-r from-[#c9a227]/10 to-[#0e3b2c]/10 px-5 py-2.5 rounded-full text-sm border border-[#c9a227]/20 shadow-[0_0_20px_rgba(201,162,39,0.15)]">About Us</span>
            </div>
            <h2 className="text-[#efe9d6] bg-gradient-to-r from-[#efe9d6] via-[#efe9d6] to-[#c9a227] bg-clip-text">
              About RayNova Tech
            </h2>
            <p className="text-[#efe9d6]/80 text-sm sm:text-base md:text-lg leading-relaxed">
              Raynova Tech is a prestige global AI and digital transformation company operating under the leadership of Al Rayah Global Group LTD (United Kingdom) in strategic alliance with TechTide Corporate LLP (Pakistan). We serve as a unified powerhouse dedicated to building intelligent, enterprise-grade solutions for organizations that demand superior performance, ethical accountability, and world-class execution.
            </p>
            <p className="text-[#efe9d6]/80 text-sm sm:text-base md:text-lg leading-relaxed">
              Our expertise spans:
            </p>

            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-3 text-[#efe9d6]/70 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#c9a227] to-[#0e3b2c]" />
                AI automation & intelligent system design
              </li>
              <li className="flex items-center gap-3 text-[#efe9d6]/70 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#c9a227] to-[#0e3b2c]" />
                Enterprise software engineering
              </li>
              <li className="flex items-center gap-3 text-[#efe9d6]/70 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#c9a227] to-[#0e3b2c]" />
                Digital transformation for large-scale organizations
              </li>
              <li className="flex items-center gap-3 text-[#efe9d6]/70 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#c9a227] to-[#0e3b2c]" />
                Strategic technology consulting
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
