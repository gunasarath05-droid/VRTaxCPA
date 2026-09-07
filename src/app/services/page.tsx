import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/Button";
import { servicesData } from "@/constants/servicesData";
import { FiCheckCircle } from "react-icons/fi";
import darkbg from "@/assets/images/darkbg.png";

export const metadata: Metadata = {
  title: "Professional Tax & Advisory Services | VR Tax CPA LLC",
  description: "Explore our comprehensive practice areas in Irving, TX: Tax Compliance, Strategic Tax Planning, Business Formation, Accounting Services, Payroll Support, and Fractional CFO Guidance.",
};

export default function ServicesListingPage() {
  const serviceList = Object.values(servicesData);

  return (
    <>
      {/* ── Services Hub Hero ── */}
      <section 
        className="relative pt-36 pb-20 flex flex-col items-center justify-center text-center overflow-hidden bg-safe-fixed bg-no-repeat"
        style={{ backgroundImage: `url(${darkbg.src})` }}
      >
        <div className="absolute inset-0 bg-[#0B1F3B]/50 pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-4 sm:gap-5">
            <nav className="flex items-center gap-2 text-white/60 text-xs font-semibold">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-[#d3d663]">Services</span>
            </nav>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white leading-[1.15] sm:leading-[1.1] font-figtree tracking-tight">
              Strategic Tax, Accounting &amp; <span className="text-[#d3d663]">Advisory Services</span>
            </h1>

            <p className="text-white/80 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl font-manrope">
              Tailored financial strategies delivered with proactive year-round planning, dedicated advisory, and reliable precision for businesses and individuals.
            </p>
          </div>
        </div>
      </section>

      {/* ── Services Grid ── */}
      <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="inline-flex items-center gap-2 text-[#0B1F3B] text-[11px] sm:text-xs font-extrabold uppercase tracking-widest mb-3 sm:mb-4 font-figtree">
              Service Catalog
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1F3B] leading-tight font-figtree tracking-tight">
              Explore Our Services
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {serviceList.map((service, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-3xl p-7 sm:p-8 border border-slate-200 shadow-sm hover:shadow-2xl hover:border-[#d3d663]/50 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-bold font-figtree text-[#0B1F3B] mb-3">
                    {service.title}
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 font-manrope line-clamp-3">
                    {service.overview}
                  </p>

                  {/* Highlight bullets */}
                  {service.benefits && service.benefits.length > 0 && (
                    <div className="space-y-2 mb-6 pt-4 border-t border-slate-100">
                      {service.benefits.slice(0, 2).map((b: any, bIdx: number) => (
                        <div key={bIdx} className="flex items-start gap-2 text-xs text-slate-600 font-manrope">
                          <FiCheckCircle className="text-[#2D503B] mt-0.5 flex-shrink-0" size={14} />
                          <span className="line-clamp-1">{b.title}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Button
                  href={`/services/${service.slug}`}
                  variant="dark"
                  size="md"
                  className="self-start mt-auto"
                >
                  Explore Service
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
