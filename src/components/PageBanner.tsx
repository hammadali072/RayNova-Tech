interface PageBannerProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: { label: string; href: string }[];
}

export function PageBanner({ title, subtitle, breadcrumbs }: PageBannerProps) {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center pt-20 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#0f0f0f]"></div>
        
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-[#c9a227]/20 via-[#d4b13f]/10 to-transparent rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-to-tl from-[#0e3b2c]/30 via-[#c9a227]/10 to-transparent rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
        
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'linear-gradient(#c9a227 1px, transparent 1px), linear-gradient(90deg, #c9a227 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="flex items-center justify-center gap-2 mb-6 text-[#efe9d6]/60 text-sm">
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center gap-2">
                <a href={crumb.href} className="hover:text-[#c9a227] transition-colors">
                  {crumb.label}
                </a>
                {index < breadcrumbs.length - 1 && (
                  <span>/</span>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="space-y-6">
          <h1 className="text-[#efe9d6]">
            {title.split(' ').map((word, index) => {
              // Make last word gradient
              if (index === title.split(' ').length - 1) {
                return (
                  <span key={index} className="bg-gradient-to-r from-[#c9a227] via-[#d4b13f] to-[#0e3b2c] bg-clip-text text-transparent">
                    {word}
                  </span>
                );
              }
              return <span key={index}>{word} </span>;
            })}
          </h1>
          
          {subtitle && (
            <p className="text-[#efe9d6]/70 text-xl max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {/* Decorative line */}
        <div className="mt-12 flex items-center justify-center gap-4">
          <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#c9a227]"></div>
          <div className="w-2 h-2 rounded-full bg-[#c9a227]"></div>
          <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#c9a227]"></div>
        </div>
      </div>
    </section>
  );
}
