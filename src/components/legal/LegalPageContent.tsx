"use client";

import React from "react";
import Link from "next/link";
import { useSiteData } from "@/context/SiteDataContext";
import { FiPhone, FiMail, FiMapPin, FiClock } from "react-icons/fi";

type PageKey = "termsOfService" | "privacyPolicy" | "disclaimer";

interface LegalPageContentProps {
  pageKey: PageKey;
  defaultBadge: string;
  defaultTitle: string;
}

export default function LegalPageContent({
  pageKey,
  defaultBadge,
  defaultTitle,
}: LegalPageContentProps) {
  const { legalPages, contactInfo } = useSiteData();

  const pageData = legalPages?.[pageKey];
  const title = pageData?.title || defaultTitle;
  const badge = pageData?.badge || defaultBadge;
  const lastUpdated = pageData?.lastUpdated || "September 2026";
  const sections = pageData?.sections || [];

  return (
    <>
      {/* ── Hero Banner ── */}
      <section className="relative pt-28 sm:pt-36 pb-14 sm:pb-20 bg-[#0B1F3B] text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none bg-[radial-gradient(circle,#d3d663,transparent_70%)]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center justify-center gap-2 text-white/60 text-xs font-semibold mb-4"
          >
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#d3d663]">{title}</span>
          </nav>

          <span className="inline-flex items-center rounded-full bg-white/10 text-white/80 px-3.5 py-1 text-xs font-bold uppercase tracking-widest border border-white/20 mb-3 font-figtree">
            {badge}
          </span>

          <h1 className="text-3xl sm:text-5xl text-white font-extrabold font-figtree tracking-tight">
            {title}
          </h1>

          <p className="text-white/70 text-sm sm:text-base font-manrope mt-3">
            Last Updated: {lastUpdated}
          </p>
        </div>
      </section>

      {/* ── Main Legal Content ── */}
      <section className="py-16 sm:py-24 bg-[#F8FAFC]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-8 font-manrope text-slate-600 text-sm sm:text-base leading-relaxed">
            {sections.map((sec) => {
              // Parse bullet points or paragraphs cleanly
              const lines = sec.content.split("\n");
              const hasBullets = lines.some((l) => l.trim().startsWith("•") || l.trim().startsWith("-"));

              return (
                <div key={sec.id}>
                  <h2 className="text-xl sm:text-2xl font-bold font-figtree text-[#0B1F3B] mb-3">
                    {sec.heading}
                  </h2>

                  {hasBullets ? (
                    <div className="space-y-2">
                      {lines.map((line, idx) => {
                        const trimmed = line.trim();
                        if (!trimmed) return null;
                        if (trimmed.startsWith("•") || trimmed.startsWith("-")) {
                          const bulletText = trimmed.replace(/^[•\-]\s*/, "");
                          // If bullet has bold prefix e.g. "Exclusive Use of TaxDome Portal: ..."
                          const colonIndex = bulletText.indexOf(":");
                          if (colonIndex > 0 && colonIndex < 50) {
                            const prefix = bulletText.slice(0, colonIndex + 1);
                            const rest = bulletText.slice(colonIndex + 1);
                            return (
                              <li key={idx} className="ml-6 list-disc pl-1 text-slate-700">
                                <strong>{prefix}</strong>
                                {rest}
                              </li>
                            );
                          }
                          return (
                            <li key={idx} className="ml-6 list-disc pl-1 text-slate-700">
                              {bulletText}
                            </li>
                          );
                        }
                        return <p key={idx}>{trimmed}</p>;
                      })}
                    </div>
                  ) : (
                    <div className="space-y-3 whitespace-pre-line">
                      {sec.content}
                    </div>
                  )}
                </div>
              );
            })}

            {/* ── Dynamic Contact Us Box (Directly fed from Contact & Socials admin data) ── */}
            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-base sm:text-lg font-bold font-figtree text-[#0B1F3B] mb-2">
                Official Contact Information
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mb-3">
                For official professional consultations, client inquiries, and formal advisory communications:
              </p>

              <div className="p-5 sm:p-6 bg-[#F8FAFC] rounded-2xl border border-slate-200 text-sm space-y-2">
                <p className="font-bold font-figtree text-base text-[#0B1F3B]">
                  {contactInfo.officeTitle || "VR Tax CPA LLC"}
                </p>

                <p className="flex items-center gap-2 text-slate-700">
                  <FiMapPin className="text-[#0B1F3B] shrink-0" size={15} />
                  <span>{contactInfo.address || "3035 Ivy Hill Lane, Irving, TX 75063"}</span>
                </p>

                <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-slate-700">
                  <span className="flex items-center gap-2">
                    <FiPhone className="text-[#0B1F3B] shrink-0" size={15} />
                    <span>Phone:</span>
                    <a
                      href={contactInfo.phoneRaw ? `tel:${contactInfo.phoneRaw}` : `tel:+14694716580`}
                      className="font-semibold text-[#0B1F3B] hover:text-[#d3d663] transition-colors"
                    >
                      {contactInfo.phone || "(469) 471-6580"}
                    </a>
                  </span>

                  <span className="text-slate-300 hidden sm:inline">|</span>

                  <span className="flex items-center gap-2">
                    <FiMail className="text-[#0B1F3B] shrink-0" size={15} />
                    <span>Email:</span>
                    <a
                      href={`mailto:${contactInfo.email || "info@vrtaxcpa.com"}`}
                      className="font-semibold text-[#0B1F3B] hover:text-[#d3d663] transition-colors"
                    >
                      {contactInfo.email || "info@vrtaxcpa.com"}
                    </a>
                  </span>
                </p>

                {contactInfo.hours && (
                  <p className="flex items-center gap-2 text-xs text-slate-500 pt-1">
                    <FiClock className="text-slate-400 shrink-0" size={14} />
                    <span>Office Hours: {contactInfo.hours}</span>
                  </p>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
