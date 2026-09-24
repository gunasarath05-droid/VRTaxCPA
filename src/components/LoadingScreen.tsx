"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

import spike1 from "@/assets/loading/1.png";
import spike2 from "@/assets/loading/2.png";
import spike3 from "@/assets/loading/3.png";
import spike4 from "@/assets/loading/4.png";
import spike5 from "@/assets/loading/5.png";
import spike6 from "@/assets/loading/6.png";
import spike7 from "@/assets/loading/7.png";
import spike8 from "@/assets/loading/8.png";

// Exact coordinate map matching Final Out.png (148 x 166 canvas)
const SPIKES = [
  { src: spike1, id: 1, x: 103, y: 7, width: 27, height: 30 },
  { src: spike2, id: 2, x: 118, y: 45, width: 26, height: 31 },
  { src: spike3, id: 3, x: 87, y: 97, width: 19, height: 24 },
  { src: spike4, id: 4, x: 47, y: 130, width: 30, height: 33 },
  { src: spike5, id: 5, x: 12, y: 131, width: 26, height: 30 },
  { src: spike6, id: 6, x: 5, y: 93, width: 17, height: 28 },
  { src: spike7, id: 7, x: 30, y: 46, width: 24, height: 31 },
  { src: spike8, id: 8, x: 65, y: 11, width: 29, height: 26 },
];

interface LoadingScreenProps {
  message?: string;
  fullScreen?: boolean;
}

export default function LoadingScreen({
  fullScreen = true,
}: LoadingScreenProps) {
  const [mounted, setMounted] = useState(false);
  // Step ranges from 0 to 11:
  // 1-8: Spikes sequentially appear
  // 9-11: Full Final Out hold (~330ms) with radiant glow
  // 0: Clean reset fade before loop restarts
  const [step, setStep] = useState(1);

  useEffect(() => {
    setMounted(true);

    const interval = setInterval(() => {
      setStep((prev) => (prev >= 11 ? 0 : prev + 1));
    }, 110);

    return () => clearInterval(interval);
  }, []);

  const loaderContent = (
    <div
      className={`${
        fullScreen
          ? "fixed inset-0 z-[999999] w-screen h-screen"
          : "w-full min-h-[360px]"
      } flex items-center justify-center bg-[#07192D]/85 backdrop-blur-2xl relative overflow-hidden select-none`}
    >
      {/* Soft ambient brand glow behind the emblem */}
      <div className="absolute w-52 h-52 bg-[#d3d663]/15 rounded-full blur-3xl pointer-events-none transition-all duration-500" />

      {/* Emblem Container (148px x 166px) with smooth scale */}
      <div className="relative w-[148px] h-[166px] flex items-center justify-center scale-110 sm:scale-125 transition-transform duration-300">
        {SPIKES.map((spike, index) => {
          // Is this spike visible in current step?
          const isVisible = step > 0 && step >= index + 1;
          const isCurrentActive = step === index + 1;
          const isFullHold = step >= 8;

          return (
            <div
              key={spike.id}
              className="absolute pointer-events-none transition-all duration-150"
              style={{
                left: `${spike.x}px`,
                top: `${spike.y}px`,
                width: `${spike.width}px`,
                height: `${spike.height}px`,
                opacity: isVisible ? 1 : 0,
                transform: isCurrentActive
                  ? "scale(1.15)"
                  : isVisible
                  ? "scale(1)"
                  : "scale(0.8)",
                filter:
                  isCurrentActive || isFullHold
                    ? "drop-shadow(0 0 6px rgba(211, 214, 99, 0.85)) drop-shadow(0 0 12px rgba(211, 214, 99, 0.45))"
                    : "none",
              }}
            >
              <Image
                src={spike.src}
                alt={`Loading frame ${spike.id}`}
                width={spike.width}
                height={spike.height}
                priority
                className="w-full h-full object-contain"
              />
            </div>
          );
        })}
      </div>
    </div>
  );

  if (fullScreen && mounted && typeof document !== "undefined") {
    return createPortal(loaderContent, document.body);
  }

  return loaderContent;
}

