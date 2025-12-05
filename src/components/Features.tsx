import { ImageWithFallback } from './figma/ImageWithFallback';
import { Check, Shield, Rocket, HeartHandshake, Clock } from 'lucide-react';
import { GradientButton } from './GradientButton';

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
    <section className="py-32 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-gradient-to-l from-[#c9a227]/10 to-transparent rounded-full blur-3xl animate-pulse-glow"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-r from-[#0e3b2c]/15 to-transparent rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }}></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          {/* Left - Image */}
          <div className="relative order-2 md:order-1">
            <div className="absolute inset-0 bg-gradient-to-br from-[#c9a227]/30 via-[#d4b13f]/20 to-[#0e3b2c]/30 rounded-[3rem] blur-3xl"></div>
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1620429948700-24e48a41d5aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2JvdCUyMGNoYXRib3QlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2NDQxNjE3MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Built for Success with Premium Features, We combine cutting-edge AI technology with proven development practices to deliver exceptional results that drive real business growth. Enterprise-Grade Security, Bank-level encryption and security protocols to protect your data, Lightning Fast Performance, Optimized for speed with cutting-edge technologies, Dedicated Support, 24/7 expert support team always ready to help, Quick Deployment, Fast turnaround time without compromising quality"
                className="rounded-3xl shadow-2xl border border-[#c9a227]/20 w-full"
              />

              {/* Stat cards */}
              <div className="absolute bottom-8 left-8 right-8 bg-[#232323]/90 backdrop-blur-xl border border-[#c9a227]/30 rounded-2xl p-6 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-3xl bg-gradient-to-r from-[#c9a227] to-[#d4b13f] bg-clip-text text-transparent mb-1">50+</div>
                    <div className="text-[#efe9d6]/60 text-sm">AI Models</div>
                  </div>
                  <div>
                    <div className="text-3xl bg-gradient-to-r from-[#c9a227] to-[#d4b13f] bg-clip-text text-transparent mb-1">100+</div>
                    <div className="text-[#efe9d6]/60 text-sm">Happy Clients</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-8 order-1 md:order-2">
            <div className="space-y-4">
              <div className="inline-block">
                <span className="text-[#c9a227] bg-gradient-to-r from-[#c9a227]/10 to-[#0e3b2c]/10 px-5 py-2.5 rounded-full text-sm border border-[#c9a227]/30 shadow-[0_0_20px_rgba(201,162,39,0.15)]">
                  Why Choose Us
                </span>
              </div>
              <h2 className="text-[#efe9d6]">
                Built for Success with{' '}
                <span className="bg-gradient-to-r from-[#c9a227] to-[#d4b13f] bg-clip-text text-transparent">
                  Premium Features
                </span>
              </h2>
              <p className="text-[#efe9d6]/70 text-lg leading-relaxed">
                We combine cutting-edge AI technology with proven development practices to deliver exceptional results that drive real business growth.
              </p>
            </div>

            {/* Features List */}
            <div className="grid grid-cols-1 gap-4">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="group flex items-start gap-4 bg-[#232323]/40 backdrop-blur-xl border border-[#c9a227]/10 rounded-2xl p-6 hover:border-[#c9a227]/30 hover:shadow-[0_10px_40px_rgba(201,162,39,0.15)] transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#c9a227]/20 to-[#0e3b2c]/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-[#c9a227]" />
                    </div>
                    <div>
                      <h4 className="text-[#efe9d6] mb-2">{feature.title}</h4>
                      <p className="text-[#efe9d6]/60 text-sm">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4">
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
