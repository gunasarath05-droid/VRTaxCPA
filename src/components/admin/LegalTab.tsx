"use client";

import React, { useState } from "react";
import { LegalPages, LegalPageData, LegalSection, ContactInfo } from "@/context/SiteDataContext";
import {
  FiShield,
  FiFileText,
  FiAlertCircle,
  FiExternalLink,
  FiPlus,
  FiTrash2,
  FiCheck,
  FiInfo,
  FiEdit3,
  FiSave,
  FiPhone,
  FiMail,
  FiMapPin,
  FiRefreshCw,
} from "react-icons/fi";

type PageKey = "termsOfService" | "privacyPolicy" | "disclaimer";

interface LegalTabProps {
  legalPages: LegalPages;
  contactInfo: ContactInfo;
  updateLegalPage: (pageKey: PageKey, pageData: any) => any;
  updateLegalSection: (pageKey: PageKey, sectionId: string, fields: any) => any;
  addLegalSection: (pageKey: PageKey, section: any) => any;
  deleteLegalSection: (pageKey: PageKey, sectionId: string) => void;
  showToast: (msg: string, type?: "success" | "error" | "info") => void;
}

const PAGE_CONFIG: Record<
  PageKey,
  { label: string; route: string; icon: React.ReactNode; defaultBadge: string }
> = {
  termsOfService: {
    label: "Terms of Service",
    route: "/terms-of-service",
    icon: <FiFileText className="text-blue-500" />,
    defaultBadge: "Client Agreement",
  },
  privacyPolicy: {
    label: "Privacy Policy",
    route: "/privacy-policy",
    icon: <FiShield className="text-emerald-500" />,
    defaultBadge: "Legal & Compliance",
  },
  disclaimer: {
    label: "Professional Disclaimer",
    route: "/disclaimer",
    icon: <FiAlertCircle className="text-amber-500" />,
    defaultBadge: "Important Notices",
  },
};

export default function LegalTab({
  legalPages,
  contactInfo,
  updateLegalPage,
  updateLegalSection,
  addLegalSection,
  deleteLegalSection,
  showToast,
}: LegalTabProps) {
  const [activePageKey, setActivePageKey] = useState<PageKey>("termsOfService");
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
  const [editHeading, setEditHeading] = useState("");
  const [editContent, setEditContent] = useState("");

  // New section state
  const [isAddingSection, setIsAddingSection] = useState(false);
  const [newHeading, setNewHeading] = useState("");
  const [newContent, setNewContent] = useState("");

  const activePage: LegalPageData = legalPages?.[activePageKey] || {
    title: PAGE_CONFIG[activePageKey].label,
    badge: PAGE_CONFIG[activePageKey].defaultBadge,
    lastUpdated: "September 2026",
    sections: [],
  };

  // Header settings state
  const [pageTitle, setPageTitle] = useState(activePage.title);
  const [pageBadge, setPageBadge] = useState(activePage.badge);
  const [lastUpdated, setLastUpdated] = useState(activePage.lastUpdated);

  // Sync state on tab change
  const handleTabChange = (key: PageKey) => {
    setActivePageKey(key);
    setEditingSectionId(null);
    setIsAddingSection(false);
    const p = legalPages?.[key];
    if (p) {
      setPageTitle(p.title);
      setPageBadge(p.badge);
      setLastUpdated(p.lastUpdated);
    }
  };

  const handleSavePageMeta = (e: React.FormEvent) => {
    e.preventDefault();
    updateLegalPage(activePageKey, {
      title: pageTitle,
      badge: pageBadge,
      lastUpdated,
    });
    showToast(`Updated ${PAGE_CONFIG[activePageKey].label} metadata`, "success");
  };

  const handleStartEdit = (sec: LegalSection) => {
    setEditingSectionId(sec.id);
    setEditHeading(sec.heading);
    setEditContent(sec.content);
  };

  const handleSaveEdit = (secId: string) => {
    if (!editHeading.trim()) {
      showToast("Section heading is required", "error");
      return;
    }
    updateLegalSection(activePageKey, secId, {
      heading: editHeading.trim(),
      content: editContent.trim(),
    });
    setEditingSectionId(null);
    showToast("Section updated successfully", "success");
  };

  const handleCreateSection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHeading.trim()) {
      showToast("Please enter a section heading", "error");
      return;
    }
    addLegalSection(activePageKey, {
      heading: newHeading.trim(),
      content: newContent.trim(),
    });
    setNewHeading("");
    setNewContent("");
    setIsAddingSection(false);
    showToast("Added new section", "success");
  };

  const handleDeleteSection = (secId: string, heading: string) => {
    if (window.confirm(`Are you sure you want to delete "${heading}"?`)) {
      deleteLegalSection(activePageKey, secId);
      showToast("Section deleted", "info");
    }
  };

  return (
    <div className="space-y-6">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold font-figtree text-[#0B1F3B]">
            Legal Policies & Compliance
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-manrope mt-1">
            Manage terms of service, privacy practices, disclaimers, and synchronized contact details.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsAddingSection(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0B1F3B] hover:bg-[#07192D] text-white text-xs font-semibold font-figtree shadow-sm transition-all cursor-pointer"
          >
            <FiPlus size={14} />
            <span>Add Section</span>
          </button>
        </div>
      </div>

      {/* ── Sub-Tab Navigation for the 3 Legal Pages ── */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        {(Object.keys(PAGE_CONFIG) as PageKey[]).map((key) => {
          const cfg = PAGE_CONFIG[key];
          const isActive = activePageKey === key;
          const secCount = (legalPages?.[key]?.sections || []).length;

          return (
            <button
              key={key}
              type="button"
              onClick={() => handleTabChange(key)}
              className={`inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold font-figtree transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? "bg-[#0B1F3B] text-white shadow-md shadow-[#0B1F3B]/10"
                  : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
              }`}
            >
              <span>{cfg.icon}</span>
              <span>{cfg.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                }`}
              >
                {secCount}
              </span>
            </button>
          );
        })}
      </div>


      {/* ── Page Header / Hero Settings Card ── */}
      <form
        onSubmit={handleSavePageMeta}
        className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4"
      >
        <h2 className="text-sm font-bold font-figtree text-[#0B1F3B] uppercase tracking-wider">
          Page Hero
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 font-figtree">
              Page Title
            </label>
            <input
              type="text"
              value={pageTitle}
              onChange={(e) => setPageTitle(e.target.value)}
              className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-[#0B1F3B] focus:bg-white transition-all font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 font-figtree">
              Badge / Category Tag
            </label>
            <input
              type="text"
              value={pageBadge}
              onChange={(e) => setPageBadge(e.target.value)}
              placeholder="e.g. Client Agreement"
              className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-[#0B1F3B] focus:bg-white transition-all font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 font-figtree">
              Last Updated Label
            </label>
            <input
              type="text"
              value={lastUpdated}
              onChange={(e) => setLastUpdated(e.target.value)}
              placeholder="e.g. September 2026"
              className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-[#0B1F3B] focus:bg-white transition-all font-medium"
            />
          </div>
        </div>

        <div className="flex justify-end pt-1">
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-[#0B1F3B] text-white text-xs font-semibold font-figtree transition-all shadow-xs cursor-pointer"
          >
            <FiSave size={13} />
            <span>Save Page Settings</span>
          </button>
        </div>
      </form>

      {/* ── Add New Section Inline Form (if active) ── */}
      {isAddingSection && (
        <form
          onSubmit={handleCreateSection}
          className="bg-sky-50/60 border border-sky-200 p-5 sm:p-6 rounded-2xl shadow-xs space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold font-figtree text-[#0B1F3B]">
              Add New Section to {PAGE_CONFIG[activePageKey].label}
            </h3>
            <button
              type="button"
              onClick={() => setIsAddingSection(false)}
              className="text-xs text-slate-500 hover:text-slate-800"
            >
              Cancel
            </button>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 font-figtree">
              Section Heading / Number
            </label>
            <input
              type="text"
              value={newHeading}
              onChange={(e) => setNewHeading(e.target.value)}
              placeholder="e.g. 8. Client Cancellation & Refund Policy"
              className="w-full text-xs sm:text-sm bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:border-[#0B1F3B]"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 font-figtree">
              Section Body Content
            </label>
            <textarea
              rows={5}
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="Enter legal terms or policy paragraphs. Use bullet points (• ) for lists..."
              className="w-full text-xs sm:text-sm bg-white border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:border-[#0B1F3B] font-manrope leading-relaxed"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAddingSection(false)}
              className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-200 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0B1F3B] text-white text-xs font-semibold font-figtree shadow-sm hover:bg-[#07192D]"
            >
              <FiCheck size={13} />
              <span>Add Section</span>
            </button>
          </div>
        </form>
      )}

      {/* ── Section Cards List ── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold font-figtree text-[#0B1F3B] uppercase tracking-wider">
            Policy Sections ({activePage.sections?.length || 0})
          </h2>
        </div>

        {(!activePage.sections || activePage.sections.length === 0) && (
          <div className="bg-white p-8 text-center rounded-2xl border border-slate-200 text-slate-400 text-xs">
            No sections found. Click "Add Section" to create one.
          </div>
        )}

        {(activePage.sections || []).map((sec, index) => {
          const isEditing = editingSectionId === sec.id;

          if (isEditing) {
            return (
              <div
                key={sec.id}
                className="bg-white p-5 sm:p-6 rounded-2xl border-2 border-[#0B1F3B] shadow-md space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0B1F3B] font-figtree">
                    Editing Section {index + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => setEditingSectionId(null)}
                    className="text-xs text-slate-400 hover:text-slate-600"
                  >
                    Cancel
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Heading
                  </label>
                  <input
                    type="text"
                    value={editHeading}
                    onChange={(e) => setEditHeading(e.target.value)}
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-[#0B1F3B] font-bold font-figtree"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Content
                  </label>
                  <textarea
                    rows={6}
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:border-[#0B1F3B] font-manrope leading-relaxed"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setEditingSectionId(null)}
                    className="px-3.5 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSaveEdit(sec.id)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0B1F3B] hover:bg-[#07192D] text-white text-xs font-semibold font-figtree transition-all shadow-xs cursor-pointer"
                  >
                    <FiSave size={13} />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            );
          }

          return (
            <div
              key={sec.id}
              className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 hover:border-slate-300 shadow-xs transition-all space-y-3 group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 text-xs font-bold flex items-center justify-center shrink-0">
                    {index + 1}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold font-figtree text-[#0B1F3B]">
                    {sec.heading}
                  </h3>
                </div>

                <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                  <button
                    type="button"
                    onClick={() => handleStartEdit(sec)}
                    className="p-1.5 text-slate-500 hover:text-[#0B1F3B] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                    title="Edit section"
                  >
                    <FiEdit3 size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteSection(sec.id, sec.heading)}
                    className="p-1.5 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    title="Delete section"
                  >
                    <FiTrash2 size={15} />
                  </button>
                </div>
              </div>

              <div className="text-xs sm:text-sm text-slate-600 font-manrope whitespace-pre-line leading-relaxed pl-8">
                {sec.content}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
