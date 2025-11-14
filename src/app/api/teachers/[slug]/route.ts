import { NextResponse } from 'next/server'
import { z } from 'zod'

import { ensureDemoData } from '@/lib/demoData'
import { mapTeacherProfilePayload } from '@/lib/mappers'
import { prisma } from '@/lib/prisma'

const updateTeacherSchema = z.object({
  department: z.string().min(1).max(120),
})

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } },
) {
  await ensureDemoData()

  const teacher = await prisma.teacher.findUnique({
    where: { slug: params.slug },
    include: {
      reviews: true,
      school: true,
    },
  })

  if (!teacher) {
    return NextResponse.json({ error: 'Teacher not found' }, { status: 404 })
  }

  return NextResponse.json(mapTeacherProfilePayload(teacher))
}

export async function PATCH(
  request: Request,
  { params }: { params: { slug: string } },
) {
  await ensureDemoData()

  const payload = await request.json().catch(() => null)
  const parsed = updateTeacherSchema.safeParse(payload)

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid data', details: parsed.error.flatten() },
      { status: 400 },
    )
  }

  const teacher = await prisma.teacher.update({
    where: { slug: params.slug },
    data: { department: parsed.data.department },
    include: { reviews: true, school: true },
  })

  return NextResponse.json(mapTeacherProfilePayload(teacher))
}

export async function DELETE(
  _request: Request,
  { params }: { params: { slug: string } },
) {
  await ensureDemoData()

  const teacher = await prisma.teacher.findUnique({
    where: { slug: params.slug },
  })

  if (!teacher) {
    return NextResponse.json({ error: 'Teacher not found' }, { status: 404 })
  }

  await prisma.teacher.delete({
    where: { id: teacher.id },
  })

  return NextResponse.json({ success: true })
}
