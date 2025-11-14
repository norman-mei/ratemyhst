import type { Metadata } from 'next'

import TeacherProfileClient from './TeacherProfileClient'

export const metadata: Metadata = {
  title: 'Teacher profile | RateMyHST',
  description: 'Explore real student feedback for high school teachers on RateMyHST.',
}

export default function TeacherProfilePage({ params }: { params: { slug: string } }) {
  return <TeacherProfileClient slug={params.slug} />
}
