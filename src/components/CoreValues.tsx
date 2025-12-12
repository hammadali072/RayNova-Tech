import { Lightbulb, Users, Award, Shield, Zap, Heart } from 'lucide-react';

export function CoreValues() {
  const values = [
    {
      icon: Lightbulb,
      title: 'Principled Innovation',
      description: 'We engineer intelligent solutions guided by purpose, responsibility, and forward-looking excellence.',
      color: 'from-[#c9a227]/20 to-[#0e3b2c]/20'
    },
    {
      icon: Users,
      title: 'Honor in Partnership',
      description: 'We build alliances founded on trust, transparency, and long-term commitment to mutual success.',
      color: 'from-[#0e3b2c]/20 to-[#c9a227]/20'
    },
    {
      icon: Award,
      title: 'Disciplined Excellence',
      description: 'We uphold uncompromising standards in every action, delivering precision and quality without exception.',
      color: 'from-[#c9a227]/20 to-[#d4b13f]/20'
    },
    {
      icon: Shield,
      title: 'Integrity of Conduct',
      description: 'We operate with honesty, clarity, and moral responsibility in all professional engagements.',
      color: 'from-[#d4b13f]/20 to-[#0e3b2c]/20'
    },
    {
      icon: Zap,
      title: 'Strategic Agility',
      description: 'We adapt with intelligence and speed, responding to evolving challenges with focus and precision.',
      color: 'from-[#0e3b2c]/20 to-[#c9a227]/20'
    },
    {
      icon: Heart,
      title: 'Purpose-Driven Passion',
      description: 'We pursue our mission with conviction, dedication, and a relentless drive to achieve meaningful impact.',
      color: 'from-[#c9a227]/20 to-[#0e3b2c]/20'
    }
  ];

  return (
    <section className="min-h-screen flex items-center justify-center py-12 sm:py-16 md:py-20 px-4 sm:px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-l from-[#c9a227]/10 to-transparent rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-[#0e3b2c]/15 to-transparent rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }} />

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
          <p className="text-[#efe9d6]/70 text-sm sm:text-base md:text-lg max-w-3xl mx-auto">
            The principles that guide everything we do and define who we are as a company
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div key={index} className="group relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${value.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500`} />

                <div className="relative h-full bg-[#232323]/60 backdrop-blur-xl border border-[#c9a227]/10 rounded-3xl p-8 hover:border-[#c9a227]/40 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(201,162,39,0.25)]">
                  {/* Corner decoration */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#c9a227]/5 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />

                  <div className="relative z-10 md:space-y-6 space-y-4">
                    {/* Icon */}
                    <div className={`inline-flex lg:p-5 p-3 md:rounded-2xl rounded-xl bg-gradient-to-br ${value.color} backdrop-blur-sm group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-[0_8px_20px_rgba(201,162,39,0.15)]`}>
                      <Icon className="lg:w-10 w-8 lg:h-10 h-8 text-[#c9a227]" />
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
