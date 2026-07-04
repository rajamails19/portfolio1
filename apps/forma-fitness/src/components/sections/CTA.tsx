"use client";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { ArrowRight } from "lucide-react";

const stats = [
  { value: "12K+", label: "Active members" },
  { value: "6 wks", label: "To visible results" },
  { value: "4.9★", label: "App Store rating" },
  { value: "$0", label: "To start today" },
];

export function CTA() {
  return (
    <section className="py-24 px-5 sm:px-8 relative overflow-hidden">
      {/* Rich teal-to-emerald gradient — bold and premium */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0d4f47] via-[#065f46] to-[#0a3d38]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_30%,rgba(52,211,153,0.15)_0%,transparent_60%)]" />

      {/* Animated corner blobs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-0 w-80 h-80 rounded-full bg-teal-500/10 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-purple-500/10 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-1/2 right-1/4 w-48 h-48 rounded-full bg-amber-500/8 blur-2xl pointer-events-none"
      />

      {/* Floating emoji pills */}
      {[
        { emoji: "🏃", top: "15%", left: "8%", delay: 0 },
        { emoji: "💪", top: "20%", right: "10%", delay: 1 },
        { emoji: "🥗", bottom: "25%", left: "6%", delay: 2 },
        { emoji: "❤️", bottom: "20%", right: "8%", delay: 1.5 },
        { emoji: "⚡", top: "60%", left: "12%", delay: 0.5 },
        { emoji: "🏆", top: "55%", right: "12%", delay: 2.5 },
      ].map((item, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -12, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: item.delay }}
          className="absolute hidden lg:flex w-12 h-12 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm items-center justify-center text-xl pointer-events-none"
          style={{ top: item.top, bottom: (item as { bottom?: string }).bottom, left: (item as { left?: string }).left, right: (item as { right?: string }).right }}
        >
          {item.emoji}
        </motion.div>
      ))}

      <div className="relative max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <motion.div
            animate={{ rotate: [0, 8, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="text-6xl mb-6 inline-block"
          >
            💪
          </motion.div>
          <h2 className="text-5xl sm:text-6xl font-black text-white mb-4 leading-tight tracking-tight">
            The best time to start
            <br />
            <span className="gradient-text">was yesterday.</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-xl mx-auto">
            The second best time is right now. Join 12,000+ professionals who decided to take their health seriously.
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-4 gap-4 max-w-lg mx-auto mb-10"
        >
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <p className="text-2xl font-black text-white">{s.value}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Button size="lg" icon={<ArrowRight className="w-5 h-5" />}>
            Start Free Today
          </Button>
          <button className="px-8 py-4 rounded-full text-gray-300 border border-white/20 hover:border-white/40 hover:text-white transition-all text-base font-semibold cursor-pointer hover:bg-white/5">
            See Pricing Plans
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 text-sm mt-6"
        >
          No credit card required · 14-day free trial · Cancel anytime
        </motion.p>
      </div>
    </section>
  );
}
