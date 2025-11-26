'use client'

import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import { usePathname, useRouter } from 'next/navigation'
import { Settings as SettingsIcon } from 'lucide-react'
import { useState } from 'react'

import { Container } from '@/components/Container'
import ThemeToggleButton from '@/components/ThemeToggleButton'
import { emitOpenSettingsModalEvent } from '@/lib/settingsModalEvent'
import { useAuth } from '@/context/AuthContext'
import { useUserSettings } from '@/context/UserSettingsContext'
import { getLanguageCopy } from '@/lib/languageContent'

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
  const router = useRouter()
  const { user, loading, logoutLocally, refresh } = useAuth()
  const { settings } = useUserSettings()
  const languageCopy = getLanguageCopy(settings.language)
  const headerCopy = languageCopy.header
  const profileCopy = languageCopy.profilePanel
  const navLinks = [
    { href: '/#search', label: headerCopy.navFindTeachers },
    { href: '/#schools', label: headerCopy.navSchools },
  ]

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
    } catch (error) {
      console.error(error)
    } finally {
      logoutLocally()
      setMenuOpen(false)
      router.refresh()
      await refresh()
    }
  }

  const openSettings = () => {
    emitOpenSettingsModalEvent()
    setMenuOpen(false)
  }

  const profileInitial = (
    user?.firstName?.charAt(0) ||
    user?.lastName?.charAt(0) ||
    user?.email?.charAt(0) ||
    'U'
  ).toUpperCase()

  const userControls = user ? (
    <Link
      href="/profile"
      className="inline-flex items-center justify-center rounded-full border border-zinc-300 p-2 text-sm font-semibold text-zinc-700 transition hover:border-emerald-400 hover:text-emerald-600 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-emerald-400"
      aria-label={headerCopy.openProfile}
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-sm font-semibold text-white">
        {profileInitial}
      </span>
    </Link>
  ) : (
    <>
      <Link
        href="/login"
        className="hidden rounded-full border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:border-emerald-400 hover:text-emerald-600 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-emerald-400 lg:inline-flex"
      >
        {headerCopy.login}
      </Link>
      <Link
        href="/signup"
        className="hidden rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-600/30 transition hover:-translate-y-0.5 lg:inline-flex"
      >
        {headerCopy.signup}
      </Link>
    </>
  )

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-100/80 bg-white/90 backdrop-blur dark:border-zinc-800/60 dark:bg-black/70">
      <Container>
        <div className="flex items-center justify-between py-5">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 text-lg font-semibold tracking-tight">
              <Image
                src="/images/favicon.ico"
                alt="RateMyHST logo"
                width={28}
                height={28}
                className="h-7 w-7 rounded-lg shadow-sm"
                priority
              />
              <span>
                <span className="text-emerald-600 dark:text-emerald-400">RateMyHST</span>{' '}
                <span className="text-zinc-800 dark:text-zinc-100">{headerCopy.brandSuffix}</span>
              </span>
            </Link>
            <nav className="hidden items-center gap-6 lg:flex">
              {navLinks.map((link) => (
                <NavLink key={link.href} {...link} />
              ))}
              {!loading && user && (
                <NavLink href="/profile?tab=my-reviews" label={headerCopy.myReviews} />
              )}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggleButton />
            <button
              type="button"
              onClick={emitOpenSettingsModalEvent}
              className="inline-flex items-center justify-center rounded-full border border-zinc-300 p-2 text-sm font-semibold text-zinc-700 transition hover:border-emerald-400 hover:text-emerald-600 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-emerald-400"
              aria-label={headerCopy.openSettings}
            >
              <SettingsIcon className="h-4 w-4" />
            </button>
            {!loading && userControls}
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-3 py-2 text-sm font-semibold text-zinc-700 transition hover:border-emerald-400 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-emerald-400 lg:hidden"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {headerCopy.menu}
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
                {!loading && user && (
                  <NavLink
                    href="/profile?tab=my-reviews"
                    label={headerCopy.myReviews}
                    onClick={() => setMenuOpen(false)}
                  />
                )}
                {user ? (
                  <div className="pt-3 text-sm text-zinc-600 dark:text-zinc-300">
                    <p className="font-semibold">{user.email}</p>
                    <div className="mt-3 flex flex-col gap-3">
                      <Link
                        href="/profile"
                        onClick={() => setMenuOpen(false)}
                        className="rounded-full border border-zinc-300 px-4 py-2 text-center font-semibold text-zinc-700 transition hover:border-emerald-400 hover:text-emerald-600 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-emerald-400"
                      >
                        {profileCopy.tabs.profile}
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          openSettings()
                        }}
                        className="rounded-full border border-zinc-300 px-4 py-2 font-semibold text-zinc-700 transition hover:border-emerald-400 hover:text-emerald-600 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-emerald-400"
                      >
                        {headerCopy.accountSettings}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleLogout()}
                        className="rounded-full border border-zinc-300 px-4 py-2 font-semibold text-zinc-700 transition hover:border-emerald-400 hover:text-emerald-600 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-emerald-400"
                      >
                        {headerCopy.logout}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3 pt-3">
                    <Link
                      href="/login"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-center rounded-full border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:border-emerald-400 hover:text-emerald-600 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-emerald-400"
                    >
                      {headerCopy.login}
                    </Link>
                    <Link
                      href="/signup"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-center rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-600/30 transition hover:-translate-y-0.5"
                    >
                      {headerCopy.signup}
                    </Link>
                  </div>
                )}
              </nav>
            </div>
          </div>
        )}
      </Container>
    </header>
  )
}
