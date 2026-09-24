"use client";

import React, { useRef, useState } from "react";
import { FiX, FiUploadCloud, FiTrash2, FiImage, FiLink, FiCheck } from "react-icons/fi";

/* ─────────────────────────────────────────────────────────────────────────
   TEAM MODAL
───────────────────────────────────────────────────────────────────────── */
interface TeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingMember: any;
  teamForm: { name: string; role: string; image: string; bgColor: string };
  setTeamForm: React.Dispatch<
    React.SetStateAction<{ name: string; role: string; image: string; bgColor: string }>
  >;
  onSave: (e: React.FormEvent) => void;
}

export function TeamModal({
  isOpen,
  onClose,
  editingMember,
  teamForm,
  setTeamForm,
  onSave,
}: TeamModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);

  if (!isOpen) return null;

  const processImageFile = (file: File) => {
    if (!file || !file.type.startsWith("image/")) {
      alert("Please upload a valid image file (PNG, JPG, JPEG, WEBP).");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      const img = new window.Image();
      img.onload = () => {
        // Resize to maximum 600px dimension for sharp display & compact localStorage footprint
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
          const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.88);
          setTeamForm((prev) => ({ ...prev, image: compressedDataUrl }));
        } else {
          setTeamForm((prev) => ({ ...prev, image: dataUrl }));
        }
      };
      img.onerror = () => {
        setTeamForm((prev) => ({ ...prev, image: dataUrl }));
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processImageFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border border-slate-100 rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-black text-[#0B1F3B] text-base sm:text-lg font-figtree">
              {editingMember ? "Edit Team Member" : "Add New Team Member"}
            </h3>
            <p className="text-xs text-slate-500 font-manrope mt-0.5">
              Set member details and profile photo
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-[#0B1F3B] p-1.5 rounded-full hover:bg-slate-100 cursor-pointer transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={onSave} className="space-y-4">
          {/* Member Name */}
          <div>
            <label className="block text-xs font-bold text-[#0B1F3B] uppercase mb-1.5 font-figtree tracking-wide">
              Member Name
            </label>
            <input
              type="text"
              required
              value={teamForm.name}
              onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value })}
              placeholder="e.g. Cameron William"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B1F3B]/20 focus:border-[#0B1F3B] transition-all font-manrope font-medium"
            />
          </div>

          {/* Role / Title */}
          <div>
            <label className="block text-xs font-bold text-[#0B1F3B] uppercase mb-1.5 font-figtree tracking-wide">
              Role / Title
            </label>
            <input
              type="text"
              required
              value={teamForm.role}
              onChange={(e) => setTeamForm({ ...teamForm, role: e.target.value })}
              placeholder="e.g. Marketing & Tax Lead"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B1F3B]/20 focus:border-[#0B1F3B] transition-all font-manrope font-medium"
            />
          </div>

          {/* Photo Upload Section */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-[#0B1F3B] uppercase font-figtree tracking-wide">
                Profile Photo
              </label>
              <button
                type="button"
                onClick={() => setShowUrlInput(!showUrlInput)}
                className="text-[11px] font-semibold text-slate-500 hover:text-[#0B1F3B] flex items-center gap-1 cursor-pointer transition-colors"
              >
                <FiLink size={11} />
                <span>{showUrlInput ? "Switch to Upload" : "Paste URL instead"}</span>
              </button>
            </div>

            {/* Hidden native file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  processImageFile(e.target.files[0]);
                  e.target.value = "";
                }
              }}
            />

            {showUrlInput ? (
              /* URL Input Mode */
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  {teamForm.image && (
                    <div className="w-11 h-11 rounded-xl overflow-hidden shrink-0 border border-slate-200 shadow-xs bg-slate-100">
                      <img
                        src={teamForm.image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />
                    </div>
                  )}
                  <input
                    type="url"
                    required
                    value={teamForm.image}
                    onChange={(e) => setTeamForm({ ...teamForm, image: e.target.value })}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B1F3B]/20 focus:border-[#0B1F3B] transition-all font-mono"
                  />
                </div>
              </div>
            ) : teamForm.image ? (
              /* Image Uploaded Preview Card */
              <div className="p-3 bg-slate-50/80 border border-slate-200 rounded-2xl flex items-center gap-3.5">
                <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-slate-200 shadow-sm bg-white relative">
                  <img
                    src={teamForm.image}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-[#0B1F3B] truncate font-figtree">
                    Photo Uploaded
                  </p>
                  <p className="text-[11px] text-emerald-600 font-medium flex items-center gap-1 mt-0.5">
                    <FiCheck size={12} /> Ready to save
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-2.5 py-1 text-[11px] font-bold text-[#0B1F3B] bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors cursor-pointer shadow-2xs"
                    >
                      Change Photo
                    </button>
                    <button
                      type="button"
                      onClick={() => setTeamForm({ ...teamForm, image: "" })}
                      className="px-2.5 py-1 text-[11px] font-bold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Drag & Drop Upload Zone */
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                }}
                onDrop={handleDrop}
                className={`w-full p-6 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                  isDragging
                    ? "border-[#0B1F3B] bg-[#0B1F3B]/5 scale-[1.01]"
                    : "border-slate-200 hover:border-[#0B1F3B]/40 hover:bg-slate-50/60 bg-slate-50/40"
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-[#0B1F3B]/5 text-[#0B1F3B] flex items-center justify-center mb-2 shadow-2xs">
                  <FiUploadCloud size={20} />
                </div>
                <p className="text-xs font-bold text-[#0B1F3B] font-figtree">
                  Click to upload photo
                </p>
                <p className="text-[11px] text-slate-500 font-manrope mt-0.5">
                  or drag and drop (PNG, JPG, WEBP)
                </p>
              </div>
            )}
          </div>

          <div className="pt-3 flex items-center justify-end gap-2.5 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer transition-colors font-figtree"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-[#1D61E7] hover:bg-[#1554C0] active:scale-[0.98] text-white font-bold text-xs font-figtree shadow-md shadow-blue-500/20 cursor-pointer transition-all"
            >
              Save Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   TESTIMONIAL MODAL
───────────────────────────────────────────────────────────────────────── */
interface TestimonialModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingTestimonial: any;
  testimonialForm: {
    name: string;
    desig: string;
    desc: string;
    rating: number;
    industry: string;
  };
  setTestimonialForm: React.Dispatch<
    React.SetStateAction<{
      name: string;
      desig: string;
      desc: string;
      rating: number;
      industry: string;
    }>
  >;
  onSave: (e: React.FormEvent) => void;
}

export function TestimonialModal({
  isOpen,
  onClose,
  editingTestimonial,
  testimonialForm,
  setTestimonialForm,
  onSave,
}: TestimonialModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border border-slate-100 rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-black text-[#0B1F3B] text-base sm:text-lg font-figtree">
            {editingTestimonial ? "Edit Testimonial" : "Add New Testimonial"}
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-[#0B1F3B] p-1 cursor-pointer transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={onSave} className="space-y-3.5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#0B1F3B] uppercase mb-1.5 font-figtree">
                Client Name
              </label>
              <input
                type="text"
                required
                value={testimonialForm.name}
                onChange={(e) =>
                  setTestimonialForm({ ...testimonialForm, name: e.target.value })
                }
                placeholder="e.g. Marcus T."
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B1F3B]/20 focus:border-[#0B1F3B]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0B1F3B] uppercase mb-1.5 font-figtree">
                Rating (Stars)
              </label>
              <select
                value={testimonialForm.rating}
                onChange={(e) =>
                  setTestimonialForm({
                    ...testimonialForm,
                    rating: Number(e.target.value),
                  })
                }
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B1F3B]/20 focus:border-[#0B1F3B] cursor-pointer"
              >
                <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                <option value={3}>⭐⭐⭐ (3 Stars)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#0B1F3B] uppercase mb-1.5 font-figtree">
                Designation / Location
              </label>
              <input
                type="text"
                required
                value={testimonialForm.desig}
                onChange={(e) =>
                  setTestimonialForm({ ...testimonialForm, desig: e.target.value })
                }
                placeholder="Real Estate Investor · Irving, TX"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B1F3B]/20 focus:border-[#0B1F3B]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0B1F3B] uppercase mb-1.5 font-figtree">
                Industry Tag
              </label>
              <input
                type="text"
                value={testimonialForm.industry}
                onChange={(e) =>
                  setTestimonialForm({
                    ...testimonialForm,
                    industry: e.target.value,
                  })
                }
                placeholder="e.g. Real Estate"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B1F3B]/20 focus:border-[#0B1F3B]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0B1F3B] uppercase mb-1.5 font-figtree">
              Testimonial Quote
            </label>
            <textarea
              rows={4}
              required
              value={testimonialForm.desc}
              onChange={(e) =>
                setTestimonialForm({ ...testimonialForm, desc: e.target.value })
              }
              placeholder="What did the client say about VR Tax CPA's service?"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B1F3B]/20 focus:border-[#0B1F3B] leading-relaxed"
            />
          </div>

          <div className="pt-3 flex items-center justify-end gap-2.5 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-[#1D61E7] hover:bg-[#1554C0] active:scale-[0.98] text-white font-bold text-xs font-figtree shadow-md shadow-blue-500/20 cursor-pointer transition-all"
            >
              Save Testimonial
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   BLOG MODAL
───────────────────────────────────────────────────────────────────────── */
interface BlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingBlog: any;
  blogForm: {
    title: string;
    slug: string;
    category: string;
    image: string;
    readTime: string;
    summary: string;
    content: string;
    featured: boolean;
    takeawaysText: string;
  };
  setBlogForm: React.Dispatch<
    React.SetStateAction<{
      title: string;
      slug: string;
      category: string;
      image: string;
      readTime: string;
      summary: string;
      content: string;
      featured: boolean;
      takeawaysText: string;
    }>
  >;
  onSave: (e: React.FormEvent) => void;
}

export function BlogModal({
  isOpen,
  onClose,
  editingBlog,
  blogForm,
  setBlogForm,
  onSave,
}: BlogModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [imageInputMode, setImageInputMode] = useState<"upload" | "url">("upload");

  if (!isOpen) return null;

  // Recommended category tags
  const suggestedCategories = [
    "Tax Planning",
    "Tax Compliance",
    "Fractional CFO",
    "Bookkeeping",
    "IRS Resolution",
    "Business Formation",
    "Payroll Setup",
  ];

  // Process uploaded image file with canvas compression
  const processImageFile = (file: File) => {
    if (!file || !file.type.startsWith("image/")) {
      alert("Please select a valid image file (PNG, JPG, WEBP).");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      const img = new window.Image();
      img.onload = () => {
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
          const compressed = canvas.toDataURL("image/jpeg", 0.85);
          setBlogForm((prev) => ({ ...prev, image: compressed }));
        } else {
          setBlogForm((prev) => ({ ...prev, image: dataUrl }));
        }
      };
      img.onerror = () => {
        setBlogForm((prev) => ({ ...prev, image: dataUrl }));
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processImageFile(e.dataTransfer.files[0]);
    }
  };

  // Helper to insert markdown snippet into article body
  const insertMarkdown = (snippet: string) => {
    const current = blogForm.content || "";
    setBlogForm({
      ...blogForm,
      content: current ? `${current}\n\n${snippet}` : snippet,
    });
  };

  // Live word & reading time calculator
  const wordsCount = (blogForm.content || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  const calculatedReadTime = `${Math.max(1, Math.ceil(wordsCount / 180))} min read`;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white border border-slate-100 rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl space-y-5 my-6 max-h-[92vh] overflow-y-auto admin-scroll">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#0B1F3B] bg-slate-100 px-2.5 py-0.5 rounded-full font-mono">
              {editingBlog ? "Edit Mode" : "New Post"}
            </span>
            <h3 className="font-extrabold text-[#0B1F3B] text-lg sm:text-xl font-figtree mt-1">
              {editingBlog ? "Edit Blog Article" : "Create New Blog Post"}
            </h3>
            <p className="text-xs text-slate-500 font-manrope mt-0.5">
              Publish educational insights, client resources, and tax planning guides.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-[#0B1F3B] p-2 rounded-full hover:bg-slate-100 cursor-pointer transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={onSave} className="space-y-5">
          {/* Article Title */}
          <div>
            <label className="block text-xs font-bold text-[#0B1F3B] uppercase mb-1.5 font-figtree tracking-wide">
              Article Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={blogForm.title}
              onChange={(e) => {
                const title = e.target.value;
                const autoSlug = !editingBlog
                  ? title
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, "-")
                      .replace(/(^-|-$)/g, "")
                  : blogForm.slug;
                setBlogForm({ ...blogForm, title, slug: autoSlug });
              }}
              placeholder="e.g. 5 Essential Tax Saving Strategies for LLCs"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 text-sm sm:text-base font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B1F3B]/20 focus:border-[#0B1F3B] transition-all font-figtree shadow-2xs"
            />
          </div>

          {/* Slug & Category Row */}
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Slug */}
            <div>
              <label className="block text-xs font-bold text-[#0B1F3B] uppercase mb-1.5 font-figtree tracking-wide">
                URL Slug <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={blogForm.slug}
                onChange={(e) =>
                  setBlogForm({ ...blogForm, slug: e.target.value })
                }
                placeholder="tax-saving-strategies-llc"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 text-xs font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B1F3B]/20 focus:border-[#0B1F3B] transition-all"
              />
              <p className="text-[10px] text-slate-400 mt-1 font-mono">
                /blog/{blogForm.slug || "your-slug"}
              </p>
            </div>

            {/* Category with Quick Chips */}
            <div>
              <label className="block text-xs font-bold text-[#0B1F3B] uppercase mb-1.5 font-figtree tracking-wide">
                Category <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={blogForm.category}
                onChange={(e) =>
                  setBlogForm({ ...blogForm, category: e.target.value })
                }
                placeholder="Tax Planning, Fractional CFO..."
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B1F3B]/20 focus:border-[#0B1F3B] transition-all font-manrope font-medium"
              />

              {/* Category Quick Chips */}
              <div className="flex flex-wrap gap-1 mt-2">
                {suggestedCategories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setBlogForm({ ...blogForm, category: cat })}
                    className={`text-[10px] px-2 py-0.5 rounded-md font-medium transition-colors cursor-pointer ${
                      blogForm.category === cat
                        ? "bg-[#0B1F3B] text-white"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── Banner Image Section (Direct Upload or URL) ── */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-[#0B1F3B] uppercase font-figtree tracking-wide">
                Cover Banner Image
              </label>
              <div className="flex items-center gap-1 bg-white p-0.5 rounded-lg border border-slate-200 text-xs font-medium">
                <button
                  type="button"
                  onClick={() => setImageInputMode("upload")}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-bold cursor-pointer transition-colors ${
                    imageInputMode === "upload"
                      ? "bg-[#1D61E7] text-white"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Upload File
                </button>
                <button
                  type="button"
                  onClick={() => setImageInputMode("url")}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-bold cursor-pointer transition-colors ${
                    imageInputMode === "url"
                      ? "bg-[#1D61E7] text-white"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Image URL
                </button>
              </div>
            </div>

            {/* Hidden Native File Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  processImageFile(e.target.files[0]);
                  e.target.value = "";
                }
              }}
            />

            {blogForm.image ? (
              /* Preview Area */
              <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
                <div className="relative w-full sm:w-44 aspect-[16/9] rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                  <img
                    src={blogForm.image}
                    alt="Banner preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0 space-y-2">
                  <p className="text-xs font-bold text-[#0B1F3B] font-figtree">
                    Banner Image Configured
                  </p>
                  <p className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                    <FiCheck size={12} /> Ready for publication
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg cursor-pointer transition-colors"
                    >
                      Change Photo
                    </button>
                    <button
                      type="button"
                      onClick={() => setBlogForm({ ...blogForm, image: "" })}
                      className="px-3 py-1 text-rose-600 hover:bg-rose-50 text-xs font-bold rounded-lg cursor-pointer transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ) : imageInputMode === "upload" ? (
              /* Drag & Drop Upload Zone */
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                }}
                onDrop={handleDrop}
                className={`w-full p-6 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer transition-all bg-white ${
                  isDragging
                    ? "border-[#0B1F3B] bg-[#0B1F3B]/5 scale-[1.01]"
                    : "border-slate-200 hover:border-[#0B1F3B]/40 hover:bg-slate-50"
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-[#0B1F3B]/5 text-[#0B1F3B] flex items-center justify-center mb-2 shadow-2xs">
                  <FiUploadCloud size={20} />
                </div>
                <p className="text-xs font-bold text-[#0B1F3B] font-figtree">
                  Click to upload cover photo
                </p>
                <p className="text-[11px] text-slate-500 font-manrope mt-0.5">
                  or drag and drop here (PNG, JPG, WEBP — automatically optimized)
                </p>
              </div>
            ) : (
              /* URL Input */
              <input
                type="url"
                value={blogForm.image}
                onChange={(e) =>
                  setBlogForm({ ...blogForm, image: e.target.value })
                }
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-[#0B1F3B]/20 focus:border-[#0B1F3B]"
              />
            )}
          </div>

          {/* Short Summary (Excerpt) */}
          <div>
            <label className="block text-xs font-bold text-[#0B1F3B] uppercase mb-1.5 font-figtree tracking-wide">
              Short Summary (Preview Excerpt) <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={2}
              required
              value={blogForm.summary}
              onChange={(e) =>
                setBlogForm({ ...blogForm, summary: e.target.value })
              }
              placeholder="A brief 1-2 sentence preview displayed on the article card..."
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B1F3B]/20 focus:border-[#0B1F3B] transition-all font-manrope"
            />
          </div>

          {/* Key Takeaways */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-[#0B1F3B] uppercase font-figtree tracking-wide">
                Key Takeaways (Bullet Highlights)
              </label>
              <span className="text-[10px] text-slate-500 font-manrope">
                Enter each takeaway on a new line
              </span>
            </div>
            <textarea
              rows={3}
              value={blogForm.takeawaysText}
              onChange={(e) =>
                setBlogForm({ ...blogForm, takeawaysText: e.target.value })
              }
              placeholder="S-Corporation election reduces self-employment taxes&#10;Section 179 provides upfront equipment deductions&#10;Quarterly estimated tax reviews prevent IRS penalties"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B1F3B]/20 focus:border-[#0B1F3B] transition-all font-manrope"
            />
          </div>

          {/* ── Article Content with Markdown Helper ── */}
          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <label className="block text-xs font-bold text-[#0B1F3B] uppercase font-figtree tracking-wide">
                Full Article Content (Markdown) <span className="text-rose-500">*</span>
              </label>

              {/* Word count & Reading Time Badge */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-500 font-mono">
                  {wordsCount} words
                </span>
                <span className="text-[11px] font-bold text-[#0B1F3B] bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200 font-mono">
                  Estimated: {calculatedReadTime}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setBlogForm({ ...blogForm, readTime: calculatedReadTime })
                  }
                  className="text-[11px] text-[#0B1F3B] hover:underline font-bold font-figtree cursor-pointer"
                  title="Apply calculated reading time to article"
                >
                  Apply
                </button>
              </div>
            </div>

            {/* Markdown Quick Formatting Toolbar */}
            <div className="flex flex-wrap items-center gap-1.5 p-2 bg-slate-100 rounded-xl border border-slate-200 text-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase font-mono px-1">
                Insert:
              </span>
              <button
                type="button"
                onClick={() => insertMarkdown("## Main Section Heading")}
                className="px-2 py-1 bg-white hover:bg-slate-200 text-slate-700 font-bold rounded-md transition-colors cursor-pointer text-xs"
              >
                H2 Heading
              </button>
              <button
                type="button"
                onClick={() => insertMarkdown("### Sub-section Title")}
                className="px-2 py-1 bg-white hover:bg-slate-200 text-slate-700 font-bold rounded-md transition-colors cursor-pointer text-xs"
              >
                H3 Heading
              </button>
              <button
                type="button"
                onClick={() => insertMarkdown("**bold text here**")}
                className="px-2 py-1 bg-white hover:bg-slate-200 text-slate-700 font-bold rounded-md transition-colors cursor-pointer text-xs"
              >
                Bold
              </button>
              <button
                type="button"
                onClick={() =>
                  insertMarkdown("- Key insight or action step\n- Second point")
                }
                className="px-2 py-1 bg-white hover:bg-slate-200 text-slate-700 font-bold rounded-md transition-colors cursor-pointer text-xs"
              >
                Bullet List
              </button>
              <button
                type="button"
                onClick={() =>
                  insertMarkdown("> Pro Tip: Consult your CPA before year-end.")
                }
                className="px-2 py-1 bg-white hover:bg-slate-200 text-slate-700 font-bold rounded-md transition-colors cursor-pointer text-xs"
              >
                Callout Quote
              </button>
            </div>

            <textarea
              rows={8}
              required
              value={blogForm.content}
              onChange={(e) =>
                setBlogForm({ ...blogForm, content: e.target.value })
              }
              placeholder="Write or paste your article content here in Markdown format..."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B1F3B]/20 focus:border-[#0B1F3B] font-mono leading-relaxed transition-all"
            />
          </div>

          {/* Read Time Input & Featured Article Toggle */}
          <div className="grid sm:grid-cols-2 gap-4 items-center pt-1 border-t border-slate-100">
            <div>
              <label className="block text-xs font-bold text-[#0B1F3B] uppercase mb-1 font-figtree">
                Read Time Badge
              </label>
              <input
                type="text"
                value={blogForm.readTime}
                onChange={(e) =>
                  setBlogForm({ ...blogForm, readTime: e.target.value })
                }
                placeholder="5 min read"
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B1F3B]/20 focus:border-[#0B1F3B]"
              />
            </div>

            {/* Featured Article Toggle */}
            <div className="pt-2 sm:pt-4">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={blogForm.featured}
                  onChange={(e) =>
                    setBlogForm({ ...blogForm, featured: e.target.checked })
                  }
                  className="w-4 h-4 rounded text-[#0B1F3B] focus:ring-[#0B1F3B]/20 cursor-pointer"
                />
                <span className="text-xs font-bold text-slate-800 font-figtree">
                  Pin as Featured Article (Hero Spotlight)
                </span>
              </label>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold font-figtree cursor-pointer transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-2.5 rounded-full bg-[#1D61E7] hover:bg-[#1554C0] active:scale-[0.98] text-white font-bold text-xs font-figtree shadow-md shadow-blue-500/20 cursor-pointer transition-all"
            >
              {editingBlog ? "Update Article" : "Publish Article"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
