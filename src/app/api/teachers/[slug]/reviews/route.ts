import { TakeAgainResponse } from '@prisma/client'
import { NextResponse } from 'next/server'
import { z } from 'zod'

import { ensureDemoData } from '@/lib/demoData'
import { mapReviewPayload } from '@/lib/mappers'
import { prisma } from '@/lib/prisma'
import {
  REVIEW_TAG_LIMIT,
  REVIEW_TAG_OPTIONS,
  TAKE_AGAIN_CHOICES,
} from '@/lib/reviewTags'

const createReviewSchema = z.object({
  rating: z.number().min(1).max(5),
  difficulty: z.number().min(1).max(5),
  comment: z.string().min(1).max(500),
  courseCode: z.string().min(1).max(32),
  takeAgain: z.enum(TAKE_AGAIN_CHOICES),
  tags: z.array(z.string()).max(REVIEW_TAG_LIMIT),
})

export async function POST(
  request: Request,
  { params }: { params: { slug: string } },
) {
  await ensureDemoData()

  const teacher = await prisma.teacher.findUnique({
    where: { slug: params.slug },
  })

  if (!teacher) {
    return NextResponse.json({ error: 'Teacher not found' }, { status: 404 })
  }

  const payload = await request.json().catch(() => null)
  const parsed = createReviewSchema.safeParse(payload)

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid data', details: parsed.error.flatten() },
      { status: 400 },
    )
  }

  const { rating, difficulty, comment, courseCode, takeAgain, tags } = parsed.data

  const sanitizedTags = tags
    .filter((tag) => REVIEW_TAG_OPTIONS.includes(tag as (typeof REVIEW_TAG_OPTIONS)[number]))
    .slice(0, REVIEW_TAG_LIMIT)

  const review = await prisma.review.create({
    data: {
      teacherId: teacher.id,
      author: 'Anonymous Student',
      rating,
      difficulty,
      comment,
      courseCode,
      takeAgain: takeAgain === 'Yes' ? TakeAgainResponse.YES : TakeAgainResponse.NO,
      tags: sanitizedTags,
    },
  })

  return NextResponse.json(mapReviewPayload(review), { status: 201 })
}
