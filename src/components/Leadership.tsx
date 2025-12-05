import { ImageWithFallback } from './figma/ImageWithFallback';
import { Linkedin, Twitter, Mail } from 'lucide-react';

export function Leadership() {
  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Chief Executive Officer',
      image: 'https://images.unsplash.com/photo-1425421669292-0c3da3b8f529?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMGV4ZWN1dGl2ZXxlbnwxfHx8fDE3NjQ0MzgxMDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      bio: 'Visionary leader with 15+ years in AI and tech innovation. Leading RayNova Tech to new heights.',
      social: { linkedin: '#', twitter: '#', email: '#' }
    },
    {
      name: 'Michael Chen',
      role: 'Chief Technology Officer',
      image: 'https://images.unsplash.com/photo-1553976468-dcd9082bcd28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGxlYWRlciUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NDQ2NTQ4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      bio: 'AI expert specializing in machine learning and natural language processing. Driving technical excellence.',
      social: { linkedin: '#', twitter: '#', email: '#' }
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of AI Solutions',
      image: 'https://images.unsplash.com/photo-1581093805071-a04e696db334?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHRlYW18ZW58MXx8fHwxNzY0MzgxNDM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      bio: 'Passionate about creating intelligent chatbot solutions that transform customer experiences.',
      social: { linkedin: '#', twitter: '#', email: '#' }
    },
    {
      name: 'David Park',
      role: 'Head of Development',
      image: 'https://images.unsplash.com/photo-1425421669292-0c3da3b8f529?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMGV4ZWN1dGl2ZXxlbnwxfHx8fDE3NjQ0MzgxMDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      bio: 'Full-stack developer with expertise in modern web technologies and scalable architecture.',
      social: { linkedin: '#', twitter: '#', email: '#' }
    }
  ];

  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-gradient-to-r from-[#c9a227]/10 to-transparent rounded-full blur-3xl animate-pulse-glow"></div>
      <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-gradient-to-l from-[#0e3b2c]/15 to-transparent rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block">
            <span className="text-[#c9a227] bg-gradient-to-r from-[#c9a227]/10 to-[#0e3b2c]/10 px-5 py-2.5 rounded-full text-sm border border-[#c9a227]/30 shadow-[0_0_20px_rgba(201,162,39,0.15)]">
              Meet Our Team
            </span>
          </div>
          <h2 className="text-[#efe9d6]">
            Leadership{' '}
            <span className="bg-gradient-to-r from-[#c9a227] to-[#d4b13f] bg-clip-text text-transparent">
              Team
            </span>
          </h2>
          <p className="text-[#efe9d6]/70 text-lg max-w-3xl mx-auto">
            Meet the brilliant minds driving innovation and excellence at RayNova Tech
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div key={index} className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#c9a227]/20 to-[#0e3b2c]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

              <div className="relative bg-[#232323]/60 backdrop-blur-xl border border-[#c9a227]/10 rounded-3xl overflow-hidden hover:border-[#c9a227]/40 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(201,162,39,0.25)]">
                {/* Image */}
                <div className="relative h-72 overflow-hidden">
                  <ImageWithFallback
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#232323] via-transparent to-transparent opacity-60"></div>

                  {/* Social Links - Hover Reveal */}
                  <div className="absolute inset-0 bg-[#0f0f0f]/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-4">
                    <a href={member.social.linkedin} className="w-12 h-12 rounded-xl bg-[#232323] border border-[#c9a227]/30 flex items-center justify-center hover:bg-gradient-to-br hover:from-[#c9a227] hover:to-[#0e3b2c] hover:border-transparent transition-all duration-300">
                      <Linkedin className="w-5 h-5 text-[#efe9d6]" />
                    </a>
                    <a href={member.social.twitter} className="w-12 h-12 rounded-xl bg-[#232323] border border-[#c9a227]/30 flex items-center justify-center hover:bg-gradient-to-br hover:from-[#c9a227] hover:to-[#0e3b2c] hover:border-transparent transition-all duration-300">
                      <Twitter className="w-5 h-5 text-[#efe9d6]" />
                    </a>
                    <a href={member.social.email} className="w-12 h-12 rounded-xl bg-[#232323] border border-[#c9a227]/30 flex items-center justify-center hover:bg-gradient-to-br hover:from-[#c9a227] hover:to-[#0e3b2c] hover:border-transparent transition-all duration-300">
                      <Mail className="w-5 h-5 text-[#efe9d6]" />
                    </a>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <h3 className="text-[#efe9d6] group-hover:text-[#c9a227] transition-colors duration-300">
                    {member.name}
                  </h3>
                  <div className="text-[#c9a227] text-sm">{member.role}</div>
                  <p className="text-[#efe9d6]/70 text-sm">
                    {member.bio}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
