import type { Metadata } from "next";
import BlogHeader from "@/sections/Blog/BlogHeader";
import BlogGrid from "@/sections/Blog/BlogGrid";

export const metadata: Metadata = {
  title: "Tax & Financial Insights | VR Tax CPA LLC — Irving, TX",
  description:
    "Strategic insights on business tax planning, compliance, bookkeeping best practices, vendor-neutral payroll support, and advisory services from VR Tax CPA LLC.",
};

export default function BlogPage() {
  return (
    <>
      <BlogHeader />
      <BlogGrid />
    </>
  );
}
