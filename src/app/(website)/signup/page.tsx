import SignupPageClient from '@/app/(website)/signup/SignupPageClient'
import { Suspense } from 'react'

export const metadata = {
  title: 'Sign up | RateMyHST',
  description: 'Create a RateMyHST account and verify your email to start posting ratings.',
}

export default function SignupPage() {
  return (
    <Suspense fallback={null}>
      <SignupPageClient />
    </Suspense>
  )
}
