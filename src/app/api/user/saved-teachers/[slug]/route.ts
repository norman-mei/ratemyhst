import { NextResponse } from 'next/server'

import { getCurrentUser } from '@/lib/auth'
import { ensureDemoData } from '@/lib/demoData'
import { prisma } from '@/lib/prisma'

export async function DELETE(
  _request: Request,
  { params }: { params: { slug: string } },
) {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  await ensureDemoData()

  const teacher = await prisma.teacher.findUnique({
    where: { slug: params.slug },
  })

  if (!teacher) {
    return NextResponse.json({ error: 'Teacher not found' }, { status: 404 })
  }

  await prisma.savedTeacher.deleteMany({
    where: {
      userId: user.id,
      teacherId: teacher.id,
    },
  })

  return NextResponse.json({ success: true })
}
