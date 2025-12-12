import techTideLogo from "../assets/techTide-logo.svg";

export function Partners() {
  const partners = [
    { name: 'TechCorp', logo: techTideLogo },
    { name: 'InnovateLab', logo: 'IL' },
    { name: 'DataFlow', logo: 'DF' },
    { name: 'CloudScale', logo: 'CS' },
    { name: 'AIVentures', logo: 'AV' },
    { name: 'SmartSys', logo: 'SS' },
    { name: 'FutureTech', logo: 'FT' },
    { name: 'NextGen', logo: 'NG' }
  ];

  return (
    <section className="min-h-screen flex items-center justify-center py-12 sm:py-16 md:py-20 px-4 sm:px-6 relative overflow-hidden bg-gradient-to-b from-transparent via-[#232323]/20 to-transparent">
      {/* Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-[#c9a227]/10 to-[#0e3b2c]/10 rounded-full blur-3xl animate-pulse-glow"></div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block">
            <span className="text-[#c9a227] bg-gradient-to-r from-[#c9a227]/10 to-[#0e3b2c]/10 px-5 py-2.5 rounded-full text-sm border border-[#c9a227]/30 shadow-[0_0_20px_rgba(201,162,39,0.15)]">
              Trusted Partnerships
            </span>
          </div>
          <h2 className="text-[#efe9d6]">
            Our Business{' '}
            <span className="bg-gradient-to-r from-[#c9a227] to-[#d4b13f] bg-clip-text text-transparent">
              Partners
            </span>
          </h2>
          <p className="text-[#efe9d6]/70 text-sm sm:text-base md:text-lg max-w-3xl mx-auto">
            Collaborating with industry leaders to deliver exceptional value and innovation
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {partners.map((partner, index) => (
            <div key={index} className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#c9a227]/10 to-[#0e3b2c]/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

              <div className="relative bg-[#232323]/40 backdrop-blur-xl border border-[#c9a227]/10 rounded-2xl p-8 hover:border-[#c9a227]/40 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(201,162,39,0.2)] flex items-center justify-center h-32">
                <div className="text-center space-y-2 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-4xl bg-gradient-to-r from-[#c9a227] to-[#d4b13f] bg-clip-text text-transparent">
                    <img src={partner.logo} alt={partner.name} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        {/* <div className="text-center mt-12">
          <p className="text-[#efe9d6]/70 text-lg mb-6">
            Interested in partnering with us?
          </p>
          <button className="bg-gradient-to-r from-[#c9a227] via-[#d4b13f] to-[#0e3b2c] text-[#efe9d6] px-10 py-4 rounded-full hover:shadow-[0_0_40px_rgba(201,162,39,0.7)] transition-all duration-300 transform hover:scale-105 relative overflow-hidden group">
            <span className="relative z-10">Become a Partner</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#0e3b2c] via-[#c9a227] to-[#d4b13f] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </button>
        </div> */}
      </div>
    </section>
  );
}
