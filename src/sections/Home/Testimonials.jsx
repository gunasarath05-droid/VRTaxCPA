"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from "react-icons/fa";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function Testimonials() {
  const testimonialsList = [
    {
      name: "Marcus T.",
      desig: "Real Estate Investor · Irving, TX",
      initials: "MT",
      rating: 5,
      industry: "Real Estate",
      desc: "Vethavalli saved me tens of thousands in taxes by correctly structuring my rental properties and recommending a cost segregation study. She explained everything clearly and was available whenever I had questions. I've already referred three other investors to VR Tax CPA LLC.",
    },
    {
      name: "Dr. Priya N.",
      desig: "Dentist · Owner, Bright Smiles Dental",
      initials: "PN",
      rating: 5,
      industry: "Dental Practice",
      desc: "Running a dental practice is already overwhelming — dealing with taxes on top of that was a nightmare until I found VR Tax CPA LLC. Vethavalli set up our payroll, organized our books, and reduced our tax liability significantly through proper S-Corp structuring. She's an absolute gem.",
    },
    {
      name: "Alex R.",
      desig: "Co-Founder · SaaS Startup · Dallas, TX",
      initials: "AR",
      rating: 5,
      industry: "IT & Tech",
      desc: "As a tech startup founder, I needed a CPA who understands the intersection of tech, equity compensation, and growth planning. Vethavalli built us a cash flow model, helped with our entity election, and keeps our quarterly taxes on track. She's become a true strategic partner for our business.",
    },
    {
      name: "Lisa M.",
      desig: "Restaurant Owner · Fort Worth, TX",
      initials: "LM",
      rating: 5,
      industry: "Restaurants",
      desc: "I had back taxes and unfiled returns that were keeping me up at night. VR Tax CPA LLC handled everything — they filed all the back returns, negotiated with the IRS, and got my penalties abated. Now my books are clean and my sales tax is filed on time every month. I couldn't be more relieved.",
    },
    {
      name: "Ryan K.",
      desig: "General Contractor · DFW Area",
      initials: "RK",
      rating: 5,
      industry: "Contractors",
      desc: "Before VR Tax CPA LLC, I was leaving money on the table every year. Vethavalli found deductions I'd never claimed — home office, vehicle, tools, and retirement contributions. My tax bill dropped by over $12,000 last year. Wish I'd found her sooner!",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
      {/* subtle bg glows */}
      <div className="absolute right-0 top-1/3 w-[500px] h-[500px] rounded-full bg-[#d3d663]/6 blur-3xl pointer-events-none" />
      <div className="absolute -left-20 bottom-0 w-80 h-80 rounded-full bg-[#0B1F3B]/4 blur-3xl pointer-events-none" />

      {/* Slide transition styles */}
      <style>{`
        .testi-swiper .swiper-slide {
          transition: transform 0.75s cubic-bezier(0.76,0,0.24,1),
                      opacity 0.75s cubic-bezier(0.76,0,0.24,1);
          transform: scale(0.84);
          opacity: 0.45;
        }
        .testi-swiper .swiper-slide-active {
          transform: scale(1);
          opacity: 1;
        }
        .testi-swiper .swiper-slide .quote-badge {
          background: #ffffff;
          color: #94a3b8;
          border: 1.5px solid #E2E8F0;
        }
        .testi-swiper .swiper-slide-active .quote-badge {
          background: #0B1F3B;
          color: #d3d663;
          border-color: #0B1F3B;
          box-shadow: 0 4px 14px rgba(11, 31, 59, 0.25);
          transform: translateX(-50%) scale(1.08);
        }
        .testi-swiper .swiper-pagination {
          bottom: 0px !important;
        }
        .testi-swiper .swiper-pagination-bullet {
          background: #cbd5e1;
          opacity: 1;
          width: 8px;
          height: 8px;
        }
        .testi-swiper .swiper-pagination-bullet-active {
          background: #0B1F3B !important;
          width: 24px;
          border-radius: 4px;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center text-[#0B1F3B] text-xs font-extrabold uppercase tracking-widest mb-4">
            Client Success Stories
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0B1F3B] leading-tight font-figtree tracking-tight">
            Real Clients. Real Tax Savings. Real Results.
          </h2>
        </div>

        {/* Carousel wrapper */}
        <div className="relative">
          {/* Prev / Next arrows */}
          <button className="testi-prev-btn absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-6 z-20 hidden sm:flex w-11 h-11 rounded-full border border-slate-200 bg-white text-slate-500 hover:text-white hover:bg-[#0B1F3B] hover:border-[#0B1F3B] items-center justify-center transition-all shadow-sm cursor-pointer">
            <FaChevronLeft size={14} />
          </button>
          <button className="testi-next-btn absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-6 z-20 hidden sm:flex w-11 h-11 rounded-full border border-slate-200 bg-white text-slate-500 hover:text-white hover:bg-[#0B1F3B] hover:border-[#0B1F3B] items-center justify-center transition-all shadow-sm cursor-pointer">
            <FaChevronRight size={14} />
          </button>

          <Swiper
            modules={[Pagination, Autoplay, Navigation]}
            spaceBetween={24}
            centeredSlides={true}
            loop={true}
            speed={750}
            autoplay={{ delay: 5500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            navigation={{ prevEl: ".testi-prev-btn", nextEl: ".testi-next-btn" }}
            className="testi-swiper pb-20"
            breakpoints={{
              0: { slidesPerView: 1.05 },
              640: { slidesPerView: 1.3 },
              1024: { slidesPerView: 1.55 },
              1280: { slidesPerView: 1.7 },
            }}
          >
            {testimonialsList.map((t, i) => (
              <SwiperSlide key={i} className="pt-2 pb-12">
                <div className="relative bg-white border border-[#E2E8F0] rounded-3xl p-7 md:p-10 pb-9 md:pb-11 shadow-md">

                  {/* Top: avatar + name + stars */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-4">
                      {/* Avatar */}
                      <div className="relative hidden md:block">
                        <div
                          className={`w-14 h-14 rounded-2xl bg-[#0B1F3B] flex items-center justify-center text-white font-extrabold text-lg font-figtree flex-shrink-0 shadow-sm`}
                        >
                          {t.initials}
                        </div>
                      </div>

                      <div>
                        <h5 className="text-lg font-bold font-figtree text-[#0B1F3B] leading-tight">
                          {t.name}
                        </h5>
                        <p className="text-sm text-slate-500 mt-0.5">{t.desig}</p>
                      </div>
                    </div>

                    {/* Stars */}
                    <div className="flex gap-1 text-amber-400 text-2xl sm:text-3xl mt-1">
                      {"★".repeat(t.rating)}
                    </div>
                  </div>

                  {/* Quote text */}
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed relative z-10 font-manrope">
                    &ldquo;{t.desc}&rdquo;
                  </p>

                  {/* Circular quote badge */}
                  <div className="quote-badge absolute -bottom-5 left-1/2 -translate-x-1/2 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-500 z-10 shadow-sm">
                    <FaQuoteRight className="text-xs sm:text-sm" />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </section>
  );
}
