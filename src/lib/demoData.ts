import { TakeAgainResponse } from '@prisma/client'

import { prisma } from '@/lib/prisma'

type DemoReview = {
  author: string
  rating: number
  difficulty: number
  comment: string
  createdAt: string
  courseCode: string
  takeAgain: 'Yes' | 'No'
  tags: string[]
}

type DemoTeacher = {
  id: string
  slug: string
  firstName: string
  lastName: string
  department: string
  grades: string[]
  reviews: DemoReview[]
}

type DemoSchool = {
  id: string
  slug: string
  name: string
  city: string
  state: string
  zipCode: string
  district?: string
  ratingOverall: number
  ratingCount: number
  ratingLocation: number
  ratingSafety: number
  ratingReputation: number
  ratingOpportunities: number
  ratingHappiness: number
  ratingClubs: number
  ratingInternet: number
  ratingFacilities: number
  ratingSocial: number
  ratingFood: number
  teachers: DemoTeacher[]
}

const DEMO_SCHOOLS: DemoSchool[] = [
  {
    id: 'lincoln-high-san-diego',
    slug: 'lincoln-high-san-diego',
    name: 'Lincoln High School',
    city: 'San Diego',
    state: 'CA',
    zipCode: '92113',
    ratingOverall: 4.35,
    ratingCount: 86,
    ratingLocation: 4.4,
    ratingSafety: 4.1,
    ratingReputation: 4.5,
    ratingOpportunities: 4.6,
    ratingHappiness: 4.3,
    ratingClubs: 4.2,
    ratingInternet: 4.0,
    ratingFacilities: 4.3,
    ratingSocial: 4.5,
    ratingFood: 3.9,
    teachers: [
      {
        id: 'teacher-ramirez',
        slug: 'ms-ramirez',
        firstName: 'Marisol',
        lastName: 'Ramirez',
        department: 'Ethnic Studies',
        grades: ['9', '10', '11'],
        reviews: [
          {
            author: '11th grade student',
            rating: 4.8,
            difficulty: 3.2,
            comment: 'Challenging but empowering discussions every week.',
            createdAt: '2024-02-10T12:00:00.000Z',
            courseCode: 'ETHN-201',
            takeAgain: 'Yes',
            tags: ['caring', 'group projects', 'insiportaional'],
          },
          {
            author: 'Alumni',
            rating: 4.6,
            difficulty: 3.8,
            comment: 'She always made sure we were heard and supported.',
            createdAt: '2024-01-12T12:00:00.000Z',
            courseCode: 'ETHN-350',
            takeAgain: 'Yes',
            tags: ['gives good feedback', 'respected'],
          },
        ],
      },
      {
        id: 'teacher-chen',
        slug: 'mr-chen',
        firstName: 'Daniel',
        lastName: 'Chen',
        department: 'STEM Lab',
        grades: ['10', '11', '12'],
        reviews: [
          {
            author: 'Robotics kid',
            rating: 4.4,
            difficulty: 2.8,
            comment: 'Labs are organized and he stays after for extra help.',
            createdAt: '2024-02-01T12:00:00.000Z',
            courseCode: 'ENGR-110',
            takeAgain: 'Yes',
            tags: ['accessible outside class', 'extra credit'],
          },
        ],
      },
    ],
  },
  {
    id: 'brooklyn-tech',
    slug: 'brooklyn-tech',
    name: 'Brooklyn Technical High School',
    city: 'Brooklyn',
    state: 'NY',
    zipCode: '11217',
    ratingOverall: 4.62,
    ratingCount: 122,
    ratingLocation: 4.7,
    ratingSafety: 4.4,
    ratingReputation: 4.9,
    ratingOpportunities: 4.8,
    ratingHappiness: 4.5,
    ratingClubs: 4.7,
    ratingInternet: 4.4,
    ratingFacilities: 4.6,
    ratingSocial: 4.5,
    ratingFood: 4.1,
    teachers: [
      {
        id: 'teacher-li',
        slug: 'ms-li',
        firstName: 'Karen',
        lastName: 'Li',
        department: 'Mathematics',
        grades: ['11', '12'],
        reviews: [
          {
            author: 'Calc BC student',
            rating: 4.9,
            difficulty: 3.9,
            comment: 'Explains concepts with visuals and endless patience.',
            createdAt: '2024-02-15T12:00:00.000Z',
            courseCode: 'CALC-BC',
            takeAgain: 'Yes',
            tags: ['amazing lectures', 'clear grading crieteria', 'gives good feedback'],
          },
          {
            author: '12th grade student',
            rating: 4.7,
            difficulty: 3.5,
            comment: 'Weekly review packets saved me.',
            createdAt: '2024-01-30T12:00:00.000Z',
            courseCode: 'MATH-451',
            takeAgain: 'Yes',
            tags: ['lots of homework', 'tough grader'],
          },
        ],
      },
      {
        id: 'teacher-anderson',
        slug: 'mr-anderson',
        firstName: 'Marcus',
        lastName: 'Anderson',
        department: 'English',
        grades: ['10', '11'],
        reviews: [
          {
            author: 'Creative writing student',
            rating: 4.2,
            difficulty: 2.4,
            comment: 'Super engaging workshops and fair grading.',
            createdAt: '2024-02-20T12:00:00.000Z',
            courseCode: 'ENG-320',
            takeAgain: 'Yes',
            tags: ['particpation matters', 'gives good feedback', 'amazing lectures'],
          },
        ],
      },
    ],
  },
  {
    id: 'northside-college-prep',
    slug: 'northside-college-prep',
    name: 'Northside College Prep',
    city: 'Chicago',
    state: 'IL',
    zipCode: '60630',
    ratingOverall: 4.28,
    ratingCount: 74,
    ratingLocation: 4.1,
    ratingSafety: 4.2,
    ratingReputation: 4.5,
    ratingOpportunities: 4.4,
    ratingHappiness: 4.0,
    ratingClubs: 4.2,
    ratingInternet: 4.1,
    ratingFacilities: 4.3,
    ratingSocial: 4.0,
    ratingFood: 3.8,
    teachers: [
      {
        id: 'teacher-singh',
        slug: 'mr-singh',
        firstName: 'Amit',
        lastName: 'Singh',
        department: 'Physics',
        grades: ['11', '12'],
        reviews: [
          {
            author: 'AP Physics student',
            rating: 4.5,
            difficulty: 4.2,
            comment: 'Demonstrations every Friday keep things fun.',
            createdAt: '2024-02-05T12:00:00.000Z',
            courseCode: 'PHYS-420',
            takeAgain: 'Yes',
            tags: ['test heavy', 'graded by a few things', 'accessible outside class'],
          },
        ],
      },
      {
        id: 'teacher-alvarez',
        slug: 'mrs-alvarez',
        firstName: 'Lucia',
        lastName: 'Alvarez',
        department: 'World Languages',
        grades: ['9', '10'],
        reviews: [
          {
            author: 'Heritage speaker',
            rating: 4.1,
            difficulty: 2.9,
            comment: 'Lots of cultural projects and community events.',
            createdAt: '2024-02-18T12:00:00.000Z',
            courseCode: 'SPAN-210',
            takeAgain: 'Yes',
            tags: ['caring', 'particpation matters'],
          },
        ],
      },
    ],
  },
  {
    id: 'mission-high',
    slug: 'mission-high',
    name: 'Mission High School',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94110',
    ratingOverall: 4.12,
    ratingCount: 65,
    ratingLocation: 4.6,
    ratingSafety: 4.0,
    ratingReputation: 4.2,
    ratingOpportunities: 4.1,
    ratingHappiness: 4.0,
    ratingClubs: 4.3,
    ratingInternet: 3.9,
    ratingFacilities: 4.1,
    ratingSocial: 4.2,
    ratingFood: 3.7,
    teachers: [
      {
        id: 'teacher-ng',
        slug: 'ms-ng',
        firstName: 'Jasmine',
        lastName: 'Ng',
        department: 'Visual Arts',
        grades: ['9', '10', '11', '12'],
        reviews: [
          {
            author: 'AP Art student',
            rating: 4.3,
            difficulty: 2.2,
            comment: 'Studios always open and she brings in local artists.',
            createdAt: '2024-02-22T12:00:00.000Z',
            courseCode: 'ART-205',
            takeAgain: 'Yes',
            tags: ['group projects', 'amazing lectures', 'gives good feedback'],
          },
        ],
      },
      {
        id: 'teacher-gold',
        slug: 'mr-gold',
        firstName: 'Elliot',
        lastName: 'Gold',
        department: 'History',
        grades: ['11', '12'],
        reviews: [
          {
            author: '12th grade student',
            rating: 4.0,
            difficulty: 3.0,
            comment: 'Loved the oral history project with elders.',
            createdAt: '2024-02-08T12:00:00.000Z',
            courseCode: 'HIST-410',
            takeAgain: 'No',
            tags: ['get ready to read', 'beware of opop quizzes', 'lots of homework'],
          },
        ],
      },
    ],
  },
]

let bootstrapPromise: Promise<void> | null = null

export function ensureDemoData() {
  if (!bootstrapPromise) {
    bootstrapPromise = seedDemoData()
  }
  return bootstrapPromise
}

async function seedDemoData() {
  const schoolCount = await prisma.school.count()
  if (schoolCount > 0) {
    return
  }

  for (const school of DEMO_SCHOOLS) {
    await prisma.school.create({
      data: {
        id: school.id,
        slug: school.slug,
        name: school.name,
        city: school.city,
        state: school.state,
        zipCode: school.zipCode,
        district: school.district,
        ratingOverall: school.ratingOverall,
        ratingCount: school.ratingCount,
        ratingLocation: school.ratingLocation,
        ratingSafety: school.ratingSafety,
        ratingReputation: school.ratingReputation,
        ratingOpportunities: school.ratingOpportunities,
        ratingHappiness: school.ratingHappiness,
        ratingClubs: school.ratingClubs,
        ratingInternet: school.ratingInternet,
        ratingFacilities: school.ratingFacilities,
        ratingSocial: school.ratingSocial,
        ratingFood: school.ratingFood,
        teachers: {
          create: school.teachers.map((teacher) => ({
            id: teacher.id,
            slug: teacher.slug,
            firstName: teacher.firstName,
            lastName: teacher.lastName,
            fullName: `${teacher.firstName} ${teacher.lastName}`.trim(),
            department: teacher.department,
            grades: teacher.grades,
            reviews: {
              create: teacher.reviews.map((review) => ({
                author: review.author,
                rating: review.rating,
                difficulty: review.difficulty,
                comment: review.comment,
                courseCode: review.courseCode,
                takeAgain: review.takeAgain === 'Yes' ? TakeAgainResponse.YES : TakeAgainResponse.NO,
                tags: review.tags,
                createdAt: new Date(review.createdAt),
              })),
            },
          })),
        },
      },
    })
  }
}
