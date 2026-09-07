"use client";

import { motion } from "framer-motion";
import { FiTarget, FiEye, FiHeart, FiCheckCircle, FiAward, FiLock, FiShield, FiTrendingUp } from "react-icons/fi";

export default function MissionVision() {
  const pillars = [
    {
      number: "01",
      tag: "Purpose & Promise",
      title: "Our Mission",
      icon: <FiTarget size={24} />,
      accentBg: "bg-[#0B1F3B]/10",
      accentText: "text-[#0B1F3B]",
      borderColor: "hover:border-[#d3d663]/60",
      glowColor: "group-hover:bg-[#d3d663]/10",
      headline: "Unwavering Commitment to Your Growth",
      desc: "Our purpose is to serve with unwavering commitment — providing peace of mind and standing as a reliable partner in our clients’ growth. Through strategic tax and financial guidance, we help businesses and individuals thrive with clarity and confidence.",
      bullets: [
        "Reliable partners in your growth at every milestone",
        "Proactive year-round tax planning and advisory",
        "Clear financial insight without complexity or stress",
      ],
    },
    {
      number: "02",
      tag: "Guiding Philosophy",
      title: "Our Vision",
      icon: <FiEye size={24} />,
      accentBg: "bg-[#2D503B]/10",
      accentText: "text-[#2D503B]",
      borderColor: "hover:border-[#2D503B]/50",
      glowColor: "group-hover:bg-[#2D503B]/10",
      headline: "Dedication, Service & Lasting Success",
      desc: "We are dedicated to supporting businesses and individuals, guiding them through financial and tax decisions to help them reach their goals. Inspired by the timeless philosophy of 'Do your best and leave the rest,' we focus on serving with commitment and integrity, leaving the results in higher hands.",
      bullets: [
        "Commitment to service above self and client-first ethics",
        "Boutique, personalized attention for every business owner",
        "Empowering long-term stability and sustainable success",
      ],
    },
    {
      number: "03",
      tag: "The I E C S Framework",
      title: "Our Core Values",
      icon: <FiHeart size={24} />,
      accentBg: "bg-[#d3d663]/15",
      accentText: "text-[#8C6D3F]",
      borderColor: "hover:border-[#d3d663]/60",
      glowColor: "group-hover:bg-[#d3d663]/10",
      headline: "Inspire • Empower • Care • Serve",
      desc: "Our daily practice is anchored in four foundational commitments that govern every engagement, calculation, and consultation:",
      bullets: [
        "Inspire — Confidence through honest, transparent, and accurate guidance",
        "Empower — Businesses and individuals to make informed, stress-free decisions",
        "Care — Genuinely for every client's success and financial well-being",
        "Serve — With integrity and dedication, placing client needs at the heart",
      ],
    },
  ];

  const highlights = [
    { icon: <FiAward className="text-[#d3d663]" size={18} />, label: "13 Years Professional Accounting" },
    { icon: <FiLock className="text-[#d3d663]" size={18} />, label: "100% Confidential & Secure" },
    { icon: <FiTrendingUp className="text-[#d3d663]" size={18} />, label: "Year-Round Proactive Advisory" },
    { icon: <FiShield className="text-[#d3d663]" size={18} />, label: "Uncompromising Integrity" },
  ];

  return (
    <section id="mission" className="py-16 bg-white relative overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full opacity-30 pointer-events-none bg-[radial-gradient(circle,#d3d66325,transparent_70%)] filter blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full opacity-20 pointer-events-none bg-[radial-gradient(circle,#0B1F3B18,transparent_70%)] filter blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        {/* ── Section Header ── */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 text-[#0B1F3B] text-xs font-extrabold uppercase tracking-widest mb-4 font-figtree">
              Purpose &amp; Philosophy
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1F3B] leading-tight font-figtree tracking-tight">
              Reliable Partners in Your Growth
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 font-manrope leading-relaxed max-w-2xl mx-auto">
              Our firm is built on personal dedication, deep financial expertise, and a genuine commitment to lifting the weight of tax and financial complexity off your shoulders.
            </p>
          </motion.div>
        </div>

        {/* ── 3-Column Pillar Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className={`group relative bg-white rounded-3xl p-7 sm:p-8 lg:p-9 border border-slate-200/80 ${pillar.borderColor} shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between overflow-hidden cursor-default`}
            >
              {/* Card top decorative ambient glow on hover */}
              <div className={`absolute top-0 right-0 w-44 h-44 rounded-full transition-colors duration-500 pointer-events-none filter blur-2xl -z-0 ${pillar.glowColor}`} />

              <div className="relative z-10">
                {/* Header Row: Icon + Number */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-13 h-13 sm:w-14 sm:h-14 rounded-2xl ${pillar.accentBg} ${pillar.accentText} flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                    {pillar.icon}
                  </div>
                  <span className="text-3xl sm:text-4xl font-extrabold text-slate-200 font-figtree group-hover:text-[#0B1F3B]/20 transition-colors duration-300">
                    {pillar.number}
                  </span>
                </div>

                {/* Subtag + Title */}
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 font-figtree block mb-1">
                  {pillar.tag}
                </span>
                <h3 className="text-2xl font-extrabold font-figtree text-[#0B1F3B] mb-2 tracking-tight">
                  {pillar.title}
                </h3>
                <p className="text-sm font-bold text-black font-figtree mb-3">
                  {pillar.headline}
                </p>

                {/* Description */}
                <p className="text-sm text-slate-600 font-manrope leading-relaxed mb-6">
                  {pillar.desc}
                </p>

                {/* Key Points */}
                <div className="pt-5 border-t border-slate-100 space-y-2.5">
                  {pillar.bullets.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium font-manrope">
                      <FiCheckCircle className="text-[#2D503B] mt-0.5 flex-shrink-0" size={16} />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Bottom Trust Strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 sm:mt-16 bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/80 shadow-sm"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-center">
            {highlights.map((item, i) => (
              <div key={i} className="flex items-center gap-3 justify-center sm:justify-start px-2">
                <div className="w-8 h-8 rounded-full bg-[#d3d663]/20 flex items-center justify-center flex-shrink-0">
                  {item.icon}
                </div>
                <span className="text-xs sm:text-sm font-bold text-[#0B1F3B] font-figtree">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
