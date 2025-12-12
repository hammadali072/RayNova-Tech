import { ImageWithFallback } from './figma/ImageWithFallback';
import { Check, Shield, Rocket, HeartHandshake, Clock } from 'lucide-react';
import { GradientButton } from './GradientButton';
import webImage from '../assets/whychoose-img.webp';

export function Features() {
  const features = [
    {
      icon: Shield,
      title: 'Enterprise-Grade Security',
      description: 'Bank-level encryption and security protocols to protect your data'
    },
    {
      icon: Rocket,
      title: 'Lightning Fast Performance',
      description: 'Optimized for speed with cutting-edge technologies'
    },
    {
      icon: HeartHandshake,
      title: 'Dedicated Support',
      description: '24/7 expert support team always ready to help'
    },
    {
      icon: Clock,
      title: 'Quick Deployment',
      description: 'Fast turnaround time without compromising quality'
    }
  ];

  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-gradient-to-l from-[#c9a227]/10 to-transparent rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-r from-[#0e3b2c]/15 to-transparent rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-center">
          {/* Left - Image */}
          <div className="relative order-2 lg:order-1">
            <div className="absolute -inset-4 lg:-inset-6 bg-gradient-to-br from-[#c9a227]/30 via-[#d4b13f]/20 to-[#0e3b2c]/30 rounded-3xl lg:rounded-[3rem] blur-3xl opacity-75" />
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#c9a227]/20 to-[#0e3b2c]/20 rounded-3xl blur-xl" />
              <ImageWithFallback
                src={webImage}
                alt="Built for Success with Premium Features, We combine cutting-edge AI technology with proven development practices to deliver exceptional results that drive real business growth. Enterprise-Grade Security, Bank-level encryption and security protocols to protect your data, Lightning Fast Performance, Optimized for speed with cutting-edge technologies, Dedicated Support, 24/7 expert support team always ready to help, Quick Deployment, Fast turnaround time without compromising quality"
                className="relative rounded-3xl shadow-2xl border border-[#c9a227]/30 w-full group-hover:scale-[1.02] transition-transform duration-700"
              />

              {/* Enhanced Stat cards */}
              <div className="absolute bottom-6 left-6 right-6 lg:bottom-8 lg:left-8 lg:right-8 bg-[#232323]/95 backdrop-blur-xl border border-[#c9a227]/40 rounded-2xl p-5 lg:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
                <div className="grid grid-cols-2 gap-4 lg:gap-6">
                  <div className="text-center lg:text-left">
                    <div className="text-2xl lg:text-3xl bg-gradient-to-r from-[#c9a227] to-[#d4b13f] bg-clip-text text-transparent mb-1 font-bold">50+</div>
                    <div className="text-[#efe9d6]/70 text-xs lg:text-sm">AI Models</div>
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="text-2xl lg:text-3xl bg-gradient-to-r from-[#c9a227] to-[#d4b13f] bg-clip-text text-transparent mb-1 font-bold">100+</div>
                    <div className="text-[#efe9d6]/70 text-xs lg:text-sm">Happy Clients</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-8 lg:space-y-10 order-1 lg:order-2">
            <div className="space-y-4 lg:space-y-6">
              <div className="inline-block">
                <span className="text-[#c9a227] bg-gradient-to-r from-[#c9a227]/10 to-[#0e3b2c]/10 px-5 py-2.5 rounded-full text-sm border border-[#c9a227]/30 shadow-[0_0_20px_rgba(201,162,39,0.15)]">
                  Premium Features
                </span>
              </div>
              <h2 className="text-[#efe9d6]">
                Built for Success with{' '}
                <span className="bg-gradient-to-r from-[#c9a227] to-[#d4b13f] bg-clip-text text-transparent">
                  Enterprise Excellence
                </span>
              </h2>
              <p className="text-[#efe9d6]/70 text-sm sm:text-base md:text-lg leading-relaxed">
                We combine cutting-edge AI technology with proven development practices to deliver exceptional results that drive real business growth.
              </p>
            </div>

            {/* Enhanced Features List */}
            <div className="grid grid-cols-1 gap-4 lg:gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="group relative"
                  >
                    {/* Glow effect on hover */}
                    <div className="absolute -inset-1 bg-gradient-to-br from-[#c9a227]/20 to-[#0e3b2c]/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-all duration-500" />

                    <div className="relative flex items-start gap-4 lg:gap-5 bg-[#232323]/80 backdrop-blur-xl border border-[#c9a227]/20 rounded-2xl p-5 lg:p-6 hover:border-[#c9a227]/50 hover:shadow-[0_15px_50px_rgba(201,162,39,0.25)] transition-all duration-500 overflow-hidden">
                      {/* Decorative corner */}
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#c9a227]/10 to-transparent rounded-full blur-2xl group-hover:scale-150 group-hover:opacity-100 opacity-40 transition-all duration-700" />

                      {/* Icon Container */}
                      <div className="relative z-10 w-14 h-14 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl bg-gradient-to-br from-[#c9a227]/20 to-[#0e3b2c]/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-[0_8px_20px_rgba(201,162,39,0.2)] border border-[#c9a227]/30">
                        <Icon className="w-7 h-7 lg:w-8 lg:h-8 text-[#c9a227]" />
                      </div>

                      {/* Content */}
                      <div className="relative z-10 flex-1">
                        <h4 className="text-[#efe9d6] mb-2 lg:mb-3 group-hover:text-[#c9a227] transition-colors duration-300 text-base lg:text-lg font-semibold">
                          {feature.title}
                        </h4>
                        <p className="text-[#efe9d6]/70 text-sm lg:text-base leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 lg:pt-4">
              <GradientButton size="lg">
                <span className="flex items-center gap-2">
                  Discover More Features
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </GradientButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
