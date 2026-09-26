"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMapPin,
  FiCalendar,
  FiMaximize2,
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiSearch,
  FiArrowRight,
  FiPhone,
} from "react-icons/fi";
import darkbg from "@/assets/images/darkbg.png";
import { galleryCategories, galleryItems } from "@/constants/galleryData";
import { useSiteData } from "@/context/SiteDataContext";

export default function GalleryPage() {
  const { gallery, isLoaded } = useSiteData();
  const allMoments = isLoaded && Array.isArray(gallery)
    ? gallery
    : (gallery?.length ? gallery : galleryItems);

  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Filter items based on active category & search query
  const filteredItems = allMoments.filter((item: any) => {
    const matchesCategory =
      activeCategory === "all" || item.categoryId === activeCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Lightbox handlers
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const showNext = useCallback(() => {
    if (lightboxIndex !== null && filteredItems.length > 0) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  }, [lightboxIndex, filteredItems.length]);

  const showPrev = useCallback(() => {
    if (lightboxIndex !== null && filteredItems.length > 0) {
      setLightboxIndex(
        (lightboxIndex - 1 + filteredItems.length) % filteredItems.length
      );
    }
  }, [lightboxIndex, filteredItems.length]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, showNext, showPrev]);

  const activePhoto =
    lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <>
      {/* ── Executive Hero Header ── */}
      <section
        className="relative pt-32 sm:pt-40 pb-20 sm:pb-28 text-white overflow-hidden bg-fixed bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${darkbg.src})` }}
      >
        <div className="absolute inset-0 bg-[#0B1F3B]/60 pointer-events-none" />
        <div className="absolute -left-20 bottom-0 w-80 h-80 rounded-full bg-[#d3d663]/10 blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center justify-center gap-2 text-white/60 text-xs font-semibold mb-4"
          >
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#d3d663]">Gallery</span>
          </nav>


          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-figtree tracking-tight max-w-3xl mx-auto leading-tight text-white">
            Our Visual <span className="text-[#d3d663]">Journey</span>
          </h1>

          <p className="text-white/75 text-sm sm:text-base md:text-lg font-manrope mt-4 max-w-2xl mx-auto leading-relaxed">
            Step behind the scenes at our office — explore client strategy sessions, firm milestones, accounting workshops, and community volunteering.
          </p>

          {/* Search Bar */}
          <div className="mt-8 max-w-lg mx-auto relative">
            <input
              type="text"
              aria-label="Search gallery moments"
              placeholder="Search by keyword, location, or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#d3d663] backdrop-blur-md text-sm font-manrope shadow-lg transition-all"
            />
            <FiSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60"
              size={18}
              aria-hidden="true"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
              >
                <FiX size={16} />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── Main Gallery Content ── */}
      <section className="py-14 sm:py-20 bg-slate-50 relative overflow-hidden min-h-[500px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Category Filter Pills */}
          <div
            className="flex flex-wrap justify-center gap-2 sm:gap-2.5 mb-10 sm:mb-12"
            role="tablist"
            aria-label="Gallery category filters"
          >
            {galleryCategories.map((cat) => {
              const count =
                cat.id === "all"
                  ? allMoments.length
                  : allMoments.filter((item: any) => item.categoryId === cat.id).length;

              return (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={activeCategory === cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold font-figtree transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                    activeCategory === cat.id
                      ? "bg-[#0B1F3B] text-white shadow-md scale-105"
                      : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 hover:border-slate-300"
                  }`}
                >
                  <span>{cat.name}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      activeCategory === cat.id
                        ? "bg-[#d3d663] text-[#0B1F3B]"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Results count text */}
          <div className="flex items-center justify-between mb-6 text-xs text-slate-500 font-manrope">
            <span>
              Showing{" "}
              <strong className="text-slate-900">{filteredItems.length}</strong>{" "}
              {filteredItems.length === 1 ? "moment" : "moments"}
            </span>
            {searchQuery && (
              <span className="text-[#0B1F3B] font-semibold">
                Filtering by &quot;{searchQuery}&quot;
              </span>
            )}
          </div>

          {/* Gallery Photo Grid */}
          {filteredItems.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              {filteredItems.map((item, index) => (
                <motion.div
                  layout
                  key={item.id}
                  role="button"
                  tabIndex={0}
                  aria-label={`View photo: ${item.title}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
                  onClick={() => openLightbox(index)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      openLightbox(index);
                    }
                  }}
                  className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-2xl hover:border-[#0B1F3B] transition-all duration-300 cursor-pointer flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1F3B]"
                >
                  {/* Photo container */}
                  <div className="relative aspect-[16/11] w-full overflow-hidden bg-slate-900">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-108"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Category Tag */}
                    <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-[#0B1F3B] text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-xs border border-slate-100 font-figtree">
                      {item.category}
                    </span>

                    {/* Expand icon pill */}
                    <div className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-[#0B1F3B] text-[#d3d663] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg transform translate-y-2 group-hover:translate-y-0">
                      <FiMaximize2 size={15} />
                    </div>
                  </div>

                  {/* Details Card */}
                  <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 gap-3">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold font-figtree text-[#0B1F3B] leading-snug group-hover:text-[#2D503B] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-slate-600 text-xs sm:text-sm font-manrope leading-relaxed line-clamp-2 mt-1.5">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-manrope">
                      <span className="flex items-center gap-1.5 truncate pr-2">
                        <FiMapPin size={13} className="text-[#2D503B] shrink-0" />
                        <span className="truncate">{item.location}</span>
                      </span>
                      <span className="flex items-center gap-1 shrink-0 text-slate-400">
                        <FiCalendar size={13} />
                        <span>{item.date}</span>
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 max-w-lg mx-auto">
              <p className="text-[#0B1F3B] font-bold font-figtree text-lg">
                {allMoments.length === 0 ? "No moments currently available" : "No moments found"}
              </p>
              <p className="text-slate-500 text-xs sm:text-sm font-manrope mt-1">
                {allMoments.length === 0
                  ? "Photos added from the admin portal will appear here."
                  : "Try selecting a different category or clearing your search term."}
              </p>
              {allMoments.length > 0 && (
                <button
                  onClick={() => {
                    setActiveCategory("all");
                    setSearchQuery("");
                  }}
                  className="mt-4 px-5 py-2 rounded-full bg-[#0B1F3B] text-white text-xs font-bold font-figtree hover:bg-[#d3d663] hover:text-[#0B1F3B] transition-colors cursor-pointer"
                >
                  Reset Filters
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ── High-End Lightbox Modal ── */}
      <AnimatePresence>
        {activePhoto && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="gallery-page-photo-title"
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md"
            onClick={closeLightbox}
          >
            {/* Prev Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              aria-label="Previous photo"
              className="absolute left-3 sm:left-6 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-[#d3d663] text-white hover:text-[#0B1F3B] flex items-center justify-center transition-all cursor-pointer backdrop-blur-md border border-white/20 active:scale-95"
            >
              <FiChevronLeft size={22} />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              aria-label="Next photo"
              className="absolute right-3 sm:right-6 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-[#d3d663] text-white hover:text-[#0B1F3B] flex items-center justify-center transition-all cursor-pointer backdrop-blur-md border border-white/20 active:scale-95"
            >
              <FiChevronRight size={22} />
            </button>

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-[#0B1F3B] border border-white/20 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
            >
              {/* Top Bar with Counter and Close */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0B1F3B]/90">
                <span className="text-xs font-bold text-white/70 font-figtree">
                  Moment {(lightboxIndex ?? 0) + 1} of {filteredItems.length}
                </span>

                <button
                  onClick={closeLightbox}
                  aria-label="Close photo preview"
                  className="w-8 h-8 rounded-full bg-white/10 text-white hover:bg-[#d3d663] hover:text-[#0B1F3B] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <FiX size={18} />
                </button>
              </div>

              {/* Main Photo View */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-black">
                <Image
                  src={activePhoto.image}
                  alt={activePhoto.title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Caption and Meta */}
              <div className="p-5 sm:p-7 bg-[#0B1F3B] flex flex-col gap-2 overflow-y-auto">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#d3d663]/20 text-[#d3d663] border border-[#d3d663]/30 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full font-figtree">
                      {activePhoto.category}
                    </span>
                    <h3 id="gallery-page-photo-title" className="text-lg sm:text-xl font-bold font-figtree text-white">
                      {activePhoto.title}
                    </h3>
                  </div>
                  <span className="text-xs text-white/50 flex items-center gap-1 font-manrope">
                    <FiCalendar size={12} className="text-[#d3d663]" />
                    {activePhoto.date}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-white/75 font-manrope leading-relaxed mt-1">
                  {activePhoto.description}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs text-white/50 font-manrope mt-1">
                  <span className="flex items-center gap-1.5">
                    <FiMapPin size={12} className="text-[#d3d663]" />
                    <span>{activePhoto.location}</span>
                  </span>
                  <span className="hidden sm:inline text-white/40">
                    Use &larr; &rarr; arrow keys to navigate
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
