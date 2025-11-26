import { type Metadata } from 'next'

import Analytics from '@/components/Analytics'
import '@/styles/tailwind.css'

export const metadata: Metadata = {
  icons: {
    icon: '/images/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-zinc-50 text-zinc-900 antialiased dark:bg-black dark:text-zinc-100">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
