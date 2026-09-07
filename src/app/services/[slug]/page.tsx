import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { servicesData } from "@/constants/servicesData";

// Base Sections
import ServiceOverview from "@/sections/Services/ServiceOverview";
import WhatWeOffer from "@/sections/Services/WhatWeOffer";
import Benefits from "@/sections/Services/Benefits";
import IndustriesWeServe from "@/sections/Services/IndustriesWeServe";
import OurProcess from "@/sections/Services/OurProcess";
import FAQSection from "@/sections/Services/FAQSection";
import ServiceCTA from "@/sections/Services/ServiceCTA";
import RelatedServices from "@/sections/Services/RelatedServices";
import RelatedBlogs from "@/sections/Services/RelatedBlogs";

export function generateStaticParams() {
  return Object.keys(servicesData).map((slug) => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = servicesData[slug as keyof typeof servicesData];
  if (!data) return { title: "Service | VR Tax CPA LLC" };

  return {
    title: `${data.title} | VR Tax CPA LLC — Irving, TX`,
    description: data.overview || `Professional ${data.title} services by VR Tax CPA LLC in Irving, TX.`,
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const data = servicesData[slug as keyof typeof servicesData];

  if (!data) {
    notFound();
  }

  return (
    <>

      <ServiceOverview
        title={data.title}
        subtitle={data.overviewTitle}
        overview={data.overview}
        keyword={data.primaryKeyword}
      />
      <WhatWeOffer offers={data.whatWeOffer} />
      <Benefits benefits={data.benefits} />
      <IndustriesWeServe industries={data.industries} />
      <FAQSection faqs={data.faqs} serviceTitle={data.title} />
      {/* <ServiceCTA title={data.title} /> */}
      <RelatedServices relatedSlugs={data.related} />
    </>
  );
}
