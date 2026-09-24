"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/images/Logo.png";
import {
  FiLayout,
  FiMail,
  FiMapPin,
  FiUser,
  FiUsers,
  FiStar,
  FiFileText,
  FiSettings,
  FiTrendingUp,
  FiX,
} from "react-icons/fi";

export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: number | null;
  count?: number;
}

interface NavCategory {
  title?: string;
  items: NavItem[];
}

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  unreadInquiriesCount: number;
  teamCount: number;
  testimonialsCount: number;
  blogsCount: number;
  handleLogout: () => void;
}

export default function AdminSidebar({
  activeTab,
  setActiveTab,
  sidebarOpen,
  setSidebarOpen,
  unreadInquiriesCount,
  teamCount,
  testimonialsCount,
  blogsCount,
  handleLogout,
}: AdminSidebarProps) {
  const categories: NavCategory[] = [
    {
      items: [
        { id: "overview", label: "Dashboard", icon: <FiLayout size={18} /> },
        {
          id: "inquiries",
          label: "Contact Inquiries",
          icon: <FiMail size={18} />,
          badge: unreadInquiriesCount > 0 ? unreadInquiriesCount : null,
        },
      ],
    },
    {
      title: "CONTENT",
      items: [
        { id: "blogs", label: "Blog Posts", icon: <FiFileText size={18} />, count: blogsCount },
        { id: "testimonials", label: "Testimonials", icon: <FiStar size={18} />, count: testimonialsCount },
        { id: "team", label: "Team Members", icon: <FiUsers size={18} />, count: teamCount },
        { id: "founder", label: "Founder Profile", icon: <FiUser size={18} /> },
      ],
    },
    {
      title: "SITE DATA",
      items: [
        { id: "contact", label: "Contact & Socials", icon: <FiMapPin size={18} /> },
      ],
    },
    {
      title: "SYSTEM",
      items: [
        { id: "settings", label: "Settings & API", icon: <FiSettings size={18} /> },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed lg:static top-0 bottom-0 left-0 h-full w-[280px] sm:w-72 max-w-[85vw] bg-white border-r border-slate-100 z-50 transition-transform duration-300 ease-in-out flex flex-col justify-between shrink-0 ${
          sidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col flex-1 min-h-0">
          {/* Brand Header */}
          <div className="h-16 sm:h-20 px-5 sm:px-6 flex items-center justify-between shrink-0 border-b border-slate-50 lg:border-none">
            <button
              onClick={() => {
                setActiveTab("overview");
                setSidebarOpen(false);
              }}
              className="flex items-center justify-start cursor-pointer focus:outline-none transition-opacity hover:opacity-90"
              title="Go to Dashboard"
            >
              <Image
                src={logo}
                alt="VR Tax CPA Logo"
                width={175}
                height={46}
                priority
                className="h-9 sm:h-11 w-auto object-contain"
              />
            </button>

            {/* Mobile Close Button */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <FiX size={19} />
            </button>
          </div>

          {/* Navigation Groups */}
          <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4 scrollbar-thin">
            {categories.map((cat, idx) => (
              <div key={cat.title || `group-${idx}`} className="space-y-1">
                {cat.title && (
                  <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 font-figtree mb-2 mt-3">
                    {cat.title}
                  </p>
                )}
                {cat.items.map((item) => {
                  const isActive =
                    activeTab === item.id ||
                    (item.id === "contact" && activeTab === "socials");
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setSidebarOpen(false);
                      }}
                      className={`relative w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer ${
                        isActive
                          ? "bg-[#EBF2FE] text-[#1D61E7] font-bold"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                      }`}
                    >
                      {/* Active Indicator Bar on Left */}
                      {isActive && (
                        <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-[#1D61E7]" />
                      )}

                      <div className="flex items-center gap-3 min-w-0">
                        <span
                          className={`transition-colors ${
                            isActive ? "text-[#1D61E7]" : "text-slate-400"
                          }`}
                        >
                          {item.icon}
                        </span>
                        <span className="font-figtree truncate">{item.label}</span>
                      </div>

                      {/* Badges / Counters */}
                      {item.badge !== undefined && item.badge !== null && (
                        <span
                          className={`text-[11px] font-black px-2 py-0.5 rounded-full shrink-0 ${
                            isActive
                              ? "bg-[#1D61E7] text-white"
                              : "bg-rose-500 text-white animate-pulse"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                      {item.count !== undefined && (
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full shrink-0 bg-slate-100 text-slate-500 font-figtree">
                          {item.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Brand Card (Matching Image) */}
        <div className="p-3 mx-4 mb-4 rounded-2xl bg-[#F8FAFC] border border-slate-100 flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-[#0B1F3B] text-white flex items-center justify-center shrink-0 shadow-xs">
            <FiTrendingUp size={16} className="text-[#d3d663]" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-slate-800 font-figtree truncate">
              VRTaxCPA
            </p>
            <p className="text-[10px] text-slate-400 font-manrope truncate">
              Build. Comply. Grow.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
