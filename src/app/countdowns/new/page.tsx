'use client'

import { useRouter } from 'next/navigation'
import CountdownForm from '@/components/CountdownForm'

export default function NewCountdownPage() {
  const router = useRouter()

  const handleSubmit = async (data: {
    title: string
    targetDate: string
    backgroundColor?: string
    backgroundImage?: string
  }) => {
    try {
      const response = await fetch('/api/countdowns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      
      if (response.ok) {
        router.push('/countdowns')
      }
    } catch (error) {
      console.error('Error creating countdown:', error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">新建倒数日</h1>
      <CountdownForm onSubmit={handleSubmit} />
    </div>
  )
}