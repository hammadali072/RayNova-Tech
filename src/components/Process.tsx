import { Lightbulb, PenTool, Rocket, BarChart } from 'lucide-react';

export function Process() {
  const steps = [
    {
      icon: Lightbulb,
      number: '01',
      title: 'Discovery & Planning',
      description: 'We dive deep into understanding your business goals, target audience, and project requirements to create a solid foundation.'
    },
    {
      icon: PenTool,
      number: '02',
      title: 'Design & Development',
      description: 'Our expert team brings your vision to life with cutting-edge design and robust AI-powered development.'
    },
    {
      icon: Rocket,
      number: '03',
      title: 'Testing & Launch',
      description: 'Rigorous testing ensures flawless performance before we launch your solution to the world.'
    },
    {
      icon: BarChart,
      number: '04',
      title: 'Support & Optimization',
      description: 'Continuous monitoring and optimization keep your solution performing at its peak with ongoing support.'
    }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6 relative overflow-hidden bg-gradient-to-b from-transparent via-[#232323]/20 to-transparent">
      {/* Background */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-[#c9a227]/10 to-transparent rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-tl from-[#0e3b2c]/15 to-transparent rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }} />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20 space-y-4">
          <div className="inline-block">
            <span className="text-[#c9a227] bg-gradient-to-r from-[#c9a227]/10 to-[#0e3b2c]/10 px-5 py-2.5 rounded-full text-sm border border-[#c9a227]/30 shadow-[0_0_20px_rgba(201,162,39,0.15)]">
              Our Process
            </span>
          </div>
          <h2 className="text-[#efe9d6]">
            How We{' '}
            <span className="bg-gradient-to-r from-[#c9a227] to-[#d4b13f] bg-clip-text text-transparent">
              Deliver Excellence
            </span>
          </h2>
          <p className="text-[#efe9d6]/70 text-sm sm:text-base md:text-lg max-w-3xl mx-auto">
            Our proven process ensures successful project delivery from concept to launch
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="group relative">
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-24 left-full w-full h-px bg-gradient-to-r from-[#c9a227]/30 to-transparent" />
                )}

                <div className="relative bg-[#232323]/60 backdrop-blur-xl border border-[#c9a227]/10 md:rounded-3xl rounded-xl lg:p-8 p-6 hover:border-[#c9a227]/40 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(201,162,39,0.2)] h-full">
                  {/* Number */}
                  <div className="absolute top-6 right-6 text-6xl font-bold bg-gradient-to-br from-[#c9a227]/10 to-[#0e3b2c]/10 bg-clip-text text-transparent">
                    {step.number}
                  </div>

                  <div className="relative z-10 lg:space-y-6 space-y-4">
                    {/* Icon */}
                    <div className="inline-flex p-4 md:rounded-2xl rounded-xl bg-gradient-to-br from-[#c9a227]/20 to-[#0e3b2c]/20 backdrop-blur-sm group-hover:scale-110 transition-all duration-500 shadow-[0_8px_20px_rgba(201,162,39,0.15)]">
                      <Icon className="w-8 h-8 text-[#c9a227]" />
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-[#efe9d6] group-hover:text-[#c9a227] transition-colors duration-300">
                        {step.title}
                      </h3>
                      <p className="text-[#efe9d6]/70 text-sm leading-relaxed">
                        {step.description}
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
