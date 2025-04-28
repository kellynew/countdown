import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import { formatDate } from '@/lib/utils'
import EditCountdownForm from './EditCountdownForm'

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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">编辑倒数日</h1>
      <EditCountdownForm
        initialData={{
          id: countdown.id,
          title: countdown.title,
          targetDate: formatDate(countdown.targetDate),
          backgroundColor: countdown.backgroundColor || undefined,
          backgroundImage: countdown.backgroundImage || undefined,
        }}
      />
    </div>
  )
}