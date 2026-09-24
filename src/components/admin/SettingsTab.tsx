"use client";

import React, { useState } from "react";
import { FiKey, FiDownload, FiUpload, FiRefreshCw } from "react-icons/fi";

interface SettingsTabProps {
  updatePasscode: (code: string) => void;
  exportBackup: () => void;
  importBackup: (json: any) => boolean;
  resetToDefaults: () => void;
  showToast: (msg: string, type?: "success" | "error" | "info") => void;
}

export default function SettingsTab({
  updatePasscode,
  exportBackup,
  importBackup,
  resetToDefaults,
  showToast,
}: SettingsTabProps) {
  const [newPasscode, setNewPasscode] = useState("");
  const [apiUrlSetting, setApiUrlSetting] = useState("");

  const handleChangePasscode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPasscode.trim()) return;
    updatePasscode(newPasscode.trim());
    setNewPasscode("");
    showToast("Admin password updated successfully!");
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        const ok = importBackup(json);
        if (ok) {
          showToast("Data backup restored successfully!", "success");
        } else {
          showToast("Failed to restore backup file", "error");
        }
      } catch (err) {
        showToast("Invalid JSON backup file", "error");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleResetData = () => {
    if (
      window.confirm(
        "Are you sure you want to reset all content back to factory default values? Any changes will be lost unless you exported a backup."
      )
    ) {
      resetToDefaults();
      showToast("Reset all site data to default values.", "info");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-[#0B1F3B] font-figtree tracking-tight">
          Settings &amp; Backup
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm mt-1 font-manrope">
          Manage admin security, JSON content backups, and future backend API connections.
        </p>
      </div>

      {/* Passcode Protection */}
      <div className="bg-white border border-slate-100 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-xs">
        <h3 className="text-base font-extrabold text-[#0B1F3B] font-figtree mb-2 flex items-center gap-2">
          <FiKey className="text-[#1D61E7]" /> Change Admin Password
        </h3>
        <p className="text-xs text-slate-500 mb-4 font-manrope">
          Set a custom password to secure access to this Admin Portal (Admin username: <strong className="text-[#0B1F3B] font-bold">admin</strong>).
        </p>

        <form
          onSubmit={handleChangePasscode}
          className="flex flex-col sm:flex-row gap-3 max-w-lg"
        >
          <input
            type="password"
            value={newPasscode}
            onChange={(e) => setNewPasscode(e.target.value)}
            placeholder="Enter new password (e.g. VRtaxcpa@2026)"
            className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200/80 rounded-2xl text-slate-800 text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1D61E7]/20 focus:border-[#1D61E7] transition-all shadow-2xs"
          />
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#1D61E7] hover:bg-[#1554C0] active:scale-[0.98] text-white font-bold text-xs sm:text-sm font-figtree transition-all cursor-pointer shadow-md shadow-blue-500/20 text-center justify-center"
          >
            Update Password
          </button>
        </form>
      </div>

      {/* Backup & Restore */}
      <div className="bg-white border border-slate-100 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-xs">
        <h3 className="text-base font-extrabold text-[#0B1F3B] font-figtree mb-2 flex items-center gap-2">
          <FiDownload className="text-emerald-600" /> Backup &amp; Restore Data (JSON)
        </h3>
        <p className="text-xs text-slate-500 mb-5 font-manrope">
          Export all your edited website content into a single JSON file, or restore a previous backup.
        </p>

        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          <button
            onClick={exportBackup}
            className="flex-1 sm:flex-initial justify-center px-4 sm:px-5 py-2.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold font-figtree flex items-center gap-2 transition-all cursor-pointer shadow-xs whitespace-nowrap"
          >
            <FiDownload size={14} className="text-[#1D61E7]" /> Export Backup (.json)
          </button>

          <label className="flex-1 sm:flex-initial justify-center px-4 sm:px-5 py-2.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold font-figtree flex items-center gap-2 transition-all cursor-pointer shadow-xs whitespace-nowrap">
            <FiUpload size={14} className="text-[#1D61E7]" /> Import Backup (.json)
            <input
              type="file"
              accept=".json"
              onChange={handleImportFile}
              className="hidden"
            />
          </label>

          <button
            onClick={handleResetData}
            className="w-full sm:w-auto justify-center px-4 sm:px-5 py-2.5 rounded-full bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 text-xs font-bold font-figtree flex items-center gap-1.5 transition-all cursor-pointer sm:ml-auto shadow-xs"
          >
            <FiRefreshCw size={13} /> Reset to Defaults
          </button>
        </div>
      </div>

      {/* Future Backend API Ready */}
      <div className="bg-[#0B1F3B] rounded-2xl sm:rounded-3xl p-4 sm:p-8 text-white shadow-md relative overflow-hidden border border-slate-800">
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#1D61E7]/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h3 className="text-base font-extrabold text-white font-figtree">
              Future Backend Architecture (Plug &amp; Play Ready)
            </h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed max-w-2xl mb-4 font-manrope">
            This frontend has been built with an isolated API service layer in{" "}
            <code className="text-blue-300 bg-white/10 border border-white/15 px-2 py-0.5 rounded font-mono">
              src/services/adminService.js
            </code>
            . When you build a backend server (Node.js, Express, Python, or Next.js Route Handlers), all endpoints match standard RESTful conventions:
          </p>

          <div className="grid sm:grid-cols-2 gap-2 text-[11px] font-mono bg-black/30 p-4 rounded-2xl border border-white/10 text-slate-200 mb-5">
            <div>GET /api/site-data</div>
            <div>PUT /api/contact-info</div>
            <div>POST /api/inquiries</div>
            <div>PUT /api/founder</div>
            <div>POST /api/testimonials</div>
            <div>POST /api/blogs</div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 max-w-lg">
            <input
              type="url"
              value={apiUrlSetting}
              onChange={(e) => setApiUrlSetting(e.target.value)}
              placeholder="https://api.vrtaxcpa.com/api"
              className="flex-1 px-4 py-2.5 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-[#1D61E7]"
            />
            <button
              type="button"
              onClick={() =>
                showToast("Backend endpoint URL saved for future activation.")
              }
              className="px-6 py-2.5 rounded-full bg-[#1D61E7] hover:bg-[#1554C0] active:scale-[0.98] text-white font-bold text-xs font-figtree transition-all cursor-pointer shadow-md shadow-blue-500/20"
            >
              Save URL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
