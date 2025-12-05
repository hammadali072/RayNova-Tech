import { Lightbulb, Users, Award, Shield, Zap, Heart } from 'lucide-react';

export function CoreValues() {
  const values = [
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We constantly push boundaries and embrace new technologies to stay ahead of the curve.',
      color: 'from-[#c9a227]/20 to-[#0e3b2c]/20'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'We work closely with our clients, fostering partnerships that drive mutual success.',
      color: 'from-[#0e3b2c]/20 to-[#c9a227]/20'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We deliver nothing but the highest quality in every project we undertake.',
      color: 'from-[#c9a227]/20 to-[#d4b13f]/20'
    },
    {
      icon: Shield,
      title: 'Integrity',
      description: 'We maintain transparency and honesty in all our business relationships.',
      color: 'from-[#d4b13f]/20 to-[#0e3b2c]/20'
    },
    {
      icon: Zap,
      title: 'Agility',
      description: 'We adapt quickly to changing needs and deliver solutions with speed and precision.',
      color: 'from-[#0e3b2c]/20 to-[#c9a227]/20'
    },
    {
      icon: Heart,
      title: 'Passion',
      description: 'We love what we do and it shows in the dedication we bring to every project.',
      color: 'from-[#c9a227]/20 to-[#0e3b2c]/20'
    }
  ];

  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-l from-[#c9a227]/10 to-transparent rounded-full blur-3xl animate-pulse-glow"></div>
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-[#0e3b2c]/15 to-transparent rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }}></div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block">
            <span className="text-[#c9a227] bg-gradient-to-r from-[#c9a227]/10 to-[#0e3b2c]/10 px-5 py-2.5 rounded-full text-sm border border-[#c9a227]/30 shadow-[0_0_20px_rgba(201,162,39,0.15)]">
              What Drives Us
            </span>
          </div>
          <h2 className="text-[#efe9d6]">
            Our Core{' '}
            <span className="bg-gradient-to-r from-[#c9a227] to-[#d4b13f] bg-clip-text text-transparent">
              Values
            </span>
          </h2>
          <p className="text-[#efe9d6]/70 text-lg max-w-3xl mx-auto">
            The principles that guide everything we do and define who we are as a company
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div key={index} className="group relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${value.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500`}></div>
                
                <div className="relative h-full bg-[#232323]/60 backdrop-blur-xl border border-[#c9a227]/10 rounded-3xl p-8 hover:border-[#c9a227]/40 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(201,162,39,0.25)]">
                  {/* Corner decoration */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#c9a227]/5 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                  
                  <div className="relative z-10 space-y-6">
                    {/* Icon */}
                    <div className={`inline-flex p-5 rounded-2xl bg-gradient-to-br ${value.color} backdrop-blur-sm group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-[0_8px_20px_rgba(201,162,39,0.15)]`}>
                      <Icon className="w-10 h-10 text-[#c9a227]" />
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="text-[#efe9d6] group-hover:text-[#c9a227] transition-colors duration-300">
                        {value.title}
                      </h3>
                      <p className="text-[#efe9d6]/70 text-sm leading-relaxed">
                        {value.description}
                      </p>
                    </div>
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
