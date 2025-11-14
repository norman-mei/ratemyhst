import { Prisma } from '@prisma/client'
import { NextResponse } from 'next/server'
import { z } from 'zod'

import { ensureDemoData } from '@/lib/demoData'
import { mapSchoolProfilePayload } from '@/lib/mappers'
import { prisma } from '@/lib/prisma'

const updateSchoolSchema = z.object({
  name: z.string().min(2).max(120),
  city: z.string().max(120).optional(),
  state: z.string().max(2).optional(),
  zipCode: z.string().max(16).optional(),
})

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } },
) {
  await ensureDemoData()

  const school = await prisma.school.findUnique({
    where: { slug: params.slug },
    include: {
      teachers: {
        include: { reviews: true },
        orderBy: { fullName: 'asc' },
      },
      reviews: true,
    },
  })

  if (!school) {
    return NextResponse.json({ error: 'School not found' }, { status: 404 })
  }

  return NextResponse.json(mapSchoolProfilePayload(school))
}

export async function PATCH(
  request: Request,
  { params }: { params: { slug: string } },
) {
  await ensureDemoData()

  const payload = await request.json().catch(() => null)
  const parsed = updateSchoolSchema.safeParse(payload)

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid data', details: parsed.error.flatten() },
      { status: 400 },
    )
  }

  const { name, city, state, zipCode } = parsed.data
  const normalizedCity = city?.trim() || null
  const normalizedState = state?.trim().toUpperCase() || null
  const normalizedZip = zipCode?.trim() || null

  try {
    const school = await prisma.school.update({
      where: { slug: params.slug },
      data: {
        name: name.trim(),
        city: normalizedCity,
        state: normalizedState,
        zipCode: normalizedZip,
      },
      include: {
        teachers: {
          include: { reviews: true },
          orderBy: { fullName: 'asc' },
        },
        reviews: true,
      },
    })

    return NextResponse.json(mapSchoolProfilePayload(school))
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json({ error: 'School not found' }, { status: 404 })
    }
    throw error
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { slug: string } },
) {
  await ensureDemoData()

  const school = await prisma.school.findUnique({
    where: { slug: params.slug },
  })

  if (!school) {
    return NextResponse.json({ error: 'School not found' }, { status: 404 })
  }

  await prisma.school.delete({
    where: { id: school.id },
  })

  return NextResponse.json({ success: true })
}
