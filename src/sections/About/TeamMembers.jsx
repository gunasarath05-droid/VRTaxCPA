"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import darkGreenBg from "@/assets/images/about/darkgreen.png";

export default function TeamMembers() {
  const team = [
    {
      name: "Eleanor Pena",
      role: "Operations Head",
      bg: "bg-[#2D5A27]", // Rich Green
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Cameron William",
      role: "Marketing & Tax Lead",
      bg: "bg-[#4A6B22]", // Olive Green
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Robert Fox",
      role: "Business Director",
      bg: "bg-[#1E3A24]", // Deep Forest
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Dianne Russell",
      role: "Senior Tax Accountant",
      bg: "bg-[#9CB05A]", // Muted Olive
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Jenny Wilson",
      role: "Payroll & Compliance Lead",
      bg: "bg-[#3D6B35]", // Sage Green
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Guy Hawkins",
      role: "Advisory & CFO Manager",
      bg: "bg-[#28572E]", // Herbal Green
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
    },
  ];

  return (
    <section
      id="team"
      className="py-14 sm:py-20 lg:py-24 mx-3 sm:mx-6 md:mx-10 my-8 sm:my-10 relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${darkGreenBg.src})` }}
    >
      {/* ── Dot Grid Pattern (Top Left) ── */}
      <div className="absolute top-6 left-6 opacity-20 pointer-events-none hidden sm:block">
        <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
          {[0, 20, 40, 60].map((x) =>
            [0, 20, 40, 60].map((y) => (
              <circle key={`${x}-${y}`} cx={x + 10} cy={y + 10} r="2.5" fill="#ffffff" />
            ))
          )}
        </svg>
      </div>

      {/* ── Dot Grid Pattern (Bottom Right) ── */}
      <div className="absolute bottom-6 right-6 opacity-20 pointer-events-none hidden sm:block">
        <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
          {[0, 20, 40, 60].map((x) =>
            [0, 20, 40, 60].map((y) => (
              <circle key={`${x}-${y}`} cx={x + 10} cy={y + 10} r="2.5" fill="#ffffff" />
            ))
          )}
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* ── Header ── */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 text-white px-3.5 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-bold uppercase tracking-widest border border-white/20 mb-3 sm:mb-4 font-figtree backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] inline-block" />
              Our Teams
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight font-figtree tracking-tight">
              Meet Our Digital Teams
            </h2>
          </motion.div>
        </div>

        {/* ── Team Slider (X-axis Smooth Slide) ── */}
        <div className="relative team-slider-wrapper">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1.2}
            centeredSlides={false}
            loop={true}
            speed={800}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              bulletClass: "team-bullet",
              bulletActiveClass: "team-bullet-active",
            }}
            breakpoints={{
              480: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
            }}
            className="pb-12"
          >
            {team.map((member, idx) => (
              <SwiperSlide key={idx}>
                <div className="group flex flex-col items-center cursor-pointer">
                  {/* Photo Container with Vibrant Colorful BG */}
                  <div
                    className={`relative w-full aspect-[4/4.8] rounded-3xl overflow-hidden ${member.bg} shadow-lg transition-all duration-500 group-hover:-translate-y-2 group-hover:scale-[1.02] group-hover:shadow-2xl`}
                  >
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 640px) 80vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    {/* Subtle inner shadow / border */}
                    <div className="absolute inset-0 rounded-3xl border border-white/10 pointer-events-none" />
                  </div>

                  {/* Name & Role below */}
                  <div className="text-center mt-4 sm:mt-5 transition-transform duration-300 group-hover:-translate-y-1">
                    <h3 className="text-base sm:text-lg font-extrabold text-white font-figtree tracking-tight transition-colors duration-300 group-hover:text-[#C5A880]">
                      {member.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/70 font-manrope mt-1">
                      {member.role}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* ── Custom Swiper Pagination Styling (pill + dots) ── */}
      <style jsx global>{`
        .team-slider-wrapper .swiper-pagination {
          position: relative !important;
          bottom: 0 !important;
          margin-top: 1.5rem !important;
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
          gap: 0.5rem !important;
        }
        .team-slider-wrapper .team-bullet {
          width: 8px;
          height: 8px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.35);
          opacity: 1;
          display: inline-block;
          cursor: pointer;
          transition: all 0.35s ease;
        }
        .team-slider-wrapper .team-bullet:hover {
          background: rgba(255, 255, 255, 0.7);
        }
        .team-slider-wrapper .team-bullet-active {
          width: 28px !important;
          height: 8px !important;
          border-radius: 9999px !important;
          background: #ffffff !important;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </section>
  );
}