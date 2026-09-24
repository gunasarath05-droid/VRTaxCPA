"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  FiPlus,
  FiFileText,
  FiEye,
  FiEdit,
  FiTrash2,
  FiSearch,
  FiCalendar,
  FiClock,
  FiTag,
  FiStar,
  FiArrowUpRight,
} from "react-icons/fi";

interface BlogsTabProps {
  blogs: any[];
  openAddBlogModal: () => void;
  openEditBlogModal: (post: any) => void;
  deleteBlog: (slug: string) => void;
  showToast: (msg: string, type?: "success" | "error" | "info") => void;
}

export default function BlogsTab({
  blogs = [],
  openAddBlogModal,
  openEditBlogModal,
  deleteBlog,
  showToast,
}: BlogsTabProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Distinct categories for filter pills
  const categories = useMemo(() => {
    const set = new Set<string>();
    blogs.forEach((b) => {
      if (b.category) set.add(b.category);
    });
    return ["all", ...Array.from(set)];
  }, [blogs]);

  // Filtered blogs
  const filteredBlogs = useMemo(() => {
    return (blogs || []).filter((post: any) => {
      const matchSearch =
        !searchTerm ||
        post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.summary?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (Array.isArray(post.takeaways) &&
          post.takeaways.some((t: string) =>
            t.toLowerCase().includes(searchTerm.toLowerCase())
          ));

      const matchCategory =
        selectedCategory === "all" ||
        post.category?.toLowerCase() === selectedCategory.toLowerCase();

      return matchSearch && matchCategory;
    });
  }, [blogs, searchTerm, selectedCategory]);

  return (
    <div className="space-y-6 pb-12">
      {/* ── Top Bar: Search, Category Filters & Action Button ── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <FiSearch
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search articles by title, keyword, category..."
            className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200/80 rounded-full text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1D61E7]/20 focus:border-[#1D61E7] transition-all font-manrope shadow-xs"
          />
        </div>

        {/* Action Button */}
        <button
          onClick={openAddBlogModal}
          className="px-6 py-2.5 rounded-full bg-[#1D61E7] hover:bg-[#1554C0] active:scale-[0.98] text-white font-bold text-sm font-figtree transition-all shadow-md shadow-blue-500/20 flex items-center gap-2 self-start lg:self-auto cursor-pointer shrink-0"
        >
          <FiPlus size={16} />
          <span>New Article</span>
        </button>
      </div>

      {/* Category Filter Pills */}
      {categories.length > 2 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold font-figtree transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? "bg-[#1D61E7] text-white shadow-xs"
                  : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200/80"
              }`}
            >
              {cat === "all" ? "All Articles" : cat}
            </button>
          ))}
        </div>
      )}

      {/* ── Blogs Grid ── */}
      {filteredBlogs.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-[32px] p-12 text-center flex flex-col items-center justify-center space-y-3 shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center">
            <FiFileText size={28} />
          </div>
          <h4 className="text-base font-bold text-[#0B1F3B] font-figtree">
            {searchTerm || selectedCategory !== "all"
              ? "No articles match your search or filter"
              : "No blog articles published yet"}
          </h4>
          <p className="text-xs text-slate-500 max-w-sm font-manrope">
            {searchTerm || selectedCategory !== "all"
              ? "Try adjusting your search terms or select 'All Articles'."
              : "Create insightful tax guides and accounting articles to attract clients and improve SEO."}
          </p>
          {searchTerm || selectedCategory !== "all" ? (
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
              className="mt-2 px-5 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold font-figtree cursor-pointer transition-all"
            >
              Reset Filters
            </button>
          ) : (
            <button
              onClick={openAddBlogModal}
              className="mt-2 px-6 py-2.5 rounded-full bg-[#0B1F3B] hover:bg-[#163558] text-white text-xs font-bold font-figtree cursor-pointer transition-all shadow-xs"
            >
              Create First Article
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((post: any) => (
            <div
              key={post.slug}
              className="bg-white border border-slate-100 rounded-3xl overflow-hidden flex flex-col justify-between group shadow-xs hover:shadow-md transition-all duration-300"
            >
              <div>
                {/* Image Thumbnail Container */}
                <div className="relative aspect-[16/9] w-full bg-slate-100 overflow-hidden">
                  {post.image ? (
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 gap-1 bg-slate-50">
                      <FiFileText size={32} />
                      <span className="text-[10px] font-mono">No Cover Image</span>
                    </div>
                  )}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
                    <span className="bg-[#1D61E7] text-white font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider font-figtree shadow-xs">
                      {post.category || "Tax Planning"}
                    </span>

                    {post.featured && (
                      <span className="bg-amber-400 text-slate-900 font-extrabold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider font-figtree shadow-sm flex items-center gap-1">
                        <FiStar size={10} className="fill-slate-900" /> Featured
                      </span>
                    )}
                  </div>

                  {/* Bottom Image Overlay: Read Time & Date */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white/90 text-[11px] font-manrope pointer-events-none">
                    <span className="flex items-center gap-1 font-medium">
                      <FiClock size={11} className="text-[#d3d663]" />
                      {post.readTime || "5 min read"}
                    </span>
                    {post.date && (
                      <span className="flex items-center gap-1 font-medium">
                        <FiCalendar size={11} />
                        {post.date}
                      </span>
                    )}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-5 space-y-2.5">
                  <h4 className="font-bold text-slate-900 text-base font-figtree line-clamp-2 leading-snug group-hover:text-[#1D61E7] transition-colors">
                    {post.title}
                  </h4>

                  <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed font-manrope">
                    {post.summary || "No excerpt provided for this article."}
                  </p>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-4 px-5 bg-slate-50/60 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href={`/blog/${post.slug}`}
                  target="_blank"
                  className="text-xs text-slate-600 hover:text-[#1D61E7] flex items-center gap-1 font-bold font-figtree transition-colors"
                >
                  <FiEye size={13} />
                  <span>View Live</span>
                  <FiArrowUpRight size={12} className="opacity-70" />
                </Link>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditBlogModal(post)}
                    className="px-3.5 py-1.5 text-slate-700 hover:text-white hover:bg-[#1D61E7] bg-white border border-slate-200 rounded-full text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all font-figtree shadow-2xs"
                  >
                    <FiEdit size={13} className="stroke-[2.2]" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => {
                      if (window.confirm(`Delete post "${post.title}"?`)) {
                        deleteBlog(post.slug);
                        showToast(`Deleted blog post`);
                      }
                    }}
                    className="p-2 text-rose-500 hover:text-white hover:bg-rose-500 bg-white border border-slate-200 rounded-full text-xs font-semibold cursor-pointer transition-colors shadow-2xs"
                    title="Delete post"
                  >
                    <FiTrash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
