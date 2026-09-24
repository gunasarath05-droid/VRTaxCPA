"use client";

import React, { useState, useMemo } from "react";
import {
  FiPlus,
  FiStar,
  FiEdit,
  FiTrash2,
  FiCheckCircle,
  FiMessageSquare,
  FiSearch,
} from "react-icons/fi";
import { FaQuoteLeft } from "react-icons/fa";

interface TestimonialsTabProps {
  testimonials: any[];
  openAddTestimonialModal: () => void;
  openEditTestimonialModal: (t: any) => void;
  deleteTestimonial: (id: string) => void;
  showToast: (msg: string, type?: "success" | "error" | "info") => void;
}

export default function TestimonialsTab({
  testimonials = [],
  openAddTestimonialModal,
  openEditTestimonialModal,
  deleteTestimonial,
  showToast,
}: TestimonialsTabProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("all");

  // Distinct industries for filtering
  const industries = useMemo(() => {
    const list = new Set<string>();
    testimonials.forEach((t) => {
      if (t.industry) list.add(t.industry);
    });
    return ["all", ...Array.from(list)];
  }, [testimonials]);

  // Filtered testimonials
  const filteredTestimonials = useMemo(() => {
    return (testimonials || []).filter((t) => {
      const matchSearch =
        !searchTerm ||
        t.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.desig?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.industry?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.desc?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchIndustry =
        selectedIndustry === "all" ||
        t.industry?.toLowerCase() === selectedIndustry.toLowerCase();

      return matchSearch && matchIndustry;
    });
  }, [testimonials, searchTerm, selectedIndustry]);

  return (
    <div className="space-y-6 pb-12">
      {/* ── Page Header Row ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-end gap-4">
        <button
          onClick={openAddTestimonialModal}
          className="px-6 py-2.5 rounded-full bg-[#1D61E7] hover:bg-[#1554C0] active:scale-[0.98] text-white font-bold text-sm font-figtree transition-all shadow-md shadow-blue-500/20 flex items-center gap-2 self-start sm:self-auto cursor-pointer shrink-0"
        >
          <FiPlus size={16} />
          <span>Add Testimonial</span>
        </button>
      </div>

      {/* ── Search & Filter Controls ── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <FiSearch
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by client name, industry, or keyword..."
            className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200/80 rounded-full text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1D61E7]/20 focus:border-[#1D61E7] transition-all font-manrope shadow-xs"
          />
        </div>

        {/* Industry Filter Pills */}
        {industries.length > 2 && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {industries.map((ind) => (
              <button
                key={ind}
                onClick={() => setSelectedIndustry(ind)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold font-figtree transition-all cursor-pointer whitespace-nowrap ${
                  selectedIndustry === ind
                    ? "bg-[#1D61E7] text-white shadow-xs"
                    : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200/80"
                }`}
              >
                {ind === "all" ? "All Industries" : ind}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Testimonials Grid ── */}
      {filteredTestimonials.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-[32px] p-12 text-center flex flex-col items-center justify-center space-y-3 shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center">
            <FiMessageSquare size={26} />
          </div>
          <h4 className="text-base font-bold text-[#0B1F3B] font-figtree">
            {searchTerm || selectedIndustry !== "all"
              ? "No testimonials match your filters"
              : "No testimonials added yet"}
          </h4>
          <p className="text-xs text-slate-500 max-w-sm font-manrope">
            {searchTerm || selectedIndustry !== "all"
              ? "Try adjusting your search keyword or selected industry filter."
              : "Click the button below to add your first client testimonial to display on your website."}
          </p>
          {searchTerm || selectedIndustry !== "all" ? (
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedIndustry("all");
              }}
              className="mt-2 px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold font-figtree transition-all cursor-pointer"
            >
              Reset Filters
            </button>
          ) : (
            <button
              onClick={openAddTestimonialModal}
              className="mt-2 px-6 py-2.5 rounded-full bg-[#1D61E7] hover:bg-[#1554C0] text-white text-xs font-bold font-figtree cursor-pointer transition-all shadow-md shadow-blue-500/20"
            >
              Add First Testimonial
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {filteredTestimonials.map((t: any) => {
            const initials =
              t.initials ||
              (t.name
                ? t.name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")
                    .substring(0, 2)
                    .toUpperCase()
                : "VR");

            return (
              <div
                key={t.id}
                className="rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-100 shadow-xs hover:shadow-md transition-all duration-300 bg-white flex flex-col justify-between group"
              >
                {/* ── Top Header (Clean Professional SaaS Header) ── */}
                <div className="p-4 sm:p-6 pb-2 flex items-start justify-between gap-3 sm:gap-4">
                  <div className="flex items-center gap-3.5 min-w-0">
                    {/* Initials Avatar */}
                    <div className="w-11 h-11 rounded-2xl bg-[#EBF2FE] border border-blue-100 text-[#1D61E7] font-black text-sm flex items-center justify-center shrink-0 font-figtree shadow-2xs">
                      {initials}
                    </div>

                    <div className="min-w-0">
                      <h4 className="font-extrabold text-slate-900 text-base font-figtree leading-tight truncate">
                        {t.name}
                      </h4>
                      <p className="text-slate-500 text-xs font-manrope truncate mt-0.5">
                        {t.desig || "Client Review"}
                      </p>
                    </div>
                  </div>

                  {/* Stars Pill */}
                  <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/60 shrink-0">
                    {Array.from({ length: t.rating || 5 }).map((_, i) => (
                      <FiStar
                        key={i}
                        size={12}
                        className="fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                </div>

                {/* ── Body: Industry Tag & Quote ── */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  {/* Industry Badge */}
                  {t.industry && (
                    <div>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider text-[#1D61E7] bg-blue-50 border border-blue-100 font-figtree">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1D61E7]" />
                        {t.industry}
                      </span>
                    </div>
                  )}

                  {/* Quote Text */}
                  <div className="relative bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-100 flex-1">
                    <FaQuoteLeft
                      size={18}
                      className="text-slate-300 absolute top-3 right-4 opacity-50"
                    />
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic font-manrope">
                      &ldquo;{t.desc}&rdquo;
                    </p>
                  </div>
                </div>

                {/* ── Bottom Actions Bar ── */}
                <div className="px-5 sm:px-6 py-3.5 bg-slate-50/60 border-t border-slate-100 flex items-center justify-between gap-3">
                  <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1 font-manrope">
                    <FiCheckCircle size={13} className="text-emerald-500" />
                    Verified Client
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditTestimonialModal(t)}
                      className="px-4 py-1.5 text-slate-700 hover:text-white hover:bg-[#1D61E7] bg-white border border-slate-200 rounded-full text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all font-figtree shadow-2xs"
                    >
                      <FiEdit size={13} className="stroke-[2.2]" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => {
                        if (window.confirm(`Delete review from ${t.name}?`)) {
                          deleteTestimonial(t.id);
                          showToast(`Deleted review from ${t.name}`);
                        }
                      }}
                      className="p-2 text-rose-500 hover:text-white hover:bg-rose-500 bg-white border border-slate-200 rounded-full text-xs font-semibold cursor-pointer transition-colors shadow-2xs"
                      title="Delete testimonial"
                    >
                      <FiTrash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
