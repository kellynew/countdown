'use client'

import { useRouter } from 'next/navigation'
import CountdownForm from '@/components/CountdownForm'

interface EditCountdownFormProps {
  initialData: {
    id: number
    title: string
    targetDate: string
    backgroundColor?: string
    backgroundImage?: string
  }
}

export default function EditCountdownForm({ initialData }: EditCountdownFormProps) {
  const router = useRouter()

  const handleSubmit = async (data: {
    title: string
    targetDate: string
    backgroundColor?: string
    backgroundImage?: string
  }) => {
    try {
      const response = await fetch('/api/countdowns', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: initialData.id,
          ...data,
        }),
      })
      
      if (response.ok) {
        router.push(`/countdowns/${initialData.id}`)
      }
    } catch (error) {
      console.error('Error updating countdown:', error)
    }
  }

  return (
    <CountdownForm
      initialData={initialData}
      onSubmit={handleSubmit}
    />
  )
}