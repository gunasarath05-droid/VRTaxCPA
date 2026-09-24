"use client";

import React, { useState, useEffect, useRef } from "react";
import { FiEdit, FiTrash2, FiPlus, FiCamera, FiCheck } from "react-icons/fi";
import { FaLinkedinIn, FaInstagram, FaFacebookF, FaYelp } from "react-icons/fa";
import ceoImg from "@/assets/images/ceo.jpeg";

interface FounderTabProps {
  founder: any;
  socialsList: any[];
  updateFounder: (data: any) => void;
  setActiveTab: (tab: string) => void;
  showToast: (msg: string, type?: "success" | "error" | "info") => void;
}

const defaultFounderParagraphs = [
  `"Vetha Ram, CPA", is the Founder and CEO of "VR Tax CPA LLC". With "13 years of comprehensive accounting experience" including "10 years of specialized tax expertise", she partners with business owners and individuals to navigate tax complexities with precision, clarity, and peace of mind.`,
  `Her dual qualification as a "Texas State Board Licensed CPA" and a "Chartered Accountant (India)" brings a rigorous, global analytical perspective to every client engagement. She treats each client's business with the dedication and attention of a trusted partner—never as a file number or transaction. Every relationship is built on integrity, accuracy, and genuine care.`,
  `Guided by the principle of serving with unwavering dedication, her commitment is simple: to lift financial stress so clients can focus wholeheartedly on scaling their businesses and enjoying their lives.`,
];

const defaultFounderQuote = `Outside the firm, she is an active volunteer at the ISKCON Dallas Temple and cherishes spending time cooking, traveling, and being with her husband and their two boys. For those seeking an advisor who truly listens and stands by their side year-round, her doors are always open.`;

export default function FounderTab({
  founder,
  socialsList,
  updateFounder,
  setActiveTab,
  showToast,
}: FounderTabProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [founderForm, setFounderForm] = useState({
    name: "",
    displayName: "",
    title: "",
    experienceYears: 13,
    experienceLabel: "Years Experience",
    image: ceoImg.src,
    bio: "",
    paragraphs: defaultFounderParagraphs,
    quote: defaultFounderQuote,
    activeSocials: ["instagram", "facebook", "linkedin", "yelp"],
  });

  const [editingParagraphs, setEditingParagraphs] = useState<
    Record<number, boolean>
  >({});
  const [editingQuote, setEditingQuote] = useState(false);

  useEffect(() => {
    if (founder) {
      setFounderForm({
        name: founder.name || "",
        displayName: founder.displayName || "",
        title: founder.title || "",
        experienceYears: founder.experienceYears || 13,
        experienceLabel: founder.experienceLabel || "Years Experience",
        image: founder.image || ceoImg.src,
        bio: founder.bio || "",
        paragraphs:
          Array.isArray(founder.paragraphs) && founder.paragraphs.length > 0
            ? founder.paragraphs
            : defaultFounderParagraphs,
        quote: founder.quote || defaultFounderQuote,
        activeSocials: Array.isArray(founder.activeSocials)
          ? founder.activeSocials
          : ["instagram", "facebook", "linkedin", "yelp"],
      });
    }
  }, [founder]);

  // Image Upload handler with client-side canvas compression
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
          const compressed = canvas.toDataURL("image/jpeg", 0.88);
          setFounderForm((prev) => ({ ...prev, image: compressed }));
        } else {
          setFounderForm((prev) => ({ ...prev, image: dataUrl }));
        }
        showToast("Founder photo updated!");
      };
      img.onerror = () => {
        setFounderForm((prev) => ({ ...prev, image: dataUrl }));
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  };

  const handleParagraphChange = (index: number, val: string) => {
    const updated = [...founderForm.paragraphs];
    updated[index] = val;
    setFounderForm({ ...founderForm, paragraphs: updated });
  };

  const addParagraphItem = () => {
    const newIdx = founderForm.paragraphs.length;
    setFounderForm({
      ...founderForm,
      paragraphs: [...founderForm.paragraphs, ""],
    });
    setEditingParagraphs((prev) => ({ ...prev, [newIdx]: true }));
  };

  const removeParagraphItem = (index: number) => {
    if (founderForm.paragraphs.length <= 1) return;
    const updated = founderForm.paragraphs.filter((_, idx) => idx !== index);
    const updatedForm = { ...founderForm, paragraphs: updated };
    setFounderForm(updatedForm);
    updateFounder(updatedForm);
    showToast("Paragraph deleted and live site updated!", "success");
  };

  const toggleEditParagraph = (index: number) => {
    setEditingParagraphs((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const toggleFounderSocial = (id: string) => {
    const current = founderForm.activeSocials || [];
    let next: string[];
    if (current.includes(id)) {
      next = current.filter((x) => x !== id);
    } else {
      next = [...current, id];
    }
    setFounderForm({ ...founderForm, activeSocials: next });
  };

  const handleSaveFounder = (e: React.FormEvent) => {
    e.preventDefault();
    updateFounder(founderForm);
    showToast("Founder profile saved successfully!");
  };

  // Predefined social media items matching reference
  const socialPlatforms = [
    { id: "instagram", name: "Instagram", icon: FaInstagram },
    { id: "facebook", name: "Facebook", icon: FaFacebookF },
    { id: "linkedin", name: "LinkedIn", icon: FaLinkedinIn },
    { id: "yelp", name: "Yelp", icon: FaYelp },
  ];

  return (
    <form onSubmit={handleSaveFounder} className="space-y-8 pb-10">
      {/* ── Top Section: Founder Card (Clean White SaaS Card) ── */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 flex flex-col lg:flex-row items-center gap-6 sm:gap-8 shadow-xs">
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

        {/* Left Column: Founder Photo */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className="w-[240px] sm:w-[270px] lg:w-[290px] aspect-[4/4.8] rounded-2xl overflow-hidden border border-slate-200 relative shadow-sm group shrink-0 cursor-pointer bg-slate-100"
          title="Click to change founder photo"
        >
          <img
            src={founderForm.image || ceoImg.src}
            alt={founderForm.name || "Founder"}
            className="w-full h-full object-cover object-top select-none group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (target.src !== ceoImg.src) {
                target.src = ceoImg.src;
              }
            }}
          />

          {/* Hover Overlay to Change Photo */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white gap-2 backdrop-blur-xs">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
              <FiCamera size={20} />
            </div>
            <span className="text-xs font-bold font-figtree tracking-wide">
              Change Photo
            </span>
          </div>

          {/* Bottom Floating Badge */}
          <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold font-figtree flex items-center gap-1.5 shadow-sm">
            <FiCamera size={11} />
            <span>Upload Photo</span>
          </div>
        </div>

        {/* Right Column: Two-Column Form Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 flex-1 w-full">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 font-figtree tracking-wide">
              Full Name
            </label>
            <input
              type="text"
              value={founderForm.name}
              onChange={(e) =>
                setFounderForm({ ...founderForm, name: e.target.value })
              }
              placeholder="Vetha Ram, CPA"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-800 text-xs sm:text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1D61E7]/20 focus:border-[#1D61E7] transition-all font-manrope shadow-2xs"
            />
          </div>

          {/* Short Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 font-figtree tracking-wide">
              Short Name
            </label>
            <input
              type="text"
              value={founderForm.displayName}
              onChange={(e) =>
                setFounderForm({ ...founderForm, displayName: e.target.value })
              }
              placeholder="Vetha Ram"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-800 text-xs sm:text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1D61E7]/20 focus:border-[#1D61E7] transition-all font-manrope shadow-2xs"
            />
          </div>

          {/* Designation */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 font-figtree tracking-wide">
              Designation
            </label>
            <input
              type="text"
              value={founderForm.title}
              onChange={(e) =>
                setFounderForm({ ...founderForm, title: e.target.value })
              }
              placeholder="CPA · CA · Founder & CEO"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-800 text-xs sm:text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1D61E7]/20 focus:border-[#1D61E7] transition-all font-manrope shadow-2xs"
            />
          </div>

          {/* Years Experience */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 font-figtree tracking-wide">
              Years Experience
            </label>
            <input
              type="number"
              value={founderForm.experienceYears}
              onChange={(e) =>
                setFounderForm({
                  ...founderForm,
                  experienceYears: Number(e.target.value),
                })
              }
              placeholder="13"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-800 text-xs sm:text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1D61E7]/20 focus:border-[#1D61E7] transition-all font-manrope shadow-2xs"
            />
          </div>

          {/* Badge Label */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 font-figtree tracking-wide">
              Badge Label
            </label>
            <input
              type="text"
              value={founderForm.experienceLabel}
              onChange={(e) =>
                setFounderForm({
                  ...founderForm,
                  experienceLabel: e.target.value,
                })
              }
              placeholder="Years Experience"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-800 text-xs sm:text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1D61E7]/20 focus:border-[#1D61E7] transition-all font-manrope shadow-2xs"
            />
          </div>

          {/* Social Media Visibility */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 font-figtree tracking-wide">
              Social Media Visibility
            </label>
            <div className="flex items-center gap-2.5 pt-1">
              {socialPlatforms.map(({ id, name, icon: IconComp }) => {
                const isActive = (founderForm.activeSocials || []).includes(id);
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => toggleFounderSocial(id)}
                    title={`${name}: ${isActive ? "Active (Click to disable)" : "Inactive (Click to enable)"}`}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all cursor-pointer ${
                      isActive
                        ? "border-blue-200 text-[#1D61E7] bg-[#EBF2FE] shadow-2xs scale-105"
                        : "border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 bg-white"
                    }`}
                  >
                    <IconComp size={16} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Save Button Row */}
          <div className="sm:col-span-2 pt-2 flex justify-end">
            <button
              type="submit"
              className="px-8 py-2.5 rounded-full bg-[#1D61E7] hover:bg-[#1554C0] active:scale-[0.98] text-white font-bold text-sm font-figtree transition-all shadow-md shadow-blue-500/20 cursor-pointer"
            >
              Save Founder Details
            </button>
          </div>
        </div>
      </div>

      <hr className="border-slate-100" />

      {/* ── Middle Section: Bio Paragraphs ── */}
      <div className="space-y-4">
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-figtree">
              Bio Paragraphs
            </h3>
            <p className="text-xs text-slate-500 font-manrope mt-0.5">
              Add or edit paragraphs. Words enclosed in double quotes
              &quot;word&quot; will appear dark/bold on the website.
            </p>
          </div>

          <button
            type="button"
            onClick={addParagraphItem}
            className="px-5 py-2.5 rounded-full bg-[#1D61E7] hover:bg-[#1554C0] active:scale-[0.98] text-white font-bold text-sm font-figtree transition-all shadow-md shadow-blue-500/20 flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
          >
            <FiPlus size={15} /> Add Paragraph
          </button>
        </div>

        {/* Highlight Tip Bar */}
        <div className="p-3 sm:py-2.5 sm:px-4 bg-[#EBF2FE] border border-blue-100 text-blue-900 rounded-2xl text-xs flex flex-wrap items-center gap-1.5 font-manrope leading-relaxed w-fit">
          <span className="font-bold text-[#1D61E7]">Highlight Tip:</span>
          <span className="text-slate-700">
            Example: &quot;Vetha Ram, CPA&quot;, is the Founder... With &quot;13
            years of experience&quot; &rarr; will visually highlight{" "}
            <strong className="text-slate-900 font-bold">Vetha Ram, CPA</strong> and{" "}
            <strong className="text-slate-900 font-bold">13 years of experience</strong> in dark text.
          </span>
        </div>

        {/* Paragraph Cards Grid (2 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {founderForm.paragraphs.map((para, idx) => {
            const isEditing = !!editingParagraphs[idx];
            return (
              <div
                key={idx}
                className="rounded-3xl overflow-hidden border border-slate-100 shadow-xs hover:shadow-md transition-shadow bg-white flex flex-col"
              >
                {/* Clean SaaS Header */}
                <div className="bg-slate-50/80 border-b border-slate-100 px-5 py-3.5 flex items-center justify-between text-slate-800">
                  <span className="font-extrabold text-xs uppercase tracking-wider text-slate-600 font-figtree">
                    Paragraph #{idx + 1}
                  </span>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => toggleEditParagraph(idx)}
                      className="flex items-center gap-1.5 text-xs font-bold text-[#1D61E7] hover:underline cursor-pointer transition-colors font-figtree"
                    >
                      <FiEdit size={14} className="stroke-[2.2]" />
                      <span>{isEditing ? "Done" : "Edit"}</span>
                    </button>
                    {founderForm.paragraphs.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeParagraphItem(idx)}
                        className="flex items-center gap-1.5 text-xs font-bold text-rose-500 hover:text-rose-600 cursor-pointer transition-colors font-figtree"
                      >
                        <FiTrash2 size={14} className="stroke-[2.2]" />
                        <span>Delete</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-center min-h-[140px]">
                  {isEditing ? (
                    <div className="space-y-2 w-full">
                      <textarea
                        rows={4}
                        value={para}
                        onChange={(e) =>
                          handleParagraphChange(idx, e.target.value)
                        }
                        placeholder={`Enter paragraph #${idx + 1}... Use "quotes" for highlights.`}
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 leading-relaxed focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1D61E7]/20 focus:border-[#1D61E7] transition-all"
                        autoFocus
                      />
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => {
                            toggleEditParagraph(idx);
                            updateFounder(founderForm);
                            showToast("Paragraph updated and live site updated!", "success");
                          }}
                          className="px-4 py-1.5 bg-[#1D61E7] hover:bg-[#1554C0] text-white rounded-full text-xs font-bold font-figtree flex items-center gap-1 cursor-pointer shadow-xs"
                        >
                          <FiCheck size={12} /> Save Text
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p
                      onClick={() => toggleEditParagraph(idx)}
                      className="text-xs sm:text-sm text-slate-700 leading-relaxed font-manrope cursor-pointer hover:text-slate-900 transition-colors"
                      title="Click to edit paragraph"
                    >
                      {para || (
                        <span className="text-slate-400 italic">
                          Empty paragraph. Click Edit to enter text.
                        </span>
                      )}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <hr className="border-slate-200" />

      {/* ── Bottom Section: Quote Paragraph ── */}
      <div className="space-y-3">
        {/* Header Row */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-figtree">
              Quote Paragraph
            </h3>
            <p className="text-xs text-slate-500 font-manrope mt-0.5">
              This appears in the highlighted italic callout block. Words in
              &quot;quotes&quot; are highlighted.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setEditingQuote(!editingQuote)}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-700 hover:text-[#1D61E7] cursor-pointer transition-colors font-figtree"
          >
            <FiEdit size={16} className="stroke-[2.2]" />
            <span>{editingQuote ? "Done" : "Edit"}</span>
          </button>
        </div>

        {/* Bordered Quote Card matching screenshot */}
        <div className="rounded-3xl border border-slate-200 p-6 sm:p-7 bg-white shadow-xs">
          {editingQuote ? (
            <div className="space-y-2">
              <textarea
                rows={4}
                value={founderForm.quote}
                onChange={(e) =>
                  setFounderForm({ ...founderForm, quote: e.target.value })
                }
                placeholder="Enter special quote paragraph..."
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-800 leading-relaxed italic focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1D61E7]/20 focus:border-[#1D61E7] transition-all"
                autoFocus
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setEditingQuote(false);
                    updateFounder(founderForm);
                    showToast("Quote updated and live site updated!", "success");
                  }}
                  className="px-4 py-1.5 bg-[#1D61E7] hover:bg-[#1554C0] text-white rounded-full text-xs font-bold font-figtree flex items-center gap-1 cursor-pointer shadow-xs"
                >
                  <FiCheck size={12} /> Save Quote
                </button>
              </div>
            </div>
          ) : (
            <p
              onClick={() => setEditingQuote(true)}
              className="text-xs sm:text-sm text-slate-700 leading-relaxed italic font-manrope cursor-pointer hover:text-slate-900 transition-colors"
              title="Click to edit quote"
            >
              {founderForm.quote}
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
