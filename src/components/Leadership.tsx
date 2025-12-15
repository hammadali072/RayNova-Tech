import { useEffect, useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Linkedin, Twitter, Mail } from "lucide-react";

export function Leadership() {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    const fetchTeam = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/team');
            const data = await response.json();
            
            // Map data to match component expectation
            const membersArray = data.map((member: any) => ({
                id: member.id,
                name: member.memberName,
                role: member.designation,
                bio: member.bio || "-",
                image: member.photoURL || "https://via.placeholder.com/300",
                social: {
                  linkedin: member.linkedin ?? "#",
                  twitter: member.twitter ?? "#",
                  email: member.email ?? "#",
                },
              }));
              
            setTeam(membersArray);
        } catch (error) {
            console.error("Error fetching team:", error);
        }
    }
    fetchTeam();
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center py-12 sm:py-16 md:py-20 px-4 sm:px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-gradient-to-r from-[#c9a227]/10 to-transparent rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-gradient-to-l from-[#0e3b2c]/15 to-transparent rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "2s" }} />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="text-center mb-16 space-y-4">
          <span className="text-[#c9a227] bg-gradient-to-r from-[#c9a227]/10 to-[#0e3b2c]/10 px-5 py-2.5 rounded-full text-sm border border-[#c9a227]/30 shadow-[0_0_20px_rgba(201,162,39,0.15)]">
            Meet Our Team
          </span>

          <h2 className="text-[#efe9d6]">
            Leadership{" "}
            <span className="bg-gradient-to-r from-[#c9a227] to-[#d4b13f] bg-clip-text text-transparent">
              Team
            </span>
          </h2>

          <p className="text-[#efe9d6]/70 text-sm sm:text-base md:text-lg max-w-3xl mx-auto">
            Meet the brilliant minds driving innovation at RayNova Tech
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {team.map((member) => (
            <div key={member.id} className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#c9a227]/20 to-[#0e3b2c]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />

              <div className="relative bg-[#232323]/60 backdrop-blur-xl border border-[#c9a227]/10 rounded-3xl overflow-hidden hover:border-[#c9a227]/40 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(201,162,39,0.25)]">

                {/* Image */}
                <div className="relative h-72 overflow-hidden">
                  <ImageWithFallback
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#232323] via-transparent to-transparent opacity-60" />

                  {/* Social */}
                  <div className="absolute inset-0 bg-[#0f0f0f]/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-4">
                    <a
                      href={member.social.linkedin}
                      className="w-12 h-12 rounded-xl bg-[#232323] border border-[#c9a227]/30 flex items-center justify-center hover:bg-gradient-to-br hover:from-[#c9a227] hover:to-[#0e3b2c] hover:border-transparent transition-all duration-300"
                    >
                      <Linkedin className="w-5 h-5 text-[#efe9d6]" />
                    </a>
                    <a
                      href={member.social.twitter}
                      className="w-12 h-12 rounded-xl bg-[#232323] border border-[#c9a227]/30 flex items-center justify-center hover:bg-gradient-to-br hover:from-[#c9a227] hover:to-[#0e3b2c] hover:border-transparent transition-all duration-300"
                    >
                      <Twitter className="w-5 h-5 text-[#efe9d6]" />
                    </a>
                    <a
                      href={`mailto:${member.social.email}`}
                      className="w-12 h-12 rounded-xl bg-[#232323] border border-[#c9a227]/30 flex items-center justify-center hover:bg-gradient-to-br hover:from-[#c9a227] hover:to-[#0e3b2c] hover:border-transparent transition-all duration-300"
                    >
                      <Mail className="w-5 h-5 text-[#efe9d6]" />
                    </a>
                  </div>
                </div>

                {/* Text */}
                <div className="p-6 space-y-3">
                  <h3 className="text-[#efe9d6] group-hover:text-[#c9a227] transition-colors duration-300">
                    {member.name}
                  </h3>
                  <div className="text-[#c9a227] text-sm">{member.role}</div>
                  <p className="text-[#efe9d6]/70 text-sm">{member.bio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
