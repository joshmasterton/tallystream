'use client';

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export function ClientsContent({ clients }: { clients: any[] }) {
  return (
    <motion.main 
      className="mx-auto max-w-5xl px-6 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold">
          Clients
        </h1>
      </motion.div>

      <motion.div 
        className="mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold tracking-wide" style={{ color: 'var(--muted)' }}>All Clients ({clients.length})</h2>
          <Link href="/clients/new" className="btn-primary focus-ring inline-flex items-center gap-2">
            New Client <span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg></span>
          </Link>
        </div>
        {clients.length === 0 ? (
          <div className="glass p-12 rounded-md text-center">
            <p style={{ color: 'var(--muted)' }}>No clients yet. Add your first client to get started.</p>
          </div>
        ) : (
          <div className="glass rounded-md overflow-hidden">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
                  <th className="text-left px-5 py-3 text-xs font-semibold tracking-wide" style={{ color: 'var(--muted-alt)' }}>COMPANY</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold tracking-wide" style={{ color: 'var(--muted-alt)' }}>CONTACT</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold tracking-wide" style={{ color: 'var(--muted-alt)' }}>EMAIL</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold tracking-wide" style={{ color: 'var(--muted-alt)' }}>CURRENCY</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((c, idx) => (
                  <tr 
                    key={c.id} 
                    style={{ 
                      borderBottom: idx < clients.length - 1 ? '1px solid var(--glass-border)' : 'none',
                      transition: 'background-color var(--theme-dur) var(--theme-ease)'
                    }}
                    className="hover:bg-[var(--glass-hover)]"
                  >
                    <td className="px-5 py-4 font-medium" style={{ color: 'var(--foreground)' }}>{c.company ?? '—'}</td>
                    <td className="px-5 py-4" style={{ color: 'var(--muted)' }}>{c.contactName ?? '—'}</td>
                    <td className="px-5 py-4" style={{ color: 'var(--muted)' }}>{c.email ?? '—'}</td>
                    <td className="px-5 py-4"><span className="badge-neutral">{c.currency}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      <motion.div 
        className="mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Link className="inline-flex items-center gap-1.5 text-sm text-[var(--muted)] transition-all hover:gap-2 hover:text-[var(--foreground)]" href="/dashboard">
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
          Back to Dashboard
        </Link>
      </motion.div>
    </motion.main>
  );
}
