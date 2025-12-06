import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, LogOut, LayoutDashboard } from 'lucide-react';
import { GradientButton } from './GradientButton';
import logo from "../assets/logo-light.svg";
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { currentUser, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  const handleAdminDashboard = () => {
    setIsUserMenuOpen(false);
    navigate('/admin/users');
  };

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
          {/* User Menu or Login Button */}
          {isAuthenticated && currentUser ? (
            <div className="relative hidden md:block">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-[#232323]/60 backdrop-blur-xl border border-[#c9a227]/20 rounded-xl hover:border-[#c9a227]/40 transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#c9a227] to-[#0e3b2c] flex items-center justify-center text-[#0f0f0f] text-sm">
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-[#efe9d6]">{currentUser.name}</span>
                <ChevronDown className={`w-4 h-4 text-[#efe9d6] transition-transform duration-300 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 top-full w-64 mt-2 bg-[#232323]/95 backdrop-blur-xl border border-[#c9a227]/20 rounded-xl shadow-[0_20px_60px_rgba(201,162,39,0.25)] overflow-hidden">
                  {currentUser.role === 'Admin' && (
                    <button
                      onClick={handleAdminDashboard}
                      className="w-full flex items-center gap-3 px-4 py-3 text-[#efe9d6] hover:bg-[#c9a227]/10 transition-colors text-left"
                    >
                      <LayoutDashboard className="w-5 h-5 text-[#c9a227]" />
                      Admin Dashboard
                    </button>
                  )}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-[#efe9d6] hover:bg-[#c9a227]/10 transition-colors text-left border-t border-[#c9a227]/10"
                  >
                    <LogOut className="w-5 h-5 text-[#c9a227]" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <a href="/login" className="hidden md:block">
              <GradientButton size="sm">Login</GradientButton>
            </a>
          )}

          <button
            className="md:hidden text-[#efe9d6]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
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
          {isAuthenticated && currentUser ? (
            <>
              <div className="border-t border-[#c9a227]/10 pt-4 mt-2">
                <div className="flex items-center gap-3 mb-4 px-2">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#c9a227] to-[#0e3b2c] flex items-center justify-center text-[#0f0f0f]">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-[#efe9d6]">{currentUser.name}</div>
                    <div className="text-[#efe9d6]/60 text-sm">{currentUser.role}</div>
                  </div>
                </div>
                {currentUser.role === 'Admin' && (
                  <button
                    onClick={handleAdminDashboard}
                    className="w-full text-left text-[#efe9d6] hover:text-[#c9a227] transition-colors py-2"
                  >
                    Admin Dashboard
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-[#efe9d6] hover:text-[#c9a227] transition-colors py-2"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <a href="/login" className="text-[#efe9d6] hover:text-[#c9a227] transition-colors">Login</a>
          )}
        </nav>
      </div>
    </header>
  );
}