import { NextResponse } from 'next/server'
import { z } from 'zod'

import { getCurrentUser } from '@/lib/auth'
import { ensureDemoData } from '@/lib/demoData'
import { mapSavedTeacherPayload } from '@/lib/mappers'
import { prisma } from '@/lib/prisma'

const saveTeacherSchema = z.object({
  teacherSlug: z.string().min(1).max(120),
})

export async function GET() {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  await ensureDemoData()

  const saved = await prisma.savedTeacher.findMany({
    where: { userId: user.id },
    include: {
      teacher: {
        include: { school: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json({
    savedTeachers: saved.map(mapSavedTeacherPayload),
  })
}

export async function POST(request: Request) {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  await ensureDemoData()

  const payload = await request.json().catch(() => null)
  const parsed = saveTeacherSchema.safeParse(payload)

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid data', details: parsed.error.flatten() },
      { status: 400 },
    )
  }

  const teacher = await prisma.teacher.findUnique({
    where: { slug: parsed.data.teacherSlug },
    include: { school: true },
  })

  if (!teacher) {
    return NextResponse.json({ error: 'Teacher not found' }, { status: 404 })
  }

  const saved = await prisma.savedTeacher.upsert({
    where: {
      userId_teacherId: {
        userId: user.id,
        teacherId: teacher.id,
      },
    },
    update: {},
    create: {
      userId: user.id,
      teacherId: teacher.id,
    },
    include: {
      teacher: { include: { school: true } },
    },
  })

  return NextResponse.json(mapSavedTeacherPayload(saved), { status: 201 })
}
