import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { GradientButton } from './GradientButton';
import logo from "../assets/logo-light.svg";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
        ? 'bg-[#0f0f0f]/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(201,162,39,0.1)] border-b border-[#c9a227]/10'
        : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="/">
          <img className="w-60" src={logo} alt="RayNova Tech" />
        </a>

        <nav className="md:flex hidden items-center gap-8">
          <a href="/" className="text-[#efe9d6] hover:text-[#c9a227] transition-all duration-300 relative group">
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#c9a227] to-[#0e3b2c] group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="/about" className="text-[#efe9d6] hover:text-[#c9a227] transition-all duration-300 relative group">
            About
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#c9a227] to-[#0e3b2c] group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="/services" className="text-[#efe9d6] hover:text-[#c9a227] transition-all duration-300 relative group">
            Services
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#c9a227] to-[#0e3b2c] group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="/blog" className="text-[#efe9d6] hover:text-[#c9a227] transition-all duration-300 relative group">
            Blog
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#c9a227] to-[#0e3b2c] group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="/contact" className="text-[#efe9d6] hover:text-[#c9a227] transition-all duration-300 relative group">
            Contact
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#c9a227] to-[#0e3b2c] group-hover:w-full transition-all duration-300"></span>
          </a>
        </nav>

        <div className="md:flex hidden items-center gap-4">
          <a href="/login" className="hidden lg:block text-[#efe9d6] hover:text-[#c9a227] transition-colors">
            Login
          </a>
          <a href="/signup">
            <GradientButton size="sm">Get Started</GradientButton>
          </a>

        </div>
        <button
          className="md:hidden text-[#efe9d6]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden bg-[#0f0f0f]/95 backdrop-blur-xl border-t border-[#c9a227]/10 duration-300 ${isMobileMenuOpen ? "opacity-100" : "opacity-0"}`}>
        <nav className="flex flex-col px-6 py-4 gap-4">
          <a href="/" className="text-[#efe9d6] hover:text-[#c9a227] transition-colors">Home</a>
          <a href="/about" className="text-[#efe9d6] hover:text-[#c9a227] transition-colors">About</a>
          <a href="/services" className="text-[#efe9d6] hover:text-[#c9a227] transition-colors">Services</a>
          <a href="/blog" className="text-[#efe9d6] hover:text-[#c9a227] transition-colors">Blog</a>
          <a href="/contact" className="text-[#efe9d6] hover:text-[#c9a227] transition-colors">Contact</a>
          <a href="/login" className="text-[#efe9d6] hover:text-[#c9a227] transition-colors">
            Login
          </a>
          <a href="/signup" className='w-full '>
            <GradientButton size="sm" className='w-full'>Get Started</GradientButton>
          </a>
        </nav>
      </div>
    </header>
  );
}