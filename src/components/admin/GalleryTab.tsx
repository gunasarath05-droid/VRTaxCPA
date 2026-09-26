"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  FiPlus,
  FiEdit,
  FiTrash2,
  FiSearch,
  FiImage,
  FiMapPin,
  FiCalendar,
  FiX,
  FiUploadCloud,
  FiLink,
  FiSave,
} from "react-icons/fi";
import { galleryCategories } from "@/constants/galleryData";

interface GalleryTabProps {
  gallery: any[];
  addGalleryItem: (item: any) => any;
  updateGalleryItem: (id: string, item: any) => any;
  deleteGalleryItem: (id: string) => void;
  showToast: (msg: string, type?: "success" | "error" | "info") => void;
}

export default function GalleryTab({
  gallery,
  addGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  showToast,
}: GalleryTabProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  // Form State
  const [form, setForm] = useState({
    title: "",
    category: "Office & Firm",
    categoryId: "office",
    image: "",
    date: "",
    location: "3035 Ivy Hill Lane, Irving, TX",
    description: "",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);

  const openAddModal = () => {
    setEditingItem(null);
    setForm({
      title: "",
      category: "Office & Firm",
      categoryId: "office",
      image: "",
      date: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
      location: "3035 Ivy Hill Lane, Irving, TX",
      description: "",
    });
    setShowUrlInput(false);
    setModalOpen(true);
  };

  const openEditModal = (item: any) => {
    setEditingItem(item);
    setForm({
      title: item.title || "",
      category: item.category || "Office & Firm",
      categoryId: item.categoryId || "office",
      image: item.image || "",
      date: item.date || "",
      location: item.location || "",
      description: item.description || "",
    });
    setShowUrlInput(false);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingItem(null);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = galleryCategories.find((c) => c.name === e.target.value);
    setForm({
      ...form,
      category: e.target.value,
      categoryId: selected ? selected.id : "office",
    });
  };

  const handleImageFile = (file: File) => {
    if (!file || !file.type.startsWith("image/")) {
      alert("Please upload a valid image file (PNG, JPG, JPEG, WEBP).");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      const img = new window.Image();
      img.onload = () => {
        // Resize to maximum 1200px width/height for sharp display & optimal storage
        const maxDim = 1200;
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
          const resized = canvas.toDataURL("image/jpeg", 0.85);
          setForm((prev) => ({ ...prev, image: resized }));
        } else {
          setForm((prev) => ({ ...prev, image: dataUrl }));
        }
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.image) {
      alert("Please provide both a Title and Photo for this moment.");
      return;
    }

    if (editingItem) {
      updateGalleryItem(editingItem.id, form);
      showToast(`Updated "${form.title}"!`);
    } else {
      addGalleryItem(form);
      showToast(`Added "${form.title}" to gallery!`);
    }

    closeModal();
  };

  const handleDelete = (item: any) => {
    if (confirm(`Are you sure you want to remove "${item.title}" from the gallery?`)) {
      deleteGalleryItem(item.id);
      showToast(`Removed "${item.title}" from gallery.`);
    }
  };

  const filteredItems = (gallery || []).filter((item: any) => {
    const matchesCategory = activeCategory === "all" || item.categoryId === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      item.title?.toLowerCase().includes(q) ||
      item.location?.toLowerCase().includes(q) ||
      item.description?.toLowerCase().includes(q) ||
      item.category?.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search moments by title, category, location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-manrope placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1D61E7] focus:border-transparent transition-all shadow-xs"
          />
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
        </div>

        {/* Add Moment Button */}
        <button
          onClick={openAddModal}
          className="px-6 py-2.5 rounded-full bg-[#1D61E7] hover:bg-[#1554C0] active:scale-[0.98] text-white font-bold text-sm font-figtree transition-all flex items-center gap-2 self-start sm:self-auto cursor-pointer shadow-md shadow-blue-500/20"
        >
          <FiPlus size={16} />
          <span>Add Moment</span>
        </button>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2 pt-1">
        {galleryCategories.map((cat) => {
          const count =
            cat.id === "all"
              ? (gallery || []).length
              : (gallery || []).filter((item: any) => item.categoryId === cat.id).length;

          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold font-figtree transition-all cursor-pointer flex items-center gap-1.5 ${
                activeCategory === cat.id
                  ? "bg-[#0B1F3B] text-white shadow-xs"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              <span>{cat.name}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  activeCategory === cat.id ? "bg-[#d3d663] text-[#0B1F3B]" : "bg-slate-100 text-slate-500"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Moments Grid */}
      {filteredItems.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-3xl p-12 text-center flex flex-col items-center justify-center space-y-3 shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#1D61E7] flex items-center justify-center">
            <FiImage size={28} />
          </div>
          <h4 className="text-base font-bold text-slate-900 font-figtree">No photos found</h4>
          <p className="text-xs text-slate-500 max-w-sm font-manrope">
            {searchQuery
              ? "No moments match your current search query."
              : "Start by adding photos of your office, client meetings, or firm events."}
          </p>
          <button
            onClick={openAddModal}
            className="mt-2 px-5 py-2 rounded-full bg-[#1D61E7] hover:bg-[#1554C0] text-white text-xs font-bold font-figtree cursor-pointer transition-all shadow-md shadow-blue-500/20"
          >
            Add First Moment
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredItems.map((item: any) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Photo Image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                />
                <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-md text-[#0B1F3B] text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full font-figtree shadow-xs">
                  {item.category}
                </span>

                {/* Edit & Delete Action Buttons Overlay */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => openEditModal(item)}
                    className="w-8 h-8 rounded-full bg-white/90 hover:bg-[#1D61E7] text-slate-700 hover:text-white flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                    title="Edit moment"
                  >
                    <FiEdit size={13} />
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
                    className="w-8 h-8 rounded-full bg-white/90 hover:bg-rose-600 text-slate-700 hover:text-white flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                    title="Delete moment"
                  >
                    <FiTrash2 size={13} />
                  </button>
                </div>
              </div>

              {/* Photo Details */}
              <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 gap-2.5">
                <div>
                  <h4 className="text-sm sm:text-base font-bold font-figtree text-slate-900 leading-snug group-hover:text-[#1D61E7] transition-colors line-clamp-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 font-manrope leading-relaxed line-clamp-2 mt-1">
                    {item.description}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-manrope">
                  <span className="flex items-center gap-1 truncate max-w-[170px]">
                    <FiMapPin size={11} className="text-[#1D61E7] shrink-0" />
                    <span className="truncate">{item.location}</span>
                  </span>
                  <span className="flex items-center gap-1 shrink-0">
                    <FiCalendar size={11} />
                    <span>{item.date}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Moment Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs">
          <div className="relative max-w-xl w-full bg-white rounded-3xl border border-slate-200 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/60">
              <h3 className="text-base sm:text-lg font-bold font-figtree text-slate-900">
                {editingItem ? "Edit Gallery Moment" : "Add New Moment"}
              </h3>
              <button
                onClick={closeModal}
                className="w-8 h-8 rounded-full bg-slate-200/70 hover:bg-slate-300 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-4">
              {/* Photo Upload / Preview */}
              <div>
                <label className="block text-xs font-bold text-slate-700 font-figtree mb-1.5 uppercase tracking-wider">
                  Photo <span className="text-rose-500">*</span>
                </label>

                {form.image ? (
                  <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 group">
                    <Image
                      src={form.image}
                      alt="Preview"
                      fill
                      className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3.5 py-1.5 rounded-lg bg-white text-slate-800 text-xs font-bold font-figtree shadow-md hover:bg-slate-100 cursor-pointer"
                      >
                        Change Photo
                      </button>
                      <button
                        type="button"
                        onClick={() => setForm({ ...form, image: "" })}
                        className="px-3.5 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-bold font-figtree shadow-md hover:bg-rose-700 cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDragging(false);
                      if (e.dataTransfer.files?.[0]) {
                        handleImageFile(e.dataTransfer.files[0]);
                      }
                    }}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-colors flex flex-col items-center justify-center gap-2 ${
                      isDragging ? "border-[#1D61E7] bg-blue-50/50" : "border-slate-300 hover:border-[#1D61E7]"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-[#1D61E7] flex items-center justify-center">
                      <FiUploadCloud size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800 font-figtree">
                        Click to upload or drag &amp; drop
                      </p>
                      <p className="text-[11px] text-slate-400 font-manrope mt-0.5">
                        PNG, JPG, or WEBP (auto-compressed)
                      </p>
                    </div>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      handleImageFile(e.target.files[0]);
                    }
                  }}
                  className="hidden"
                />

                {/* Paste URL toggle */}
                <div className="mt-2 flex items-center justify-between text-xs">
                  <button
                    type="button"
                    onClick={() => setShowUrlInput(!showUrlInput)}
                    className="text-[#1D61E7] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                  >
                    <FiLink size={12} />
                    <span>{showUrlInput ? "Hide image URL input" : "Or enter image web URL"}</span>
                  </button>
                </div>

                {showUrlInput && (
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                    className="w-full mt-2 px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#1D61E7]"
                  />
                )}
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-slate-700 font-figtree mb-1.5 uppercase tracking-wider">
                  Moment Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Irving Client Strategy Session"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-manrope focus:outline-none focus:ring-2 focus:ring-[#1D61E7]"
                />
              </div>

              {/* Category & Date in 2 columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 font-figtree mb-1.5 uppercase tracking-wider">
                    Category
                  </label>
                  <select
                    value={form.category}
                    onChange={handleCategoryChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-manrope focus:outline-none focus:ring-2 focus:ring-[#1D61E7] bg-white cursor-pointer"
                  >
                    {galleryCategories
                      .filter((c) => c.id !== "all")
                      .map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 font-figtree mb-1.5 uppercase tracking-wider">
                    Date
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. January 2026"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-manrope focus:outline-none focus:ring-2 focus:ring-[#1D61E7]"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-bold text-slate-700 font-figtree mb-1.5 uppercase tracking-wider">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="e.g. 3035 Ivy Hill Lane, Irving, TX"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-manrope focus:outline-none focus:ring-2 focus:ring-[#1D61E7]"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 font-figtree mb-1.5 uppercase tracking-wider">
                  Caption / Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Provide a short description of this moment..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-manrope focus:outline-none focus:ring-2 focus:ring-[#1D61E7]"
                />
              </div>

              {/* Footer Buttons */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold font-figtree hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#1D61E7] hover:bg-[#1554C0] text-white text-xs font-bold font-figtree flex items-center gap-2 cursor-pointer transition-all shadow-md shadow-blue-500/20"
                >
                  <FiSave size={14} />
                  <span>{editingItem ? "Save Changes" : "Publish to Gallery"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
