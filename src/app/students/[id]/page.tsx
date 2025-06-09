'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

interface Subject {
  name: string
  comment: string
}

export default function StudentPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [name, setName] = useState('')
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [saved, setSaved] = useState('')

  useEffect(() => {
    const fetchStudent = async () => {
      const ref = doc(db, 'students', id)
      const snap = await getDoc(ref)
      if (snap.exists()) {
        const data = snap.data() as { name: string; subjects: Subject[] }
        setName(data.name)
        setSubjects(data.subjects)
      }
    }
    fetchStudent()
  }, [id])

  const handleChange = (index: number, field: keyof Subject, value: string) => {
    setSubjects(prev => {
      const copy = [...prev]
      copy[index] = { ...copy[index], [field]: value }
      return copy
    })
  }

  const addSubject = () => {
    setSubjects(prev => [...prev, { name: '', comment: '' }])
  }

  const save = async () => {
    const ref = doc(db, 'students', id)
    await updateDoc(ref, { name, subjects })
    setSaved('Saved!')
    router.refresh()
  }

  return (
    <div className="container mx-auto p-4">
      <input
        className="border p-2 mb-4 w-full"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      {subjects.map((sub, i) => (
        <div key={i} className="mb-4">
          <input
            className="border p-2 mr-2"
            value={sub.name}
            onChange={e => handleChange(i, 'name', e.target.value)}
            placeholder="Subject"
          />
          <textarea
            className="border p-2 w-full mt-2"
            value={sub.comment}
            onChange={e => handleChange(i, 'comment', e.target.value)}
            placeholder="Comment"
          />
        </div>
      ))}
      <button className="px-2 py-1 bg-gray-500 text-white mr-2" onClick={addSubject}>
        Add Subject
      </button>
      <button className="px-2 py-1 bg-blue-600 text-white" onClick={save}>
        Save
      </button>
      {saved && <span className="ml-2 text-green-600">{saved}</span>}
    </div>
  )
}
