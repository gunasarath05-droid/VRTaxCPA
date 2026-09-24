"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FiExternalLink,
  FiLogOut,
  FiMenu,
  FiX,
  FiSearch,
  FiBell,
  FiSun,
  FiChevronDown,
} from "react-icons/fi";

interface AdminHeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  handleLogout: () => void;
  unreadCount?: number;
  activeTabTitle?: string;
  setActiveTab?: (tab: string) => void;
}

export default function AdminHeader({
  sidebarOpen,
  setSidebarOpen,
  handleLogout,
  unreadCount = 0,
  activeTabTitle = "Dashboard",
  setActiveTab,
}: AdminHeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="h-16 sm:h-20 shrink-0 bg-white border-b border-slate-100 px-3 sm:px-6 lg:px-8 flex items-center justify-between z-30 transition-all">
      {/* Left: Mobile Toggle & Page Title with Search */}
      <div className="flex items-center gap-2.5 sm:gap-6 min-w-0 flex-1 sm:flex-initial mr-2 sm:mr-0">
        {/* Mobile hamburger menu */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle navigation menu"
          className="lg:hidden p-2 rounded-xl bg-slate-100 border border-slate-200 shadow-2xs hover:bg-slate-200 text-[#0B1F3B] cursor-pointer transition-colors shrink-0"
        >
          {sidebarOpen ? <FiX size={18} /> : <FiMenu size={18} />}
        </button>

        <div className="flex items-center gap-4 min-w-0">
          <h1 className="text-base sm:text-2xl font-bold text-slate-900 font-figtree tracking-tight truncate max-w-[160px] xs:max-w-[220px] sm:max-w-none">
            {activeTabTitle}
          </h1>
        </div>
      </div>

      {/* Right Header Actions (Icons + Profile + Controls) */}
      <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
        {/* Notifications Bell */}
        {setActiveTab && (
          <button
            onClick={() => setActiveTab("inquiries")}
            title={`${unreadCount} unread inquiries`}
            className="w-9 h-9 rounded-full hover:bg-slate-100 text-slate-600 hover:text-slate-900 flex items-center justify-center relative transition-colors cursor-pointer"
          >
            <FiBell size={18} />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white animate-pulse" />
            )}
          </button>
        )}

        {/* Sun / Theme icon (from image) */}
        <button
          type="button"
          title="Toggle Theme"
          className="w-9 h-9 rounded-full hover:bg-slate-100 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer"
        >
          <FiSun size={18} />
        </button>

        {/* User Profile (Matching Image: Dark Circle VR + Vetha Ram + Chevron) */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-100">
          <div
            title="Vetha Ram, CPA"
            className="w-8 h-8 rounded-full bg-[#0B1F3B] text-white font-extrabold flex items-center justify-center text-xs shadow-xs font-figtree select-none cursor-default"
          >
            VR
          </div>
          <span className="hidden sm:inline text-xs font-bold text-slate-800 font-figtree">
            Vetha Ram
          </span>
          <FiChevronDown size={14} className="text-slate-400 hidden sm:inline" />
        </div>

        {/* Public Site Link */}
        <Link
          href="/"
          target="_blank"
          className="hidden md:inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all font-figtree ml-1"
        >
          <FiExternalLink size={12} />
          <span>Live Site</span>
        </Link>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition-all font-figtree cursor-pointer ml-1 shadow-2xs"
          title="Sign out of Admin Portal"
        >
          <FiLogOut size={13} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}
