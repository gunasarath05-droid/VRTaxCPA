"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, Pagination, Navigation } from "swiper/modules";
import { FiArrowRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Curated high-res imagery for each industry
const getIndustryImage = (name = "") => {
  const lower = name.toLowerCase();
  if (lower.includes("real estate") || lower.includes("rental") || lower.includes("property")) {
    return "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80";
  }
  if (lower.includes("restaurant") || lower.includes("hospitality") || lower.includes("hotel") || lower.includes("franchise")) {
    return "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80";
  }
  if (lower.includes("dental") || lower.includes("healthcare") || lower.includes("medical")) {
    return "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80";
  }
  if (lower.includes("it") || lower.includes("tech") || lower.includes("software") || lower.includes("saas")) {
    return "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80";
  }
  if (lower.includes("staffing") || lower.includes("consultant")) {
    return "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80";
  }
  if (lower.includes("manufacturing") || lower.includes("industrial")) {
    return "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80";
  }
  if (lower.includes("contractor") || lower.includes("construction") || lower.includes("trades")) {
    return "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80";
  }
  if (lower.includes("artist") || lower.includes("creator") || lower.includes("creative") || lower.includes("freelance")) {
    return "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80";
  }
  return "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80";
};

/**
 * @param {{ industries?: string[] }} props
 */
export default function IndustriesWeServe({ industries }) {
  if (!industries || industries.length === 0) return null;

  // Ensure enough items for smooth infinite loop
  const displayIndustries =
    industries.length < 5
      ? [...industries, ...industries, ...industries]
      : industries;

  return (
    <section className="relative py-12 sm:py-16 bg-[#0B1F3B] text-white overflow-hidden my-4 sm:my-6">
      {/* Subtle organic top & bottom dividers */}
      <div className="absolute top-0 inset-x-0 h-6 bg-white [clip-path:ellipse(60%_100%_at_50%_0%)]" />
      <div className="absolute bottom-0 inset-x-0 h-6 bg-white [clip-path:ellipse(60%_100%_at_50%_100%)]" />

      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] rounded-full opacity-15 pointer-events-none bg-[radial-gradient(circle,#d3d663,transparent_70%)] filter blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Section Header (Compact & Crisp) */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <span className="inline-flex items-center gap-1.5 text-[#d3d663] text-sm font-extrabold uppercase tracking-widest mb-3 font-figtree">
            INDUSTRY EXPERTISE
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight font-figtree tracking-tight">
            Tailored Financial Expertise Across Sectors
          </h2>
        </div>

        {/* ── 3D Coverflow Smooth Auto-Slider (Reduced Card Height) ── */}
        <div className="relative industry-coverflow-wrapper">
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            speed={700}
            autoplay={{
              delay: 2800,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 1.2,
              slideShadows: false,
            }}
            navigation={{
              prevEl: ".industry-prev-btn",
              nextEl: ".industry-next-btn",
            }}
            pagination={{
              clickable: true,
              bulletClass: "industry-bullet-dark",
              bulletActiveClass: "industry-bullet-dark-active",
            }}
            modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
            className="w-full pb-10 pt-1"
          >
            {displayIndustries.map((industry, idx) => {
              const name = typeof industry === "string" ? industry : industry?.name || "Industry";
              const imgUrl = typeof industry === "object" && industry?.image ? industry.image : getIndustryImage(name);

              return (
                <SwiperSlide
                  key={idx}
                  className="!w-[250px] sm:!w-[290px] md:!w-[330px] transition-all duration-500 pb-8"
                >
                  {({ isActive }) => (
                    <div
                      className={`relative aspect-[4/5] sm:aspect-[4/5] rounded-[22px] sm:rounded-[26px] overflow-hidden shadow-xl transition-all duration-500 border select-none ${
                        isActive
                          ? "scale-100 opacity-100 border-[#d3d663] shadow-[0_15px_35px_rgba(0,0,0,0.5)] ring-2 ring-[#d3d663]/40"
                          : "scale-[0.9] opacity-50 brightness-75 blur-[1.5px] border-white/10"
                      }`}
                    >
                      {/* Background Image */}
                      <Image
                        src={imgUrl}
                        alt={name}
                        fill
                        className="object-cover object-center transition-transform duration-700 ease-out hover:scale-105"
                        sizes="(max-width: 640px) 250px, (max-width: 1024px) 290px, 330px"
                        priority={idx < 4}
                      />

                      {/* Smooth Dark Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3B]/95 via-[#0B1F3B]/35 to-transparent z-10" />

                      {/* Card Content at Bottom */}
                      <div className="absolute inset-x-0 bottom-0 z-20 p-4 sm:p-5 flex items-end justify-between gap-2">
                        <div>
                          <h3 className="text-base sm:text-lg md:text-xl font-extrabold font-figtree text-white leading-tight tracking-tight drop-shadow-md">
                            {name}
                          </h3>
                        </div>

                        {/* Pill Explore Button */}
                        <Link
                          href="/contact"
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-white/40 bg-white/15 backdrop-blur-md text-white text-xs font-bold font-figtree hover:bg-[#d3d663] hover:text-[#0B1F3B] hover:border-[#d3d663] transition-all duration-300 shadow-md group/btn flex-shrink-0"
                        >
                          <span>Explore</span>
                          <FiArrowRight className="text-sm transition-transform duration-300 group-hover/btn:translate-x-0.5" />
                        </Link>
                      </div>
                    </div>
                  )}
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Navigation Controls */}
          {/* <button
            className="industry-prev-btn absolute left-1 sm:left-3 top-[44%] -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white text-[#0E1710] hover:bg-[#D4D367] shadow-xl flex items-center justify-center transition-all duration-300 cursor-pointer hidden md:flex"
            aria-label="Previous Industry"
          >
            <FiChevronLeft size={18} />
          </button>
          <button
            className="industry-next-btn absolute right-1 sm:right-3 top-[44%] -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white text-[#0E1710] hover:bg-[#D4D367] shadow-xl flex items-center justify-center transition-all duration-300 cursor-pointer hidden md:flex"
            aria-label="Next Industry"
          >
            <FiChevronRight size={18} />
          </button> */}
        </div>

      </div>

      {/* ── Custom Pagination Styles ── */}
      <style jsx global>{`
        .industry-coverflow-wrapper .swiper-pagination {
          position: relative !important;
          bottom: 0 !important;
          margin-top: 0.75rem !important;
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
          gap: 0.4rem !important;
        }
        .industry-coverflow-wrapper .industry-bullet-dark {
          width: 7px;
          height: 7px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.35);
          opacity: 1;
          display: inline-block;
          cursor: pointer;
          transition: all 0.35s ease;
        }
        .industry-coverflow-wrapper .industry-bullet-dark:hover {
          background: rgba(255, 255, 255, 0.7);
        }
        .industry-coverflow-wrapper .industry-bullet-dark-active {
          width: 22px !important;
          height: 7px !important;
          border-radius: 9999px !important;
          background: #d3d663 !important;
          box-shadow: 0 0 8px rgba(197, 168, 128, 0.6);
        }
      `}</style>
    </section>
  );
}
