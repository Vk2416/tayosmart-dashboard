
// src/components/layout/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { LogOut, Settings, User, Bell } from 'lucide-react';

interface HeaderProps {
    theme: 'dark' | 'light';
    toggleTheme: () => void;
    onLogout: () => void;
    alertCount: number;
    onLogoClick: () => void;
}

const Header: React.FC<HeaderProps> = ({
    theme,
    toggleTheme,
    onLogout,
    alertCount,
    onLogoClick,
}) => {
    return (
        <header className="fixed top-0 left-0 right-0 h-[var(--header-h)] z-50 
            bg-gradient-to-b from-bg2/95 to-bg2/80 backdrop-blur-3xl 
            border-b border-border/60 flex items-center px-6 gap-6 shadow-2xl shadow-black/40">

            {/* ===== PREMIUM LOGO ===== */}
            <div
                onClick={onLogoClick}
                className="flex items-center gap-3 cursor-pointer group pr-8 border-r border-border/30"
            >
                <div className="relative w-10 h-10">
                    <div className="absolute inset-0 bg-gradient-to-br to-blue-600 via-blue-500 to-violet-500 rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-all duration-500" />
                    <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/50 group-hover:shadow-cyan-500/70 transition-all duration-300">
                        <img
                            src="/logo.svg"
                            alt="TayoSmart"
                            className="h-8 w-auto drop-shadow-md"
                        />
                    </div>
                </div>

                <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-black tracking-[-1px] bg-gradient-to-r from-blue-950 to-blue-500 bg-clip-text text-transparent">
                            TayoSmart
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sky-700
                        
                        
                        ">
                            FIRE IOT
                        </span>
                    </div>
                    <span className="text-xs text-cyan-400/80 tracking-wider -mt-1">REAL-TIME INTELLIGENCE</span>
                </div>
            </div>

            {/* ===== SITE STATUS (moved left) ===== */}
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-3 px-5 py-2.5 bg-card/70 border border-emerald-500/30 rounded-3xl">
                    <div className="relative">
                        <div className="w-3 h-3 bg-emerald-500 rounded-full animate-ping absolute" />
                        <div className="w-3 h-3 bg-emerald-500 rounded-full relative" />
                    </div>
                    <div>
                        <strong className="text-sm text-text">Warehouse Block-A</strong>
                        <div className="text-[10px] text-emerald-500">• Live</div>
                    </div>
                </div>
            </div>

            {/* ===== SPACER ===== */}
            <div className="flex-1"></div>

            {/* ===== RIGHT SIDE ===== */}
            <div className="flex items-center gap-4">
                {/* Global Status */}
                <div className="hidden lg:flex items-center gap-2 px-5 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-3xl text-sm font-medium text-emerald-400">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    ALL SYSTEMS NOMINAL
                </div>

                {/* Notifications */}
                <Link
                    to="/alerts"
                    className="relative w-11 h-11 flex items-center justify-center rounded-3xl bg-card border border-border/60 hover:border-red-400/50 group transition-all duration-300 hover:-translate-y-0.5"
                >
                    <Bell size={22} className="text-text2 group-hover:text-red-400 transition-colors" />
                    {alertCount > 0 && (
                        <div className="absolute -top-1 -right-1">
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white ring-2 ring-bg2 animate-[ping_2s_infinite]">
                                {alertCount > 99 ? '99' : alertCount}
                            </span>
                        </div>
                    )}
                </Link>

                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className="w-11 h-11 rounded-3xl bg-card border border-border/60 hover:border-border hover:bg-card/80 transition-all text-xl active:scale-95"
                >
                    {theme === 'dark' ? '☀️' : '🌙'}
                </button>

                {/* User Dropdown - Eye-catching Avatar */}
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                        <div className="relative cursor-pointer group">
                            <div className="w-10 h-10 rounded-3xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-xl shadow-violet-500/40 ring-2 ring-offset-2 ring-offset-bg2 ring-violet-400/30 group-hover:ring-violet-400/60 transition-all duration-300">
                                AS
                            </div>
                            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full ring-2 ring-bg2" />
                        </div>
                    </DropdownMenu.Trigger>

                    <DropdownMenu.Portal>
                        <DropdownMenu.Content
                            className="w-60 bg-card border border-border rounded-3xl p-2 shadow-2xl shadow-black/60 backdrop-blur-2xl z-[60]"
                            sideOffset={12}
                            align="end"
                        >
                            <DropdownMenu.Label className="px-4 py-3 text-sm font-medium text-text">Akshay Sharma</DropdownMenu.Label>
                            <DropdownMenu.Separator className="h-px bg-border mx-2" />

                            <DropdownMenu.Item className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-accent text-sm cursor-pointer">
                                <User size={18} /> Profile
                            </DropdownMenu.Item>
                            <DropdownMenu.Item className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-accent text-sm cursor-pointer">
                                <Settings size={18} /> Settings &amp; Preferences
                            </DropdownMenu.Item>

                            <DropdownMenu.Separator className="h-px bg-border mx-2" />

                            <DropdownMenu.Item
                                onSelect={onLogout}
                                className="flex items-center gap-3 px-4 py-3 rounded-2xl text-red-400 hover:bg-red-500/10 text-sm cursor-pointer"
                            >
                                <LogOut size={18} /> Logout
                            </DropdownMenu.Item>
                        </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                </DropdownMenu.Root>
            </div>
        </header>
    );
};

export default Header;