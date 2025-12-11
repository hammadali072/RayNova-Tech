import React, { ReactNode, useState } from 'react';
import { Users, PenTool, Briefcase, UserPlus, Menu, X, LogOut, Home, Mail, ClipboardList } from 'lucide-react';
import logo from "../../assets/logo-light.svg";

interface AdminLayoutProps {
  children: ReactNode;
  activePage: 'users' | 'blog' | 'services' | 'team' | 'messages' | 'orders';
}

export function AdminLayout({ children, activePage }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
      {/* Top Bar */}
      <header className="fixed top-0 left-0 right-0 w-full h-20 p-4 bg-[#232323]/80 backdrop-blur-xl border-b border-[#c9a227]/10 z-50 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Sidebar Toggle (always visible) */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-[#efe9d6] hover:text-[#c9a227] transition-colors"
            aria-label={isSidebarOpen ? "Hide sidebar" : "Show sidebar"}
          >
            {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <a href="/" className="flex items-center gap-3">
            <img className="w-40" src={logo} alt="RayNova Tech" />
            <span className="text-[#efe9d6]/60 text-xs hidden md:block">Admin Dashboard</span>
          </a>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 text-[#efe9d6]/70 hover:text-[#c9a227] transition-colors text-sm">
            <LogOut className="w-4 h-4" />
            <span className="hidden md:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Layout container */}
      <div className="flex flex-1 pt-20">
        {/* Sidebar */}
        <aside
          className={`
            bg-[#232323]/60 backdrop-blur-xl border-r border-[#c9a227]/10 z-40
            fixed top-20 left-0 h-full transition-transform duration-300
            w-64
            transform
            -translate-x-full
            lg:translate-x-0
            lg:static
            lg:min-w-[1024px]
            ${isSidebarOpen ? 'translate-x-0' : ''}
          `}
        >
          <nav className="p-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${isActive
                    ? 'bg-gradient-to-r from-[#c9a227]/20 to-[#0e3b2c]/20 text-[#c9a227] border border-[#c9a227]/30'
                    : 'text-[#efe9d6]/70 hover:bg-[#c9a227]/10 hover:text-[#c9a227]'
                    }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main
          className={`
            flex-1 transition-all duration-300 bg-transparent p-6 md:p-8
            ${isSidebarOpen ? 'lg:ml-[1024px]' : 'lg:ml-0'}
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
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}
