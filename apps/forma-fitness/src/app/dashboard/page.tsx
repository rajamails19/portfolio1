"use client";
import { motion } from "framer-motion";
import {
  Zap, Heart, Flame, Footprints, Moon, Droplets,
  TrendingUp, CheckCircle2, MessageSquare, Award,
  Play, ChevronRight, BarChart3, Target,
} from "lucide-react";
import Link from "next/link";

const todayWorkout = {
  title: "20-Min Full Body Circuit",
  intensity: "Moderate",
  exercises: ["Bodyweight Squats × 20", "Push-ups × 15", "Plank 45s", "Lunges × 12 each", "Mountain Climbers 30s"],
};

const stats = [
  { icon: Flame, label: "Calories", value: "342", unit: "kcal", progress: 68, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-900/20" },
  { icon: Footprints, label: "Steps", value: "7,241", unit: "/ 10k", progress: 72, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20" },
  { icon: Heart, label: "Heart Rate", value: "72", unit: "bpm", progress: 80, color: "text-rose-500", bg: "bg-rose-50 dark:bg-rose-900/20" },
  { icon: Moon, label: "Sleep", value: "7.5", unit: "hrs", progress: 85, color: "text-indigo-500", bg: "bg-indigo-50 dark:bg-indigo-900/20" },
];

const weekDays = ["M", "T", "W", "T", "F", "S", "S"];
const completedDays = [true, true, true, true, false, false, false];

const weightData = [185, 184, 183.5, 183, 182.5, 182, 181.5];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#f8f7f4] dark:bg-[#0a0f1a]">
      {/* Top nav */}
      <header className="bg-white dark:bg-[#0d1117] border-b border-gray-100 dark:border-gray-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#0ea5a0] flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-gray-900 dark:text-white">Forma</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {["Dashboard", "Workouts", "Nutrition", "Progress", "Coach"].map((item) => (
              <button key={item} className={`text-sm font-medium transition-colors cursor-pointer ${item === "Dashboard" ? "text-[#0ea5a0]" : "text-gray-500 hover:text-gray-900 dark:hover:text-white"}`}>
                {item}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-teal-500 flex items-center justify-center text-sm font-bold text-white">
              A
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-8">
        {/* Welcome + Health Score */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Welcome */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 bg-gradient-to-br from-[#0d1b2a] to-[#0a2a28] rounded-3xl p-8 text-white relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-teal-400/10 blur-2xl" />
            <div>
              <p className="text-gray-400 text-sm mb-1">Good morning, Arun 👋</p>
              <h1 className="text-3xl font-bold mb-2">Monday, Jun 8</h1>
              <p className="text-gray-400 text-sm">4-day streak · You&apos;re on fire!</p>
            </div>

            {/* Daily check-in */}
            <div className="mt-6">
              <p className="text-sm font-medium text-gray-300 mb-3">How are you feeling today?</p>
              <div className="flex flex-wrap gap-2">
                {["Great! 💪", "Good 😊", "Tired 😴", "Exhausted 🥱"].map((opt, i) => (
                  <button key={i} className={`px-4 py-2 rounded-full text-sm font-medium border transition-all cursor-pointer ${i === 1 ? "bg-[#0ea5a0] border-[#0ea5a0] text-white" : "border-white/20 text-gray-300 hover:border-white/40"}`}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Health Score */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-[#161b22] rounded-3xl p-6 border border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center gap-4"
          >
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Today&apos;s Health Score</p>
            <div className="relative w-32 h-32">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="8" className="dark:stroke-gray-700" />
                <motion.circle
                  cx="50" cy="50" r="40"
                  fill="none"
                  stroke="#0ea5a0"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray="251"
                  strokeDashoffset={251 - 251 * 0.87}
                  initial={{ strokeDashoffset: 251 }}
                  animate={{ strokeDashoffset: 251 - 251 * 0.87 }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">87</span>
                <span className="text-xs text-gray-500">Excellent</span>
              </div>
            </div>
            <div className="text-center">
              <p className="text-xs text-[#0ea5a0] font-medium">↑ 3 pts from yesterday</p>
            </div>
          </motion.div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
                className="bg-white dark:bg-[#161b22] rounded-2xl p-5 border border-gray-100 dark:border-gray-800"
              >
                <div className={`w-9 h-9 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
                  <Icon className={`w-4.5 h-4.5 ${stat.color}`} size={18} />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">{stat.label}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-bold text-gray-900 dark:text-white">{stat.value}</span>
                  <span className="text-xs text-gray-400">{stat.unit}</span>
                </div>
                <div className="mt-2 bg-gray-100 dark:bg-gray-800 rounded-full h-1.5">
                  <motion.div
                    className={`h-1.5 rounded-full ${stat.color.replace("text-", "bg-")}`}
                    style={{ width: `${stat.progress}%` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${stat.progress}%` }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.5 + i * 0.1 }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Today's workout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 bg-white dark:bg-[#161b22] rounded-3xl p-6 border border-gray-100 dark:border-gray-800"
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Today&apos;s Workout</p>
                <h3 className="font-bold text-gray-900 dark:text-white text-lg">{todayWorkout.title}</h3>
                <p className="text-sm text-gray-500">{todayWorkout.intensity} intensity · 20 min</p>
              </div>
              <button className="flex items-center gap-2 bg-[#0ea5a0] hover:bg-[#0c8a86] text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-colors cursor-pointer">
                <Play className="w-3.5 h-3.5 fill-current" /> Start
              </button>
            </div>

            <div className="flex flex-col gap-2 mb-6">
              {todayWorkout.exercises.map((ex, i) => (
                <div key={i} className="flex items-center gap-3 py-2.5 px-4 bg-gray-50 dark:bg-[#0d1117] rounded-xl">
                  <div className="w-6 h-6 rounded-lg bg-teal-100 dark:bg-teal-900/30 text-[#0ea5a0] text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">{ex}</span>
                  <ChevronRight className="w-4 h-4 text-gray-300 ml-auto" />
                </div>
              ))}
            </div>

            {/* Weekly streak */}
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">This Week</p>
              <p className="text-xs text-[#0ea5a0] font-medium">4 / 5 days</p>
            </div>
            <div className="flex gap-2 mt-2">
              {weekDays.map((day, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className={`w-full aspect-square rounded-lg flex items-center justify-center ${
                    completedDays[i]
                      ? "bg-[#0ea5a0]"
                      : i === 4
                      ? "bg-teal-100 dark:bg-teal-900/30 border-2 border-[#0ea5a0] border-dashed"
                      : "bg-gray-100 dark:bg-gray-800"
                  }`}>
                    {completedDays[i] && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                    {i === 4 && <span className="text-[10px] text-[#0ea5a0] font-bold">TDY</span>}
                  </div>
                  <span className="text-xs text-gray-400">{day}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Sidebar */}
          <div className="flex flex-col gap-5">
            {/* Fitness Age */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-[#0d2420] dark:to-[#0d2418] rounded-2xl p-5 border border-teal-100 dark:border-teal-900"
            >
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-[#0ea5a0]" />
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Fitness Age</p>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-[#0ea5a0]">35</span>
                <div>
                  <p className="text-sm text-gray-500 line-through">Age 42</p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">7 years younger!</p>
                </div>
              </div>
              <div className="mt-3 bg-white/60 dark:bg-black/20 rounded-xl px-3 py-2">
                <p className="text-xs text-gray-600 dark:text-gray-400">Keep going — you&apos;re in the top 15% of your age group.</p>
              </div>
            </motion.div>

            {/* AI Coach */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white dark:bg-[#161b22] rounded-2xl p-5 border border-gray-100 dark:border-gray-800"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-xl bg-[#0ea5a0] flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">AI Coach</p>
                  <p className="text-xs text-emerald-500">Online now</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-[#0d1117] rounded-xl p-3 mb-3 leading-relaxed">
                &ldquo;Great progress this week! Your consistency is paying off. Today&apos;s circuit will help with that core strength you&apos;ve been building. 💪&rdquo;
              </p>
              <button className="w-full text-sm text-[#0ea5a0] font-medium flex items-center justify-center gap-1 hover:gap-2 transition-all cursor-pointer">
                Ask Coach <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>

            {/* Water */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="bg-white dark:bg-[#161b22] rounded-2xl p-5 border border-gray-100 dark:border-gray-800"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-blue-400" />
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">Water Intake</p>
                </div>
                <p className="text-xs text-gray-500">6 / 8 glasses</p>
              </div>
              <div className="flex gap-2">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className={`flex-1 h-8 rounded-lg transition-colors cursor-pointer ${
                      i < 6 ? "bg-blue-400" : "bg-gray-100 dark:bg-gray-800 hover:bg-blue-100"
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-2">2 more glasses to hit your goal</p>
            </motion.div>

            {/* Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white dark:bg-[#161b22] rounded-2xl p-5 border border-gray-100 dark:border-gray-800"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-[#0ea5a0]" />
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">Weight Trend</p>
                </div>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">−3.5 lbs</p>
              </div>
              <div className="flex items-end gap-1 h-12">
                {weightData.map((w, i) => {
                  const max = Math.max(...weightData);
                  const min = Math.min(...weightData);
                  const pct = (w - min) / (max - min + 1);
                  return (
                    <div
                      key={i}
                      className={`flex-1 rounded-t-sm transition-all ${i === weightData.length - 1 ? "bg-[#0ea5a0]" : "bg-teal-100 dark:bg-teal-900/40"}`}
                      style={{ height: `${20 + pct * 28}px` }}
                    />
                  );
                })}
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-gray-400">7 days ago</span>
                <span className="text-xs text-gray-400">Today</span>
              </div>
            </motion.div>

            {/* Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="bg-white dark:bg-[#161b22] rounded-2xl p-5 border border-gray-100 dark:border-gray-800"
            >
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-4 h-4 text-amber-500" />
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Achievements</p>
              </div>
              <div className="flex gap-2">
                {[
                  { emoji: "🔥", label: "4-Day Streak" },
                  { emoji: "💪", label: "First Workout" },
                  { emoji: "🥗", label: "Nutrition Goal" },
                  { emoji: "🎯", label: "Step Master" },
                ].map((b, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1 bg-gray-50 dark:bg-[#0d1117] rounded-xl p-2">
                    <span className="text-xl">{b.emoji}</span>
                    <p className="text-[9px] text-gray-500 text-center leading-tight">{b.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Goal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-[#2a1f0d] dark:to-[#2a1a0d] rounded-2xl p-5 border border-amber-100 dark:border-amber-900"
            >
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-4 h-4 text-amber-500" />
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Goal Progress</p>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Lose 20 lbs</p>
              <div className="flex items-center gap-2 mb-1">
                <div className="flex-1 bg-white/60 dark:bg-black/20 rounded-full h-2">
                  <motion.div
                    className="h-2 rounded-full bg-amber-400"
                    initial={{ width: 0 }}
                    animate={{ width: "35%" }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.8 }}
                  />
                </div>
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400">35%</span>
              </div>
              <p className="text-xs text-gray-500">7 lbs down · 13 lbs to go</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
