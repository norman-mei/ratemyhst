'use client'

import { useState } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'

import { Container } from '@/components/Container'
import ThemeToggleButton from '@/components/ThemeToggleButton'

const navLinks = [
  { href: '/#search', label: 'Find teachers' },
  { href: '/#schools', label: 'Schools' },
  { href: '/#reviews', label: 'Reviews' },
  { href: '/teachers/maya-chen-redwood-ridge-high', label: 'Sample profile' },
]

function NavLink({
  href,
  label,
  onClick,
}: {
  href: string
  label: string
  onClick?: () => void
}) {
  const pathname = usePathname()
  const isAnchor = href.startsWith('/#')
  const isActive = isAnchor ? pathname === '/' : pathname === href

  return (
    <Link
      href={href}
      onClick={onClick}
      className={clsx(
        'text-sm font-semibold transition hover:text-emerald-500 dark:hover:text-emerald-300',
        isActive
          ? 'text-emerald-600 dark:text-emerald-300'
          : 'text-zinc-500 dark:text-zinc-300',
      )}
    >
      {label}
    </Link>
  )
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-100/80 bg-white/90 backdrop-blur dark:border-zinc-800/60 dark:bg-black/70">
      <Container>
        <div className="flex items-center justify-between py-5">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            <span className="text-emerald-600 dark:text-emerald-400">
              RateMyHST
            </span>{' '}
            <span className="text-zinc-800 dark:text-zinc-100">
              by RateMyHighSchoolTeachers
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <NavLink key={link.href} {...link} />
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggleButton />
            <Link
              href="#submit-review"
              className="hidden rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-600/30 transition hover:-translate-y-0.5 lg:inline-flex"
            >
              Add review
            </Link>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-3 py-2 text-sm font-semibold text-zinc-700 transition hover:border-emerald-400 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-emerald-400 lg:hidden"
              onClick={() => setMenuOpen((open) => !open)}
            >
              Menu
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="pb-5 lg:hidden">
            <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <nav className="space-y-3">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.href}
                    {...link}
                    onClick={() => setMenuOpen(false)}
                  />
                ))}
                <Link
                  href="#submit-review"
                  onClick={() => setMenuOpen(false)}
                  className="block text-sm font-semibold text-emerald-600 transition hover:text-emerald-500 dark:text-emerald-300"
                >
                  Add review
                </Link>
              </nav>
            </div>
          </div>
        )}
      </Container>
    </header>
  )
}
