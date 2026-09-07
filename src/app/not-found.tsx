"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
    FiHome,
    FiArrowRight,
    FiSearch,
    FiPhoneCall,
    FiCompass,
    FiBookOpen,
    FiFileText,
} from "react-icons/fi";
import { LuCalculator, LuClipboardCheck } from "react-icons/lu";

export default function NotFound() {
    const quickLinks = [
        { label: "Tax Compliance", href: "/services/tax-compliance", icon: <FiFileText className="text-[#d3d663] text-sm" /> },
        { label: "Tax Planning", href: "/services/tax-planning", icon: <FiCompass className="text-[#d3d663] text-sm" /> },
        { label: "Accounting", href: "/services/accounting-services", icon: <LuCalculator className="text-[#d3d663] text-sm" /> },
        { label: "Knowledge Base", href: "/blog", icon: <FiBookOpen className="text-[#d3d663] text-sm" /> },
    ];

    const serviceLinks = [
        { label: "Payroll Support", href: "/services/payroll-support" },
        { label: "Fractional CFO", href: "/services/fractional-cfo" },
        { label: "IRS Representation", href: "/services/irs-representation" },
        { label: "Sales Tax & 1099", href: "/services/sales-tax-1099" },
    ];

    return (
        <main className="min-h-[85vh] pt-32 sm:pt-40 pb-16 flex items-center justify-center bg-[#0b1f3b] text-white relative overflow-hidden">

            {/* === DECORATIVE BACKGROUND === */}
            <div className="absolute inset-0 -z-0 pointer-events-none">
                <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-[#d3d663]/10 rounded-full blur-3xl translate-x-32 -translate-y-32" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl -translate-x-32 translate-y-32" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#d3d663]/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center flex flex-col items-center">

                {/* === STATUS BADGE === */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d3d663]/20 border border-[#d3d663]/40 text-[#d3d663] text-xs sm:text-sm font-extrabold uppercase tracking-[0.15em] mb-6"
                >
                    <span className="w-2 h-2 rounded-full bg-[#d3d663] animate-pulse" />
                    <span>404 • Page Not Found</span>
                </motion.div>

                {/* === 404 HEADLINE === */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="relative select-none"
                >
                    <h1 className="text-8xl sm:text-9xl md:text-[10rem] font-black font-figtree tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/20 leading-none">
                        404
                    </h1>
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-xs sm:text-sm font-bold tracking-[0.3em] text-[#d3d663] uppercase font-figtree">
                        Off Course
                    </span>
                </motion.div>

                {/* === MESSAGE === */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="max-w-xl mx-auto mt-8"
                >
                    <h2 className="text-2xl sm:text-3xl font-extrabold font-figtree text-white leading-tight mb-3">
                        We Can&apos;t Find That Page
                    </h2>
                    <p className="text-white/70 text-sm sm:text-base font-manrope leading-relaxed">
                        It may have been moved, renamed, or is temporarily unavailable.
                        <span className="block mt-1 text-[#d3d663]/70 text-sm font-medium">
                            Let&apos;s get you back to solid financial ground.
                        </span>
                    </p>
                </motion.div>

                {/* === ACTION BUTTONS === */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center gap-3.5 sm:gap-4 mt-8 w-full sm:w-auto"
                >
                    <Link
                        href="/"
                        className="group relative overflow-hidden inline-flex items-center justify-center gap-2.5 bg-[#d3d663] text-[#0b1f3b] text-xs sm:text-sm font-black uppercase tracking-wider px-7 py-3.5 rounded-full shadow-lg shadow-[#d3d663]/30 hover:shadow-[#d3d663]/50 active:scale-95 w-full sm:w-auto font-figtree transition-all duration-300"
                    >
                        <span className="absolute inset-0 bg-[#0b1f3b] -translate-x-[102%] group-hover:translate-x-0 transition-transform duration-500 [transition-timing-function:cubic-bezier(0.76,0,0.24,1)] rounded-full" />
                        <FiHome className="relative z-10 text-base" />
                        <span className="relative h-[16px] overflow-hidden flex items-center">
                            <span className="flex flex-col transition-transform duration-500 [transition-timing-function:cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
                                <span className="block leading-none text-[#0b1f3b]">Return Home</span>
                                <span className="block leading-none text-white">Return Home</span>
                            </span>
                        </span>
                    </Link>

                    <Link
                        href="/services"
                        className="group relative overflow-hidden inline-flex items-center justify-center gap-2 bg-white/10 text-white border border-[#d3d663]/30 text-xs sm:text-sm font-bold uppercase tracking-wider px-6 py-3.5 rounded-full hover:border-[#d3d663]/60 active:scale-95 w-full sm:w-auto font-figtree transition-all duration-300"
                    >
                        <span className="absolute inset-0 bg-[#d3d663]/20 -translate-x-[102%] group-hover:translate-x-0 transition-transform duration-500 [transition-timing-function:cubic-bezier(0.76,0,0.24,1)] rounded-full" />
                        <span className="relative">All Services</span>
                        <FiArrowRight className="relative text-sm text-[#d3d663] group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>

                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center gap-2 bg-transparent hover:bg-white/10 text-white/70 hover:text-white text-xs sm:text-sm font-bold uppercase tracking-wider px-5 py-3.5 rounded-full transition-all duration-300 w-full sm:w-auto font-figtree"
                    >
                        <FiPhoneCall className="text-sm text-[#d3d663]" />
                        <span>Contact</span>
                    </Link>
                </motion.div>

            </div>
        </main>
    );
}