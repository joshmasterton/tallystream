'use client';

import { useEffect, useState } from 'react';

function getInitialTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  const stored = window.localStorage.getItem('theme');
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>(getInitialTheme);

  // Apply theme to <html data-theme="...">
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <button
      type="button"
      onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
      aria-label="Toggle theme"
      className="focus-ring group inline-flex h-9 w-9 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] transition-transform hover:scale-105 hover:text-[var(--foreground)]"
    >
      <span className="sr-only">Toggle theme</span>
      {/* Sun / Moon icon swap */}
      <svg
        className="h-4 w-4 rotate-0 scale-100 transition-all group-[:has(+_)]:hidden"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
      <svg
        className="hidden h-4 w-4 transition-all group-[:has(+_)]:inline-block"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </button>
  );
}
