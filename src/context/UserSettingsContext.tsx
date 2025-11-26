'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { useTheme } from 'next-themes'

import { useAuth } from '@/context/AuthContext'
import { SETTINGS_MODAL_EVENT } from '@/lib/settingsModalEvent'
import {
  DEFAULT_USER_SETTINGS,
  type FontSize,
  type UserSettingsSnapshot,
  extractPersistableSettings,
  mergeSettings,
  normalizeSettingsPayload,
} from '@/lib/userSettings'
import { getLanguageCopy, type LanguageChoice } from '@/lib/languageContent'

const SETTINGS_STORAGE_KEY = 'rmhst-settings'

type ToastState = {
  visible: boolean
  message: string
}

type UserSettingsContextValue = {
  settings: UserSettingsSnapshot
  updateSetting: <K extends keyof UserSettingsSnapshot>(
    key: K,
    value: UserSettingsSnapshot[K],
  ) => void
  isSettingsOpen: boolean
  openSettings: () => void
  closeSettings: () => void
  toast: ToastState
  hideToast: () => void
  isAuthenticated: boolean
}

const UserSettingsContext = createContext<UserSettingsContextValue | undefined>(
  undefined,
)

export function UserSettingsProvider({ children }: { children: ReactNode }) {
  const { setTheme } = useTheme()
  const { user, uiPreferences } = useAuth()
  const isAuthenticated = Boolean(user)

  const [settings, setSettings] =
    useState<UserSettingsSnapshot>(DEFAULT_USER_SETTINGS)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [toast, setToast] = useState<ToastState>({
    visible: false,
    message: '',
  })

  const skipPersistRef = useRef(false)
  const hydratedRef = useRef(false)
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const remoteLanguageRef = useRef<LanguageChoice | undefined>(undefined)
  const userChangeRef = useRef(false)

  const copy = useMemo(() => getLanguageCopy(settings.language), [settings.language])

  const showToast = useCallback(() => {
    setToast({ visible: true, message: copy.toastSaved })
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current)
    }
    toastTimeoutRef.current = window.setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }))
    }, 5000)
  }, [copy.toastSaved])

  const hideToast = useCallback(() => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current)
      toastTimeoutRef.current = null
    }
    setToast((prev) => ({ ...prev, visible: false }))
  }, [])

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    setTheme(settings.theme)
  }, [settings.theme, setTheme])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const stored = window.localStorage.getItem(SETTINGS_STORAGE_KEY)
    if (!stored) {
      hydratedRef.current = true
      return
    }
    try {
      const parsed = JSON.parse(stored)
      const normalized = normalizeSettingsPayload(parsed)
      if (normalized) {
        skipPersistRef.current = true
        setSettings((prev) => mergeSettings(prev, normalized))
      }
      hydratedRef.current = true
    } catch {
      // ignore malformed storage
      hydratedRef.current = true
    }
  }, [])

  useEffect(() => {
    const prefLanguage = uiPreferences.language
    if (prefLanguage && prefLanguage !== remoteLanguageRef.current) {
      remoteLanguageRef.current = prefLanguage
      skipPersistRef.current = true
      setSettings((prev) =>
        prev.language === prefLanguage ? prev : { ...prev, language: prefLanguage },
      )
    }
  }, [uiPreferences.language])

  useEffect(() => {
    if (uiPreferences.settings) {
      skipPersistRef.current = true
      setSettings((prev) => mergeSettings(prev, uiPreferences.settings))
    }
  }, [uiPreferences.settings])

  useEffect(() => {
    const root = document.documentElement
    const fontSizeClasses: Record<FontSize, string> = {
      small: 'text-sm',
      medium: 'text-base',
      large: 'text-lg',
    }

    root.classList.remove('text-sm', 'text-base', 'text-lg')
    root.classList.add(fontSizeClasses[settings.fontSize])

    return () => {
      root.classList.remove('text-sm', 'text-base', 'text-lg')
      root.classList.add('text-base')
    }
  }, [settings.fontSize])

  useEffect(() => {
    if (!isAuthenticated) {
      setSettings((prev) =>
        prev.autoSave ? prev : { ...prev, autoSave: true },
      )
    }
  }, [isAuthenticated])

  useEffect(() => {
    const handleOpen = () => setIsSettingsOpen(true)
    window.addEventListener(SETTINGS_MODAL_EVENT, handleOpen)
    return () => window.removeEventListener(SETTINGS_MODAL_EVENT, handleOpen)
  }, [])

  useEffect(() => {
    if (!hydratedRef.current) {
      return
    }

    if (typeof document !== 'undefined') {
      document.documentElement.dataset.language = settings.language
    }

    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('rmhst-language-change', {
          detail: settings.language,
        }),
      )
      window.localStorage.setItem(
        SETTINGS_STORAGE_KEY,
        JSON.stringify(settings),
      )
    }

    if (skipPersistRef.current) {
      skipPersistRef.current = false
      return
    }

    const shouldToast = userChangeRef.current
    userChangeRef.current = false

    if (!isAuthenticated) {
      if (shouldToast) {
        showToast()
      }
      return
    }

    const controller = new AbortController()
    fetch('/api/user/preferences', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        language: settings.language,
        settings: extractPersistableSettings(settings),
      }),
      signal: controller.signal,
    })
      .then((response) => {
        if (response.ok && shouldToast) {
          showToast()
        }
      })
      .catch(() => {})

    return () => controller.abort()
  }, [settings, isAuthenticated, showToast])

  const updateSetting = useCallback(
    <K extends keyof UserSettingsSnapshot>(
      key: K,
      value: UserSettingsSnapshot[K],
    ) => {
      setSettings((prev) => {
        if (prev[key] === value) {
          return prev
        }
        userChangeRef.current = true
        return { ...prev, [key]: value }
      })
    },
    [],
  )

  const openSettings = useCallback(() => setIsSettingsOpen(true), [])
  const closeSettings = useCallback(() => setIsSettingsOpen(false), [])

  const value = useMemo(
    () => ({
      settings,
      updateSetting,
      isSettingsOpen,
      openSettings,
      closeSettings,
      toast,
      hideToast,
      isAuthenticated,
    }),
    [
      settings,
      updateSetting,
      isSettingsOpen,
      openSettings,
      closeSettings,
      toast,
      hideToast,
      isAuthenticated,
    ],
  )

  return (
    <UserSettingsContext.Provider value={value}>
      {children}
    </UserSettingsContext.Provider>
  )
}

export function useUserSettings() {
  const ctx = useContext(UserSettingsContext)
  if (!ctx) {
    throw new Error('useUserSettings must be used within a UserSettingsProvider')
  }
  return ctx
}
