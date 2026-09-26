import type { Metadata } from "next";
import LegalPageContent from "@/components/legal/LegalPageContent";

export const metadata: Metadata = {
  title: "Privacy Policy | VR Tax CPA LLC",
  description: "Privacy Policy for VR Tax CPA LLC. Learn how we safeguard and protect your personal and financial information.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageContent
      pageKey="privacyPolicy"
      defaultTitle="Privacy Policy"
      defaultBadge="Legal & Compliance"
    />
  );
}
