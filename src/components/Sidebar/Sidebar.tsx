"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, List, Info, Mail, Menu, X, Droplets, ArrowUpRight } from 'lucide-react';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Catalog', path: '/catalog', icon: List },
    { name: 'About Us', path: '/about-us', icon: Info },
    { name: 'Contact Us', path: '/contact', icon: Mail },
  ];

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 p-2.5 rounded-xl btn-glass text-white hover:text-primary transition-all duration-200 border border-white/10 shadow-lg"
        aria-label="Toggle Navigation"
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        aria-label="Sidebar"
        className={`fixed md:sticky top-0 md:top-4 left-0 md:left-4 h-screen md:h-[calc(100vh-32px)] w-64 glass-card hover:translate-y-0 rounded-r-2xl md:rounded-2xl flex flex-col transition-all duration-300 ease-in-out z-40 border-r border-[var(--glass-border)] shadow-[5px_0_30px_rgba(0,0,0,0.5)]
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        {/* Brand Logo Header */}
        <div className="flex items-center gap-3 p-6 border-b border-[var(--glass-border)] h-[84px] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary/10 to-transparent opacity-60 pointer-events-none" />
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/30 to-primary-hover/10 border border-primary/40 flex items-center justify-center shadow-[0_0_15px_var(--glass-glow)]">
            <Droplets className="text-primary-hover" size={22} />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-gradient-cyan">Aquacy</span>
            <span className="block text-[10px] uppercase font-semibold text-primary tracking-wider -mt-1">India</span>
          </div>
        </div>

        {/* Navigation */}
        <nav id="mobile-navigation" aria-label="Main Navigation" className="flex-1 py-8 px-4 space-y-2.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            
            return (
              <Link
                key={item.name}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden
                  ${isActive 
                    ? 'bg-gradient-to-r from-primary/20 to-primary/5 text-white border border-primary/40 shadow-[0_0_20px_var(--glass-glow)] font-semibold' 
                    : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-primary rounded-r-full shadow-[0_0_10px_var(--primary)]" />
                )}
                <div className="flex items-center gap-3">
                  <Icon size={20} className={isActive ? 'text-primary-hover' : 'text-slate-400 group-hover:text-slate-200 transition-colors'} />
                  <span className="text-sm font-medium tracking-wide">{item.name}</span>
                </div>
                {isActive && <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]" />}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer CTA */}
        <div className="p-6 border-t border-[var(--glass-border)] bg-slate-950/40">
          <div className="glass-pill p-4 rounded-xl mb-4 text-center">
            <p className="text-xs text-slate-300 font-semibold mb-1">ADM Partner</p>
            <p className="text-[11px] text-slate-400">Authorised Channel Partner Pune</p>
          </div>
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="btn btn-primary w-full flex items-center justify-center text-sm font-semibold shadow-lg group"
          >
            <span>Get a Quote</span>
            <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </aside>
    </>
  );
}

