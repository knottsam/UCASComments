import './globals.css'
import { ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'

export const metadata = {
  title: 'UCAS Comments',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}
