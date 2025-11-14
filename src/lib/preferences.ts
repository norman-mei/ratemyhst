import { LANGUAGE_VALUES, type LanguageChoice } from '@/lib/languageContent'
import {
  normalizePersistableSettings,
  type PersistableSettings,
} from '@/lib/userSettings'

type JsonRecord = Record<string, unknown>

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export type CollapsedSections = Record<string, boolean>

export type UiPreferences = {
  collapsedSections?: CollapsedSections
  language?: LanguageChoice
  settings?: PersistableSettings
}

export function normalizeCollapsedSections(
  value: unknown,
): CollapsedSections | undefined {
  if (!isRecord(value)) {
    return undefined
  }
  const entries = Object.entries(value).reduce<CollapsedSections>(
    (acc, [sectionId, raw]) => {
      if (typeof raw === 'boolean') {
        acc[sectionId] = raw
      }
      return acc
    },
    {},
  )
  return Object.keys(entries).length > 0 ? entries : undefined
}

function normalizeLanguage(value: unknown): LanguageChoice | undefined {
  if (typeof value !== 'string') return undefined
  return LANGUAGE_VALUES.includes(value as LanguageChoice)
    ? (value as LanguageChoice)
    : undefined
}

export function normalizeUiPreferences(value: unknown): UiPreferences {
  if (!isRecord(value)) {
    return {}
  }

  const collapsedSections = normalizeCollapsedSections(
    value.collapsedSections,
  )
  const language = normalizeLanguage(value.language)
  const settings = normalizePersistableSettings(value.settings)

  return {
    ...(collapsedSections ? { collapsedSections } : {}),
    ...(language ? { language } : {}),
    ...(settings ? { settings } : {}),
  }
}

export function mergeCollapsedSections(
  current: CollapsedSections | undefined,
  updates: Record<string, boolean>,
): CollapsedSections {
  return {
    ...(current ?? {}),
    ...updates,
  }
}
