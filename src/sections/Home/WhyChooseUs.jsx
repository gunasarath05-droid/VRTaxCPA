"use client";

import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import { motion } from "framer-motion";
import { FiAward, FiTarget, FiShield, FiArrowRight } from "react-icons/fi";

import leftPersonImg from "@/assets/images/home/whychoose.png";

export default function WhyChooseUs() {
  const cards = [
    {
      icon: <FiTarget size={22} />,
      title: "Tailored Solutions",
      desc: "Customized strategies designed for your unique personal and business tax goals.",
    },
    {
      icon: <FiAward size={22} />,
      title: "Proven Professional Depth",
      desc: "Experienced tax and accounting professionals with deep industry knowledge and over a decade of real-world problem-solving instinct.",
    },
    {
      icon: <FiShield size={22} />,
      title: "Personal Care & Reliability",
      desc: "Clear communication, proactive guidance, and genuine partner attention — ensuring complete peace of mind year-round.",
    },
  ];

  return (
    <section
      id="why-choose-us"
      className="py-8 md:py-16 bg-white relative overflow-hidden border-t border-[#E2E8F0]"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">

          {/* ── Left: Visual Presentation ── */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative w-full max-w-[380px] sm:max-w-[480px] lg:max-w-[520px] flex items-center justify-center"
            >
              <div className="relative z-10 w-full h-[280px] sm:h-[400px] lg:h-[500px] flex items-center justify-center hidden md:block">
                <Image
                  src={leftPersonImg}
                  alt="Why Choose VR Tax CPA LLC"
                  fill
                  className="object-contain drop-shadow-xl"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 540px"
                />
              </div>
            </motion.div>
          </div>

          {/* ── Right: Content & Highlight Cards ── */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Pill Tag */}
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#0B1F3B] font-figtree mb-3 block">
              Why Choose Us
            </span>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1F3B] leading-tight font-figtree tracking-tight mb-7">
              Personalized Services That Protect and Strengthen Your Business.
            </h2>

            {/* Feature Cards List */}
            <div className="flex flex-col gap-4 w-full mb-8">
              {cards.map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.1 }}
                  className="bg-[#F8FAFC] p-5 sm:p-6 rounded-2xl border border-[#E2E8F0] shadow-xs hover:shadow-md hover:bg-white hover:border-[#d3d663] duration-300 transition-all flex items-start gap-4"
                >
                  {/* Circular Icon Badge */}
                  <div className="w-11 h-11 rounded-xl bg-[#0B1F3B]/5 text-[#0B1F3B] border border-[#d3d663]/30 flex items-center justify-center shrink-0 shadow-xs">
                    {card.icon}
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-bold font-figtree text-[#0B1F3B] mb-1">
                      {card.title}
                    </h3>
                    <p className="text-[#334155] text-xs sm:text-sm leading-relaxed font-manrope">
                      {card.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <Button
              href="/contact"
              variant="accent"
              size="lg"
            >
              Schedule a Consultation
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
}
