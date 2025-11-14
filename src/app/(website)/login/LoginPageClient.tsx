'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, type ChangeEvent, type FormEvent } from 'react'

type FormState = {
  email: string
  password: string
  rememberMe: boolean
}

const initialForm: FormState = {
  email: '',
  password: '',
  rememberMe: false,
}

export default function LoginPageClient() {
  const router = useRouter()
  const [form, setForm] = useState<FormState>(initialForm)
  const [showPassword, setShowPassword] = useState(false)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')
  const [error, setError] = useState<string | null>(null)

  const handleChange =
    (field: keyof FormState) => (event: ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }))
      setError(null)
    }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('submitting')
    setError(null)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const payload = await response.json().catch(() => ({}))

      if (!response.ok) {
        setError(payload?.error ?? 'Unable to log in. Check your credentials.')
        setStatus('idle')
        return
      }

      setStatus('success')
      router.push('/')
      router.refresh()
    } catch (err) {
      console.error(err)
      setError('Network error. Please try again.')
      setStatus('idle')
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-white py-10 dark:bg-black md:py-16">
      <div className="mx-auto w-full max-w-2xl px-4">
        <div className="rounded-3xl border border-zinc-200 bg-white/90 p-8 shadow-xl shadow-zinc-200/60 dark:border-zinc-800 dark:bg-zinc-950/60 dark:shadow-black/30">
          <div className="mb-8 space-y-3 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-700 dark:text-emerald-300">
              Welcome back
            </p>
            <h1 className="text-3xl font-semibold text-zinc-900 dark:text-white">
              Log in to RateMyHST
            </h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Enter your email and password to access your saved reviews and settings.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <FormField
              id="email"
              label="Email address"
              type="email"
              value={form.email}
              onChange={handleChange('email')}
              autoComplete="email"
              required
            />
            <PasswordField
              id="password"
              label="Password"
              value={form.password}
              onChange={handleChange('password')}
              autoComplete="current-password"
              show={showPassword}
              onToggle={() => setShowPassword((prev) => !prev)}
            />

            <div className="flex flex-wrap justify-between gap-3 text-sm text-zinc-600 dark:text-zinc-400">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500"
                  checked={form.rememberMe}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, rememberMe: event.target.checked }))
                  }
                />
                Remember me
              </label>
              <Link
                href="/reset-password"
                className="font-semibold text-emerald-600 hover:text-emerald-500 dark:text-emerald-300 dark:hover:text-emerald-200"
              >
                Forgot password?
              </Link>
            </div>

            {error && (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800 dark:border-rose-500 dark:bg-rose-500/10 dark:text-rose-200">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="inline-flex w-full items-center justify-center rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/40 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === 'submitting' ? 'Signing in…' : 'Log in'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
            Don&apos;t have an account?{' '}
            <Link
              href="/signup"
              className="font-semibold text-emerald-600 hover:text-emerald-500 dark:text-emerald-300 dark:hover:text-emerald-200"
            >
              Create one now
            </Link>
          </p>
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
  autoComplete,
  required,
}: {
  id: string
  label: string
  type: string
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
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
        className="w-full rounded-2xl border border-zinc-200 px-4 py-3 text-base text-zinc-900 transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
      />
    </div>
  )
}

function PasswordField({
  id,
  label,
  value,
  onChange,
  autoComplete,
  show,
  onToggle,
}: {
  id: string
  label: string
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  autoComplete?: string
  show: boolean
  onToggle: () => void
}) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="text-sm font-semibold text-zinc-900 dark:text-zinc-100"
      >
        {label}
      </label>
      <div className="flex rounded-2xl border border-zinc-200 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/30 dark:border-zinc-800">
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
    </div>
  )
}
