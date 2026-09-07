"use client";

export default function Marquee() {
  const marqueeItems = [
    "Tax Compliance",
    "Business Entity Formation",
    "Tax Planning & Advisory",
    "Payroll Support",
    "Fractional CFO Services",
    "IRS Representation",
    "Sales Tax & 1099 Filing",
    "Accounting Services",
  ];

  const repeatedItems = [...marqueeItems, ...marqueeItems, ...marqueeItems];

  return (
    <section className="py-3.5 overflow-hidden relative z-20 bg-[#0B1F3B] border-y border-white/10">
      <div className="marquee-container flex">
        <div className="marquee-content flex gap-8 sm:gap-10 items-center">
          {repeatedItems.map((item, index) => (
            <div key={index} className="flex items-center gap-6 sm:gap-8">
              <div className="w-2 h-2 rounded-full flex-shrink-0 bg-[#d3d663]" />
              <span className="text-sm sm:text-base font-bold font-figtree uppercase tracking-wider text-white/90">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
