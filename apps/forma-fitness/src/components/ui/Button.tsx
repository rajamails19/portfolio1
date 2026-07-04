"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  href?: string;
  className?: string;
  icon?: ReactNode;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  onClick,
  className = "",
  icon,
}: ButtonProps) {
  const base =
    "inline-flex items-center gap-2 font-semibold rounded-full cursor-pointer transition-all duration-200 select-none";

  const sizes = {
    sm: "px-5 py-2.5 text-sm",
    md: "px-7 py-3.5 text-base",
    lg: "px-9 py-4.5 text-lg",
  };

  const variants = {
    primary:
      "bg-[#0ea5a0] text-white hover:bg-[#0c8a86] shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40",
    secondary:
      "bg-[#f59e0b] text-white hover:bg-[#d97706] shadow-lg shadow-amber-500/25",
    ghost: "bg-transparent text-[#0ea5a0] hover:bg-[#e0f7f6] dark:hover:bg-teal-900/30",
    outline:
      "border-2 border-[#0ea5a0] text-[#0ea5a0] hover:bg-[#e0f7f6] dark:hover:bg-teal-900/30",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {icon && <span>{icon}</span>}
      {children}
    </motion.button>
  );
}
