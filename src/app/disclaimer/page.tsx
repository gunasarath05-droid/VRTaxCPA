import type { Metadata } from "next";
import LegalPageContent from "@/components/legal/LegalPageContent";

export const metadata: Metadata = {
  title: "Professional Disclaimer | VR Tax CPA LLC",
  description: "Tax, Legal, and Financial Advice Disclaimer for VR Tax CPA LLC.",
};

export default function DisclaimerPage() {
  return (
    <LegalPageContent
      pageKey="disclaimer"
      defaultTitle="Professional Disclaimer"
      defaultBadge="Important Notices"
    />
  );
}
