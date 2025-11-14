import { LANGUAGE_VALUES, type LanguageChoice } from '@/lib/languageContent'

const THEME_VALUES = ['light', 'dark', 'system'] as const
const FONT_SIZE_VALUES = ['small', 'medium', 'large'] as const

export type ThemeChoice = (typeof THEME_VALUES)[number]
export type FontSize = (typeof FONT_SIZE_VALUES)[number]

export type UserSettingsSnapshot = {
  theme: ThemeChoice
  notifications: boolean
  emailUpdates: boolean
  privateProfile: boolean
  language: LanguageChoice
  fontSize: FontSize
  autoSave: boolean
  showRatings: boolean
  compactView: boolean
}

export type PersistableSettings = Partial<Omit<UserSettingsSnapshot, 'language'>>

export const DEFAULT_USER_SETTINGS: UserSettingsSnapshot = {
  theme: 'system',
  notifications: true,
  emailUpdates: false,
  privateProfile: false,
  language: 'English',
  fontSize: 'medium',
  autoSave: true,
  showRatings: true,
  compactView: false,
}

export const THEME_OPTIONS: ThemeChoice[] = [...THEME_VALUES]
export const FONT_SIZE_OPTIONS: FontSize[] = [...FONT_SIZE_VALUES]

export function mergeSettings(
  base: UserSettingsSnapshot,
  overrides?: Partial<UserSettingsSnapshot>,
): UserSettingsSnapshot {
  if (!overrides) {
    return base
  }
  return { ...base, ...overrides }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export function normalizeSettingsPayload(
  value: unknown,
): Partial<UserSettingsSnapshot> | undefined {
  if (!isRecord(value)) {
    return undefined
  }

  const next: Partial<UserSettingsSnapshot> = {}

  const maybeTheme = value.theme
  if (
    typeof maybeTheme === 'string' &&
    THEME_VALUES.includes(maybeTheme as ThemeChoice)
  ) {
    next.theme = maybeTheme as ThemeChoice
  }

  const maybeFontSize = value.fontSize
  if (
    typeof maybeFontSize === 'string' &&
    FONT_SIZE_VALUES.includes(maybeFontSize as FontSize)
  ) {
    next.fontSize = maybeFontSize as FontSize
  }

  const language = value.language
  if (
    typeof language === 'string' &&
    LANGUAGE_VALUES.includes(language as LanguageChoice)
  ) {
    next.language = language as LanguageChoice
  }

  const booleanKeys: (keyof UserSettingsSnapshot)[] = [
    'notifications',
    'emailUpdates',
    'privateProfile',
    'autoSave',
    'showRatings',
    'compactView',
  ]
  booleanKeys.forEach((key) => {
    if (typeof value[key] === 'boolean') {
      next[key] = value[key] as boolean
    }
  })

  return Object.keys(next).length > 0 ? next : undefined
}

export function normalizePersistableSettings(
  value: unknown,
): PersistableSettings | undefined {
  const snapshot = normalizeSettingsPayload(value)
  if (!snapshot) return undefined
  const { language, ...rest } = snapshot
  return rest
}

export function extractPersistableSettings(
  settings: UserSettingsSnapshot,
): PersistableSettings {
  const { language, ...rest } = settings
  return rest
}
