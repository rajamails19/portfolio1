"use client";
import { motion } from "framer-motion";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { CheckCircle2, Zap, X } from "lucide-react";

const freeFeatures = [
  { text: "Basic activity tracking", included: true },
  { text: "3 workouts per week", included: true },
  { text: "Step counter", included: true },
  { text: "Basic nutrition tips", included: true },
  { text: "Community access", included: true },
  { text: "Unlimited AI coaching", included: false },
  { text: "Personalized plans", included: false },
  { text: "Fitness Age tracking", included: false },
];

const premiumFeatures = [
  "Unlimited AI coaching sessions",
  "Daily personalized workout plans",
  "Full nutrition & meal planning",
  "Fitness Age tracking",
  "AI Form Review (video analysis)",
  "Monthly Health Report PDF",
  "Advanced progress analytics",
  "Priority community challenges",
  "Sleep & recovery tracking",
  "Direct coach chat (24/7)",
];

export function Pricing() {
  return (
    <section className="relative py-24 px-5 sm:px-8 overflow-hidden">
      {/* Warm amber/teal split background */}
      <div className="absolute inset-0 bg-white dark:bg-[#0d1117]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(14,165,160,0.08)_0%,transparent_60%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-300/40 to-transparent dark:via-teal-700/30" />

      {/* Floating decorations */}
      <motion.div
        animate={{ y: [0, -16, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-16 left-10 w-16 h-16 rounded-2xl bg-teal-400/10 dark:bg-teal-500/10 border border-teal-300/30 dark:border-teal-700/30 flex items-center justify-center text-2xl pointer-events-none"
      >
        💪
      </motion.div>
      <motion.div
        animate={{ y: [0, 12, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-24 right-12 w-14 h-14 rounded-2xl bg-amber-400/10 dark:bg-amber-500/10 border border-amber-300/30 dark:border-amber-700/30 flex items-center justify-center text-xl pointer-events-none"
      >
        ⚡
      </motion.div>
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-20 left-16 w-12 h-12 rounded-2xl bg-purple-400/10 dark:bg-purple-500/10 border border-purple-300/30 dark:border-purple-700/30 flex items-center justify-center text-xl pointer-events-none"
      >
        🏆
      </motion.div>

      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <Badge color="amber" className="mb-5">Simple Pricing</Badge>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
            Less than a{" "}
            <span className="gradient-text-warm">coffee a week</span>
          </h2>
          <p className="text-xl text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Start free. Upgrade when you&apos;re ready. No hidden fees, no annual lock-in.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          {/* Free plan */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gray-50 dark:bg-[#161b22] rounded-3xl p-8 border border-gray-200 dark:border-gray-800 flex flex-col"
          >
            <div className="mb-7">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Free Plan</p>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-6xl font-black text-gray-900 dark:text-white">$0</span>
                <span className="text-gray-400 text-lg">/mo</span>
              </div>
              <p className="text-sm text-gray-500">Forever free. No credit card required.</p>
            </div>

            <ul className="flex flex-col gap-2.5 mb-8 flex-1">
              {freeFeatures.map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-sm">
                  {f.included ? (
                    <CheckCircle2 className="w-4.5 h-4.5 text-teal-500 flex-shrink-0" size={18} />
                  ) : (
                    <X className="w-4.5 h-4.5 text-gray-300 dark:text-gray-600 flex-shrink-0" size={18} />
                  )}
                  <span className={f.included ? "text-gray-700 dark:text-gray-300" : "text-gray-400 dark:text-gray-600"}>
                    {f.text}
                  </span>
                </li>
              ))}
            </ul>

            <Button variant="outline" className="w-full justify-center">
              Get Started Free
            </Button>
          </motion.div>

          {/* Premium plan */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden flex flex-col shadow-2xl shadow-teal-500/15"
          >
            {/* Gradient border effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500 via-cyan-500 to-emerald-500 p-px rounded-3xl">
              <div className="absolute inset-0 rounded-3xl bg-[#0a1f20]" />
            </div>

            <div className="relative z-10 p-8 flex flex-col h-full">
              {/* Popular badge */}
              <div className="absolute -top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <motion.span
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="bg-gradient-to-r from-teal-500 to-cyan-400 text-white text-xs font-bold px-5 py-1.5 rounded-full shadow-lg shadow-teal-500/40 inline-block"
                >
                  ⚡ MOST POPULAR
                </motion.span>
              </div>

              <div className="mb-7 mt-4">
                <p className="text-xs font-bold text-teal-400 uppercase tracking-widest mb-3">Premium Plan</p>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-6xl font-black text-white">$7.99</span>
                  <span className="text-gray-400 text-lg">/mo</span>
                </div>
                <p className="text-sm text-gray-400">14-day free trial · Cancel anytime</p>
              </div>

              <ul className="flex flex-col gap-2.5 mb-8 flex-1">
                {premiumFeatures.map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <CheckCircle2 className="w-4.5 h-4.5 text-teal-400 flex-shrink-0" size={18} />
                    <span className="text-gray-200">{f}</span>
                  </li>
                ))}
              </ul>

              <Button className="w-full justify-center !py-4 text-base" icon={<Zap className="w-4 h-4" />}>
                Start 14-Day Free Trial
              </Button>
              <p className="text-center text-xs text-gray-500 mt-3">No credit card needed to start</p>
            </div>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center text-sm text-gray-400 dark:text-gray-500"
        >
          🔒 30-day money-back guarantee · Payments secured by Stripe · Cancel from your account in 1 click
        </motion.p>
      </div>
    </section>
  );
}
