"use client";

import React, { useState, useEffect } from "react";
import { useSiteData } from "@/context/SiteDataContext";
import { adminService } from "@/services/adminService";

// Modular Admin Components
import AdminLogin from "@/components/admin/AdminLogin";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminToast, { ToastData } from "@/components/admin/AdminToast";
import OverviewTab from "@/components/admin/OverviewTab";
import InquiriesTab from "@/components/admin/InquiriesTab";
import ContactTab from "@/components/admin/ContactTab";
import FounderTab from "@/components/admin/FounderTab";
import TeamTab from "@/components/admin/TeamTab";
import TestimonialsTab from "@/components/admin/TestimonialsTab";
import BlogsTab from "@/components/admin/BlogsTab";
import ServicesTab from "@/components/admin/ServicesTab";
import HomeFaqsTab from "@/components/admin/HomeFaqsTab";
import GalleryTab from "@/components/admin/GalleryTab";
import PartnersTab from "@/components/admin/PartnersTab";
import LegalTab from "@/components/admin/LegalTab";
import SettingsTab from "@/components/admin/SettingsTab";
import {
  TeamModal,
  TestimonialModal,
  BlogModal,
} from "@/components/admin/AdminModals";

export default function AdminPage() {
  const {
    contactInfo,
    socialLinks,
    founder,
    team,
    testimonials,
    blogs,
    services,
    gallery,
    partners,
    homeServices,
    homeFaqs,
    inquiries,
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
    legalPages,
    updateLegalPage,
    updateLegalSection,
    addLegalSection,
    deleteLegalSection,
    updateInquiryStatus,
    deleteInquiry,
    exportBackup,
    importBackup,
    resetToDefaults,
    updatePasscode,
  } = useSiteData();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);
  const [usernameInput, setUsernameInput] = useState("");
  const [passcodeInput, setPasscodeInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");

  // Navigation State
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Toast Notification State
  const [toast, setToast] = useState<ToastData | null>(null);

  const showToast = (
    message: string,
    type: "success" | "error" | "info" = "success"
  ) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Check login on mount immediately
  useEffect(() => {
    const isAuth = adminService.checkAuth();
    setIsAuthenticated(isAuth);
    setAuthChecking(false);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    const u = usernameInput.trim();
    const p = passcodeInput.trim();

    if (!u || !p) {
      setAuthError("Please enter both username and password.");
      return;
    }

    if (adminService.login(u, p)) {
      setIsAuthenticated(true);
      showToast("Welcome to VR Tax CPA Admin Portal", "success");
    } else {
      setAuthError("Incorrect username or password. Please try again.");
    }
  };

  const handleLogout = () => {
    adminService.logout();
    setIsAuthenticated(false);
    setUsernameInput("");
    setPasscodeInput("");
    showToast("Logged out successfully", "info");
  };

  // ── Team Member Modal State ──
  const [teamModalOpen, setTeamModalOpen] = useState(false);
  const [editingTeamMember, setEditingTeamMember] = useState<any>(null);
  const [teamForm, setTeamForm] = useState({
    name: "",
    role: "",
    image: "",
    bgColor: "#2D5A27",
  });

  const openAddTeamModal = () => {
    setEditingTeamMember(null);
    setTeamForm({ name: "", role: "", image: "", bgColor: "#2D5A27" });
    setTeamModalOpen(true);
  };

  const openEditTeamModal = (member: any) => {
    setEditingTeamMember(member);
    setTeamForm({
      name: member.name,
      role: member.role,
      image: member.image,
      bgColor: member.bgColor || "#2D5A27",
    });
    setTeamModalOpen(true);
  };

  const handleSaveTeamMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTeamMember) {
      updateTeamMember(editingTeamMember.id, teamForm);
      showToast(`Updated ${teamForm.name}`);
    } else {
      addTeamMember(teamForm);
      showToast(`Added ${teamForm.name} to team`);
    }
    setTeamModalOpen(false);
  };

  // ── Testimonial Modal State ──
  const [testimonialModalOpen, setTestimonialModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<any>(null);
  const [testimonialForm, setTestimonialForm] = useState({
    name: "",
    desig: "",
    desc: "",
    rating: 5,
    industry: "",
  });

  const openAddTestimonialModal = () => {
    setEditingTestimonial(null);
    setTestimonialForm({ name: "", desig: "", desc: "", rating: 5, industry: "" });
    setTestimonialModalOpen(true);
  };

  const openEditTestimonialModal = (item: any) => {
    setEditingTestimonial(item);
    setTestimonialForm({
      name: item.name,
      desig: item.desig,
      desc: item.desc,
      rating: item.rating || 5,
      industry: item.industry || "",
    });
    setTestimonialModalOpen(true);
  };

  const handleSaveTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTestimonial) {
      updateTestimonial(editingTestimonial.id, testimonialForm);
      showToast(`Updated review from ${testimonialForm.name}`);
    } else {
      addTestimonial(testimonialForm);
      showToast(`Added review from ${testimonialForm.name}`);
    }
    setTestimonialModalOpen(false);
  };

  // ── Blog Post Modal State ──
  const [blogModalOpen, setBlogModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<any>(null);
  const [blogForm, setBlogForm] = useState({
    title: "",
    slug: "",
    category: "Tax Planning",
    image: "",
    readTime: "5 min read",
    summary: "",
    content: "",
    featured: false,
    takeawaysText: "",
  });

  const openAddBlogModal = () => {
    setEditingBlog(null);
    setBlogForm({
      title: "",
      slug: "",
      category: "Tax Planning",
      image: "",
      readTime: "5 min read",
      summary: "",
      content: "",
      featured: false,
      takeawaysText: "",
    });
    setBlogModalOpen(true);
  };

  const openEditBlogModal = (post: any) => {
    setEditingBlog(post);
    setBlogForm({
      title: post.title,
      slug: post.slug,
      category: post.category,
      image: post.image || "",
      readTime: post.readTime || "5 min read",
      summary: post.summary || "",
      content: post.content || "",
      featured: post.featured || false,
      takeawaysText: Array.isArray(post.takeaways)
        ? post.takeaways.join("\n")
        : "",
    });
    setBlogModalOpen(true);
  };

  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    const takeaways = blogForm.takeawaysText
      .split("\n")
      .map((t) => t.trim())
      .filter(Boolean);

    const postPayload = {
      title: blogForm.title,
      slug: blogForm.slug,
      category: blogForm.category,
      image: blogForm.image,
      readTime: blogForm.readTime,
      summary: blogForm.summary,
      content: blogForm.content,
      featured: blogForm.featured,
      takeaways,
      date: editingBlog?.date || new Date().toISOString().split("T")[0],
    };

    if (editingBlog) {
      updateBlog(editingBlog.slug, postPayload);
      showToast(`Updated "${blogForm.title}"`);
    } else {
      addBlog(postPayload);
      showToast(`Published "${blogForm.title}"`);
    }
    setBlogModalOpen(false);
  };

  const unreadInquiriesCount = (inquiries || []).filter(
    (inq: any) => inq.status === "new"
  ).length;

  // ── Auth Checking ──
  if (authChecking) {
    return null;
  }

  // ── Render Login Screen ──
  if (!isAuthenticated) {
    return (
      <AdminLogin
        usernameInput={usernameInput}
        setUsernameInput={setUsernameInput}
        passcodeInput={passcodeInput}
        setPasscodeInput={setPasscodeInput}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        authError={authError}
        handleLogin={handleLogin}
      />
    );
  }

  const tabTitles: Record<string, string> = {
    overview: "Dashboard",
    inquiries: "Contact Inquiries",
    contact: "Location, Contact & Social Links",
    socials: "Location, Contact & Social Links",
    founder: "Founder & Leadership",
    team: "Team Members",
    testimonials: "Client Testimonials",
    blogs: "Blog Posts & Articles",
    services: "Services Management",
    "home-faqs": "Homepage FAQs Accordion",
    gallery: "Photo Gallery Management",
    partners: "Strategic Partners & Brand Logos",
    settings: "Settings & API",
  };

  // ── Render Authenticated Dashboard ──
  return (
    <div
      data-lenis-prevent="true"
      className="h-screen w-full overflow-hidden bg-white text-[#0F172A] flex flex-row font-manrope selection:bg-[#0B1F3B] selection:text-white relative"
    >
      {/* Subtle clean ambient lighting */}
      <div className="fixed top-0 left-1/4 w-[40rem] h-[40rem] bg-[#0B1F3B]/[0.02] rounded-full blur-3xl pointer-events-none z-0" />
      <div className="fixed bottom-0 right-10 w-[30rem] h-[30rem] bg-[#d3d663]/[0.03] rounded-full blur-3xl pointer-events-none z-0" />

      {/* Toast Notification */}
      <AdminToast toast={toast} />

      {/* Sidebar - Locked on Left, Full Height */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        unreadInquiriesCount={unreadInquiriesCount}
        teamCount={(team || []).length}
        testimonialsCount={(testimonials || []).length}
        blogsCount={(blogs || []).length}
        servicesCount={Object.keys(services || {}).length}
        homeServicesCount={(homeServices || []).length}
        homeFaqsCount={(homeFaqs || []).length}
        galleryCount={(gallery || []).length}
        partnersCount={(partners || []).length}
        handleLogout={handleLogout}
      />

      {/* Right Column: Fixed Header + Scrollable Main Content */}
      <div
        data-lenis-prevent="true"
        className="flex-1 flex flex-col h-full min-w-0 min-h-0 overflow-hidden relative z-10"
      >
        {/* Top Header - Locked at Top */}
        <AdminHeader
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          handleLogout={handleLogout}
          unreadCount={unreadInquiriesCount}
          activeTabTitle={tabTitles[activeTab] || "Dashboard"}
          setActiveTab={setActiveTab}
        />

        {/* Main Content Body - The ONLY scrollable area */}
        <main
          data-lenis-prevent="true"
          tabIndex={0}
          className="flex-1 min-h-0 overflow-y-auto p-3 sm:p-6 lg:p-8 overscroll-contain focus:outline-none admin-scroll bg-[#F4F7FB]"
        >
          <div className="max-w-7xl mx-auto w-full pb-16">
            {activeTab === "overview" && (
              <OverviewTab
                inquiries={inquiries}
                testimonials={testimonials}
                blogs={blogs}
                team={team}
                unreadInquiriesCount={unreadInquiriesCount}
                setActiveTab={setActiveTab}
                openAddBlogModal={openAddBlogModal}
                openAddTestimonialModal={openAddTestimonialModal}
                openAddTeamModal={openAddTeamModal}
              />
            )}

            {activeTab === "inquiries" && (
              <InquiriesTab
                inquiries={inquiries}
                updateInquiryStatus={updateInquiryStatus}
                deleteInquiry={deleteInquiry}
                showToast={showToast}
              />
            )}

            {(activeTab === "contact" || activeTab === "socials") && (
              <ContactTab
                contactInfo={contactInfo}
                updateContactInfo={updateContactInfo}
                socialLinks={socialLinks}
                updateSocialLinks={updateSocialLinks}
                showToast={showToast}
              />
            )}

            {activeTab === "founder" && (
              <FounderTab
                founder={founder}
                socialsList={socialLinks || []}
                updateFounder={updateFounder}
                setActiveTab={setActiveTab}
                showToast={showToast}
              />
            )}

            {activeTab === "team" && (
              <TeamTab
                team={team}
                openAddTeamModal={openAddTeamModal}
                openEditTeamModal={openEditTeamModal}
                deleteTeamMember={deleteTeamMember}
                showToast={showToast}
              />
            )}

            {activeTab === "testimonials" && (
              <TestimonialsTab
                testimonials={testimonials}
                openAddTestimonialModal={openAddTestimonialModal}
                openEditTestimonialModal={openEditTestimonialModal}
                deleteTestimonial={deleteTestimonial}
                showToast={showToast}
              />
            )}

            {activeTab === "blogs" && (
              <BlogsTab
                blogs={blogs}
                openAddBlogModal={openAddBlogModal}
                openEditBlogModal={openEditBlogModal}
                deleteBlog={deleteBlog}
                showToast={showToast}
              />
            )}

            {activeTab === "services" && (
              <ServicesTab
                services={services}
                updateService={updateService}
                showToast={showToast}
                homeServices={homeServices || []}
                updateHomeService={updateHomeService}
              />
            )}

            {activeTab === "home-faqs" && (
              <HomeFaqsTab
                homeFaqs={homeFaqs || []}
                updateHomeFaq={updateHomeFaq}
                addHomeFaq={addHomeFaq}
                deleteHomeFaq={deleteHomeFaq}
                showToast={showToast}
              />
            )}

            {activeTab === "gallery" && (
              <GalleryTab
                gallery={gallery}
                addGalleryItem={addGalleryItem}
                updateGalleryItem={updateGalleryItem}
                deleteGalleryItem={deleteGalleryItem}
                showToast={showToast}
              />
            )}

            {activeTab === "partners" && (
              <PartnersTab
                partners={partners || []}
                addPartner={addPartner}
                updatePartner={updatePartner}
                deletePartner={deletePartner}
                showToast={showToast}
              />
            )}

            {activeTab === "legal" && (
              <LegalTab
                legalPages={legalPages}
                contactInfo={contactInfo}
                updateLegalPage={updateLegalPage}
                updateLegalSection={updateLegalSection}
                addLegalSection={addLegalSection}
                deleteLegalSection={deleteLegalSection}
                showToast={showToast}
              />
            )}

            {activeTab === "settings" && (
              <SettingsTab
                updatePasscode={updatePasscode}
                exportBackup={exportBackup}
                importBackup={importBackup}
                resetToDefaults={resetToDefaults}
                showToast={showToast}
              />
            )}
          </div>
        </main>
      </div>

      {/* Modals */}
      <TeamModal
        isOpen={teamModalOpen}
        onClose={() => setTeamModalOpen(false)}
        editingMember={editingTeamMember}
        teamForm={teamForm}
        setTeamForm={setTeamForm}
        onSave={handleSaveTeamMember}
      />

      <TestimonialModal
        isOpen={testimonialModalOpen}
        onClose={() => setTestimonialModalOpen(false)}
        editingTestimonial={editingTestimonial}
        testimonialForm={testimonialForm}
        setTestimonialForm={setTestimonialForm}
        onSave={handleSaveTestimonial}
      />

      <BlogModal
        isOpen={blogModalOpen}
        onClose={() => setBlogModalOpen(false)}
        editingBlog={editingBlog}
        blogForm={blogForm}
        setBlogForm={setBlogForm}
        onSave={handleSaveBlog}
      />
    </div>
  );
}
