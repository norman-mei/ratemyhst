import { NextResponse } from 'next/server'
import { z } from 'zod'

import { ensureDemoData } from '@/lib/demoData'
import { mapSchoolSummaryPayload } from '@/lib/mappers'
import { prisma } from '@/lib/prisma'
import { slugify } from '@/lib/strings'

const createSchoolSchema = z.object({
  name: z.string().min(2).max(120),
  city: z.string().max(120).optional().default(''),
  state: z.string().max(2).optional().default(''),
  zipCode: z.string().max(16).optional().default(''),
})

export async function GET() {
  await ensureDemoData()

  const schools = await prisma.school.findMany({
    orderBy: { name: 'asc' },
    include: {
      teachers: {
        include: { reviews: true },
        orderBy: { fullName: 'asc' },
      },
    },
  })

  return NextResponse.json(schools.map(mapSchoolSummaryPayload))
}

export async function POST(request: Request) {
  await ensureDemoData()

  const payload = await request.json().catch(() => null)
  const parsed = createSchoolSchema.safeParse(payload)

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid data', details: parsed.error.flatten() },
      { status: 400 },
    )
  }

  const { name, city, state, zipCode } = parsed.data
  const slugBase = slugify(name)
  let slug = slugBase
  let slugAttempt = 1

  while (true) {
    const existing = await prisma.school.findUnique({ where: { slug } })
    if (!existing) {
      break
    }
    slug = `${slugBase}-${slugAttempt++}`
  }

  const school = await prisma.school.create({
    data: {
      name,
      slug,
      city: city || null,
      state: state || null,
      zipCode: zipCode || null,
    },
    include: {
      teachers: {
        include: { reviews: true },
      },
    },
  })

  return NextResponse.json(mapSchoolSummaryPayload(school), { status: 201 })
}
