import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, LogOut, LayoutDashboard } from 'lucide-react';
import { GradientButton } from './GradientButton';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from "../assets/logo-light.svg";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileUserMenuOpen, setIsMobileUserMenuOpen] = useState(false); // NEW STATE
  // Remove showDesktopMenu state, use Tailwind breakpoints instead
  const { currentUser, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const menuLinks = [
    { text: "Home", path: "/" },
    { text: "About", path: "/about" },
    { text: "Services", path: "/services" },
    { text: "Blog", path: "/blog" },
    { text: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // No custom resize logic needed; Tailwind handles breakpoints

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
      className={`fixed top-0 left-0 right-0 w-full h-fit z-50 transition-all duration-500 ${isScrolled
        ? 'bg-[#181818] shadow-[0_8px_32px_rgba(201,162,39,0.08)] border-b border-[#c9a227]/10'
        : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between backdrop-blur-xl bg-transparent">
        <a href="/">
          <img className="w-60" src={logo} alt="RayNova Tech" />
        </a>

        {/* Desktop Nav: show on lg+ only */}
        <nav className='lg:block hidden'>
          <div className="items-center gap-8 flex">
            {menuLinks.map(link => {
              const isActive = location.pathname === link.path;
              return (
                <a
                  key={link.path}
                  href={link.path}
                  className={`relative ${isActive ? 'text-[#c9a227]' : 'text-[#efe9d6] hover:text-[#c9a227]'} transition-colors group`}
                >
                  {link.text}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#c9a227] to-[#0e3b2c] transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}
                  ></span>
                </a>
              );
            })}
          </div>
        </nav>

        {/* User/Login: show on lg+ only */}
        <div className='lg:block hidden'>
          <div className="items-center gap-4 flex">
            {isAuthenticated && currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#232323]/80 border border-[#c9a227]/20 rounded-xl hover:border-[#c9a227]/40 transition-all duration-300"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#c9a227] to-[#0e3b2c] flex items-center justify-center text-[#0f0f0f] text-sm">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-[#efe9d6]">{currentUser.name}</span>
                  <ChevronDown className={`w-4 h-4 text-[#efe9d6] transition-transform duration-300 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 top-full w-64 mt-2 bg-[#232323]/95 border border-[#c9a227]/20 rounded-xl shadow-[0_20px_60px_rgba(201,162,39,0.18)] overflow-hidden">
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
              <a href="/login">
                <GradientButton size="sm">Login</GradientButton>
              </a>
            )}
          </div>
        </div>

        {/* Mobile menu icon: show below lg only */}
        <button
          className="flex lg:hidden text-[#efe9d6]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu: show below lg only, when open */}
      <div className={`bg-[#181818]/95 backdrop-blur-xl bg-transparent border-t border-[#c9a227]/10 duration-300 ${isMobileMenuOpen ? "block" : "hidden"}`}>
        <nav className="flex flex-col px-6 py-4 gap-4">
          {menuLinks.map(link => {
            const isActive = location.pathname === link.path;
            return (
              <a
                key={link.path}
                href={link.path}
                className={`relative inline-block w-fit ${isActive ? '!text-[#c9a227]' : 'text-[#efe9d6] hover:text-[#c9a227]'} transition-colors`}
                style={{
                  width: 'fit-content'
                }}
              >
                {link.text}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#c9a227] to-[#0e3b2c] transition-all duration-300 ${isActive ? 'w-full' : 'w-0'}`}
                ></span>
              </a>
            );
          })}
          {isAuthenticated && currentUser ? (
            <>
              <div className="border-t border-[#c9a227]/10 pt-4 mt-2">
                <button
                  className="flex items-center gap-3 mb-4 px-2 w-full text-left"
                  onClick={() => setIsMobileUserMenuOpen(!isMobileUserMenuOpen)}
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#c9a227] to-[#0e3b2c] flex items-center justify-center text-[#0f0f0f]">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="text-[#efe9d6]">{currentUser.name}</div>
                    <div className="text-[#efe9d6]/60 text-sm">{currentUser.role}</div>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-[#efe9d6] transition-transform duration-300 ${isMobileUserMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                {/* Dropdown for mobile user menu */}
                {isMobileUserMenuOpen && (
                  <div className="bg-[#232323]/95 rounded-xl shadow-lg mt-2 overflow-hidden">
                    {currentUser.role === 'Admin' && (
                      <button
                        onClick={() => {
                          setIsMobileUserMenuOpen(false);
                          handleAdminDashboard();
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full text-left flex items-center gap-3 px-4 py-3 text-[#efe9d6] hover:bg-[#c9a227]/10 transition-colors"
                      >
                        <LayoutDashboard className="w-5 h-5 text-[#c9a227]" />
                        Admin Dashboard
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setIsMobileUserMenuOpen(false);
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full text-left flex items-center gap-3 px-4 py-3 text-[#efe9d6] hover:bg-[#c9a227]/10 transition-colors border-t border-[#c9a227]/10"
                    >
                      <LogOut className="w-5 h-5 text-[#c9a227]" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <a href="/login" className="text-[#efe9d6] hover:text-[#c9a227] transition-colors">Login</a>
          )}
        </nav>
      </div>
    </header>
  )
};