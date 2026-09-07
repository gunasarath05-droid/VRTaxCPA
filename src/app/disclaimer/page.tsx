import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Professional Disclaimer | VR Tax CPA LLC",
  description: "Tax, Legal, and Financial Advice Disclaimer for VR Tax CPA LLC.",
};

export default function DisclaimerPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 sm:pt-36 pb-14 sm:pb-20 bg-[#0B1F3B] text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none bg-[radial-gradient(circle,#d3d663,transparent_70%)]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <nav className="flex items-center justify-center gap-2 text-white/60 text-xs font-semibold mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#d3d663]">Disclaimer</span>
          </nav>
          <span className="inline-flex items-center rounded-full bg-white/10 text-white/80 px-3.5 py-1 text-xs font-bold uppercase tracking-widest border border-white/20 mb-3 font-figtree">
            Important Notices
          </span>
          <h1 className="text-3xl sm:text-5xl text-white font-extrabold font-figtree tracking-tight">
            Professional Disclaimer
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
                1. No CPA-Client Relationship Formed by Website Use
              </h2>
              <p>
                The information provided on this website (vrtaxcpa.com), including articles, blog posts, tax deadline guides, calculators, and social media content, is published for general informational and educational purposes only. Browsing this website, submitting an inquiry form, or reading our published materials does <strong>not</strong> establish a CPA-client, attorney-client, or fiduciary relationship between you and VR Tax CPA LLC.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-figtree text-[#0B1F3B] mb-3">
                2. Not Formal Tax, Legal, or Financial Advice
              </h2>
              <p>
                Tax laws and regulations (both federal and state) are constantly evolving and vary substantially based on individual circumstances, entity classifications, and jurisdictions. Content on this site should <strong>not</strong> be relied upon as a substitute for individualized professional advice tailored to your specific tax situation. Always consult with a qualified professional before making tax, financial, or corporate entity decisions.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-figtree text-[#0B1F3B] mb-3">
                3. IRS Circular 230 Disclosure
              </h2>
              <p>
                Pursuant to Internal Revenue Service (IRS) regulations, any tax information contained in this communication (including any attachments or website postings) is not intended or written to be used, and cannot be used, for the purpose of avoiding tax-related penalties under the Internal Revenue Code, or for promoting, marketing, or recommending to another party any tax-related transaction or matter.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-figtree text-[#0B1F3B] mb-3">
                4. Third-Party Links &amp; Tools
              </h2>
              <p>
                This website may contain links to external third-party websites or services. VR Tax CPA LLC does not control and is not responsible for the accuracy, content, or privacy policies of third-party platforms.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-figtree text-[#0B1F3B] mb-3">
                5. Contact Us
              </h2>
              <p>
                For official professional consultations and formal advisory engagements, please contact:
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
