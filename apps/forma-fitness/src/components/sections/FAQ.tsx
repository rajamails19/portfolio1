"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "../ui/Badge";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "I'm really out of shape. Is Forma still for me?",
    a: "Absolutely. Forma is designed specifically for people starting from scratch or returning after a long break. Your plan starts exactly where you are — no judgment, no comparison.",
  },
  {
    q: "How much time do I need each day?",
    a: "As little as 10 minutes. Forma works around your schedule, not the other way around. You tell us how much time you have, and we build the workout around it.",
  },
  {
    q: "Do I need gym equipment?",
    a: "No equipment needed. Forma generates bodyweight workouts that can be done anywhere — living room, hotel room, backyard. If you have equipment, great — Forma will use it too.",
  },
  {
    q: "I've tried other fitness apps and quit. Why will this be different?",
    a: "Most apps give you a generic plan and expect you to follow it perfectly. Forma adapts every single day to how you're actually feeling and how much time you have. It meets you where you are.",
  },
  {
    q: "Is the AI coach actually helpful or just gimmicky?",
    a: "The AI coach is trained on exercise science, nutrition research, and behavior change psychology. It remembers your goals, your history, and your preferences. Think of it as a real coach who never forgets and is always available.",
  },
  {
    q: "Can I cancel my subscription?",
    a: "Yes, anytime — no questions asked. You can cancel from your account settings with one click. If you cancel, you keep access until the end of your billing period.",
  },
  {
    q: "Is my health data private?",
    a: "Your health data is encrypted at rest and in transit. We never sell your data. Ever. You can delete your account and all associated data at any time.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-24 px-5 sm:px-8 bg-white dark:bg-[#0d1117]">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge color="purple" className="mb-4">FAQ</Badge>
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
            Questions? We have{" "}
            <span className="gradient-text">answers.</span>
          </h2>
        </motion.div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-gray-50 dark:bg-[#161b22] rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left cursor-pointer"
              >
                <span className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base pr-4">
                  {faq.q}
                </span>
                <motion.div
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                </motion.div>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <p className="px-6 pb-6 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
