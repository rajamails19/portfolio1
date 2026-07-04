"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Play, Star, Zap } from "lucide-react";
import { HeroIllustration } from "./HeroIllustration";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Light pastel gradient background — inspired by premium SaaS */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#e8faf5] via-[#f5fbff] to-[#fef4ec]" />

      {/* Soft radial overlays for depth */}
      <div className="absolute top-0 left-0 w-[70%] h-[70%] bg-[radial-gradient(ellipse_at_top_left,rgba(20,184,166,0.12)_0%,transparent_60%)]" />
      <div className="absolute bottom-0 right-0 w-[60%] h-[60%] bg-[radial-gradient(ellipse_at_bottom_right,rgba(251,146,60,0.1)_0%,transparent_55%)]" />
      <div className="absolute top-1/3 right-1/4 w-[40%] h-[40%] bg-[radial-gradient(ellipse,rgba(139,92,246,0.06)_0%,transparent_60%)]" />

      {/* Subtle dot pattern */}
      <div className="absolute inset-0 opacity-[0.35]"
        style={{ backgroundImage: "radial-gradient(circle, #94a3b8 1px, transparent 1px)", backgroundSize: "32px 32px" }}
      />

      {/* Floating blobs — contained, tasteful */}
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-24 right-16 w-72 h-72 rounded-full bg-teal-200/40 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute bottom-24 left-8 w-56 h-56 rounded-full bg-orange-200/40 blur-3xl pointer-events-none"
      />

      {/* Main content — full width, no wasted side space */}
      <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-28 pb-16 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

        {/* Left — text */}
        <motion.div style={{ y, opacity }} className="flex flex-col gap-6">

          {/* Badge pill */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex self-start items-center gap-2 bg-white/80 backdrop-blur border border-teal-200 rounded-full px-4 py-2 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
            <span className="text-xs font-semibold text-teal-700 tracking-wide">Trusted by 12,000+ professionals</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-[64px] font-black tracking-tight leading-[1.06] text-gray-900"
          >
            Fitness Built For{" "}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-500">Real Life</span>
              <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 260 10" fill="none">
                <path d="M2 7 Q65 2 130 7 Q195 12 258 7" stroke="url(#ul)" strokeWidth="2.5" strokeLinecap="round"/>
                <defs>
                  <linearGradient id="ul" x1="0" y1="0" x2="260" y2="0">
                    <stop offset="0%" stopColor="#14b8a6"/>
                    <stop offset="100%" stopColor="#10b981"/>
                  </linearGradient>
                </defs>
              </svg>
            </span>{" "}
            After 35
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-500 leading-relaxed max-w-[480px]"
          >
            Personalized workouts, health coaching, nutrition guidance, and daily accountability — designed for busy parents and professionals.
          </motion.p>

          {/* Floating info chips — inside the layout, not overflowing */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28 }}
            className="flex flex-wrap gap-2"
          >
            {[
              { emoji: "⚡", text: "10-min workouts" },
              { emoji: "🤖", text: "AI adapts daily" },
              { emoji: "🔥", text: "Results in 6 weeks" },
              { emoji: "🏆", text: "4.9★ rated" },
            ].map((chip, i) => (
              <motion.span
                key={i}
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur border border-gray-200/80 rounded-full px-3.5 py-1.5 text-xs font-semibold text-gray-700 shadow-sm"
              >
                <span>{chip.emoji}</span>
                {chip.text}
              </motion.span>
            ))}
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex items-center gap-3"
          >
            <div className="flex -space-x-2">
              {[
                { bg: "from-teal-400 to-cyan-400", l: "A" },
                { bg: "from-amber-400 to-orange-400", l: "M" },
                { bg: "from-emerald-400 to-green-400", l: "S" },
                { bg: "from-purple-400 to-violet-400", l: "J" },
                { bg: "from-rose-400 to-pink-400", l: "R" },
              ].map((a, i) => (
                <div key={i} className={`w-9 h-9 rounded-full bg-gradient-to-br ${a.bg} ring-2 ring-white flex items-center justify-center text-xs font-bold text-white`}>
                  {a.l}
                </div>
              ))}
            </div>
            <div>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
              </div>
              <p className="text-xs text-gray-500 mt-0.5">4.9/5 from 3,400+ reviews</p>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.42 }}
            className="flex flex-wrap gap-3 items-center"
          >
            <motion.a
              href="#"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-bold px-7 py-4 rounded-2xl shadow-xl shadow-teal-500/30 transition-all text-base"
            >
              Start Free Today <ArrowRight className="w-4 h-4" />
            </motion.a>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 bg-white/90 hover:bg-white border border-gray-200 text-gray-700 font-semibold px-6 py-4 rounded-2xl shadow-md transition-all text-base cursor-pointer"
            >
              <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center">
                <Play className="w-3 h-3 text-teal-600 fill-current ml-0.5" />
              </div>
              See How It Works
            </motion.button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            className="text-sm text-gray-400"
          >
            No credit card required · Cancel anytime · 14-day free trial
          </motion.p>
        </motion.div>

        {/* Right — illustration, parallax */}
        <motion.div
          initial={{ opacity: 0, scale: 0.93, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 50]) }}
          className="relative flex justify-center lg:justify-end"
        >
          {/* Glow behind illustration */}
          <div className="absolute inset-0 bg-gradient-to-br from-teal-400/20 to-emerald-400/10 rounded-[40px] blur-3xl scale-90" />
          <HeroIllustration />
        </motion.div>
      </div>

      {/* Bottom wave into next section */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden h-20">
        <svg viewBox="0 0 1440 80" className="absolute bottom-0 w-full" preserveAspectRatio="none">
          <path d="M0 40 Q360 80 720 40 Q1080 0 1440 40 L1440 80 L0 80 Z" fill="white" fillOpacity="0.9"/>
        </svg>
      </div>
    </section>
  );
}
