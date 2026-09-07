"use client";

import React from "react";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export interface ButtonProps {
  href?: string;
  children?: React.ReactNode;
  text?: React.ReactNode;
  variant?: "dark" | "accent" | "white" | "outline";
  size?: "sm" | "md" | "lg";
  showArrow?: boolean;
  icon?: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLElement>;
  disabled?: boolean;
  target?: string;
  rel?: string;
  ariaLabel?: string;
  [key: string]: any;
}

export default function Button({
  href,
  children,
  text,
  variant = "dark",
  size = "md",
  showArrow = true,
  icon,
  className = "",
  type = "button",
  onClick,
  disabled = false,
  target,
  rel,
  ariaLabel,
  ...props
}: ButtonProps) {
  const content = text || children;

  // Variants config
  const variantStyles = {
    dark: {
      btn: "bg-[#0B1F3B] text-white shadow-md active:scale-95",
      wipe: "bg-[#d3d663]",
      textDefault: "text-white",
      textHover: "text-[#0B1F3B]",
      arrowCircle: "bg-white text-[#0B1F3B]",
      arrowIcon: "text-[#0B1F3B]",
    },
    accent: {
      btn: "bg-[#d3d663] text-[#0B1F3B] shadow-[0_4px_20px_rgba(211,214,99,0.3)] active:scale-95",
      wipe: "bg-[#0B1F3B]",
      textDefault: "text-[#0B1F3B]",
      textHover: "text-white",
      arrowCircle: "bg-[#0B1F3B] text-white group-hover/btn:bg-white group-hover/btn:text-[#0B1F3B]",
      arrowIcon: "text-white group-hover/btn:text-[#0B1F3B]",
    },
    white: {
      btn: "bg-white text-[#0B1F3B] border border-slate-200 shadow-sm active:scale-95 hover:border-slate-300",
      wipe: "bg-[#d3d663]",
      textDefault: "text-[#0B1F3B]",
      textHover: "text-[#0B1F3B]",
      arrowCircle: "bg-[#0B1F3B]/8 text-[#0B1F3B] group-hover/btn:bg-white",
      arrowIcon: "text-[#0B1F3B]",
    },
    outline: {
      btn: "bg-transparent text-[#0B1F3B] border border-[#0B1F3B]/30 shadow-xs active:scale-95",
      wipe: "bg-[#0B1F3B]",
      textDefault: "text-[#0B1F3B]",
      textHover: "text-white",
      arrowCircle: "bg-[#0B1F3B]/10 text-[#0B1F3B] group-hover/btn:bg-white group-hover/btn:text-[#0B1F3B]",
      arrowIcon: "text-[#0B1F3B] group-hover/btn:text-[#0B1F3B]",
    },
  };

  const v = variantStyles[variant] || variantStyles.dark;

  // Size config
  const sizeStyles = {
    sm: {
      btn: showArrow
        ? "pl-4 sm:pl-5 pr-2 py-2 gap-2.5 text-xs font-bold"
        : "px-4 py-2 text-xs font-bold",
      textHeight: "h-[18px] leading-[18px]",
      circle: "w-5 h-5 sm:w-6 sm:h-6",
      iconSize: "w-3 h-3 stroke-[2.5]",
    },
    md: {
      btn: showArrow
        ? "pl-5 sm:pl-6 pr-2.5 py-2.5 gap-3 sm:gap-3.5 text-xs sm:text-sm font-bold"
        : "px-6 py-2.5 text-xs sm:text-sm font-bold",
      textHeight: "h-[20px] leading-[20px]",
      circle: "w-6 h-6 sm:w-7 sm:h-7",
      iconSize: "w-3.5 h-3.5 stroke-[2.5]",
    },
    lg: {
      btn: showArrow
        ? "pl-7 sm:pl-8 pr-3 py-3.5 sm:py-4 gap-3.5 sm:gap-4 text-xs sm:text-sm font-extrabold uppercase tracking-wider"
        : "px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-extrabold uppercase tracking-wider",
      textHeight: "h-[22px] leading-[22px]",
      circle: "w-7 h-7 sm:w-8 sm:h-8",
      iconSize: "w-4 h-4 stroke-[2.5]",
    },
  };

  const s = sizeStyles[size] || sizeStyles.md;

  const innerContent = (
    <>
      {/* Fluid Background Wipe */}
      <span
        className={`absolute inset-0 ${v.wipe} -translate-x-[102%] group-hover/btn:translate-x-0 rounded-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] pointer-events-none`}
        aria-hidden="true"
      />

      {/* Ultra-Smooth Kinetic Rolling Text */}
      <span className={`relative z-10 block overflow-hidden ${s.textHeight}`}>
        <span
          className={`block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover/btn:translate-y-full ${v.textDefault} whitespace-nowrap`}
        >
          {content}
        </span>
        <span
          className={`absolute top-0 left-0 block -translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${v.textHover} whitespace-nowrap`}
        >
          {content}
        </span>
      </span>

      {/* Kinetic Arrow / Icon */}
      {showArrow && (
        <span
          className={`relative z-10 ${s.circle} rounded-full ${v.arrowCircle} flex items-center justify-center overflow-hidden transition-colors duration-400 ease-out flex-shrink-0`}
          aria-hidden="true"
        >
          <span className="transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover/btn:translate-x-[150%] absolute flex items-center justify-center">
            {icon || <FiArrowRight className={s.iconSize} />}
          </span>
          <span
            className={`transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] -translate-x-[150%] group-hover/btn:translate-x-0 absolute flex items-center justify-center ${v.arrowIcon}`}
          >
            {icon || <FiArrowRight className={s.iconSize} />}
          </span>
        </span>
      )}
    </>
  );

  const baseClassName = `group/btn relative overflow-hidden inline-flex items-center justify-center rounded-full font-figtree transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] select-none cursor-pointer ${v.btn} ${s.btn} ${className}`;

  if (href) {
    return (
      <Link
        href={href}
        className={baseClassName}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        onClick={onClick}
        {...props}
      >
        {innerContent}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClassName}
      aria-label={ariaLabel}
      {...props}
    >
      {innerContent}
    </button>
  );
}
