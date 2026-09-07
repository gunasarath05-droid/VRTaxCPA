"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight, FiClock, FiUser } from "react-icons/fi";
import { blogPosts } from "@/constants/blogData";

export default function BlogGrid() {
  const featuredPost = blogPosts.find((p) => p.featured) || blogPosts[0];
  const regularPosts = blogPosts.filter((p) => p.slug !== featuredPost.slug);

  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col gap-12 sm:gap-16 relative z-10">

        {/* Featured Post */}
        {featuredPost && (
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid lg:grid-cols-12 gap-6 lg:gap-8 bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-400 group"
          >
            <div className="lg:col-span-6 relative aspect-[16/10] overflow-hidden bg-slate-100">
              <Image
                src={featuredPost.image}
                alt={featuredPost.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 600px"
                priority
              />
              <span className="absolute top-4 left-4 bg-[#0B1F3B] text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider font-figtree shadow-sm">
                Featured Article
              </span>
            </div>

            <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between gap-6">
              <div className="flex flex-col gap-3.5">
                <div className="flex items-center gap-3 text-xs font-semibold text-slate-400">
                  <span className="bg-[#0B1F3B]/10 text-[#0B1F3B] px-3 py-1 rounded-full font-bold font-figtree">
                    {featuredPost.category}
                  </span>
                  <span>{featuredPost.date}</span>
                  <span className="flex items-center gap-1">
                    <FiClock size={12} className="text-[#d3d663]" /> {featuredPost.readTime}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-figtree text-[#0B1F3B] leading-snug group-hover:text-[#d3d663] transition-colors">
                  <Link href={`/blog/${featuredPost.slug}`}>{featuredPost.title}</Link>
                </h2>

                <p className="text-[#66706A] text-xs sm:text-sm leading-relaxed font-manrope">
                  {featuredPost.summary}
                </p>
              </div>

              <div className="flex items-center justify-between pt-5 border-t border-slate-100">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0B1F3B] font-figtree">
                  <div className="w-7 h-7 rounded-full bg-[#0B1F3B]/10 text-[#0B1F3B] flex items-center justify-center">
                    <FiUser size={13} />
                  </div>
                  <span>{featuredPost.author}</span>
                </div>

                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0B1F3B] group-hover:text-[#d3d663] group-hover:gap-2.5 transition-all font-figtree"
                >
                  <span>Read Full Guide</span>
                  <FiArrowRight size={14} />
                </Link>
              </div>
            </div>
          </motion.article>
        )}

        {/* Regular Posts Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {regularPosts.map((post, idx) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white border border-slate-200/80 rounded-3xl overflow-hidden hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col group justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                  <div className="absolute top-3 left-3 bg-[#d3d663] text-[#0B1F3B] font-extrabold text-[10px] tracking-wider uppercase px-2.5 py-0.5 rounded shadow-sm font-figtree">
                    {post.category}
                  </div>
                </div>

                <div className="p-6 sm:p-7 flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 font-manrope">
                      <FiClock size={11} className="text-[#d3d663]" /> {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold font-figtree text-[#0B1F3B] leading-snug group-hover:text-[#d3d663] transition-colors line-clamp-2">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>

                  <p className="text-[#66706A] text-xs sm:text-sm leading-relaxed line-clamp-3 font-manrope">
                    {post.summary}
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-7 pt-0 flex items-center justify-between border-t border-slate-100 text-xs">
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
