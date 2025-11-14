import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import SchoolProfileClient from './SchoolProfileClient'
import { ensureDemoData } from '@/lib/demoData'
import { mapSchoolProfilePayload, type SchoolProfilePayload } from '@/lib/mappers'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

async function getSchoolProfile(slug: string): Promise<SchoolProfilePayload | null> {
  await ensureDemoData()
  const school = await prisma.school.findUnique({
    where: { slug },
    include: {
      teachers: {
        include: { reviews: true },
        orderBy: { fullName: 'asc' },
      },
      reviews: true,
    },
  })

  if (!school) {
    return null
  }

  return mapSchoolProfilePayload(school)
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const profile = await getSchoolProfile(params.slug)
  if (!profile) {
    return {
      title: 'School not found | RateMyHST',
    }
  }

  return {
    title: `${profile.school.name} ratings | RateMyHST`,
    description: `${profile.school.name} has an average rating of ${profile.ratings.overall.toFixed(2)} from ${profile.ratings.count} students. Read category-by-category reviews on RateMyHST.`,
  }
}

export default async function SchoolProfilePage({ params }: { params: { slug: string } }) {
  const data = await getSchoolProfile(params.slug)

  if (!data) {
    notFound()
  }

  return <SchoolProfileClient slug={params.slug} initialData={data} />
}
