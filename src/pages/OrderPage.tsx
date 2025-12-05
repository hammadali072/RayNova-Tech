import React, { ReactNode, useState, useEffect } from 'react';
import { Users, PenTool, Briefcase, UserPlus, Menu, X, LogOut, Home } from 'lucide-react';
import logo from "../../assets/logo-light.svg";
import { useLocation } from 'react-router-dom';

interface AdminLayoutProps {
    children: ReactNode;
    activePage: 'users' | 'blog' | 'services' | 'team';
}

export function AdminLayout({ children, activePage }: AdminLayoutProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const navigation = [
        { id: 'users', label: 'Users', icon: Users, href: '/admin/users' },
        { id: 'blog', label: 'Add Blog', icon: PenTool, href: '/admin/add-blog' },
        { id: 'services', label: 'Add Services', icon: Briefcase, href: '/admin/add-service' },
        { id: 'team', label: 'Add Team Members', icon: UserPlus, href: '/admin/add-team' }
    ];

    return (
        <div className="min-h-screen bg-[#0f0f0f] flex flex-col">
            {/* Top Bar */}
            <header className="fixed top-0 left-0 right-0 h-20 p-4 bg-[#232323]/80 backdrop-blur-xl border-b border-[#c9a227]/10 z-50 flex items-center justify-between">
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
                    <a
                        href="/"
                        className="flex items-center gap-2 text-[#efe9d6]/70 hover:text-[#c9a227] transition-colors text-sm"
                    >
                        <Home className="w-4 h-4" />
                        <span className="hidden md:inline">View Website</span>
                    </a>
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
                    className={`fixed top-20 left-0 bottom-0 w-64 bg-[#232323]/60 backdrop-blur-xl border-r border-[#c9a227]/10 transition-transform duration-300 z-40
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            lg:static lg:translate-x-0
            ${!isSidebarOpen ? 'lg:translate-x-full' : ''}
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
                    className={`flex-1 transition-all duration-300 bg-transparent p-6 md:p-8
            ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-0'}
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

const services = [
    "Text Chatbots",
    "Voice Chatbots",
    "AI Consulting",
    "Custom Software Development",
];

export function OrderPage() {
    const location = useLocation();
    const [selectedService, setSelectedService] = useState("");

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const service = params.get("service");
        if (service && services.includes(service)) {
            setSelectedService(service);
        }
    }, [location.search]);

    return (
        <form>
            <label htmlFor="service" className="block mb-2 text-sm font-medium text-[#efe9d6]">
                Select Services
            </label>
            <select
                id="service"
                name="service"
                value={selectedService}
                onChange={e => setSelectedService(e.target.value)}
                className="block w-full px-4 py-2 rounded-lg bg-[#232323] text-[#efe9d6] border border-[#c9a227]/30 focus:outline-none focus:ring-2 focus:ring-[#c9a227] appearance-none"
                style={{
                    fontSize: '1rem',
                    fontWeight: 500,
                    backgroundColor: '#232323',
                    color: '#efe9d6',
                }}
            >
                <option value="" disabled className="text-[#efe9d6]/60">Select a service</option>
                {services.map(service => (
                    <option key={service} value={service} className="bg-[#232323] text-[#efe9d6]">
                        {service}
                    </option>
                ))}
            </select>
        </form>
    );
}