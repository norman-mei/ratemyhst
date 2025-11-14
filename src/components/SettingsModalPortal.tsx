'use client'

import { X } from 'lucide-react'

import { SettingsModal } from '@/components/SettingsModal'
import { useUserSettings } from '@/context/UserSettingsContext'
import { getLanguageCopy } from '@/lib/languageContent'

export function SettingsModalPortal() {
  const {
    settings,
    updateSetting,
    isSettingsOpen,
    closeSettings,
    toast,
    hideToast,
    isAuthenticated,
  } = useUserSettings()

  const copy = getLanguageCopy(settings.language)

  return (
    <>
      {isSettingsOpen && (
        <SettingsModal
          settings={settings}
          onChange={updateSetting}
          onClose={closeSettings}
          isAuthenticated={isAuthenticated}
          copy={copy.settingsPanel}
        />
      )}

      {toast.visible && (
        <div className="fixed bottom-6 right-6 z-50 w-72 rounded-2xl border border-emerald-200 bg-white p-4 text-sm shadow-lg shadow-emerald-600/20 dark:border-emerald-500/40 dark:bg-zinc-900">
          <div className="flex items-start justify-between gap-3">
            <p className="text-sm text-zinc-700 dark:text-zinc-100">
              {toast.message}
            </p>
            <button
              type="button"
              onClick={hideToast}
              className="rounded-full p-1 text-zinc-500 transition hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
              aria-label="Dismiss notification"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}

