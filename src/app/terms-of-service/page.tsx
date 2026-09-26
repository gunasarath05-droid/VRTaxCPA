import type { Metadata } from "next";
import LegalPageContent from "@/components/legal/LegalPageContent";

export const metadata: Metadata = {
  title: "Terms of Service | VR Tax CPA LLC",
  description: "Terms of Service and Engagement Policy for VR Tax CPA LLC in Irving, Texas.",
};

export default function TermsOfServicePage() {
  return (
    <LegalPageContent
      pageKey="termsOfService"
      defaultTitle="Terms of Service"
      defaultBadge="Client Agreement"
    />
  );
}
