'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import { ContainerInner, ContainerOuter } from '@/components/Container'
import { languageCopy, type LanguageChoice } from '@/lib/languageContent'

function NavLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className="text-white/80 transition hover:text-white dark:text-emerald-900 dark:hover:text-black"
    >
      {children}
    </Link>
  )
}

export function Footer() {
  const [language, setLanguage] = useState<LanguageChoice>('English')

  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<LanguageChoice>).detail
      if (detail) setLanguage(detail)
    }
    const current = document.documentElement.dataset
      .language as LanguageChoice
    if (current) setLanguage(current)
    window.addEventListener('rmhst-language-change', handler)
    return () => window.removeEventListener('rmhst-language-change', handler)
  }, [])

  const copy = languageCopy[language] ?? languageCopy.English
  return (
    <footer className="mt-32 flex-none bg-emerald-600 text-white dark:bg-emerald-400/90 dark:text-emerald-950">
      <ContainerOuter>
        <div className="pb-16 pt-10">
          <ContainerInner>
            <div className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white dark:text-black">
                  RateMyHighSchoolTeachers
                </p>
                <p className="mt-2 text-sm text-white/80 dark:text-emerald-900">
                  {copy.footerDescription}
                </p>
              </div>
              <nav className="flex flex-wrap justify-center gap-4 text-sm">
                <NavLink href="mailto:hello@ratemyhst.com">
                  {copy.footerContact}
                </NavLink>
              </nav>
            </div>
            <div className="mt-10 text-sm text-white/80 dark:text-emerald-900">
              <div className="flex w-full flex-wrap items-center justify-between gap-x-6 gap-y-3">
                <Link
                  href="/help"
                  className="transition hover:text-white dark:hover:text-black"
                >
                  {copy.footerLegal.help}
                </Link>
                <Link
                  href="/guidelines"
                  className="transition hover:text-white dark:hover:text-black"
                >
                  {copy.footerLegal.guidelines}
                </Link>
                <Link
                  href="/terms"
                  className="transition hover:text-white dark:hover:text-black"
                >
                  {copy.footerLegal.terms}
                </Link>
                <Link
                  href="/privacy"
                  className="transition hover:text-white dark:hover:text-black"
                >
                  {copy.footerLegal.privacy}
                </Link>
                <Link
                  href="/copyright"
                  className="transition hover:text-white dark:hover:text-black"
                >
                  {copy.footerLegal.copyright}
                </Link>
                <Link
                  href="/ca-notice"
                  className="transition hover:text-white dark:hover:text-black"
                >
                  {copy.footerLegal.caNotice}
                </Link>
              </div>
              <p className="mt-6 text-xs uppercase tracking-[0.2em] text-white/70 dark:text-emerald-900">
                © 2025 Rate My High School Teachers, LLC. All rights reserved.
              </p>
            </div>
          </ContainerInner>
        </div>
      </ContainerOuter>
    </footer>
  )
}
