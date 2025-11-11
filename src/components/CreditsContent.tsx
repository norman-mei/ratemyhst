import Link from 'next/link'

import { GitHubIcon } from '@/components/SocialIcons'

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/ratemyhst',
    Icon: GitHubIcon,
  },
]

export default function CreditsContent({ showBackLink = true }: { showBackLink?: boolean }) {
  return (
    <div className="max-w-3xl space-y-10 rounded-3xl bg-white/90 p-10 text-zinc-800 shadow-xl backdrop-blur-sm dark:bg-zinc-900/90 dark:text-zinc-100 dark:shadow-black/30">
      <header className="space-y-4">
        {showBackLink && (
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--accent-600)] underline decoration-[var(--accent-100)] underline-offset-4 transition hover:text-[var(--accent-700)] hover:decoration-[var(--accent-400)] dark:text-[var(--accent-300)] dark:decoration-[var(--accent-400)] dark:hover:text-[var(--accent-200)]"
          >
            <span aria-hidden="true">←</span> Back to main page
          </Link>
        )}
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
          Credits
        </h1>
        <p className="text-base text-zinc-600 dark:text-zinc-400">
          RateMyHighSchoolTeachers (RateMyHST) is maintained by a small group of
          students, counselors, and instructional coaches who believe feedback
          should be constructive, specific, and accessible. We steward the
          product, moderation guidelines, and district partnerships.
        </p>
      </header>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-[#18181b] dark:bg-zinc-900">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          Stewardship team
        </h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          We design features, review moderation guidelines, and prioritize the
          roadmap with student voice at the center. Reach out if you&apos;d like
          to contribute data, stories, or research.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          {socialLinks.map(({ label, href, Icon }) => (
            <Link
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900 dark:border-[#18181b] dark:text-zinc-200 dark:hover:border-zinc-500 dark:hover:text-zinc-100"
              aria-label={label}
            >
              <Icon className="h-4 w-4 fill-current" />
              {label}
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-[#18181b] dark:bg-zinc-900">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          Community contributors
        </h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Designers, student leaders, and educators regularly share PRs, data
          stories, and moderation insights that shape RateMyHST. Every release
          reflects their lived classroom experience.
        </p>
        <Link
          href="https://github.com/ratemyhst"
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[var(--accent-600)] underline decoration-[var(--accent-300)] underline-offset-4 transition hover:decoration-[var(--accent-400)] dark:text-[var(--accent-300)] dark:decoration-[var(--accent-400)] dark:hover:decoration-[var(--accent-300)]"
        >
          Browse RateMyHST on GitHub
        </Link>
      </section>

      <footer className="pb-4 text-sm text-zinc-500 dark:text-zinc-400">
        Want to highlight a district, celebrate a teacher, or share research?
        Open an issue on GitHub or email{' '}
        <a
          href="mailto:hello@ratemyhst.com"
          className="font-medium text-emerald-600 underline decoration-emerald-200 dark:text-emerald-300"
        >
          hello@ratemyhst.com
        </a>
        .
      </footer>
    </div>
  )
}
