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
      title: 'Disciplined, Enterprise-Level Execution',
      description: 'Our delivery model reflects elite command-tier discipline: structured planning, rigorous testing, transparent communication, and flawless execution across every phase.',
      gradient: 'from-[#d4b13f]/20 to-[#0e3b2c]/20'
    },
    {
      icon: HeartHandshake,
      title: 'A Strategic Advantage, Not Just a Service',
      description: "We don't offer tools we create long-term competitive advantages. Enterprises partner with us to reshape markets, streamline operations, and unlock new horizons of growth.",
      gradient: 'from-[#c9a227]/20 to-[#d4b13f]/20'
    }
  ];

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-transparent via-[#232323]/10 to-transparent relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-gradient-to-l from-[#c9a227]/10 to-transparent rounded-full blur-3xl animate-pulse-glow"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-r from-[#0e3b2c]/15 to-transparent rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-[#c9a227] bg-gradient-to-r from-[#c9a227]/10 to-[#0e3b2c]/10 px-5 py-2.5 rounded-full text-sm border border-[#c9a227]/20 shadow-[0_0_20px_rgba(201,162,39,0.15)]">Why Choose Us</span>
          </div>
          <h2 className="text-[#efe9d6]">
            Built for Success with{' '}
            <span className="bg-gradient-to-r from-[#c9a227] to-[#d4b13f] bg-clip-text text-transparent">
              Premium Features
            </span>
          </h2>
          <p className="text-[#efe9d6]/70 max-w-2xl mx-auto">
            Raynova Tech is chosen by enterprises that refuse mediocrity, demand mastery, and recognize the value of ethical, disciplined, world-class innovation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="group relative"
              >
                {/* Glow effect on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500`}></div>

                <div className="relative bg-[#232323]/60 backdrop-blur-xl p-8 rounded-xl text-center group-hover:border-[#c9a227] transition-all duration-500 group-hover:shadow-[0_15px_50px_rgba(201,162,39,0.2)] overflow-hidden h-full">
                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#c9a227]/5 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>

                  <div className="relative flex flex-col justify-center items-center z-10">
                    <div className={`bg-gradient-to-br ${benefit.gradient} backdrop-blur-sm w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-[0_8px_20px_rgba(201,162,39,0.15)]`}>
                      <Icon className="w-10 h-10 text-[#c9a227]" />
                    </div>
                    <h4 className="text-[#efe9d6] mb-3 group-hover:text-[#c9a227] transition-colors duration-300">{benefit.title}</h4>
                    <p className="text-[#efe9d6]/70 text-sm leading-relaxed">{benefit.description}</p>

                    {/* Decorative line */}
                    <div className="mt-6 h-1 w-0 bg-gradient-to-r from-[#c9a227] to-[#0e3b2c] group-hover:w-full transition-all duration-500 rounded-full"></div>
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
