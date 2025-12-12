import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Github } from 'lucide-react';
import logo from "../assets/logo-light.svg";

export function Footer() {
  return (
    <footer id="contact" className="bg-gradient-to-b from-[#232323]/50 to-[#232323] backdrop-blur-xl pt-16 pb-8 px-6 border-t border-[#c9a227]/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-12 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <a href="/" className="inline-block">
              <img className="xl:w-52 md:w-48 w-40 h-auto" src={logo} alt="RayNova Tech" />
            </a>

            <p className="text-[#efe9d6]/70 text-sm leading-relaxed">
              Empowering businesses with AI-driven web solutions and custom chatbot development.
              Transform your digital presence with cutting-edge technology.
            </p>
            <div className="space-y-3">
              <a href="mailto:contact@raynova.tech" className="flex items-center gap-2 text-[#efe9d6]/70 text-sm group">
                <Mail className="w-5 h-5 text-[#c9a227]" />
                <span className="duration-300 group-hover:text-[#c9a227]">contact@raynova.tech</span>
              </a>
              <div className="flex items-center gap-2 text-[#efe9d6]/70 text-sm transition-colors cursor-pointer">
                <Phone className="w-5 h-5 text-[#c9a227]" />
                <div className='flex flex-col gap-1'>
                  <a href="tel:+447848101848" className="duration-300 hover:text-[#c9a227] flex items-center gap-2">
                    +44 7848 101848
                    <span className="bg-[#c9a227]/20 text-[#c9a227] text-xs px-2 py-0.5 rounded ml-1">UK</span>
                  </a>
                  <a href="tel:+41797265555" className="duration-300 hover:text-[#c9a227] flex items-center gap-2">
                    +41 79 726 55 55
                    <span className="bg-[#c9a227]/20 text-[#c9a227] text-xs px-2 py-0.5 rounded ml-1">CH</span>
                  </a>
                  <a href="tel:+16467771766" className="duration-300 hover:text-[#c9a227] flex items-center gap-2">
                    +1 646 777 1766
                    <span className="bg-[#c9a227]/20 text-[#c9a227] text-xs px-2 py-0.5 rounded ml-1">USA</span>
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[#efe9d6]/70 text-sm transition-colors cursor-pointer">
                <MapPin className="w-5 h-5 text-[#c9a227]" />
                <a href="https://www.google.com/maps/place/11-12+Old+Bond+St,+London+W1S+4PN,+UK/@51.5087334,-0.1430446,17z/data=!4m6!3m5!1s0x487604d61bc2ffff:0x241515a3a056e276!8m2!3d51.5087334!4d-0.1404643!16s%2Fg%2F11xt03y17h?entry=ttu&g_ep=EgoyMDI1MTEzMC4wIKXMDSoASAFQAw%3D%3D" target="_blank" className="duration-300 hover:text-[#c9a227]">
                  11-12 Old Bond Street, Mayfair <br /> London W1S 4PN <br /> United Kingdom
                </a>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-[#efe9d6] mb-6 bg-gradient-to-r from-[#efe9d6] to-[#c9a227] bg-clip-text">Quick Links</h4>
            <ul className="md:space-y-3 space-y-1.5">
              <li>
                <a href="/" className="text-[#efe9d6]/70 hover:text-[#c9a227] transition-all duration-300 text-sm inline-flex items-center gap-2 group">
                  <span className="w-0 h-px bg-gradient-to-r from-[#c9a227] to-[#0e3b2c] group-hover:w-4 transition-all duration-300"></span>
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="text-[#efe9d6]/70 hover:text-[#c9a227] transition-all duration-300 text-sm inline-flex items-center gap-2 group">
                  <span className="w-0 h-px bg-gradient-to-r from-[#c9a227] to-[#0e3b2c] group-hover:w-4 transition-all duration-300"></span>
                  About Us
                </a>
              </li>
              <li>
                <a href="/services" className="text-[#efe9d6]/70 hover:text-[#c9a227] transition-all duration-300 text-sm inline-flex items-center gap-2 group">
                  <span className="w-0 h-px bg-gradient-to-r from-[#c9a227] to-[#0e3b2c] group-hover:w-4 transition-all duration-300"></span>
                  Services
                </a>
              </li>
              <li>
                <a href="/blog" className="text-[#efe9d6]/70 hover:text-[#c9a227] transition-all duration-300 text-sm inline-flex items-center gap-2 group">
                  <span className="w-0 h-px bg-gradient-to-r from-[#c9a227] to-[#0e3b2c] group-hover:w-4 transition-all duration-300"></span>
                  Blog
                </a>
              </li>
              <li>
                <a href="/contact" className="text-[#efe9d6]/70 hover:text-[#c9a227] transition-all duration-300 text-sm inline-flex items-center gap-2 group">
                  <span className="w-0 h-px bg-gradient-to-r from-[#c9a227] to-[#0e3b2c] group-hover:w-4 transition-all duration-300"></span>
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-[#efe9d6] mb-6 bg-gradient-to-r from-[#efe9d6] to-[#c9a227] bg-clip-text">Legal</h4>
            <ul className="md:space-y-3 space-y-1.5">
              <li>
                <a href="/privacy" className="text-[#efe9d6]/70 hover:text-[#c9a227] transition-all duration-300 text-sm inline-flex items-center gap-2 group">
                  <span className="w-0 h-px bg-gradient-to-r from-[#c9a227] to-[#0e3b2c] group-hover:w-4 transition-all duration-300"></span>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/cookie-policy" className="text-[#efe9d6]/70 hover:text-[#c9a227] transition-all duration-300 text-sm inline-flex items-center gap-2 group">
                  <span className="w-0 h-px bg-gradient-to-r from-[#c9a227] to-[#0e3b2c] group-hover:w-4 transition-all duration-300"></span>
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="/legal-notice" className="text-[#efe9d6]/70 hover:text-[#c9a227] transition-all duration-300 text-sm inline-flex items-center gap-2 group">
                  <span className="w-0 h-px bg-gradient-to-r from-[#c9a227] to-[#0e3b2c] group-hover:w-4 transition-all duration-300"></span>
                  Legal Notice
                </a>
              </li>
              <li>
                <a href="/terms" className="text-[#efe9d6]/70 hover:text-[#c9a227] transition-all duration-300 text-sm inline-flex items-center gap-2 group">
                  <span className="w-0 h-px bg-gradient-to-r from-[#c9a227] to-[#0e3b2c] group-hover:w-4 transition-all duration-300"></span>
                  Terms &amp; Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-[#efe9d6] mb-6 bg-gradient-to-r from-[#efe9d6] to-[#c9a227] bg-clip-text">Connect With Us</h4>
            <p className="text-[#efe9d6]/70 text-sm mb-6 leading-relaxed">
              Follow us on social media for the latest updates and insights
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-11 h-11 bg-[#0f0f0f]/60 backdrop-blur-xl rounded-xl flex items-center justify-center border border-[#c9a227]/20 hover:bg-gradient-to-br hover:from-[#c9a227] hover:to-[#0e3b2c] hover:border-transparent transition-all duration-300 group hover:scale-110 hover:shadow-[0_0_20px_rgba(201,162,39,0.4)]"
              >
                <Facebook className="w-5 h-5 text-[#efe9d6] group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="#"
                className="w-11 h-11 bg-[#0f0f0f]/60 backdrop-blur-xl rounded-xl flex items-center justify-center border border-[#c9a227]/20 hover:bg-gradient-to-br hover:from-[#c9a227] hover:to-[#0e3b2c] hover:border-transparent transition-all duration-300 group hover:scale-110 hover:shadow-[0_0_20px_rgba(201,162,39,0.4)]"
              >
                <Twitter className="w-5 h-5 text-[#efe9d6] group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="#"
                className="w-11 h-11 bg-[#0f0f0f]/60 backdrop-blur-xl rounded-xl flex items-center justify-center border border-[#c9a227]/20 hover:bg-gradient-to-br hover:from-[#c9a227] hover:to-[#0e3b2c] hover:border-transparent transition-all duration-300 group hover:scale-110 hover:shadow-[0_0_20px_rgba(201,162,39,0.4)]"
              >
                <Linkedin className="w-5 h-5 text-[#efe9d6] group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="#"
                className="w-11 h-11 bg-[#0f0f0f]/60 backdrop-blur-xl rounded-xl flex items-center justify-center border border-[#c9a227]/20 hover:bg-gradient-to-br hover:from-[#c9a227] hover:to-[#0e3b2c] hover:border-transparent transition-all duration-300 group hover:scale-110 hover:shadow-[0_0_20px_rgba(201,162,39,0.4)]"
              >
                <Github className="w-5 h-5 text-[#efe9d6] group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#efe9d6]/10 pt-8">
          <p className="text-center text-[#efe9d6]/60 text-sm">
            © {new Date().getFullYear()} RayNova Tech. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}