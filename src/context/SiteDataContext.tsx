"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { initialSiteData } from "@/constants/initialSiteData";
import { adminService } from "@/services/adminService";

export interface ContactInfo {
  officeTitle?: string;
  address?: string;
  phone?: string;
  phoneRaw?: string;
  email?: string;
  hours?: string;
  tagline?: string;
  mapUrl?: string;
}

export interface SocialLink {
  id: string;
  name: string;
  url: string;
  enabled?: boolean;
}

export interface FounderData {
  name?: string;
  displayName?: string;
  title?: string;
  experienceYears?: number;
  experienceLabel?: string;
  image?: string;
  bio?: string;
  paragraphs?: string[];
  quote?: string;
  credentials?: string[];
  activeSocials?: string[];
  socials?: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
  };
}

export interface TeamMember {
  id?: string;
  name: string;
  role: string;
  bg?: string;
  bgColor?: string;
  image: string;
}

export interface TestimonialItem {
  id?: string;
  name: string;
  desig: string;
  initials?: string;
  rating?: number;
  industry?: string;
  desc: string;
}

export interface BlogPostItem {
  slug: string;
  image?: string;
  category?: string;
  date?: string;
  readTime?: string;
  author?: string;
  authorRole?: string;
  title: string;
  summary?: string;
  featured?: boolean;
  takeaways?: string[];
  content?: string;
}

export interface InquiryItem {
  id: string;
  name: string;
  company?: string;
  email: string;
  phone?: string;
  service?: string;
  message?: string;
  date: string;
  status: "new" | "replied" | "archived" | string;
}

export interface AdminSettings {
  username?: string;
  passcode: string;
  backendApiUrl?: string;
}

export interface SiteDataContextType {
  isLoaded: boolean;
  contactInfo: ContactInfo;
  socialLinks: SocialLink[];
  founder: FounderData;
  team: TeamMember[];
  testimonials: TestimonialItem[];
  blogs: BlogPostItem[];
  inquiries: InquiryItem[];
  adminSettings: AdminSettings;
  updateContactInfo: (info: any) => any;
  updateSocialLinks: (links: any) => any;
  updateFounder: (data: any) => any;
  addTeamMember: (member: any) => any;
  updateTeamMember: (id: string, member: any) => any;
  deleteTeamMember: (id: string) => void;
  addTestimonial: (item: any) => any;
  updateTestimonial: (id: string, item: any) => any;
  deleteTestimonial: (id: string) => void;
  addBlog: (post: any) => any;
  updateBlog: (slug: string, post: any) => any;
  deleteBlog: (slug: string) => void;
  addInquiry: (form: any) => any;
  updateInquiryStatus: (id: string, status: string) => void;
  deleteInquiry: (id: string) => void;
  exportBackup: () => void;
  importBackup: (json: any) => boolean;
  resetToDefaults: () => any;
  updatePasscode: (code: string) => void;
  refreshData: () => void;
}

const SiteDataContext = createContext<SiteDataContextType | null>(null);

export function SiteDataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState(initialSiteData);
  const [isLoaded, setIsLoaded] = useState(false);

  const refreshData = useCallback(() => {
    const current = adminService.getSiteData();
    setData(current);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    refreshData();

    const handleUpdate = () => {
      refreshData();
    };

    window.addEventListener("site_data_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener("site_data_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, [refreshData]);

  const updateContactInfo = useCallback((contactInfo: any) => {
    const updated = adminService.updateContactInfo(contactInfo);
    setData((prev: any) => ({ ...prev, contactInfo: updated }));
    return updated;
  }, []);

  const updateSocialLinks = useCallback((socialLinks: any) => {
    const updated = adminService.updateSocialLinks(socialLinks);
    setData((prev: any) => ({ ...prev, socialLinks: updated }));
    return updated;
  }, []);

  const updateFounder = useCallback((founderData: any) => {
    const updated = adminService.updateFounder(founderData);
    setData((prev: any) => ({ ...prev, founder: updated }));
    return updated;
  }, []);

  const addTeamMember = useCallback((member: any) => {
    const newMember = adminService.addTeamMember(member);
    setData((prev: any) => ({ ...prev, team: [newMember, ...prev.team] }));
    return newMember;
  }, []);

  const updateTeamMember = useCallback((id: string, updatedFields: any) => {
    const updated = adminService.updateTeamMember(id, updatedFields);
    setData((prev: any) => ({
      ...prev,
      team: prev.team.map((m: any) => (m.id === id ? { ...m, ...updatedFields } : m)),
    }));
    return updated;
  }, []);

  const deleteTeamMember = useCallback((id: string) => {
    adminService.deleteTeamMember(id);
    setData((prev: any) => ({
      ...prev,
      team: prev.team.filter((m: any) => m.id !== id),
    }));
  }, []);

  const addTestimonial = useCallback((item: any) => {
    const newItem = adminService.addTestimonial(item);
    setData((prev: any) => ({ ...prev, testimonials: [newItem, ...prev.testimonials] }));
    return newItem;
  }, []);

  const updateTestimonial = useCallback((id: string, updatedFields: any) => {
    const updated = adminService.updateTestimonial(id, updatedFields);
    setData((prev: any) => ({
      ...prev,
      testimonials: prev.testimonials.map((t: any) => (t.id === id ? { ...t, ...updatedFields } : t)),
    }));
    return updated;
  }, []);

  const deleteTestimonial = useCallback((id: string) => {
    adminService.deleteTestimonial(id);
    setData((prev: any) => ({
      ...prev,
      testimonials: prev.testimonials.filter((t: any) => t.id !== id),
    }));
  }, []);

  const addBlog = useCallback((post: any) => {
    const newPost = adminService.addBlog(post);
    setData((prev: any) => ({ ...prev, blogs: [newPost, ...prev.blogs] }));
    return newPost;
  }, []);

  const updateBlog = useCallback((slug: string, updatedFields: any) => {
    const updated = adminService.updateBlog(slug, updatedFields);
    setData((prev: any) => ({
      ...prev,
      blogs: prev.blogs.map((b: any) => (b.slug === slug ? { ...b, ...updatedFields } : b)),
    }));
    return updated;
  }, []);

  const deleteBlog = useCallback((slug: string) => {
    adminService.deleteBlog(slug);
    setData((prev: any) => ({
      ...prev,
      blogs: prev.blogs.filter((b: any) => b.slug !== slug),
    }));
  }, []);

  const addInquiry = useCallback((form: any) => {
    const newInquiry = adminService.addInquiry(form);
    setData((prev: any) => ({ ...prev, inquiries: [newInquiry, ...prev.inquiries] }));
    return newInquiry;
  }, []);

  const updateInquiryStatus = useCallback((id: string, status: string) => {
    adminService.updateInquiryStatus(id, status);
    setData((prev: any) => ({
      ...prev,
      inquiries: prev.inquiries.map((inq: any) => (inq.id === id ? { ...inq, status } : inq)),
    }));
  }, []);

  const deleteInquiry = useCallback((id: string) => {
    adminService.deleteInquiry(id);
    setData((prev: any) => ({
      ...prev,
      inquiries: prev.inquiries.filter((inq: any) => inq.id !== id),
    }));
  }, []);

  const exportBackup = useCallback(() => {
    adminService.exportBackup();
  }, []);

  const importBackup = useCallback((json: any) => {
    const success = adminService.importBackup(json);
    if (success) refreshData();
    return success;
  }, [refreshData]);

  const resetToDefaults = useCallback(() => {
    const reset = adminService.resetToDefaults() || initialSiteData;
    setData(reset);
    return reset;
  }, []);

  const updatePasscode = useCallback((passcode: string) => {
    adminService.updatePasscode(passcode);
    setData((prev: any) => ({
      ...prev,
      adminSettings: { ...prev.adminSettings, passcode },
    }));
  }, []);

  return (
    <SiteDataContext.Provider
      value={{
        isLoaded,
        contactInfo: data.contactInfo,
        socialLinks: data.socialLinks,
        founder: data.founder,
        team: data.team,
        testimonials: data.testimonials,
        blogs: data.blogs,
        inquiries: data.inquiries,
        adminSettings: data.adminSettings,
        updateContactInfo,
        updateSocialLinks,
        updateFounder,
        addTeamMember,
        updateTeamMember,
        deleteTeamMember,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        addBlog,
        updateBlog,
        deleteBlog,
        addInquiry,
        updateInquiryStatus,
        deleteInquiry,
        exportBackup,
        importBackup,
        resetToDefaults,
        updatePasscode,
        refreshData,
      }}
    >
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData(): SiteDataContextType {
  const context = useContext(SiteDataContext);
  if (!context) {
    return {
      isLoaded: true,
      contactInfo: initialSiteData.contactInfo,
      socialLinks: initialSiteData.socialLinks,
      founder: initialSiteData.founder,
      team: initialSiteData.team,
      testimonials: initialSiteData.testimonials,
      blogs: initialSiteData.blogs,
      inquiries: initialSiteData.inquiries as any,
      adminSettings: initialSiteData.adminSettings,
      updateContactInfo: (_: any) => {},
      updateSocialLinks: (_: any) => {},
      updateFounder: (_: any) => {},
      addTeamMember: (_: any) => {},
      updateTeamMember: (_: string, __: any) => {},
      deleteTeamMember: (_: string) => {},
      addTestimonial: (_: any) => {},
      updateTestimonial: (_: string, __: any) => {},
      deleteTestimonial: (_: string) => {},
      addBlog: (_: any) => {},
      updateBlog: (_: string, __: any) => {},
      deleteBlog: (_: string) => {},
      addInquiry: (_: any) => {},
      updateInquiryStatus: (_: string, __: string) => {},
      deleteInquiry: (_: string) => {},
      exportBackup: () => {},
      importBackup: (_: any) => false,
      resetToDefaults: () => initialSiteData,
      updatePasscode: (_: string) => {},
      refreshData: () => {},
    };
  }
  return context;
}
