"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  FiSearch,
  FiEdit,
  FiTrash2,
  FiPlus,
  FiExternalLink,
  FiGrid,
  FiX,
  FiSave,
  FiUploadCloud,
  FiImage,
  FiLink,
  FiRotateCcw,
} from "react-icons/fi";
import { defaultIcons, defaultImages } from "@/sections/Home/services";

interface HomeServiceItem {
  id?: string;
  no: string;
  title: string;
  desc: string;
  slug: string;
  iconImg?: any;
  image?: any;
}

interface HomeServicesTabProps {
  homeServices: HomeServiceItem[];
  updateHomeService: (idOrSlug: string, fields: any) => any;
  addHomeService: (item: any) => any;
  deleteHomeService: (idOrSlug: string) => void;
  showToast: (msg: string, type?: "success" | "error" | "info") => void;
}

const getMediaSrc = (media: any): string => {
  if (!media) return "";
  if (typeof media === "string") return media;
  if (typeof media === "object" && media.src) return media.src;
  return "";
};

export default function HomeServicesTab({
  homeServices,
  updateHomeService,
  addHomeService,
  deleteHomeService,
  showToast,
}: HomeServicesTabProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentIdOrSlug, setCurrentIdOrSlug] = useState<string | null>(null);

  const [form, setForm] = useState<HomeServiceItem>({
    no: "01",
    title: "",
    desc: "",
    slug: "",
    iconImg: "",
    image: "",
  });

  // URL input toggles
  const [showIconUrl, setShowIconUrl] = useState(false);
  const [showImageUrl, setShowImageUrl] = useState(false);

  const iconFileInputRef = useRef<HTMLInputElement>(null);
  const imageFileInputRef = useRef<HTMLInputElement>(null);

  const list = homeServices || [];

  const filteredList = list.filter((item) => {
    const q = searchQuery.toLowerCase();
    return (
      item.title?.toLowerCase().includes(q) ||
      item.slug?.toLowerCase().includes(q) ||
      item.desc?.toLowerCase().includes(q) ||
      item.no?.toLowerCase().includes(q)
    );
  });

  const openAddModal = () => {
    setIsEditing(false);
    setCurrentIdOrSlug(null);
    const nextNum = list.length + 1;
    const formattedNum = nextNum < 10 ? `0${nextNum}` : `${nextNum}`;
    setForm({
      no: formattedNum,
      title: "",
      desc: "",
      slug: "",
      iconImg: "",
      image: "",
    });
    setShowIconUrl(false);
    setShowImageUrl(false);
    setModalOpen(true);
  };

  const openEditModal = (item: HomeServiceItem) => {
    setIsEditing(true);
    setCurrentIdOrSlug(item.id || item.slug);
    setForm({
      id: item.id,
      no: item.no || "01",
      title: item.title || "",
      desc: item.desc || "",
      slug: item.slug || "",
      iconImg: item.iconImg || "",
      image: item.image || "",
    });
    setShowIconUrl(false);
    setShowImageUrl(false);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentIdOrSlug(null);
  };

  const handleTitleChange = (val: string) => {
    setForm((prev) => {
      const updated = { ...prev, title: val };
      if (!isEditing && !prev.slug) {
        updated.slug = val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "");
      }
      return updated;
    });
  };

  // Image & Icon File Handlers (with canvas resize)
  const handleIconFile = (file: File) => {
    if (!file || !file.type.startsWith("image/")) {
      alert("Please upload a valid image file (PNG, SVG, WEBP, JPG).");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      const img = new window.Image();
      img.onload = () => {
        const maxDim = 256;
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
          setForm((prev) => ({ ...prev, iconImg: resized }));
        } else {
          setForm((prev) => ({ ...prev, iconImg: dataUrl }));
        }
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  };

  const handleIllustrationFile = (file: File) => {
    if (!file || !file.type.startsWith("image/")) {
      alert("Please upload a valid image file (PNG, JPG, WEBP).");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      const img = new window.Image();
      img.onload = () => {
        const maxDim = 800;
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
          setForm((prev) => ({ ...prev, image: resized }));
        } else {
          setForm((prev) => ({ ...prev, image: dataUrl }));
        }
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.desc.trim()) {
      showToast("Please enter a title and description.", "error");
      return;
    }

    const slug =
      form.slug.trim() ||
      form.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    const payload = {
      ...form,
      slug,
      no: form.no.trim() || "01",
    };

    if (isEditing && currentIdOrSlug) {
      updateHomeService(currentIdOrSlug, payload);
      showToast(`Updated "${payload.title}" successfully!`, "success");
    } else {
      addHomeService(payload);
      showToast(`Added "${payload.title}" to homepage services!`, "success");
    }

    closeModal();
  };

  const handleDelete = (item: HomeServiceItem) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${item.title}" from the homepage services cards?`
    );
    if (!confirmDelete) return;

    deleteHomeService(item.id || item.slug);
    showToast(`Removed "${item.title}"`, "info");
  };

  return (
    <div className="space-y-6">
      {/* Informative Header Banner */}
      <div className="bg-gradient-to-r from-emerald-50 via-teal-50/50 to-white border border-emerald-200/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
            <FiGrid size={20} />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold font-figtree text-slate-900">
              Homepage Services Cards
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-manrope mt-0.5">
              Manage the 8 interactive accordion service cards shown on the Home page, including custom icons &amp; illustrations.
            </p>
          </div>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2.5 rounded-xl bg-[#0B1F3B] hover:bg-[#1D61E7] text-white text-xs sm:text-sm font-bold font-figtree transition-all shadow-xs hover:shadow-md flex items-center gap-2 cursor-pointer shrink-0"
        >
          <FiPlus size={16} />
          <span>Add Service Card</span>
        </button>
      </div>

      {/* Search Bar & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search home cards by title, number, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-manrope placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1D61E7] focus:border-transparent transition-all shadow-xs"
          />
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
        </div>

        <span className="text-xs font-bold text-slate-500 font-figtree">
          Total Cards: <strong className="text-slate-900">{list.length}</strong>
        </span>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredList.map((item, index) => {
          const effectiveIcon = item.iconImg || (defaultIcons as any)[item.slug];
          const effectiveImage = item.image || (defaultImages as any)[item.slug];
          const iconSrc = getMediaSrc(effectiveIcon);
          const imageSrc = getMediaSrc(effectiveImage);

          return (
            <div
              key={item.id || item.slug || index}
              className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-lg transition-all duration-300 p-5 flex flex-col justify-between gap-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-[#0B1F3B] text-[#d3d663] flex items-center justify-center font-bold text-sm font-mono shrink-0 shadow-xs">
                      {item.no || `0${index + 1}`}
                    </div>
                    <span className="text-xs font-mono font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                      /{item.slug}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Link
                      href={`/services/${item.slug}`}
                      target="_blank"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-[#1D61E7] hover:bg-blue-50 transition-colors"
                      title="View linked service page"
                    >
                      <FiExternalLink size={15} />
                    </Link>
                    <button
                      onClick={() => openEditModal(item)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-[#1D61E7] hover:bg-blue-50 transition-colors cursor-pointer"
                      title="Edit card"
                    >
                      <FiEdit size={15} />
                    </button>
                    <button
                      onClick={() => handleDelete(item)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                      title="Delete card"
                    >
                      <FiTrash2 size={15} />
                    </button>
                  </div>
                </div>

                {/* Media Preview Strip */}
                <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-11 h-11 rounded-lg bg-white border border-slate-200 flex items-center justify-center p-1.5 shrink-0 overflow-hidden shadow-2xs">
                    {iconSrc ? (
                      <img src={iconSrc} alt="Icon" className="w-full h-full object-contain" />
                    ) : (
                      <FiGrid className="text-slate-300" size={20} />
                    )}
                  </div>
                  <div className="h-11 flex-1 rounded-lg bg-white border border-slate-200 flex items-center justify-center p-1 overflow-hidden relative shadow-2xs">
                    {imageSrc ? (
                      <img src={imageSrc} alt="Illustration" className="w-full h-full object-contain" />
                    ) : (
                      <FiImage className="text-slate-300" size={20} />
                    )}
                  </div>
                  <div className="flex flex-col text-[10px] text-slate-500 font-figtree">
                    <span className={item.iconImg ? "text-emerald-700 font-semibold" : "text-slate-400"}>
                      {item.iconImg ? "✓ Custom Icon" : "• Default Icon"}
                    </span>
                    <span className={item.image ? "text-emerald-700 font-semibold" : "text-slate-400"}>
                      {item.image ? "✓ Custom Image" : "• Default Image"}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-bold font-figtree text-slate-900 group-hover:text-[#1D61E7] transition-colors leading-snug">
                    {item.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 font-manrope leading-relaxed line-clamp-3">
                  {item.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-medium text-slate-400 font-figtree">
                  Position: #{item.no || index + 1}
                </span>
                <button
                  onClick={() => openEditModal(item)}
                  className="text-xs font-bold text-[#1D61E7] hover:text-[#0B1F3B] font-figtree flex items-center gap-1 cursor-pointer"
                >
                  <span>Edit Details</span>
                  <span>&rarr;</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredList.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200">
          <p className="text-sm text-slate-500 font-manrope">No services cards found matching your query.</p>
        </div>
      )}

      {/* Edit / Add Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs">
          <div className="relative max-w-2xl w-full bg-white rounded-3xl border border-slate-200 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/60">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#0B1F3B] text-[#d3d663] flex items-center justify-center font-bold text-xs">
                  <FiGrid size={15} />
                </div>
                <h3 className="text-base font-bold font-figtree text-slate-900">
                  {isEditing ? `Edit Service Card: ${form.title}` : "Add New Homepage Service Card"}
                </h3>
              </div>
              <button
                onClick={closeModal}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-1">
                  <label className="block text-xs font-bold font-figtree text-slate-700 uppercase tracking-wider mb-1.5">
                    Card Number (e.g. 01)
                  </label>
                  <input
                    type="text"
                    value={form.no}
                    onChange={(e) => setForm({ ...form, no: e.target.value })}
                    placeholder="01"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#1D61E7]"
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold font-figtree text-slate-700 uppercase tracking-wider mb-1.5">
                    Service Title
                  </label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. Tax Compliance"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-manrope focus:outline-none focus:ring-2 focus:ring-[#1D61E7]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold font-figtree text-slate-700 uppercase tracking-wider mb-1.5">
                  Page Slug (URL destination)
                </label>
                <div className="flex items-center rounded-xl border border-slate-200 overflow-hidden focus-within:ring-2 focus-within:ring-[#1D61E7]">
                  <span className="bg-slate-50 px-3 py-2.5 text-xs font-mono text-slate-400 border-r border-slate-200">
                    /services/
                  </span>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    placeholder="tax-compliance"
                    className="flex-1 px-3.5 py-2.5 text-sm font-mono focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold font-figtree text-slate-700 uppercase tracking-wider mb-1.5">
                  Card Description (Short Summary on Homepage)
                </label>
                <textarea
                  rows={3}
                  value={form.desc}
                  onChange={(e) => setForm({ ...form, desc: e.target.value })}
                  placeholder="Accurate and timely federal and Texas tax return preparation..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-manrope focus:outline-none focus:ring-2 focus:ring-[#1D61E7]"
                  required
                />
              </div>

              {/* ── Icon & Illustration Upload Section ── */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {/* 1. Service Icon */}
                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold font-figtree text-slate-800 uppercase tracking-wider">
                      Service Icon
                    </label>
                    {form.iconImg && (
                      <button
                        type="button"
                        onClick={() => setForm({ ...form, iconImg: "" })}
                        className="text-[11px] text-rose-600 hover:underline flex items-center gap-1 font-figtree cursor-pointer"
                      >
                        <FiRotateCcw size={11} />
                        <span>Use Default</span>
                      </button>
                    )}
                  </div>

                  {/* Icon Preview */}
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 rounded-xl bg-white border border-slate-200 flex items-center justify-center p-2 shrink-0 shadow-xs overflow-hidden">
                      {form.iconImg || (defaultIcons as any)[form.slug] ? (
                        <img
                          src={getMediaSrc(form.iconImg || (defaultIcons as any)[form.slug])}
                          alt="Icon Preview"
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <FiGrid className="text-slate-300" size={24} />
                      )}
                    </div>
                    <div className="flex-1 space-y-1.5">
                      <input
                        type="file"
                        ref={iconFileInputRef}
                        accept="image/png, image/svg+xml, image/webp, image/jpeg"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleIconFile(file);
                        }}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => iconFileInputRef.current?.click()}
                        className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-[#1D61E7] text-slate-700 hover:text-[#1D61E7] text-xs font-bold font-figtree transition-all flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
                      >
                        <FiUploadCloud size={14} />
                        <span>Upload Icon</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setShowIconUrl(!showIconUrl)}
                        className="w-full text-center text-[11px] text-slate-500 hover:text-[#1D61E7] font-figtree transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <FiLink size={11} />
                        <span>{showIconUrl ? "Hide URL Option" : "Enter Image URL"}</span>
                      </button>
                    </div>
                  </div>

                  {showIconUrl && (
                    <input
                      type="text"
                      placeholder="https://example.com/icon.png"
                      value={typeof form.iconImg === "string" ? form.iconImg : ""}
                      onChange={(e) => setForm({ ...form, iconImg: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#1D61E7] bg-white font-mono"
                    />
                  )}
                  <p className="text-[11px] text-slate-400 font-manrope">
                    Transparent PNG or SVG recommended.
                  </p>
                </div>

                {/* 2. Card Illustration */}
                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold font-figtree text-slate-800 uppercase tracking-wider">
                      Card Illustration
                    </label>
                    {form.image && (
                      <button
                        type="button"
                        onClick={() => setForm({ ...form, image: "" })}
                        className="text-[11px] text-rose-600 hover:underline flex items-center gap-1 font-figtree cursor-pointer"
                      >
                        <FiRotateCcw size={11} />
                        <span>Use Default</span>
                      </button>
                    )}
                  </div>

                  {/* Illustration Preview */}
                  <div className="flex items-center gap-3">
                    <div className="w-20 h-16 rounded-xl bg-white border border-slate-200 flex items-center justify-center p-1.5 shrink-0 shadow-xs overflow-hidden">
                      {form.image || (defaultImages as any)[form.slug] ? (
                        <img
                          src={getMediaSrc(form.image || (defaultImages as any)[form.slug])}
                          alt="Illustration Preview"
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <FiImage className="text-slate-300" size={24} />
                      )}
                    </div>
                    <div className="flex-1 space-y-1.5">
                      <input
                        type="file"
                        ref={imageFileInputRef}
                        accept="image/png, image/jpeg, image/webp"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleIllustrationFile(file);
                        }}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => imageFileInputRef.current?.click()}
                        className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-[#1D61E7] text-slate-700 hover:text-[#1D61E7] text-xs font-bold font-figtree transition-all flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
                      >
                        <FiUploadCloud size={14} />
                        <span>Upload Image</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setShowImageUrl(!showImageUrl)}
                        className="w-full text-center text-[11px] text-slate-500 hover:text-[#1D61E7] font-figtree transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <FiLink size={11} />
                        <span>{showImageUrl ? "Hide URL Option" : "Enter Image URL"}</span>
                      </button>
                    </div>
                  </div>

                  {showImageUrl && (
                    <input
                      type="text"
                      placeholder="https://example.com/illustration.png"
                      value={typeof form.image === "string" ? form.image : ""}
                      onChange={(e) => setForm({ ...form, image: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#1D61E7] bg-white font-mono"
                    />
                  )}
                  <p className="text-[11px] text-slate-400 font-manrope">
                    High-res PNG or JPEG (shows on active card).
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded-xl text-xs font-bold font-figtree text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0B1F3B] hover:bg-[#1D61E7] text-white text-xs font-bold font-figtree transition-all shadow-xs hover:shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <FiSave size={14} />
                  <span>{isEditing ? "Save Changes" : "Add Service Card"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
