"use client";

import Link from "next/link";
import Button from "@/components/Button";
import { motion } from "framer-motion";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import { servicesData } from "@/constants/servicesData";

export default function RelatedServices({ relatedSlugs }) {
  if (!relatedSlugs || relatedSlugs.length === 0) return null;

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-[#0B1F3B] mb-4 font-figtree">
            RELATED SERVICES
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1F3B] leading-tight font-figtree tracking-tight">
            Explore Our Services
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#66706A] font-manrope">
            Comprehensive financial coverage and advisory tailored for your business and personal tax needs.
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {relatedSlugs.map((slug, idx) => {
            const service = servicesData[slug];
            if (!service) return null;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative bg-white border border-slate-200/80 hover:border-[#d3d663]/60 rounded-[28px] p-6 sm:p-8 shadow-sm hover:shadow-[0_20px_45px_-12px_rgba(0,0,0,0.08)] hover:bg-white hover:-translate-y-2 transition-all duration-500 ease-out flex flex-col justify-between"
              >
                <div>
                  {/* Service Title */}
                  <h3 className="text-xl sm:text-2xl font-extrabold font-figtree text-[#0B1F3B] mb-3 leading-snug group-hover:text-[#d3d663] transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Overview Paragraph */}
                  <p className="text-[#66706A] text-xs sm:text-sm leading-relaxed font-manrope line-clamp-3 mb-6">
                    {service.overview}
                  </p>

                  {/* Key Offerings Preview */}
                  {service.whatWeOffer && service.whatWeOffer.length > 0 && (
                    <div className="pt-4 border-t border-slate-200/70 space-y-2.5 mb-8">
                      {service.whatWeOffer.slice(0, 3).map((item, i) => (
                        <div key={i} className="flex items-center gap-2.5 text-xs text-[#4A5550] font-manrope">
                          <span className="flex items-center justify-center flex-shrink-0 text-slate-400 group-hover:text-[#0B1F3B] transition-colors duration-300">
                            <FiCheckCircle className="text-sm text-[#0B1F3B]/70 group-hover:text-[#0B1F3B] transition-colors duration-300" />
                          </span>
                          <span className="font-medium line-clamp-1">{item.title}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Interactive CTA Link */}
                <Button
                  href={`/services/${slug}`}
                  variant="dark"
                  size="md"
                  className="self-start mt-auto"
                >
                  Explore Service
                </Button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

