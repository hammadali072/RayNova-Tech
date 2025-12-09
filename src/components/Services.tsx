
import { Globe, MessageSquare, Mic, Code, Zap, Brain } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import '../firebase';


export function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const servicesRef = ref(db, 'services');
    onValue(servicesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert object to array with id
        const arr = Object.entries(data).map(([id, item]) => ({ id, ...item }));
        setServices(arr);
      }
    });
  }, []);

  return (
    <section id="services" className="py-32 px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-[#c9a227]/10 to-transparent rounded-full blur-3xl animate-pulse-glow"></div>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-tl from-[#0e3b2c]/15 to-transparent rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20 space-y-4">
          <div className="inline-block">
            <span className="text-[#c9a227] bg-gradient-to-r from-[#c9a227]/10 to-[#0e3b2c]/10 px-5 py-2.5 rounded-full text-sm border border-[#c9a227]/30 shadow-[0_0_20px_rgba(201,162,39,0.15)]">
              Our Services
            </span>
          </div>
          <h2 className="text-[#efe9d6]">
            Comprehensive AI Solutions for{' '}
            <span className="bg-gradient-to-r from-[#c9a227] to-[#d4b13f] bg-clip-text text-transparent">
              Modern Businesses
            </span>
          </h2>
          <p className="text-[#efe9d6]/70 text-lg max-w-3xl mx-auto">
            Transform your digital presence with our cutting-edge AI-powered services designed to drive growth and engagement
          </p>
        </div>

        {/* Services Grid (Firebase) */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.length === 0 ? (
            <div className="col-span-3 text-center text-[#efe9d6]/70">Loading services...</div>
          ) : (
            services.map((service, index) => (
              <div key={service.id || index} className="group relative" aria-label={service.serviceAltText}>
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#c9a227]/20 to-[#0e3b2c]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                <div className="relative h-full bg-[#232323]/60 backdrop-blur-xl p-8 rounded-3xl border border-[#c9a227]/10 group-hover:border-[#c9a227]/40 transition-all duration-500 group-hover:shadow-[0_20px_60px_rgba(201,162,39,0.25)] overflow-hidden">
                  {/* Corner decoration */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#c9a227]/10 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>

                  <div className="relative z-10 space-y-6">
                    {/* Icon (optional, fallback to Globe) */}
                    <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-[#c9a227]/20 to-[#0e3b2c]/20 backdrop-blur-sm group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-[0_8px_20px_rgba(201,162,39,0.15)]">
                      <Globe className="w-8 h-8 text-[#c9a227]" />
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                      <h3 className="text-[#efe9d6] group-hover:text-[#c9a227] transition-colors duration-300">
                        {service.serviceName}
                      </h3>
                      <p className="text-[#efe9d6]/70 text-sm leading-relaxed">
                        {service.serviceDescription}
                      </p>
                    </div>

                    {/* Features */}
                    <ul className="space-y-3 mb-6">
                      {service.features && Array.isArray(service.features)
                        ? service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center gap-3 text-[#efe9d6]/70 text-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#c9a227] to-[#0e3b2c]"></div>
                            {feature}
                          </li>
                        ))
                        : null}
                    </ul>

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-auto">
                      <a href={`/order?service=${service.serviceName?.toLowerCase().replace(/\s+/g, '-')}`} className="flex-1">
                        <button className="w-full border border-[#c9a227]/40 text-[#c9a227] px-5 py-3 rounded-xl hover:bg-[#c9a227]/10 transition-all duration-300 text-sm">
                          Get Quote
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Additional Services */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {[
            { icon: Code, title: 'Custom Development', desc: 'Tailored solutions for your unique needs' },
            { icon: Zap, title: 'Fast Integration', desc: 'Quick deployment and seamless setup' },
            { icon: Brain, title: 'AI Consulting', desc: 'Expert guidance for your AI strategy' }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="bg-[#232323]/40 backdrop-blur-xl border border-[#c9a227]/10 rounded-2xl p-6 hover:border-[#c9a227]/30 transition-all duration-300 group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#c9a227]/20 to-[#0e3b2c]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-[#c9a227]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[#efe9d6] mb-1">{item.title}</h4>
                    <p className="text-[#efe9d6]/60 text-sm">{item.desc}</p>
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