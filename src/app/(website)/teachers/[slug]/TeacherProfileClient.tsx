'use client'

import Link from 'next/link'
import { Bookmark, Pencil } from 'lucide-react'
import { useEffect, useMemo, useState, type FormEvent } from 'react'

import { Container } from '@/components/Container'
import { useAuth } from '@/context/AuthContext'
import { useSavedTeachers } from '@/context/SavedTeachersContext'
import {
  REVIEW_TAG_LIMIT,
  REVIEW_TAG_OPTIONS,
  TAKE_AGAIN_CHOICES,
  type ReviewTagOption,
  type TakeAgainChoice,
} from '@/lib/reviewTags'
import {
  RATING_VALUES,
  calculateAverageRating,
  getRatingDistribution,
  type RatingValue,
} from '@/lib/teachers'

const DATE_FORMATTER = new Intl.DateTimeFormat('en', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
})

const CUSTOM_COURSE_OPTION = '__rmhst_custom_course__'

export type TeacherProfileData = {
  teacher: {
    id: string
    slug: string
    fullName: string
    department: string | null
    grades: string[]
  }
  school: {
    id: string
    name: string
    city: string | null
    state: string | null
    zipCode: string | null
  }
  reviews: ReviewPayload[]
}

export type ReviewPayload = {
  id: string
  author: string
  rating: number
  difficulty: number
  comment: string
  courseCode: string
  takeAgain: TakeAgainChoice
  tags: string[]
  createdAt: string
}

type ReviewFormState = {
  rating: number
  difficulty: number
  comment: string
  courseCode: string
  customCourseCode: string
  takeAgain: TakeAgainChoice
  tags: ReviewTagOption[]
}

const INITIAL_FORM: ReviewFormState = {
  rating: 5,
  difficulty: 3,
  comment: '',
  courseCode: '',
  customCourseCode: '',
  takeAgain: 'Yes',
  tags: [],
}

type StatusMessage = { type: 'success' | 'error'; text: string }

export default function TeacherProfileClient({ slug }: { slug: string }) {
  const [teacherData, setTeacherData] = useState<TeacherProfileData | null>(null)
  const [formState, setFormState] = useState<ReviewFormState>(INITIAL_FORM)
  const [status, setStatus] = useState<StatusMessage | null>(null)
  const [hasLoaded, setHasLoaded] = useState(false)
  const [isEditingDepartment, setIsEditingDepartment] = useState(false)
  const [departmentInput, setDepartmentInput] = useState('')
  const [departmentFeedback, setDepartmentFeedback] = useState<StatusMessage | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [refreshIndex, setRefreshIndex] = useState(0)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const { user } = useAuth()
  const {
    toggleTeacher: toggleSavedTeacher,
    isTeacherSaved,
    isMutating,
  } = useSavedTeachers()

  useEffect(() => {
    const controller = new AbortController()
    setHasLoaded(false)
    setLoadError(null)
    fetch(`/api/teachers/${slug}`, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) {
          const body = await response.json().catch(() => null)
          throw new Error(body?.error ?? 'Unable to load teacher.')
        }
        return response.json()
      })
      .then((data: TeacherProfileData) => {
        setTeacherData(data)
      })
      .catch((error) => {
        if (controller.signal.aborted) return
        setTeacherData(null)
        setLoadError(error instanceof Error ? error.message : 'Unable to load teacher.')
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setHasLoaded(true)
        }
      })

    return () => controller.abort()
  }, [slug, refreshIndex])

  useEffect(() => {
    setDepartmentInput(teacherData?.teacher.department ?? '')
  }, [teacherData])

  useEffect(() => {
    if (!departmentFeedback) return
    const timer = setTimeout(() => {
      setDepartmentFeedback(null)
    }, departmentFeedback.type === 'success' ? 4000 : 6000)
    return () => clearTimeout(timer)
  }, [departmentFeedback])

  const reviews = useMemo(() => teacherData?.reviews ?? [], [teacherData])
  const averageRating = calculateAverageRating(reviews)
  const ratingDistribution = useMemo(() => getRatingDistribution(reviews), [reviews])
  const maxBucket = Math.max(1, ...RATING_VALUES.map((value) => ratingDistribution[value as RatingValue]))
  const remainingCharacters = 500 - formState.comment.length
  const departmentLabel = teacherData?.teacher.department?.trim() || 'Department TBD'
  const courseOptions = useMemo(() => {
    const set = new Set<string>()
    reviews.forEach((review) => {
      if (review.courseCode) {
        set.add(review.courseCode)
      }
    })
    return Array.from(set)
  }, [reviews])
  const showCustomCourseInput = formState.courseCode === CUSTOM_COURSE_OPTION
  const resolvedCourseCode = showCustomCourseInput
    ? formState.customCourseCode.trim()
    : formState.courseCode.trim()
  const tagLimitReached = formState.tags.length >= REVIEW_TAG_LIMIT
  const canSubmit = Boolean(formState.comment.trim()) && Boolean(resolvedCourseCode)
  const currentTeacherSlug = teacherData?.teacher.slug ?? ''
  const isTeacherBookmarked = currentTeacherSlug
    ? isTeacherSaved(currentTeacherSlug)
    : false
  const bookmarkPending = currentTeacherSlug
    ? isMutating(currentTeacherSlug)
    : false

  const refreshTeacher = () => setRefreshIndex((index) => index + 1)
  const toggleReviewForm = () => {
    setShowReviewForm((open) => !open)
  }

  const handleSavedTeacherToggle = () => {
    if (!currentTeacherSlug || !user) {
      return
    }
    toggleSavedTeacher(currentTeacherSlug)
  }

  const handleReviewSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!teacherData) {
      setStatus({ type: 'error', text: 'Unable to find this teacher right now.' })
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

    if (!resolvedCourseCode) {
      setStatus({ type: 'error', text: 'Please select a course code or add a new one.' })
      return
    }

    setStatus(null)

    try {
      const response = await fetch(`/api/teachers/${teacherData.teacher.slug}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rating: Number(formState.rating),
          difficulty: Number(formState.difficulty),
          comment: trimmedComment,
          courseCode: resolvedCourseCode,
          takeAgain: formState.takeAgain,
          tags: formState.tags,
        }),
      })

      if (!response.ok) {
        const body = await response.json().catch(() => null)
        throw new Error(body?.error ?? 'Unable to save your review right now.')
      }

      setFormState({ ...INITIAL_FORM })
      setStatus({
        type: 'success',
        text: `Thanks for rating ${teacherData.teacher.fullName}. We've posted your rating but it is still under review to ensure it meets our Site Guidelines.`,
      })
      refreshTeacher()
    } catch (error) {
      setStatus({
        type: 'error',
        text:
          error instanceof Error
            ? error.message
            : 'Something went wrong while saving your review. Please try again.',
      })
    }
  }

  const handleInputChange = (field: keyof ReviewFormState, value: string) => {
    setStatus(null)
    setFormState((previous) => {
      if (field === 'rating' || field === 'difficulty') {
        return { ...previous, [field]: Number(value) }
      }
      if (field === 'courseCode') {
        return {
          ...previous,
          courseCode: value,
          customCourseCode: value === CUSTOM_COURSE_OPTION ? previous.customCourseCode : '',
        }
      }
      if (field === 'takeAgain') {
        return { ...previous, takeAgain: value as TakeAgainChoice }
      }
      return { ...previous, [field]: value }
    })
  }

  const toggleTag = (tag: ReviewTagOption) => {
    setStatus(null)
    setFormState((previous) => {
      if (previous.tags.includes(tag)) {
        return { ...previous, tags: previous.tags.filter((existing) => existing !== tag) }
      }
      if (previous.tags.length >= REVIEW_TAG_LIMIT) {
        return previous
      }
      return { ...previous, tags: [...previous.tags, tag] }
    })
  }

  const startDepartmentEdit = () => {
    if (!teacherData) return
    setDepartmentInput(teacherData.teacher.department ?? '')
    setDepartmentFeedback(null)
    setIsEditingDepartment(true)
  }

  const cancelDepartmentEdit = () => {
    setIsEditingDepartment(false)
    setDepartmentInput(teacherData?.teacher.department ?? '')
    setDepartmentFeedback(null)
  }

  const handleDepartmentSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!teacherData) return

    const trimmed = departmentInput.trim()
    if (!trimmed) {
      setDepartmentFeedback({ type: 'error', text: 'Please enter a department name.' })
      return
    }

    setDepartmentFeedback(null)

    try {
      const response = await fetch(`/api/teachers/${teacherData.teacher.slug}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ department: trimmed }),
      })

      if (!response.ok) {
        const body = await response.json().catch(() => null)
        throw new Error(body?.error ?? 'Unable to update the department.')
      }

      setIsEditingDepartment(false)
      setDepartmentFeedback({ type: 'success', text: 'Department updated.' })
      refreshTeacher()
    } catch (error) {
      setDepartmentFeedback({
        type: 'error',
        text: error instanceof Error ? error.message : 'Unable to update the department right now.',
      })
    }
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

        {!hasLoaded ? (
          <div className="mt-12 rounded-3xl border border-zinc-100 bg-white/70 p-10 text-center text-sm text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400">
            Loading teacher details...
          </div>
        ) : loadError ? (
          <div className="mt-12 rounded-3xl border border-dashed border-red-200 p-10 text-center dark:border-red-500/60">
            <p className="text-lg font-semibold text-red-700 dark:text-red-300">{loadError}</p>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Double-check the spelling or return to search to pick another teacher.
            </p>
          </div>
        ) : !teacherData ? (
          <div className="mt-12 rounded-3xl border border-dashed border-zinc-300 p-10 text-center dark:border-zinc-700">
            <p className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              We could not find that teacher.
            </p>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Double-check the spelling or add them from the home page search.
            </p>
          </div>
        ) : (
          <div className="mt-10 space-y-10">
            <header className="rounded-3xl border border-zinc-100 bg-white/80 p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/70">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
                <div className="flex-1">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-wrap items-center gap-3">
                      {isEditingDepartment ? (
                        <form className="flex flex-wrap items-center gap-2" onSubmit={handleDepartmentSubmit}>
                          <input
                            type="text"
                            value={departmentInput}
                            onChange={(event) => setDepartmentInput(event.target.value)}
                            className="mt-1 w-60 rounded-full border border-emerald-400 px-4 py-2 text-sm text-zinc-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 dark:border-emerald-500/60 dark:bg-zinc-900 dark:text-white"
                            placeholder="Department"
                          />
                          <button
                            type="submit"
                            className="rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={cancelDepartmentEdit}
                            className="rounded-full border border-transparent px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 hover:border-zinc-200 dark:text-zinc-400"
                          >
                            Cancel
                          </button>
                        </form>
                      ) : (
                        <>
                          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-300">
                            {departmentLabel}
                          </p>
                          <button
                            type="button"
                            onClick={startDepartmentEdit}
                            className="rounded-full border border-transparent p-2 text-emerald-600 transition hover:border-emerald-200 hover:bg-emerald-50 dark:text-emerald-200 dark:hover:border-emerald-400/40 dark:hover:bg-emerald-900/20"
                            aria-label="Edit department"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                        </>
                      )}
                    </div>
                    {departmentFeedback && (
                      <p
                        className={`text-xs ${
                          departmentFeedback.type === 'success'
                            ? 'text-emerald-600 dark:text-emerald-300'
                            : 'text-red-600 dark:text-red-400'
                        }`}
                      >
                        {departmentFeedback.text}
                      </p>
                    )}
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                      {teacherData.teacher.fullName}
                    </h1>
                    <button
                      type="button"
                      onClick={handleSavedTeacherToggle}
                      disabled={!user || !currentTeacherSlug || bookmarkPending}
                      title={!user ? 'Sign in to save teachers' : undefined}
                      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold transition ${
                        isTeacherBookmarked
                          ? 'border-emerald-300 text-emerald-600 dark:border-emerald-400/60 dark:text-emerald-200'
                          : 'border-zinc-200 text-zinc-600 hover:border-emerald-300 hover:text-emerald-600 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-emerald-400'
                      } disabled:cursor-not-allowed disabled:opacity-60`}
                      aria-pressed={isTeacherBookmarked}
                    >
                      <Bookmark
                        className="h-4 w-4"
                        fill={isTeacherBookmarked ? 'currentColor' : 'none'}
                      />
                      {isTeacherBookmarked ? 'Saved' : 'Save teacher'}
                    </button>
                  </div>
                  <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400">
                    {teacherData.school.name} • {teacherData.school.city}, {teacherData.school.state}
                  </p>
                  {teacherData.teacher.grades.length > 0 && (
                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                      {teacherData.teacher.grades.length > 1
                        ? `Teaches grades ${teacherData.teacher.grades.join(', ')}`
                        : `Teaches grade ${teacherData.teacher.grades[0]}`}
                    </p>
                  )}
                </div>
                <div className="rounded-3xl bg-emerald-50 p-6 text-center dark:bg-emerald-900/30">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-800 dark:text-emerald-200">
                    Avg rating
                  </p>
                  <p className="mt-1 text-6xl font-bold text-emerald-600 dark:text-emerald-300">
                    {averageRating.toFixed(2)}
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {reviews.length} review{reviews.length === 1 ? '' : 's'} total
                  </p>
                  <button
                    type="button"
                    onClick={toggleReviewForm}
                    className="mt-4 inline-flex items-center justify-center rounded-full border border-emerald-500 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50 dark:border-emerald-300 dark:text-emerald-200 dark:hover:bg-emerald-400/10"
                  >
                    Share your review
                  </button>
                </div>
              </div>

              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Rating breakdown</h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">Based on recent reviews</p>
                </div>
                <div className="mt-6 grid grid-cols-5 gap-4 sm:gap-6">
                  {RATING_VALUES.map((value) => {
                    const count = ratingDistribution[value]
                    const scaled = Math.round((count / maxBucket) * 100)
                    const barHeight = count === 0 ? 0 : Math.max(12, scaled)

                    return (
                      <div key={value} className="flex flex-col items-center">
                        <div className="flex h-40 w-10 items-end rounded-full bg-emerald-50 p-1 dark:bg-emerald-950/30">
                          <div className="w-full rounded-full bg-emerald-500" style={{ height: `${barHeight}%` }} />
                        </div>
                        <p className="mt-2 text-sm font-semibold text-zinc-900 dark:text-white">{value}</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                          {count} review{count === 1 ? '' : 's'}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </header>

            <section className="space-y-6 rounded-3xl border border-zinc-100 bg-white/80 p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/70">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                  Student reviews for {teacherData.teacher.fullName}
                </h2>
                <button
                  type="button"
                  onClick={toggleReviewForm}
                  className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-500 dark:text-emerald-300"
                >
                  Add yours
                </button>
              </div>
              {reviews.length === 0 ? (
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  No reviews yet. Be the first to tell everyone how this teacher shows up.
                </p>
              ) : (
                <div className="space-y-5">
                  {reviews.map((review) => (
                    <article
                      key={review.id}
                      className="rounded-2xl border border-zinc-200 bg-white/80 p-5 dark:border-zinc-800 dark:bg-zinc-900/60"
                    >
                      <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
                        <span className="font-semibold text-zinc-700 dark:text-zinc-200">
                          {review.author}
                        </span>
                        <span>• {DATE_FORMATTER.format(new Date(review.createdAt))}</span>
                      </div>
                      <p className="mt-3 text-base text-zinc-800 dark:text-zinc-100">{review.comment}</p>
                      <div className="mt-4 flex flex-wrap gap-4 text-xs text-zinc-500 dark:text-zinc-400">
                        <span>Rating {review.rating.toFixed(1)}</span>
                        <span>Difficulty {review.difficulty.toFixed(1)}</span>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-3 text-xs text-zinc-500 dark:text-zinc-400">
                        {review.courseCode && <span>Course {review.courseCode}</span>}
                        <span>• Would take again {review.takeAgain}</span>
                      </div>
                      {review.tags.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {review.tags.map((tag) => (
                            <span
                              key={`${review.id}-${tag}`}
                              className="rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </article>
                  ))}
                </div>
              )}
            </section>

            {showReviewForm && (
              <section
                id="make-review"
                className="rounded-3xl border border-dashed border-emerald-200 bg-emerald-50/70 p-8 dark:border-emerald-500/40 dark:bg-emerald-950/20"
              >
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">Share your review</h2>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                  Remember to follow the RateMyHST community guidelines. Keep it specific, respectful, and under{' '}
                  <strong>500 characters</strong> — longer submissions will not be saved.
                </p>
                <form className="mt-6 space-y-5" onSubmit={handleReviewSubmit}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                        Rating (1-5)
                      </label>
                      <select
                        value={formState.rating}
                        onChange={(event) => handleInputChange('rating', event.target.value)}
                        className="mt-1 w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm text-zinc-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                      >
                        {RATING_VALUES.map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                        Difficulty (1-5)
                      </label>
                      <select
                        value={formState.difficulty}
                        onChange={(event) => handleInputChange('difficulty', event.target.value)}
                        className="mt-1 w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm text-zinc-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                      >
                        {RATING_VALUES.map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                      Course code
                    </label>
                    <select
                      value={formState.courseCode}
                      onChange={(event) => handleInputChange('courseCode', event.target.value)}
                      className="mt-1 w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm text-zinc-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                    >
                      <option value="">Select a course code</option>
                      {courseOptions.map((code) => (
                        <option key={code} value={code}>
                          {code}
                        </option>
                      ))}
                      <option value={CUSTOM_COURSE_OPTION}>Add new course code…</option>
                    </select>
                    {showCustomCourseInput && (
                      <input
                        type="text"
                        value={formState.customCourseCode}
                        onChange={(event) => handleInputChange('customCourseCode', event.target.value)}
                        className="mt-3 w-full rounded-2xl border border-emerald-400 px-4 py-3 text-sm text-zinc-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 dark:border-emerald-500/50 dark:bg-zinc-900 dark:text-white"
                        placeholder="e.g. BIO-210"
                      />
                    )}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                    Would you take this teacher again?
                  </label>
                  <div className="mt-2 flex flex-wrap gap-3">
                    {TAKE_AGAIN_CHOICES.map((option) => (
                      <label
                        key={option}
                        className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold ${
                          formState.takeAgain === option
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:border-emerald-400 dark:bg-emerald-900/30 dark:text-emerald-200'
                            : 'border-zinc-300 text-zinc-600 dark:border-zinc-700 dark:text-zinc-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="take-again"
                          value={option}
                          checked={formState.takeAgain === option}
                          onChange={(event) => handleInputChange('takeAgain', event.target.value)}
                          className="h-4 w-4"
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                    Select up to 3 tags
                  </label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {REVIEW_TAG_OPTIONS.map((tag) => {
                      const selected = formState.tags.includes(tag)
                      const disabled = !selected && tagLimitReached
                      return (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => toggleTag(tag)}
                          disabled={disabled}
                          className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                            selected
                              ? 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:border-emerald-400 dark:bg-emerald-900/30 dark:text-emerald-200'
                              : 'border-zinc-300 text-zinc-600 hover:border-emerald-400 dark:border-zinc-700 dark:text-zinc-300'
                          } ${disabled ? 'opacity-50' : ''}`}
                        >
                          {tag}
                        </button>
                      )
                    })}
                  </div>
                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                    Selected {formState.tags.length}/{REVIEW_TAG_LIMIT}
                  </p>
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
                    placeholder="Share specific moments, projects, or classroom routines that stood out."
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
                  disabled={!canSubmit}
                  className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/30 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:text-zinc-600 disabled:shadow-none"
                >
                  Submit review
                </button>
                </form>
              </section>
            )}
          </div>
        )}
      </div>
    </Container>
  )
}
