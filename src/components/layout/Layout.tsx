import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';

export default function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#050505] text-[#EDEDED] font-sans selection:bg-indigo-500/30 relative flex flex-col overflow-hidden">
      {/* Animated Ambient Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/20 blur-[120px]"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[100px]"
        />
      </div>

      {/* Sub-pixel Glow Effect */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent z-50"></div>

      {/* Top Navigation Bar / Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-[#1F1F1F]/50 sticky top-0 z-50 bg-[#050505]/70 backdrop-blur-xl">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center relative overflow-hidden">
              <motion.div 
                className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
              <div className="w-3 h-3 border-2 border-black rotate-45 relative z-10 transition-transform duration-500 group-hover:scale-110 group-hover:border-white"></div>
            </div>
            <span className="font-semibold tracking-tight text-sm text-[#EDEDED] relative">
              Orbit Dashboard
              <span className="absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </span>
          </Link>
          <nav className="flex gap-6 text-[13px] text-zinc-500 font-medium overflow-x-auto no-scrollbar pb-1 max-w-[50vw]">
            <Link to="/" className={`relative transition-colors hover:text-zinc-200 ${location.pathname === '/' ? 'text-zinc-200' : ''}`}>
              Dashboard
              {location.pathname === '/' && (
                <motion.div layoutId="nav-glow" className="absolute -bottom-[21px] left-0 right-0 h-[2px] bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
              )}
            </Link>
            <Link to="/leads" className={`relative transition-colors hover:text-zinc-200 ${location.pathname === '/leads' ? 'text-zinc-200' : ''}`}>
              Leads
              {location.pathname === '/leads' && (
                <motion.div layoutId="nav-glow" className="absolute -bottom-[21px] left-0 right-0 h-[2px] bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
              )}
            </Link>
            <Link to="/pricing" className={`relative transition-colors hover:text-zinc-200 ${location.pathname === '/pricing' ? 'text-zinc-200' : ''}`}>
              Pricing
              {location.pathname === '/pricing' && (
                <motion.div layoutId="nav-glow" className="absolute -bottom-[21px] left-0 right-0 h-[2px] bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
              )}
            </Link>
            <Link to="/documentation" className={`relative transition-colors hover:text-zinc-200 ${location.pathname === '/documentation' ? 'text-zinc-200' : ''}`}>
              Documentation
              {location.pathname === '/documentation' && (
                <motion.div layoutId="nav-glow" className="absolute -bottom-[21px] left-0 right-0 h-[2px] bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
              )}
            </Link>
            <Link to="/about" className={`relative transition-colors hover:text-zinc-200 ${location.pathname === '/about' ? 'text-zinc-200' : ''}`}>
              About
              {location.pathname === '/about' && (
                <motion.div layoutId="nav-glow" className="absolute -bottom-[21px] left-0 right-0 h-[2px] bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
              )}
            </Link>
            <Link to="/settings" className={`relative transition-colors hover:text-zinc-200 ${location.pathname === '/settings' ? 'text-zinc-200' : ''}`}>
              Settings
              {location.pathname === '/settings' && (
                <motion.div layoutId="nav-glow" className="absolute -bottom-[21px] left-0 right-0 h-[2px] bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
              )}
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4 text-sm text-zinc-500">
          <span className="text-[11px] font-mono text-zinc-600 bg-zinc-900/50 px-2 py-1 rounded border border-zinc-800/50">v2.4.0-stable</span>
          <div className="relative group cursor-pointer">
            <div className="absolute inset-0 bg-indigo-500 rounded-full blur group-hover:blur-md transition-all opacity-50 group-hover:opacity-80"></div>
            <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 border border-white/20 flex items-center justify-center text-xs font-medium text-white overflow-hidden shadow-lg">
              U
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center relative z-10">
        <Outlet />
      </main>
    </div>
  );
}
