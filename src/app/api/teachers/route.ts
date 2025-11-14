import { NextResponse } from 'next/server'
import { z } from 'zod'

import { ensureDemoData } from '@/lib/demoData'
import { mapTeacherSummaryPayload } from '@/lib/mappers'
import { prisma } from '@/lib/prisma'
import { slugify } from '@/lib/strings'

const createTeacherSchema = z.object({
  schoolId: z.string().min(1),
  firstName: z.string().min(1).max(60),
  lastName: z.string().min(1).max(60),
  department: z.string().optional().default(''),
  grades: z.array(z.string()).min(1).max(4),
})

export async function POST(request: Request) {
  await ensureDemoData()
  const payload = await request.json().catch(() => null)
  const parsed = createTeacherSchema.safeParse(payload)

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid data', details: parsed.error.flatten() },
      { status: 400 },
    )
  }

  const { schoolId, firstName, lastName, department, grades } = parsed.data

  const school = await prisma.school.findUnique({
    where: { id: schoolId },
  })

  if (!school) {
    return NextResponse.json({ error: 'School not found' }, { status: 404 })
  }

  const fullName = `${firstName} ${lastName}`.trim()
  const duplicate = await prisma.teacher.findFirst({
    where: {
      schoolId,
      fullName,
    },
  })

  if (duplicate) {
    return NextResponse.json(
      { error: 'This teacher is already listed for the selected school.' },
      { status: 409 },
    )
  }
  const baseSlug = slugify(fullName || `${firstName}-${lastName}` || Date.now().toString(36))
  let slug = baseSlug || `teacher-${Date.now().toString(36)}`
  let suffix = 1

  while (true) {
    const existing = await prisma.teacher.findUnique({ where: { slug } })
    if (!existing) {
      break
    }
    slug = `${baseSlug}-${suffix++}`
  }

  const teacher = await prisma.teacher.create({
    data: {
      schoolId,
      slug,
      firstName,
      lastName,
      fullName,
      department: department || null,
      grades,
    },
    include: { reviews: true },
  })

  return NextResponse.json(mapTeacherSummaryPayload(teacher), { status: 201 })
}
