"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FiArrowRight, FiClock, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Button from "@/components/Button";
import { blogPosts } from "@/constants/blogData";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Blog() {
  return (
    <section id="blog" className="py-16 sm:py-24 bg-white relative overflow-hidden border-t border-[#E2E8F0]">
      <style jsx global>{`
        .blog-swiper .swiper-pagination {
          position: relative !important;
          margin-top: 2rem !important;
          bottom: auto !important;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 6px;
        }
        .blog-swiper .swiper-pagination-bullet {
          background: #cbd5e1;
          opacity: 1;
          width: 8px;
          height: 8px;
          margin: 0 !important;
          border-radius: 9999px;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
        }
        .blog-swiper .swiper-pagination-bullet-active {
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
              Knowledge Base
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1F3B] leading-tight font-figtree tracking-tight max-w-xl">
              Tax &amp; Accounting Insights
            </h2>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            {/* Slider Navigation Arrows */}
            <div className="flex items-center gap-2">
              <button
                className="blog-prev-btn w-10 sm:w-11 h-10 sm:h-11 rounded-full border border-slate-200 bg-white text-[#0B1F3B] hover:bg-[#0B1F3B] hover:text-[#d3d663] hover:border-[#0B1F3B] flex items-center justify-center transition-all duration-300 shadow-xs cursor-pointer active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Previous articles"
              >
                <FiChevronLeft size={18} />
              </button>
              <button
                className="blog-next-btn w-10 sm:w-11 h-10 sm:h-11 rounded-full border border-slate-200 bg-white text-[#0B1F3B] hover:bg-[#0B1F3B] hover:text-[#d3d663] hover:border-[#0B1F3B] flex items-center justify-center transition-all duration-300 shadow-xs cursor-pointer active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Next articles"
              >
                <FiChevronRight size={18} />
              </button>
            </div>

            <Button
              href="/blog"
              variant="accent"
              size="md"
              className="shrink-0"
            >
              View All Articles
            </Button>
          </div>
        </motion.div>

        {/* Smooth X-Axis Horizontal Slider */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1.15}
          navigation={{
            prevEl: ".blog-prev-btn",
            nextEl: ".blog-next-btn",
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
          className="blog-swiper"
        >
          {blogPosts.map((post, idx) => (
            <SwiperSlide key={post.slug || idx} className="!h-auto pb-2">
              <article className="group bg-white rounded-3xl overflow-hidden border border-[#E2E8F0] shadow-2xs hover:shadow-xl hover:border-[#d3d663]/50 duration-300 transition-all flex flex-col justify-between h-full">
                <Link href={`/blog/${post.slug}`} className="block w-full">
                  {/* Thumbnail Image Container */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#F8FAFC]">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 400px"
                    />
                    {/* Category Pill on image */}
                    <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs text-[#0B1F3B] font-extrabold text-[11px] uppercase tracking-wider px-3 py-1 rounded-full shadow-2xs border border-[#E2E8F0] font-figtree">
                      {post.category}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 sm:p-6 flex flex-col gap-3">
                    <div className="flex items-center gap-3 text-xs text-[#66706A] font-manrope">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <FiClock size={12} />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold font-figtree text-[#0B1F3B] leading-snug tracking-tight group-hover:text-[#d3d663] transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-[#66706A] text-xs sm:text-sm leading-relaxed font-manrope line-clamp-2">
                      {post.summary}
                    </p>
                  </div>
                </Link>

                {/* Card Footer Link */}
                <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0 mt-auto">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0B1F3B] group-hover:text-[#d3d663] font-figtree transition-colors"
                  >
                    <span>Read Article</span>
                    <FiArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}
