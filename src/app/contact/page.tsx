import type { Metadata } from "next";
import ContactHero from "@/sections/Contact/ContactHero";
import ContactForm from "@/sections/Contact/ContactForm";
import OfficeDetails from "@/sections/Contact/OfficeDetails";

export const metadata: Metadata = {
  title: "Contact Us | VR Tax CPA LLC — Schedule an Initial Consultation",
  description:
    "Schedule an initial tax strategy consultation with VR Tax CPA LLC in Irving, TX. Reach out to discuss tax planning, tax return compliance, accounting, payroll support, or CFO guidance.",
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactForm />
      {/* <OfficeDetails /> */}
    </>
  );
}
