import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import { getCurrentUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import {
  mergeCollapsedSections,
  normalizeUiPreferences,
} from '@/lib/preferences'
import { LANGUAGE_VALUES, type LanguageChoice } from '@/lib/languageContent'

const settingsSchema = z.object({
  theme: z.enum(['light', 'dark', 'system']).optional(),
  notifications: z.boolean().optional(),
  emailUpdates: z.boolean().optional(),
  privateProfile: z.boolean().optional(),
  fontSize: z.enum(['small', 'medium', 'large']).optional(),
  autoSave: z.boolean().optional(),
  showRatings: z.boolean().optional(),
  compactView: z.boolean().optional(),
})

const preferencesSchema = z.object({
  collapsedSections: z.record(z.string(), z.boolean()).optional(),
  language: z.custom<LanguageChoice>(
    (val) => typeof val === 'string' && LANGUAGE_VALUES.includes(val as LanguageChoice),
  ).optional(),
  settings: settingsSchema.optional(),
})

export async function PATCH(request: NextRequest) {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const json = await request.json().catch(() => null)
  const parsed = preferencesSchema.safeParse(json)

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }

  const existingPreferences = normalizeUiPreferences(user.uiPreferences)

  const nextPreferences = {
    ...existingPreferences,
    ...(parsed.data.collapsedSections
      ? {
          collapsedSections: mergeCollapsedSections(
            existingPreferences.collapsedSections,
            parsed.data.collapsedSections,
          ),
        }
      : {}),
    ...(parsed.data.language ? { language: parsed.data.language } : {}),
    ...(parsed.data.settings
      ? {
          settings: {
            ...(existingPreferences.settings ?? {}),
            ...parsed.data.settings,
          },
        }
      : {}),
  }

  const updated = await prisma.user.update({
    where: { id: user.id },
    data: {
      uiPreferences: nextPreferences,
    },
  })

  return NextResponse.json({
    preferences: normalizeUiPreferences(updated.uiPreferences),
  })
}
