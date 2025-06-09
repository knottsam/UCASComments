'use client'

import { useState } from 'react'
import Papa from 'papaparse'
import { collection, setDoc, doc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

interface Row {
  name: string
  subject1: string
  comment1: string
  subject2?: string
  comment2?: string
  subject3?: string
  comment3?: string
  subject4?: string
  comment4?: string
}

export default function ImportPage() {
  const [message, setMessage] = useState('')

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    Papa.parse<Row>(file, {
      header: true,
      complete: async results => {
        const col = collection(db, 'students')
        for (const row of results.data) {
          const subjects = []
          if (row.subject1) subjects.push({ name: row.subject1, comment: row.comment1 })
          if (row.subject2) subjects.push({ name: row.subject2, comment: row.comment2 })
          if (row.subject3) subjects.push({ name: row.subject3, comment: row.comment3 })
          if (row.subject4) subjects.push({ name: row.subject4, comment: row.comment4 })
          await setDoc(doc(col), { name: row.name, subjects })
        }
        setMessage('Import complete!')
      },
    })
  }

  return (
    <div className="container mx-auto p-4">
      <input type="file" accept=".csv" onChange={handleFile} />
      {message && <p className="mt-4 text-green-700">{message}</p>}
    </div>
  )
}
