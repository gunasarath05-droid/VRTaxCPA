"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import loginImg from "@/assets/images/Login.png";
import logo from "@/assets/images/Logo1.png";
import Button from "@/components/Button";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiAlertCircle,
  FiArrowLeft,
} from "react-icons/fi";

interface AdminLoginProps {
  usernameInput: string;
  setUsernameInput: (val: string) => void;
  passcodeInput: string;
  setPasscodeInput: (val: string) => void;
  showPassword: boolean;
  setShowPassword: (val: boolean) => void;
  authError: string;
  handleLogin: (e: React.FormEvent) => void;
}

export default function AdminLogin({
  usernameInput,
  setUsernameInput,
  passcodeInput,
  setPasscodeInput,
  showPassword,
  setShowPassword,
  authError,
  handleLogin,
}: AdminLoginProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-3 sm:p-6 md:p-8 bg-white relative overflow-hidden font-manrope">

      {/* Login Card Container */}
      <div className="w-full max-w-5xl rounded-3xl sm:rounded-[2.5rem] bg-gray-50/90 backdrop-blur-2xl border border-slate-200/90 shadow-2xl shadow-[#0B1F3B]/8 relative overflow-hidden flex flex-col z-10">
        <div className="w-full flex flex-col lg:flex-row items-stretch min-h-[560px] lg:min-h-[620px]">
          {/* Left Column: Login Form */}
          <div className="w-full lg:w-1/2 px-6 sm:px-12 md:px-16 py-10 sm:py-14 flex flex-col justify-center">
            <div className="max-w-[360px] mx-auto w-full">
              {/* Brand Portal Badge */}
              <div className="inline-flex items-center gap-2 text-[#0B1F3B] text-[11px] font-bold font-figtree uppercase tracking-wider mb-4">
                <span>Admin Portal</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3B] font-figtree tracking-tight mb-2">
                Welcome Back!
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-manrope mb-7 sm:mb-8 leading-relaxed">
                Sign in to manage inquiries, updates, and website content.
              </p>

              <form onSubmit={handleLogin} className="space-y-4">
                {/* Username */}
                <div>
                  <label className="block text-xs font-bold text-[#0B1F3B] mb-1.5 font-figtree tracking-wide uppercase">
                    Username
                  </label>
                  <div className="relative flex items-center rounded-full border border-slate-200 bg-slate-50/70 focus-within:border-[#0B1F3B] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#0B1F3B]/15 transition-all shadow-xs px-4 py-2.5 sm:py-3 group">
                    <FiMail className="text-slate-400 group-focus-within:text-[#0B1F3B] text-base shrink-0 mr-2.5 transition-colors" />
                    <input
                      type="text"
                      value={usernameInput}
                      onChange={(e) => setUsernameInput(e.target.value)}
                      placeholder="Enter your username"
                      autoFocus
                      className="w-full bg-transparent text-sm text-[#0B1F3B] placeholder-slate-400 focus:outline-none font-medium font-manrope"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-xs font-bold text-[#0B1F3B] mb-1.5 font-figtree tracking-wide uppercase">
                    Password
                  </label>
                  <div className="relative flex items-center rounded-full border border-slate-200 bg-slate-50/70 focus-within:border-[#0B1F3B] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#0B1F3B]/15 transition-all shadow-xs px-4 py-2.5 sm:py-3 group">
                    <FiLock className="text-slate-400 group-focus-within:text-[#0B1F3B] text-base shrink-0 mr-2.5 transition-colors" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={passcodeInput}
                      onChange={(e) => setPasscodeInput(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full bg-transparent text-sm text-[#0B1F3B] placeholder-slate-400 focus:outline-none font-medium font-manrope pr-7"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 text-slate-400 hover:text-[#0B1F3B] cursor-pointer transition-colors p-1"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Error Message */}
                {authError && (
                  <div className="flex items-center gap-2 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-medium">
                    <FiAlertCircle className="shrink-0 text-rose-500" size={15} />
                    <span>{authError}</span>
                  </div>
                )}

                {/* Submit Button with Website Kinetic Animation */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="dark"
                    size="md"
                    className="w-full justify-center py-3.5 shadow-lg shadow-[#0B1F3B]/15"
                  >
                    Login
                  </Button>
                </div>
              </form>

              {/* Bottom Links */}
              <div className="mt-8 text-center">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-500 hover:text-[#0B1F3B] transition-all font-figtree tracking-wide cursor-pointer group"
                >
                  <FiArrowLeft
                    size={16}
                    className="group-hover:-translate-x-1 transition-transform duration-200"
                  />
                  <span>Back to Home Page</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Arched Window & 3D Character with Website Brand Colors */}
          <div className="w-full lg:w-1/2 relative flex items-end justify-center pt-8 pb-0 overflow-hidden bg-[#0B1F3B]">
            

            {/* Arch Shape Backdrop matching Brand Navy & Lime Accent */}
            <div className="w-[300px] sm:w-[350px] lg:w-[370px] xl:w-[410px] h-[380px] sm:h-[450px] lg:h-[510px] rounded-t-[150px] sm:rounded-t-[175px] lg:rounded-t-[205px] relative flex items-end justify-center shadow-inner shadow-white/50">
              {/* Brand Logo at the Top of the Arch */}
              <div className="absolute top-8 sm:top-12 z-20 w-[180px] sm:w-[220px] drop-shadow-md">
                <Image
                  src={logo}
                  alt="VR Tax CPA Logo"
                  className="w-full h-auto object-contain select-none pointer-events-none"
                  priority
                />
              </div>

              {/* 3D Character Sitting with Laptop */}
              <div className="relative z-10 w-[270px] sm:w-[320px] lg:w-[340px] xl:w-[380px] mb-0 sm:mb-2 drop-shadow-2xl">
                <Image
                  src={loginImg}
                  alt="VR Tax CPA Character"
                  className="w-full h-auto object-contain select-none pointer-events-none"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
