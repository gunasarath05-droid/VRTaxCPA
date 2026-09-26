"use client";

import React, { useState } from "react";
import {
  FiSearch,
  FiEdit,
  FiTrash2,
  FiPlus,
  FiHelpCircle,
  FiX,
  FiSave,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";

interface HomeFaqItem {
  id: string;
  q: string;
  a: string;
}

interface HomeFaqsTabProps {
  homeFaqs: HomeFaqItem[];
  updateHomeFaq: (id: string, fields: any) => any;
  addHomeFaq: (item: any) => any;
  deleteHomeFaq: (id: string) => void;
  showToast: (msg: string, type?: "success" | "error" | "info") => void;
}

export default function HomeFaqsTab({
  homeFaqs,
  updateHomeFaq,
  addHomeFaq,
  deleteHomeFaq,
  showToast,
}: HomeFaqsTabProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const [form, setForm] = useState({
    q: "",
    a: "",
  });

  const list = homeFaqs || [];

  const filteredList = list.filter((item) => {
    const q = searchQuery.toLowerCase();
    return (
      item.q?.toLowerCase().includes(q) ||
      item.a?.toLowerCase().includes(q)
    );
  });

  const openAddModal = () => {
    setIsEditing(false);
    setEditingId(null);
    setForm({ q: "", a: "" });
    setModalOpen(true);
  };

  const openEditModal = (item: HomeFaqItem) => {
    setIsEditing(true);
    setEditingId(item.id);
    setForm({
      q: item.q || "",
      a: item.a || "",
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.q.trim() || !form.a.trim()) {
      showToast("Please enter both question and answer.", "error");
      return;
    }

    if (isEditing && editingId) {
      updateHomeFaq(editingId, { q: form.q.trim(), a: form.a.trim() });
      showToast("FAQ updated successfully!", "success");
    } else {
      addHomeFaq({ q: form.q.trim(), a: form.a.trim() });
      showToast("New FAQ added to homepage!", "success");
    }

    closeModal();
  };

  const handleDelete = (item: HomeFaqItem) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this FAQ: "${item.q.substring(0, 50)}..."?`
    );
    if (!confirmDelete) return;

    deleteHomeFaq(item.id);
    showToast("FAQ removed from homepage", "info");
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-6">
      {/* Informative Header Banner */}
      <div className="bg-gradient-to-r from-blue-50 via-indigo-50/40 to-white border border-blue-200/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0B1F3B] text-[#d3d663] flex items-center justify-center shrink-0 shadow-xs mt-0.5">
            <FiHelpCircle size={20} />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold font-figtree text-slate-900">
              Homepage FAQs
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-manrope mt-0.5">
              Manage the frequently asked questions displayed in the accordion on the Home page.
            </p>
          </div>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2.5 rounded-xl bg-[#0B1F3B] hover:bg-[#1D61E7] text-white text-xs sm:text-sm font-bold font-figtree transition-all shadow-xs hover:shadow-md flex items-center gap-2 cursor-pointer shrink-0"
        >
          <FiPlus size={16} />
          <span>Add FAQ</span>
        </button>
      </div>

      {/* Search Bar & Counter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search FAQs by question or answer keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-manrope placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1D61E7] focus:border-transparent transition-all shadow-xs"
          />
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
        </div>

        <span className="text-xs font-bold text-slate-500 font-figtree">
          Total FAQs: <strong className="text-slate-900">{list.length}</strong>
        </span>
      </div>

      {/* FAQs List */}
      <div className="space-y-3.5">
        {filteredList.map((item, index) => {
          const isExpanded = expandedId === item.id;

          return (
            <div
              key={item.id || index}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all overflow-hidden"
            >
              {/* Question Row */}
              <div className="p-4 sm:p-5 flex items-start justify-between gap-4">
                <div
                  onClick={() => toggleExpand(item.id)}
                  className="flex items-start gap-3 flex-1 cursor-pointer select-none"
                >
                  <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 font-mono">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 font-figtree leading-snug hover:text-[#1D61E7] transition-colors">
                      {item.q}
                    </h3>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => openEditModal(item)}
                    className="p-2 rounded-lg text-slate-500 hover:text-[#1D61E7] hover:bg-blue-50 transition-colors cursor-pointer"
                    title="Edit question & answer"
                  >
                    <FiEdit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
                    className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    title="Delete FAQ"
                  >
                    <FiTrash2 size={16} />
                  </button>
                  <button
                    onClick={() => toggleExpand(item.id)}
                    className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer ml-1"
                    title={isExpanded ? "Collapse" : "Expand answer preview"}
                  >
                    {isExpanded ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
                  </button>
                </div>
              </div>

              {/* Answer Row (always shown on desktop or expandable) */}
              <div
                className={`px-4 sm:px-5 pb-5 pt-1 border-t border-slate-100 ${
                  isExpanded ? "block" : "hidden sm:block"
                }`}
              >
                <div className="pl-10 text-xs sm:text-sm text-slate-600 font-manrope leading-relaxed">
                  {item.a}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredList.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200">
          <p className="text-sm text-slate-500 font-manrope">No FAQs found matching your query.</p>
        </div>
      )}

      {/* Edit / Add Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs">
          <div className="relative max-w-xl w-full bg-white rounded-3xl border border-slate-200 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/60">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#0B1F3B] text-[#d3d663] flex items-center justify-center font-bold text-xs">
                  <FiHelpCircle size={16} />
                </div>
                <h3 className="text-base font-bold font-figtree text-slate-900">
                  {isEditing ? "Edit Homepage FAQ" : "Add New Homepage FAQ"}
                </h3>
              </div>
              <button
                onClick={closeModal}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
              <div>
                <label className="block text-xs font-bold font-figtree text-slate-700 uppercase tracking-wider mb-1.5">
                  Question (Prompt)
                </label>
                <input
                  type="text"
                  value={form.q}
                  onChange={(e) => setForm({ ...form, q: e.target.value })}
                  placeholder="e.g. What types of businesses do you work with?"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-figtree font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1D61E7]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold font-figtree text-slate-700 uppercase tracking-wider mb-1.5">
                  Answer (Detailed Explanation)
                </label>
                <textarea
                  rows={6}
                  value={form.a}
                  onChange={(e) => setForm({ ...form, a: e.target.value })}
                  placeholder="Provide a clear, authoritative and helpful answer..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-manrope text-slate-700 leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#1D61E7]"
                  required
                />
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded-xl text-xs font-bold font-figtree text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0B1F3B] hover:bg-[#1D61E7] text-white text-xs font-bold font-figtree transition-all shadow-xs hover:shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <FiSave size={14} />
                  <span>{isEditing ? "Save Changes" : "Add FAQ"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
