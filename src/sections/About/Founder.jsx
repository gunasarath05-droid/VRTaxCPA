"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import { FaLinkedinIn, FaInstagram, FaFacebookF, FaYelp } from "react-icons/fa";
import { FiCheckCircle, FiAward, FiArrowRight } from "react-icons/fi";
import ceo from "../../assets/images/ceo.jpeg";
import { useSiteData } from "@/context/SiteDataContext";

// Helper to render text with highlighted words inside double quotes ("word") or **bold**
function renderHighlightedText(text) {
  if (!text) return null;
  const regex = /"([^"]+)"|\*\*([^*]+)\*\*/g;
  const elements = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      elements.push(text.substring(lastIndex, match.index));
    }
    const boldWord = match[1] || match[2];
    elements.push(
      <strong key={match.index} className="text-[#0B1F3B] font-figtree font-bold">
        {boldWord}
      </strong>
    );
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    elements.push(text.substring(lastIndex));
  }

  return elements.length > 0 ? elements : text;
}

export default function Founder() {
  const { founder, socialLinks } = useSiteData();
  const founderData = founder || {};

  const name = founderData.name || "Vetha Ram, CPA";
  const displayName = founderData.displayName || "Vetha Ram";
  const title = founderData.title || "CPA · CA · Founder & CEO";
  const expYears = founderData.experienceYears || 13;
  const expLabel = founderData.experienceLabel || "Years Experience";

  // Use common socialLinks from admin panel filtered by founder's active social selection
  const activeSocialIds = founderData.activeSocials || ["instagram", "facebook", "linkedin"];

  const founderSocials = socialLinks?.length
    ? socialLinks
        .filter((s) => {
          if (s.enabled === false) return false;
          const id = s.id || s.name?.toLowerCase();
          return activeSocialIds.includes(id);
        })
        .map((s) => {
          let icon = <FaInstagram size={14} />;
          const lower = s.name?.toLowerCase() || "";
          if (lower.includes("facebook")) icon = <FaFacebookF size={14} />;
          else if (lower.includes("linkedin")) icon = <FaLinkedinIn size={14} />;
          else if (lower.includes("yelp")) icon = <FaYelp size={14} />;
          return { href: s.url, icon, label: s.name };
        })
    : [
        { href: "https://instagram.com/vstaxcpa", icon: <FaInstagram size={14} />, label: "Instagram" },
        { href: "https://facebook.com/Vstaxcpallc", icon: <FaFacebookF size={14} />, label: "Facebook" },
        { href: "https://linkedin.com/company/vstaxcpa", icon: <FaLinkedinIn size={14} />, label: "LinkedIn" },
      ];

  const defaultParagraphs = [
    `"Vetha Ram, CPA", is the Founder and CEO of "VR Tax CPA LLC". With "13 years of comprehensive accounting experience" including "10 years of specialized tax expertise", she partners with business owners and individuals to navigate tax complexities with precision, clarity, and peace of mind.`,
    `Her dual qualification as a "Texas State Board Licensed CPA" and a "Chartered Accountant (India)" brings a rigorous, global analytical perspective to every client engagement. She treats each client's business with the dedication and attention of a trusted partner—never as a file number or transaction. Every relationship is built on integrity, accuracy, and genuine care.`,
    `Guided by the principle of serving with unwavering dedication, her commitment is simple: to lift financial stress so clients can focus wholeheartedly on scaling their businesses and enjoying their lives.`
  ];

  const defaultQuote = `Outside the firm, she is an active volunteer at the ISKCON Dallas Temple and cherishes spending time cooking, traveling, and being with her husband and their two boys. For those seeking an advisor who truly listens and stands by their side year-round, her doors are always open.`;

  const paragraphs = (founderData.paragraphs && founderData.paragraphs.length > 0)
    ? founderData.paragraphs
    : defaultParagraphs;

  const quote = founderData.quote !== undefined ? founderData.quote : defaultQuote;

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
            Meet {displayName}, CPA
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
                {typeof founderData.image === "string" && founderData.image.startsWith("data:") ? (
                  <img
                    src={founderData.image}
                    alt={`${displayName} — ${title}`}
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <Image
                    src={founderData.image || ceo}
                    alt={`${displayName} — ${title}`}
                    fill
                    className="object-cover object-top"
                    priority
                    sizes="(max-width: 640px) 100vw, 380px"
                  />
                )}
                {/* Bottom gradient overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-[#071526]/95 to-transparent z-10" />
                {/* Name overlay */}
                <div className="absolute bottom-0 left-0 right-0 z-20 p-5 sm:p-6">
                  <p className="text-white font-extrabold text-base sm:text-lg font-figtree leading-tight">{displayName}</p>
                  <p className="text-[#d3d663] text-xs font-bold uppercase tracking-wider mt-0.5 font-figtree">{title}</p>
                </div>
              </div>

              {/* Floating: Experience badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute -top-3 -right-2 sm:-top-4 sm:-right-6 bg-[#0B1F3B] text-white rounded-2xl p-3 sm:p-5 shadow-2xl border-4 border-[#d3d663] text-center min-w-[80px] sm:min-w-[100px] z-20"
              >
                <p className="text-2xl sm:text-3xl font-extrabold font-figtree leading-none text-[#d3d663]">{expYears}</p>
                <p className="text-[10px] font-bold uppercase tracking-wider leading-tight mt-1 text-slate-200">{expLabel.split(" ")[0]}<br />{expLabel.split(" ").slice(1).join(" ")}</p>
              </motion.div>

              {/* Social Links */}
              <div className="absolute -left-3 sm:-left-4 top-1/2 -translate-y-1/2 flex flex-col gap-2.5 z-20">
                {founderSocials.map(({ href, icon, label }) => (
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
                {paragraphs.map((para, idx) => (
                  <p key={idx}>
                    {renderHighlightedText(para)}
                  </p>
                ))}
                {quote && (
                  <blockquote className="italic text-slate-700 text-sm border-l-2 border-[#d3d663] pl-4 py-1.5 font-manrope bg-slate-50/80 rounded-r-lg">
                    {renderHighlightedText(quote)}
                  </blockquote>
                )}
              </div>
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
