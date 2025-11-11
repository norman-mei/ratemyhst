import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Container } from '@/components/Container'
import { findTeacherBySlug, teachers } from '@/lib/teachers'

type TeacherPageProps = {
  params: { slug: string }
}

const DATE_FORMATTER = new Intl.DateTimeFormat('en', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
})

export async function generateStaticParams() {
  return teachers.map((teacher) => ({ slug: teacher.slug }))
}

export async function generateMetadata({
  params,
}: TeacherPageProps): Promise<Metadata> {
  const teacher = findTeacherBySlug(params.slug)

  if (!teacher) {
    return {
      title: 'Teacher not found | RateMyHST',
    }
  }

  return {
    title: `${teacher.name} • ${teacher.school} | RateMyHST`,
    description: `${teacher.rating.toFixed(1)} average rating in ${teacher.subject}. ${teacher.tagline}`,
  }
}

export default function TeacherProfilePage({ params }: TeacherPageProps) {
  const teacher = findTeacherBySlug(params.slug)

  if (!teacher) {
    notFound()
  }

  return (
    <Container>
      <div className="py-12">
        <Link
          href="/"
          className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-500 dark:text-emerald-300"
        >
          ← Back to search
        </Link>
        <div className="mt-6 grid gap-8 lg:grid-cols-[1.8fr_1fr]">
          <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
              {teacher.subject}
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-900 dark:text-white">
              {teacher.name}{' '}
              <span className="text-lg text-zinc-500 dark:text-zinc-400">
                ({teacher.pronouns})
              </span>
            </h1>
            <p className="mt-2 text-base text-zinc-600 dark:text-zinc-300">
              {teacher.school} • {teacher.district}, {teacher.state}
            </p>
            <p className="mt-5 text-lg text-zinc-700 dark:text-zinc-200">
              {teacher.tagline}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-emerald-50 p-4 text-center dark:bg-emerald-900/30">
                <p className="text-4xl font-semibold text-emerald-600 dark:text-emerald-300">
                  {teacher.rating.toFixed(1)}
                </p>
                <p className="text-xs uppercase tracking-widest text-emerald-800 dark:text-emerald-200">
                  Avg rating
                </p>
                <p className="mt-1 text-xs text-emerald-800/80 dark:text-emerald-100/70">
                  {teacher.ratingCount} reviews
                </p>
              </div>
              <div className="rounded-2xl bg-zinc-50 p-4 text-center dark:bg-zinc-900/60">
                <p className="text-4xl font-semibold text-zinc-900 dark:text-white">
                  {(teacher.wouldTakeAgain * 100).toFixed(0)}%
                </p>
                <p className="text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                  Would take again
                </p>
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                  Difficulty {teacher.difficulty.toFixed(1)}
                </p>
              </div>
              <div className="rounded-2xl bg-zinc-50 p-4 text-center dark:bg-zinc-900/60">
                <p className="text-4xl font-semibold text-zinc-900 dark:text-white">
                  {teacher.yearsExperience}
                </p>
                <p className="text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                  Years teaching
                </p>
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                  {teacher.credentials}
                </p>
              </div>
            </div>

            <div className="mt-10 space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                  Teaching style
                </p>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-600 dark:text-zinc-300">
                  {teacher.teachingStyle.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                  Impact highlights
                </p>
                <div className="mt-3 grid gap-4 sm:grid-cols-2">
                  {teacher.impactStats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-center dark:border-zinc-800 dark:bg-zinc-900/60"
                    >
                      <p className="text-2xl font-semibold text-emerald-600 dark:text-emerald-300">
                        {stat.value}
                      </p>
                      <p className="text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-10 border-t border-zinc-100 pt-8 dark:border-zinc-800">
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold text-zinc-900 dark:text-white">
                  Recent reviews
                </p>
                <a
                  href="#submit-review"
                  className="rounded-full border border-emerald-500 px-4 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50 dark:border-emerald-400 dark:text-emerald-200 dark:hover:bg-emerald-400/10"
                >
                  Add your review
                </a>
              </div>
              <div className="mt-6 space-y-5">
                {teacher.reviews.map((review) => (
                  <article
                    key={review.id}
                    className="rounded-2xl border border-zinc-200 bg-white/70 p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/70"
                  >
                    <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
                      <span className="font-semibold text-zinc-700 dark:text-zinc-200">
                        {review.student}
                      </span>
                      <span>• {review.classTaken}</span>
                      <span>• {DATE_FORMATTER.format(new Date(review.date))}</span>
                    </div>
                    <p className="mt-3 text-base text-zinc-700 dark:text-zinc-200">
                      {review.comment}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                      <span>Rating {review.rating.toFixed(1)}</span>
                      <span>• Difficulty {review.difficulty.toFixed(1)}</span>
                      <span>• Would take again {review.takeAgain}</span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {review.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <p className="text-sm font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                Classroom culture
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {teacher.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-zinc-100 px-4 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-6 shadow-inner dark:border-emerald-400/30 dark:bg-emerald-900/10">
              <p className="text-sm font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-200">
                Highlights
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-4 text-sm text-emerald-900 dark:text-emerald-100">
                {teacher.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <p className="text-sm font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                Signal boost
              </p>
              <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">
                Students say this teacher excels at:
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-4 text-sm text-zinc-700 dark:text-zinc-200">
                {(teacher.reviews[0]?.tags ?? []).map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        <div
          id="submit-review"
          className="mt-10 rounded-3xl border border-dashed border-zinc-300 bg-zinc-50 p-8 text-center dark:border-zinc-800 dark:bg-zinc-900/40"
        >
          <p className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Your experience matters
          </p>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
            Coming soon: secure review submission with counselor verification.
            For now, email hello@ratemyhst.com to nominate updates.
          </p>
        </div>
      </div>
    </Container>
  )
}
