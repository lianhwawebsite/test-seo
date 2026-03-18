"use client";
import { motion } from "framer-motion";

export default function Loading() {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const lineLength = 40;

  return (
    <div className="h-screen flex flex-col items-center">
      <motion.svg width="200" height="200" viewBox="0 0 200 200" animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="origin-center">
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="#EEEEEF"
          strokeWidth="4"
        />
        <circle cx="100" cy="100" r={radius} fill="none" stroke="#DF4425" strokeWidth="4" strokeLinecap="round" strokeDasharray={`${lineLength} ${circumference - lineLength}`} strokeDashoffset="0" />
      </motion.svg>
    </div>
  );
}