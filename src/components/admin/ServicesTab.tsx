"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  FiSearch,
  FiEdit,
  FiExternalLink,
  FiLayers,
  FiCheckCircle,
  FiHelpCircle,
  FiPlus,
  FiTrash2,
  FiX,
  FiSave,
  FiGrid,
  FiUploadCloud,
  FiImage,
  FiLink,
  FiRotateCcw,
  FiEye,
} from "react-icons/fi";
import { defaultIcons, defaultImages } from "@/sections/Home/services";

interface ServicesTabProps {
  services: Record<string, any>;
  updateService: (slug: string, serviceData: any) => any;
  showToast: (msg: string, type?: "success" | "error" | "info") => void;
  homeServices?: any[];
  updateHomeService?: (idOrSlug: string, fields: any) => any;
}

const getMediaSrc = (media: any): string => {
  if (!media) return "";
  if (typeof media === "string") return media;
  if (typeof media === "object" && media.src) return media.src;
  return "";
};

export default function ServicesTab({
  services,
  updateService,
  showToast,
  homeServices,
  updateHomeService,
}: ServicesTabProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [activeModalTab, setActiveModalTab] = useState<"overview" | "offers" | "benefits" | "faqs" | "homepage">("overview");

  // Edit form state for detailed service
  const [serviceForm, setServiceForm] = useState<any>(null);

  // Edit form state for connected homepage card
  const [homepageCardForm, setHomepageCardForm] = useState<{
    no: string;
    desc: string;
    iconImg: any;
    image: any;
  }>({
    no: "01",
    desc: "",
    iconImg: "",
    image: "",
  });

  // URL input toggles
  const [showIconUrl, setShowIconUrl] = useState(false);
  const [showImageUrl, setShowImageUrl] = useState(false);

  const iconFileInputRef = useRef<HTMLInputElement>(null);
  const imageFileInputRef = useRef<HTMLInputElement>(null);

  const serviceList = Object.values(services || {});

  const filteredServices = serviceList.filter((s: any) => {
    const q = searchQuery.toLowerCase();
    return (
      s.title?.toLowerCase().includes(q) ||
      s.slug?.toLowerCase().includes(q) ||
      s.primaryKeyword?.toLowerCase().includes(q) ||
      s.overview?.toLowerCase().includes(q)
    );
  });

  const openEditModal = (service: any) => {
    setEditingSlug(service.slug);
    setServiceForm(JSON.parse(JSON.stringify(service))); // deep copy

    // Sync with corresponding home service card
    const matchingHome = (homeServices || []).find(
      (h: any) => h.slug === service.slug || h.id === service.slug
    );

    setHomepageCardForm({
      no: matchingHome?.no || "01",
      desc: matchingHome?.desc || service.overview || "",
      iconImg: matchingHome?.iconImg || "",
      image: matchingHome?.image || "",
    });

    setShowIconUrl(false);
    setShowImageUrl(false);
    setActiveModalTab("overview");
  };

  const closeEditModal = () => {
    setEditingSlug(null);
    setServiceForm(null);
  };

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
          setHomepageCardForm((prev) => ({ ...prev, iconImg: resized }));
        } else {
          setHomepageCardForm((prev) => ({ ...prev, iconImg: dataUrl }));
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
          setHomepageCardForm((prev) => ({ ...prev, image: resized }));
        } else {
          setHomepageCardForm((prev) => ({ ...prev, image: dataUrl }));
        }
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSlug || !serviceForm) return;

    // 1. Update Detailed Service
    updateService(editingSlug, serviceForm);

    // 2. Synchronize Homepage Card (Icon, Illustration, Number, Desc)
    if (updateHomeService) {
      updateHomeService(editingSlug, {
        no: homepageCardForm.no.trim() || "01",
        desc: homepageCardForm.desc.trim() || serviceForm.overview || "",
        iconImg: homepageCardForm.iconImg,
        image: homepageCardForm.image,
        title: serviceForm.title,
        slug: editingSlug,
      });
    }

    showToast(`Updated "${serviceForm.title}" & Homepage Card successfully!`, "success");
    closeEditModal();
  };

  // Helpers for editing nested lists
  const handleOfferChange = (idx: number, field: "title" | "desc", val: string) => {
    const newOffers = [...(serviceForm.whatWeOffer || [])];
    newOffers[idx] = { ...newOffers[idx], [field]: val };
    setServiceForm({ ...serviceForm, whatWeOffer: newOffers });
  };

  const addOffer = () => {
    setServiceForm({
      ...serviceForm,
      whatWeOffer: [...(serviceForm.whatWeOffer || []), { title: "", desc: "" }],
    });
  };

  const removeOffer = (idx: number) => {
    setServiceForm({
      ...serviceForm,
      whatWeOffer: (serviceForm.whatWeOffer || []).filter((_: any, i: number) => i !== idx),
    });
  };

  const handleBenefitChange = (idx: number, field: "title" | "desc", val: string) => {
    const newBenefits = [...(serviceForm.benefits || [])];
    newBenefits[idx] = { ...newBenefits[idx], [field]: val };
    setServiceForm({ ...serviceForm, benefits: newBenefits });
  };

  const addBenefit = () => {
    setServiceForm({
      ...serviceForm,
      benefits: [...(serviceForm.benefits || []), { title: "", desc: "" }],
    });
  };

  const removeBenefit = (idx: number) => {
    setServiceForm({
      ...serviceForm,
      benefits: (serviceForm.benefits || []).filter((_: any, i: number) => i !== idx),
    });
  };

  const handleFaqChange = (idx: number, field: "q" | "a", val: string) => {
    const newFaqs = [...(serviceForm.faqs || [])];
    newFaqs[idx] = { ...newFaqs[idx], [field]: val };
    setServiceForm({ ...serviceForm, faqs: newFaqs });
  };

  const addFaq = () => {
    setServiceForm({
      ...serviceForm,
      faqs: [...(serviceForm.faqs || []), { q: "", a: "" }],
    });
  };

  const removeFaq = (idx: number) => {
    setServiceForm({
      ...serviceForm,
      faqs: (serviceForm.faqs || []).filter((_: any, i: number) => i !== idx),
    });
  };

  return (
    <div className="space-y-6">
      {/* Search Bar & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search services by title, keyword, or summary..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-manrope placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1D61E7] focus:border-transparent transition-all shadow-xs"
          />
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
        </div>

        <span className="text-xs font-bold text-slate-500 font-figtree">
          Total Services: <strong className="text-slate-900">{serviceList.length}</strong>
        </span>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {filteredServices.map((service: any) => {
          const matchingHome = (homeServices || []).find(
            (h: any) => h.slug === service.slug || h.id === service.slug
          );
          const effectiveIcon = matchingHome?.iconImg || (defaultIcons as any)[service.slug];
          const effectiveImage = matchingHome?.image || (defaultImages as any)[service.slug];
          const iconSrc = getMediaSrc(effectiveIcon);
          const imageSrc = getMediaSrc(effectiveImage);

          return (
            <div
              key={service.slug}
              className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-lg transition-all duration-300 p-5 sm:p-6 flex flex-col justify-between gap-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center p-1.5 shrink-0 shadow-xs overflow-hidden">
                      {iconSrc ? (
                        <img src={iconSrc} alt="Icon" className="w-full h-full object-contain" />
                      ) : (
                        <FiLayers className="text-[#0B1F3B]" size={20} />
                      )}
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold font-figtree text-slate-900 group-hover:text-[#1D61E7] transition-colors leading-snug">
                        {service.title}
                      </h3>
                      <span className="text-[11px] font-mono font-medium text-slate-400 block">
                        /services/{service.slug}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => openEditModal(service)}
                      className="px-3.5 py-1.5 rounded-lg bg-[#EBF2FE] text-[#1D61E7] hover:bg-[#1D61E7] hover:text-white text-xs sm:text-sm font-bold font-figtree transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <FiEdit size={16} />
                      <span>Edit</span>
                    </button>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 font-manrope leading-relaxed line-clamp-3">
                  {service.overview}
                </p>
              </div>

              {/* Badges Footer */}
              <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px] font-figtree text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-semibold">
                    <FiCheckCircle size={12} />
                    <span>{service.whatWeOffer?.length || 0} Offerings</span>
                  </span>
                  <span className="flex items-center gap-1 text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md font-semibold">
                    <FiHelpCircle size={12} />
                    <span>{service.faqs?.length || 0} FAQs</span>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Service Modal with Connected Homepage Tab */}
      {editingSlug && serviceForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs">
          <div className="relative max-w-3xl w-full bg-white rounded-3xl border border-slate-200 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/60">
              <div>
                <h3 className="text-base sm:text-lg font-bold font-figtree text-slate-900">
                  Edit Service: {serviceForm.title}
                </h3>
                <p className="text-xs text-slate-500 font-mono">/services/{serviceForm.slug}</p>
              </div>
              <button
                onClick={closeEditModal}
                className="w-8 h-8 rounded-full bg-slate-200/70 hover:bg-slate-300 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="flex border-b border-slate-200 px-6 bg-white gap-2 shrink-0 overflow-x-auto">
              {[
                { id: "overview", label: "Overview" },
                { id: "offers", label: `Offerings (${serviceForm.whatWeOffer?.length || 0})` },
                { id: "benefits", label: `Benefits (${serviceForm.benefits?.length || 0})` },
                { id: "faqs", label: `FAQs (${serviceForm.faqs?.length || 0})` },
                { id: "homepage", label: "Homepage Card" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveModalTab(tab.id as any)}
                  className={`py-3 px-3 text-xs sm:text-sm font-bold font-figtree border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    activeModalTab === tab.id
                      ? "border-[#1D61E7] text-[#1D61E7]"
                      : "border-transparent text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {tab.id === "homepage" && <FiGrid size={13} className="text-[#1D61E7]" />}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Modal Body Form */}
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-5">
              {/* TAB 1: OVERVIEW */}
              {activeModalTab === "overview" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 font-figtree mb-1.5 uppercase tracking-wider">
                      Service Title
                    </label>
                    <input
                      type="text"
                      value={serviceForm.title || ""}
                      onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-manrope focus:outline-none focus:ring-2 focus:ring-[#1D61E7]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 font-figtree mb-1.5 uppercase tracking-wider">
                      Detailed Overview
                    </label>
                    <textarea
                      rows={5}
                      value={serviceForm.overview || ""}
                      onChange={(e) => setServiceForm({ ...serviceForm, overview: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-manrope focus:outline-none focus:ring-2 focus:ring-[#1D61E7]"
                    />
                  </div>
                </div>
              )}

              {/* TAB 2: OFFERINGS */}
              {activeModalTab === "offers" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-slate-500 font-manrope">
                      Configure what your firm delivers for this service.
                    </p>
                    <button
                      type="button"
                      onClick={addOffer}
                      className="px-3 py-1.5 rounded-lg bg-[#EBF2FE] text-[#1D61E7] hover:bg-[#1D61E7] hover:text-white text-xs font-bold font-figtree flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <FiPlus size={14} />
                      <span>Add Offering</span>
                    </button>
                  </div>

                  {(serviceForm.whatWeOffer || []).map((offer: any, idx: number) => (
                    <div key={idx} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2 relative group">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-bold text-slate-400 font-figtree uppercase">
                          Item #{idx + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeOffer(idx)}
                          className="text-slate-400 hover:text-rose-600 p-1 transition-colors cursor-pointer"
                          title="Remove item"
                        >
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                      <input
                        type="text"
                        placeholder="Offering Title"
                        value={offer.title || ""}
                        onChange={(e) => handleOfferChange(idx, "title", e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm font-semibold font-figtree focus:outline-none focus:ring-2 focus:ring-[#1D61E7]"
                      />
                      <textarea
                        rows={2}
                        placeholder="Offering Description"
                        value={offer.desc || ""}
                        onChange={(e) => handleOfferChange(idx, "desc", e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs font-manrope focus:outline-none focus:ring-2 focus:ring-[#1D61E7]"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 3: BENEFITS */}
              {activeModalTab === "benefits" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-slate-500 font-manrope">
                      Key client benefits and strategic advantages.
                    </p>
                    <button
                      type="button"
                      onClick={addBenefit}
                      className="px-3 py-1.5 rounded-lg bg-[#EBF2FE] text-[#1D61E7] hover:bg-[#1D61E7] hover:text-white text-xs font-bold font-figtree flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <FiPlus size={14} />
                      <span>Add Benefit</span>
                    </button>
                  </div>

                  {(serviceForm.benefits || []).map((benefit: any, idx: number) => (
                    <div key={idx} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-bold text-slate-400 font-figtree uppercase">
                          Benefit #{idx + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeBenefit(idx)}
                          className="text-slate-400 hover:text-rose-600 p-1 transition-colors cursor-pointer"
                          title="Remove benefit"
                        >
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                      <input
                        type="text"
                        placeholder="Benefit Title"
                        value={benefit.title || ""}
                        onChange={(e) => handleBenefitChange(idx, "title", e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm font-semibold font-figtree focus:outline-none focus:ring-2 focus:ring-[#1D61E7]"
                      />
                      <textarea
                        rows={2}
                        placeholder="Benefit Description"
                        value={benefit.desc || ""}
                        onChange={(e) => handleBenefitChange(idx, "desc", e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs font-manrope focus:outline-none focus:ring-2 focus:ring-[#1D61E7]"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 4: FAQS */}
              {activeModalTab === "faqs" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-slate-500 font-manrope">
                      Frequently asked questions specifically for {serviceForm.title}.
                    </p>
                    <button
                      type="button"
                      onClick={addFaq}
                      className="px-3 py-1.5 rounded-lg bg-[#EBF2FE] text-[#1D61E7] hover:bg-[#1D61E7] hover:text-white text-xs font-bold font-figtree flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <FiPlus size={14} />
                      <span>Add FAQ</span>
                    </button>
                  </div>

                  {(serviceForm.faqs || []).map((faq: any, idx: number) => (
                    <div key={idx} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-bold text-slate-400 font-figtree uppercase">
                          Question #{idx + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeFaq(idx)}
                          className="text-slate-400 hover:text-rose-600 p-1 transition-colors cursor-pointer"
                          title="Remove FAQ"
                        >
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                      <input
                        type="text"
                        placeholder="Question text..."
                        value={faq.q || ""}
                        onChange={(e) => handleFaqChange(idx, "q", e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm font-semibold font-figtree focus:outline-none focus:ring-2 focus:ring-[#1D61E7]"
                      />
                      <textarea
                        rows={2}
                        placeholder="Answer text..."
                        value={faq.a || ""}
                        onChange={(e) => handleFaqChange(idx, "a", e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs font-manrope focus:outline-none focus:ring-2 focus:ring-[#1D61E7]"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 5: CONNECTED HOMEPAGE CARD (AFTER FAQS) */}
              {activeModalTab === "homepage" && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-1">
                      <label className="block text-xs font-bold font-figtree text-slate-700 uppercase tracking-wider mb-1.5">
                        Position Number (e.g. 01)
                      </label>
                      <input
                        type="text"
                        value={homepageCardForm.no}
                        onChange={(e) => setHomepageCardForm({ ...homepageCardForm, no: e.target.value })}
                        placeholder="01"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#1D61E7]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold font-figtree text-slate-700 uppercase tracking-wider mb-1.5">
                        Homepage Accordion Short Summary
                      </label>
                      <textarea
                        rows={2}
                        value={homepageCardForm.desc}
                        onChange={(e) => setHomepageCardForm({ ...homepageCardForm, desc: e.target.value })}
                        placeholder="Short summary shown inside the homepage card..."
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-manrope focus:outline-none focus:ring-2 focus:ring-[#1D61E7]"
                      />
                    </div>
                  </div>

                  {/* Icon & Illustration Upload Controls */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    {/* 1. Service Icon */}
                    <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold font-figtree text-slate-800 uppercase tracking-wider">
                          Service Icon
                        </label>
                        {homepageCardForm.iconImg && (
                          <button
                            type="button"
                            onClick={() => setHomepageCardForm({ ...homepageCardForm, iconImg: "" })}
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
                          {homepageCardForm.iconImg || (defaultIcons as any)[editingSlug || ""] ? (
                            <img
                              src={getMediaSrc(homepageCardForm.iconImg || (defaultIcons as any)[editingSlug || ""])}
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
                          value={typeof homepageCardForm.iconImg === "string" ? homepageCardForm.iconImg : ""}
                          onChange={(e) => setHomepageCardForm({ ...homepageCardForm, iconImg: e.target.value })}
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
                        {homepageCardForm.image && (
                          <button
                            type="button"
                            onClick={() => setHomepageCardForm({ ...homepageCardForm, image: "" })}
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
                          {homepageCardForm.image || (defaultImages as any)[editingSlug || ""] ? (
                            <img
                              src={getMediaSrc(homepageCardForm.image || (defaultImages as any)[editingSlug || ""])}
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
                          value={typeof homepageCardForm.image === "string" ? homepageCardForm.image : ""}
                          onChange={(e) => setHomepageCardForm({ ...homepageCardForm, image: e.target.value })}
                          className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#1D61E7] bg-white font-mono"
                        />
                      )}
                      <p className="text-[11px] text-slate-400 font-manrope">
                        High-res PNG or JPEG (shown when card is expanded on the Homepage).
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons Footer */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold font-figtree hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#1D61E7] hover:bg-[#1554C0] text-white text-xs font-bold font-figtree flex items-center gap-2 cursor-pointer transition-all shadow-md shadow-blue-500/20"
                >
                  <FiSave size={14} />
                  <span>Save Service Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
