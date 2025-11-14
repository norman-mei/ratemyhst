import { NextResponse } from 'next/server'
import { z } from 'zod'

import { ensureDemoData } from '@/lib/demoData'
import { mapSchoolProfilePayload } from '@/lib/mappers'
import { prisma } from '@/lib/prisma'

const ratingSchema = z.number().min(1).max(5)

const reviewSchema = z.object({
  overall: ratingSchema,
  location: ratingSchema,
  safety: ratingSchema,
  reputation: ratingSchema,
  opportunities: ratingSchema,
  happiness: ratingSchema,
  clubs: ratingSchema,
  internet: ratingSchema,
  facilities: ratingSchema,
  social: ratingSchema,
  food: ratingSchema,
  comment: z.string().min(1).max(500),
})

function nextAverage(current: number, count: number, incoming: number) {
  if (!count) {
    return incoming
  }
  return (current * count + incoming) / (count + 1)
}

export async function POST(
  request: Request,
  { params }: { params: { slug: string } },
) {
  await ensureDemoData()

  const payload = await request.json().catch(() => null)
  const parsed = reviewSchema.safeParse(payload)

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid data', details: parsed.error.flatten() },
      { status: 400 },
    )
  }

  const school = await prisma.school.findUnique({
    where: { slug: params.slug },
    include: { reviews: true, teachers: { include: { reviews: true } } },
  })

  if (!school) {
    return NextResponse.json({ error: 'School not found' }, { status: 404 })
  }

  const {
    overall,
    location,
    safety,
    reputation,
    opportunities,
    happiness,
    clubs,
    internet,
    facilities,
    social,
    food,
    comment,
  } = parsed.data

  await prisma.schoolReview.create({
    data: {
      schoolId: school.id,
      overall,
      location,
      safety,
      reputation,
      opportunities,
      happiness,
      clubs,
      internet,
      facilities,
      social,
      food,
      comment,
    },
  })

  const newCount = school.ratingCount + 1

  const updated = await prisma.school.update({
    where: { id: school.id },
    data: {
      ratingCount: newCount,
      ratingOverall: nextAverage(school.ratingOverall, school.ratingCount, overall),
      ratingLocation: nextAverage(school.ratingLocation, school.ratingCount, location),
      ratingSafety: nextAverage(school.ratingSafety, school.ratingCount, safety),
      ratingReputation: nextAverage(school.ratingReputation, school.ratingCount, reputation),
      ratingOpportunities: nextAverage(school.ratingOpportunities, school.ratingCount, opportunities),
      ratingHappiness: nextAverage(school.ratingHappiness, school.ratingCount, happiness),
      ratingClubs: nextAverage(school.ratingClubs, school.ratingCount, clubs),
      ratingInternet: nextAverage(school.ratingInternet, school.ratingCount, internet),
      ratingFacilities: nextAverage(school.ratingFacilities, school.ratingCount, facilities),
      ratingSocial: nextAverage(school.ratingSocial, school.ratingCount, social),
      ratingFood: nextAverage(school.ratingFood, school.ratingCount, food),
    },
    include: {
      teachers: {
        include: { reviews: true },
        orderBy: { fullName: 'asc' },
      },
      reviews: true,
    },
  })

  return NextResponse.json(mapSchoolProfilePayload(updated), { status: 201 })
}
