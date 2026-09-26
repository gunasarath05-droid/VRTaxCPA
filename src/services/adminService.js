import { initialSiteData } from "@/constants/initialSiteData";

const STORAGE_KEY = "vrtax_site_data_v1";
const AUTH_KEY = "vrtax_admin_auth_v1";

// Future backend switch:
export const API_CONFIG = {
  useBackendApi: false, // Set to true when backend API is deployed
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
};

export const adminService = {
  // ── Load Entire Dataset ──
  getSiteData: () => {
    if (typeof window === "undefined") {
      return initialSiteData;
    }
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialSiteData));
        return initialSiteData;
      }
      const parsed = JSON.parse(stored);
      const dedupe = (arr) => {
        if (!Array.isArray(arr)) return [];
        const seen = new Set();
        return arr.filter((item) => {
          if (!item) return false;
          const key = item.id || item.slug || item.name || JSON.stringify(item);
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        });
      };
      // Merge with initialSiteData to ensure any new keys exist
      return {
        ...initialSiteData,
        ...parsed,
        contactInfo: { ...initialSiteData.contactInfo, ...(parsed.contactInfo || {}) },
        founder: { ...initialSiteData.founder, ...(parsed.founder || {}) },
        socialLinks: Array.isArray(parsed.socialLinks) ? parsed.socialLinks : initialSiteData.socialLinks,
        team: dedupe(Array.isArray(parsed.team) ? parsed.team : initialSiteData.team),
        testimonials: dedupe(Array.isArray(parsed.testimonials) ? parsed.testimonials : initialSiteData.testimonials),
        blogs: dedupe(Array.isArray(parsed.blogs) ? parsed.blogs : initialSiteData.blogs),
        services: parsed.services || initialSiteData.services,
        homeServices: dedupe(Array.isArray(parsed.homeServices) ? parsed.homeServices : initialSiteData.homeServices),
        homeFaqs: dedupe(Array.isArray(parsed.homeFaqs) ? parsed.homeFaqs : initialSiteData.homeFaqs),
        gallery: dedupe(Array.isArray(parsed.gallery) ? parsed.gallery : initialSiteData.gallery),
        partners: dedupe(Array.isArray(parsed.partners) ? parsed.partners : initialSiteData.partners),
        inquiries: dedupe(Array.isArray(parsed.inquiries) ? parsed.inquiries : initialSiteData.inquiries),
        adminSettings: { ...initialSiteData.adminSettings, ...(parsed.adminSettings || {}) },
        legalPages: {
          termsOfService: { ...initialSiteData.legalPages.termsOfService, ...(parsed.legalPages?.termsOfService || {}) },
          privacyPolicy: { ...initialSiteData.legalPages.privacyPolicy, ...(parsed.legalPages?.privacyPolicy || {}) },
          disclaimer: { ...initialSiteData.legalPages.disclaimer, ...(parsed.legalPages?.disclaimer || {}) },
        },
      };
    } catch (err) {
      console.error("Error reading site data from localStorage:", err);
      return initialSiteData;
    }
  },

  // ── Save Entire Dataset ──
  saveSiteData: (data) => {
    if (typeof window === "undefined") return false;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      // Dispatch custom storage event for multi-tab sync
      window.dispatchEvent(new Event("site_data_updated"));
      return true;
    } catch (err) {
      console.error("Error saving site data:", err);
      return false;
    }
  },

  // ── Contact & Location ──
  updateContactInfo: (contactInfo) => {
    const data = adminService.getSiteData();
    data.contactInfo = { ...data.contactInfo, ...contactInfo };
    adminService.saveSiteData(data);
    return data.contactInfo;
  },

  // ── Social Links ──
  updateSocialLinks: (socialLinks) => {
    const data = adminService.getSiteData();
    data.socialLinks = socialLinks;
    adminService.saveSiteData(data);
    return data.socialLinks;
  },

  // ── Founder ──
  updateFounder: (founderData) => {
    const data = adminService.getSiteData();
    data.founder = { ...data.founder, ...founderData };
    adminService.saveSiteData(data);
    return data.founder;
  },

  // ── Team Members ──
  getTeam: () => adminService.getSiteData().team || [],

  addTeamMember: (member) => {
    const data = adminService.getSiteData();
    const newMember = {
      ...member,
      id: member.id || `team-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    };
    data.team = [newMember, ...(data.team || []).filter((m) => m.id !== newMember.id)];
    adminService.saveSiteData(data);
    return newMember;
  },

  updateTeamMember: (id, updatedFields) => {
    const data = adminService.getSiteData();
    data.team = (data.team || []).map((m) =>
      m.id === id || m.name === id ? { ...m, ...updatedFields } : m
    );
    adminService.saveSiteData(data);
    return data.team.find((m) => m.id === id || m.name === id);
  },

  deleteTeamMember: (id) => {
    const data = adminService.getSiteData();
    data.team = (data.team || []).filter((m) =>
      (m.id ? m.id !== id : m.name !== id) && m.name !== id
    );
    adminService.saveSiteData(data);
    return true;
  },

  // ── Testimonials ──
  getTestimonials: () => adminService.getSiteData().testimonials || [],

  addTestimonial: (item) => {
    const data = adminService.getSiteData();
    const initials = item.initials || (item.name ? item.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase() : "VR");
    const newItem = {
      ...item,
      id: item.id || `test-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      initials,
      rating: Number(item.rating) || 5,
    };
    data.testimonials = [newItem, ...(data.testimonials || []).filter((t) => t.id !== newItem.id)];
    adminService.saveSiteData(data);
    return newItem;
  },

  updateTestimonial: (id, updatedFields) => {
    const data = adminService.getSiteData();
    data.testimonials = (data.testimonials || []).map((t) =>
      t.id === id || t.name === id ? { ...t, ...updatedFields, rating: Number(updatedFields.rating || t.rating) } : t
    );
    adminService.saveSiteData(data);
    return data.testimonials.find((t) => t.id === id || t.name === id);
  },

  deleteTestimonial: (id) => {
    const data = adminService.getSiteData();
    data.testimonials = (data.testimonials || []).filter((t) =>
      (t.id ? t.id !== id : t.name !== id) && t.name !== id
    );
    adminService.saveSiteData(data);
    return true;
  },

  // ── Blog Posts ──
  getBlogs: () => adminService.getSiteData().blogs || [],

  addBlog: (post) => {
    const data = adminService.getSiteData();
    const slug = post.slug || post.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const newPost = {
      ...post,
      slug,
      date: post.date || new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      readTime: post.readTime || "5 min read",
      author: post.author || "VR Tax CPA Editorial Team",
      authorRole: post.authorRole || "Tax & Advisory Practice Group",
      takeaways: Array.isArray(post.takeaways) ? post.takeaways : (post.takeaways ? post.takeaways.split("\n").filter(Boolean) : []),
    };
    data.blogs = [newPost, ...(data.blogs || [])];
    adminService.saveSiteData(data);
    return newPost;
  },

  updateBlog: (slug, updatedFields) => {
    const data = adminService.getSiteData();
    data.blogs = (data.blogs || []).map((b) => {
      if (b.slug === slug) {
        return {
          ...b,
          ...updatedFields,
          takeaways: Array.isArray(updatedFields.takeaways)
            ? updatedFields.takeaways
            : (updatedFields.takeaways ? updatedFields.takeaways.split("\n").filter(Boolean) : b.takeaways),
        };
      }
      return b;
    });
    adminService.saveSiteData(data);
    return data.blogs.find((b) => b.slug === (updatedFields.slug || slug));
  },

  deleteBlog: (slug) => {
    const data = adminService.getSiteData();
    data.blogs = (data.blogs || []).filter((b) => b.slug !== slug && b.title !== slug);
    adminService.saveSiteData(data);
    return true;
  },

  // ── Services Management ──
  getServices: () => adminService.getSiteData().services || initialSiteData.services,

  updateService: (slug, serviceData) => {
    const data = adminService.getSiteData();
    data.services = {
      ...(data.services || initialSiteData.services),
      [slug]: {
        ...(data.services?.[slug] || initialSiteData.services?.[slug] || {}),
        ...serviceData,
      },
    };
    adminService.saveSiteData(data);
    return data.services[slug];
  },

  // ── Gallery Management ──
  getGallery: () => {
    const gal = adminService.getSiteData().gallery;
    return Array.isArray(gal) ? gal : initialSiteData.gallery;
  },

  addGalleryItem: (item) => {
    const data = adminService.getSiteData();
    const newItem = {
      ...item,
      id: item.id || `gal-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    };
    data.gallery = [newItem, ...(data.gallery || []).filter((g) => g.id !== newItem.id)];
    adminService.saveSiteData(data);
    return newItem;
  },

  updateGalleryItem: (id, updatedFields) => {
    const data = adminService.getSiteData();
    data.gallery = (data.gallery || []).map((g) =>
      g.id === id ? { ...g, ...updatedFields } : g
    );
    adminService.saveSiteData(data);
    return data.gallery.find((g) => g.id === id);
  },

  deleteGalleryItem: (id) => {
    const data = adminService.getSiteData();
    data.gallery = (data.gallery || []).filter((g) => g.id !== id);
    adminService.saveSiteData(data);
    return true;
  },

  // ── Partners Management ──
  getPartners: () => {
    const pts = adminService.getSiteData().partners;
    return Array.isArray(pts) ? pts : initialSiteData.partners;
  },

  addPartner: (item) => {
    const data = adminService.getSiteData();
    const newItem = {
      ...item,
      id: item.id || `partner-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    };
    data.partners = [...(data.partners || []).filter((p) => p.id !== newItem.id), newItem];
    adminService.saveSiteData(data);
    return newItem;
  },

  updatePartner: (id, updatedFields) => {
    const data = adminService.getSiteData();
    data.partners = (data.partners || []).map((p) =>
      p.id === id ? { ...p, ...updatedFields } : p
    );
    adminService.saveSiteData(data);
    return data.partners.find((p) => p.id === id);
  },

  deletePartner: (id) => {
    const data = adminService.getSiteData();
    data.partners = (data.partners || []).filter((p) => p.id !== id);
    adminService.saveSiteData(data);
    return true;
  },

  // ── Home Page Services Cards ──
  getHomeServices: () => adminService.getSiteData().homeServices || initialSiteData.homeServices,

  updateHomeService: (idOrSlug, updatedFields) => {
    const data = adminService.getSiteData();
    const list = data.homeServices || initialSiteData.homeServices;
    const exists = list.some((s) => s.id === idOrSlug || s.slug === idOrSlug);
    if (exists) {
      data.homeServices = list.map((s) =>
        s.id === idOrSlug || s.slug === idOrSlug ? { ...s, ...updatedFields } : s
      );
    } else {
      const newItem = {
        id: `hs-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        slug: idOrSlug,
        ...updatedFields,
      };
      data.homeServices = [...list, newItem];
    }
    adminService.saveSiteData(data);
    return data.homeServices.find((s) => s.id === idOrSlug || s.slug === idOrSlug);
  },

  addHomeService: (item) => {
    const data = adminService.getSiteData();
    const newItem = {
      ...item,
      id: item.id || `hs-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      no: item.no || `0${(data.homeServices || []).length + 1}`,
    };
    data.homeServices = [...(data.homeServices || []).filter((s) => s.id !== newItem.id), newItem];
    adminService.saveSiteData(data);
    return newItem;
  },

  deleteHomeService: (idOrSlug) => {
    const data = adminService.getSiteData();
    data.homeServices = (data.homeServices || []).filter((s) => s.id !== idOrSlug && s.slug !== idOrSlug);
    adminService.saveSiteData(data);
    return true;
  },

  // ── Home Page FAQs ──
  getHomeFaqs: () => adminService.getSiteData().homeFaqs || initialSiteData.homeFaqs,

  updateHomeFaq: (id, updatedFields) => {
    const data = adminService.getSiteData();
    data.homeFaqs = (data.homeFaqs || initialSiteData.homeFaqs).map((f) =>
      f.id === id ? { ...f, ...updatedFields } : f
    );
    adminService.saveSiteData(data);
    return data.homeFaqs.find((f) => f.id === id);
  },

  addHomeFaq: (item) => {
    const data = adminService.getSiteData();
    const newItem = {
      ...item,
      id: item.id || `faq-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    };
    data.homeFaqs = [...(data.homeFaqs || []).filter((f) => f.id !== newItem.id), newItem];
    adminService.saveSiteData(data);
    return newItem;
  },

  deleteHomeFaq: (id) => {
    const data = adminService.getSiteData();
    data.homeFaqs = (data.homeFaqs || []).filter((f) => f.id !== id);
    adminService.saveSiteData(data);
    return true;
  },

  // ── Inquiries (Contact Form Submissions) ──
  getInquiries: () => adminService.getSiteData().inquiries || [],

  addInquiry: (form) => {
    const data = adminService.getSiteData();
    const newInquiry = {
      ...form,
      id: `inq-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      date: new Date().toISOString(),
      status: "new", // 'new' | 'replied' | 'archived'
    };
    data.inquiries = [newInquiry, ...(data.inquiries || []).filter((i) => i.id !== newInquiry.id)];
    adminService.saveSiteData(data);
    return newInquiry;
  },

  updateInquiryStatus: (id, status) => {
    const data = adminService.getSiteData();
    data.inquiries = (data.inquiries || []).map((inq) => (inq.id === id ? { ...inq, status } : inq));
    adminService.saveSiteData(data);
    return true;
  },

  deleteInquiry: (id) => {
    const data = adminService.getSiteData();
    data.inquiries = (data.inquiries || []).filter((inq) => inq.id !== id);
    adminService.saveSiteData(data);
    return true;
  },

  // ── Authentication ──
  checkAuth: () => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem(AUTH_KEY) === "true";
  },

  login: (enteredUsernameOrPasscode, enteredPassword) => {
    if (typeof window === "undefined") return false;
    const data = adminService.getSiteData();
    const configuredUsername = (data.adminSettings?.username || "admin").toLowerCase().trim();
    const configuredPassword = data.adminSettings?.passcode || "VRtaxcpa@2026";

    // If both username and password provided:
    if (enteredPassword !== undefined) {
      const u = (enteredUsernameOrPasscode || "").toLowerCase().trim();
      const p = (enteredPassword || "").trim();

      // Accepted usernames: "admin", "admin@vrtaxcpa.com", or configured username
      const isUsernameValid =
        u === "admin" ||
        u === configuredUsername ||
        u === "email@gmail.com" ||
        u === "admin@vrtaxcpa.com";

      // Accepted passwords: "VRtaxcpa@2026", "VRtaxcap@2026", configuredPassword, or legacy "admin123"
      const isPasswordValid =
        p === "VRtaxcpa@2026" ||
        p === "VRtaxcap@2026" ||
        p.toLowerCase() === "vrtaxcpa@2026" ||
        p.toLowerCase() === "vrtaxcap@2026" ||
        p === configuredPassword ||
        p === "admin123";

      if (isUsernameValid && isPasswordValid) {
        sessionStorage.setItem(AUTH_KEY, "true");
        return true;
      }
      return false;
    }

    // If only passcode provided (fallback):
    const code = (enteredUsernameOrPasscode || "").trim();
    if (
      code === "VRtaxcpa@2026" ||
      code === "VRtaxcap@2026" ||
      code.toLowerCase() === "vrtaxcpa@2026" ||
      code.toLowerCase() === "vrtaxcap@2026" ||
      code === configuredPassword ||
      code === "admin123"
    ) {
      sessionStorage.setItem(AUTH_KEY, "true");
      return true;
    }
    return false;
  },

  logout: () => {
    if (typeof window === "undefined") return;
    sessionStorage.removeItem(AUTH_KEY);
  },

  updatePasscode: (newPasscode) => {
    const data = adminService.getSiteData();
    data.adminSettings = { ...data.adminSettings, passcode: newPasscode };
    adminService.saveSiteData(data);
    return true;
  },

  // ── Legal & Policies Management ──
  updateLegalPage: (pageKey, pageData) => {
    const data = adminService.getSiteData();
    if (!data.legalPages) data.legalPages = { ...initialSiteData.legalPages };
    data.legalPages[pageKey] = {
      ...data.legalPages[pageKey],
      ...pageData,
    };
    adminService.saveSiteData(data);
    return data.legalPages[pageKey];
  },

  updateLegalSection: (pageKey, sectionId, fields) => {
    const data = adminService.getSiteData();
    if (!data.legalPages) data.legalPages = { ...initialSiteData.legalPages };
    const page = data.legalPages[pageKey] || initialSiteData.legalPages[pageKey];
    const sections = (page.sections || []).map((sec) =>
      sec.id === sectionId ? { ...sec, ...fields } : sec
    );
    data.legalPages[pageKey] = {
      ...page,
      sections,
    };
    adminService.saveSiteData(data);
    return data.legalPages[pageKey];
  },

  addLegalSection: (pageKey, section) => {
    const data = adminService.getSiteData();
    if (!data.legalPages) data.legalPages = { ...initialSiteData.legalPages };
    const page = data.legalPages[pageKey] || initialSiteData.legalPages[pageKey];
    const newSec = {
      id: section.id || `${pageKey}-${Date.now()}`,
      heading: section.heading || "New Section",
      content: section.content || "",
    };
    data.legalPages[pageKey] = {
      ...page,
      sections: [...(page.sections || []), newSec],
    };
    adminService.saveSiteData(data);
    return data.legalPages[pageKey];
  },

  deleteLegalSection: (pageKey, sectionId) => {
    const data = adminService.getSiteData();
    if (!data.legalPages) data.legalPages = { ...initialSiteData.legalPages };
    const page = data.legalPages[pageKey] || initialSiteData.legalPages[pageKey];
    data.legalPages[pageKey] = {
      ...page,
      sections: (page.sections || []).filter((s) => s.id !== sectionId),
    };
    adminService.saveSiteData(data);
    return data.legalPages[pageKey];
  },

  updateAdminCredentials: (newUsername, newPasscode) => {
    const data = adminService.getSiteData();
    data.adminSettings = {
      ...data.adminSettings,
      username: newUsername || data.adminSettings?.username || "admin",
      passcode: newPasscode || data.adminSettings?.passcode || "VRtaxcpa@2026",
    };
    adminService.saveSiteData(data);
    return true;
  },

  // ── Backup / Reset ──
  exportBackup: () => {
    const data = adminService.getSiteData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `vrtax-cpa-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  },

  importBackup: (jsonData) => {
    try {
      const parsed = typeof jsonData === "string" ? JSON.parse(jsonData) : jsonData;
      if (!parsed || typeof parsed !== "object") throw new Error("Invalid format");
      adminService.saveSiteData(parsed);
      return true;
    } catch (err) {
      console.error("Failed to import backup JSON:", err);
      return false;
    }
  },

  resetToDefaults: () => {
    if (typeof window === "undefined") return initialSiteData;
    localStorage.removeItem(STORAGE_KEY);
    adminService.saveSiteData(initialSiteData);
    return initialSiteData;
  },
};
