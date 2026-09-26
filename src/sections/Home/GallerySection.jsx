"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import {
  FiArrowRight,
  FiChevronLeft,
  FiChevronRight,
  FiMapPin,
  FiCalendar,
  FiX,
  FiMaximize2,
} from "react-icons/fi";
import Button from "@/components/Button";
import { galleryItems } from "@/constants/galleryData";
import { useSiteData } from "@/context/SiteDataContext";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function GallerySection() {
  const { gallery, isLoaded } = useSiteData();
  const itemsToRender = isLoaded && Array.isArray(gallery)
    ? gallery
    : (gallery?.length ? gallery : galleryItems);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedPhoto(null);
    };
    if (selectedPhoto) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPhoto]);

  if (isLoaded && (!itemsToRender || itemsToRender.length === 0)) {
    return null;
  }

  return (
    <section id="gallery" className="py-16 sm:py-24 bg-white relative overflow-hidden border-t border-[#E2E8F0]">
      <style jsx global>{`
        .gallery-swiper .swiper-pagination {
          position: relative !important;
          margin-top: 2rem !important;
          bottom: auto !important;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 6px;
        }
        .gallery-swiper .swiper-pagination-bullet {
          background: #cbd5e1;
          opacity: 1;
          width: 8px;
          height: 8px;
          margin: 0 !important;
          border-radius: 9999px;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
        }
        .gallery-swiper .swiper-pagination-bullet-active {
          background: #0B1F3B !important;
          width: 28px;
          border-radius: 9999px;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-10 sm:mb-12"
        >
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#0B1F3B] font-figtree mb-2.5 block">
              Our Gallery
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1F3B] leading-tight font-figtree tracking-tight">
              Moments &amp; Firm Highlights
            </h2>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            {/* Slider Navigation Arrows */}
            <div className="flex items-center gap-2">
              <button
                className="gallery-prev-btn w-10 sm:w-11 h-10 sm:h-11 rounded-full border border-slate-200 bg-white text-[#0B1F3B] hover:bg-[#0B1F3B] hover:text-[#d3d663] hover:border-[#0B1F3B] flex items-center justify-center transition-all duration-300 shadow-xs cursor-pointer active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Previous gallery images"
              >
                <FiChevronLeft size={18} />
              </button>
              <button
                className="gallery-next-btn w-10 sm:w-11 h-10 sm:h-11 rounded-full border border-slate-200 bg-white text-[#0B1F3B] hover:bg-[#0B1F3B] hover:text-[#d3d663] hover:border-[#0B1F3B] flex items-center justify-center transition-all duration-300 shadow-xs cursor-pointer active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Next gallery images"
              >
                <FiChevronRight size={18} />
              </button>
            </div>

            <Button
              href="/gallery"
              variant="accent"
              size="md"
              className="shrink-0"
            >
              View All Photos
            </Button>
          </div>
        </motion.div>

        {/* Smooth X-Axis Horizontal Slider */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1.15}
          navigation={{
            prevEl: ".gallery-prev-btn",
            nextEl: ".gallery-next-btn",
          }}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={650}
          grabCursor={true}
          breakpoints={{
            640: {
              slidesPerView: 2.1,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 28,
            },
          }}
          className="gallery-swiper"
        >
          {itemsToRender.map((item) => (
            <SwiperSlide key={item.id} className="!h-auto pb-2">
              <article
                role="button"
                tabIndex={0}
                aria-label={`View photo: ${item.title}`}
                onClick={() => setSelectedPhoto(item)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedPhoto(item);
                  }
                }}
                className="group bg-white rounded-3xl overflow-hidden border border-[#E2E8F0] shadow-2xs hover:shadow-xl hover:border-[#0B1F3B] duration-300 transition-all flex flex-col justify-between h-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1F3B]"
              >
                <div className="block w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1F3B] rounded-3xl">
                  {/* Thumbnail Image Container */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#F8FAFC]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 400px"
                    />

                    {/* Category Pill on image */}
                    <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs text-[#0B1F3B] font-extrabold text-[11px] uppercase tracking-wider px-3 py-1 rounded-full shadow-2xs border border-[#E2E8F0] font-figtree">
                      {item.category}
                    </span>

                    {/* Hover expand hint icon */}
                    <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs text-[#0B1F3B] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-2xs border border-[#E2E8F0]">
                      <FiMaximize2 size={13} />
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 sm:p-6 flex flex-col gap-3">
                    <div className="flex items-center gap-3 text-xs text-[#334155] font-manrope">
                      <span>{item.date}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1 truncate">
                        <FiMapPin size={12} aria-hidden="true" className="text-[#2D503B] shrink-0" />
                        <span className="truncate max-w-[190px]">{item.location}</span>
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold font-figtree text-[#0B1F3B] leading-snug tracking-tight group-hover:text-[#2D503B] transition-colors line-clamp-2">
                      {item.title}
                    </h3>

                    <p className="text-[#334155] text-xs sm:text-sm leading-relaxed font-manrope line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Card Footer Link */}
                <div className="px-5 sm:px-6 pb-5 sm:pb-6" aria-hidden="true">
                  <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0B1F3B] group-hover:text-[#2D503B] font-figtree transition-colors">
                    <span>View Moment</span>
                    <FiArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>

      {/* Lightbox Preview Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md"
            onClick={() => setSelectedPhoto(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="home-gallery-modal-title"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full bg-[#0B1F3B] border border-white/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                aria-label="Close modal"
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 text-white hover:bg-[#d3d663] hover:text-[#0B1F3B] flex items-center justify-center transition-colors cursor-pointer border border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <FiX size={18} />
              </button>

              {/* Photo Display */}
              <div className="relative aspect-[16/10] w-full bg-black">
                <Image
                  src={selectedPhoto.image}
                  alt={selectedPhoto.title}
                  fill
                  className="object-cover object-center"
                  priority
                />
                <span className="absolute bottom-4 left-4 bg-[#0B1F3B]/90 backdrop-blur-md text-[#d3d663] text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-white/10 font-figtree">
                  {selectedPhoto.category}
                </span>
              </div>

              {/* Caption Info */}
              <div className="p-5 sm:p-7 flex flex-col gap-3 bg-[#0B1F3B]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 id="home-gallery-modal-title" className="text-xl sm:text-2xl font-bold font-figtree text-white">
                    {selectedPhoto.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-white/60">
                    <span className="flex items-center gap-1">
                      <FiCalendar size={13} className="text-[#d3d663]" />
                      {selectedPhoto.date}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-white/75 font-manrope leading-relaxed">
                  {selectedPhoto.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center gap-1.5 text-xs text-white/50">
                    <FiMapPin size={13} className="text-[#d3d663]" />
                    <span>{selectedPhoto.location}</span>
                  </div>
                  <Link
                    href="/gallery"
                    onClick={() => setSelectedPhoto(null)}
                    className="text-xs font-bold text-[#d3d663] hover:underline flex items-center gap-1 font-figtree"
                  >
                    <span>Browse All Photos</span>
                    <FiArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
