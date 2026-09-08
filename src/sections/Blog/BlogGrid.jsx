"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight, FiClock, FiUser } from "react-icons/fi";
import { blogPosts } from "@/constants/blogData";

// Parse a date string like "Jun 15, 2026" into a timestamp for sorting
function parsePostDate(dateStr) {
  return new Date(dateStr).getTime() || 0;
}

export default function BlogGrid() {
  // Sort all posts newest-first so newly added posts automatically appear at the top
  const sortedPosts = [...blogPosts].sort(
    (a, b) => parsePostDate(b.date) - parsePostDate(a.date)
  );

  const featuredPost =
    sortedPosts.find((p) => p.featured) || sortedPosts[0];
  const regularPosts = sortedPosts.filter(
    (p) => p.slug !== featuredPost.slug
  );

  return (
    <section className="py-8 sm:py-14 md:py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8 sm:gap-12 lg:gap-16 relative z-10">

        {/* Featured Post */}
        {featuredPost && (
          <motion.article
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid lg:grid-cols-12 gap-0 lg:gap-8 bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
          >
            <div className="lg:col-span-6 relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto min-h-[220px] sm:min-h-[280px] lg:min-h-full overflow-hidden bg-slate-100">
              <Image
                src={featuredPost.image}
                alt={featuredPost.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <span className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-[#0B1F3B] text-white text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full uppercase tracking-wider font-figtree shadow-sm">
                Featured Article
              </span>
            </div>

            <div className="lg:col-span-6 p-5 sm:p-7 lg:p-9 flex flex-col justify-between gap-5 sm:gap-6">
              <div className="flex flex-col gap-2.5 sm:gap-3.5">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-semibold text-slate-400">
                  <span className="bg-[#0B1F3B]/10 text-[#0B1F3B] px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full font-bold font-figtree">
                    {featuredPost.category}
                  </span>
                  <span>{featuredPost.date}</span>
                  <span className="flex items-center gap-1 font-manrope">
                    <FiClock size={12} className="text-[#d3d663]" /> {featuredPost.readTime}
                  </span>
                </div>

                <h2 className="text-lg sm:text-2xl lg:text-3xl font-extrabold font-figtree text-[#0B1F3B] leading-snug group-hover:text-[#d3d663] transition-colors">
                  <Link href={`/blog/${featuredPost.slug}`}>{featuredPost.title}</Link>
                </h2>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-manrope line-clamp-3 sm:line-clamp-none">
                  {featuredPost.summary}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 sm:pt-5 border-t border-slate-100">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0B1F3B] font-figtree">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#0B1F3B]/10 text-[#0B1F3B] flex items-center justify-center">
                    <FiUser size={12} />
                  </div>
                  <span>{featuredPost.author}</span>
                </div>

                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold text-[#0B1F3B] group-hover:text-[#d3d663] group-hover:gap-2.5 transition-all font-figtree"
                >
                  <span>Read Full Guide</span>
                  <FiArrowRight size={14} />
                </Link>
              </div>
            </div>
          </motion.article>
        )}

        {/* Regular Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {regularPosts.map((post, idx) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              className="bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 bg-[#d3d663] text-[#0B1F3B] font-extrabold text-[10px] tracking-wider uppercase px-2.5 py-0.5 rounded shadow-xs font-figtree">
                    {post.category}
                  </div>
                </div>

                <div className="p-4 sm:p-6 flex flex-col gap-2.5 sm:gap-3">
                  <div className="flex flex-wrap items-center gap-2 text-[11px] sm:text-xs font-semibold text-slate-400">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 font-manrope">
                      <FiClock size={11} className="text-[#d3d663]" /> {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold font-figtree text-[#0B1F3B] leading-snug group-hover:text-[#d3d663] transition-colors line-clamp-2">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3 font-manrope">
                    {post.summary}
                  </p>
                </div>
              </div>

              <div className="p-4 sm:p-6 pt-0 flex items-center justify-between border-t border-slate-100 text-xs">
                <Link
                  href={`/blog/${post.slug}`}
                  className="font-bold text-[#0B1F3B] group-hover:text-[#d3d663] flex items-center gap-1.5 group-hover:gap-2 transition-all font-figtree"
                >
                  <span>Read Article</span>
                  <FiArrowRight size={13} />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}
