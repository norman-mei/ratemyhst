'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'

import { Container } from '@/components/Container'
import {
  teachers,
  getStateOptions,
  getSubjectOptions,
} from '@/lib/teachers'

type SortOption = 'match' | 'rating' | 'difficulty' | 'recent'

const sortLabels: Record<SortOption, string> = {
  match: 'Best match',
  rating: 'Highest rated',
  difficulty: 'Easiest to follow',
  recent: 'Newest reviews',
}

const formatDate = (dateString: string) => {
  try {
    return new Intl.DateTimeFormat('en', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date(dateString))
  } catch {
    return dateString
  }
}

const states = getStateOptions()
const subjects = getSubjectOptions()

const SearchField = ({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) => (
  <label className="flex flex-col text-sm font-medium text-zinc-700 dark:text-zinc-300">
    <span className="mb-2">{label}</span>
    {children}
  </label>
)

export default function TeacherSearchSection() {
  const [query, setQuery] = useState('')
  const [stateFilter, setStateFilter] = useState('all')
  const [subjectFilter, setSubjectFilter] = useState('all')
  const [sortBy, setSortBy] = useState<SortOption>('match')

  const filteredTeachers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    let results = teachers
      .filter((teacher) => {
        if (!normalizedQuery) {
          return true
        }
        const haystack = [
          teacher.name,
          teacher.subject,
          teacher.school,
          teacher.district,
          teacher.tagline,
        ]
          .join(' ')
          .toLowerCase()
        return normalizedQuery
          .split(/\s+/)
          .every((token) => haystack.includes(token))
      })
      .filter((teacher) =>
        stateFilter === 'all' ? true : teacher.state === stateFilter,
      )
      .filter((teacher) =>
        subjectFilter === 'all' ? true : teacher.subject === subjectFilter,
      )

    switch (sortBy) {
      case 'rating': {
        results = [...results].sort((a, b) => {
          if (b.rating === a.rating) {
            return b.ratingCount - a.ratingCount
          }
          return b.rating - a.rating
        })
        break
      }
      case 'difficulty': {
        results = [...results].sort((a, b) => a.difficulty - b.difficulty)
        break
      }
      case 'recent': {
        results = [...results].sort(
          (a, b) =>
            new Date(b.lastReview).getTime() -
            new Date(a.lastReview).getTime(),
        )
        break
      }
      default:
        break
    }

    return results.slice(0, 9)
  }, [query, sortBy, stateFilter, subjectFilter])

  return (
    <section id="search" className="py-20 sm:py-28">
      <Container>
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-3xl border border-zinc-200/70 bg-white p-6 shadow-md dark:border-zinc-800 dark:bg-zinc-900/60">
            <div className="flex flex-col gap-6 lg:flex-row">
              <div className="flex-1 space-y-6">
                <SearchField label="Search by teacher, subject, or school">
                  <input
                    type="text"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Try “Physics Redwood” or “Cambridge biotech”"
                    className="rounded-2xl border border-zinc-300/80 bg-white px-4 py-2.5 text-sm text-zinc-900 shadow-sm outline-none ring-2 ring-transparent transition focus:ring-emerald-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                  />
                </SearchField>
                <div className="grid gap-4 sm:grid-cols-3">
                  <SearchField label="State">
                    <select
                      value={stateFilter}
                      onChange={(event) => setStateFilter(event.target.value)}
                      className="rounded-2xl border border-zinc-300/80 bg-white px-4 py-2.5 text-sm text-zinc-900 shadow-sm outline-none ring-2 ring-transparent transition focus:ring-emerald-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                    >
                      <option value="all">All states</option>
                      {states.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </SearchField>
                  <SearchField label="Subject">
                    <select
                      value={subjectFilter}
                      onChange={(event) =>
                        setSubjectFilter(event.target.value)
                      }
                      className="rounded-2xl border border-zinc-300/80 bg-white px-4 py-2.5 text-sm text-zinc-900 shadow-sm outline-none ring-2 ring-transparent transition focus:ring-emerald-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                    >
                      <option value="all">All subjects</option>
                      {subjects.map((subject) => (
                        <option key={subject} value={subject}>
                          {subject}
                        </option>
                      ))}
                    </select>
                  </SearchField>
                  <SearchField label="Sort">
                    <select
                      value={sortBy}
                      onChange={(event) =>
                        setSortBy(event.target.value as SortOption)
                      }
                      className="rounded-2xl border border-zinc-300/80 bg-white px-4 py-2.5 text-sm text-zinc-900 shadow-sm outline-none ring-2 ring-transparent transition focus:ring-emerald-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                    >
                      {Object.entries(sortLabels).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </SearchField>
                </div>
              </div>
              <div className="flex flex-1 flex-col justify-between gap-3 rounded-3xl border border-emerald-200/60 bg-white/80 p-4 text-sm text-zinc-600 shadow-sm dark:border-emerald-500/30 dark:bg-zinc-900/40 dark:text-zinc-300">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700 dark:text-emerald-200">Early launch update</p>
                <p>Verified totals for teachers, schools, and reviews will appear here once students submit their first stories.</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Help seed the dataset by sharing an early review—it unlocks community numbers for everyone.</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-emerald-200/60 bg-gradient-to-br from-emerald-50 to-white p-6 shadow-inner dark:border-emerald-500/30 dark:from-emerald-950/20 dark:to-zinc-900">
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-200">
              Why RateMyHST?
            </p>
            <ul className="mt-4 space-y-4 text-sm leading-relaxed text-emerald-950 dark:text-emerald-100/90">
              <li>
                • Insightful reviews focused on classroom culture, clarity, and
                support.
              </li>
              <li>
                • Transparent rating system that balances rigor with wellbeing.
              </li>
              <li>
                • Moderation tooling to keep student voices constructive and
                specific.
              </li>
              <li>
                • District, school, and teacher dashboards built for families
                and counselors.
              </li>
            </ul>
            <div className="mt-6 rounded-2xl bg-white/80 p-4 text-sm text-zinc-800 shadow dark:bg-zinc-900 dark:text-zinc-100">
              <p className="font-semibold text-emerald-700 dark:text-emerald-300">
                Safeguarding stories
              </p>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Every review is screened for specificity and respect. Districts
                receive context, not call-outs.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
              Featured results
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
              Spotlight on equitable classrooms
            </h2>
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Showing {filteredTeachers.length} of {teachers.length} profiled
            teachers
          </p>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {filteredTeachers.length === 0 ? (
            <div className="col-span-full rounded-2xl border border-dashed border-zinc-300 bg-white p-8 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400">
              No teachers match that search yet—submit a review to start the
              conversation.
            </div>
          ) : (
            filteredTeachers.map((teacher) => (
              <Link
                key={teacher.id}
                href={`/teachers/${teacher.slug}`}
                className="group flex flex-col rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-300">
                      {teacher.subject}
                    </p>
                    <p className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                      {teacher.name}{' '}
                      <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                        ({teacher.pronouns})
                      </span>
                    </p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      {teacher.school}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-semibold text-emerald-500 dark:text-emerald-300">
                      {teacher.rating.toFixed(1)}
                    </p>
                    <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                      Avg rating
                    </p>
                    <span className="mt-2 inline-flex items-center justify-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200">
                      {(teacher.wouldTakeAgain * 100).toFixed(0)}% take again
                    </span>
                  </div>
                </div>
                <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-300">
                  {teacher.tagline}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {teacher.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                  <span>
                    Difficulty {teacher.difficulty.toFixed(1)} •{' '}
                    {teacher.ratingCount.toLocaleString()} reviews
                  </span>
                  <span>Updated {formatDate(teacher.lastReview)}</span>
                </div>
                <span className="mt-4 inline-flex items-center text-sm font-semibold text-emerald-600 transition group-hover:translate-x-1 dark:text-emerald-300">
                  View profile →
                </span>
              </Link>
            ))
          )}
        </div>
      </Container>
    </section>
  )
}
