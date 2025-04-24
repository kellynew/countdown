'use client'

import { notFound } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { prisma } from '@/lib/db'
import CountdownForm from '@/components/CountdownForm'
import { formatDate } from '@/lib/utils'

export default async function EditCountdownPage({
  params,
}: {
  params: { id: string }
}) {
  const countdown = await prisma.countdown.findUnique({
    where: { id: parseInt(params.id) },
  })

  if (!countdown) {
    notFound()
  }

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
          id: countdown.id,
          ...data,
        }),
      })
      
      if (response.ok) {
        router.push(`/countdowns/${countdown.id}`)
      }
    } catch (error) {
      console.error('Error updating countdown:', error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">编辑倒数日</h1>
      <CountdownForm
        initialData={{
          id: countdown.id,
          title: countdown.title,
          targetDate: formatDate(countdown.targetDate),
          backgroundColor: countdown.backgroundColor || undefined,
          backgroundImage: countdown.backgroundImage || undefined,
        }}
        onSubmit={handleSubmit}
      />
    </div>
  )
}