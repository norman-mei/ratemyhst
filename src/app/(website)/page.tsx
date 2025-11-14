'use client'

import Link from 'next/link'
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type CSSProperties,
} from 'react'
import { useRouter } from 'next/navigation'
import { Heart, Plus, Search, Shield, User, X } from 'lucide-react'

import { Container } from '@/components/Container'
import { AddTeacherModal, type AddTeacherFormValues } from '@/components/AddTeacherModal'
import { getRatingStyle } from '@/lib/ratingColors'
import { useAuth } from '@/context/AuthContext'
import { useUserSettings } from '@/context/UserSettingsContext'
import { getLanguageCopy, type LanguageCopy } from '@/lib/languageContent'

type TeacherSummary = {
  id: string
  slug: string
  fullName: string
  department: string | null
  grades: string[]
  averageRating: number
  reviewCount: number
}

type SchoolRatings = {
  overall: number
  count: number
  location: number
  safety: number
  reputation: number
  opportunities: number
  happiness: number
  clubs: number
  internet: number
  facilities: number
  social: number
  food: number
}

type School = {
  id: string
  slug: string
  name: string
  city: string | null
  state: string | null
  zipCode: string | null
  district: string | null
  ratings: SchoolRatings
  teachers: TeacherSummary[]
}

export default function Home() {
  const router = useRouter()
  const [schoolSearch, setSchoolSearch] = useState('')
  const [teacherSearch, setTeacherSearch] = useState('')
  const [searchMode, setSearchMode] = useState<'school' | 'teacher'>('school')
  const [schools, setSchools] = useState<School[]>([])
  const [isLoadingSchools, setIsLoadingSchools] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [activeSchoolId, setActiveSchoolId] = useState<string | null>(null)
  const [showAddSchoolModal, setShowAddSchoolModal] = useState(false)
  const [pendingSchool, setPendingSchool] = useState({
    name: '',
    city: '',
    state: '',
    zipCode: '',
  })
  const [showAddTeacherModal, setShowAddTeacherModal] = useState(false)
  const buildEmptyTeacherForm = (): AddTeacherFormValues => ({
    firstName: '',
    lastName: '',
    department: '',
    grades: [],
  })
  const [pendingTeacher, setPendingTeacher] = useState<AddTeacherFormValues>(buildEmptyTeacherForm)
  const [isSavingSchool, setIsSavingSchool] = useState(false)
  const [schoolModalError, setSchoolModalError] = useState<string | null>(null)
  const [isSavingTeacher, setIsSavingTeacher] = useState(false)
  const [teacherModalError, setTeacherModalError] = useState<string | null>(null)
  const { settings } = useUserSettings()
  const { user } = useAuth()
  const copy = getLanguageCopy(settings.language)
  const activeSchool = useMemo(
    () => schools.find((school) => school.id === activeSchoolId) ?? null,
    [schools, activeSchoolId],
  )

  const fetchSchools = useCallback(() => {
    setIsLoadingSchools(true)
    setLoadError(null)
    fetch('/api/schools')
      .then(async (response) => {
        if (!response.ok) {
          const body = await response.json().catch(() => null)
          throw new Error(body?.error ?? 'Unable to load schools right now.')
        }
        return response.json()
      })
      .then((data: School[]) => {
        setSchools(data)
      })
      .catch((error) => {
        setSchools([])
        setLoadError(
          error instanceof Error ? error.message : 'Unable to load schools right now.',
        )
      })
      .finally(() => {
        setIsLoadingSchools(false)
      })
  }, [])

  useEffect(() => {
    fetchSchools()
  }, [fetchSchools])

  const handleSelectSchool = (schoolId: string) => {
    const selected = schools.find((school) => school.id === schoolId)
    if (!selected) return
    router.push(`/schools/${selected.slug}`)
  }

  const handleAddSchool = (name: string) => {
    const trimmed = name.trim()
    if (!trimmed) return
    const existing = schools.find(
      (school) => school.name.toLowerCase() === trimmed.toLowerCase(),
    )
    if (existing) {
      handleSelectSchool(existing.id)
      return
    }
    setPendingSchool((prev) => ({ ...prev, name: trimmed }))
    setShowAddSchoolModal(true)
  }

  const handleAddTeacher = (schoolId: string, name: string) => {
    const trimmed = name.trim()
    if (!trimmed || !activeSchoolId) return
    const [firstName, ...rest] = trimmed.split(/\s+/)
    const lastName = rest.join(' ')
    const template = buildEmptyTeacherForm()
    setPendingTeacher({
      ...template,
      firstName,
      lastName,
    })
    setShowAddTeacherModal(true)
  }

  return (
    <>
      <div className="pb-24">
        <section className="pt-12 sm:pt-20">
          <Container>
            <div className="rounded-3xl border border-emerald-100 bg-gradient-to-br from-white via-emerald-50 to-white p-8 shadow-lg shadow-emerald-100/70 dark:border-emerald-500/30 dark:from-zinc-900 dark:via-emerald-900/20 dark:to-zinc-900">
              <div className="mt-2">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700 dark:text-emerald-200">
                  {copy.heroBadge}
                </p>
                <h1 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
                  {copy.heroTitle}
                </h1>
                <p className="mt-4 text-base text-zinc-600 dark:text-zinc-300">
                  {copy.heroSubtitle}
                </p>
              </div>
              <SearchSection
                schoolSearch={schoolSearch}
                setSchoolSearch={setSchoolSearch}
                teacherSearch={teacherSearch}
                setTeacherSearch={setTeacherSearch}
                searchMode={searchMode}
                setSearchMode={setSearchMode}
                copy={copy}
                schools={schools}
                activeSchool={activeSchool}
                onSelectSchool={handleSelectSchool}
                onAddSchool={handleAddSchool}
                onAddTeacher={handleAddTeacher}
                isLoadingSchools={isLoadingSchools}
                loadError={loadError}
                onRetry={fetchSchools}
              />
            </div>
          </Container>
        </section>

        <section className="pt-16">
          <Container>
            {!user ? <FeatureSection copy={copy} /> : <MemberPanel copy={copy} />}
          </Container>
        </section>

        {!user && (
          <section className="pt-16">
            <Container>
              <SignupSection copy={copy} />
            </Container>
          </section>
        )}
      </div>

      {showAddSchoolModal && (
        <AddSchoolModal
          values={pendingSchool}
          onChange={setPendingSchool}
          isSubmitting={isSavingSchool}
          error={schoolModalError}
          onClose={() => {
            setShowAddSchoolModal(false)
            setPendingSchool({ name: '', city: '', state: '', zipCode: '' })
            setSchoolModalError(null)
          }}
          onSave={async (data) => {
            const payload = {
              name: data.name.trim(),
              city: data.city.trim(),
              state: data.state.trim(),
              zipCode: data.zipCode.trim(),
            }

            if (!payload.name) {
              setSchoolModalError('School name is required.')
              return
            }

            setIsSavingSchool(true)
            setSchoolModalError(null)

            try {
              const response = await fetch('/api/schools', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
              })

              if (!response.ok) {
                const body = await response.json().catch(() => null)
                throw new Error(body?.error ?? 'Unable to save school right now.')
              }

              const created: School = await response.json()
              const schoolWithTeachers: School = { ...created, teachers: created.teachers ?? [] }
              setSchools((prev) => [schoolWithTeachers, ...prev])
              setSchoolSearch('')
              setShowAddSchoolModal(false)
              setPendingSchool({ name: '', city: '', state: '', zipCode: '' })
              router.push(`/schools/${schoolWithTeachers.slug}`)
            } catch (error) {
              setSchoolModalError(
                error instanceof Error ? error.message : 'Unable to save school right now.',
              )
            } finally {
              setIsSavingSchool(false)
            }
          }}
        />
      )}

      {showAddTeacherModal && activeSchool && (
        <AddTeacherModal
          values={pendingTeacher}
          onChange={setPendingTeacher}
          isSubmitting={isSavingTeacher}
          error={teacherModalError}
          onClose={() => {
            setShowAddTeacherModal(false)
            setPendingTeacher(buildEmptyTeacherForm())
            setTeacherModalError(null)
          }}
          onSave={async (data) => {
            const firstName = data.firstName.trim()
            const lastName = data.lastName.trim()
            if (!firstName || !lastName) {
              setTeacherModalError('Please provide both a first and last name.')
              return
            }
            setIsSavingTeacher(true)
            setTeacherModalError(null)

            try {
              const response = await fetch('/api/teachers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  schoolId: activeSchool.id,
                  firstName,
                  lastName,
                  department: data.department.trim(),
                  grades: data.grades,
                }),
              })

              if (!response.ok) {
                const body = await response.json().catch(() => null)
                throw new Error(body?.error ?? 'Unable to save teacher right now.')
              }

              const created: TeacherSummary = await response.json()
              setSchools((prev) =>
                prev.map((school) => {
                  if (school.id !== activeSchool.id) return school
                  const updated = [...school.teachers, created].sort((a, b) =>
                    a.fullName.localeCompare(b.fullName),
                  )
                  return { ...school, teachers: updated }
                }),
              )
              setTeacherSearch('')
              setShowAddTeacherModal(false)
              setPendingTeacher(buildEmptyTeacherForm())
            } catch (error) {
              setTeacherModalError(
                error instanceof Error ? error.message : 'Unable to save teacher right now.',
              )
            } finally {
              setIsSavingTeacher(false)
            }
          }}
        />
      )}

      <style jsx global>{`
        @keyframes rmhst-fade-in {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes rmhst-slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes rmhst-slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes rmhst-pulse-slow {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.85;
          }
        }

        .rmhst-animate-fade-in {
          animation: rmhst-fade-in 0.45s ease-out both;
        }

        .rmhst-animate-slide-down {
          animation: rmhst-slide-down 0.3s ease-out both;
        }

        .rmhst-animate-slide-up {
          animation: rmhst-slide-up 0.3s ease-out both;
        }

        .rmhst-animate-pulse-slow {
          animation: rmhst-pulse-slow 2s ease-in-out infinite;
        }
      `}</style>
    </>
  )
}

function SearchSection({
  schoolSearch,
  setSchoolSearch,
  teacherSearch,
  setTeacherSearch,
  searchMode,
  setSearchMode,
  copy,
  schools,
  activeSchool,
  onSelectSchool,
  onAddSchool,
  onAddTeacher,
  isLoadingSchools,
  loadError,
  onRetry,
}: {
  schoolSearch: string
  setSchoolSearch: (value: string) => void
  teacherSearch: string
  setTeacherSearch: (value: string) => void
  searchMode: 'school' | 'teacher'
  setSearchMode: (mode: 'school' | 'teacher') => void
  copy: LanguageCopy
  schools: School[]
  activeSchool: School | null
  onSelectSchool: (id: string) => void
  onAddSchool: (name: string) => void
  onAddTeacher: (schoolId: string, name: string) => void
  isLoadingSchools: boolean
  loadError: string | null
  onRetry: () => void
}) {
  const isTeacher = searchMode === 'teacher'
  const inputValue = isTeacher ? teacherSearch : schoolSearch
  const placeholder = isTeacher
    ? copy.teacherPlaceholder
    : copy.schoolPlaceholder
  const buttonLabel = isTeacher ? copy.teacherButton : copy.schoolButton
  const helpers = copy.searchHelpers
  const schoolQuery = schoolSearch.trim().toLowerCase()
  const filteredSchools = schoolQuery
    ? schools.filter((school) =>
        school.name.toLowerCase().includes(schoolQuery),
      )
    : schools
  const schoolResults = filteredSchools.slice(0, 5)
  const noSchoolMatches = schoolQuery.length > 0 && schoolResults.length === 0

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (isTeacher) {
      setTeacherSearch(event.target.value)
    } else {
      setSchoolSearch(event.target.value)
    }
  }

  return (
    <div className="mt-8 text-center rmhst-animate-fade-in">
      <div className="mx-auto max-w-2xl space-y-5">
        <div className="relative text-left">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={placeholder}
            value={inputValue}
            onChange={handleInputChange}
            className="w-full rounded-xl border border-gray-300 bg-white px-12 py-4 text-base text-gray-900 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
          />
        </div>
        <div className="flex flex-col items-center gap-3 text-center">
          <button className="inline-flex w-full items-center justify-center rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/30 transition hover:-translate-y-0.5 sm:w-auto">
            {buttonLabel}
          </button>
        </div>
        <div>
          <button
            type="button"
            onClick={() =>
              setSearchMode((mode) => (mode === 'teacher' ? 'school' : 'teacher'))
            }
            className="text-sm font-semibold text-blue-600 transition hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-200"
            aria-pressed={isTeacher}
          >
            {isTeacher ? copy.fallbackToggle : copy.teacherToggle}
          </button>
        </div>
        {loadError && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-left text-sm text-red-700 dark:border-red-500/50 dark:bg-red-950/20 dark:text-red-300">
            <p>{loadError}</p>
            <button
              type="button"
              onClick={onRetry}
              className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-red-600 underline dark:text-red-300"
            >
              Try again
            </button>
          </div>
        )}

        {!isTeacher && (
          <div className="rounded-3xl border border-zinc-100 bg-white/80 p-6 text-left shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50">
            {loadError ? (
              <p className="text-sm text-red-600 dark:text-red-400">Unable to load schools.</p>
            ) : isLoadingSchools ? (
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Loading schools…</p>
            ) : (
              <>
                {schoolResults.map((school) => {
                  const ratingStyle = getRatingStyle(school.ratings.overall)
                  const badgeStyle = {
                    '--rating-gradient': ratingStyle.background,
                    '--rating-text': ratingStyle.textColor,
                  } as CSSProperties
                  return (
                    <button
                      key={school.id}
                      type="button"
                      onClick={() => onSelectSchool(school.id)}
                      className="mb-2 flex w-full items-center justify-between rounded-2xl border border-zinc-100 px-4 py-3 text-left transition hover:border-emerald-300 hover:text-emerald-600 last:mb-0 dark:border-zinc-700 dark:hover:border-emerald-400"
                    >
                      <div>
                        <p className="text-base font-semibold text-zinc-900 dark:text-white">
                          {school.name}
                        </p>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                          {school.city}, {school.state} {school.zipCode}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2 text-right">
                        {activeSchool?.id === school.id && (
                          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-300">
                            ●
                          </span>
                        )}
                        <div
                          className="rounded-2xl bg-white px-4 py-3 text-center shadow-inner [background-image:var(--rating-gradient)] [color:var(--rating-text)]"
                          style={badgeStyle}
                        >
                          <p className="text-2xl font-semibold">
                            {school.ratings.overall > 0
                              ? school.ratings.overall.toFixed(2)
                              : 'N/A'}
                          </p>
                        </div>
                      </div>
                    </button>
                  )
                })}
                {noSchoolMatches && schoolSearch.trim().length > 0 && (
                  <div className="mt-4 rounded-2xl border border-dashed border-emerald-300 p-4 text-left text-sm text-zinc-600 dark:border-emerald-500/40 dark:text-zinc-300">
                    <p>{helpers.noSchools}</p>
                    <button
                      type="button"
                      className="mt-2 inline-flex items-center rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:-translate-y-0.5"
                      onClick={() => onAddSchool(schoolSearch)}
                    >
                      {formatTemplate(helpers.addSchool, schoolSearch)}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
        {isTeacher && (
          <div className="text-center">
            <button
              type="button"
              onClick={() => setSearchMode('school')}
              className="inline-flex items-center rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:-translate-y-0.5"
            >
              {copy.fallbackToggle}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function FeatureSection({ copy }: { copy: LanguageCopy }) {
  return (
    <div className="rounded-3xl border border-emerald-100 bg-white/80 p-10 text-center shadow-lg dark:border-emerald-500/20 dark:bg-zinc-900/50">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700 dark:text-emerald-200">
        {copy.featureBadge}
      </p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
        {copy.featureTitle}
      </h2>
      <p className="mt-3 text-base text-zinc-600 dark:text-zinc-300">
        {copy.featureSubtitle}
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {copy.featurePanels.map((panel, index) => (
          <div
            key={panel.title}
            className="rounded-2xl border border-zinc-100 bg-gradient-to-br from-emerald-50 to-white p-6 text-left shadow-sm dark:border-zinc-800 dark:from-emerald-900/20 dark:to-zinc-900 rmhst-animate-fade-in"
            style={{ animationDelay: `${index * 120}ms` }}
          >
            <div className="flex justify-center">
              <FeatureIcon name={panel.icon} />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-white">
              {panel.title}
            </h3>
            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">
              {panel.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

function MemberPanel({ copy }: { copy: LanguageCopy }) {
  return (
    <section className="rounded-3xl border border-dashed border-emerald-300 bg-white/80 p-8 text-center shadow-sm dark:border-emerald-500/30 dark:bg-zinc-900/70">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-300">
        {copy.featureBadge}
      </p>
      <h2 className="mt-3 text-3xl font-semibold text-zinc-900 dark:text-white">
        Welcome back, you’re part of the RMHST family
      </h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Save more teachers, share fresh reviews, or update your profile anytime. We’re keeping a seat ready for your next story.
      </p>
      <div className="mt-4 flex flex-wrap justify-center gap-3">
        <Link
          href="/profile?tab=my-reviews"
          className="rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white shadow shadow-emerald-600/30 transition hover:-translate-y-0.5"
        >
          Manage my reviews
        </Link>
        <Link
          href="/profile"
          className="rounded-full border border-emerald-200 px-5 py-2 text-sm font-semibold text-emerald-600 transition hover:border-emerald-400 dark:border-emerald-500/40 dark:text-emerald-200"
        >
          Update profile
        </Link>
      </div>
    </section>
  )
}

function FeatureIcon({ name }: { name: string }) {
  if (name === 'shield') {
    return <Shield className="h-8 w-8 text-green-600 dark:text-green-400" />
  }
  if (name === 'heart') {
    return <Heart className="h-8 w-8 text-red-600 dark:text-red-400" />
  }
  return <User className="h-8 w-8 text-blue-600 dark:text-blue-400" />
}

function SignupSection({ copy }: { copy: LanguageCopy }) {
  return (
    <div className="rounded-3xl bg-gradient-to-br from-emerald-600 via-emerald-500 to-emerald-600 p-10 text-white shadow-2xl">
      <div className="space-y-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-100/90">
            {copy.signupBadge}
          </p>
          <h3 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            {copy.signupTitle}
          </h3>
          <p className="mt-3 text-base text-emerald-50/90">
            {copy.signupSubtitle}
          </p>
        </div>
        <form
          className="flex flex-col gap-4 sm:flex-row"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="flex-1">
            <label htmlFor="signup-email" className="sr-only">
              Email address
            </label>
            <input
              id="signup-email"
              type="email"
              name="email"
              placeholder={copy.emailPlaceholder}
              className="w-full rounded-2xl border border-white/50 bg-white/10 px-4 py-3 text-base text-white placeholder:text-emerald-100 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/60"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-emerald-700 shadow-lg shadow-white/30 transition hover:-translate-y-0.5"
          >
            {copy.signupButton}
          </button>
        </form>
        <p className="text-sm text-emerald-50/80">{copy.signupNote}</p>
      </div>
    </div>
  )
}

function AddSchoolModal({
  values,
  onChange,
  onSave,
  onClose,
  isSubmitting,
  error,
}: {
  values: { name: string; city: string; state: string; zipCode: string }
  onChange: (next: { name: string; city: string; state: string; zipCode: string }) => void
  onSave: (data: { name: string; city: string; state: string; zipCode: string }) => void | Promise<void>
  onClose: () => void
  isSubmitting: boolean
  error: string | null
}) {
  const isValid =
    values.name.trim() &&
    values.city.trim() &&
    /^[A-Za-z]{2}$/.test(values.state.trim()) &&
    /^\d{5}(-\d{4})?$/.test(values.zipCode.trim())

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-3xl border border-zinc-200 bg-white p-6 shadow-2xl dark:border-zinc-700 dark:bg-zinc-900">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">Add a School</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1 text-zinc-500 transition hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-4 grid gap-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Name of School
            </label>
            <input
              type="text"
              value={values.name}
              onChange={(event) =>
                onChange({ ...values, name: event.target.value })
              }
              className="mt-1 w-full rounded-2xl border border-zinc-200 px-4 py-3 text-sm text-zinc-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
              placeholder="Example High School"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                City
              </label>
              <input
                type="text"
                value={values.city}
                onChange={(event) =>
                  onChange({ ...values, city: event.target.value })
                }
                className="mt-1 w-full rounded-2xl border border-zinc-200 px-4 py-3 text-sm text-zinc-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                placeholder="San Diego"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                State
              </label>
              <input
                type="text"
                value={values.state}
                maxLength={2}
                onChange={(event) =>
                  onChange({ ...values, state: event.target.value.toUpperCase() })
                }
                className="mt-1 w-full rounded-2xl border border-zinc-200 px-4 py-3 text-sm text-zinc-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                placeholder="CA"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                Zip Code
              </label>
              <input
                type="text"
                value={values.zipCode}
                onChange={(event) =>
                  onChange({ ...values, zipCode: event.target.value })
                }
                className="mt-1 w-full rounded-2xl border border-zinc-200 px-4 py-3 text-sm text-zinc-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                placeholder="92113"
              />
            </div>
          </div>
          <button
            type="button"
            disabled={!isValid || isSubmitting}
            onClick={() => isValid && !isSubmitting && onSave(values)}
            className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/30 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:shadow-none"
          >
            {isSubmitting ? 'Saving…' : 'Save school'}
          </button>
          {error && (
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          )}
        </div>
      </div>
    </div>
  )
}

function formatTemplate(template: string, value: string): string {
  return template.replace('{name}', value).replace('{school}', value)
}
