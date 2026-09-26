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

export interface LegalSection {
  id: string;
  heading: string;
  content: string;
}

export interface LegalPageData {
  title: string;
  badge: string;
  lastUpdated: string;
  sections: LegalSection[];
}

export interface LegalPages {
  termsOfService: LegalPageData;
  privacyPolicy: LegalPageData;
  disclaimer: LegalPageData;
}

export interface SiteDataContextType {
  isLoaded: boolean;
  contactInfo: ContactInfo;
  socialLinks: SocialLink[];
  founder: FounderData;
  team: TeamMember[];
  testimonials: TestimonialItem[];
  blogs: BlogPostItem[];
  services: Record<string, any>;
  gallery: any[];
  partners: any[];
  homeServices: any[];
  homeFaqs: any[];
  inquiries: InquiryItem[];
  adminSettings: AdminSettings;
  legalPages: LegalPages;
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
  updateService: (slug: string, serviceData: any) => any;
  addGalleryItem: (item: any) => any;
  updateGalleryItem: (id: string, item: any) => any;
  deleteGalleryItem: (id: string) => void;
  addPartner: (item: any) => any;
  updatePartner: (id: string, item: any) => any;
  deletePartner: (id: string) => void;
  updateHomeService: (idOrSlug: string, fields: any) => any;
  addHomeService: (item: any) => any;
  deleteHomeService: (idOrSlug: string) => void;
  updateHomeFaq: (id: string, fields: any) => any;
  addHomeFaq: (item: any) => any;
  deleteHomeFaq: (id: string) => void;
  updateLegalPage: (pageKey: "termsOfService" | "privacyPolicy" | "disclaimer", pageData: any) => any;
  updateLegalSection: (pageKey: "termsOfService" | "privacyPolicy" | "disclaimer", sectionId: string, fields: any) => any;
  addLegalSection: (pageKey: "termsOfService" | "privacyPolicy" | "disclaimer", section: any) => any;
  deleteLegalSection: (pageKey: "termsOfService" | "privacyPolicy" | "disclaimer", sectionId: string) => void;
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
    setData((prev: any) => ({ ...prev, team: [newMember, ...(prev.team || []).filter((m: any) => m.id !== newMember.id)] }));
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
      team: (prev.team || []).filter((m: any) => (m.id ? m.id !== id : m.name !== id) && m.name !== id),
    }));
  }, []);

  const addTestimonial = useCallback((item: any) => {
    const newItem = adminService.addTestimonial(item);
    setData((prev: any) => ({
      ...prev,
      testimonials: [newItem, ...(prev.testimonials || []).filter((t: any) => t.id !== newItem.id)],
    }));
    return newItem;
  }, []);

  const updateTestimonial = useCallback((id: string, updatedFields: any) => {
    const updated = adminService.updateTestimonial(id, updatedFields);
    setData((prev: any) => ({
      ...prev,
      testimonials: (prev.testimonials || []).map((t: any) =>
        (t.id === id || t.name === id) ? { ...t, ...updatedFields } : t
      ),
    }));
    return updated;
  }, []);

  const deleteTestimonial = useCallback((id: string) => {
    adminService.deleteTestimonial(id);
    setData((prev: any) => ({
      ...prev,
      testimonials: (prev.testimonials || []).filter((t: any) => (t.id ? t.id !== id : t.name !== id) && t.name !== id),
    }));
  }, []);

  const addBlog = useCallback((post: any) => {
    const newPost = adminService.addBlog(post);
    setData((prev: any) => ({ ...prev, blogs: [newPost, ...(prev.blogs || []).filter((b: any) => b.slug !== newPost.slug)] }));
    return newPost;
  }, []);

  const updateBlog = useCallback((slug: string, updatedFields: any) => {
    const updated = adminService.updateBlog(slug, updatedFields);
    setData((prev: any) => ({
      ...prev,
      blogs: (prev.blogs || []).map((b: any) =>
        (b.slug === slug || b.title === slug) ? { ...b, ...updatedFields } : b
      ),
    }));
    return updated;
  }, []);

  const deleteBlog = useCallback((slug: string) => {
    adminService.deleteBlog(slug);
    setData((prev: any) => ({
      ...prev,
      blogs: (prev.blogs || []).filter((b: any) => b.slug !== slug && b.title !== slug),
    }));
  }, []);

  const updateService = useCallback((slug: string, serviceData: any) => {
    const updated = adminService.updateService(slug, serviceData);
    setData((prev: any) => ({
      ...prev,
      services: {
        ...(prev.services || {}),
        [slug]: updated,
      },
    }));
    return updated;
  }, []);

  const addGalleryItem = useCallback((item: any) => {
    const newItem = adminService.addGalleryItem(item);
    setData((prev: any) => ({
      ...prev,
      gallery: [newItem, ...(prev.gallery || []).filter((g: any) => g.id !== newItem.id)],
    }));
    return newItem;
  }, []);

  const updateGalleryItem = useCallback((id: string, updatedFields: any) => {
    const updated = adminService.updateGalleryItem(id, updatedFields);
    setData((prev: any) => ({
      ...prev,
      gallery: (prev.gallery || []).map((g: any) => (g.id === id ? { ...g, ...updatedFields } : g)),
    }));
    return updated;
  }, []);

  const deleteGalleryItem = useCallback((id: string) => {
    adminService.deleteGalleryItem(id);
    setData((prev: any) => ({
      ...prev,
      gallery: (prev.gallery || []).filter((g: any) => g.id !== id),
    }));
  }, []);

  const addPartner = useCallback((item: any) => {
    const newItem = adminService.addPartner(item);
    setData((prev: any) => ({
      ...prev,
      partners: [...(prev.partners || []).filter((p: any) => p.id !== newItem.id), newItem],
    }));
    return newItem;
  }, []);

  const updatePartner = useCallback((id: string, updatedFields: any) => {
    const updated = adminService.updatePartner(id, updatedFields);
    setData((prev: any) => ({
      ...prev,
      partners: (prev.partners || []).map((p: any) => (p.id === id ? { ...p, ...updatedFields } : p)),
    }));
    return updated;
  }, []);

  const deletePartner = useCallback((id: string) => {
    adminService.deletePartner(id);
    setData((prev: any) => ({
      ...prev,
      partners: (prev.partners || []).filter((p: any) => p.id !== id),
    }));
  }, []);

  const updateHomeService = useCallback((idOrSlug: string, updatedFields: any) => {
    const updated = adminService.updateHomeService(idOrSlug, updatedFields);
    setData((prev: any) => {
      const list = prev.homeServices || [];
      const exists = list.some((s: any) => s.id === idOrSlug || s.slug === idOrSlug);
      const nextList = exists
        ? list.map((s: any) => (s.id === idOrSlug || s.slug === idOrSlug ? { ...s, ...updatedFields } : s))
        : [...list, updated];
      return {
        ...prev,
        homeServices: nextList,
      };
    });
    return updated;
  }, []);

  const addHomeService = useCallback((item: any) => {
    const newItem = adminService.addHomeService(item);
    setData((prev: any) => ({
      ...prev,
      homeServices: [...(prev.homeServices || []).filter((s: any) => s.id !== newItem.id), newItem],
    }));
    return newItem;
  }, []);

  const deleteHomeService = useCallback((idOrSlug: string) => {
    adminService.deleteHomeService(idOrSlug);
    setData((prev: any) => ({
      ...prev,
      homeServices: (prev.homeServices || []).filter((s: any) => s.id !== idOrSlug && s.slug !== idOrSlug),
    }));
  }, []);

  const updateHomeFaq = useCallback((id: string, updatedFields: any) => {
    const updated = adminService.updateHomeFaq(id, updatedFields);
    setData((prev: any) => ({
      ...prev,
      homeFaqs: (prev.homeFaqs || []).map((f: any) =>
        f.id === id ? { ...f, ...updatedFields } : f
      ),
    }));
    return updated;
  }, []);

  const addHomeFaq = useCallback((item: any) => {
    const newItem = adminService.addHomeFaq(item);
    setData((prev: any) => ({
      ...prev,
      homeFaqs: [...(prev.homeFaqs || []).filter((f: any) => f.id !== newItem.id), newItem],
    }));
    return newItem;
  }, []);

  const deleteHomeFaq = useCallback((id: string) => {
    adminService.deleteHomeFaq(id);
    setData((prev: any) => ({
      ...prev,
      homeFaqs: (prev.homeFaqs || []).filter((f: any) => f.id !== id),
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

  const updateLegalPage = useCallback((pageKey: any, pageData: any) => {
    const updated = adminService.updateLegalPage(pageKey, pageData);
    setData((prev: any) => ({
      ...prev,
      legalPages: {
        ...(prev.legalPages || (initialSiteData as any).legalPages),
        [pageKey]: updated,
      },
    }));
    return updated;
  }, []);

  const updateLegalSection = useCallback((pageKey: any, sectionId: string, fields: any) => {
    const updated = adminService.updateLegalSection(pageKey, sectionId, fields);
    setData((prev: any) => ({
      ...prev,
      legalPages: {
        ...(prev.legalPages || (initialSiteData as any).legalPages),
        [pageKey]: updated,
      },
    }));
    return updated;
  }, []);

  const addLegalSection = useCallback((pageKey: any, section: any) => {
    const updated = adminService.addLegalSection(pageKey, section);
    setData((prev: any) => ({
      ...prev,
      legalPages: {
        ...(prev.legalPages || (initialSiteData as any).legalPages),
        [pageKey]: updated,
      },
    }));
    return updated;
  }, []);

  const deleteLegalSection = useCallback((pageKey: any, sectionId: string) => {
    const updated = adminService.deleteLegalSection(pageKey, sectionId);
    setData((prev: any) => ({
      ...prev,
      legalPages: {
        ...(prev.legalPages || (initialSiteData as any).legalPages),
        [pageKey]: updated,
      },
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
        services: data.services || (initialSiteData as any).services,
        gallery: Array.isArray(data.gallery) ? data.gallery : (initialSiteData as any).gallery,
        partners: Array.isArray(data.partners) ? data.partners : (initialSiteData as any).partners,
        homeServices: Array.isArray(data.homeServices) ? data.homeServices : (initialSiteData as any).homeServices,
        homeFaqs: Array.isArray(data.homeFaqs) ? data.homeFaqs : (initialSiteData as any).homeFaqs,
        inquiries: data.inquiries,
        adminSettings: data.adminSettings,
        legalPages: data.legalPages || (initialSiteData as any).legalPages,
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
        updateService,
        addGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,
        addPartner,
        updatePartner,
        deletePartner,
        updateHomeService,
        addHomeService,
        deleteHomeService,
        updateHomeFaq,
        addHomeFaq,
        deleteHomeFaq,
        updateLegalPage,
        updateLegalSection,
        addLegalSection,
        deleteLegalSection,
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
      services: (initialSiteData as any).services,
      gallery: (initialSiteData as any).gallery,
      partners: (initialSiteData as any).partners,
      homeServices: (initialSiteData as any).homeServices,
      homeFaqs: (initialSiteData as any).homeFaqs,
      inquiries: initialSiteData.inquiries as any,
      adminSettings: initialSiteData.adminSettings,
      legalPages: (initialSiteData as any).legalPages,
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
      updateService: (_: string, __: any) => {},
      addGalleryItem: (_: any) => {},
      updateGalleryItem: (_: string, __: any) => {},
      deleteGalleryItem: (_: string) => {},
      addPartner: (_: any) => {},
      updatePartner: (_: string, __: any) => {},
      deletePartner: (_: string) => {},
      updateHomeService: (_: string, __: any) => {},
      addHomeService: (_: any) => {},
      deleteHomeService: (_: string) => {},
      updateHomeFaq: (_: string, __: any) => {},
      addHomeFaq: (_: any) => {},
      deleteHomeFaq: (_: string) => {},
      updateLegalPage: (_: any, __: any) => {},
      updateLegalSection: (_: any, __: string, ___: any) => {},
      addLegalSection: (_: any, __: any) => {},
      deleteLegalSection: (_: any, __: string) => {},
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
