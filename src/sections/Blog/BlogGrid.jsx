"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight, FiClock, FiUser, FiBookOpen } from "react-icons/fi";
import { blogPosts } from "@/constants/blogData";
import { useSiteData } from "@/context/SiteDataContext";

// Parse a date string like "Jun 15, 2026" into a timestamp for sorting
function parsePostDate(dateStr) {
  return new Date(dateStr).getTime() || 0;
}

export default function BlogGrid() {
  const { blogs, isLoaded } = useSiteData();
  const allPosts = isLoaded && Array.isArray(blogs)
    ? blogs
    : (blogs?.length ? blogs : blogPosts);

  // Sort all posts newest-first so newly added posts automatically appear at the top
  const sortedPosts = [...allPosts].sort(
    (a, b) => parsePostDate(b.date) - parsePostDate(a.date)
  );

  const featuredPost = sortedPosts.length > 0
    ? (sortedPosts.find((p) => p.featured) || sortedPosts[0])
    : null;
  const regularPosts = featuredPost
    ? sortedPosts.filter((p) => p.slug !== featuredPost.slug)
    : [];

  if (isLoaded && sortedPosts.length === 0) {
    return (
      <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
        {/* Soft background glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#0B1F3B]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-10 top-1/3 w-64 h-64 bg-[#d3d663]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-14 shadow-lg shadow-slate-100 flex flex-col items-center"
          >
            {/* Elegant Icon Badge */}
            <div className="relative mb-6">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#0B1F3B]/5 border border-[#0B1F3B]/10 flex items-center justify-center text-[#0B1F3B] shadow-inner">
                <FiBookOpen className="w-10 h-10 sm:w-12 sm:h-12 text-[#0B1F3B]" />
              </div>
              <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#d3d663] text-[#0B1F3B] flex items-center justify-center text-xs font-bold shadow-sm">
                !
              </span>
            </div>

            <span className="inline-block bg-[#0B1F3B]/10 text-[#0B1F3B] text-xs font-extrabold uppercase tracking-widest px-3 py-1 rounded-full font-figtree mb-3">
              Knowledge Base
            </span>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0B1F3B] font-figtree tracking-tight mb-3">
              No Articles Published Yet
            </h2>

            <div className="flex flex-wrap items-center justify-center gap-3 w-full sm:w-auto">
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 bg-[#0B1F3B] text-white font-figtree font-bold text-sm px-6 py-3.5 rounded-xl hover:bg-[#122e56] transition-all shadow-md shadow-[#0B1F3B]/15"
              >
                <span>Explore Our Services</span>
                <FiArrowRight size={15} />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-slate-100 text-[#0B1F3B] font-figtree font-bold text-sm px-6 py-3.5 rounded-xl hover:bg-slate-200 transition-all border border-slate-200"
              >
                <span>Contact Our CPAs</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

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
