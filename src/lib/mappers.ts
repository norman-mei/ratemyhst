import {
  TakeAgainResponse,
  type Review,
  type SavedTeacher,
  type School,
  type SchoolReview,
  type Teacher,
} from '@prisma/client'

import { calculateAverageRating } from '@/lib/teachers'

export type ReviewPayload = {
  id: string
  author: string
  rating: number
  difficulty: number
  comment: string
  courseCode: string
  takeAgain: 'Yes' | 'No'
  tags: string[]
  createdAt: string
}

export type TeacherSummaryPayload = {
  id: string
  slug: string
  fullName: string
  department: string | null
  grades: string[]
  averageRating: number
  reviewCount: number
}

export type SchoolRatingsPayload = {
  overall: number
  count: number
  location: number
  safety: number
  reputation: number
  opportunities: number
  happiness: number
  clubs: number
  internet: number
  facilities: number
  social: number
  food: number
}

export type SchoolSummaryPayload = {
  id: string
  slug: string
  name: string
  city: string | null
  state: string | null
  zipCode: string | null
  district: string | null
  ratings: SchoolRatingsPayload
  teachers: TeacherSummaryPayload[]
}

export type SchoolProfilePayload = {
  school: {
    id: string
    slug: string
    name: string
    city: string | null
    state: string | null
    zipCode: string | null
    district: string | null
  }
  ratings: SchoolRatingsPayload
  teachers: TeacherSummaryPayload[]
  reviews: SchoolReviewPayload[]
}

export type SchoolReviewPayload = {
  id: string
  overall: number
  location: number
  safety: number
  reputation: number
  opportunities: number
  happiness: number
  clubs: number
  internet: number
  facilities: number
  social: number
  food: number
  comment: string
  createdAt: string
}

export type TeacherProfilePayload = {
  teacher: {
    id: string
    slug: string
    fullName: string
    department: string | null
    grades: string[]
  }
  school: {
    id: string
    name: string
    city: string | null
    state: string | null
    zipCode: string | null
  }
  reviews: ReviewPayload[]
}

export type SavedTeacherPayload = {
  id: string
  teacherId: string
  teacherSlug: string
  teacherName: string
  department: string | null
  schoolId: string | null
  schoolSlug: string | null
  schoolName: string | null
  savedAt: string
}

type TeacherWithReviews = Teacher & { reviews: Review[] }

type SchoolWithTeachers = School & { teachers: TeacherWithReviews[] }

type TeacherWithRelations = Teacher & { reviews: Review[]; school: School }
type SchoolWithRelations = School & { teachers: TeacherWithReviews[]; reviews: SchoolReview[] }
type SavedTeacherWithRelations = SavedTeacher & {
  teacher: Teacher & { school: School | null }
}

export function mapReviewPayload(review: Review): ReviewPayload {
  const tags = Array.isArray(review.tags) ? (review.tags as string[]) : []
  return {
    id: review.id,
    author: review.author,
    rating: review.rating,
    difficulty: review.difficulty,
    comment: review.comment,
    courseCode: review.courseCode,
    takeAgain: review.takeAgain === TakeAgainResponse.YES ? 'Yes' : 'No',
    tags,
    createdAt: review.createdAt.toISOString(),
  }
}

export function mapTeacherSummaryPayload(teacher: TeacherWithReviews): TeacherSummaryPayload {
  const grades = Array.isArray(teacher.grades) ? (teacher.grades as string[]) : []
  return {
    id: teacher.id,
    slug: teacher.slug,
    fullName: teacher.fullName,
    department: teacher.department,
    grades,
    averageRating: calculateAverageRating(teacher.reviews),
    reviewCount: teacher.reviews.length,
  }
}

export function mapSchoolSummaryPayload(school: SchoolWithTeachers): SchoolSummaryPayload {
  return {
    id: school.id,
    slug: school.slug,
    name: school.name,
    city: school.city,
    state: school.state,
    zipCode: school.zipCode,
    district: school.district,
    ratings: mapSchoolRatings(school),
    teachers: school.teachers.map(mapTeacherSummaryPayload),
  }
}

export function mapSchoolProfilePayload(school: SchoolWithRelations): SchoolProfilePayload {
  return {
    school: {
      id: school.id,
      slug: school.slug,
      name: school.name,
      city: school.city,
      state: school.state,
      zipCode: school.zipCode,
      district: school.district,
    },
    ratings: mapSchoolRatings(school),
    teachers: school.teachers.map(mapTeacherSummaryPayload),
    reviews: school.reviews
      .slice()
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .map(mapSchoolReviewPayload),
  }
}

export function mapTeacherProfilePayload(teacher: TeacherWithRelations): TeacherProfilePayload {
  const grades = Array.isArray(teacher.grades) ? (teacher.grades as string[]) : []
  return {
    teacher: {
      id: teacher.id,
      slug: teacher.slug,
      fullName: teacher.fullName,
      department: teacher.department,
      grades,
    },
    school: {
      id: teacher.school.id,
      name: teacher.school.name,
      city: teacher.school.city,
      state: teacher.school.state,
      zipCode: teacher.school.zipCode,
    },
    reviews: teacher.reviews
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .map(mapReviewPayload),
  }
}

export function mapSavedTeacherPayload(record: SavedTeacherWithRelations): SavedTeacherPayload {
  const school = record.teacher.school
  return {
    id: record.id,
    teacherId: record.teacherId,
    teacherSlug: record.teacher.slug,
    teacherName: record.teacher.fullName,
    department: record.teacher.department,
    schoolId: school?.id ?? null,
    schoolSlug: school?.slug ?? null,
    schoolName: school?.name ?? null,
    savedAt: record.createdAt.toISOString(),
  }
}

function mapSchoolRatings(school: School): SchoolRatingsPayload {
  return {
    overall: roundRating(school.ratingOverall),
    count: school.ratingCount,
    location: roundRating(school.ratingLocation),
    safety: roundRating(school.ratingSafety),
    reputation: roundRating(school.ratingReputation),
    opportunities: roundRating(school.ratingOpportunities),
    happiness: roundRating(school.ratingHappiness),
    clubs: roundRating(school.ratingClubs),
    internet: roundRating(school.ratingInternet),
    facilities: roundRating(school.ratingFacilities),
    social: roundRating(school.ratingSocial),
    food: roundRating(school.ratingFood),
  }
}

function mapSchoolReviewPayload(review: SchoolReview): SchoolReviewPayload {
  return {
    id: review.id,
    overall: roundRating(review.overall),
    location: roundRating(review.location),
    safety: roundRating(review.safety),
    reputation: roundRating(review.reputation),
    opportunities: roundRating(review.opportunities),
    happiness: roundRating(review.happiness),
    clubs: roundRating(review.clubs),
    internet: roundRating(review.internet),
    facilities: roundRating(review.facilities),
    social: roundRating(review.social),
    food: roundRating(review.food),
    comment: review.comment,
    createdAt: review.createdAt.toISOString(),
  }
}

function roundRating(value: number | null | undefined): number {
  if (!value || Number.isNaN(value)) {
    return 0
  }
  return Math.round(value * 100) / 100
}
