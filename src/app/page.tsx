'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import SearchStudents from '@/components/SearchStudents'

export default function HomePage() {
  const { data: session } = useSession()

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <button
          className="px-4 py-2 rounded bg-blue-600 text-white"
          onClick={() => signIn('google')}
        >
          Sign in with Google
        </button>
      </div>
    )
  }

  return (
    <main className="container mx-auto p-4">
      <div className="flex justify-end mb-4">
        <button
          className="px-4 py-2 rounded bg-gray-700 text-white"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </div>
      <SearchStudents />
    </main>
  )
}
