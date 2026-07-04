"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Zap, Send, Bot, User } from "lucide-react";

const energyOptions = ["Great! 💪", "Good 😊", "Tired 😴", "Exhausted 🥱"];
const timeOptions = ["10 min", "15 min", "20 min", "30 min"];

const workouts: Record<string, Record<string, { title: string; steps: string[]; note: string }>> = {
  "Great! 💪": {
    "10 min": {
      title: "High-Intensity Power Circuit",
      steps: ["Jumping Jacks × 40", "Push-ups × 15", "Jump Squats × 12", "Mountain Climbers × 30s"],
      note: "You're full of energy — let's burn it! 🔥",
    },
    "20 min": {
      title: "Full Body HIIT",
      steps: ["Dynamic warm-up 3 min", "HIIT circuit × 3 rounds", "Core finisher 2 min"],
      note: "Perfect day for a big effort 💪",
    },
    "30 min": {
      title: "Strength + Cardio Combo",
      steps: ["Warm-up 5 min", "Upper body push × 3 sets", "Lower body pull × 3 sets", "10-min run"],
      note: "Full session — you've got this!",
    },
    "15 min": {
      title: "Power Circuit × 3",
      steps: ["Push-ups × 15", "Lunges × 12 each", "Burpees × 8", "Plank 45s"],
      note: "Efficient and effective on a great day",
    },
  },
  "Good 😊": {
    "10 min": {
      title: "Solid 10-Min Circuit",
      steps: ["Bodyweight Squats × 15", "Push-ups × 10", "Plank × 45s", "Lunges × 10"],
      note: "Steady and strong. You've got this 👊",
    },
    "20 min": {
      title: "Steady Strength Session",
      steps: ["Warm-up 3 min", "3 compound movements × 3 sets", "Light cardio finish 5 min"],
      note: "Perfect pacing for a good day",
    },
    "30 min": {
      title: "Balanced Full Workout",
      steps: ["Warm-up 5 min", "4 strength exercises × 3 sets", "5-min cool-down"],
      note: "Great day to build on your progress",
    },
    "15 min": {
      title: "Balanced Circuit",
      steps: ["Squats × 15", "Push-ups × 12", "Dumbbell rows × 10", "Plank × 45s"],
      note: "Quality over speed today",
    },
  },
  "Tired 😴": {
    "10 min": {
      title: "Gentle Movement Flow",
      steps: ["5-min easy walk", "Hip circles", "Shoulder rolls", "3 easy yoga poses"],
      note: "Movement is medicine, even gentle movement 🌿",
    },
    "20 min": {
      title: "Restorative Flow",
      steps: ["Mobility work 8 min", "Light stretching 8 min", "Breathing exercises 4 min"],
      note: "Rest days are when you actually get stronger",
    },
    "30 min": {
      title: "Recovery Day Protocol",
      steps: ["Foam rolling 10 min", "Yoga flow 15 min", "Meditation 5 min"],
      note: "Recovery is training. Embrace it 🧘",
    },
    "15 min": {
      title: "Active Recovery",
      steps: ["Easy walking 8 min", "Light stretching 5 min", "Deep breathing 2 min"],
      note: "Being tired is okay — showing up matters",
    },
  },
  "Exhausted 🥱": {
    "10 min": {
      title: "Micro Movement Reset",
      steps: ["3 deep belly breaths", "Gentle neck rolls", "Seated stretches 5 min"],
      note: "Today's win: you opened the app. That counts ❤️",
    },
    "20 min": {
      title: "Full Rest Recovery",
      steps: ["Guided breathing 8 min", "Restorative yoga 10 min", "Body scan 2 min"],
      note: "Sleep and rest are part of your fitness plan",
    },
    "30 min": {
      title: "Complete Rest Day",
      steps: ["Sleep hygiene tips", "Nutrition focus today", "Tomorrow's plan preview"],
      note: "Rest is a strategy, not a failure 💙",
    },
    "15 min": {
      title: "Recharge Session",
      steps: ["Box breathing 5 min", "Gentle walk 8 min", "Hydration focus"],
      note: "Be kind to yourself. Tomorrow is a new day",
    },
  },
};

const chatMessages = [
  { role: "bot", text: "Good morning! How are you feeling today?" },
  { role: "user", text: "Pretty tired — had a late night with the kids." },
  { role: "bot", text: "Totally get it. Let's dial it back today. How much time do you have?" },
  { role: "user", text: "Maybe 15 minutes max." },
  { role: "bot", text: "Perfect. I've got a gentle active recovery session — no intensity, just movement to help you feel better and stay consistent. 💪" },
];

export function DailyCoach() {
  const [energy, setEnergy] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [showWorkout, setShowWorkout] = useState(false);

  const workout = energy && time ? workouts[energy]?.[time] : null;

  return (
    <section className="relative py-24 px-5 sm:px-8 overflow-hidden">
      {/* Soft sky/indigo pastel background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f0f5ff] via-[#f5f8ff] to-[#eef4ff]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-200 to-transparent" />
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-blue-200/50 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-indigo-200/40 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge color="teal" className="mb-5">🤖 AI Coach</Badge>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            Try your AI coach{" "}
            <span className="gradient-text">right now</span>
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            No signup needed. See how Forma adapts your workout based on how you actually feel.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Interactive demo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-7 border border-blue-100 shadow-xl shadow-blue-100/60"
          >
            <div className="flex items-center gap-3 mb-7">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-teal-500/30">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-bold text-gray-900 dark:text-white">Forma AI Coach</p>
                <p className="text-xs text-emerald-500 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                  Online · Responds instantly
                </p>
              </div>
            </div>

            <div className="mb-5">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                How are you feeling today?
              </p>
              <div className="grid grid-cols-2 gap-2">
                {energyOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => { setEnergy(opt); setTime(null); setShowWorkout(false); }}
                    className={`py-3 px-4 rounded-xl text-sm font-medium border-2 transition-all duration-200 cursor-pointer ${
                      energy === opt
                        ? "border-teal-500 bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 shadow-md"
                        : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-teal-300 hover:bg-teal-50/50 dark:hover:bg-teal-900/10"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <AnimatePresence>
              {energy && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-5"
                >
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    How much time do you have?
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    {timeOptions.map((t) => (
                      <button
                        key={t}
                        onClick={() => { setTime(t); setShowWorkout(false); }}
                        className={`py-2.5 rounded-xl text-sm font-semibold border-2 transition-all duration-200 cursor-pointer ${
                          time === t
                            ? "border-amber-500 bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300"
                            : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-amber-300"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {energy && time && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Button
                  className="w-full justify-center"
                  onClick={() => setShowWorkout(true)}
                  icon={<Zap className="w-4 h-4" />}
                >
                  Generate My Workout
                </Button>
              </motion.div>
            )}

            <AnimatePresence>
              {showWorkout && workout && (
                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="mt-5 rounded-2xl overflow-hidden border border-teal-200 dark:border-teal-800 shadow-lg"
                >
                  <div className="bg-gradient-to-r from-teal-500 to-cyan-500 px-5 py-3">
                    <p className="text-white font-bold text-sm">{workout.title}</p>
                    <p className="text-white/70 text-xs">{time} · Adapted for your energy</p>
                  </div>
                  <div className="bg-teal-50 dark:bg-teal-900/20 p-4">
                    <div className="flex flex-col gap-2 mb-3">
                      {workout.steps.map((step, i) => (
                        <div key={i} className="flex items-center gap-2.5">
                          <div className="w-5 h-5 rounded-full bg-teal-500 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">{i + 1}</div>
                          <span className="text-sm text-gray-700 dark:text-gray-300">{step}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-teal-700 dark:text-teal-400 font-medium italic">✦ {workout.note}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Chat preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#0d1b3e] rounded-3xl p-6 shadow-2xl shadow-blue-900/30 border border-blue-900/40"
          >
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/10">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span className="ml-2 text-xs text-white/40 font-mono">Forma AI Chat</span>
              <span className="ml-auto text-xs text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live
              </span>
            </div>

            <div className="flex flex-col gap-4 mb-6">
              {chatMessages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.role === "bot" ? "bg-gradient-to-br from-teal-500 to-cyan-400" : "bg-gradient-to-br from-amber-400 to-orange-400"}`}>
                    {msg.role === "bot" ? <Bot className="w-4 h-4 text-white" /> : <User className="w-4 h-4 text-white" />}
                  </div>
                  <div className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "bot"
                      ? "bg-white/10 text-white/90 rounded-tl-sm"
                      : "bg-gradient-to-r from-amber-400 to-orange-400 text-white rounded-tr-sm shadow-lg"
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Suggestion chips */}
            <div className="flex flex-wrap gap-2 mb-4">
              {["What workout for today?", "What should I eat?", "Why am I tired?"].map((chip) => (
                <button key={chip} className="px-3 py-1.5 rounded-full bg-white/8 hover:bg-white/15 border border-white/10 text-white/60 text-xs transition-colors cursor-pointer">
                  {chip}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ask your coach anything..."
                className="flex-1 bg-white/8 text-white placeholder-white/30 rounded-full px-4 py-2.5 text-sm outline-none border border-white/10 focus:border-teal-400/50"
                readOnly
              />
              <button className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-cyan-400 flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer shadow-lg shadow-teal-500/30">
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
