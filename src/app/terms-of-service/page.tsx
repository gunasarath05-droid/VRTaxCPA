import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | VR Tax CPA LLC",
  description: "Terms of Service and Engagement Policy for VR Tax CPA LLC in Irving, Texas.",
};

export default function TermsOfServicePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 sm:pt-36 pb-14 sm:pb-20 bg-[#0B1F3B] text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none bg-[radial-gradient(circle,#d3d663,transparent_70%)]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <nav className="flex items-center justify-center gap-2 text-white/60 text-xs font-semibold mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#d3d663]">Terms of Service</span>
          </nav>
          <span className="inline-flex items-center rounded-full bg-white/10 text-white/80 px-3.5 py-1 text-xs font-bold uppercase tracking-widest border border-white/20 mb-3 font-figtree">
            Client Agreement
          </span>
          <h1 className="text-3xl sm:text-5xl text-white font-extrabold font-figtree tracking-tight">
            Terms of Service
          </h1>
          <p className="text-white/70 text-sm sm:text-base font-manrope mt-3">
            Last Updated: September 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 sm:py-24 bg-[#F8FAFC]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-8 font-manrope text-slate-600 text-sm sm:text-base leading-relaxed">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-figtree text-[#0B1F3B] mb-3">
                1. Acceptance of Terms &amp; Scope
              </h2>
              <p>
                Welcome to <strong>VR Tax CPA LLC</strong>. By accessing our website (vrtaxcpa.com), booking an advisory consultation, or engaging our firm for professional tax, accounting, bookkeeping, or advisory services, you agree to comply with and be bound by these Terms of Service.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-figtree text-[#0B1F3B] mb-3">
                2. Professional Engagement Letters
              </h2>
              <p>
                All professional tax and accounting services (including federal and state tax preparation, IRS representation, payroll support, and fractional CFO guidance) are subject to a formal, written Engagement Letter detailing the specific scope of work, client responsibilities, fee structures, and deliverables. In the event of a conflict between these general website terms and an executed Engagement Letter, the Engagement Letter shall govern.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-figtree text-[#0B1F3B] mb-3">
                3. Client Responsibilities &amp; Accuracy of Information
              </h2>
              <p>
                Accurate tax preparation and accounting depend entirely upon complete, accurate, and timely documentation provided by the client. Clients are responsible for:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-700 mt-2">
                <li>Providing all relevant tax forms, receipts, financial records, and disclosures before agreed deadlines.</li>
                <li>Maintaining appropriate supporting documentation in accordance with IRS record-retention requirements.</li>
                <li>Reviewing all completed tax returns and financial filings prior to signing electronic authorization (Form 8879).</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-figtree text-[#0B1F3B] mb-3">
                4. Fees, Invoicing &amp; Retainers
              </h2>
              <p>
                Service fees are clearly communicated prior to engagement initiation. Invoices for tax preparation, payroll support, and accounting services are due upon receipt or as specified in your agreement. Electronic filing of returns is executed upon receipt of signed authorization and fee settlement.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-figtree text-[#0B1F3B] mb-3">
                5. Governing Law
              </h2>
              <p>
                These Terms of Service and all related engagements are governed by and construed in accordance with the laws of the State of Texas and applicable United States federal law, without regard to conflict of law principles.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-figtree text-[#0B1F3B] mb-3">
                6. Contact Information
              </h2>
              <p>
                For questions regarding these Terms of Service, please reach out to:
              </p>
              <div className="mt-4 p-5 bg-[#F8FAFC] rounded-2xl border border-slate-200 text-sm">
                <p className="font-bold font-figtree text-[#0B1F3B]">VR Tax CPA LLC</p>
                <p>3035 Ivy Hill Lane, Irving, TX 75063</p>
                <p>Phone: (469) 471-6580 | Email: info@vrtaxcpa.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
