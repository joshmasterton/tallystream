'use client';

import Link from "next/link";
import { Users, Briefcase, FileText, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
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
      duration: 0.4,
      ease: [0.22, 0.61, 0.36, 1] as const
    }
  }
};

export default function DashboardPage() {
  const [stats, setStats] = useState({ users: 0, clients: 0, invoices: 0 });
  const [recentInvoices, setRecentInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated data fetching - replace with actual API calls
    async function fetchData() {
      try {
        // Mock data for demo
        await new Promise(resolve => setTimeout(resolve, 300));
        setStats({ users: 1, clients: 1, invoices: 1 });
        setRecentInvoices([{
          id: '1',
          invoiceNumber: 'INV-001',
          status: 'PAID',
          totalCents: 150000,
          currency: 'USD',
          client: { company: 'Acme Corp', contactName: 'John Doe' }
        }]);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <main className="mx-auto max-w-5xl px-6 py-10">
        <motion.div 
          className="mb-6 h-8 w-48 animate-pulse rounded" 
          style={{ backgroundColor: 'var(--muted)', opacity: 0.2 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.2, y: 0 }}
          transition={{ duration: 0.4 }}
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[1, 2, 3].map((i, idx) => (
            <motion.div 
              key={i} 
              className="glass p-6 rounded-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
            >
              <div className="flex items-center justify-between">
                <div className="h-4 w-16 animate-pulse rounded" style={{ backgroundColor: 'var(--muted)', opacity: 0.2 }} />
                <div className="h-10 w-10 animate-pulse rounded-md" style={{ background: 'rgba(var(--accent-rgb),0.15)' }} />
              </div>
              <div className="mt-3 h-9 w-12 animate-pulse rounded" style={{ backgroundColor: 'var(--muted)', opacity: 0.2 }} />
            </motion.div>
          ))}
        </div>
      </main>
    );
  }

  return (
    <motion.main 
      className="mx-auto max-w-5xl px-6 py-10"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1 className="mb-6 text-3xl font-bold" variants={itemVariants}>
        Dashboard
      </motion.h1>

      <motion.div className="grid grid-cols-1 gap-4 sm:grid-cols-3" variants={containerVariants}>
        <StatCard label="Users" value={stats.users} icon={Users} />
        <StatCard label="Clients" value={stats.clients} icon={Briefcase} />
        <StatCard label="Invoices" value={stats.invoices} icon={FileText} />
      </motion.div>

      <motion.section className="mt-10" variants={itemVariants}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold tracking-wide" style={{ color: 'var(--muted)' }}>Recent Invoices ({recentInvoices.length})</h2>
          <Link href="/invoices/new" className="btn-primary focus-ring inline-flex items-center gap-2">
            New Invoice <span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg></span>
          </Link>
        </div>
        {recentInvoices.length === 0 ? (
          <div className="glass p-12 rounded-md text-center">
            <p style={{ color: 'var(--muted)' }}>No invoices yet. Create your first invoice to get started.</p>
          </div>
        ) : (
          <div className="glass rounded-md overflow-hidden">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
                  <th className="text-left px-5 py-3 text-xs font-semibold tracking-wide" style={{ color: 'var(--muted-alt)' }}>INVOICE #</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold tracking-wide" style={{ color: 'var(--muted-alt)' }}>CLIENT</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold tracking-wide" style={{ color: 'var(--muted-alt)' }}>STATUS</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold tracking-wide" style={{ color: 'var(--muted-alt)' }}>TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {recentInvoices.map((inv, idx) => (
                  <tr 
                    key={inv.id}
                    style={{ 
                      borderBottom: idx < recentInvoices.length - 1 ? '1px solid var(--glass-border)' : 'none',
                      transition: 'background-color var(--theme-dur) var(--theme-ease)'
                    }}
                    className="hover:bg-[var(--glass-hover)]"
                  >
                    <td className="px-5 py-4 font-medium" style={{ color: 'var(--foreground)' }}>{inv.invoiceNumber}</td>
                    <td className="px-5 py-4" style={{ color: 'var(--muted)' }}>{inv.client?.company ?? inv.client?.contactName ?? '—'}</td>
                    <td className="px-5 py-4"><span className={inv.status === 'PAID' ? 'badge-success' : 'badge-neutral'}>{inv.status}</span></td>
                    <td className="px-5 py-4 font-semibold" style={{ color: 'var(--foreground)' }}>{(inv.totalCents / 100).toFixed(2)} {inv.currency}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.section>
    </motion.main>
  );
}

function StatCard({ label, value, icon: Icon }: { label: string; value: number; icon: React.ElementType }) {
  return (
    <motion.div
      className="glass p-6 rounded-md"
      variants={itemVariants}
    >
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium" style={{ color: 'var(--muted)' }}>{label}</div>
        <div className="flex h-10 w-10 items-center justify-center rounded-md" style={{ background: 'rgba(var(--accent-rgb),0.15)', color: 'var(--accent)' }}>
          <Icon className="h-5 w-5" strokeWidth={1.6} />
        </div>
      </div>
      <div className="mt-3 text-3xl font-semibold" style={{ color: 'var(--foreground)' }}>
        {value}
      </div>
    </motion.div>
  );
}
