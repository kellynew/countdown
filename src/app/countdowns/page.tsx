import Link from 'next/link'
import { CountdownCard } from '@/components/CountdownCard'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function CountdownsPage() {
  const countdowns = await prisma.countdown.findMany({
    orderBy: {
      targetDate: 'asc',
    },
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">我的倒数日</h1>
        <Link
          href="/countdowns/new"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          新建
        </Link>
      </div>
      
      {countdowns.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">还没有创建任何倒数日</p>
          <Link
            href="/countdowns/new"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            创建第一个倒数日
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {countdowns.map((countdown) => (
            <CountdownCard
              key={countdown.id}
              id={countdown.id}
              title={countdown.title}
              targetDate={countdown.targetDate}
              backgroundColor={countdown.backgroundColor || undefined}
              backgroundImage={countdown.backgroundImage || undefined}
            />
          ))}
        </div>
      )}
    </div>
  )
}