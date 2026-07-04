"use client";
import { motion } from "framer-motion";
import { Badge } from "../ui/Badge";
import { ImagePlaceholder } from "../ui/ImagePlaceholder";
import { UserCircle, Zap, BarChart3, Repeat, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: UserCircle,
    gradient: "from-teal-500 to-cyan-400",
    glow: "shadow-teal-500/40",
    title: "Tell Us About You",
    description: "Age, weight, goals, injuries, available time, equipment. A 3-minute setup builds your complete profile.",
    detail: "Takes only 3 minutes",
  },
  {
    number: "02",
    icon: Zap,
    gradient: "from-amber-500 to-yellow-400",
    glow: "shadow-amber-500/40",
    title: "Get Your Daily Plan",
    description: "Each morning, your AI coach adapts your workout and nutrition based on energy and time available.",
    detail: "Adapts every single day",
  },
  {
    number: "03",
    icon: BarChart3,
    gradient: "from-emerald-500 to-green-400",
    glow: "shadow-emerald-500/40",
    title: "Track Your Progress",
    description: "Log workouts, weight, water, sleep. Watch your Fitness Age drop and health score climb.",
    detail: "See results in 6 weeks",
  },
  {
    number: "04",
    icon: Repeat,
    gradient: "from-purple-500 to-violet-400",
    glow: "shadow-purple-500/40",
    title: "Build Lasting Habits",
    description: "Streaks, challenges, and community keep you accountable. 87% of Forma members are still active at 3 months.",
    detail: "87% retention rate",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 px-5 sm:px-8 overflow-hidden">
      {/* Soft mint/sage pastel background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f0fdf9] via-[#f5fdfb] to-[#ecfdf5]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-200 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-200 to-transparent" />

      {/* Blobs */}
      <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-teal-200/50 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-emerald-200/50 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge color="emerald" className="mb-5">Simple Process</Badge>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            From zero to{" "}
            <span className="gradient-text">healthier in 4 steps</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            No complicated programs. No overwhelming choices. Just a clear path forward, every single day.
          </p>
        </motion.div>

        {/* Steps — card layout with floating feel */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="relative bg-white rounded-2xl p-6 border border-emerald-100 shadow-sm hover:shadow-xl card-hover flex flex-col gap-4"
              >
                {/* Step number watermark */}
                <span className="absolute top-4 right-5 text-6xl font-black text-gray-100 dark:text-white/5 select-none leading-none">
                  {step.number}
                </span>

                {/* Icon */}
                <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-xl ${step.glow}`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{step.description}</p>
                </div>

                <div className="mt-auto">
                  <span className={`inline-flex items-center gap-1 text-xs font-semibold text-transparent bg-clip-text bg-gradient-to-r ${step.gradient}`}>
                    <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${step.gradient} opacity-100`} style={{ display: 'inline-block' }} />
                    {step.detail}
                  </span>
                </div>

                {/* Arrow between steps */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white dark:bg-[#0d1f1b] border border-emerald-100 dark:border-emerald-900 items-center justify-center shadow-md">
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Photo + stats row */}
        <div className="grid md:grid-cols-2 gap-6 items-center">
          {/* Image placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-teal-500 to-emerald-600 shadow-2xl shadow-teal-500/20">
              <ImagePlaceholder
                folder="images/lifestyle"
                filename="workout-at-home.jpg"
                label="Add a photo of someone doing a home workout — living room, morning light, casual clothes"
                aspectRatio="aspect-[4/3]"
                className="border-0 rounded-none"
              />
            </div>

            {/* Floating card on photo */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -right-4 bg-white dark:bg-[#161b22] rounded-2xl p-4 shadow-xl border border-gray-100 dark:border-gray-800"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center text-xl shadow-lg">⚡</div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white text-sm">Sarah&apos;s 10-min</p>
                  <p className="text-xs text-teal-600 dark:text-teal-400 font-medium">Workout Complete! 🎉</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -top-4 -left-4 bg-white dark:bg-[#161b22] rounded-2xl p-3 shadow-xl border border-gray-100 dark:border-gray-800"
            >
              <p className="text-xs text-gray-500 dark:text-gray-400">Weekly streak</p>
              <p className="text-2xl font-black text-amber-500">21 🔥</p>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4 content-start"
          >
            {[
              { value: "12K+", label: "Active Members", emoji: "👥", color: "from-teal-500 to-cyan-400" },
              { value: "6 wks", label: "Avg. Time to Results", emoji: "⚡", color: "from-amber-500 to-yellow-400" },
              { value: "4.9★", label: "App Store Rating", emoji: "⭐", color: "from-purple-500 to-violet-400" },
              { value: "87%", label: "3-Month Retention", emoji: "💪", color: "from-emerald-500 to-green-400" },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.04 }}
                className="bg-white rounded-2xl p-5 border border-emerald-100 shadow-md hover:shadow-lg text-center"
              >
                <div className={`text-3xl mb-2`}>{s.emoji}</div>
                <p className={`text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r ${s.color} mb-1`}>{s.value}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
