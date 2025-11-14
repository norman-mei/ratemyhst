import { type Metadata } from 'next'

import { Providers } from '@/app/(website)/providers'
import { Layout } from '@/components/Layout'

export const metadata: Metadata = {
  title: {
    template: '%s',
    default: 'RateMyHighSchoolTeachers • RateMyHST',
  },
  description:
    'RateMyHighSchoolTeachers (RateMyHST) is the modern rating hub for high school teachers, schools, and districts.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Providers>
      <div className="flex min-h-screen bg-zinc-50 dark:bg-black">
        <Layout>{children}</Layout>
      </div>
    </Providers>
  )
}
