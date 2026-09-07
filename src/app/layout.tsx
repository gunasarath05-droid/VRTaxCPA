import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Figtree, Manrope } from "next/font/google";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-figtree",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VR Tax CPA LLC | Professional Tax, Accounting & Advisory Services",
  description: "VR Tax CPA LLC provides proactive tax compliance, strategic planning, payroll support, accounting services, and fractional CFO advisory in Irving, TX and nationwide.",
  keywords: [
    "VR Tax CPA LLC",
    "Tax Compliance Irving TX",
    "Small Business Tax Advisory",
    "Proactive Tax Planning",
    "Payroll Support Setup",
    "Bookkeeping and Accounting",
    "Fractional CFO Irving",
    "IRS Notice Representation",
    "Vethavalli Ramakrishnan CPA"
  ],
  icons: {
    icon: [
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${figtree.variable} ${manrope.variable}`}
    >
      <body suppressHydrationWarning className="font-manrope antialiased bg-white text-[#334155]">
        {/* ADA Accessible Skip to Content Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only bg-[#0B1F3B] text-[#C5A880] border border-[#C5A880] font-bold rounded-lg shadow-2xl top-4 left-4 z-[9999]"
        >
          Skip to main content
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
