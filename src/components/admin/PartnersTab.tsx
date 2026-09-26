"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  FiPlus,
  FiEdit,
  FiTrash2,
  FiAward,
  FiX,
  FiUploadCloud,
  FiLink,
  FiCheck,
  FiInfo,
} from "react-icons/fi";

interface PartnerItem {
  id: string;
  name: string;
  logoSrc?: string;
  category?: string;
}

interface PartnersTabProps {
  partners: PartnerItem[];
  addPartner: (item: any) => any;
  updatePartner: (id: string, item: any) => any;
  deletePartner: (id: string) => void;
  showToast: (msg: string, type?: "success" | "error" | "info") => void;
}

export default function PartnersTab({
  partners = [],
  addPartner,
  updatePartner,
  deletePartner,
  showToast,
}: PartnersTabProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PartnerItem | null>(null);

  // Form State
  const [form, setForm] = useState({
    name: "",
    category: "",
    logoSrc: "",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);

  const openAddModal = () => {
    setEditingItem(null);
    setForm({
      name: "",
      category: "",
      logoSrc: "",
    });
    setShowUrlInput(false);
    setModalOpen(true);
  };

  const openEditModal = (item: PartnerItem) => {
    setEditingItem(item);
    setForm({
      name: item.name || "",
      category: item.category || "",
      logoSrc: item.logoSrc || "",
    });
    setShowUrlInput(false);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingItem(null);
  };

  const handleImageFile = (file: File) => {
    if (!file || !file.type.startsWith("image/")) {
      alert("Please upload a valid image file (PNG, JPG, SVG, WEBP). Transparent PNG recommended.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      const img = new window.Image();
      img.onload = () => {
        // Optimize logo size: max 600px width/height while keeping transparency
        const maxDim = 600;
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const resized = canvas.toDataURL("image/png");
          setForm((prev) => ({ ...prev, logoSrc: resized }));
        } else {
          setForm((prev) => ({ ...prev, logoSrc: dataUrl }));
        }
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim()) {
      showToast("Partner / Brand name is required", "error");
      return;
    }

    if (editingItem) {
      updatePartner(editingItem.id, {
        name: form.name.trim(),
        category: form.category.trim(),
        logoSrc: form.logoSrc.trim(),
      });
      showToast(`Updated "${form.name.trim()}" successfully!`);
    } else {
      addPartner({
        name: form.name.trim(),
        category: form.category.trim(),
        logoSrc: form.logoSrc.trim(),
      });
      showToast(`Added "${form.name.trim()}" to platform partners!`);
    }

    closeModal();
  };

  const totalCount = partners.length;
  const isLoopMode = totalCount > 6;

  return (
    <div className="space-y-6">
      {/* Header Information Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-xs">
        <div>
          <h3 className="text-lg font-bold text-slate-900 font-figtree">
            Strategic Platform &amp; Software Partners
          </h3>
          <p className="text-xs text-slate-500 font-manrope mt-1">
            Display company and tool partner logos on the homepage.
          </p>
          <div className="flex flex-wrap items-center gap-2 mt-3">
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-figtree">
              {totalCount} Total Logo{totalCount === 1 ? "" : "s"}
            </span>
            <span
              className={`text-[11px] font-bold px-2.5 py-1 rounded-full font-figtree flex items-center gap-1.5 ${
                isLoopMode
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                  : "bg-blue-50 text-blue-700 border border-blue-200/60"
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isLoopMode ? "bg-emerald-500 animate-pulse" : "bg-blue-500"}`} />
              Display Mode: {isLoopMode ? "Continuous Infinite Loop (7+ Logos)" : "Centered Layout (1–6 Logos)"}
            </span>
          </div>
        </div>

        <button
          onClick={openAddModal}
          className="px-5 py-2.5 rounded-full bg-[#1D61E7] hover:bg-[#1554C0] active:scale-[0.98] text-white font-bold text-xs sm:text-sm font-figtree transition-all flex items-center gap-2 shrink-0 cursor-pointer shadow-md shadow-blue-500/20 self-start sm:self-auto"
        >
          <FiPlus size={16} />
          <span>Add Partner Logo</span>
        </button>
      </div>

      {/* Mode Tip Notice */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 font-manrope">
        <FiInfo size={16} className="text-[#1D61E7] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Smart Layout Logic:</strong> When <strong>1 to 6 logos</strong> are uploaded, they are centered cleanly on the homepage (even a single logo will sit right in the center). When you have <strong>more than 6 logos</strong>, the section automatically turns into a smooth, infinite sliding loop from left to right.
        </p>
      </div>

      {/* Empty State */}
      {totalCount === 0 ? (
        <div className="bg-white border border-slate-100 rounded-3xl p-12 text-center flex flex-col items-center justify-center space-y-3 shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#1D61E7] flex items-center justify-center">
            <FiAward size={28} />
          </div>
          <h4 className="text-base font-bold text-slate-900 font-figtree">
            No partner logos added yet
          </h4>
          <p className="text-xs text-slate-500 max-w-sm font-manrope">
            Add platform partners like QuickBooks, Gusto, Xero, IRS e-File, or ADP to build credibility.
          </p>
          <button
            onClick={openAddModal}
            className="mt-2 px-5 py-2 rounded-full bg-[#1D61E7] hover:bg-[#1554C0] text-white text-xs font-bold font-figtree cursor-pointer transition-all shadow-md shadow-blue-500/20"
          >
            Add First Partner
          </button>
        </div>
      ) : (
        /* Partners Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {partners.map((partner, idx) => (
            <div
              key={partner.id ? `${partner.id}-${idx}` : `partner-${idx}`}
              className="bg-white rounded-2xl border border-slate-100 p-4 sm:p-5 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Logo Preview Container */}
                <div className="h-20 w-full rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center p-3 mb-3.5 relative overflow-hidden group-hover:bg-[#F8FAFC] transition-colors">
                  {partner.logoSrc ? (
                    <img
                      src={partner.logoSrc}
                      alt={partner.name}
                      className="max-h-12 max-w-[140px] object-contain"
                    />
                  ) : (
                    <div className="flex items-center gap-1.5 text-slate-400 font-semibold text-xs font-figtree">
                      <FiAward size={16} />
                      <span>{partner.name}</span>
                    </div>
                  )}
                </div>

                {/* Details */}
                <h4 className="font-extrabold text-slate-900 text-sm font-figtree truncate">
                  {partner.name}
                </h4>
                {partner.category ? (
                  <p className="text-xs text-[#2D503B] font-semibold font-manrope mt-0.5 truncate">
                    {partner.category}
                  </p>
                ) : (
                  <p className="text-xs text-slate-400 font-manrope mt-0.5">
                    Platform Partner
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-3.5 mt-3.5 border-t border-slate-100">
                <button
                  onClick={() => openEditModal(partner)}
                  className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-[#1D61E7] cursor-pointer transition-colors font-figtree"
                >
                  <FiEdit size={13} />
                  <span>Edit</span>
                </button>

                <button
                  onClick={() => {
                    if (window.confirm(`Delete partner "${partner.name}"?`)) {
                      deletePartner(partner.id);
                      showToast(`Removed "${partner.name}"`);
                    }
                  }}
                  className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-rose-600 cursor-pointer transition-colors font-figtree"
                >
                  <FiTrash2 size={13} />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Partner Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 font-figtree">
                {editingItem ? "Edit Partner Logo" : "Add Partner Logo"}
              </h3>
              <button
                onClick={closeModal}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSave} className="space-y-4 mt-5">
              {/* Partner Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 font-figtree mb-1.5">
                  Brand / Company Name *
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. QuickBooks, Gusto, Xero, IRS e-File"
                  required
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-[#1D61E7] font-manrope"
                />
              </div>

              {/* Partner Category / Tagline */}
              <div>
                <label className="block text-xs font-bold text-slate-700 font-figtree mb-1.5">
                  Category / Specialization (Optional)
                </label>
                <input
                  type="text"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  placeholder="e.g. Accounting ProAdvisor, Payroll Partner"
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-[#1D61E7] font-manrope"
                />
              </div>

              {/* Logo Upload Section */}
              <div>
                <label className="block text-xs font-bold text-slate-700 font-figtree mb-1.5">
                  Partner Logo Image
                </label>

                {/* Drag & Drop Upload Container */}
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    const file = e.dataTransfer.files?.[0];
                    if (file) handleImageFile(file);
                  }}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                    isDragging
                      ? "border-[#1D61E7] bg-blue-50/50"
                      : "border-slate-200 hover:border-slate-300 bg-slate-50/50"
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageFile(file);
                    }}
                    className="hidden"
                  />

                  {form.logoSrc ? (
                    <div className="flex flex-col items-center gap-2">
                      <div className="h-16 w-full max-w-[200px] flex items-center justify-center bg-white p-2 rounded-xl shadow-xs border border-slate-100">
                        <img
                          src={form.logoSrc}
                          alt="Preview"
                          className="max-h-12 max-w-full object-contain"
                        />
                      </div>
                      <p className="text-[11px] text-[#1D61E7] font-semibold mt-1">
                        Click or drag to replace image
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-slate-500">
                      <div className="w-10 h-10 rounded-full bg-blue-50 text-[#1D61E7] flex items-center justify-center">
                        <FiUploadCloud size={20} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-700 font-figtree">
                          Click to upload logo or drag and drop
                        </p>
                        <p className="text-[11px] text-slate-400 font-manrope mt-0.5">
                          PNG with transparent background recommended (Max 2MB)
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Option to toggle direct URL input */}
                <div className="mt-2 text-right">
                  <button
                    type="button"
                    onClick={() => setShowUrlInput(!showUrlInput)}
                    className="text-[11px] text-[#1D61E7] hover:underline font-semibold inline-flex items-center gap-1 cursor-pointer font-figtree"
                  >
                    <FiLink size={11} />
                    <span>{showUrlInput ? "Hide image URL input" : "Or use image URL"}</span>
                  </button>
                </div>

                {showUrlInput && (
                  <div className="mt-2">
                    <input
                      type="url"
                      value={form.logoSrc}
                      onChange={(e) => setForm({ ...form, logoSrc: e.target.value })}
                      placeholder="https://example.com/logo.png or /partners/logoipsum-414.png"
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#1D61E7] font-mono"
                    />
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer transition-colors font-figtree"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#1D61E7] hover:bg-[#1554C0] text-white text-xs font-bold font-figtree transition-all shadow-md shadow-blue-500/20 cursor-pointer flex items-center gap-1.5"
                >
                  <FiCheck size={14} />
                  <span>{editingItem ? "Save Changes" : "Add Partner"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
