"use client";
import { motion } from "framer-motion";
import { Badge } from "../ui/Badge";
import { ImagePlaceholder } from "../ui/ImagePlaceholder";
import {
  MessageSquare, Timer, Target, Apple, BarChart3,
  TrendingUp, CheckSquare, Video, FileText, Users,
} from "lucide-react";

const features = [
  {
    icon: MessageSquare,
    gradient: "from-teal-500 to-cyan-500",
    glow: "shadow-teal-500/30",
    lightBg: "bg-teal-500/10 border-teal-500/20",
    title: "AI Daily Coach",
    description: "Every morning, your coach checks in: How are you feeling? Your entire day adapts instantly.",
    highlight: "Adapts to your energy",
    tag: "🤖 AI-Powered",
  },
  {
    icon: Timer,
    gradient: "from-amber-500 to-orange-500",
    glow: "shadow-amber-500/30",
    lightBg: "bg-amber-500/10 border-amber-500/20",
    title: "Time-Based Workouts",
    description: "10 minutes? 30 minutes? Just tell Forma how long you have. A workout is generated instantly.",
    highlight: "10 minutes minimum",
    tag: "⚡ Instant",
  },
  {
    icon: Target,
    gradient: "from-blue-500 to-indigo-500",
    glow: "shadow-blue-500/30",
    lightBg: "bg-blue-500/10 border-blue-500/20",
    title: "Smart Fitness Plans",
    description: "AI generates plans based on your age, weight, goals, injuries, and available equipment.",
    highlight: "100% personalized",
    tag: "🎯 Personalized",
  },
  {
    icon: Apple,
    gradient: "from-emerald-500 to-green-500",
    glow: "shadow-emerald-500/30",
    lightBg: "bg-emerald-500/10 border-emerald-500/20",
    title: "Nutrition Guidance",
    description: "Realistic calorie targets, meal suggestions, and grocery lists that work for the whole family.",
    highlight: "Family-friendly plans",
    tag: "🥗 Nutrition",
  },
  {
    icon: BarChart3,
    gradient: "from-purple-500 to-violet-500",
    glow: "shadow-purple-500/30",
    lightBg: "bg-purple-500/10 border-purple-500/20",
    title: "Progress Dashboard",
    description: "Track weight, waist, workouts, steps, sleep, and energy. Beautiful charts showing real progress.",
    highlight: "See your transformation",
    tag: "📊 Analytics",
  },
  {
    icon: TrendingUp,
    gradient: "from-rose-500 to-pink-500",
    glow: "shadow-rose-500/30",
    lightBg: "bg-rose-500/10 border-rose-500/20",
    title: "Fitness Age",
    description: "Discover your real Fitness Age vs actual age. Age 42, Fitness Age 35? That's your motivation.",
    highlight: "Feel younger",
    tag: "🔥 Motivation",
  },
  {
    icon: CheckSquare,
    gradient: "from-orange-500 to-red-500",
    glow: "shadow-orange-500/30",
    lightBg: "bg-orange-500/10 border-orange-500/20",
    title: "Habit Tracking",
    description: "Track water, sleep, walking, exercise, and nutrition. Build streaks, earn badges.",
    highlight: "Build streaks",
    tag: "🏆 Gamified",
  },
  {
    icon: Video,
    gradient: "from-indigo-500 to-blue-600",
    glow: "shadow-indigo-500/30",
    lightBg: "bg-indigo-500/10 border-indigo-500/20",
    title: "AI Form Review",
    description: "Upload an exercise video. AI analyzes posture, squat form, and gives feedback.",
    highlight: "Like having a trainer",
    tag: "📹 Video AI",
  },
  {
    icon: FileText,
    gradient: "from-cyan-500 to-teal-600",
    glow: "shadow-cyan-500/30",
    lightBg: "bg-cyan-500/10 border-cyan-500/20",
    title: "Monthly Health Report",
    description: "A beautiful PDF each month with progress, fitness age changes, and next month's goals.",
    highlight: "Your health story",
    tag: "📋 Reports",
  },
  {
    icon: Users,
    gradient: "from-pink-500 to-rose-500",
    glow: "shadow-pink-500/30",
    lightBg: "bg-pink-500/10 border-pink-500/20",
    title: "Community Challenges",
    description: "Join 10,000 Step Challenges, 30-Day Consistency events, and seasonal challenges.",
    highlight: "Never alone",
    tag: "👥 Community",
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-24 px-5 sm:px-8 overflow-hidden">
      {/* Soft lavender/mint pastel background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f0f4ff] via-[#f5f8ff] to-[#edfaf7]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(20,184,166,0.08)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_100%_80%,rgba(139,92,246,0.06)_0%,transparent_50%)]" />

      {/* Animated floating orbs */}
      <motion.div
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-1/4 w-40 h-40 rounded-full bg-teal-500/10 blur-2xl pointer-events-none"
      />
      <motion.div
        animate={{ y: [0, 15, 0], x: [0, -10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-20 left-1/4 w-52 h-52 rounded-full bg-purple-500/10 blur-2xl pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge color="teal" className="mb-5">
            Everything You Need
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            Your personal trainer,{" "}
            <span className="gradient-text">health coach,</span>
            <br />and accountability partner.
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Everything you need to get healthier — without overcomplicating your already busy life.
          </p>
        </motion.div>

        {/* Feature cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className={`group relative bg-white hover:bg-white border border-gray-100 hover:border-gray-200 rounded-2xl p-6 flex flex-col gap-4 cursor-default overflow-hidden transition-all duration-300 shadow-sm hover:shadow-xl ${f.glow}`}
              >
                {/* Corner glow on hover */}
                <div className={`absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br ${f.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`} />

                {/* Tag */}
                <span className="text-xs font-semibold text-gray-400 tracking-wide">{f.tag}</span>

                {/* Icon */}
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${f.gradient} flex items-center justify-center shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{f.description}</p>
                </div>

                <div className="mt-auto border-t border-gray-100 pt-3">
                  <p className="text-xs font-semibold text-transparent bg-clip-text bg-gradient-to-r ${f.gradient}">
                    <span className={`text-transparent bg-clip-text bg-gradient-to-r ${f.gradient}`}>
                      ✦ {f.highlight}
                    </span>
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Feature spotlight — image placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6 bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm"
        >
          <div className="flex flex-col justify-center gap-5">
            <Badge color="purple" className="self-start !bg-purple-500/20 !text-purple-300 border border-purple-500/30">
              Premium Feature
            </Badge>
            <h3 className="text-3xl font-bold text-gray-900 leading-tight">
              AI Form Review —<br />
              <span className="gradient-text-purple">real-time feedback</span>
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Upload a short video of any exercise. Our AI analyzes posture, range of motion, and technique — then gives you specific, actionable coaching notes. Like having a personal trainer watching every rep.
            </p>
            <div className="flex flex-wrap gap-3">
              {["Squat analysis", "Push-up form", "Mobility check", "Posture scan"].map((t) => (
                <span key={t} className="px-3 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/25 text-purple-300 text-xs font-medium">{t}</span>
              ))}
            </div>
          </div>
          <div>
            <ImagePlaceholder
              folder="images/features"
              filename="ai-form-review.jpg"
              label="Add a screenshot or photo of someone recording their workout form — maybe holding phone at arm's length"
              aspectRatio="aspect-video"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
