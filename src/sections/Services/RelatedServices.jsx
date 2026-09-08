"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { servicesData } from "@/constants/servicesData";

// Icon Images Mapping
import iconTaxCompliance from "@/assets/images/home/services/icons/Tax Compliance.png";
import iconTaxPlanning from "@/assets/images/home/services/icons/Tax Planning & Advisory.png";
import iconBusinessFormation from "@/assets/images/home/services/icons/Business Entity Formation.png";
import iconPayrollSupport from "@/assets/images/home/services/icons/Payroll Support.png";
import iconAccountingServices from "@/assets/images/home/services/icons/Accounting Services.png";
import iconFractionalCFO from "@/assets/images/home/services/icons/Fractional CFO.png";
import iconIRSRepresentation from "@/assets/images/home/services/icons/IRS Representation.png";
import iconSalesTax1099 from "@/assets/images/home/services/icons/Sales Tax & 1099.png";

const serviceIcons = {
  "tax-compliance": iconTaxCompliance,
  "tax-planning": iconTaxPlanning,
  "business-formation": iconBusinessFormation,
  "payroll-services": iconPayrollSupport,
  "accounting-services": iconAccountingServices,
  "fractional-cfo": iconFractionalCFO,
  "irs-representation": iconIRSRepresentation,
  "sales-tax-1099": iconSalesTax1099,
};

export default function RelatedServices({ relatedSlugs }) {
  if (!relatedSlugs || relatedSlugs.length === 0) return null;

  return (
    <section className="py-8 md:py-16 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-[#0B1F3B] mb-3 font-figtree">
            RELATED SERVICES
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1F3B] leading-tight font-figtree tracking-tight">
            Explore Other Services
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 font-manrope">
            Comprehensive financial coverage and advisory tailored for your business and personal tax needs.
          </p>
        </div>

        {/* Clean Icon & Title Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto">
          {relatedSlugs.map((slug, idx) => {
            const service = servicesData[slug];
            if (!service) return null;

            const iconImg = serviceIcons[slug] || iconTaxCompliance;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
              >
                <Link
                  href={`/services/${slug}`}
                  className="group relative bg-white border border-slate-200/90 hover:border-[#d3d663] rounded-[24px] sm:rounded-[28px] p-6 sm:p-8 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center text-center active:scale-95 cursor-pointer h-full min-h-[200px] sm:min-h-[220px]"
                >
                  {/* Icon Image */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300 opacity-80 group-hover:opacity-100">
                    <Image
                      src={iconImg}
                      alt={service.title}
                      width={88}
                      height={88}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Service Title */}
                  <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#0B1F3B] font-figtree leading-snug group-hover:text-[#2D503B] transition-colors max-w-[180px]">
                    {service.title}
                  </h3>

                  {/* Accent Underline Bar */}
                  <span className="w-8 h-[3px] rounded-full bg-[#d3d663] group-hover:w-12 group-hover:bg-[#0B1F3B] transition-all duration-300 mt-3" />
                </Link>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
