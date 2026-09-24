import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Portal | VR Tax CPA LLC",
  description: "Management portal for VR Tax CPA LLC website content, contact info, testimonials, blogs, and inquiries.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 antialiased font-manrope selection:bg-[#0B1F3B] selection:text-[#d3d663]">
      {children}
    </div>
  );
}
