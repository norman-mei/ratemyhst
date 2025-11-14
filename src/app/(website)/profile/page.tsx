'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Bookmark } from 'lucide-react'
import { useEffect, useMemo, useState, type FormEvent } from 'react'

import { Container } from '@/components/Container'
import { SettingsPanelContent } from '@/components/SettingsModal'
import { useAuth } from '@/context/AuthContext'
import { useSavedTeachers } from '@/context/SavedTeachersContext'
import { useUserSettings } from '@/context/UserSettingsContext'
import { getLanguageCopy } from '@/lib/languageContent'

type ProfileFormState = {
  firstName: string
  lastName: string
  schoolName: string
  graduationYear: string
}

type StatusMessage = { type: 'success' | 'error'; text: string } | null

export default function ProfilePage() {
  const router = useRouter()
  const { user, loading, refresh, logoutLocally } = useAuth()
  const { settings, updateSetting, isAuthenticated: settingsAuthed } = useUserSettings()
  const {
    savedTeachers,
    isLoading: savedLoading,
    hasLoaded: savedLoaded,
    removeTeacher,
    toggleTeacher,
    isMutating,
  } = useSavedTeachers()
  const [profileForm, setProfileForm] = useState<ProfileFormState>({
    firstName: '',
    lastName: '',
    schoolName: '',
    graduationYear: '',
  })
  const [status, setStatus] = useState<StatusMessage>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState<'profile' | 'account' | 'saved' | 'reviews'>('profile')
  const searchParams = useSearchParams()

  const languageCopy = getLanguageCopy(settings.language)
  const profileCopy = languageCopy.profilePanel

  useEffect(() => {
    setProfileForm({
      firstName: user?.firstName ?? '',
      lastName: user?.lastName ?? '',
      schoolName: user?.schoolName ?? '',
      graduationYear: user?.graduationYear ? String(user.graduationYear) : '',
    })
  }, [user])

  useEffect(() => {
    if (!status) return
    const timeout = window.setTimeout(
      () => setStatus(null),
      status.type === 'success' ? 4000 : 6000,
    )
    return () => window.clearTimeout(timeout)
  }, [status])

  useEffect(() => {
    const tabParam = searchParams.get('tab')
    if (!tabParam) return
    const mapped =
      tabParam === 'my-reviews'
        ? 'reviews'
        : tabParam === 'saved'
          ? 'saved'
          : tabParam === 'account'
            ? 'account'
            : tabParam === 'profile'
              ? 'profile'
              : tabParam === 'reviews'
                ? 'reviews'
                : null
    if (mapped) {
      setActiveTab(mapped)
    }
  }, [searchParams])

  const handleProfileFieldChange = (field: keyof ProfileFormState, value: string) => {
    setProfileForm((previous) => {
      if (field === 'graduationYear') {
        return {
          ...previous,
          graduationYear: value.replace(/\D/g, '').slice(0, 4),
        }
      }
      return { ...previous, [field]: value }
    })
  }

  const handleProfileSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!user) return
    setStatus(null)
    setIsSaving(true)

    const trimmedYear = profileForm.graduationYear.trim()
    let graduationYearValue: number | null = null
    if (trimmedYear) {
      const parsed = Number(trimmedYear)
      if (Number.isNaN(parsed)) {
        setStatus({ type: 'error', text: profileCopy.profile.error })
        setIsSaving(false)
        return
      }
      graduationYearValue = parsed
    }

    try {
      const response = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: profileForm.firstName.trim(),
          lastName: profileForm.lastName.trim(),
          schoolName: profileForm.schoolName.trim(),
          graduationYear: graduationYearValue,
        }),
      })

      if (!response.ok) {
        throw new Error(profileCopy.profile.error)
      }

      setStatus({ type: 'success', text: profileCopy.profile.success })
      await refresh()
    } catch (error) {
      console.error(error)
      setStatus({ type: 'error', text: profileCopy.profile.error })
    } finally {
      setIsSaving(false)
    }
  }

  const savedList = useMemo(() => savedTeachers, [savedTeachers])
  const tabOptions: { id: 'profile' | 'account' | 'saved' | 'reviews'; label: string }[] = [
    { id: 'profile', label: profileCopy.tabs.profile },
    { id: 'reviews', label: profileCopy.tabs.reviews },
    { id: 'saved', label: profileCopy.tabs.saved },
    { id: 'account', label: profileCopy.tabs.account },
  ]

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
    } catch (error) {
      console.error(error)
    } finally {
      logoutLocally()
      router.push('/')
      router.refresh()
    }
  }

  return (
    <Container>
      <div className="py-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-300">
              {profileCopy.profile.heading}
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">
              {profileCopy.tabs.profile}
            </h1>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              {profileCopy.profile.description}
            </p>
            <p className="text-xs text-zinc-400 dark:text-zinc-500">
              {profileCopy.profile.privacyNote}
            </p>
          </div>
          <Link
            href="/"
            className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-500 dark:text-emerald-300"
          >
            ← Back to home
          </Link>
        </div>

        {loading ? (
          <div className="mt-12 rounded-3xl border border-dashed border-zinc-200 p-8 text-center text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
            Loading your profile…
          </div>
        ) : !user ? (
          <div className="mt-12 rounded-3xl border border-dashed border-zinc-200 p-10 text-center dark:border-zinc-800">
            <p className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              You need to sign in to view your profile.
            </p>
            <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
              Use the link below to log in and start saving teachers.
            </p>
            <Link
              href="/login"
              className="mt-6 inline-flex rounded-full bg-emerald-600 px-6 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5"
            >
              Go to login
            </Link>
          </div>
        ) : (
          <div className="mt-8 space-y-6">
            <div className="flex flex-wrap gap-2 rounded-2xl bg-zinc-100/80 p-1 text-sm font-semibold text-zinc-500 dark:bg-zinc-800/70 dark:text-zinc-400">
              {tabOptions.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  aria-pressed={activeTab === tab.id}
                  className={`flex-1 rounded-xl px-4 py-2 transition ${
                    activeTab === tab.id
                      ? 'bg-white text-emerald-600 shadow dark:bg-zinc-900 dark:text-emerald-300'
                      : 'hover:text-emerald-600 dark:hover:text-emerald-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {activeTab === 'profile' && (
              <section className="rounded-3xl border border-zinc-100 bg-white/80 p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/70">
                <form className="space-y-4" onSubmit={handleProfileSubmit}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                        {profileCopy.profile.firstName}
                      </label>
                      <input
                        type="text"
                        value={profileForm.firstName}
                        onChange={(event) =>
                          handleProfileFieldChange('firstName', event.target.value)
                        }
                        className="mt-1 w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm text-zinc-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                        {profileCopy.profile.lastName}
                      </label>
                      <input
                        type="text"
                        value={profileForm.lastName}
                        onChange={(event) =>
                          handleProfileFieldChange('lastName', event.target.value)
                        }
                        className="mt-1 w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm text-zinc-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                      {profileCopy.profile.school}
                    </label>
                    <input
                      type="text"
                      value={profileForm.schoolName}
                      onChange={(event) =>
                        handleProfileFieldChange('schoolName', event.target.value)
                      }
                      className="mt-1 w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm text-zinc-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                      {profileCopy.profile.graduationYear}
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={4}
                      value={profileForm.graduationYear}
                      onChange={(event) =>
                        handleProfileFieldChange('graduationYear', event.target.value)
                      }
                      className="mt-1 w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm text-zinc-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                      placeholder="2027"
                    />
                  </div>
                  {status && (
                    <p
                      className={`text-sm ${
                        status.type === 'success'
                          ? 'text-emerald-600 dark:text-emerald-300'
                          : 'text-red-600 dark:text-red-400'
                      }`}
                    >
                      {status.text}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="w-full rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/30 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSaving ? profileCopy.profile.saving : profileCopy.profile.save}
                  </button>
                </form>
              </section>
            )}

            {activeTab === 'saved' && (
              <section className="rounded-3xl border border-zinc-100 bg-white/80 p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/70">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                    {profileCopy.tabs.saved}
                  </h2>
                  <Link
                    href="/#search"
                    className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600 transition hover:text-emerald-500 dark:text-emerald-300"
                  >
                    Find more teachers
                  </Link>
                </div>
                {!savedLoaded || savedLoading ? (
                  <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
                    {profileCopy.saved.loading}
                  </p>
                ) : savedList.length === 0 ? (
                  <div className="mt-4 rounded-2xl border border-dashed border-zinc-300 p-6 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
                    <p className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
                      {profileCopy.saved.emptyTitle}
                    </p>
                    <p className="mt-2 text-sm">{profileCopy.saved.emptyDescription}</p>
                  </div>
                ) : (
                  <ul className="mt-4 space-y-3">
                    {savedList.map((entry) => (
                      <li
                        key={entry.id}
                        className="flex items-center justify-between gap-3 rounded-2xl border border-zinc-200 p-3 text-sm text-zinc-700 dark:border-zinc-800 dark:text-zinc-200"
                      >
                        <div className="min-w-0">
                          <Link
                            href={`/teachers/${entry.teacherSlug}`}
                            className="block truncate text-base font-semibold text-zinc-900 hover:text-emerald-600 dark:text-white dark:hover:text-emerald-300"
                          >
                            {entry.teacherName}
                          </Link>
                          {entry.schoolName && (
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">
                              {entry.schoolName}
                            </p>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeTeacher(entry.teacherSlug)}
                          disabled={isMutating(entry.teacherSlug)}
                          className="inline-flex items-center gap-1 rounded-full border border-zinc-200 px-3 py-1 text-xs font-semibold text-zinc-600 transition hover:border-emerald-300 hover:text-emerald-600 disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-emerald-400 dark:hover:text-emerald-300"
                        >
                          <Bookmark className="h-4 w-4" fill="currentColor" />
                          {profileCopy.saved.removeButton}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            )}

            {activeTab === 'reviews' && (
              <section className="rounded-3xl border border-zinc-100 bg-white/80 p-6 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900/70">
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                  {profileCopy.reviews.heading}
                </h2>
                <p className="mt-2 text-base font-semibold text-zinc-900 dark:text-zinc-100">
                  {profileCopy.reviews.emptyTitle}
                </p>
                <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                  {profileCopy.reviews.emptyDescription}
                </p>
                <Link
                  href="/#search"
                  className="mt-4 inline-flex items-center rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white shadow shadow-emerald-600/30 transition hover:-translate-y-0.5"
                >
                  {profileCopy.reviews.cta}
                </Link>
              </section>
            )}

            {activeTab === 'account' && (
              <section className="rounded-3xl border border-zinc-100 bg-white/80 p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/70">
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                  {profileCopy.tabs.account}
                </h2>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                  Adjust appearance, privacy, and notifications anytime.
                </p>
                <div className="mt-4 max-h-[70vh] space-y-6 overflow-y-auto pr-2">
                  <SettingsPanelContent
                    settings={settings}
                    onChange={updateSetting}
                    isAuthenticated={settingsAuthed}
                    copy={languageCopy.settingsPanel}
                  />
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="mt-6 w-full rounded-2xl border border-red-200 px-4 py-3 text-sm font-semibold text-red-600 transition hover:border-red-400 dark:border-red-500/40 dark:text-red-300"
                >
                  {profileCopy.tabs.logout}
                </button>
              </section>
            )}
          </div>
        )}
      </div>
    </Container>
  )
}
