"use client";

import React, { useState, useEffect } from "react";
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiClock,
  FiFileText,
  FiGlobe,
  FiExternalLink,
  FiCheck,
  FiX,
  FiSave,
  FiShare2,
} from "react-icons/fi";
import { FaLinkedinIn, FaInstagram, FaFacebookF, FaYelp } from "react-icons/fa";

interface ContactTabProps {
  contactInfo: any;
  updateContactInfo: (info: any) => void;
  socialLinks?: any[];
  updateSocialLinks?: (links: any[]) => void;
  showToast: (msg: string, type?: "success" | "error" | "info") => void;
}

export default function ContactTab({
  contactInfo,
  updateContactInfo,
  socialLinks = [],
  updateSocialLinks,
  showToast,
}: ContactTabProps) {
  // Contact Info State
  const [contactForm, setContactForm] = useState({
    officeTitle: "",
    address: "",
    phone: "",
    phoneRaw: "",
    email: "",
    hours: "",
    tagline: "",
    mapUrl: "",
  });

  // Social Links State
  const [socialsList, setSocialsList] = useState<any[]>([]);

  useEffect(() => {
    if (contactInfo) {
      setContactForm({
        officeTitle: contactInfo.officeTitle || "",
        address: contactInfo.address || "",
        phone: contactInfo.phone || "",
        phoneRaw: contactInfo.phoneRaw || "",
        email: contactInfo.email || "",
        hours: contactInfo.hours || "",
        tagline: contactInfo.tagline || "",
        mapUrl: contactInfo.mapUrl || "",
      });
    }
  }, [contactInfo]);

  useEffect(() => {
    if (socialLinks && socialLinks.length > 0) {
      setSocialsList(socialLinks);
    }
  }, [socialLinks]);

  // Social platform icon helper
  const getSocialIcon = (name: string) => {
    const lower = (name || "").toLowerCase();
    if (lower.includes("instagram")) return FaInstagram;
    if (lower.includes("facebook")) return FaFacebookF;
    if (lower.includes("linkedin")) return FaLinkedinIn;
    if (lower.includes("yelp")) return FaYelp;
    return FiShare2;
  };

  // Toggle social item active state
  const toggleSocialEnabled = (index: number) => {
    const updated = [...socialsList];
    const current = updated[index].enabled !== false;
    const nextState = !current;
    updated[index] = { ...updated[index], enabled: nextState };
    setSocialsList(updated);
    if (updateSocialLinks) {
      updateSocialLinks(updated);
      showToast(`${updated[index].name} set to ${nextState ? "Active" : "Inactive"} (Live site updated)`);
    }
  };

  // Update social URL
  const handleSocialUrlChange = (index: number, url: string) => {
    const updated = [...socialsList];
    updated[index] = { ...updated[index], url };
    setSocialsList(updated);
  };

  // Handle Save All
  const handleSaveAll = (e: React.FormEvent) => {
    e.preventDefault();
    updateContactInfo(contactForm);
    if (updateSocialLinks && socialsList.length > 0) {
      updateSocialLinks(socialsList);
    }
    showToast("Contact details & social media links saved successfully!");
  };

  const activeSocialCount = socialsList.filter((s) => s.enabled !== false).length;

  return (
    <form onSubmit={handleSaveAll} className="space-y-8 pb-12">
      {/* ── Section 1: Office & Credentials (Clean White SaaS Card) ── */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        {/* Card Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-5">
          <div>
            <span className="inline-flex items-center gap-2 text-[#1D61E7] text-xs font-bold font-figtree uppercase tracking-widest mb-1">
              <FiMapPin size={14} /> Main Office &amp; Contact Credentials
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-figtree tracking-tight">
              Primary Location Details
            </h3>
            <p className="text-slate-500 text-xs font-manrope mt-0.5">
              These details display in the public Header, Contact Us page, and Website Footer.
            </p>
          </div>
          <span className="self-start sm:self-auto px-3.5 py-1.5 rounded-full bg-blue-50 text-[#1D61E7] text-xs font-bold font-figtree border border-blue-100/80">
            Public Site Data
          </span>
        </div>

        {/* Inputs Grid (2 Columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          {/* Office Title */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 font-figtree tracking-wide flex items-center gap-1.5">
              <FiFileText size={13} className="text-[#1D61E7]" />
              <span>Office Title / Header</span>
            </label>
            <input
              type="text"
              value={contactForm.officeTitle}
              onChange={(e) =>
                setContactForm({ ...contactForm, officeTitle: e.target.value })
              }
              placeholder="VR Tax CPA LLC — Irving Office"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-800 text-xs sm:text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1D61E7]/20 focus:border-[#1D61E7] transition-all font-manrope shadow-2xs"
            />
          </div>

          {/* Physical Office Address */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 font-figtree tracking-wide flex items-center gap-1.5">
              <FiMapPin size={13} className="text-[#1D61E7]" />
              <span>Physical Office Address</span>
            </label>
            <input
              type="text"
              value={contactForm.address}
              onChange={(e) =>
                setContactForm({ ...contactForm, address: e.target.value })
              }
              placeholder="3035 Ivy Hill Lane, Irving, TX 75063"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-800 text-xs sm:text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1D61E7]/20 focus:border-[#1D61E7] transition-all font-manrope shadow-2xs"
            />
          </div>

          {/* Display Phone */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 font-figtree tracking-wide flex items-center gap-1.5">
              <FiPhone size={13} className="text-[#1D61E7]" />
              <span>Display Phone Number</span>
            </label>
            <input
              type="text"
              value={contactForm.phone}
              onChange={(e) =>
                setContactForm({ ...contactForm, phone: e.target.value })
              }
              placeholder="(469) 471-6580"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-800 text-xs sm:text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1D61E7]/20 focus:border-[#1D61E7] transition-all font-manrope shadow-2xs"
            />
          </div>

          {/* Dialing Phone (tel: href) */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 font-figtree tracking-wide flex items-center gap-1.5">
              <FiPhone size={13} className="text-[#1D61E7]" />
              <span>Dialing Phone Format (tel: href)</span>
            </label>
            <input
              type="text"
              value={contactForm.phoneRaw}
              onChange={(e) =>
                setContactForm({ ...contactForm, phoneRaw: e.target.value })
              }
              placeholder="+14694716580"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-800 text-xs sm:text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1D61E7]/20 focus:border-[#1D61E7] transition-all font-manrope shadow-2xs"
            />
          </div>

          {/* Official Email */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 font-figtree tracking-wide flex items-center gap-1.5">
              <FiMail size={13} className="text-[#1D61E7]" />
              <span>Official Email ID</span>
            </label>
            <input
              type="email"
              value={contactForm.email}
              onChange={(e) =>
                setContactForm({ ...contactForm, email: e.target.value })
              }
              placeholder="info@vrtaxcpa.com"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-800 text-xs sm:text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1D61E7]/20 focus:border-[#1D61E7] transition-all font-manrope shadow-2xs"
            />
          </div>

          {/* Operating Hours */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 font-figtree tracking-wide flex items-center gap-1.5">
              <FiClock size={13} className="text-[#1D61E7]" />
              <span>Business Operating Hours</span>
            </label>
            <input
              type="text"
              value={contactForm.hours}
              onChange={(e) =>
                setContactForm({ ...contactForm, hours: e.target.value })
              }
              placeholder="Mon–Fri: 9:00 AM – 5:30 PM CST"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-800 text-xs sm:text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1D61E7]/20 focus:border-[#1D61E7] transition-all font-manrope shadow-2xs"
            />
          </div>

          {/* Brand Tagline (Spans 2 columns) */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-700 mb-1.5 font-figtree tracking-wide flex items-center gap-1.5">
              <FiFileText size={13} className="text-[#1D61E7]" />
              <span>Brand Tagline (Shown in Footer &amp; Office Card)</span>
            </label>
            <input
              type="text"
              value={contactForm.tagline}
              onChange={(e) =>
                setContactForm({ ...contactForm, tagline: e.target.value })
              }
              placeholder="Reliable partners in your financial growth."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-800 text-xs sm:text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1D61E7]/20 focus:border-[#1D61E7] transition-all font-manrope shadow-2xs"
            />
          </div>
        </div>
      </div>

      {/* <hr className="border-slate-200" /> */}

      {/* ── Section 2: Google Maps Embed ── */}
      {/* <div className="space-y-4">

        <div>
          <h3 className="text-lg font-extrabold text-[#0B1F3B] font-figtree">
            Google Maps Location Embed
          </h3>
          <p className="text-xs text-slate-500 font-manrope mt-0.5">
            Embed an interactive Google Maps iframe on the Contact Office page for visitor directions.
          </p>
        </div>


        <div className="rounded-[28px] border-[3px] border-[#0B1F3B] p-6 sm:p-7 bg-white shadow-xs space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#0B1F3B] uppercase tracking-wider mb-2 font-figtree flex items-center gap-1.5">
              <FiGlobe size={14} /> Embed URL (iframe src)
            </label>
            <input
              type="text"
              value={contactForm.mapUrl}
              onChange={(e) =>
                setContactForm({ ...contactForm, mapUrl: e.target.value })
              }
              placeholder="https://maps.google.com/maps?q=...&output=embed"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B1F3B]/20 focus:border-[#0B1F3B] transition-all font-mono shadow-2xs"
            />
          </div>

          {contactForm.mapUrl ? (
            <div className="space-y-2 pt-1">
              <span className="text-xs font-bold text-[#0B1F3B] font-figtree block">
                Live Map Preview:
              </span>
              <div className="h-64 sm:h-72 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-inner">
                <iframe
                  src={contactForm.mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  title="Google Maps Location Preview"
                  loading="lazy"
                />
              </div>
            </div>
          ) : (
            <div className="p-5 rounded-2xl bg-slate-50 border border-dashed border-slate-300 text-center text-xs text-slate-500">
              No Google Maps embed URL provided yet. Enter an iframe URL above to see the live preview.
            </div>
          )}
        </div>
      </div> */}

      <hr className="border-slate-200" />

      {/* ── Section 3: Social Media Links & Visibility ── */}
      <div className="space-y-4" id="social-channels">
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 font-figtree">
              Social Media Channels &amp; Visibility
            </h3>
            <p className="text-xs text-slate-500 font-manrope mt-0.5">
              Configure external profile links and toggle channel visibility across the Website Header, Footer, and Founder Card.
            </p>
          </div>

          <span className="px-3.5 py-1.5 rounded-full bg-blue-50 text-[#1D61E7] border border-blue-100 text-xs font-bold font-figtree self-start sm:self-auto shadow-2xs">
            {activeSocialCount} Active Channels
          </span>
        </div>

        {/* Tip Bar */}
        <div className="p-3 sm:py-2.5 sm:px-4 bg-[#EBF2FE] border border-blue-100 text-blue-900 rounded-2xl text-xs flex flex-wrap items-center gap-1.5 font-manrope leading-relaxed w-fit">
          <span className="font-bold text-[#1D61E7]">Highlight Tip:</span>
          <span className="text-slate-700">
            Click the <strong>Active / Inactive</strong> button on each platform card to show or hide the icon from the website. Test links using the launch icon.
          </span>
        </div>

        {/* 4-Column Grid of Social Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-2">
          {socialsList.map((soc, idx) => {
            const IconComp = getSocialIcon(soc.name);
            const isActive = soc.enabled !== false;

            return (
              <div
                key={soc.id || idx}
                className="rounded-2xl overflow-hidden border border-slate-100 shadow-xs hover:shadow-md transition-shadow bg-white flex flex-col"
              >
                {/* Clean SaaS Header */}
                <div className="bg-slate-50/80 border-b border-slate-100 px-4 py-3 flex items-center justify-between text-slate-800">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs ${
                        isActive ? "bg-[#EBF2FE] text-[#1D61E7]" : "bg-slate-200/80 text-slate-500"
                      }`}
                    >
                      <IconComp size={14} />
                    </div>
                    <span className="font-extrabold text-sm font-figtree tracking-wide text-slate-900">
                      {soc.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Active/Inactive Toggle */}
                    <button
                      type="button"
                      onClick={() => toggleSocialEnabled(idx)}
                      className={`flex items-center gap-1 text-xs font-bold cursor-pointer transition-colors font-figtree px-2.5 py-0.5 rounded-full ${
                        isActive
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200/80"
                          : "bg-slate-100 text-slate-500 border border-slate-200"
                      }`}
                    >
                      {isActive ? (
                        <>
                          <FiCheck size={11} className="stroke-[2.5]" />
                          <span>Active</span>
                        </>
                      ) : (
                        <>
                          <FiX size={11} className="stroke-[2.5]" />
                          <span>Inactive</span>
                        </>
                      )}
                    </button>

                    {/* External Link Test Button */}
                    {soc.url && (
                      <a
                        href={soc.url}
                        target="_blank"
                        rel="noreferrer"
                        title={`Open ${soc.name} profile in new tab`}
                        className="text-slate-400 hover:text-[#1D61E7] transition-colors p-1"
                      >
                        <FiExternalLink size={13} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 flex-1 space-y-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 font-figtree">
                      Profile Target URL
                    </label>
                    <input
                      type="url"
                      value={soc.url || ""}
                      onChange={(e) => handleSocialUrlChange(idx, e.target.value)}
                      placeholder={`https://${soc.name?.toLowerCase()}.com/...`}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200/80 rounded-xl text-slate-800 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1D61E7]/20 focus:border-[#1D61E7] transition-all font-manrope shadow-2xs"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Single Save Button ── */}
      <div className="pt-6 flex justify-end border-t border-slate-100">
        <button
          type="submit"
          className="px-8 py-3 rounded-full bg-[#1D61E7] hover:bg-[#1554C0] active:scale-[0.98] text-white font-bold text-sm font-figtree transition-all shadow-md shadow-blue-500/20 cursor-pointer flex items-center gap-2"
        >
          <FiSave size={16} />
          <span>Save Contact &amp; Social Details</span>
        </button>
      </div>
    </form>
  );
}
