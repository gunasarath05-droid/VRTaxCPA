"use client";

import { motion } from "framer-motion";
import { FiAward, FiShield, FiGlobe, FiServer, FiUsers, FiDatabase } from "react-icons/fi";

export default function Affiliations() {
  const affiliations = [
    {
      icon: <FiShield size={22} />,
      name: "Texas State Board of Public Accountancy",
      sub: "Licensed CPA Firm",
      tag: "State License",
    },
    {
      icon: <FiAward size={22} />,
      name: "American Institute of CPAs (AICPA)",
      sub: "Professional Member",
      tag: "National Standard",
    },
    {
      icon: <FiGlobe size={22} />,
      name: "Institute of Chartered Accountants of India",
      sub: "Chartered Accountant Member",
      tag: "Global Credential",
    },
    {
      icon: <FiServer size={22} />,
      name: "IRS Authorized e-File Provider",
      sub: "Electronic Filing Authority",
      tag: "Federal Authorized",
    },
  ];

  const milestones = [
    {
      year: "2013",
      title: "Accounting Foundation",
      desc: "Begins professional accounting journey, gaining deep mastery across financial statements and ledgers.",
    },
    {
      year: "2017",
      title: "Tax Specialization",
      desc: "Nearly a decade of specialized corporate, partnership, and individual tax compliance and strategic planning.",
    },
    {
      year: "2022",
      title: "Technology Integration",
      desc: "Mastery of modern cloud accounting tools to streamline payroll and bookkeeping workflows.",
    },
    {
      year: "2026",
      title: "VR Tax CPA LLC Founded",
      desc: "Established in Irving, TX to deliver genuine, personalized, year-round CPA guidance and strategic tax savings.",
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-[#F2EFE6] via-[#FAF8F2] to-[#F5F2EA] relative overflow-hidden">
      {/* Subtle bg glows */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] rounded-full opacity-30 pointer-events-none bg-[radial-gradient(circle,#C5A88020,transparent_70%)] filter blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-20 pointer-events-none bg-[radial-gradient(circle,#0B1F3B15,transparent_70%)] filter blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col gap-20 sm:gap-28 relative z-10">

        {/* ── Affiliations ── */}
        <div>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-10 sm:mb-14"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-[#0B1F3B]/8 text-[#0B1F3B] px-3.5 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-bold uppercase tracking-widest border border-[#C5A880]/30 mb-3 sm:mb-4 font-figtree">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0B1F3B] inline-block" />
              Certifications &amp; Technology
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1F3B] leading-tight font-figtree tracking-tight">
              Professional Licenses &amp; Technology Partners
            </h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-[#66706A] max-w-xl mx-auto font-manrope leading-relaxed">
              Every credential reflects our commitment to the highest standards of accuracy, compliance, and professional excellence.
            </p>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-5xl mx-auto">
            {affiliations.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="group relative bg-white rounded-2xl p-5 sm:p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-400 overflow-hidden cursor-default"
              >
                {/* Hover accent line */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#C5A880] to-[#0B1F3B] rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Top row: Icon + Tag */}
                <div className="flex items-start justify-between mb-4 sm:mb-5">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#0B1F3B]/8 text-[#0B1F3B] flex items-center justify-center flex-shrink-0 group-hover:bg-[#C5A880] group-hover:text-white transition-all duration-300 shadow-sm">
                    {item.icon}
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest text-[#0B1F3B] bg-[#C5A880]/15 px-2 sm:px-2.5 py-1 rounded-full border border-[#C5A880]/20 font-figtree">
                    {item.tag}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-sm sm:text-base font-bold font-figtree text-[#0B1F3B] mb-1 leading-snug transition-colors duration-300">
                  {item.name}
                </h3>
                <p className="text-xs text-[#66706A] font-manrope leading-relaxed">{item.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Timeline ── */}
        <div>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-10 sm:mb-14"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-[#0B1F3B]/8 text-[#0B1F3B] px-3.5 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-bold uppercase tracking-widest border border-[#C5A880]/30 mb-3 sm:mb-4 font-figtree">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0B1F3B] inline-block" />
              Our Story &amp; Expertise
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1F3B] leading-tight font-figtree tracking-tight">
              13 Years of Accounting &amp; Tax Excellence
            </h2>
          </motion.div>

          {/* Timeline Cards */}
          <div className="relative">
            {/* Desktop connecting line */}
            <div className="hidden lg:block absolute top-[2.75rem] left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent z-0" />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative z-10">
              {milestones.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: idx * 0.12 }}
                  className="group flex flex-col"
                >
                  {/* Year + dot */}
                  <div className="flex items-center gap-3 mb-5 sm:mb-6">
                    <div className="w-5 h-5 rounded-full border-2 border-[#C5A880] bg-white flex items-center justify-center flex-shrink-0 group-hover:bg-[#C5A880] transition-colors duration-300 shadow-md">
                      <div className="w-2 h-2 rounded-full bg-[#C5A880]/60 group-hover:bg-white transition-colors duration-300" />
                    </div>
                    <span className="text-2xl sm:text-3xl font-extrabold text-[#C5A880] font-figtree leading-none">
                      {item.year}
                    </span>
                  </div>

                  {/* Card */}
                  <div className="flex-1 bg-white rounded-2xl p-5 sm:p-6 border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 group-hover:border-[#C5A880]/30 group-hover:-translate-y-1">
                    <h3 className="text-sm sm:text-base font-bold font-figtree text-[#0B1F3B] mb-2 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#66706A] font-manrope leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
