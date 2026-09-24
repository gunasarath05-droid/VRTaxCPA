"use client";

import React from "react";
import { FiCheckCircle, FiAlertCircle, FiCheck } from "react-icons/fi";

export interface ToastData {
  message: string;
  type: "success" | "error" | "info";
}

interface AdminToastProps {
  toast: ToastData | null;
}

export default function AdminToast({ toast }: AdminToastProps) {
  if (!toast) return null;

  return (
    <div className="fixed top-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-white/95 backdrop-blur-xl text-slate-800 border border-slate-200 shadow-[0_10px_30px_rgba(11,31,59,0.12)] text-xs font-bold font-figtree animate-in fade-in slide-in-from-top-4">
      {toast.type === "success" && (
        <FiCheckCircle className="text-emerald-600 shrink-0" size={16} />
      )}
      {toast.type === "error" && (
        <FiAlertCircle className="text-rose-600 shrink-0" size={16} />
      )}
      {toast.type === "info" && (
        <FiCheck className="text-[#0B1F3B] shrink-0" size={16} />
      )}
      <span>{toast.message}</span>
    </div>
  );
}
