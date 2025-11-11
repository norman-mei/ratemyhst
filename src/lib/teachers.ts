export type Review = {
  id: string
  student: string
  graduationYear: number
  rating: number
  difficulty: number
  takeAgain: 'Yes' | 'No' | 'Maybe'
  date: string
  classTaken: string
  comment: string
  tags: string[]
}

export type Teacher = {
  id: string
  slug: string
  name: string
  pronouns: string
  subject: string
  school: string
  district: string
  state: string
  region: string
  rating: number
  ratingCount: number
  difficulty: number
  wouldTakeAgain: number
  yearsExperience: number
  credentials: string
  tagline: string
  tags: string[]
  teachingStyle: string[]
  highlights: string[]
  impactStats: { label: string; value: string }[]
  lastReview: string
  reviews: Review[]
}

export type School = {
  id: string
  name: string
  district: string
  state: string
  rating: number
  reviewCount: number
  standoutPrograms: string[]
  topSubjects: string[]
  featuredTeachers: string[]
}

// Placeholder collections — real data will be injected once verified submissions go live.
export const teachers: Teacher[] = []
export const schools: School[] = []

export const systemStats = {
  teachersRated: 0,
  schoolsCovered: 0,
  reviewsPublished: 0,
}

export function findTeacherBySlug(slug: string) {
  return teachers.find((teacher) => teacher.slug === slug)
}

export function getTopTeachers(limit = 6) {
  return teachers.slice(0, limit)
}

export function getStateOptions() {
  return [] as string[]
}

export function getSubjectOptions() {
  return [] as string[]
}

export function getRecentReviews(limit = 6) {
  return []
}
