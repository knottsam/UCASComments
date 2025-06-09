'use client'

import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import Link from 'next/link'
import { db } from '@/lib/firebase'

interface Subject {
  name: string
  comment: string
}

interface Student {
  id: string
  name: string
  subjects: Subject[]
}

export default function SearchStudents() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Student[]>([])

  useEffect(() => {
    const fetchStudents = async () => {
      const snapshot = await getDocs(collection(db, 'students'))
      const data: Student[] = []
      snapshot.forEach(doc => {
        data.push({ id: doc.id, ...doc.data() } as Student)
      })
      setResults(data)
    }
    fetchStudents()
  }, [])

  const filtered = results.filter(s => s.name.toLowerCase().includes(query.toLowerCase()))

  return (
    <div>
      <input
        type="text"
        className="border p-2 mb-4 w-full"
        placeholder="Search students..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <ul>
        {filtered.map(student => (
          <li key={student.id} className="mb-6">
            <h2 className="text-xl font-bold">
              <Link className="underline" href={`/students/${student.id}`}>{student.name}</Link>
            </h2>
            <ul className="ml-4 list-disc">
              {student.subjects.map((sub, idx) => (
                <li key={idx} className="my-1">
                  <span className="font-semibold">{sub.name}: </span>
                  <span>{sub.comment}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}
