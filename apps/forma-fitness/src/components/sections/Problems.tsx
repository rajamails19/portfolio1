"use client";
import { motion } from "framer-motion";
import { Badge } from "../ui/Badge";
import { ImagePlaceholder } from "../ui/ImagePlaceholder";
import {
  Clock, Battery, BackpackIcon, Weight, CalendarX, TrendingDown,
  CheckCircle2, Zap, Timer, Heart, Calendar, TrendingUp,
} from "lucide-react";

const problems = [
  {
    icon: Clock,
    color: "text-rose-500",
    bg: "bg-rose-100 dark:bg-rose-900/30",
    border: "border-rose-200 dark:border-rose-800",
    problem: "No time for the gym",
    solution: "10-minute workouts that actually work",
    solutionIcon: Timer,
    solutionColor: "text-teal-600 dark:text-teal-400",
    solutionBg: "bg-teal-50 dark:bg-teal-900/20",
  },
  {
    icon: Battery,
    color: "text-amber-600",
    bg: "bg-amber-100 dark:bg-amber-900/30",
    border: "border-amber-200 dark:border-amber-800",
    problem: "Always feeling drained",
    solution: "AI adapts your plan to your energy levels",
    solutionIcon: Zap,
    solutionColor: "text-amber-600 dark:text-amber-400",
    solutionBg: "bg-amber-50 dark:bg-amber-900/20",
  },
  {
    icon: BackpackIcon,
    color: "text-purple-600",
    bg: "bg-purple-100 dark:bg-purple-900/30",
    border: "border-purple-200 dark:border-purple-800",
    problem: "Back and neck pain from sitting",
    solution: "Targeted mobility and posture routines",
    solutionIcon: Heart,
    solutionColor: "text-emerald-600 dark:text-emerald-400",
    solutionBg: "bg-emerald-50 dark:bg-emerald-900/20",
  },
  {
    icon: Weight,
    color: "text-blue-600",
    bg: "bg-blue-100 dark:bg-blue-900/30",
    border: "border-blue-200 dark:border-blue-800",
    problem: "Weight creeping up every year",
    solution: "Simple nutrition plans your whole family can follow",
    solutionIcon: TrendingUp,
    solutionColor: "text-teal-600 dark:text-teal-400",
    solutionBg: "bg-teal-50 dark:bg-teal-900/20",
  },
  {
    icon: CalendarX,
    color: "text-orange-600",
    bg: "bg-orange-100 dark:bg-orange-900/30",
    border: "border-orange-200 dark:border-orange-800",
    problem: "Can't stick to any routine",
    solution: "Habit tracking with streaks and accountability",
    solutionIcon: Calendar,
    solutionColor: "text-amber-600 dark:text-amber-400",
    solutionBg: "bg-amber-50 dark:bg-amber-900/20",
  },
  {
    icon: TrendingDown,
    color: "text-red-600",
    bg: "bg-red-100 dark:bg-red-900/30",
    border: "border-red-200 dark:border-red-800",
    problem: "Fitness declining with age",
    solution: "Your personal Fitness Age — and how to lower it",
    solutionIcon: CheckCircle2,
    solutionColor: "text-emerald-600 dark:text-emerald-400",
    solutionBg: "bg-emerald-50 dark:bg-emerald-900/20",
  },
];

export function Problems() {
  return (
    <section className="relative py-24 px-5 sm:px-8 overflow-hidden">
      {/* Warm peach/amber pastel gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#fff8f0] via-[#fffbf5] to-[#fef3e8]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-200 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-200 to-transparent" />

      {/* Decorative blobs */}
      <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-amber-200/50 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-56 h-56 rounded-full bg-orange-200/40 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge color="coral" className="mb-5">
            Sound Familiar?
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
            Life gets in the way.{" "}
            <br className="hidden sm:block" />
            <span className="gradient-text-warm">We get you back on track.</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Every busy professional over 35 faces the same challenges. Forma was built specifically to solve them.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Left — image placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            {/* Image area — user replaces this */}
            <div className="relative rounded-3xl overflow-hidden aspect-[3/4] bg-gradient-to-br from-amber-500 to-rose-500 shadow-2xl shadow-amber-500/20">
              {/* Placeholder — replace with <Image> once you add your photo */}
              <ImagePlaceholder
                folder="images/people"
                filename="parent-exercising.jpg"
                label="Add a photo of a parent or professional exercising — warm, candid, real life"
                className="absolute inset-0 rounded-none border-0"
                aspectRatio="h-full"
              />

              {/* Overlay card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="absolute bottom-5 left-4 right-4 bg-white/15 dark:bg-black/30 backdrop-blur-xl rounded-2xl p-4 border border-white/20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center text-xl">🔥</div>
                  <div>
                    <p className="text-white font-semibold text-sm">4-day streak</p>
                    <p className="text-white/60 text-xs">You&apos;re unstoppable, Sarah!</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-5 right-4 bg-white/90 dark:bg-[#161b22]/90 backdrop-blur rounded-xl px-3 py-2 shadow-lg"
              >
                <p className="text-xs font-bold text-gray-900 dark:text-white">Fitness Age</p>
                <p className="text-lg font-black text-teal-600">34 <span className="text-xs text-gray-400 font-normal">vs 41</span></p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right — problem cards */}
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
            {problems.map((item, i) => {
              const ProblemIcon = item.icon;
              const SolutionIcon = item.solutionIcon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className={`group bg-white/90 backdrop-blur-sm rounded-2xl p-5 border ${item.border} card-hover shadow-sm hover:shadow-md`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-9 h-9 rounded-xl ${item.bg} flex items-center justify-center flex-shrink-0`}>
                      <ProblemIcon className={`w-4.5 h-4.5 ${item.color}`} size={18} />
                    </div>
                    <p className="font-semibold text-gray-500 dark:text-gray-500 text-sm line-through decoration-gray-400">
                      {item.problem}
                    </p>
                  </div>
                  <div className={`flex items-start gap-2 ${item.solutionBg} rounded-xl p-3`}>
                    <SolutionIcon className={`w-4 h-4 flex-shrink-0 mt-0.5 ${item.solutionColor}`} />
                    <p className={`text-sm font-medium ${item.solutionColor}`}>{item.solution}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
