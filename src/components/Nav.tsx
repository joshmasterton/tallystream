'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import ThemeToggle from '@/components/ThemeToggle';
import { Home, LayoutDashboard, Users, Menu, X } from 'lucide-react';

const links = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/clients', label: 'Clients', icon: Users },
];

export default function Nav() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="app-header sticky top-0 z-50 w-full" data-theme-container>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-sm font-bold tracking-tight" style={{ color: 'var(--foreground)' }}>
          <span style={{
            background: 'var(--gradient-accent)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Tallystream</span>
        </Link>
        <nav className="hidden items-center gap-1 text-sm sm:flex">
          {links.map((l) => {
            const active = pathname === l.href || (l.href !== '/' && pathname?.startsWith(l.href));
            const Icon = l.icon;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={
                  `flex items-center gap-1.5 rounded-md px-3 py-2 transition-all duration-300 icon-hover ` +
                  (active
                    ? 'nav-active'
                    : 'text-[var(--muted)] hover:text-[var(--foreground)] hover:shadow-sm')
                }
                aria-current={active ? 'page' : undefined}
              >
                <Icon className="h-4 w-4" strokeWidth={2} />
                <span className="hidden md:inline">{l.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden focus-ring inline-flex h-10 w-10 items-center justify-center rounded-md text-[var(--muted)] transition-colors hover:text-[var(--foreground)] glass"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="sm:hidden glass mt-px" style={{ borderTop: '1px solid var(--glass-border)' }}>
          <nav className="flex flex-col px-4 py-3 gap-1">
            {links.map((l) => {
              const active = pathname === l.href || (l.href !== '/' && pathname?.startsWith(l.href));
              const Icon = l.icon;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={
                    `flex items-center gap-2 rounded-md px-3 py-2.5 text-sm transition-all duration-300 icon-hover ` +
                    (active
                      ? 'nav-active'
                      : 'text-[var(--muted)] hover:text-[var(--foreground)] hover:shadow-sm')
                  }
                  aria-current={active ? 'page' : undefined}
                >
                  <Icon className="h-4 w-4" strokeWidth={2} />
                  {l.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
