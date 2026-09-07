"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import notFoundImg from "@/assets/images/404.png";
import Button from "@/components/Button";
import { FiHome, FiArrowRight } from "react-icons/fi";

export default function NotFound() {
  return (
    <main className="min-h-[85vh] pt-32 sm:pt-36 pb-20 flex items-center justify-center bg-white text-slate-800 relative overflow-hidden">
      
      {/* Subtle ambient background glow */}
      <div className="absolute inset-0 pointer-events-none -z-0">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-slate-50/80 rounded-full blur-3xl" />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10 text-center flex flex-col items-center">
        
        {/* 404 Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-[460px] sm:max-w-[520px] md:max-w-[580px] aspect-[16/10] mb-4 sm:mb-6"
        >
          <Image
            src={notFoundImg}
            alt="404 - Page Not Found"
            fill
            priority
            className="object-contain"
            sizes="(max-width: 768px) 90vw, 580px"
          />
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-3 sm:gap-4 max-w-xl"
        >
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold font-figtree text-[#0B1F3B] tracking-tight leading-snug">
            We are sorry, but the page you are looking for can not be found.
          </h1>

          <p className="text-slate-500 text-sm sm:text-base font-manrope">
            You might try exploring our services or visit the{" "}
            <Link
              href="/"
              className="text-[#0B1F3B] font-semibold underline underline-offset-4 decoration-[#d3d663] hover:text-[#2D503B] transition-colors"
            >
              homepage
            </Link>
            .
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 mt-8"
        >
          <Button
            href="/"
            variant="dark"
            size="md"
            icon={<FiHome className="w-4 h-4" />}
          >
            Back to Homepage
          </Button>

          <Button
            href="/services"
            variant="outline"
            size="md"
            icon={<FiArrowRight className="w-4 h-4" />}
          >
            Explore Services
          </Button>
        </motion.div>

      </div>
    </main>
  );
}