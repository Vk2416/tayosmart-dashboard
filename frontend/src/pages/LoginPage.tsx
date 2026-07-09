import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

import heartBg from '@/assets/s.jpg';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [username, setUsername] = useState('admin@tayosmart.com');
    const [password, setPassword] = useState('password');

    const containerRef = useRef<HTMLDivElement>(null);
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);

    // 3D tilt (applied to the background layer)
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;
            const rotX = (mouseY / rect.height) * -12;
            const rotY = (mouseX / rect.width) * 12;
            setRotateX(rotX);
            setRotateY(rotY);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        login();
        navigate('/dashboard');
    };

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black overflow-hidden perspective-[1200px]"
        >
            {/* Background with 3D tilt – uses your fire heart image */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-out"
                style={{
                    backgroundImage: `url(${heartBg})`,
                    transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.1)`,
                    filter: 'brightness(0.7) contrast(1.2) saturate(1.3)',
                    animation: 'firePulse 4s ease-in-out infinite',
                }}
            />

            {/* Dark overlay for readability */}
            <div className="absolute inset-0 bg-black/70" />

            {/* Subtle grid (optional) */}
            <div className="absolute inset-0 bg-[linear-gradient(var(--border2)_1px,transparent_1px),linear-gradient(90deg,var(--border2)_1px,transparent_1px)] bg-[size:40px_40px] opacity-10" />

            {/* Main card – split into two panels */}
            <div className="relative z-10 w-[880px] max-w-[95%] h-[540px] max-h-[90vh] bg-zinc-950/80 backdrop-blur-xl rounded-3xl border border-orange-500/20 shadow-2xl shadow-orange-600/20 overflow-hidden flex">

                {/* LEFT PANEL – Welcome + Heart Image */}
                <div className="w-2/5 bg-gradient-to-br from-orange-600/30 via-red-600/20 to-rose-600/10 p-10 flex flex-col justify-between relative">
                    {/* Inner glow */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,100,0,0.15),transparent)]" />

                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center shadow-lg">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 2C8 6 6 9 6 13c0 3.3 2.7 6 6 6s6-2.7 6-6c0-4-2-7-6-11z" fill="white" opacity=".9" />
                                    <path d="M12 8c-1.5 2-2 3.5-2 5 0 1.1.9 2 2 2s2-.9 2-2c0-1.5-.5-3-2-5z" fill="rgba(0,0,0,.4)" />
                                </svg>
                            </div>
                            <span className="text-white font-bold text-lg">TayoSmart</span>
                        </div>

                        <h1 className="text-4xl font-extrabold text-white leading-tight">
                            Welcome<span className="text-orange-400">!</span>
                        </h1>
                        <p className="text-zinc-300 text-sm mt-3 leading-relaxed">
                            IoT is the heart of fire safety. Manage your entire fire protection system from one central dashboard.
                        </p>
                        <button className="mt-4 px-5 py-2 bg-orange-500/20 hover:bg-orange-500/30 border border-orange-400/30 rounded-lg text-orange-300 text-sm font-medium transition-colors">
                            Learn More →
                        </button>
                    </div>

                    <div className="text-xs text-zinc-500">
                        <span className="block">© 2026 TayoSmart. All rights reserved.</span>
                    </div>
                </div>

                {/* RIGHT PANEL – Sign In Form */}
                <div className="w-3/5 p-10 flex flex-col justify-center">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-white">Sign in</h2>
                        <p className="text-zinc-400 text-sm mt-1">Access your monitoring dashboard</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-xs font-semibold text-orange-400 uppercase tracking-[0.5px] mb-1.5">
                                User Name
                            </label>
                            <input
                                type="text"
                                className="w-full bg-zinc-900/80 border border-zinc-700 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:border-orange-500 focus:shadow-[0_0_0_3px_rgba(249,115,22,0.15)] transition-all"
                                placeholder="client@tayosmart.com"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="mb-5">
                            <label className="block text-xs font-semibold text-orange-400 uppercase tracking-[0.5px] mb-1.5">
                                Password
                            </label>
                            <input
                                type="password"
                                className="w-full bg-zinc-900/80 border border-zinc-700 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:border-orange-500 focus:shadow-[0_0_0_3px_rgba(249,115,22,0.15)] transition-all"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2.5 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg font-bold text-sm text-white shadow-lg hover:shadow-orange-500/30 transition-all hover:-translate-y-px"
                        >
                            Submit
                        </button>
                    </form>

                    {/* Social Icons (like in reference) */}
                    <div className="flex justify-center gap-3 mt-6">
                        <button className="w-9 h-9 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                        </button>
                        <button className="w-9 h-9 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.104c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0021.49-3.097 13.8 13.8 0 001.446-5.524c0-.18-.012-.36-.036-.54A9.76 9.76 0 0024 4.57z"/></svg>
                        </button>
                        <button className="w-9 h-9 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                        </button>
                    </div>

                    {/* Demo hint */}
                    <div className="text-center mt-4 text-xs text-zinc-500">
                        Demo credentials pre-filled.{' '}
                        <span className="text-orange-400 cursor-pointer hover:underline" onClick={() => login()}>
                            Click to enter →
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;