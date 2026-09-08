import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | VR Tax CPA LLC",
  description: "Privacy Policy for VR Tax CPA LLC. Learn how we safeguard and protect your personal and financial information.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 sm:pt-36 pb-14 sm:pb-20 bg-[#0B1F3B] text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none bg-[radial-gradient(circle,#d3d663,transparent_70%)]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <nav className="flex items-center justify-center gap-2 text-white/60 text-xs font-semibold mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#d3d663]">Privacy Policy</span>
          </nav>
          <span className="inline-flex items-center rounded-full bg-white/10 text-white/80 px-3.5 py-1 text-xs font-bold uppercase tracking-widest border border-white/20 mb-3 font-figtree">
            Legal &amp; Compliance
          </span>
          <h1 className="text-3xl sm:text-5xl text-white font-extrabold font-figtree tracking-tight">
            Privacy Policy
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
                1. Commitment to Client Confidentiality
              </h2>
              <p>
                At <strong>VR Tax CPA LLC</strong>, protecting your personal, tax, and financial privacy is one of our highest responsibilities. We adhere to the strictest ethical standards regarding client data security and confidentiality in accordance with professional accountancy guidelines.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-figtree text-[#0B1F3B] mb-3">
                2. Information We Collect
              </h2>
              <p className="mb-3">
                To provide comprehensive tax compliance, accounting, bookkeeping, and advisory services, we collect non-public personal information (NPI) from the following sources:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li>Information provided on tax organizers, applications, and intake forms (e.g., name, address, Social Security Number, Employer Identification Number, dates of birth).</li>
                <li>Financial documents provided for tax preparation (e.g., W-2s, 1099s, K-1s, bank statements, profit and loss reports, balance sheets).</li>
                <li>Information regarding your business transactions, payroll data, and past tax filing history.</li>
                <li>Communications via email, phone, secure TaxDome portal, or virtual consultations.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-figtree text-[#0B1F3B] mb-3">
                3. How We Use &amp; Protect Your Information
              </h2>
              <p className="mb-3">
                We use your personal and financial information solely to deliver the services you have engaged us for, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li>Preparing federal, state, and local tax returns.</li>
                <li>Providing ongoing accounting, bookkeeping, and payroll support.</li>
                <li>Representing you before the Internal Revenue Service (IRS) or state tax authorities.</li>
                <li>Advising on strategic tax minimization and business entity structuring.</li>
              </ul>
              <p className="mt-3">
                We maintain physical, electronic, and procedural safeguards that comply with federal regulations and IRS Publication 4557 (Safeguarding Taxpayer Data) to guard your non-public personal information.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-figtree text-[#0B1F3B] mb-3">
                4. Third-Party Disclosure Policy
              </h2>
              <p>
                <strong>We do not sell, rent, or trade your personal or financial information to any third party under any circumstances.</strong> Information is only shared with secure third-party software providers (e.g., TaxDome Client Portal, professional tax preparation platforms) necessary to perform agreed-upon functions, or when required by lawful subpoena or court order.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-figtree text-[#0B1F3B] mb-3">
                5. Contact Us Regarding Your Privacy
              </h2>
              <p>
                If you have any questions or concerns regarding this Privacy Policy or our data security practices, please contact us:
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
