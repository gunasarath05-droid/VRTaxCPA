"use client";

import React, { useState } from "react";
import {
  FiMail,
  FiSearch,
  FiTrash2,
  FiPhone,
  FiCalendar,
  FiBriefcase,
  FiTarget,
  FiCheckCircle,
  FiRotateCcw,
  FiSend,
  FiSliders,
} from "react-icons/fi";

interface InquiriesTabProps {
  inquiries: any[];
  updateInquiryStatus: (id: string, status: string) => void;
  deleteInquiry: (id: string) => void;
  showToast: (msg: string, type?: "success" | "error" | "info") => void;
}

export default function InquiriesTab({
  inquiries,
  updateInquiryStatus,
  deleteInquiry,
  showToast,
}: InquiriesTabProps) {
  const [inquirySearch, setInquirySearch] = useState("");
  const [inquiryFilter, setInquiryFilter] = useState("all");

  const totalCount = (inquiries || []).length;
  const newCount = (inquiries || []).filter((i: any) => i.status === "new").length;
  const repliedCount = (inquiries || []).filter((i: any) => i.status === "replied").length;

  const filteredInquiries = (inquiries || []).filter((inq: any) => {
    const matchesFilter =
      inquiryFilter === "all" ? true : inq.status === inquiryFilter;
    const searchLower = inquirySearch.toLowerCase();
    const matchesSearch =
      !inquirySearch ||
      inq.name?.toLowerCase().includes(searchLower) ||
      inq.email?.toLowerCase().includes(searchLower) ||
      inq.company?.toLowerCase().includes(searchLower) ||
      inq.service?.toLowerCase().includes(searchLower) ||
      inq.message?.toLowerCase().includes(searchLower);
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6 font-manrope">

      {/* Filter Row & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
        {/* Rounded Capsule Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-white border border-slate-200/80 rounded-2xl sm:rounded-full shadow-xs overflow-x-auto scrollbar-none max-w-full">
          {[
            { id: "all", label: "All Inquiries", count: totalCount },
            { id: "new", label: "New / Unread", count: newCount },
            { id: "replied", label: "Replied", count: repliedCount },
          ].map((f) => {
            const isActive = inquiryFilter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setInquiryFilter(f.id)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-bold transition-all cursor-pointer font-figtree whitespace-nowrap shrink-0 ${
                  isActive
                    ? "bg-[#1D61E7] text-white shadow-md shadow-blue-500/20"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <span>{f.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold ${
                    isActive ? "bg-white/25 text-white" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {f.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex items-center w-full md:w-auto">
            <FiSearch
              className="absolute left-3.5 text-slate-400 pointer-events-none"
              size={14}
            />
            <input
              type="text"
              placeholder="Search inquiries..."
              value={inquirySearch}
              onChange={(e) => setInquirySearch(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white border border-slate-200/80 rounded-full text-xs text-slate-800 placeholder-slate-400 shadow-xs focus:outline-none focus:ring-2 focus:ring-[#1D61E7]/20 focus:border-[#1D61E7] w-full md:w-64 transition-all font-manrope"
            />
          </div>
        </div>
      </div>

      {/* Inquiries Grid (2 Columns) */}
      {filteredInquiries.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-3xl p-12 text-center text-slate-500 shadow-xs">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-50 text-[#1D61E7] flex items-center justify-center mb-3">
            <FiMail size={26} />
          </div>
          <p className="text-sm font-bold text-slate-900 font-figtree">
            No inquiries match your filter
          </p>
          <p className="text-xs text-slate-500 mt-1 font-manrope">
            Try adjusting your search keywords or switching filter tabs.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {filteredInquiries.map((inq: any) => (
            <div
              key={inq.id}
              className="bg-white border border-slate-100 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Header: Circle Avatar, Name, Company & Status Badge */}
                <div className="flex items-start justify-between gap-3 mb-3.5">
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Dark Blue Circular Avatar */}
                    <div className="w-10 h-10 rounded-full bg-[#0B1F3B] text-white font-extrabold text-sm flex items-center justify-center shrink-0 font-figtree shadow-xs">
                      {inq.name ? inq.name.charAt(0).toUpperCase() : "?"}
                    </div>

                    <div className="min-w-0">
                      <h4 className="font-bold text-slate-900 text-base font-figtree truncate leading-tight">
                        {inq.name}
                      </h4>
                      {inq.company ? (
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mt-0.5 truncate font-manrope">
                          <FiBriefcase size={12} className="shrink-0 text-slate-400" />
                          <span className="truncate">{inq.company}</span>
                        </div>
                      ) : (
                        <span className="text-[11px] text-slate-400 font-medium block mt-0.5 font-manrope">
                          Individual Client
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Status Badge with colored dot */}
                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider font-mono shrink-0 flex items-center gap-1.5 ${
                      inq.status === "new"
                        ? "bg-rose-50 text-rose-700 border border-rose-200/60"
                        : inq.status === "replied"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                        : "bg-slate-100 text-slate-600 border border-slate-200"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        inq.status === "new"
                          ? "bg-rose-500 animate-pulse"
                          : inq.status === "replied"
                          ? "bg-emerald-600"
                          : "bg-slate-400"
                      }`}
                    />
                    <span>{inq.status}</span>
                  </span>
                </div>

                {/* 2-Column Split Information Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-3 border-y border-slate-100 my-3 text-xs text-slate-600">
                  {/* Left Column: Email & Phone */}
                  <div className="space-y-1.5 min-w-0">
                    <div className="flex items-center gap-2 truncate">
                      <FiMail size={13} className="text-slate-400 shrink-0" />
                      <span className="truncate font-medium text-slate-700">{inq.email}</span>
                    </div>
                    {inq.phone ? (
                      <div className="flex items-center gap-2 truncate">
                        <FiPhone size={13} className="text-slate-400 shrink-0" />
                        <span className="truncate text-slate-600">{inq.phone}</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 truncate text-slate-400 text-[11px]">
                        <FiPhone size={13} className="text-slate-300 shrink-0" />
                        <span>Not provided</span>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Service & Date */}
                  <div className="space-y-1.5 min-w-0 sm:border-l sm:border-slate-100 sm:pl-3.5">
                    <div className="flex items-center gap-2 truncate">
                      <FiTarget size={13} className="text-slate-400 shrink-0" />
                      <span className="truncate font-medium text-slate-700">{inq.service || "Tax Consultation"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 truncate text-[11px]">
                      <FiCalendar size={13} className="text-slate-400 shrink-0" />
                      <span className="truncate">
                        {inq.date ? new Date(inq.date).toLocaleString() : "Recent"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Message Box */}
                <div className="p-3.5 bg-slate-50/80 border border-slate-100 rounded-2xl text-xs text-slate-600 leading-relaxed font-manrope mb-4 min-h-[3.75rem]">
                  <p className="line-clamp-2">
                    {inq.message || "No message content provided."}
                  </p>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 pt-1">
                <a
                  href={`mailto:${inq.email}?subject=RE: Inquiry on VR Tax CPA LLC - ${inq.service || "Tax Consultation"}`}
                  onClick={() => updateInquiryStatus(inq.id, "replied")}
                  className="flex-1 min-w-[120px] py-2 sm:py-2.5 px-3 sm:px-4 rounded-full bg-[#1D61E7] hover:bg-[#1554C0] active:scale-[0.98] text-white text-xs font-bold flex items-center justify-center gap-1.5 sm:gap-2 transition-all cursor-pointer font-figtree shadow-md shadow-blue-500/20"
                >
                  <FiSend size={13} />
                  <span>Reply Email</span>
                </a>

                {inq.status !== "replied" ? (
                  <button
                    onClick={() => {
                      updateInquiryStatus(inq.id, "replied");
                      showToast("Marked as replied");
                    }}
                    className="py-2 sm:py-2.5 px-3 sm:px-4 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold cursor-pointer transition-colors flex items-center gap-1.5 font-figtree shadow-xs shrink-0"
                    title="Mark as Replied"
                  >
                    <FiCheckCircle size={13} className="text-emerald-600" />
                    <span>Replied</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      updateInquiryStatus(inq.id, "new");
                      showToast("Marked as new");
                    }}
                    className="py-2 sm:py-2.5 px-3 sm:px-4 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold cursor-pointer transition-colors flex items-center gap-1.5 font-figtree shadow-xs shrink-0"
                    title="Mark as New"
                  >
                    <FiRotateCcw size={13} className="text-amber-500" />
                    <span>New</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    if (window.confirm("Delete this inquiry?")) {
                      deleteInquiry(inq.id);
                      showToast("Inquiry deleted");
                    }
                  }}
                  className="p-2 sm:p-2.5 text-rose-500 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-all cursor-pointer shrink-0 border border-slate-200 hover:border-rose-200"
                  title="Delete Inquiry"
                >
                  <FiTrash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

