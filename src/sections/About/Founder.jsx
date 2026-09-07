"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import { FaLinkedinIn, FaInstagram, FaFacebookF } from "react-icons/fa";
import { FiCheckCircle, FiAward, FiArrowRight } from "react-icons/fi";
import ceo from "../../assets/images/ceo.png";

export default function Founder() {
  const credentials = [
    "Licensed CPA — Texas State Board of Public Accountancy",
    "Chartered Accountant (CA) — Institute of Chartered Accountants of India (ICAI)",
    "13 Years of Comprehensive Accounting & Financial Management Experience",
    "10 Years of Dedicated Tax Planning, Compliance & Advisory Specialization",
    "Deep Expertise in Business Tax Strategy, Entity Structuring & IRS Relations",
    "Active Volunteer & Community Contributor at ISKCON Dallas",
  ];

  return (
    <section className="py-8 md:py-16 bg-white relative overflow-hidden">
      {/* Background Decorative */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none bg-[radial-gradient(circle,#d3d66320,transparent_70%)] filter blur-2xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-20 pointer-events-none bg-[radial-gradient(circle,#0B1F3B15,transparent_70%)] filter blur-2xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-2 text-[#0B1F3B] px-3.5 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-extrabold uppercase tracking-widest mb-3 sm:mb-4 font-figtree">
            Founder &amp; Leadership
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1F3B] leading-tight font-figtree tracking-tight">
            Meet Vethavalli Ramakrishnan, CPA
          </h2>
        </div>

        {/* Founder Spotlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-center"
        >

          {/* ── Left: Photo Column ── */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-[340px] sm:max-w-[380px]">

              {/* Main CEO Photo Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[3/4] w-full border-4 border-white">
                <Image
                  src={ceo}
                  alt="Vethavalli Ramakrishnan, CPA — Founder & CEO of VR Tax CPA LLC"
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 640px) 100vw, 380px"
                />
                {/* Bottom gradient overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-[#071526]/95 to-transparent z-10" />
                {/* Name overlay */}
                <div className="absolute bottom-0 left-0 right-0 z-20 p-5 sm:p-6">
                  <p className="text-white font-extrabold text-base sm:text-lg font-figtree leading-tight">Vethavalli Ramakrishnan</p>
                  <p className="text-[#d3d663] text-xs font-bold uppercase tracking-wider mt-0.5 font-figtree">CPA · CA · Founder &amp; CEO</p>
                </div>
              </div>

              {/* Floating: 13 Years Experience badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute -top-3 -right-2 sm:-top-4 sm:-right-6 bg-[#0B1F3B] text-white rounded-2xl p-3 sm:p-5 shadow-2xl border-4 border-[#d3d663] text-center min-w-[80px] sm:min-w-[100px] z-20"
              >
                <p className="text-2xl sm:text-3xl font-extrabold font-figtree leading-none text-[#d3d663]">13</p>
                <p className="text-[10px] font-bold uppercase tracking-wider leading-tight mt-1 text-slate-200">Years<br />Experience</p>
              </motion.div>

              {/* Social Links */}
              <div className="absolute -left-3 sm:-left-4 top-1/2 -translate-y-1/2 flex flex-col gap-2.5 z-20">
                {[
                  { href: "https://instagram.com/vstaxcpa", icon: <FaInstagram size={14} />, label: "Instagram" },
                  { href: "https://facebook.com/Vstaxcpallc", icon: <FaFacebookF size={14} />, label: "Facebook" },
                  { href: "https://linkedin.com/company/vstaxcpa", icon: <FaLinkedinIn size={14} />, label: "LinkedIn" },
                ].map(({ href, icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-white hover:bg-[#0B1F3B] hover:border-[#0B1F3B] flex items-center justify-center transition-all shadow-md"
                  >
                    {icon}
                  </a>
                ))}
              </div>

            </div>
          </div>

          {/* ── Right: Bio Column ── */}
          <div className="lg:col-span-7 flex flex-col gap-6">

            {/* Intro */}
            <div className="flex flex-col gap-3 sm:gap-4">
              <div className="space-y-3 sm:space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed font-manrope">
                <p>
                  I&apos;m <strong className="text-[#0B1F3B] font-figtree">Vethavalli Ramakrishnan, CPA</strong>, Founder and CEO of <strong className="text-[#0B1F3B] font-figtree">VR Tax CPA LLC</strong>. With <strong className="text-[#0B1F3B] font-figtree">13 years of accounting experience</strong> and <strong className="text-[#0B1F3B] font-figtree">10 years of specialized tax expertise</strong>, I partner with business owners and individuals to navigate tax complexities with precision, clarity, and peace of mind.
                </p>
                <p>
                  My dual qualification as a <strong className="text-[#0B1F3B]">Texas State Board Licensed CPA</strong> and a <strong className="text-[#0B1F3B]">Chartered Accountant (India)</strong> brings a rigorous, global analytical perspective to every client engagement. I treat our clients&apos; businesses with the personal dedication and attention of a trusted partner, never treating anyone as just a file number.
                </p>
                <p>
                  Guided by the principle of serving with integrity and dedication, our firm is committed to lifting financial stress so you can focus wholeheartedly on scaling your business and enjoying your life.
                </p>
                <blockquote className="italic text-slate-700 text-sm border-l-2 border-[#d3d663] pl-4 py-1.5 font-manrope bg-slate-50/80 rounded-r-lg">
                  &ldquo;Outside the firm, I am an active volunteer at the ISKCON Dallas temple and cherish spending quality time cooking, traveling, and being with my husband and our two boys. If you are seeking an advisor who truly listens and stands by your side year-round — our doors are always open.&rdquo;
                </blockquote>
              </div>
            </div>

            {/* Key Credentials */}
            <div className="hidden md:block">
              <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0B1F3B] font-figtree mb-3 flex items-center gap-2">
                <FiAward className="text-[#d3d663]" size={16} />
                Professional Qualifications &amp; Commitments
              </h4>
              <ul className="flex flex-col gap-2">
                {credentials.map((cred, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium font-manrope">
                    <FiCheckCircle className="text-[#2D503B] mt-0.5 flex-shrink-0" size={15} />
                    <span>{cred}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <Button
                href="/contact"
                variant="dark"
                size="lg"
              >
                Schedule an Initial Consultation
              </Button>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
