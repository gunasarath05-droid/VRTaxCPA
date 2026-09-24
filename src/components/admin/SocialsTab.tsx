"use client";

import React from "react";
import ContactTab from "./ContactTab";
import { useSiteData } from "@/context/SiteDataContext";

interface SocialsTabProps {
  socialLinks: any[];
  updateSocialLinks: (links: any[]) => void;
  showToast: (msg: string, type?: "success" | "error" | "info") => void;
  contactInfo?: any;
  updateContactInfo?: (info: any) => void;
}

export default function SocialsTab({
  socialLinks,
  updateSocialLinks,
  showToast,
  contactInfo,
  updateContactInfo,
}: SocialsTabProps) {
  const siteData = useSiteData();
  const cInfo = contactInfo || siteData.contactInfo;
  const updateCInfo = updateContactInfo || siteData.updateContactInfo;

  return (
    <ContactTab
      contactInfo={cInfo}
      updateContactInfo={updateCInfo}
      socialLinks={socialLinks}
      updateSocialLinks={updateSocialLinks}
      showToast={showToast}
    />
  );
}
