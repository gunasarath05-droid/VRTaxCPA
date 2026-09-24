"use client";

import React from "react";
import {
  FiMail,
  FiStar,
  FiFileText,
  FiUsers,
  FiPlus,
  FiEdit2,
  FiCheckCircle,
  FiClock,
  FiMapPin,
  FiPhone,
  FiArrowRight,
  FiSettings,
} from "react-icons/fi";

interface OverviewTabProps {
  inquiries: any[];
  testimonials: any[];
  blogs: any[];
  team: any[];
  unreadInquiriesCount: number;
  setActiveTab: (tab: string) => void;
  openAddBlogModal: () => void;
  openAddTestimonialModal: () => void;
  openAddTeamModal: () => void;
}

export default function OverviewTab({
  inquiries,
  testimonials,
  blogs,
  team,
  unreadInquiriesCount,
  setActiveTab,
  openAddBlogModal,
  openAddTestimonialModal,
  openAddTeamModal,
}: OverviewTabProps) {
  const totalInquiries = (inquiries || []).length;
  const repliedCount = (inquiries || []).filter(
    (i: any) => i.status === "replied"
  ).length;
  const newCount = unreadInquiriesCount;
  const archivedCount = Math.max(0, totalInquiries - repliedCount - newCount);
  const replyRate =
    totalInquiries > 0 ? Math.round((repliedCount / totalInquiries) * 100) : 100;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* ── Executive Hero Banner (Matching Image) ── */}
      <div className="bg-gradient-to-r from-[#EBF3FD] via-[#F0F6FE] to-[#F7FAFF] rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-blue-100/60 shadow-xs relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-5 sm:gap-6">
        <div className="relative z-10 max-w-xl">
          <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 font-figtree tracking-tight">
            Welcome back, Vetha Ram 👋
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-manrope leading-relaxed">
            Here is a snapshot of your tax practice inquiries, publications, and client activities for today.
          </p>
        </div>

        {/* Quick Action Button Group */}
        <div className="relative z-10 flex flex-wrap items-center gap-2 sm:gap-2.5 shrink-0 w-full sm:w-auto">
          <button
            onClick={openAddBlogModal}
            className="flex-1 sm:flex-initial justify-center px-4 sm:px-5 py-2.5 rounded-full bg-[#1D61E7] hover:bg-[#1554C0] active:scale-[0.98] text-white font-bold text-xs tracking-wide transition-all shadow-md shadow-blue-500/20 cursor-pointer flex items-center gap-1.5 font-figtree"
          >
            <FiPlus size={15} />
            <span>New Article</span>
          </button>
          <button
            onClick={openAddTestimonialModal}
            className="flex-1 sm:flex-initial justify-center px-4 sm:px-5 py-2.5 rounded-full bg-white hover:bg-slate-50 active:scale-[0.98] text-slate-700 font-bold text-xs border border-slate-200/80 shadow-xs transition-all cursor-pointer flex items-center gap-1.5 font-figtree"
          >
            <FiPlus size={15} />
            <span>Add Review</span>
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className="px-3.5 sm:px-4 py-2.5 rounded-full bg-white hover:bg-slate-50 active:scale-[0.98] text-slate-700 font-bold text-xs border border-slate-200/80 shadow-xs transition-all cursor-pointer flex items-center gap-1.5 font-figtree"
            title="Manage Settings & Backup"
          >
            <FiSettings size={14} />
            <span>Settings</span>
          </button>
        </div>
      </div>

      {/* ── 4 KPI Stat Cards Grid (Matching Image) ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Card 1: Inquiries */}
        <div
          onClick={() => setActiveTab("inquiries")}
          className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white border border-slate-100 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-slate-400 font-figtree">
              INQUIRIES
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-100/70 text-[#1D61E7] flex items-center justify-center transition-transform group-hover:scale-105">
              <FiMail size={15} />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 font-figtree">
            {totalInquiries}
          </div>
          <p className="text-[11px] text-slate-400 mt-1 font-manrope">
            {newCount > 0 ? `${newCount} new unread` : "All inquiries handled"}
          </p>
        </div> 

        {/* Card 2: Reviews */}
        <div
          onClick={() => setActiveTab("testimonials")}
          className="p-5 rounded-3xl bg-white border border-slate-100 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 font-figtree">
              REVIEWS
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-100/70 text-emerald-600 flex items-center justify-center transition-transform group-hover:scale-105">
              <FiStar size={15} />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 font-figtree">
            {(testimonials || []).length}
          </div>
          <p className="text-[11px] text-slate-400 mt-1 font-manrope">
            5.0★ average rating
          </p>
        </div>

        {/* Card 3: Articles */}
        <div
          onClick={() => setActiveTab("blogs")}
          className="p-5 rounded-3xl bg-white border border-slate-100 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 font-figtree">
              ARTICLES
            </span>
            <div className="w-8 h-8 rounded-lg bg-purple-100/70 text-purple-600 flex items-center justify-center transition-transform group-hover:scale-105">
              <FiFileText size={15} />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 font-figtree">
            {(blogs || []).length}
          </div>
          <p className="text-[11px] text-slate-400 mt-1 font-manrope">
            Live blog publications
          </p>
        </div>

        {/* Card 4: Team */}
        <div
          onClick={() => setActiveTab("team")}
          className="p-5 rounded-3xl bg-white border border-slate-100 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 font-figtree">
              TEAM
            </span>
            <div className="w-8 h-8 rounded-lg bg-teal-100/70 text-teal-600 flex items-center justify-center transition-transform group-hover:scale-105">
              <FiUsers size={15} />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 font-figtree">
            {(team || []).length}
          </div>
          <p className="text-[11px] text-slate-400 mt-1 font-manrope">
            Active staff members
          </p>
        </div>
      </div>

      {/* ── Middle Row: Firm Snapshot & Lead Analytics (Matching Image) ── */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Card A: Recent Inquiries */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-slate-100 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-base text-slate-900 font-figtree tracking-tight">
                  Recent Inquiries
                </h3>
                <p className="text-xs text-slate-400 font-manrope">
                  Latest visitor leads
                </p>
              </div>
              <button
                onClick={() => setActiveTab("inquiries")}
                className="text-xs font-bold text-slate-600 hover:text-[#1D61E7] cursor-pointer flex items-center gap-1 font-figtree"
              >
                <span>View all ({totalInquiries})</span>
                <FiArrowRight size={13} />
              </button>
            </div>

            {(inquiries || []).length === 0 ? (
              <div className="py-12 text-center text-slate-400">
                <FiMail size={32} className="mx-auto text-slate-300 mb-2" />
                <p className="text-xs font-semibold">No inquiries received yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {(inquiries || []).slice(0, 5).map((inq: any, idx: number) => (
                  <div
                    key={inq.id || idx}
                    onClick={() => setActiveTab("inquiries")}
                    className="p-3 rounded-2xl hover:bg-slate-50/80 transition-all flex items-center justify-between gap-3 cursor-pointer group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-[#0B1F3B] text-white font-black text-xs flex items-center justify-center shrink-0 font-figtree">
                        {inq.name ? inq.name.charAt(0).toUpperCase() : idx + 1}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-xs sm:text-sm text-slate-900 truncate font-figtree group-hover:text-[#1D61E7] transition-colors">
                            {inq.name}
                          </h4>
                          {inq.status === "new" && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-100">
                              NEW
                            </span>
                          )}
                          {inq.status === "replied" && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                              Replied
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 truncate mt-0.5 font-manrope">
                          {inq.service || inq.company || inq.email}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[10px] font-semibold text-slate-400 block font-manrope">
                        {new Date(inq.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Card B: Inquiry Response Analytics */}
        <div className="lg:col-span-6 bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-base text-slate-900 font-figtree tracking-tight">
                Inquiry Resolution Analytics
              </h3>
              <button
                onClick={() => setActiveTab("inquiries")}
                className="text-xs font-bold text-slate-600 hover:text-[#1D61E7] cursor-pointer flex items-center gap-1 font-figtree"
              >
                <span>View All Inquiries</span>
                <FiArrowRight size={13} />
              </button>
            </div>

            {/* Segmented Progress Bar */}
            <div className="mb-6 pt-2">
              <div className="flex justify-between text-xs font-bold text-slate-600 mb-2 font-figtree">
                <span>Resolution Rate</span>
                <span className="text-slate-900 font-black">{replyRate}% Replied</span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden flex shadow-inner">
                <div
                  style={{
                    width: `${totalInquiries ? (repliedCount / totalInquiries) * 100 : 100}%`,
                  }}
                  className="bg-[#1D61E7] rounded-full transition-all duration-500"
                  title={`Replied: ${repliedCount}`}
                />
              </div>
            </div>

            {/* Metrics breakdown (4 columns from image) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-2 pt-4 border-t border-slate-100 text-center">
              <div>
                <span className="text-[10px] font-extrabold uppercase text-slate-400 block font-figtree tracking-wider">
                  TOTAL
                </span>
                <span className="text-2xl font-black text-slate-900 font-figtree mt-1 block">
                  {totalInquiries}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase text-slate-400 block font-figtree tracking-wider">
                  REPLIED
                </span>
                <span className="text-2xl font-black text-emerald-600 font-figtree mt-1 block">
                  {repliedCount}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase text-slate-400 block font-figtree tracking-wider">
                  NEW
                </span>
                <span className="text-2xl font-black text-amber-500 font-figtree mt-1 block">
                  {newCount}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase text-slate-400 block font-figtree tracking-wider">
                  RATE
                </span>
                <span className="text-2xl font-black text-slate-900 font-figtree mt-1 block">
                  {replyRate}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
