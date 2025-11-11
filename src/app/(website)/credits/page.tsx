import { Metadata } from 'next'
import CreditsContent from '@/components/CreditsContent'

export const metadata: Metadata = {
  title: 'Credits - RateMyHighSchoolTeachers',
  description:
    'Meet the folks shaping RateMyHighSchoolTeachers (RateMyHST) and the community that inspired it.',
}

export default function CreditsPage() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] w-full items-center justify-center bg-gradient-to-b from-white to-zinc-50 px-4 py-12 dark:from-zinc-950 dark:to-zinc-900">
      <CreditsContent showBackLink />
    </main>
  )
}
