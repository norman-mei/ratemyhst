import Link from 'next/link'

import { ContainerInner, ContainerOuter } from '@/components/Container'

const footerLinks = [
  { href: '/#search', label: 'Find teachers' },
  { href: '/#schools', label: 'Schools' },
  { href: '/#reviews', label: 'Reviews' },
  { href: 'mailto:hello@ratemyhst.com', label: 'Contact' },
]

const legalLinks = [
  { href: '/guidelines', label: 'Guidelines' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms & Conditions' },
  { href: '/copyright', label: 'Copyright Compliance' },
]

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
      className="transition hover:text-teal-500 dark:hover:text-teal-400"
    >
      {children}
    </Link>
  )
}

export function Footer() {
  return (
    <footer className="mt-32 flex-none">
      <ContainerOuter>
        <div className="border-t border-zinc-100 pb-16 pt-10 dark:border-[#18181b]/40">
          <ContainerInner>
            <div className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400">
                  RateMyHighSchoolTeachers
                </p>
                <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                  &copy; {new Date().getFullYear()} RateMyHST. Built to elevate
                  high school teaching with honest, caring feedback.
                </p>
              </div>
              <nav className="flex flex-wrap justify-center gap-4">
                {footerLinks.map((link) => (
                  <NavLink key={link.href} href={link.href}>
                    {link.label}
                  </NavLink>
                ))}
              </nav>
            </div>
            <nav className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-zinc-500 dark:text-zinc-400 sm:justify-end">
              {legalLinks.map((link) => (
                <NavLink key={link.href} href={link.href}>
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </ContainerInner>
        </div>
      </ContainerOuter>
    </footer>
  )
}
