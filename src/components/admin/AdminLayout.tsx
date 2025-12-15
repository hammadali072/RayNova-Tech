import React, { useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Users, PenTool, Briefcase, UserPlus, Menu, X, LogOut, Home, Mail, ClipboardList } from 'lucide-react';
import logo from "../../assets/logo-light.svg";

interface AdminLayoutProps {
  children: ReactNode;
  activePage: 'users' | 'blog' | 'services' | 'team' | 'messages' | 'orders';
}

export function AdminLayout({ children, activePage }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navigation = [
    { id: 'users', label: 'Users', icon: Users, href: '/admin/users' },
    { id: 'blog', label: 'Add Blog', icon: PenTool, href: '/admin/add-blog' },
    { id: 'services', label: 'Add Services', icon: Briefcase, href: '/admin/add-service' },
    { id: 'team', label: 'Add Team Members', icon: UserPlus, href: '/admin/add-team' },
    { id: 'messages', label: 'Messages', icon: Mail, href: '/admin/messages' },
    { id: 'orders', label: 'Services Order', icon: ClipboardList, href: '/admin/service-orders' }
  ];

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex flex-col">
      {/* Top Bar - Responsive to 300px */}
      <header className="fixed top-0 left-0 right-0 w-full h-14 sm:h-16 md:h-20 p-2 sm:p-3 md:p-4 bg-[#232323]/80 backdrop-blur-xl border-b border-[#c9a227]/10 z-50 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 min-w-0 flex-1">
          {/* Sidebar Toggle (always visible) */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-[#efe9d6] hover:text-[#c9a227] transition-colors flex-shrink-0"
            aria-label={isSidebarOpen ? "Hide sidebar" : "Show sidebar"}
          >
            {isSidebarOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />}
          </button>
          <a href="/" className="flex items-center gap-1.5 sm:gap-2 md:gap-3 min-w-0 flex-1">
            <img className="w-24 sm:w-32 md:w-40 h-auto flex-shrink-0" src={logo} alt="RayNova Tech" />
            <span className="text-[#efe9d6]/60 text-[10px] sm:text-xs hidden sm:block truncate">Admin Dashboard</span>
          </a>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-shrink-0">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-1 sm:gap-2 text-[#efe9d6]/70 hover:text-[#c9a227] transition-colors text-xs sm:text-sm"
          >
            <LogOut className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Layout container */}
      <div className="flex flex-1 pt-14 sm:pt-16 md:pt-20">
        {/* Sidebar - Responsive to 300px */}
        <aside
          className={`
            bg-[#232323]/60 backdrop-blur-xl border-r border-[#c9a227]/10 z-40
            fixed top-14 sm:top-16 md:top-20 left-0 h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] transition-transform duration-300
            w-56 sm:w-64
            transform
            -translate-x-full
            lg:translate-x-0
            lg:sticky
            lg:w-64
            ${isSidebarOpen ? 'translate-x-0' : ''}
          `}
        >
          <nav className="p-2 sm:p-3 md:p-4 space-y-1 sm:space-y-2 overflow-y-auto h-full">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  className={`flex items-center gap-2 sm:gap-3 px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl transition-all duration-300 text-xs sm:text-sm ${isActive
                    ? 'bg-gradient-to-r from-[#c9a227]/20 to-[#0e3b2c]/20 text-[#c9a227] border border-[#c9a227]/30'
                    : 'text-[#efe9d6]/70 hover:bg-[#c9a227]/10 hover:text-[#c9a227]'
                    }`}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="truncate">{item.label}</span>
                </a>
              );
            })}
          </nav>
        </aside>

        {/* Main Content - Responsive to 300px */}
        <main
          className={`
            flex-1 transition-all duration-300 bg-transparent p-3 sm:p-4 md:p-6 lg:p-8 w-full min-w-0
            ${isSidebarOpen ? 'lg:ml-0' : 'lg:ml-0'}
          `}
          style={{
            transition: 'margin-left 0.3s cubic-bezier(0.4,0,0.2,1)'
          }}
        >
          {children}
        </main>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed w-full h-full inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}
