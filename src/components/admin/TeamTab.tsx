"use client";

import React from "react";
import { FiPlus, FiEdit, FiTrash2, FiUsers } from "react-icons/fi";

interface TeamTabProps {
  team: any[];
  openAddTeamModal: () => void;
  openEditTeamModal: (member: any) => void;
  deleteTeamMember: (id: string) => void;
  showToast: (msg: string, type?: "success" | "error" | "info") => void;
}

export default function TeamTab({
  team,
  openAddTeamModal,
  openEditTeamModal,
  deleteTeamMember,
  showToast,
}: TeamTabProps) {
  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-end">
        <button
          onClick={openAddTeamModal}
          className="px-6 py-2.5 rounded-full bg-[#1D61E7] hover:bg-[#1554C0] active:scale-[0.98] text-white font-bold text-sm font-figtree transition-all flex items-center gap-2 self-start sm:self-auto cursor-pointer shadow-md shadow-blue-500/20"
        >
          <FiPlus size={16} />
          <span>Add Member</span>
        </button>
      </div>

      {/* Empty State */}
      {!team || team.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-3xl p-12 text-center flex flex-col items-center justify-center space-y-3 shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#1D61E7] flex items-center justify-center">
            <FiUsers size={28} />
          </div>
          <h4 className="text-base font-bold text-slate-900 font-figtree">
            No team members added yet
          </h4>
          <p className="text-xs text-slate-500 max-w-sm font-manrope">
            Add your leadership and CPA advisory team members to showcase them on your website.
          </p>
          <button
            onClick={openAddTeamModal}
            className="mt-2 px-5 py-2 rounded-full bg-[#1D61E7] hover:bg-[#1554C0] text-white text-xs font-bold font-figtree cursor-pointer transition-all shadow-md shadow-blue-500/20"
          >
            Add First Member
          </button>
        </div>
      ) : (
        /* Team Cards Grid matching User Reference Exactly */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {(team || []).map((m: any) => (
            <div
              key={m.id}
              className="relative h-[200px] sm:h-[212px] rounded-3xl overflow-hidden border border-slate-100 shadow-xs hover:shadow-md transition-all duration-300 bg-white flex flex-col group"
            >
              {/* Top Section (~52% height) */}
              <div className="h-[52%] bg-slate-50/80 border-b border-slate-100 flex flex-col justify-center pl-[152px] sm:pl-[172px] pr-5">
                <h4 className="font-extrabold text-slate-900 text-lg sm:text-xl font-figtree leading-tight truncate">
                  {m.name}
                </h4>
                <p className="text-xs sm:text-sm text-[#1D61E7] font-semibold font-manrope mt-1 truncate">
                  {m.role}
                </p>
              </div>

              {/* Bottom White Section (~48% height) */}
              <div className="h-[48%] bg-white flex items-center pl-[152px] sm:pl-[172px] pr-5">
                <div className="flex items-center gap-6 sm:gap-8">
                  <button
                    onClick={() => openEditTeamModal(m)}
                    className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-[#1D61E7] cursor-pointer transition-colors font-figtree"
                  >
                    <FiEdit size={16} className="shrink-0 stroke-[2.2]" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => {
                      if (window.confirm(`Delete ${m.name}?`)) {
                        deleteTeamMember(m.id);
                        showToast(`Deleted ${m.name}`);
                      }
                    }}
                    className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-500 hover:text-rose-600 cursor-pointer transition-colors font-figtree"
                  >
                    <FiTrash2 size={16} className="shrink-0 stroke-[2.2]" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>

              {/* Overlapping Avatar spanning both sections */}
              <div className="absolute left-4 sm:left-5 top-4 sm:top-5 bottom-4 sm:bottom-5 w-[118px] sm:w-[132px] rounded-[22px] overflow-hidden shadow-sm border border-slate-200/80 bg-slate-100 z-10">
                {m.image ? (
                  <img
                    src={m.image}
                    alt={m.name}
                    className="w-full h-full object-cover object-center select-none"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80";
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-blue-50 text-[#1D61E7] font-black text-3xl font-figtree">
                    {m.name?.charAt(0) || "U"}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


