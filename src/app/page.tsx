'use client';

import Link from "next/link";
import { ArrowRight, Zap, CreditCard, Users, FileText, ShieldCheck, PieChart } from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 0.61, 0.36, 1] as const
    }
  }
};

export default function Home() {
  return (
    <motion.main
      className="mx-auto max-w-6xl px-6 py-20"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Hero Section */}
      <motion.section className="relative" variants={itemVariants}>
        <div className="absolute inset-0 -z-10 opacity-0" aria-hidden>
          <div className="mx-auto h-full max-w-5xl bg-[radial-gradient(circle_at_30%_30%,rgba(var(--accent-rgb),0.18),transparent_60%)]" />
        </div>
        <div className="text-center">
          <motion.div
            className="inline-flex items-center gap-2 rounded-md px-3 py-1 text-xs font-medium tracking-wide glass"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 0.9, 0.3, 1] }}
          >
            <ShieldCheck className="h-4 w-4 text-[var(--accent)]" /> Secure Financial Invoicing
          </motion.div>
          <motion.h1
            className="mt-6 text-5xl font-bold leading-tight sm:text-6xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 0.9, 0.3, 1] }}
          >
            Modern invoicing
            <br className="hidden sm:block" /> for growing teams
          </motion.h1>
          <motion.p
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed"
            style={{ color: 'var(--muted)' }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 0.9, 0.3, 1] }}
          >
            Generate polished invoices, manage client relationships and track payments with clarity. A minimalist, high-performance financial workspace.
          </motion.p>
          <motion.div
            className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 0.9, 0.3, 1] }}
          >
            <Link href="/dashboard" className="btn-primary focus-ring inline-flex items-center justify-center gap-2">
              Get Started <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </Link>
            <Link href="/clients" className="btn-secondary focus-ring inline-flex items-center justify-center gap-2">
              View Clients <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </Link>
          </motion.div>
        </div>
        <motion.div
          className="mt-14 grid gap-5 sm:grid-cols-3"
          variants={containerVariants}
        >
          {[
            { icon: PieChart, label: 'Setup Time', value: '< 5 min' },
            { icon: FileText, label: 'PDF Export', value: 'Instant' },
            { icon: CreditCard, label: 'Status Updates', value: 'Real-time' }
          ].map((s, i) => (
            <motion.div
              key={s.label}
              variants={itemVariants}
              className="glass p-4 rounded-md flex items-center gap-3"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-md" style={{ background: 'rgba(var(--accent-rgb),0.15)', color: 'var(--accent)' }}>
                <s.icon className="h-5 w-5" strokeWidth={1.6} />
              </div>
              <div>
                <div className="text-sm font-medium" style={{ color: 'var(--muted)' }}>{s.label}</div>
                <div className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>{s.value}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Feature Grid */}

      <motion.section className="mt-24" variants={containerVariants}>
        <div className="text-center mb-12">
          <motion.h2 className="text-3xl font-bold" variants={itemVariants}>
            Purpose-built financial tooling
          </motion.h2>
          <motion.p className="mt-3" style={{ color: 'var(--muted)' }} variants={itemVariants}>
            Minimal surface. Maximum clarity.
          </motion.p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {[
            { title: 'Client Management', desc: 'All clients unified with searchable history and contact context.', icon: Users },
            { title: 'Invoice Generation', desc: 'Structured line items, taxes, currency, polished PDF export.', icon: FileText },
            { title: 'Payment Tracking', desc: 'Lifecycle states with reminders and reconciliation insights.', icon: CreditCard },
            { title: 'Fast & Secure', desc: 'Edge-delivered Next.js + Neon Postgres reliability stack.', icon: Zap },
          ].map((f) => (
            <motion.div
              key={f.title}
              className="glass p-6 rounded-md elevate-sm"
              variants={itemVariants}
              whileHover={{ scale: 1.015 }}
              transition={{ type: 'spring', stiffness: 220, damping: 18 }}
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-md" style={{ background: 'rgba(var(--accent-rgb),0.18)', color: 'var(--accent)' }}>
                <f.icon className="h-6 w-6" strokeWidth={1.4} />
              </div>
              <h3 className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section className="mt-28" variants={itemVariants}>
        <div className="glass p-12 rounded-md relative overflow-hidden text-center accent-border">
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(140deg,rgba(var(--accent-rgb),0.06),transparent 65%)' }} />
          <h2 className="text-3xl font-bold">
            Ready to streamline your invoicing?
          </h2>
          <p className="mt-4 text-lg max-w-2xl mx-auto" style={{ color: 'var(--muted)' }}>
            Launch a focused financial workspace in minutes. Clean UI, fast exports, transparent tracking.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/dashboard" className="btn-primary focus-ring inline-flex items-center justify-center gap-2">
              Get Started Free <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </Link>
            <Link href="/clients" className="btn-secondary focus-ring inline-flex items-center justify-center gap-2">
              Explore Features <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </motion.section>
    </motion.main>
  );
}
