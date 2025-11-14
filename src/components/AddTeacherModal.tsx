'use client'

import { X } from 'lucide-react'

export type AddTeacherFormValues = {
  firstName: string
  lastName: string
  department: string
  grades: string[]
}

type AddTeacherModalProps = {
  values: AddTeacherFormValues
  onChange: (next: AddTeacherFormValues) => void
  onSave: (data: AddTeacherFormValues) => void | Promise<void>
  onClose: () => void
  isSubmitting: boolean
  error: string | null
  title?: string
}

const GRADE_OPTIONS = ['9', '10', '11', '12']
const DEPARTMENT_OPTIONS = [
  'Mathematics',
  'English',
  'Biology',
  'Chemistry',
  'Physics',
  'Earth Science',
  'Computer Science',
  'History',
  'World Languages',
  'Social Studies',
  'Economics',
  'Government & Civics',
  'Business & Entrepreneurship',
  'Career & Technical Education',
  'Art & Design',
  'Music',
  'Theater & Performing Arts',
  'Physical Education',
  'Health & Wellness',
  'Special Education',
  'Library & Media',
  'STEM Lab',
  'Journalism & Media',
  'Humanities',
  'Advisory / Student Success',
]

export function AddTeacherModal({
  values,
  onChange,
  onSave,
  onClose,
  isSubmitting,
  error,
  title = 'Add a Teacher',
}: AddTeacherModalProps) {
  const toggleGrade = (grade: string) => {
    onChange({
      ...values,
      grades: values.grades.includes(grade)
        ? values.grades.filter((val) => val !== grade)
        : [...values.grades, grade],
    })
  }

  const selectedDepartment = DEPARTMENT_OPTIONS.includes(values.department)
    ? values.department
    : values.department
      ? '__other'
      : ''

  const isValid =
    values.firstName.trim() &&
    values.lastName.trim() &&
    values.department.trim() &&
    values.grades.length > 0

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-3xl border border-zinc-200 bg-white p-6 shadow-2xl dark:border-zinc-700 dark:bg-zinc-900">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">{title}</h3>
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
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                First Name
              </label>
              <input
                type="text"
                value={values.firstName}
                onChange={(event) =>
                  onChange({ ...values, firstName: event.target.value })
                }
                className="mt-1 w-full rounded-2xl border border-zinc-200 px-4 py-3 text-sm text-zinc-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                placeholder="Jordan"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                Last Name
              </label>
              <input
                type="text"
                value={values.lastName}
                onChange={(event) =>
                  onChange({ ...values, lastName: event.target.value })
                }
                className="mt-1 w-full rounded-2xl border border-zinc-200 px-4 py-3 text-sm text-zinc-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                placeholder="Reyes"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Department
            </label>
            <select
              value={selectedDepartment || ''}
              onChange={(event) => {
                const value = event.target.value
                if (value === '__other') {
                  onChange({ ...values, department: '' })
                } else {
                  onChange({ ...values, department: value })
                }
              }}
              className="mt-1 w-full rounded-2xl border border-zinc-200 px-4 py-3 text-sm text-zinc-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
            >
              <option value="">Select a department</option>
              {DEPARTMENT_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
              <option value="__other">Other / Not listed</option>
            </select>
            {selectedDepartment === '__other' && (
              <input
                type="text"
                value={values.department}
                onChange={(event) =>
                  onChange({ ...values, department: event.target.value })
                }
                className="mt-3 w-full rounded-2xl border border-zinc-200 px-4 py-3 text-sm text-zinc-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                placeholder="Enter department"
              />
            )}
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Grades they teach
            </label>
            <div className="mt-2 flex flex-wrap gap-2">
              {GRADE_OPTIONS.map((grade) => (
                <button
                  key={grade}
                  type="button"
                  onClick={() => toggleGrade(grade)}
                  className={`rounded-full border px-4 py-2 text-sm ${
                    values.grades.includes(grade)
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:border-emerald-400 dark:bg-emerald-900/30 dark:text-emerald-200'
                      : 'border-zinc-300 text-zinc-700 hover:border-emerald-400 dark:border-zinc-600 dark:text-zinc-200'
                  }`}
                >
                  Grade {grade}
                </button>
              ))}
            </div>
          </div>
          <button
            type="button"
            disabled={!isValid || isSubmitting}
            onClick={() => isValid && !isSubmitting && onSave(values)}
            className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/30 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:shadow-none"
          >
            {isSubmitting ? 'Saving…' : 'Save teacher'}
          </button>
          {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
        </div>
      </div>
    </div>
  )
}
