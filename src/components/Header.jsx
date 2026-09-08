"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoCloseOutline } from "react-icons/io5";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYelp } from "react-icons/fa";
import {
  FiChevronDown,
  FiPhone,
  FiMail,
  FiMapPin,
  FiClock,
  FiFileText,
  FiTrendingUp,
  FiUsers,
  FiDollarSign,
  FiHeadphones,
  FiShield,
  FiArrowRight,
  FiLock,
  FiExternalLink,
  FiHelpCircle,
} from "react-icons/fi";
import { LuCalculator, LuFileCheck } from "react-icons/lu";
import { usePathname } from "next/navigation";
import dropdownImg from "@/assets/images/dropdown.png";

const serviceLinks = [
  { name: "Tax Compliance", desc: "Individual & corporate returns", href: "/services/tax-compliance", icon: <FiFileText className="text-base" /> },
  { name: "Tax Planning & Advisory", desc: "Year-round proactive tax strategies", href: "/services/tax-planning", icon: <FiTrendingUp className="text-base" /> },
  { name: "Business Entity Formation", desc: "LLC, S-Corp & EIN setup", href: "/services/business-formation", icon: <FiUsers className="text-base" /> },
  { name: "Payroll Support", desc: "Setup & team payroll training", href: "/services/payroll-services", icon: <FiDollarSign className="text-base" /> },
  { name: "Accounting Services", desc: "Clean books & management financials", href: "/services/accounting-services", icon: <LuCalculator className="text-base" /> },
  { name: "Fractional CFO Services", desc: "Cash forecasting & KPI dashboards", href: "/services/fractional-cfo", icon: <FiHeadphones className="text-base" /> },
  { name: "IRS Representation", desc: "Notice response & penalty abatement", href: "/services/irs-representation", icon: <FiShield className="text-base" /> },
  { name: "Sales Tax & 1099 Filing", desc: "Texas sales tax & annual 1099 returns", href: "/services/sales-tax-1099", icon: <LuFileCheck className="text-base" /> },
];

const clientResourceLinks = [
  {
    name: "Client Portal",
    desc: "Secure document exchange & portal",
    href: "https://vrtaxcpa.taxdome.com",
    target: "_blank",
    icon: <FiLock className="text-base" />,
    isExternal: true,
  },
  {
    name: "Knowledge Base",
    desc: "Tax guides, insights & updates",
    href: "/blog",
    icon: <FiFileText className="text-base" />,
  },
  {
    name: "FAQ",
    desc: "Frequently asked questions",
    href: "/faq",
    icon: <FiHelpCircle className="text-base" />,
  },
];

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About us", href: "/about" },
  { name: "Services", href: "/services", hasDropdown: "services" },
  { name: "Client Resources", href: "/faq", hasDropdown: "resources" },
  { name: "Contact", href: "/contact" },
];

const knownSubpages = [
  "/about",
  "/services",
  "/blog",
  "/contact",
  "/privacy-policy",
  "/terms-of-service",
  "/faq",
  "/disclaimer",
];

export default function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isSubPage = knownSubpages.some((route) => (pathname ? pathname.startsWith(route) : false));
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isMobileResourcesOpen, setIsMobileResourcesOpen] = useState(false);
  const [hoveredService, setHoveredService] = useState(serviceLinks[0]);
  const [hoveredResource, setHoveredResource] = useState(clientResourceLinks[0]);
  const dropdownRef = useRef(null);
  const resourcesDropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsServicesOpen(false);
      }
      if (resourcesDropdownRef.current && !resourcesDropdownRef.current.contains(e.target)) {
        setIsResourcesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
    setIsResourcesOpen(false);
  }, [pathname]);

  const isActive = (item) => {
    if (item.hasDropdown === "services") return pathname.startsWith("/services");
    if (item.hasDropdown === "resources") {
      return pathname.startsWith("/blog") || pathname.startsWith("/faq");
    }
    const href = item.href;
    if (!href || href.startsWith("http")) return false;
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-40 transition-all duration-300">
        {/* ── Executive Corporate Top Bar ── */}
        <div
          className={`hidden sm:block bg-white text-slate-900 text-xs border-b border-white/10 transition-all duration-300 ${
            isSticky || !isHomePage ? "max-h-0 opacity-0 overflow-hidden py-0" : "max-h-16 py-2 px-4 sm:px-6"
          }`}
          aria-label="Firm contact and portal bar"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 font-semibold">
            {/* Left: Office Address & Hours */}
            <div className="hidden md:flex items-center gap-6">
              <span className="flex items-center gap-1.5 text-slate-900 ">
                <FiMapPin className="text-[#d3d663] text-xs shrink-0" aria-hidden="true" />
                <span>3035 Ivy Hill Lane, Irving, TX 75063</span>
              </span>
              <span className="flex items-center gap-1.5 text-slate-900">
                <FiClock className="text-[#d3d663] text-xs shrink-0" aria-hidden="true" />
                <span>Mon–Fri: 9:00 AM – 5:30 PM CST</span>
              </span>
            </div>

            {/* Right: Phone, Email, Client Portal & Socials */}
            <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-4 sm:gap-6">
              <a
                href="tel:+14694716580"
                className="flex items-center gap-1.5 text-slate-900 hover:text-[#d3d663] transition-colors font-semibold"
                aria-label="Call VR Tax CPA LLC at (469) 471-6580"
              >
                <FiPhone className="text-[#d3d663] text-xs shrink-0" aria-hidden="true" />
                <span>(469) 471-6580</span>
              </a>

              <a
                href="mailto:info@vrtaxcpa.com"
                className="hidden sm:flex items-center gap-1.5 text-slate-900 hover:text-[#d3d663] transition-colors font-semibold"
                aria-label="Email VR Tax CPA LLC at info@vrtaxcpa.com"
              >
                <FiMail className="text-[#d3d663] text-xs shrink-0" aria-hidden="true" />
                <span>info@vrtaxcpa.com</span>
              </a>

              {/* Social icons */}
              <div className="hidden lg:flex items-center gap-3 pl-2 border-l border-white/10">
                <a href="https://instagram.com/vstaxcpa" target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-[#d3d663] transition-colors"><FaInstagram size={18} /></a>
                <a href="https://facebook.com/Vstaxcpallc" target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:text-[#d3d663] transition-colors"><FaFacebookF size={16} /></a>
                <a href="https://linkedin.com/company/vstaxcpa" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-[#d3d663] transition-colors"><FaLinkedinIn size={16} /></a>
                <a href="https://yelp.com/biz/vs-tax-cpa" target="_blank" rel="noreferrer" aria-label="Yelp" className="hover:text-[#d3d663] transition-colors"><FaYelp size={16} /></a>
              </div>
            </div>
          </div>
        </div>

        {/* ── Main Corporate Header Bar ── */}
        <div
          className={`transition-all duration-300 ${
            isSubPage && !isSticky
              ? "bg-transparent py-3 sm:py-4"
              : isSticky
                ? "bg-[#0B1F3B]/90 shadow-[0_4px_24px_rgba(0,0,0,0.4)] border-b border-white/10 py-2.5 sm:py-3 backdrop-blur-xl"
                : "bg-[#0B1F3B] py-3 sm:py-4 border-b border-white/10"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">

            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center" aria-label="VR Tax CPA LLC Home">
              <Image
                src="/Logo1.png"
                alt="VR Tax CPA LLC — Professional Tax & Advisory Services"
                width={260}
                height={80}
                priority
                className="h-10 sm:h-12 lg:h-14 w-auto object-contain"
              />
            </Link>

            {/* ── Desktop Nav ── */}
            <nav className="hidden lg:flex items-center gap-7 xl:gap-8" aria-label="Main Navigation">
              {navLinks.map((item) => {
                const active = isActive(item);

                if (item.hasDropdown === "services") {
                  return (
                    <div
                      key={item.name}
                      className="relative group flex items-center"
                      ref={dropdownRef}
                      onMouseEnter={() => setIsServicesOpen(true)}
                      onMouseLeave={() => setIsServicesOpen(false)}
                    >
                      <button
                        onClick={() => setIsServicesOpen((prev) => !prev)}
                        aria-expanded={isServicesOpen}
                        aria-haspopup="true"
                        className={`flex items-center gap-1.5 text-[15px] font-semibold font-figtree transition-all duration-200 py-2 cursor-pointer text-white/85 hover:text-[#d3d663] ${
                          active || isServicesOpen ? "!text-[#d3d663] font-bold" : ""
                        }`}
                      >
                        <span>{item.name}</span>
                        <FiChevronDown
                          size={14}
                          className={`transition-transform duration-300 ${
                            isServicesOpen ? "rotate-180 text-[#d3d663]" : ""
                          }`}
                        />
                      </button>
                      <span
                        className={`absolute bottom-0 left-0 h-[2px] bg-[#d3d663] transition-all duration-300 ${
                          active || isServicesOpen ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      />

                      {/* Services Mega Dropdown — Glassmorphism */}
                      <div
                        className={`absolute top-full pt-2 left-1/2 -translate-x-1/2 w-[720px] transition-all duration-200 origin-top z-50 ${
                          isServicesOpen
                            ? "opacity-100 scale-100 pointer-events-auto translate-y-0"
                            : "opacity-0 scale-[0.97] pointer-events-none -translate-y-1"
                        }`}
                      >
                        <div className="bg-[#0B1F3B]/95 border border-white/20 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6),0_4px_12px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.15)] overflow-hidden backdrop-blur-2xl">
                          {/* Gold accent top bar */}
                          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#d3d663] to-transparent" />
                          <div className="flex">
                            {/* Left: Service List */}
                            <div className="flex-1 p-4 grid grid-cols-2 gap-1">
                              {serviceLinks.map((service) => {
                                const isCurrent = pathname === service.href;
                                const isHovered = hoveredService?.href === service.href;
                                return (
                                  <Link
                                    key={service.href}
                                    href={service.href}
                                    onClick={() => setIsServicesOpen(false)}
                                    onMouseEnter={() => setHoveredService(service)}
                                    className={`flex items-center px-3.5 py-2.5 rounded-xl transition-all duration-150 ${
                                      isHovered || isCurrent
                                        ? "bg-white/[0.12] text-[#d3d663] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
                                        : "text-white/85 hover:text-[#d3d663] hover:bg-white/[0.06]"
                                    }`}
                                  >
                                    <span className="text-[13.5px] font-semibold font-figtree leading-tight">
                                      {service.name}
                                    </span>
                                  </Link>
                                );
                              })}
                            </div>

                            {/* Right: Glass Image Panel */}
                            <div className="w-[200px] shrink-0 flex flex-col border-l border-white/10">
                              <div className="relative w-full h-full min-h-[140px] overflow-hidden">
                                <Image
                                  src={dropdownImg}
                                  alt="Services preview"
                                  fill
                                  className="object-cover object-center scale-105"
                                  sizes="200px"
                                />
                                {/* Dark + glass overlay */}
                                <div className="absolute inset-0 bg-gradient-to-br from-[#0B1F3B]/60 via-[#0B1F3B]/30 to-transparent backdrop-blur-[1px]" />
                                {/* Inner border glow */}
                                <div className="absolute inset-0 rounded-r-2xl ring-1 ring-inset ring-white/10" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }

                if (item.hasDropdown === "resources") {
                  return (
                    <div
                      key={item.name}
                      className="relative group flex items-center"
                      ref={resourcesDropdownRef}
                      onMouseEnter={() => setIsResourcesOpen(true)}
                      onMouseLeave={() => setIsResourcesOpen(false)}
                    >
                      <button
                        onClick={() => setIsResourcesOpen((prev) => !prev)}
                        aria-expanded={isResourcesOpen}
                        aria-haspopup="true"
                        className={`flex items-center gap-1.5 text-[15px] font-semibold font-figtree transition-all duration-200 py-2 cursor-pointer text-white/85 hover:text-[#d3d663] ${
                          active || isResourcesOpen ? "!text-[#d3d663] font-bold" : ""
                        }`}
                      >
                        <span>{item.name}</span>
                        <FiChevronDown
                          size={14}
                          className={`transition-transform duration-300 ${
                            isResourcesOpen ? "rotate-180 text-[#d3d663]" : ""
                          }`}
                        />
                      </button>
                      <span
                        className={`absolute bottom-0 left-0 h-[2px] bg-[#d3d663] transition-all duration-300 ${
                          active || isResourcesOpen ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      />

                      {/* Client Resources Dropdown — Glassmorphism */}
                      <div
                        className={`absolute top-full pt-2 right-0 w-[440px] transition-all duration-200 origin-top-right z-50 ${
                          isResourcesOpen
                            ? "opacity-100 scale-100 pointer-events-auto translate-y-0"
                            : "opacity-0 scale-[0.97] pointer-events-none -translate-y-2"
                        }`}
                      >
                        <div className="bg-[#0B1F3B]/95 border border-white/20 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6),0_4px_12px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.15)] overflow-hidden backdrop-blur-2xl">
                          {/* Gold accent top bar */}
                          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#d3d663] to-transparent" />
                          <div className="flex">
                            {/* Left: Links list */}
                            <div className="flex-1 p-3.5 flex flex-col gap-1">
                              {clientResourceLinks.map((res) => {
                                const isCurrent = pathname === res.href;
                                const isHovered = hoveredResource?.name === res.name;

                                const inner = (
                                  <div className="flex items-center justify-between w-full">
                                    <span className="text-[13.5px] font-semibold font-figtree">{res.name}</span>
                                    {res.isExternal && (
                                      <FiExternalLink size={12} className="text-white/40 group-hover:text-[#d3d663]/70 shrink-0" />
                                    )}
                                  </div>
                                );

                                const cls = `group flex items-center px-3.5 py-2.5 rounded-xl transition-all duration-150 cursor-pointer ${
                                  isHovered || isCurrent
                                    ? "bg-white/[0.12] text-[#d3d663] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
                                    : "text-white/85 hover:text-[#d3d663] hover:bg-white/[0.06]"
                                }`;

                                if (res.target === "_blank") {
                                  return (
                                    <a
                                      key={res.name}
                                      href={res.href}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={() => setIsResourcesOpen(false)}
                                      onMouseEnter={() => setHoveredResource(res)}
                                      className={cls}
                                    >
                                      {inner}
                                    </a>
                                  );
                                }
                                return (
                                  <Link
                                    key={res.name}
                                    href={res.href}
                                    onClick={() => setIsResourcesOpen(false)}
                                    onMouseEnter={() => setHoveredResource(res)}
                                    className={cls}
                                  >
                                    {inner}
                                  </Link>
                                );
                              })}
                            </div>

                            {/* Right: Glass Image Panel */}
                            <div className="w-[160px] shrink-0 border-l border-white/10">
                              <div className="relative w-full h-full min-h-[120px] overflow-hidden">
                                <Image
                                  src={dropdownImg}
                                  alt="Resource preview"
                                  fill
                                  className="object-cover object-center scale-105"
                                  sizes="160px"
                                />
                                <div className="absolute inset-0 bg-gradient-to-br from-[#0B1F3B]/60 via-[#0B1F3B]/30 to-transparent backdrop-blur-[1px]" />
                                <div className="absolute inset-0 rounded-r-2xl ring-1 ring-inset ring-white/10" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={item.name} className="relative group flex items-center">
                    <Link
                      href={item.href}
                      target={item.target}
                      className={`text-[15px] font-semibold font-figtree transition-all duration-200 py-2 block text-white/85 hover:text-[#d3d663] ${
                        active ? "!text-[#d3d663] font-bold" : ""
                      }`}
                    >
                      {item.name}
                    </Link>
                    <span
                      className={`absolute bottom-0 left-0 h-[2px] bg-[#d3d663] transition-all duration-300 ${
                        active ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </div>
                );
              })}
            </nav>

            {/* ── Right Controls ── */}
            <div className="flex items-center gap-3 sm:gap-4">

              {/* Sidebar toggle */}
              <button
                onClick={() => setIsSidebarOpen(true)}
                aria-label="Open Firm Info Panel"
                className="hidden lg:flex flex-col gap-1.5 cursor-pointer justify-center items-end group p-2 rounded-lg hover:bg-white/8 transition-colors"
              >
                <span className="w-5 h-[2px] transition-all group-hover:w-6 bg-white/60 group-hover:bg-[#d3d663]" />
                <span className="w-6 h-[2px] bg-white/60 group-hover:bg-[#d3d663]" />
                <span className="w-4 h-[2px] transition-all group-hover:w-6 bg-white/60 group-hover:bg-[#d3d663]" />
              </button>

              {/* CTA — Schedule Call */}
              <Link
                href="/contact"
                className="hidden sm:inline-flex group relative items-center justify-center bg-[#d3d663] text-[#0B1F3B] text-xs sm:text-sm font-extrabold uppercase tracking-wider px-4 sm:px-6 py-2 sm:py-2.5 rounded-full shadow-[0_4px_16px_rgba(197,168,128,0.25)] hover:bg-[#0B1F3B] hover:text-[#d3d663] hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 font-figtree"
              >
                <span>Schedule Call</span>
              </Link>

              {/* Mobile hamburger */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open Mobile Menu"
                className="lg:hidden text-2xl cursor-pointer p-1.5 rounded-lg text-white/80 hover:text-[#d3d663] transition-colors"
              >
                <HiOutlineMenuAlt3 />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile Backdrop ── */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-xs z-50 transition-opacity duration-300 lg:hidden ${isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* ── Mobile Drawer ── */}
      <div
        className={`fixed top-0 right-0 h-full w-[85vw] max-w-[340px] bg-[#0B1F3B] text-white border-l border-white/10 z-[60] shadow-2xl flex flex-col transition-transform duration-300 ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        role="dialog"
        aria-label="Mobile Navigation Menu"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <Image
            src="/Logo1.png"
            alt="VR Tax CPA LLC"
            width={140}
            height={40}
            style={{ width: "auto", height: "auto" }}
            className="h-9 w-auto object-contain"
          />
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-2xl text-white/60 hover:text-[#d3d663] p-1 transition-colors cursor-pointer"
            aria-label="Close Mobile Menu"
          >
            <IoCloseOutline />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-6 py-4">
          <ul className="flex flex-col gap-1">
            {navLinks.map((item) => {
              const active = isActive(item);

              if (item.hasDropdown === "services") {
                return (
                  <li key={item.name} className="border-b border-white/10 pb-1">
                    <button
                      onClick={() => setIsMobileServicesOpen((p) => !p)}
                      aria-expanded={isMobileServicesOpen}
                      className={`w-full flex items-center justify-between text-[15px] font-semibold font-figtree py-3 transition-colors cursor-pointer ${active ? "text-[#d3d663] font-bold" : "text-white/80 hover:text-[#d3d663]"
                        }`}
                    >
                      <span>{item.name}</span>
                      <FiChevronDown
                        size={14}
                        className={`transition-transform duration-300 ${isMobileServicesOpen ? "rotate-180 text-[#d3d663]" : ""
                          }`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${isMobileServicesOpen ? "max-h-[440px]" : "max-h-0"
                        }`}
                    >
                      <ul className="pl-3 flex flex-col gap-1 pb-2">
                        {serviceLinks.map((s) => (
                          <li key={s.href}>
                            <Link
                              href={s.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className={`flex items-center gap-2 text-sm py-1.5 font-medium transition-colors ${pathname === s.href
                                  ? "text-[#d3d663] font-bold"
                                  : "text-white/70 hover:text-[#d3d663]"
                                }`}
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-[#d3d663]" />
                              {s.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                );
              }

              if (item.hasDropdown === "resources") {
                return (
                  <li key={item.name} className="border-b border-white/10 pb-1">
                    <button
                      onClick={() => setIsMobileResourcesOpen((p) => !p)}
                      aria-expanded={isMobileResourcesOpen}
                      className={`w-full flex items-center justify-between text-[15px] font-semibold font-figtree py-3 transition-colors cursor-pointer ${active ? "text-[#d3d663] font-bold" : "text-white/80 hover:text-[#d3d663]"
                        }`}
                    >
                      <span>{item.name}</span>
                      <FiChevronDown
                        size={14}
                        className={`transition-transform duration-300 ${isMobileResourcesOpen ? "rotate-180 text-[#d3d663]" : ""
                          }`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${isMobileResourcesOpen ? "max-h-[300px]" : "max-h-0"
                        }`}
                    >
                      <ul className="pl-3 flex flex-col gap-1 pb-2">
                        {clientResourceLinks.map((res) => {
                          const isCurrent = pathname === res.href;
                          if (res.target === "_blank") {
                            return (
                              <li key={res.name}>
                                <a
                                  href={res.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className="flex items-center justify-between text-sm py-1.5 font-medium text-white/70 hover:text-[#d3d663] transition-colors"
                                >
                                  <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#d3d663]" />
                                    <span>{res.name}</span>
                                  </div>
                                  <FiExternalLink size={12} className="text-white/50" />
                                </a>
                              </li>
                            );
                          }
                          return (
                            <li key={res.name}>
                              <Link
                                href={res.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`flex items-center gap-2 text-sm py-1.5 font-medium transition-colors ${isCurrent
                                    ? "text-[#d3d663] font-bold"
                                    : "text-white/70 hover:text-[#d3d663]"
                                  }`}
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-[#d3d663]" />
                                {res.name}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </li>
                );
              }

              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-[15px] font-semibold font-figtree py-3 block transition-colors border-b border-white/10 ${active ? "text-[#d3d663] font-bold" : "text-white/80 hover:text-[#d3d663]"
                      }`}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="px-6 py-4 border-t border-white/10">
          <Link
            href="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block bg-[#d3d663] text-[#0B1F3B] text-center py-3 rounded-full font-extrabold text-xs uppercase tracking-wider font-figtree shadow-md hover:bg-[#b5966b] transition-all"
          >
            Schedule Consultation
          </Link>
        </div>
      </div>

      {/* ── Desktop Sidebar Backdrop ── */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-xs z-40 transition-opacity duration-300 hidden lg:block ${isSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setIsSidebarOpen(false)}
        aria-hidden="true"
      />

      {/* ── Desktop Info Sidebar ── */}
      <div
        className={`fixed top-0 right-0 h-full w-[380px] bg-[#0B1F3B] text-white border-l border-white/10 z-50 shadow-2xl flex flex-col transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
        role="dialog"
        aria-label="Firm Overview and Contacts"
      >
        <div className="flex items-center justify-between px-8 py-5 border-b border-white/10">
          <Image
            src="/Logo1.png"
            alt="VR Tax CPA LLC"
            width={160}
            height={45}
            style={{ width: "auto", height: "auto" }}
            className="h-10 w-auto object-contain"
          />
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-2xl text-white/50 hover:text-[#d3d663] transition-colors cursor-pointer p-1"
            aria-label="Close Info Panel"
          >
            <IoCloseOutline />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-6 flex flex-col gap-6">
          <div>
            <h4 className="text-sm font-bold font-figtree text-white mb-2">VR Tax CPA LLC</h4>
            <p className="text-xs text-white/60 leading-relaxed font-manrope">
              Founded by Vethavalli Ramakrishnan, CPA — licensed by the Texas State Board of Public Accountancy. Providing proactive tax, accounting, and advisory solutions for businesses and individuals nationwide.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-white/40 font-figtree">Contact Info</h4>
            {[
              { icon: <FiPhone size={13} />, label: "Phone", val: "+1 (469) 471-6580", href: "tel:+14694716580" },
              { icon: <FiMail size={13} />, label: "Email", val: "info@vrtaxcpa.com", href: "mailto:info@vrtaxcpa.com" },
            ].map((c, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#d3d663]/15 text-[#d3d663] flex items-center justify-center shrink-0">{c.icon}</div>
                <div>
                  <p className="text-[10px] text-white/40 font-semibold uppercase">{c.label}</p>
                  <a href={c.href} className="text-white/80 text-xs font-semibold hover:text-[#d3d663] transition">{c.val}</a>
                </div>
              </div>
            ))}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#d3d663]/15 text-[#d3d663] flex items-center justify-center shrink-0"><FiMapPin size={13} /></div>
              <div>
                <p className="text-[10px] text-white/40 font-semibold uppercase">Office</p>
                <p className="text-white/70 text-xs font-medium">3035 Ivy Hill Lane, Irving, TX 75063</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#d3d663]/15 text-[#d3d663] flex items-center justify-center shrink-0"><FiClock size={13} /></div>
              <div>
                <p className="text-[10px] text-white/40 font-semibold uppercase">Hours</p>
                <p className="text-white/70 text-xs font-medium">Mon–Fri: 9:00 AM – 5:30 PM CST</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-white/40 font-figtree">Follow Us</h4>
            <div className="flex items-center gap-2.5">
              {[
                { icon: <FaInstagram />, href: "https://instagram.com/vstaxcpa", label: "Instagram" },
                { icon: <FaFacebookF />, href: "https://facebook.com/Vstaxcpallc", label: "Facebook" },
                { icon: <FaLinkedinIn />, href: "https://linkedin.com/company/vstaxcpa", label: "LinkedIn" },
                { icon: <FaYelp />, href: "https://yelp.com/biz/vs-tax-cpa", label: "Yelp" },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-white/8 text-white/60 hover:bg-[#d3d663] hover:text-[#0B1F3B] flex items-center justify-center transition-all text-sm"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="px-8 py-5 border-t border-white/10">
          <Link
            href="/contact"
            onClick={() => setIsSidebarOpen(false)}
            className="block bg-[#d3d663] text-[#0B1F3B] text-center py-3 rounded-full font-extrabold text-xs uppercase tracking-wider font-figtree shadow-md hover:bg-[#b5966b] transition-all"
          >
            Schedule Consultation
          </Link>
        </div>
      </div>
    </>
  );
}