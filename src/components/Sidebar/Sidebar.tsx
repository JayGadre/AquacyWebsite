"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  List,
  Info,
  Mail,
  Menu,
  X,
  Droplets,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function Sidebar() {
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  const toggleMobile = () => setIsOpenMobile(!isOpenMobile);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpenMobile) {
        setIsOpenMobile(false);
      }
    };
    if (isOpenMobile) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpenMobile]);

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Catalog", path: "/catalog", icon: List },
    { name: "About Us", path: "/about-us", icon: Info },
    { name: "Contact Us", path: "/contact", icon: Mail },
  ];

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        onClick={toggleMobile}
        className="md:hidden fixed top-4 left-4 z-50 p-2.5 rounded-xl btn-glass text-foreground hover:text-primary transition-all duration-200 border border-primary/20 shadow-lg"
        aria-label="Toggle Navigation"
        aria-expanded={isOpenMobile}
        aria-controls="mobile-navigation"
      >
        {isOpenMobile ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isOpenMobile && (
        <div
          className="md:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
          onClick={toggleMobile}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        aria-label="Sidebar"
        className={`fixed md:sticky top-0 md:top-4 left-0 md:left-4 h-screen md:h-[calc(100vh-32px)] glass-card hover:translate-y-0 rounded-r-2xl md:rounded-2xl flex flex-col transition-all duration-300 ease-in-out z-40 border-r border-[var(--glass-border)] shadow-[5px_0_30px_rgba(0,0,0,0.15)]
          ${isCollapsed ? "md:w-20" : "md:w-64"}
          w-64 ${isOpenMobile ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Toggle Collapse/Expand Button (Desktop) */}
        <button
          onClick={toggleCollapse}
          className="hidden md:flex absolute -right-3.5 top-6 z-50 w-7 h-7 rounded-full bg-background border border-[var(--glass-border)] items-center justify-center text-foreground hover:text-white hover:bg-primary transition-all shadow-md"
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>

        {/* Brand Logo Header */}
        <div className={`flex items-center p-4 md:p-6 border-b border-[var(--glass-border)] h-[84px] relative overflow-hidden ${isCollapsed ? "justify-center" : "gap-3"}`}>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary/10 to-transparent opacity-60 pointer-events-none" />
          <div className="w-10 h-10 shrink-0 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/40 flex items-center justify-center shadow-[0_0_15px_var(--glass-glow)]">
            <Droplets className="text-primary" size={22} />
          </div>
          {!isCollapsed && (
            <div className="transition-opacity duration-200">
              <span className="text-xl font-extrabold tracking-tight text-gradient">Aquacy</span>
              <span className="block text-[10px] uppercase font-bold text-secondary tracking-wider -mt-1">India</span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav id="mobile-navigation" aria-label="Main Navigation" className="flex-1 py-6 px-3 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;

            return (
              <Link
                key={item.name}
                href={item.path}
                onClick={() => setIsOpenMobile(false)}
                title={isCollapsed ? item.name : undefined}
                className={`flex items-center justify-between py-3 rounded-xl transition-all duration-200 group relative overflow-hidden
                  ${isCollapsed ? "px-0 justify-center" : "px-4"}
                  ${isActive 
                    ? "bg-gradient-to-r from-primary/20 to-primary/5 text-primary border border-primary/30 shadow-[0_0_15px_var(--glass-glow)] font-bold" 
                    : "text-foreground/80 hover:text-primary hover:bg-primary/10 border border-transparent"
                  }`}
              >
                {isActive && !isCollapsed && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-primary rounded-r-full shadow-[0_0_10px_var(--primary)]" />
                )}
                <div className={`flex items-center ${isCollapsed ? "justify-center" : "gap-3"}`}>
                  <Icon size={20} className={isActive ? "text-primary" : "text-foreground/60 group-hover:text-primary transition-colors"} />
                  {!isCollapsed && <span className="text-sm font-medium tracking-wide">{item.name}</span>}
                </div>
                {isActive && !isCollapsed && <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]" />}
              </Link>
            );
          })}
        </nav>

        {/* Theme Switcher Button */}
        <div className="px-3 py-2 border-t border-[var(--glass-border)]">
          <button
            onClick={toggleTheme}
            title={`Switch to ${theme === "light" ? "Dark" : "Light"} Mode`}
            className={`w-full flex items-center justify-between py-2.5 px-3 rounded-xl border border-[var(--glass-border)] transition-all hover:border-primary/40 ${
              isCollapsed ? "justify-center px-0" : ""
            }`}
          >
            <div className="flex items-center gap-2.5">
              {theme === "light" ? (
                <Sun size={18} className="text-amber-500 shrink-0" />
              ) : (
                <Moon size={18} className="text-sky-400 shrink-0" />
              )}
              {!isCollapsed && (
                <span className="text-xs font-semibold capitalize text-foreground/80">
                  {theme} Mode
                </span>
              )}
            </div>
            {!isCollapsed && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold uppercase">
                Toggle
              </span>
            )}
          </button>
        </div>

        {/* Sidebar Footer CTA */}
        <div className={`p-4 md:p-5 border-t border-[var(--glass-border)] bg-background/50 ${isCollapsed ? "flex flex-col items-center" : ""}`}>
          {!isCollapsed ? (
            <>
              <div className="glass-pill p-3 rounded-xl mb-3 text-center">
                <p className="text-xs text-foreground font-semibold mb-0.5">ADM Partner</p>
                <p className="text-[10px] text-foreground/70">Authorised Channel Partner Pune</p>
              </div>
              <Link
                href="/contact"
                onClick={() => setIsOpenMobile(false)}
                className="btn btn-primary w-full flex items-center justify-center text-sm font-semibold shadow-lg group"
              >
                <span>Get a Quote</span>
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </>
          ) : (
            <Link
              href="/contact"
              onClick={() => setIsOpenMobile(false)}
              title="Get a Quote"
              className="w-10 h-10 rounded-xl btn-primary flex items-center justify-center shadow-lg group"
            >
              <ArrowUpRight size={18} />
            </Link>
          )}
        </div>
      </aside>
    </>
  );
}
