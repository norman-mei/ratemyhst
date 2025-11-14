import { NextResponse } from 'next/server'

import { ensureDemoData } from '@/lib/demoData'
import { mapTeacherSummaryPayload } from '@/lib/mappers'
import { prisma } from '@/lib/prisma'

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
    },
  })

  if (!school) {
    return NextResponse.json({ error: 'School not found' }, { status: 404 })
  }

  return NextResponse.json({
    school: {
      id: school.id,
      name: school.name,
      city: school.city,
      state: school.state,
      zipCode: school.zipCode,
      district: school.district,
    },
    teachers: school.teachers.map(mapTeacherSummaryPayload),
  })
}
