"use client";
import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  padding?: string;
  border?: boolean;
  hoverLift?: boolean;
}

const springTransition: any = {
  type: "spring" as const,
  stiffness: 340,
  damping: 30,
  mass: 0.6
};

export function GlassCard({
  children,
  padding = "p-5",
  border = true,
  hoverLift = true,
  className = "",
  ...rest
}: GlassCardProps) {
  return (
    <motion.div
      {...rest}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 0.9, 0.3, 1] }}
      whileHover={hoverLift ? { y: -4, transition: springTransition } : undefined}
      className={
        `glass ${padding} ${border ? 'accent-border' : ''} rounded-md relative overflow-hidden ${className}`.trim()
      }
    >
      {/* subtle inner gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-md"
        style={{
          background: "linear-gradient(145deg,rgba(var(--accent-rgb),0.05),transparent 60%)"
        }}
      />
      <div className="relative z-[1]">{children}</div>
    </motion.div>
  );
}

export function GlassGrid({ children, className = "", ...rest }: { children: ReactNode; className?: string }) {
  return (
    <div
      {...rest}
      className={`grid gap-5 md:grid-cols-2 xl:grid-cols-3 ${className}`.trim()}
    >
      {children}
    </div>
  );
}
