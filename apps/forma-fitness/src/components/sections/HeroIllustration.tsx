"use client";
import { motion } from "framer-motion";
import {
  Heart,
  Zap,
  TrendingUp,
  Moon,
  Droplets,
  Award,
  CheckCircle2,
  Flame,
} from "lucide-react";

function FloatingCard({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={`absolute bg-white dark:bg-[#161b22] rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-4 ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function HeroIllustration() {
  return (
    <div className="relative w-full max-w-[520px] aspect-square">
      {/* Main central card */}
      <motion.div
        className="absolute inset-8 rounded-3xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
      >
        {/* Gradient background for main card */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0ea5a0] via-[#0891b2] to-[#1d4ed8]" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-8">
          {/* Person silhouette */}
          <svg viewBox="0 0 200 300" className="w-32 h-48 text-white/90 fill-current">
            {/* Head */}
            <circle cx="100" cy="45" r="28" />
            {/* Body */}
            <path d="M72 90 Q100 80 128 90 L140 180 Q120 185 100 182 Q80 185 60 180 Z" />
            {/* Arms raised */}
            <path d="M72 105 Q50 85 32 70" strokeWidth="16" stroke="currentColor" fill="none" strokeLinecap="round"/>
            <path d="M128 105 Q150 85 168 70" strokeWidth="16" stroke="currentColor" fill="none" strokeLinecap="round"/>
            {/* Legs */}
            <path d="M80 180 Q72 230 68 265" strokeWidth="18" stroke="currentColor" fill="none" strokeLinecap="round"/>
            <path d="M120 180 Q128 230 132 265" strokeWidth="18" stroke="currentColor" fill="none" strokeLinecap="round"/>
          </svg>

          <div className="text-center">
            <p className="text-white/80 text-sm font-medium">Today&apos;s Score</p>
            <p className="text-white text-4xl font-bold">87</p>
            <p className="text-white/60 text-xs">Excellent · Keep going!</p>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-white/20 rounded-full h-2">
            <motion.div
              className="h-2 rounded-full bg-white"
              initial={{ width: 0 }}
              animate={{ width: "87%" }}
              transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>
      </motion.div>

      {/* Floating cards */}
      <FloatingCard className="top-2 left-0 w-44" delay={0.3}>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
            <Flame className="w-4 h-4 text-amber-500" />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Calories</p>
            <p className="text-sm font-bold text-gray-900 dark:text-white">342 kcal</p>
          </div>
        </div>
        <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5">
          <div className="h-1.5 rounded-full bg-amber-400" style={{ width: "68%" }} />
        </div>
      </FloatingCard>

      <FloatingCard className="top-0 right-2 w-40" delay={0.4}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
            <Heart className="w-4 h-4 text-red-500" />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Heart Rate</p>
            <p className="text-sm font-bold text-gray-900 dark:text-white">72 bpm</p>
          </div>
        </div>
      </FloatingCard>

      <FloatingCard className="bottom-4 left-0 w-48" delay={0.5}>
        <div className="flex items-center gap-2 mb-1">
          <TrendingUp className="w-4 h-4 text-[#0ea5a0]" />
          <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">Fitness Age</p>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-[#0ea5a0]">34</span>
          <span className="text-sm text-gray-400">vs 42 real age</span>
        </div>
        <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">↓ 8 years younger!</p>
      </FloatingCard>

      <FloatingCard className="bottom-8 right-0 w-44" delay={0.6}>
        <div className="flex items-center gap-2 mb-3">
          <Award className="w-4 h-4 text-amber-500" />
          <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">Streak</p>
        </div>
        <div className="flex gap-1.5">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                i < 5
                  ? "bg-[#0ea5a0]"
                  : "bg-gray-100 dark:bg-gray-800"
              }`}
            >
              {i < 5 && <CheckCircle2 className="w-3 h-3 text-white" />}
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">5-day streak 🔥</p>
      </FloatingCard>

      <FloatingCard className="top-1/2 -translate-y-1/2 -right-4 w-36" delay={0.7}>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1.5">
            <Droplets className="w-3.5 h-3.5 text-blue-400" />
            <p className="text-xs text-gray-600 dark:text-gray-400">Water</p>
          </div>
          <div className="flex gap-1">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={`w-3 h-5 rounded-sm ${
                  i < 6 ? "bg-blue-400" : "bg-gray-100 dark:bg-gray-800"
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-gray-500">6 / 8 glasses</p>
        </div>
      </FloatingCard>

      <FloatingCard className="top-1/3 -left-6 w-32" delay={0.8}>
        <div className="flex items-center gap-1.5 mb-1">
          <Moon className="w-3.5 h-3.5 text-indigo-400" />
          <p className="text-xs text-gray-600 dark:text-gray-400">Sleep</p>
        </div>
        <p className="text-lg font-bold text-gray-900 dark:text-white">7.5h</p>
        <div className="flex gap-0.5 mt-1">
          {[40, 60, 80, 75, 90, 70, 85].map((h, i) => (
            <div
              key={i}
              className="w-3 bg-indigo-200 dark:bg-indigo-900 rounded-sm"
              style={{ height: `${h * 0.3}px` }}
            />
          ))}
        </div>
      </FloatingCard>

      {/* Animated rings */}
      <motion.div
        className="absolute inset-4 rounded-3xl border-2 border-teal-400/20 pointer-events-none"
        animate={{ scale: [1, 1.03, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-2 rounded-3xl border border-teal-400/10 pointer-events-none"
        animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />

      {/* Zap icon */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-12 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#0ea5a0] shadow-lg shadow-teal-500/40 flex items-center justify-center"
      >
        <Zap className="w-5 h-5 text-white" />
      </motion.div>
    </div>
  );
}
