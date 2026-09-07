"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

export default function RelatedBlogs() {
  const blogs = [
    {
      title: "How Small Business Owners Can Maximize Deductions and Lower Taxes in 2026",
      desc: "An overview of multi-state tax filing liabilities and asset structures for statutory audit certifications.",
      date: "Jan 15, 2026",
      category: "Tax Planning",
      image: "https://ranko.themejunction.net/wp-content/uploads/2025/09/blog-1.webp",
      href: "/blog/tax-savings",
    },
    {
      title: "Setting Up Compliant Payroll: What S-Corp Owners Must Know About Reasonable Salary",
      desc: "A guide to understanding burn runaways, margins allocations, and tax credit opportunities.",
      date: "Jan 28, 2026",
      category: "Payroll Support",
      image: "https://ranko.themejunction.net/wp-content/uploads/2025/09/blog-2.webp",
      href: "/blog/small-business-payroll-setup",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#FAF9F5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#0B1F3B]/8 text-[#0B1F3B] px-3.5 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-bold uppercase tracking-widest border border-[#C5A880]/30 mb-3 sm:mb-4 font-figtree">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0B1F3B] inline-block" />
            Insights &amp; Articles
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1F3B] leading-tight font-figtree tracking-tight">
            Financial Insights &amp; Tax Guides
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#66706A] font-manrope">
            Practical strategies written by our certified tax advisors to help you save and scale.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {blogs.map((blog, idx) => (
            <motion.article
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl duration-300 transition-all flex flex-col group"
            >
              {/* Blog Photo */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 500px"
                />
                <div className="absolute top-4 left-4 z-10 bg-[#C5A880] text-[#0B1F3B] font-extrabold text-[10px] tracking-wider uppercase px-2.5 py-1 rounded shadow-sm font-figtree">
                  {blog.category}
                </div>
              </div>

              {/* Text Area */}
              <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 gap-4">
                <div>
                  <span className="text-xs text-slate-400 font-semibold mb-2 block font-figtree">
                    {blog.date}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold font-figtree text-[#0B1F3B] mb-2 group-hover:text-[#C5A880] transition-colors line-clamp-2">
                    <Link href={blog.href}>{blog.title}</Link>
                  </h3>
                  <p className="text-[#66706A] text-xs sm:text-sm leading-relaxed font-manrope line-clamp-2">
                    {blog.desc}
                  </p>
                </div>

                <Link
                  href={blog.href}
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#0B1F3B] hover:text-[#C5A880] transition-all duration-200 mt-2 font-figtree"
                >
                  <span>Read full analysis</span>
                  <FiArrowRight className="text-sm" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
