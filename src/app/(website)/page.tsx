import { Container } from '@/components/Container'

const featurePanels = [
  {
    title: 'Manage and edit your ratings',
    description:
      'Keep every review current as semesters change. Update tone, workload, and classroom climate details whenever you need.',
  },
  {
    title: 'Your ratings are always anonymous',
    description:
      'RMHST shields your identity so you can focus on honest, constructive feedback that helps classmates and teachers grow.',
  },
  {
    title: 'Like or dislike ratings',
    description:
      'Let the community know which reviews resonate. Boost the most helpful insights and downvote anything that misses the mark.',
  },
]

export default function Home() {
  return (
    <main className="pb-24">
      <section className="pt-12 sm:pt-20">
        <Container>
          <div className="rounded-3xl border border-emerald-100 bg-gradient-to-br from-white via-emerald-50 to-white p-8 shadow-lg shadow-emerald-100/70 dark:border-emerald-500/30 dark:from-zinc-900 dark:via-emerald-900/20 dark:to-zinc-900">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700 dark:text-emerald-200">
              Enter your school to get started
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
              Your next RMHST search begins here
            </h1>
            <p className="mt-4 text-base text-zinc-600 dark:text-zinc-300">
              Search by school to see teachers, programs, and culture indicators—or jump straight to a specific
              educator. Every path keeps student voices centered.
            </p>
            <form className="mt-6 flex flex-col gap-4 sm:flex-row" action="#" method="get">
              <div className="flex-1">
                <label htmlFor="school-search" className="sr-only">
                  School name
                </label>
                <input
                  id="school-search"
                  name="school"
                  type="text"
                  placeholder="Search for your school"
                  className="w-full rounded-2xl border border-emerald-200/80 bg-white/80 px-4 py-3 text-base text-zinc-900 placeholder:text-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 dark:border-emerald-500/40 dark:bg-zinc-900/70 dark:text-white"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/40 transition hover:-translate-y-0.5"
              >
                Find my school
              </button>
            </form>
            <div className="mt-8 rounded-2xl border border-emerald-100 bg-white/80 p-6 dark:border-emerald-500/30 dark:bg-zinc-900/40">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-700 dark:text-emerald-200">
                I&apos;d like to look up a teacher by name
              </p>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                Type a teacher&apos;s name to pull up their classroom stats, recent feedback, and reactions.
              </p>
              <form className="mt-4 flex flex-col gap-4 sm:flex-row" action="#" method="get">
                <div className="flex-1">
                  <label htmlFor="teacher-search" className="sr-only">
                    Teacher name
                  </label>
                  <input
                    id="teacher-search"
                    name="teacher"
                    type="text"
                    placeholder="Search for a teacher"
                    className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-base text-zinc-900 placeholder:text-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-2xl border border-emerald-600/60 px-6 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50 dark:border-emerald-500 dark:text-emerald-200 dark:hover:bg-emerald-500/10"
                >
                  Look up a teacher
                </button>
              </form>
            </div>
          </div>
        </Container>
      </section>

      <section className="pt-16">
        <Container>
          <div className="rounded-3xl border border-emerald-100 bg-white/80 p-10 text-center shadow-lg dark:border-emerald-500/20 dark:bg-zinc-900/50">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700 dark:text-emerald-200">
              Join the RMHST Family
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
              Love RMHST? Let&apos;s make it official.
            </h2>
            <p className="mt-3 text-base text-zinc-600 dark:text-zinc-300">
              Lock in your profile to unlock every community feature—school dashboards, verified ratings, and mentor
              shout-outs.
            </p>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {featurePanels.map((panel) => (
                <div
                  key={panel.title}
                  className="rounded-2xl border border-zinc-100 bg-gradient-to-br from-emerald-50 to-white p-6 text-left shadow-sm dark:border-zinc-800 dark:from-emerald-900/20 dark:to-zinc-900"
                >
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">{panel.title}</h3>
                  <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">{panel.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="pt-16">
        <Container>
          <div className="rounded-3xl bg-gradient-to-br from-emerald-600 via-emerald-500 to-emerald-600 p-10 text-white shadow-2xl">
            <div className="space-y-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-100/90">Sign up</p>
                <h3 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                  Claim your RMHST account today
                </h3>
                <p className="mt-3 text-base text-emerald-50/90">
                  Save favorite teachers, manage every review, and follow the schools that matter most.
                </p>
              </div>
              <form className="flex flex-col gap-4 sm:flex-row" action="#" method="post">
                <div className="flex-1">
                  <label htmlFor="signup-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="signup-email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="w-full rounded-2xl border border-white/50 bg-white/10 px-4 py-3 text-base text-white placeholder:text-emerald-100 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/60"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-emerald-700 shadow-lg shadow-white/30 transition hover:-translate-y-0.5"
                >
                  Sign up for RMHST
                </button>
              </form>
              <p className="text-sm text-emerald-50/80">
                We&apos;ll send a single invite link so you can confirm your school community and start rating.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}
