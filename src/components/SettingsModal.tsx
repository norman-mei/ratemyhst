'use client'

import { Bell, Globe, Palette, Settings as SettingsIcon, Shield, Sun, Moon, X } from 'lucide-react'
import { type ReactNode } from 'react'

import {
  LANGUAGE_OPTIONS,
  type LanguageChoice,
  type LanguageCopy,
} from '@/lib/languageContent'
import {
  FONT_SIZE_OPTIONS,
  THEME_OPTIONS,
  type UserSettingsSnapshot,
} from '@/lib/userSettings'

type SettingsPanelCopy = LanguageCopy['settingsPanel']

type SettingsModalProps = {
  settings: UserSettingsSnapshot
  onChange: <K extends keyof UserSettingsSnapshot>(
    key: K,
    value: UserSettingsSnapshot[K],
  ) => void
  onClose: () => void
  isAuthenticated: boolean
  copy: SettingsPanelCopy
}

export type SettingsPanelContentProps = {
  settings: UserSettingsSnapshot
  onChange: <K extends keyof UserSettingsSnapshot>(
    key: K,
    value: UserSettingsSnapshot[K],
  ) => void
  isAuthenticated: boolean
  copy: SettingsPanelCopy
}

export function SettingsModal({
  settings,
  onChange,
  onClose,
  isAuthenticated,
  copy,
}: SettingsModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-gray-900 rmhst-animate-slide-up"
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-title"
      >
        <div className="sticky top-0 flex items-center justify-between border-b border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <h2
            id="settings-title"
            className="text-2xl font-semibold text-gray-900 dark:text-white"
          >
            {copy.title}
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Close settings"
          >
            <X className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        <div className="max-h-[75vh] overflow-y-auto p-6">
          <SettingsPanelContent
            settings={settings}
            onChange={onChange}
            isAuthenticated={isAuthenticated}
            copy={copy}
          />
          <div className="border-t border-gray-200 pt-4 dark:border-gray-800">
            <button
              onClick={onClose}
              className="w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition hover:-translate-y-0.5 hover:bg-blue-700"
            >
              {copy.saveButton}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function SettingsPanelContent({
  settings,
  onChange,
  isAuthenticated,
  copy,
}: SettingsPanelContentProps) {
  return (
    <div className="space-y-6">
      <section className="space-y-2">
        <label className="flex items-center text-gray-900 dark:text-white">
          <Palette className="mr-2 h-5 w-5" />
          {copy.theme}
        </label>
        <div className="grid grid-cols-3 gap-2">
          {THEME_OPTIONS.map((theme) => (
            <button
              key={theme}
              onClick={() => onChange('theme', theme)}
              className={`rounded-lg border-2 px-3 py-3 text-sm transition ${
                settings.theme === theme
                  ? 'border-blue-500 bg-blue-50 text-blue-600 dark:bg-blue-900'
                  : 'border-gray-300 text-gray-800 hover:border-gray-400 dark:border-gray-700 dark:text-gray-100'
              }`}
              aria-pressed={settings.theme === theme}
            >
              <span className="flex items-center justify-center gap-2">
                {theme === 'light' && <Sun className="h-5 w-5" />}
                {theme === 'dark' && <Moon className="h-5 w-5" />}
                {theme === 'system' && <SettingsIcon className="h-5 w-5" />}
                {copy.themeOptions[theme] ?? theme}
              </span>
            </button>
          ))}
        </div>
      </section>

      {isAuthenticated && (
        <ToggleGroup
          title={copy.notifications}
          icon={<Bell className="mr-2 h-5 w-5" />}
          items={[
            {
              label: copy.push,
              checked: settings.notifications,
              onChange: (value: boolean) => onChange('notifications', value),
            },
            {
              label: copy.email,
              checked: settings.emailUpdates,
              onChange: (value: boolean) => onChange('emailUpdates', value),
            },
          ]}
        />
      )}

      {isAuthenticated && (
        <ToggleGroup
          title={copy.privacy}
          icon={<Shield className="mr-2 h-5 w-5" />}
          items={[
            {
              label: copy.privateProfile,
              checked: settings.privateProfile,
              onChange: (value: boolean) => onChange('privateProfile', value),
            },
            {
              label: copy.showRatings,
              checked: settings.showRatings,
              onChange: (value: boolean) => onChange('showRatings', value),
            },
          ]}
        />
      )}

      <section className="space-y-2">
        <label className="flex items-center text-gray-900 dark:text-white">
          <Globe className="mr-2 h-5 w-5" />
          {copy.language}
        </label>
        <select
          value={settings.language}
          onChange={(event) =>
            onChange('language', event.target.value as LanguageChoice)
          }
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        >
          {LANGUAGE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </section>

      <section className="space-y-2">
        <label className="text-gray-900 dark:text-white">{copy.fontSize}</label>
        <div className="grid grid-cols-3 gap-2">
          {FONT_SIZE_OPTIONS.map((size) => (
            <button
              key={size}
              onClick={() => onChange('fontSize', size)}
              className={`rounded-lg border-2 px-3 py-3 text-sm transition ${
                settings.fontSize === size
                  ? 'border-blue-500 bg-blue-50 text-blue-600 dark:bg-blue-900'
                  : 'border-gray-300 text-gray-800 hover:border-gray-400 dark:border-gray-700 dark:text-gray-100'
              }`}
              aria-pressed={settings.fontSize === size}
            >
              {copy.fontSizeOptions[size] ?? size}
            </button>
          ))}
        </div>
      </section>

      <ToggleGroup
        title={copy.display}
        icon={<Palette className="mr-2 h-5 w-5" />}
        items={[
          ...(isAuthenticated
            ? [
                {
                  label: copy.autoSave,
                  checked: settings.autoSave,
                  onChange: (value: boolean) => onChange('autoSave', value),
                },
              ]
            : []),
          {
            label: copy.compactView,
            checked: settings.compactView,
            onChange: (value: boolean) => onChange('compactView', value),
          },
        ]}
      />
    </div>
  )
}

function ToggleGroup({
  title,
  icon,
  items,
}: {
  title: string
  icon: ReactNode
  items: { label: string; checked: boolean; onChange: (value: boolean) => void }[]
}) {
  return (
    <section className="space-y-2">
      <label className="flex items-center text-gray-900 dark:text-white">
        {icon}
        {title}
      </label>
      <div className="space-y-2">
        {items.map((item) => (
          <label
            key={item.label}
            className="flex items-center justify-between rounded-lg border border-gray-200 p-3 text-sm transition hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
          >
            <span className="text-gray-700 dark:text-gray-300">{item.label}</span>
            <input
              type="checkbox"
              checked={item.checked}
              onChange={(event) => item.onChange(event.target.checked)}
              className="h-5 w-5 rounded text-blue-600 focus:ring-blue-500"
            />
          </label>
        ))}
      </div>
    </section>
  )
}
