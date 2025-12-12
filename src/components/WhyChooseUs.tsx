import { Brain, Rocket, Shield, HeartHandshake } from 'lucide-react';

export function WhyChooseUs() {
  const benefits = [
    {
      icon: Brain,
      title: 'Sovereign-Grade AI Solutions',
      description: 'Our systems are engineered to meet the highest global standards of security, precision, and performance suitable for institutions where reliability is non-negotiable.',
      gradient: 'from-[#c9a227]/20 to-[#0e3b2c]/20'
    },
    {
      icon: Rocket,
      title: 'Ethical Innovation You Can Trust',
      description: 'We build technology guided by principled responsibility. No shortcuts, no hidden practices, no compromises. Enterprises choose Raynova because they know our integrity is as strong as our engineering.',
      gradient: 'from-[#0e3b2c]/20 to-[#c9a227]/20'
    },
    {
      icon: Shield,
      title: 'Enterprise-Level Execution',
      description: 'Our delivery model reflects elite command-tier discipline: structured planning, rigorous testing, transparent communication, and flawless execution across every phase.',
      gradient: 'from-[#d4b13f]/20 to-[#0e3b2c]/20'
    },
    {
      icon: HeartHandshake,
      title: 'A Strategic Advantage',
      description: "We don't offer tools we create long-term competitive advantages. Enterprises partner with us to reshape markets, streamline operations, and unlock new horizons of growth.",
      gradient: 'from-[#c9a227]/20 to-[#d4b13f]/20'
    }
  ];

  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 bg-gradient-to-b from-transparent via-[#232323]/10 to-transparent relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-gradient-to-l from-[#c9a227]/10 to-transparent rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-r from-[#0e3b2c]/15 to-transparent rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center lg:mb-20 mb-12 lg:space-y-4 space-y-2">
          <div className="inline-block mb-4">
            <span className="text-[#c9a227] bg-gradient-to-r from-[#c9a227]/10 to-[#0e3b2c]/10 px-5 py-2.5 rounded-full text-sm border border-[#c9a227]/20 shadow-[0_0_20px_rgba(201,162,39,0.15)]">Why Choose Us</span>
          </div>
          <h2 className="text-[#efe9d6]">
            Built for Success with{' '}
            <span className="bg-gradient-to-r from-[#c9a227] to-[#d4b13f] bg-clip-text text-transparent">
              Premium Features
            </span>
          </h2>
          <p className="text-[#efe9d6]/70 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            Raynova Tech is chosen by enterprises that refuse mediocrity, demand mastery, and recognize the value of ethical, disciplined, world-class innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="group relative"
              >
                {/* Glow effect on hover */}
                <div className={`absolute -inset-1 bg-gradient-to-br ${benefit.gradient} rounded-2xl lg:rounded-3xl blur-xl opacity-0 group-hover:opacity-60 transition-all duration-500`} />

                <div className="relative bg-[#232323]/80 backdrop-blur-xl border border-[#c9a227]/20 rounded-2xl lg:rounded-3xl p-6 lg:p-8 text-center group-hover:border-[#c9a227]/50 group-hover:shadow-[0_20px_60px_rgba(201,162,39,0.25)] transition-all duration-500 overflow-hidden h-full flex flex-col">
                  {/* Decorative corner gradient */}
                  <div className="absolute top-0 right-0 lg:w-40 lg:h-40 w-32 h-32 bg-gradient-to-br from-[#c9a227]/10 to-transparent rounded-full blur-2xl group-hover:scale-150 group-hover:opacity-100 opacity-50 transition-all duration-700" />
                  <div className="absolute bottom-0 left-0 lg:w-32 lg:h-32 w-24 h-24 bg-gradient-to-tr from-[#0e3b2c]/10 to-transparent rounded-full blur-2xl group-hover:scale-150 group-hover:opacity-100 opacity-30 transition-all duration-700" />

                  <div className="relative flex flex-col items-center z-10 flex-grow">
                    {/* Icon Container */}
                    <div className={`bg-gradient-to-br ${benefit.gradient} backdrop-blur-sm lg:w-20 lg:h-20 w-16 h-16 lg:rounded-2xl rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-[0_8px_20px_rgba(201,162,39,0.2)] border border-[#c9a227]/30`}>
                      <Icon className="lg:w-10 lg:h-10 w-8 h-8 text-[#c9a227]" />
                    </div>

                    {/* Title */}
                    <h4 className="text-[#efe9d6] mb-4 group-hover:text-[#c9a227] transition-colors duration-300 text-lg lg:text-xl font-semibold">
                      {benefit.title}
                    </h4>

                    {/* Description */}
                    <p className="text-[#efe9d6]/70 text-sm lg:text-base leading-relaxed flex-grow">
                      {benefit.description}
                    </p>

                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
