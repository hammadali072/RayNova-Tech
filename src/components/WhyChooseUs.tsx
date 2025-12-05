import { Brain, Rocket, Shield, HeartHandshake } from 'lucide-react';

export function WhyChooseUs() {
  const benefits = [
    {
      icon: Brain,
      title: 'AI-First Approach',
      description: 'We leverage cutting-edge AI technology in every solution we build for maximum innovation',
      gradient: 'from-[#c9a227]/20 to-[#0e3b2c]/20'
    },
    {
      icon: Rocket,
      title: 'Fast & High-Quality Development',
      description: 'Rapid delivery without compromising on quality or performance standards',
      gradient: 'from-[#0e3b2c]/20 to-[#c9a227]/20'
    },
    {
      icon: Shield,
      title: 'Scalable & Secure Systems',
      description: 'Built with enterprise-grade security and scalability in mind from day one',
      gradient: 'from-[#d4b13f]/20 to-[#0e3b2c]/20'
    },
    {
      icon: HeartHandshake,
      title: 'Dedicated Support Team',
      description: '24/7 support and maintenance to keep your systems running smoothly',
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
            <span className="text-[#c9a227] bg-gradient-to-r from-[#c9a227]/10 to-[#0e3b2c]/10 px-5 py-2.5 rounded-full text-sm border border-[#c9a227]/20 shadow-[0_0_20px_rgba(201,162,39,0.15)]">Why Us</span>
          </div>
          <h2 className="text-[#efe9d6] mb-4">Why Choose RayNova Tech?</h2>
          <p className="text-[#efe9d6]/70 max-w-2xl mx-auto">
            We bring together innovation, expertise, and dedication to deliver exceptional results that exceed expectations
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
                
                <div className="relative bg-[#232323]/60 backdrop-blur-xl p-8 rounded-3xl border-l-4 border-[#0e3b2c] group-hover:border-[#c9a227] transition-all duration-500 group-hover:shadow-[0_15px_50px_rgba(201,162,39,0.2)] overflow-hidden h-full">
                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#c9a227]/5 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                  
                  <div className="relative z-10">
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
