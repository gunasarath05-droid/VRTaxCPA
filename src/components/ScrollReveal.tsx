"use client";

import React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

interface ScrollRevealProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "fade" | "scale";
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  viewportAmount?: number;
  once?: boolean;
}

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  distance = 30,
  className = "",
  viewportAmount = 0.15,
  once = true,
  ...rest
}: ScrollRevealProps) {
  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { opacity: 0, y: distance, x: 0, scale: 1 };
      case "down":
        return { opacity: 0, y: -distance, x: 0, scale: 1 };
      case "left":
        return { opacity: 0, x: distance, y: 0, scale: 1 };
      case "right":
        return { opacity: 0, x: -distance, y: 0, scale: 1 };
      case "scale":
        return { opacity: 0, scale: 0.92, x: 0, y: 0 };
      case "fade":
      default:
        return { opacity: 0, x: 0, y: 0, scale: 1 };
    }
  };

  return (
    <motion.div
      initial={getInitialPosition()}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
      }}
      viewport={{ once, amount: viewportAmount }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1], // Smooth cubic-bezier
      }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({
  children,
  className = "",
  staggerChildren = 0.12,
  delayChildren = 0.1,
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  staggerChildren?: number;
  delayChildren?: number;
  once?: boolean;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.1 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren,
            delayChildren,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
  direction = "up",
  distance = 25,
}: {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "fade";
  distance?: number;
}) {
  const getHidden = () => {
    if (direction === "up") return { opacity: 0, y: distance };
    if (direction === "down") return { opacity: 0, y: -distance };
    return { opacity: 0 };
  };

  return (
    <motion.div
      variants={{
        hidden: getHidden(),
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.55,
            ease: [0.25, 0.1, 0.25, 1],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
