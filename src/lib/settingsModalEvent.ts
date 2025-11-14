export const SETTINGS_MODAL_EVENT = 'rmhst-open-settings-modal'

export function emitOpenSettingsModalEvent() {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new Event(SETTINGS_MODAL_EVENT))
}
