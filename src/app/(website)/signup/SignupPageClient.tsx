'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import {
  type ChangeEvent,
  type FormEvent,
  useMemo,
  useState,
} from 'react'

type FormState = {
  email: string
  confirmEmail: string
  password: string
  confirmPassword: string
}

type FormErrors = Partial<Record<keyof FormState, string>>

const initialState: FormState = {
  email: '',
  confirmEmail: '',
  password: '',
  confirmPassword: '',
}

export default function SignupPageClient() {
  const searchParams = useSearchParams()
  const verifiedState = searchParams.get('verified')

  const [form, setForm] = useState<FormState>(initialState)
  const [errors, setErrors] = useState<FormErrors>({})
  const [showPwd, setShowPwd] = useState(false)
  const [showConfirmPwd, setShowConfirmPwd] = useState(false)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>(
    'idle',
  )
  const [apiError, setApiError] = useState<string | null>(null)
  const [resendStatus, setResendStatus] = useState<
    'idle' | 'sending' | 'sent' | 'error'
  >('idle')
  const [resendMessage, setResendMessage] = useState<string | null>(null)

  const passwordChecklist = useMemo(
    () => [
      { label: '8 or more characters', met: form.password.length >= 8 },
      { label: 'At least one uppercase letter', met: /[A-Z]/.test(form.password) },
      { label: 'At least one lowercase letter', met: /[a-z]/.test(form.password) },
      { label: 'At least one special character', met: /[^A-Za-z0-9]/.test(form.password) },
    ],
    [form.password],
  )

  const handleChange =
    (field: keyof FormState) => (event: ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }))
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {}

    if (!form.email) {
      nextErrors.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = 'Enter a valid email address.'
    }

    if (form.confirmEmail !== form.email) {
      nextErrors.confirmEmail = 'Email addresses do not match.'
    }

    if (
      form.password.length < 8 ||
      !/[A-Z]/.test(form.password) ||
      !/[a-z]/.test(form.password) ||
      !/[^A-Za-z0-9]/.test(form.password)
    ) {
      nextErrors.password = 'Password must meet all requirements.'
    }

    if (form.confirmPassword !== form.password) {
      nextErrors.confirmPassword = 'Passwords do not match.'
    }

    return nextErrors
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('submitting')
    setApiError(null)
    const validationErrors = validate()

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setStatus('idle')
      return
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          confirmPassword: form.confirmPassword,
        }),
      })

      const payload = await response.json().catch(() => ({}))

      if (!response.ok) {
        setApiError(
          payload?.error ??
            'Unable to create account. Please try again.',
        )
        setStatus('idle')
        return
      }

      setStatus('success')
      setResendStatus('idle')
      setResendMessage(null)
    } catch (error) {
      console.error(error)
      setApiError('Network error. Please try again.')
      setStatus('idle')
    }
  }

  const handleResend = async () => {
    if (!form.email) {
      setResendStatus('error')
      setResendMessage('Enter your email above before resending.')
      return
    }

    setResendStatus('sending')
    setResendMessage(null)

    try {
      const response = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email }),
      })
      const payload = await response.json().catch(() => ({}))
      if (!response.ok) {
        setResendStatus('error')
        setResendMessage(
          payload?.error ?? 'Unable to resend verification email.',
        )
        return
      }
      setResendStatus('sent')
      setResendMessage(
        payload?.message ?? 'Verification email sent.',
      )
    } catch (error) {
      console.error(error)
      setResendStatus('error')
      setResendMessage('Network error. Please try again.')
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-white py-10 dark:bg-black md:py-16">
      <div className="mx-auto w-full max-w-3xl px-4">
        <div className="rounded-3xl border border-zinc-200 bg-white/90 p-8 shadow-xl shadow-zinc-200/60 dark:border-zinc-800 dark:bg-zinc-950/60 dark:shadow-black/30">
          <div className="mb-8 space-y-3 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-700 dark:text-emerald-300">
              Join RMHST
            </p>
            <h1 className="text-3xl font-semibold text-zinc-900 dark:text-white">
              Create your account
            </h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Enter your school email, set a strong password, and we&apos;ll
              send a verification link to activate your profile.
            </p>
          </div>

          {verifiedState === 'success' && (
            <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800 dark:border-emerald-500 dark:bg-emerald-500/10 dark:text-emerald-200">
              Email verified! You can now log in.
            </div>
          )}
          {verifiedState === 'error' && (
            <div className="mb-6 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800 dark:border-rose-500 dark:bg-rose-500/10 dark:text-rose-200">
              The verification link is invalid or expired. Request a new one
              below.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <FormField
                id="email"
                label="Email address"
                type="email"
                value={form.email}
                onChange={handleChange('email')}
                error={errors.email}
                autoComplete="email"
                required
              />
              <FormField
                id="confirm-email"
                label="Confirm email address"
                type="email"
                value={form.confirmEmail}
                onChange={handleChange('confirmEmail')}
                error={errors.confirmEmail}
                autoComplete="email"
                required
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <PasswordField
                id="password"
                label="Password"
                value={form.password}
                onChange={handleChange('password')}
                error={errors.password}
                show={showPwd}
                onToggle={() => setShowPwd((prev) => !prev)}
                autoComplete="new-password"
              />
              <PasswordField
                id="confirm-password"
                label="Confirm password"
                value={form.confirmPassword}
                onChange={handleChange('confirmPassword')}
                error={errors.confirmPassword}
                show={showConfirmPwd}
                onToggle={() => setShowConfirmPwd((prev) => !prev)}
                autoComplete="new-password"
              />
            </div>

            <div className="rounded-2xl border border-zinc-200 p-4 text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-300">
              <p className="font-semibold text-zinc-900 dark:text-white">
                Password requirements
              </p>
              <ul className="mt-3 space-y-2">
                {passwordChecklist.map((rule) => (
                  <li key={rule.label} className="flex items-center gap-2">
                    <span
                      className={`inline-flex h-2.5 w-2.5 rounded-full ${
                        rule.met
                          ? 'bg-emerald-500'
                          : 'bg-zinc-300 dark:bg-zinc-600'
                      }`}
                    />
                    {rule.label}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <p>
                We&apos;ll email you a verification link immediately after you
                create your account.
              </p>
              <p>
                Need help?{' '}
                <Link
                  href="/help"
                  className="font-semibold text-emerald-600 hover:text-emerald-500 dark:text-emerald-300 dark:hover:text-emerald-200"
                >
                  Contact support
                </Link>
                .
              </p>
            </div>

            {apiError && (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800 dark:border-rose-500 dark:bg-rose-500/10 dark:text-rose-200">
                {apiError}
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="inline-flex w-full items-center justify-center rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/40 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === 'success' ? 'Verification sent' : 'Create account'}
            </button>
          </form>

          {status === 'success' && (
            <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800 dark:border-emerald-500 dark:bg-emerald-500/10 dark:text-emerald-200">
              <p>
                Check your inbox for a verification email. Click the link inside
                to finish activating your RMHST account.
              </p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resendStatus === 'sending'}
                  className="inline-flex w-full items-center justify-center rounded-2xl border border-emerald-600 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:-translate-y-0.5 hover:border-emerald-500 hover:text-emerald-600 dark:text-emerald-200 sm:w-auto"
                >
                  {resendStatus === 'sending'
                    ? 'Sending…'
                    : 'Resend verification email'}
                </button>
                {resendMessage && (
                  <p
                    className={`text-sm ${
                      resendStatus === 'error'
                        ? 'text-rose-600 dark:text-rose-300'
                        : 'text-emerald-700 dark:text-emerald-200'
                    }`}
                  >
                    {resendMessage}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function FormField({
  id,
  label,
  type,
  value,
  onChange,
  error,
  autoComplete,
  required,
}: {
  id: string
  label: string
  type: string
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  error?: string
  autoComplete?: string
  required?: boolean
}) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="text-sm font-semibold text-zinc-900 dark:text-zinc-100"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        required={required}
        className={`w-full rounded-2xl border px-4 py-3 text-base transition ${
          error
            ? 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/40'
            : 'border-zinc-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white'
        }`}
      />
      {error && <p className="text-sm text-rose-500">{error}</p>}
    </div>
  )
}

function PasswordField({
  id,
  label,
  value,
  onChange,
  error,
  show,
  onToggle,
  autoComplete,
}: {
  id: string
  label: string
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  error?: string
  show: boolean
  onToggle: () => void
  autoComplete?: string
}) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="text-sm font-semibold text-zinc-900 dark:text-zinc-100"
      >
        {label}
      </label>
      <div
        className={`flex rounded-2xl border ${
          error
            ? 'border-rose-400 focus-within:border-rose-500 focus-within:ring-2 focus-within:ring-rose-500/40'
            : 'border-zinc-200 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/30 dark:border-zinc-800'
        }`}
      >
        <input
          id={id}
          type={show ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          className="flex-1 rounded-2xl bg-transparent px-4 py-3 text-base text-zinc-900 outline-none dark:text-white"
        />
        <button
          type="button"
          onClick={onToggle}
          className="px-4 text-sm font-semibold text-emerald-600 transition hover:text-emerald-500 dark:text-emerald-300 dark:hover:text-emerald-200"
        >
          {show ? 'Hide' : 'Show'}
        </button>
      </div>
      {error && <p className="text-sm text-rose-500">{error}</p>}
    </div>
  )
}

