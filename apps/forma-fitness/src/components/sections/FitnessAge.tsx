"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Badge } from "../ui/Badge";
import { ImagePlaceholder } from "../ui/ImagePlaceholder";
import { TrendingDown, Award, Zap, Heart, Star } from "lucide-react";

function AnimatedCounter({ to, duration = 1.5, delay = 0 }: { to: number; duration?: number; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ delay }}
    >
      {inView ? (
        <motion.span>
          {to}
        </motion.span>
      ) : "—"}
    </motion.span>
  );
}

const stories = [
  {
    name: "Arun M.",
    role: "Software Engineer, 42",
    realAge: 42,
    fitnessAge: 35,
    lost: "22 lbs",
    weeks: 12,
    quote: "I thought my best years were behind me. After 3 months with Forma, my doctor was shocked at my numbers.",
    avatar: "AM",
    gradient: "from-teal-500 to-cyan-400",
    folder: "images/people",
    filename: "arun-testimonial.jpg",
    label: "Arun — friendly, professional, healthy-looking man 40s",
  },
  {
    name: "Priya S.",
    role: "Product Manager, 38",
    realAge: 38,
    fitnessAge: 31,
    lost: "14 lbs",
    weeks: 8,
    quote: "Two kids, crazy work hours. Forma is the first thing that actually fits my life — not the other way around.",
    avatar: "PS",
    gradient: "from-amber-500 to-orange-400",
    folder: "images/people",
    filename: "priya-testimonial.jpg",
    label: "Priya — happy mother of two, casual setting",
  },
  {
    name: "James K.",
    role: "Engineering Manager, 45",
    realAge: 45,
    fitnessAge: 38,
    lost: "18 lbs",
    weeks: 10,
    quote: "Lost 22 pounds and my back pain is completely gone. The 10-minute workouts were the game changer.",
    avatar: "JK",
    gradient: "from-purple-500 to-violet-400",
    folder: "images/people",
    filename: "james-testimonial.jpg",
    label: "James — confident man in 40s, after transformation",
  },
];

export function FitnessAge() {
  return (
    <section id="stories" className="relative py-24 px-5 sm:px-8 overflow-hidden">
      {/* Soft violet/lavender pastel */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#faf5ff] via-[#f8f5ff] to-[#fdf4ff]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-200 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-200 to-transparent" />

      {/* Floating blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-purple-200/50 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-violet-200/50 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge color="purple" className="mb-5">
            <TrendingDown className="w-3 h-3" /> Fitness Age
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            Your calendar age is just a number.
            <br />
            <span className="gradient-text-purple">Your Fitness Age tells the real story.</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Members who use Forma consistently lower their Fitness Age by an average of{" "}
            <span className="font-bold text-purple-600 dark:text-purple-400">6 years</span> in 90 days.
          </p>
        </motion.div>

        {/* Featured age comparison */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-16 bg-gradient-to-br from-[#6d28d9] to-[#4c1d95] rounded-3xl p-8 md:p-12 border border-purple-400/30 shadow-2xl shadow-purple-500/20 overflow-hidden relative"
        >
          {/* Decorative */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-violet-500/10 blur-3xl" />

          <div className="relative grid md:grid-cols-3 gap-8 items-center">
            {/* Before */}
            <div className="text-center">
              <p className="text-purple-400 text-sm font-semibold uppercase tracking-wide mb-3">Real Age</p>
              <div className="text-7xl font-black text-white/60 mb-2">42</div>
              <p className="text-gray-500 text-sm">When Arun started Forma</p>
            </div>

            {/* Arrow + result */}
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-purple-400" />
                <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-purple-400" />
              </div>
              <div className="text-center">
                <p className="text-purple-400 text-xs font-semibold uppercase tracking-wide mb-1">After 90 days</p>
                <p className="text-emerald-400 text-lg font-bold">↓ 7 years younger</p>
              </div>
            </div>

            {/* After */}
            <div className="text-center">
              <p className="text-teal-400 text-sm font-semibold uppercase tracking-wide mb-3">Fitness Age</p>
              <div className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400 mb-2">35</div>
              <p className="text-gray-500 text-sm">In the top 15% of his age group</p>
            </div>
          </div>

          {/* Metric pills */}
          <div className="relative mt-8 flex flex-wrap justify-center gap-3">
            {[
              { icon: Zap, label: "Energy Up 40%", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
              { icon: Heart, label: "Heart Health Improved", color: "text-rose-400", bg: "bg-rose-500/10 border-rose-500/20" },
              { icon: TrendingDown, label: "Lost 22 lbs", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
              { icon: Award, label: "90-Day Journey", color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border ${item.bg}`}
                >
                  <Icon className={`w-4 h-4 ${item.color}`} />
                  <span className={`text-sm font-medium ${item.color}`}>{item.label}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Success stories */}
        <div className="grid sm:grid-cols-3 gap-6">
          {stories.map((story, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-white rounded-2xl border border-purple-100 shadow-sm hover:shadow-xl overflow-hidden card-hover"
            >
              {/* Photo area */}
              <div className={`relative h-40 bg-gradient-to-br ${story.gradient}`}>
                <ImagePlaceholder
                  folder={story.folder}
                  filename={story.filename}
                  label={story.label}
                  aspectRatio="h-full"
                  className="border-0 rounded-none"
                />
                {/* Age badge */}
                <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/50 backdrop-blur rounded-xl px-3 py-1.5 shadow-lg">
                  <p className="text-[10px] text-gray-500 font-medium">Fitness Age</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-black text-teal-600">{story.fitnessAge}</span>
                    <span className="text-xs text-gray-400 line-through">{story.realAge}</span>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${story.gradient} flex items-center justify-center text-xs font-bold text-white flex-shrink-0`}>
                    {story.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white text-sm">{story.name}</p>
                    <p className="text-xs text-gray-500">{story.role}</p>
                  </div>
                </div>

                <div className="flex gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-semibold">−{story.lost}</span>
                  <span className="px-2.5 py-1 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs font-semibold">{story.weeks} weeks</span>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed italic mb-3">
                  &ldquo;{story.quote}&rdquo;
                </p>

                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-current" />)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
