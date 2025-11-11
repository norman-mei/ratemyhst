import Link from 'next/link'

import { Container } from '@/components/Container'

export default function SpotlightSchools() {
  return (
    <section
      id="schools"
      className="border-t border-zinc-100/80 bg-zinc-50 py-20 dark:border-zinc-800 dark:bg-zinc-950"
    >
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-300">
              Whole-school view
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">
              District spotlights coming soon
            </h2>
            <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400">
              We&apos;re onboarding partner districts now. Once the first verified
              submissions are in, you&apos;ll be able to browse real school stories,
              standout programs, and teacher teams.
            </p>
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Want to be featured?{' '}
            <Link
              href="mailto:hello@ratemyhst.com"
              className="font-semibold text-emerald-600 dark:text-emerald-300"
            >
              Reach out to the team
            </Link>
            .
          </p>
        </div>

        <div className="mt-10 rounded-3xl border border-dashed border-emerald-200/70 bg-white/70 p-8 text-center text-sm text-zinc-600 dark:border-emerald-500/40 dark:bg-zinc-900/60 dark:text-zinc-300">
          Our moderation team is validating the first counselor and student submissions. Once
          that review is complete, this space will populate with authentic profiles instead of sample data.
        </div>
      </Container>
    </section>
  )
}
