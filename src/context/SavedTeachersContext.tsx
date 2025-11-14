'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { useAuth } from '@/context/AuthContext'
import type { SavedTeacherPayload } from '@/lib/mappers'

type SavedTeachersContextValue = {
  savedTeachers: SavedTeacherPayload[]
  isLoading: boolean
  hasLoaded: boolean
  isMutating: (slug: string) => boolean
  isTeacherSaved: (identifier: string) => boolean
  saveTeacher: (slug: string) => Promise<void>
  removeTeacher: (slug: string) => Promise<void>
  toggleTeacher: (slug: string) => Promise<void>
  refresh: () => Promise<void>
}

const SavedTeachersContext = createContext<SavedTeachersContextValue | undefined>(undefined)

export function SavedTeachersProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [savedTeachers, setSavedTeachers] = useState<SavedTeacherPayload[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)
  const [pending, setPending] = useState<Set<string>>(new Set())

  const setPendingState = useCallback((slug: string, active: boolean) => {
    setPending((previous) => {
      const next = new Set(previous)
      if (active) {
        next.add(slug)
      } else {
        next.delete(slug)
      }
      return next
    })
  }, [])

  const fetchSavedTeachers = useCallback(async () => {
    if (!user) {
      setSavedTeachers([])
      setIsLoading(false)
      setHasLoaded(false)
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/user/saved-teachers', {
        method: 'GET',
        cache: 'no-store',
      })
      if (!response.ok) {
        throw new Error('Unable to load saved teachers.')
      }
      const payload = await response.json()
      const list: SavedTeacherPayload[] = Array.isArray(payload.savedTeachers)
        ? payload.savedTeachers
        : []
      setSavedTeachers(list)
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error(error)
      }
      setSavedTeachers([])
    } finally {
      setIsLoading(false)
      setHasLoaded(true)
    }
  }, [user])

  useEffect(() => {
    if (!user) {
      setSavedTeachers([])
      setHasLoaded(false)
      setIsLoading(false)
      return
    }
    fetchSavedTeachers()
  }, [user, fetchSavedTeachers])

  const isMutating = useCallback(
    (slug: string) => pending.has(slug),
    [pending],
  )

  const isTeacherSaved = useCallback(
    (identifier: string) =>
      savedTeachers.some(
        (entry) =>
          entry.teacherSlug === identifier || entry.teacherId === identifier,
      ),
    [savedTeachers],
  )

  const saveTeacher = useCallback(
    async (slug: string) => {
      if (!user || !slug) return
      setPendingState(slug, true)
      try {
        const response = await fetch('/api/user/saved-teachers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ teacherSlug: slug }),
        })
        if (!response.ok) {
          throw new Error('Unable to save teacher.')
        }
        const saved: SavedTeacherPayload = await response.json()
        setSavedTeachers((previous) => {
          const existingIndex = previous.findIndex(
            (entry) => entry.teacherSlug === saved.teacherSlug,
          )
          if (existingIndex !== -1) {
            const updated = [...previous]
            updated[existingIndex] = saved
            return updated
          }
          return [saved, ...previous]
        })
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error(error)
        }
      } finally {
        setPendingState(slug, false)
      }
    },
    [user, setPendingState],
  )

  const removeTeacher = useCallback(
    async (slug: string) => {
      if (!user || !slug) return
      setPendingState(slug, true)
      try {
        const response = await fetch(`/api/user/saved-teachers/${slug}`, {
          method: 'DELETE',
        })
        if (!response.ok && response.status !== 404) {
          throw new Error('Unable to unsave teacher.')
        }
        setSavedTeachers((previous) =>
          previous.filter((entry) => entry.teacherSlug !== slug),
        )
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error(error)
        }
      } finally {
        setPendingState(slug, false)
      }
    },
    [user, setPendingState],
  )

  const toggleTeacher = useCallback(
    async (slug: string) => {
      if (!slug) return
      if (isTeacherSaved(slug)) {
        await removeTeacher(slug)
      } else {
        await saveTeacher(slug)
      }
    },
    [isTeacherSaved, removeTeacher, saveTeacher],
  )

  const value = useMemo(
    () => ({
      savedTeachers,
      isLoading,
      hasLoaded,
      isMutating,
      isTeacherSaved,
      saveTeacher,
      removeTeacher,
      toggleTeacher,
      refresh: fetchSavedTeachers,
    }),
    [
      savedTeachers,
      isLoading,
      hasLoaded,
      isMutating,
      isTeacherSaved,
      saveTeacher,
      removeTeacher,
      toggleTeacher,
      fetchSavedTeachers,
    ],
  )

  return (
    <SavedTeachersContext.Provider value={value}>
      {children}
    </SavedTeachersContext.Provider>
  )
}

export function useSavedTeachers() {
  const ctx = useContext(SavedTeachersContext)
  if (!ctx) {
    throw new Error('useSavedTeachers must be used within a SavedTeachersProvider')
  }
  return ctx
}
