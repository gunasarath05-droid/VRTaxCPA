"use client";

import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYelp } from "react-icons/fa";
import { FiPhone, FiMail, FiMapPin, FiLock, FiExternalLink } from "react-icons/fi";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Services", href: "/services" },
  { label: "Client Portal", href: "https://vrtaxcpa.taxdome.com", target: "_blank" },
  { label: "Knowledge Base", href: "/blog" },
  { label: "FAQ", href: "/faq"},
  { label: "Contact Us", href: "/contact" }
];

const serviceLinks = [
  { label: "Tax Compliance", href: "/services/tax-compliance" },
  { label: "Tax Planning & Advisory", href: "/services/tax-planning" },
  { label: "Accounting Services", href: "/services/accounting-services" },
  { label: "Payroll Support", href: "/services/payroll-services" },
  { label: "Fractional CFO Services", href: "/services/fractional-cfo" },
  { label: "IRS Representation", href: "/services/irs-representation" },
  { label: "Sales Tax & 1099 Filing", href: "/services/sales-tax-1099" },
];

const supportLinks = [
  { label: "Knowledge Base", href: "/blog" },
  { label: "Frequently Asked Questions", href: "/faq" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Disclaimer", href: "/disclaimer" },
];

const socials = [
  { icon: <FaInstagram className="text-sm" />, href: "https://instagram.com/vstaxcpa", label: "Instagram" },
  { icon: <FaFacebookF className="text-sm" />, href: "https://facebook.com/Vstaxcpallc", label: "Facebook" },
  { icon: <FaLinkedinIn className="text-sm" />, href: "https://linkedin.com/company/vstaxcpa", label: "LinkedIn" },
  { icon: <FaYelp className="text-sm" />, href: "https://yelp.com/biz/vs-tax-cpa", label: "Yelp" },
];

export default function Footer() {
  return (
    <footer className="bg-[#071526] text-slate-400 text-sm border-t border-white/10 pt-14 pb-8 font-manrope">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Main Links Grid: 4 columns ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-10 border-b border-white/10">

          {/* Col 1: Brand & Socials (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <Link href="/" className="inline-block" aria-label="VR Tax CPA LLC Home">
              <Image
                src="/Logo1.png"
                alt="VR Tax CPA LLC"
                width={180}
                height={50}
                style={{ width: "auto", height: "auto" }}
                className="object-contain h-11 sm:h-12"
              />
            </Link>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm font-manrope">
              Strategic tax planning, proactive compliance, and personalized accounting advisory designed to give business owners confidence and peace of mind.
            </p>
            
            {/* Beacon statement */}
            <p className="text-[#d3d663] text-xs font-semibold tracking-wide">
              &ldquo;Reliable partners in your growth.&rdquo;
            </p>

            <div className="flex items-center gap-2.5 pt-1">
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#d3d663] hover:text-[#0B1F3B] flex items-center justify-center transition-all text-slate-300"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold text-sm mb-3 font-figtree">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {quickLinks.map((l, i) => (
                <li key={i}>
                  <Link href={l.href} target={l.target} className="hover:text-[#d3d663] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold text-sm mb-3 font-figtree">
              Our Services
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {serviceLinks.map((l, i) => (
                <li key={i}>
                  <Link href={l.href} className="hover:text-[#d3d663] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Office (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold text-sm mb-3 font-figtree">
              Irving Office
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm">
              <div className="flex items-start gap-2.5">
                <FiMapPin className="text-[#d3d663] text-sm shrink-0 mt-0.5" />
                <span className="text-slate-400 leading-snug">
                  3035 Ivy Hill Lane, Irving, TX 75063
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <FiPhone className="text-[#d3d663] text-sm shrink-0 mt-0.5" />
                <a href="tel:+14694716580" className="text-slate-300 hover:text-[#d3d663] transition-colors">
                  (469) 471-6580
                </a>
              </div>

              <div className="flex items-start gap-2.5">
                <FiMail className="text-[#d3d663] text-sm shrink-0 mt-0.5" />
                <a href="mailto:info@vrtaxcpa.com" className="text-slate-300 hover:text-[#d3d663] transition-colors break-all">
                  info@vrtaxcpa.com
                </a>
              </div>

              <div className="pt-2">
                <span className="text-[11px] text-slate-400 block font-medium">Business Hours:</span>
                <span className="text-[11px] text-slate-300">Mon–Fri: 9:00 AM – 5:30 PM CST</span>
              </div>
            </div>
          </div>

        </div>

        {/* ── Bottom Bar ── */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 font-manrope">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} <span className="font-bold text-slate-300">VR Tax CPA LLC</span>. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs">
            {supportLinks.slice(2).map((link, idx) => (
              <Link key={idx} href={link.href} className="hover:text-[#d3d663] transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
          <p className="text-center">Design &amp; Developed by <a href="https://ec4you.in/" target="_blank" rel="noopener noreferrer" className="hover:text-[#d3d663] transition-colors">EC4You</a></p>
        </div>

      </div>
    </footer>
  );
}
