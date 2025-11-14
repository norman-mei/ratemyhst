import { NextResponse } from 'next/server'
import { z } from 'zod'

import { getCurrentUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const updateProfileSchema = z.object({
  firstName: z.string().max(120).optional(),
  lastName: z.string().max(120).optional(),
  schoolName: z.string().max(180).optional(),
  graduationYear: z
    .number()
    .int()
    .min(1900)
    .max(2100)
    .nullable()
    .optional(),
})

function normalizeProfileField(value?: string) {
  if (typeof value !== 'string') {
    return undefined
  }
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : null
}

function buildProfilePayload(user: {
  firstName: string | null
  lastName: string | null
  schoolName: string | null
  graduationYear: number | null
}) {
  return {
    firstName: user.firstName ?? '',
    lastName: user.lastName ?? '',
    schoolName: user.schoolName ?? '',
    graduationYear: user.graduationYear,
  }
}

export async function GET() {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return NextResponse.json(buildProfilePayload(user))
}

export async function PATCH(request: Request) {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const payload = await request.json().catch(() => null)
  const parsed = updateProfileSchema.safeParse(payload)

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid data', details: parsed.error.flatten() },
      { status: 400 },
    )
  }

  const updates: Record<string, string | number | null | undefined> = {}
  if ('firstName' in parsed.data) {
    updates.firstName = normalizeProfileField(parsed.data.firstName)
  }
  if ('lastName' in parsed.data) {
    updates.lastName = normalizeProfileField(parsed.data.lastName)
  }
  if ('schoolName' in parsed.data) {
    updates.schoolName = normalizeProfileField(parsed.data.schoolName)
  }
  if ('graduationYear' in parsed.data) {
    updates.graduationYear =
      typeof parsed.data.graduationYear === 'number'
        ? parsed.data.graduationYear
        : null
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json(buildProfilePayload(user))
  }

  const updated = await prisma.user.update({
    where: { id: user.id },
    data: updates,
    select: {
      firstName: true,
      lastName: true,
      schoolName: true,
      graduationYear: true,
    },
  })

  return NextResponse.json(buildProfilePayload(updated))
}
