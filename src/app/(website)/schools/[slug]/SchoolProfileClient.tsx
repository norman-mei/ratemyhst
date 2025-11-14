'use client'

import Link from 'next/link'
import { Bookmark, Pencil } from 'lucide-react'
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
} from 'react'
import { useRouter } from 'next/navigation'

import { AddTeacherModal, type AddTeacherFormValues } from '@/components/AddTeacherModal'
import { Container } from '@/components/Container'
import { useAuth } from '@/context/AuthContext'
import { useSavedTeachers } from '@/context/SavedTeachersContext'
import { getRatingStyle } from '@/lib/ratingColors'
import type { SchoolProfilePayload, TeacherSummaryPayload } from '@/lib/mappers'

const CATEGORY_FIELDS = [
  { key: 'location', label: 'Location' },
  { key: 'safety', label: 'Safety' },
  { key: 'reputation', label: 'Reputation' },
  { key: 'opportunities', label: 'Opportunities' },
  { key: 'happiness', label: 'Happiness' },
  { key: 'clubs', label: 'Clubs' },
  { key: 'internet', label: 'Internet' },
  { key: 'facilities', label: 'Facilities' },
  { key: 'social', label: 'Social' },
  { key: 'food', label: 'Food' },
] as const

type CategoryKey = (typeof CATEGORY_FIELDS)[number]['key']

type ReviewFormState = {
  overall: number
  comment: string
} & Record<CategoryKey, number>

type StatusMessage = { type: 'success' | 'error'; text: string }

const INITIAL_FORM: ReviewFormState = {
  overall: 5,
  comment: '',
  location: 5,
  safety: 5,
  reputation: 5,
  opportunities: 5,
  happiness: 5,
  clubs: 5,
  internet: 5,
  facilities: 5,
  social: 5,
  food: 5,
}

const ratingOptions = [5, 4, 3, 2, 1]

type ReviewFieldKey = keyof ReviewFormState

const STATE_OPTIONS = [
  { value: '', label: 'Select state' },
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' },
] as const

type SchoolDetailsFormState = {
  name: string
  city: string
  state: string
  zipCode: string
}

const buildSchoolDetailsState = (profile?: SchoolProfilePayload | null): SchoolDetailsFormState => ({
  name: profile?.school?.name ?? '',
  city: profile?.school?.city ?? '',
  state: profile?.school?.state ?? '',
  zipCode: profile?.school?.zipCode ?? '',
})

type SchoolProfileClientProps = {
  slug: string
  initialData?: SchoolProfilePayload | null
}

export default function SchoolProfileClient({ slug, initialData }: SchoolProfileClientProps) {
  const router = useRouter()
  const [data, setData] = useState<SchoolProfilePayload | null>(initialData ?? null)
  const [hasLoaded, setHasLoaded] = useState(Boolean(initialData))
  const [loadError, setLoadError] = useState<string | null>(null)
  const [formState, setFormState] = useState<ReviewFormState>(INITIAL_FORM)
  const [status, setStatus] = useState<StatusMessage | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [refreshIndex, setRefreshIndex] = useState(0)
  const [isEditingSchool, setIsEditingSchool] = useState(false)
  const [schoolForm, setSchoolForm] = useState<SchoolDetailsFormState>(buildSchoolDetailsState(initialData))
  const [schoolStatus, setSchoolStatus] = useState<StatusMessage | null>(null)
  const [isSavingSchoolDetails, setIsSavingSchoolDetails] = useState(false)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const buildEmptyTeacherForm = (): AddTeacherFormValues => ({
    firstName: '',
    lastName: '',
    department: '',
    grades: [],
  })
  const [showAddTeacherModal, setShowAddTeacherModal] = useState(false)
  const [teacherForm, setTeacherForm] = useState<AddTeacherFormValues>(buildEmptyTeacherForm)
  const [isSavingTeacher, setIsSavingTeacher] = useState(false)
  const [teacherModalError, setTeacherModalError] = useState<string | null>(null)
  const [deletingSchool, setDeletingSchool] = useState(false)
  const [deletingTeacher, setDeletingTeacher] = useState<string | null>(null)
  const skipInitialFetchRef = useRef(Boolean(initialData))
  const { user } = useAuth()
  const {
    toggleTeacher: toggleSavedTeacher,
    isTeacherSaved,
    isMutating,
  } = useSavedTeachers()
  const toggleReviewForm = () => setShowReviewForm((open) => !open)
  const openAddTeacherModal = () => {
    setTeacherForm(buildEmptyTeacherForm())
    setTeacherModalError(null)
    setShowAddTeacherModal(true)
  }
  const closeAddTeacherModal = () => {
    setShowAddTeacherModal(false)
    setTeacherForm(buildEmptyTeacherForm())
    setTeacherModalError(null)
  }

  useEffect(() => {
    const controller = new AbortController()
    if (skipInitialFetchRef.current) {
      skipInitialFetchRef.current = false
      setHasLoaded(true)
      return () => controller.abort()
    }

    setHasLoaded(false)
    setLoadError(null)
    fetch(`/api/schools/${slug}`, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) {
          const body = await response.json().catch(() => null)
          throw new Error(body?.error ?? 'Unable to load school profile.')
        }
        return response.json()
      })
      .then((payload: SchoolProfilePayload) => {
        setData(payload)
      })
      .catch((error) => {
        if (controller.signal.aborted) return
        setLoadError(error instanceof Error ? error.message : 'Unable to load school profile.')
        setData(null)
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setHasLoaded(true)
        }
      })

    return () => controller.abort()
  }, [slug, refreshIndex])

  useEffect(() => {
    setSchoolForm(buildSchoolDetailsState(data))
  }, [data])

  useEffect(() => {
    if (!schoolStatus) return
    const timer = setTimeout(() => {
      setSchoolStatus(null)
    }, schoolStatus.type === 'success' ? 4000 : 6000)
    return () => clearTimeout(timer)
  }, [schoolStatus])

  const remainingCharacters = 500 - formState.comment.length

  const handleInputChange = (field: ReviewFieldKey, value: string) => {
    setStatus(null)
    setFormState((previous) => {
      if (field === 'comment') {
        return { ...previous, comment: value }
      }
      return { ...previous, [field]: Number(value) }
    })
  }

  const handleTeacherSave = async (formData: AddTeacherFormValues) => {
    if (!data) {
      setTeacherModalError('Please load this school before adding teachers.')
      return
    }

    const firstName = formData.firstName.trim()
    const lastName = formData.lastName.trim()
    const department = formData.department.trim()
    if (!firstName || !lastName) {
      setTeacherModalError('Please provide both a first and last name.')
      return
    }
    if (!department) {
      setTeacherModalError('Please provide a department.')
      return
    }
    if (formData.grades.length === 0) {
      setTeacherModalError('Select at least one grade.')
      return
    }

    setIsSavingTeacher(true)
    setTeacherModalError(null)

    try {
      const response = await fetch('/api/teachers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          schoolId: data.school.id,
          firstName,
          lastName,
          department,
          grades: formData.grades,
        }),
      })

      if (!response.ok) {
        const body = await response.json().catch(() => null)
        throw new Error(body?.error ?? 'Unable to save teacher right now.')
      }

      const created: TeacherSummaryPayload = await response.json()
      setData((previous) => {
        if (!previous) return previous
        const updated = [...previous.teachers, created].sort((a, b) =>
          a.fullName.localeCompare(b.fullName),
        )
        return { ...previous, teachers: updated }
      })
      closeAddTeacherModal()
    } catch (error) {
      setTeacherModalError(
        error instanceof Error ? error.message : 'Unable to save teacher right now.',
      )
    } finally {
      setIsSavingTeacher(false)
    }
  }

  const handleDeleteTeacher = async (teacher: TeacherSummaryPayload) => {
    const confirmed = window.confirm(
      `Remove ${teacher.fullName}? This will delete their reviews and saved bookmarks.`,
    )
    if (!confirmed) {
      return
    }
    setDeletingTeacher(teacher.slug)

    try {
      const response = await fetch(`/api/teachers/${teacher.slug}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        const body = await response.json().catch(() => null)
        throw new Error(body?.error ?? 'Unable to delete this teacher right now.')
      }
      setData((previous) => {
        if (!previous) return previous
        return {
          ...previous,
          teachers: previous.teachers.filter((entry) => entry.slug !== teacher.slug),
        }
      })
    } catch (error) {
      window.alert(
        error instanceof Error ? error.message : 'Unable to delete this teacher right now.',
      )
    } finally {
      setDeletingTeacher(null)
    }
  }

  const handleSchoolFieldChange = (field: keyof SchoolDetailsFormState, value: string) => {
    setSchoolStatus(null)
    setSchoolForm((previous) => ({
      ...previous,
      [field]: field === 'state' ? value.toUpperCase() : value,
    }))
  }

  const startSchoolEdit = () => {
    if (!data) return
    setSchoolStatus(null)
    setSchoolForm(buildSchoolDetailsState(data))
    setIsEditingSchool(true)
  }

  const cancelSchoolEdit = () => {
    setIsEditingSchool(false)
    setSchoolStatus(null)
    setSchoolForm(buildSchoolDetailsState(data))
  }

  const handleSchoolDetailsSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!data) {
      setSchoolStatus({ type: 'error', text: 'Unable to update this school right now.' })
      return
    }

    const trimmedName = schoolForm.name.trim()
    if (trimmedName.length < 2) {
      setSchoolStatus({ type: 'error', text: 'School name must be at least 2 characters.' })
      return
    }

    setIsSavingSchoolDetails(true)
    setSchoolStatus(null)

    try {
      const response = await fetch(`/api/schools/${slug}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: trimmedName,
          city: schoolForm.city.trim(),
          state: schoolForm.state.trim(),
          zipCode: schoolForm.zipCode.trim(),
        }),
      })

      if (!response.ok) {
        const body = await response.json().catch(() => null)
        throw new Error(body?.error ?? 'Unable to update this school right now.')
      }

      const payload: SchoolProfilePayload = await response.json()
      setData(payload)
      setSchoolForm(buildSchoolDetailsState(payload))
      setIsEditingSchool(false)
      setSchoolStatus({ type: 'success', text: 'School info updated.' })
    } catch (error) {
      setSchoolStatus({
        type: 'error',
        text:
          error instanceof Error
            ? error.message
            : 'Something went wrong while saving school details.',
      })
    } finally {
      setIsSavingSchoolDetails(false)
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!data) {
      setStatus({ type: 'error', text: 'Unable to find this school right now.' })
      return
    }

    const trimmedComment = formState.comment.trim()
    if (!trimmedComment) {
      setStatus({ type: 'error', text: 'Please share a short, specific review (max 500 characters).' })
      return
    }

    if (trimmedComment.length > 500) {
      setStatus({ type: 'error', text: 'Reviews cannot exceed 500 characters.' })
      return
    }

    setIsSubmitting(true)
    setStatus(null)

    try {
      const response = await fetch(`/api/schools/${slug}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          overall: formState.overall,
          location: formState.location,
          safety: formState.safety,
          reputation: formState.reputation,
          opportunities: formState.opportunities,
          happiness: formState.happiness,
          clubs: formState.clubs,
          internet: formState.internet,
          facilities: formState.facilities,
          social: formState.social,
          food: formState.food,
          comment: trimmedComment,
        }),
      })

      if (!response.ok) {
        const body = await response.json().catch(() => null)
        throw new Error(body?.error ?? 'Unable to submit your review right now.')
      }

      const payload: SchoolProfilePayload = await response.json()
      setData(payload)
      setFormState(INITIAL_FORM)
      setStatus({
        type: 'success',
        text: `Thanks for rating ${payload.school.name}. We've posted your rating but it is still under review to ensure it meets our Site Guidelines.`,
      })
    } catch (error) {
      setStatus({
        type: 'error',
        text:
          error instanceof Error
            ? error.message
            : 'Something went wrong while saving your review. Please try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const ratings = data?.ratings
  const overallScore = ratings?.overall ?? 0
  const overallGradientValue = overallScore * 2
  const overallStyle = getRatingStyle(overallGradientValue, 10)
  const overallBadgeStyle = {
    '--rating-gradient': overallStyle.background,
    '--rating-text': overallStyle.textColor,
  } as CSSProperties
  const displayCategories = useMemo(() => CATEGORY_FIELDS, [])
  const schoolLocation = data
    ? [
        [data.school.city, data.school.state].filter(Boolean).join(', ').trim(),
        data.school.zipCode?.trim() ?? '',
      ]
        .filter((segment) => segment)
        .join(' ')
    : ''
  const teacherList = data?.teachers ?? []

  return (
    <>
      <Container>
        <div className="py-12">
        <Link
          href="/"
          className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-500 dark:text-emerald-300"
        >
          ← Back to search
        </Link>

        {!hasLoaded ? (
          <div className="mt-12 rounded-3xl border border-zinc-100 bg-white/70 p-10 text-center text-sm text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400">
            Loading school details...
          </div>
        ) : loadError ? (
          <div className="mt-12 rounded-3xl border border-dashed border-red-200 p-10 text-center dark:border-red-500/60">
            <p className="text-lg font-semibold text-red-700 dark:text-red-300">{loadError}</p>
            <button
              type="button"
              onClick={() => setRefreshIndex((index) => index + 1)}
              className="mt-4 rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-700 transition hover:border-red-400 dark:border-red-500/40 dark:text-red-200"
            >
              Retry
            </button>
          </div>
        ) : !data ? (
          <div className="mt-12 rounded-3xl border border-dashed border-zinc-300 p-10 text-center dark:border-zinc-700">
            <p className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              We could not find that school.
            </p>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Double-check the spelling or add it from the home page.
            </p>
          </div>
        ) : (
          <div className="mt-10 space-y-10">
            <section className="rounded-3xl border border-emerald-100 bg-white/80 p-8 shadow-sm dark:border-emerald-500/30 dark:bg-zinc-900/70">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-300">
                      School overview
                    </p>
                    {!isEditingSchool && (
                      <button
                        type="button"
                        onClick={startSchoolEdit}
                        className="inline-flex items-center gap-2 rounded-full border border-transparent px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600 transition hover:border-emerald-200 hover:bg-emerald-50 dark:text-emerald-200 dark:hover:border-emerald-400/40 dark:hover:bg-emerald-900/20"
                        aria-label="Edit school info"
                      >
                        <Pencil className="h-4 w-4" />
                        Edit
                      </button>
                    )}
                  </div>
                  {schoolStatus && (
                    <p
                      className={`mt-2 text-xs ${
                        schoolStatus.type === 'success'
                          ? 'text-emerald-600 dark:text-emerald-300'
                          : 'text-red-600 dark:text-red-400'
                      }`}
                    >
                      {schoolStatus.text}
                    </p>
                  )}
                  {isEditingSchool ? (
                    <form className="mt-4 space-y-4" onSubmit={handleSchoolDetailsSubmit}>
                      <div>
                        <label className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                          School name
                        </label>
                        <input
                          type="text"
                          value={schoolForm.name}
                          onChange={(event) => handleSchoolFieldChange('name', event.target.value)}
                          className="mt-2 w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm text-zinc-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                          placeholder="Example High School"
                          autoComplete="organization"
                          required
                        />
                      </div>
                      <div className="grid gap-4 md:grid-cols-3">
                        <div>
                          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                            City
                          </label>
                          <input
                            type="text"
                            value={schoolForm.city}
                            onChange={(event) => handleSchoolFieldChange('city', event.target.value)}
                            className="mt-2 w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm text-zinc-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                            placeholder="City"
                            autoComplete="address-level2"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                            State
                          </label>
                          <select
                            value={schoolForm.state}
                            onChange={(event) => handleSchoolFieldChange('state', event.target.value)}
                            className="mt-2 w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm text-zinc-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                            autoComplete="address-level1"
                          >
                            {STATE_OPTIONS.map(({ value, label }) => (
                              <option key={value || 'blank'} value={value}>
                                {label}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                            ZIP code
                          </label>
                          <input
                            type="text"
                            value={schoolForm.zipCode}
                            onChange={(event) =>
                              handleSchoolFieldChange('zipCode', event.target.value.replace(/\D/g, ''))
                            }
                            className="mt-2 w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm text-zinc-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            placeholder="90210"
                            autoComplete="postal-code"
                            maxLength={16}
                          />
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <button
                          type="submit"
                          disabled={isSavingSchoolDetails}
                          className="inline-flex min-w-[150px] items-center justify-center rounded-full bg-emerald-600 px-6 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {isSavingSchoolDetails ? 'Saving...' : 'Save changes'}
                        </button>
                        <button
                          type="button"
                          onClick={cancelSchoolEdit}
                          className="rounded-full border border-transparent px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 transition hover:border-zinc-200 dark:text-zinc-400 dark:hover:border-zinc-700"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                        {data.school.name}
                      </h1>
                      {schoolLocation && (
                        <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400">{schoolLocation}</p>
                      )}
                      {data.school.district && (
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">{data.school.district}</p>
                      )}
                    </>
                  )}
                </div>
                <div className="rounded-3xl border border-emerald-100 bg-white/90 p-6 text-center shadow-sm dark:border-emerald-500/30 dark:bg-zinc-900/70">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-800 dark:text-emerald-200">
                    Overall quality
                  </p>
                  <div
                    className="mx-auto mt-4 inline-flex flex-col items-center rounded-2xl px-6 py-4 text-center shadow-inner [background-image:var(--rating-gradient)] [color:var(--rating-text)]"
                    style={overallBadgeStyle}
                  >
                    <p className="text-5xl font-semibold">
                      {overallScore > 0 ? overallScore.toFixed(2) : 'N/A'}
                    </p>
                  </div>
                  <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
                    Based on {ratings?.count ?? 0} ratings
                  </p>
                </div>
              </div>

              <div className="mt-10 grid gap-5 md:grid-cols-2">
                {displayCategories.map(({ key, label }) => {
                  const categoryValue = ratings?.[key] ?? 0
                  const normalizedCategory = categoryValue * 2
                  const categoryStyle = getRatingStyle(normalizedCategory, 10)
                  return (
                    <div
                      key={key}
                      className="rounded-2xl border border-zinc-100 bg-white/90 p-4 dark:border-zinc-800 dark:bg-zinc-900/70"
                    >
                      <div className="flex items-center justify-between text-sm font-semibold text-zinc-800 dark:text-zinc-100">
                        <span>{label}</span>
                        <span>{categoryValue > 0 ? categoryValue.toFixed(2) : 'N/A'}</span>
                      </div>
                      <div className="mt-3 h-2 rounded-full bg-zinc-200 dark:bg-zinc-800">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${Math.min(100, (categoryValue / 5) * 100)}%`,
                            backgroundImage: categoryStyle.background,
                          }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>

            <section className="space-y-6 rounded-3xl border border-zinc-100 bg-white/80 p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/70">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                  Student reviews for {data.school.name}
                </h2>
                <button
                  type="button"
                  onClick={toggleReviewForm}
                  className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-500 dark:text-emerald-300"
                >
                  Add yours
                </button>
              </div>
              {data.reviews.length === 0 ? (
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  No school reviews yet. Be the first to share what makes this campus unique.
                </p>
              ) : (
                <div className="space-y-5">
                  {data.reviews.map((review) => (
                    <article
                      key={review.id}
                      className="rounded-2xl border border-zinc-200 bg-white/80 p-5 dark:border-zinc-800 dark:bg-zinc-900/60"
                    >
                      <div className="flex items-center justify-between text-sm text-zinc-500 dark:text-zinc-400">
                        <span>Overall {review.overall.toFixed(2)}</span>
                        <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                      </div>
                      <p className="mt-3 text-base text-zinc-800 dark:text-zinc-100">{review.comment}</p>
                      <div className="mt-3 grid gap-2 text-xs text-zinc-500 dark:text-zinc-400 sm:grid-cols-2">
                        {CATEGORY_FIELDS.map(({ key, label }) => (
                          <div key={key} className="flex items-center justify-between bg-zinc-50 px-3 py-2 dark:bg-zinc-800/50">
                            <span>{label}</span>
                            <span className="font-semibold text-zinc-800 dark:text-zinc-100">
                              {review[key].toFixed(1)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>

            {showReviewForm && (
              <section
                id="share-school-review"
                className="rounded-3xl border border-dashed border-emerald-200 bg-emerald-50/70 p-8 dark:border-emerald-500/40 dark:bg-emerald-950/20"
              >
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">Share your school review</h2>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                Keep it respectful, specific, and under <strong>500 characters</strong>. Your insights help families and
                students understand what makes this school stand out.
              </p>
              <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                      Overall quality
                    </label>
                    <select
                      value={formState.overall}
                      onChange={(event) => handleInputChange('overall', event.target.value)}
                      className="mt-2 w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm text-zinc-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                    >
                      {ratingOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                      Happiness on campus
                    </label>
                    <select
                      value={formState.happiness}
                      onChange={(event) => handleInputChange('happiness', event.target.value)}
                      className="mt-2 w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm text-zinc-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                    >
                      {ratingOptions.map((option) => (
                        <option key={`happy-${option}`} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {CATEGORY_FIELDS.filter((field) => field.key !== 'happiness').map(({ key, label }) => (
                    <div key={key}>
                      <label className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                        {label}
                      </label>
                      <select
                        value={formState[key]}
                        onChange={(event) => handleInputChange(key, event.target.value)}
                        className="mt-2 w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm text-zinc-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                      >
                        {ratingOptions.map((option) => (
                          <option key={`${key}-${option}`} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                    Your review
                  </label>
                  <textarea
                    value={formState.comment}
                    maxLength={500}
                    onChange={(event) => handleInputChange('comment', event.target.value)}
                    className="mt-1 h-32 w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm text-zinc-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                    placeholder="Share school culture, safety, resources, or any standout traditions."
                  />
                  <div className="mt-1 text-right text-xs text-zinc-500 dark:text-zinc-400">
                    {remainingCharacters} characters left
                  </div>
                </div>
                {status && (
                  <p
                    className={`text-sm ${
                      status.type === 'success'
                        ? 'text-emerald-700 dark:text-emerald-300'
                        : 'text-red-600 dark:text-red-400'
                    }`}
                  >
                    {status.text}
                  </p>
                )}
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  By clicking the &ldquo;Submit&rdquo; button, I acknowledge that I have read and agreed to the Rate My High
                  School Teachers Site Guidelines, Terms of Use and Privacy Policy. Submitted data becomes the property
                  of Rate My High School Teachers.
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/30 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:text-zinc-600 disabled:shadow-none"
                >
                  {isSubmitting ? 'Submitting…' : 'Submit review'}
                </button>
              </form>
            </section>
            )}

            <section className="rounded-3xl border border-zinc-100 bg-white/80 p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/70">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                  Teachers at {data.school.name}
                </h2>
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={openAddTeacherModal}
                    className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-500 dark:text-emerald-300"
                  >
                    Add a teacher
                  </button>
                  <button
                    type="button"
                    onClick={handleDeleteSchool}
                    disabled={deletingSchool}
                    className="text-sm font-semibold text-red-600 transition hover:text-red-500 disabled:opacity-60 dark:text-red-300"
                  >
                    {deletingSchool ? 'Deleting…' : 'Delete school'}
                  </button>
                </div>
              </div>
              {teacherList.length === 0 ? (
                <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
                  We haven&apos;t listed any teachers for this school yet. Share the first profile from the home search.
                </p>
              ) : (
                <ul className="mt-6 space-y-3">
                  {teacherList.map((teacher) => {
                    const saved = isTeacherSaved(teacher.slug)
                    const ratingValue =
                      teacher.reviewCount > 0 ? teacher.averageRating : 0
                    const ratingStyle = getRatingStyle(ratingValue)
                    const badgeStyle = {
                      '--rating-gradient': ratingStyle.background,
                      '--rating-text': ratingStyle.textColor,
                    } as CSSProperties
                    return (
                      <li
                        key={teacher.id}
                        className="relative rounded-2xl border border-zinc-100 text-sm text-zinc-700 transition hover:border-emerald-300 hover:shadow dark:border-zinc-800 dark:text-zinc-200 dark:hover:border-emerald-400"
                      >
                        <Link
                          href={`/teachers/${teacher.slug}`}
                          className="flex items-center justify-between gap-2 px-4 py-4"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className="text-base font-semibold text-zinc-900 dark:text-white">
                                {teacher.fullName}
                              </p>
                              <button
                                type="button"
                                onClick={(event) => {
                                  event.preventDefault()
                                  event.stopPropagation()
                                  if (!user) return
                                  toggleSavedTeacher(teacher.slug)
                                }}
                                disabled={!user || isMutating(teacher.slug)}
                                aria-pressed={saved}
                                aria-label={saved ? 'Remove from saved' : 'Save teacher'}
                                className={`inline-flex items-center rounded-full border px-2 py-1 text-xs font-semibold transition ${
                                  saved
                                    ? 'border-emerald-300 text-emerald-600 dark:border-emerald-400/60 dark:text-emerald-200'
                                    : 'border-zinc-200 text-zinc-500 hover:border-emerald-300 hover:text-emerald-600 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-emerald-400 dark:hover:text-emerald-300'
                                } disabled:cursor-not-allowed disabled:opacity-60`}
                              >
                                <Bookmark
                                  className="h-4 w-4"
                                  fill={saved ? 'currentColor' : 'none'}
                                />
                                <span className="sr-only">
                                  {saved ? 'Remove from saved' : 'Save teacher'}
                                </span>
                              </button>
                            </div>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">
                              {teacher.department || 'Department coming soon'}
                            </p>
                            {teacher.grades.length > 0 && (
                              <p className="text-xs text-zinc-400 dark:text-zinc-500">
                                {teacher.grades.length > 1
                                  ? `Grades ${teacher.grades.join(', ')}`
                                  : `Grade ${teacher.grades[0]}`}
                              </p>
                            )}
                          </div>
                          <div className="flex flex-col items-end gap-2 text-right">
                            <div
                              className="rounded-2xl bg-white px-4 py-3 text-center shadow-inner [background-image:var(--rating-gradient)] [color:var(--rating-text)]"
                              style={badgeStyle}
                            >
                              <p className="text-2xl font-semibold">
                                {teacher.reviewCount > 0
                                  ? teacher.averageRating.toFixed(2)
                                  : 'N/A'}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={(event) => {
                                event.preventDefault()
                                event.stopPropagation()
                                handleDeleteTeacher(teacher)
                              }}
                              disabled={deletingTeacher === teacher.slug}
                              className="inline-flex items-center justify-center rounded-full border border-red-200 px-3 py-1 text-xs font-semibold text-red-600 transition hover:border-red-400 dark:border-red-500/40 dark:text-red-300"
                            >
                              {deletingTeacher === teacher.slug ? 'Deleting…' : 'Delete'}
                            </button>
                          </div>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              )}
            </section>
          </div>
        )}
        </div>
      </Container>
      {showAddTeacherModal && data && (
        <AddTeacherModal
          values={teacherForm}
          onChange={setTeacherForm}
          onSave={handleTeacherSave}
          onClose={closeAddTeacherModal}
          isSubmitting={isSavingTeacher}
          error={teacherModalError}
          title={`Add a teacher at ${data.school.name}`}
        />
      )}
    </>
  )
}
  const handleDeleteSchool = async () => {
    if (!data) return
    const confirmed = window.confirm(
      `Remove ${data.school.name}? This will delete all teachers and reviews for this school.`,
    )
    if (!confirmed) return

    setDeletingSchool(true)
    try {
      const response = await fetch(`/api/schools/${data.school.slug}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        const body = await response.json().catch(() => null)
        throw new Error(body?.error ?? 'Unable to delete this school right now.')
      }
      router.push('/')
      router.refresh()
    } catch (error) {
      window.alert(
        error instanceof Error ? error.message : 'Unable to delete this school right now.',
      )
      setDeletingSchool(false)
    }
  }
