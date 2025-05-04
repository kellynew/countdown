import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import { getRemainingDays, getContrastColor } from '@/lib/utils'
import Link from 'next/link'
import DeleteButton from './DeleteButton'

export default async function CountdownPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = await params

  const countdown = await prisma.countdown.findUnique({
    where: { id: parseInt(id) },
  })

  if (!countdown) {
    notFound()
  }
  
  const textColor = getContrastColor(
    countdown.backgroundColor || countdown.backgroundImage || ''
  )

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{
        backgroundColor: countdown.backgroundColor || undefined,
        backgroundImage: countdown.backgroundImage
          ? `url(${countdown.backgroundImage})`
          : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div
        className={`absolute inset-0 ${
          countdown.backgroundImage ? 'bg-black/30' : ''
        }`}
      />
      
      <div className={`relative z-10 text-center max-w-md w-full ${textColor}`}>
        <h1 className="text-4xl font-bold mb-4">{countdown.title}</h1>
        
        <div className="text-6xl font-bold mb-8">
          {getRemainingDays(countdown.targetDate)}
        </div>
        
        <p className="text-xl mb-2">
          目标日期: {countdown.targetDate.toLocaleDateString()}
        </p>
        
        <div className="mt-8 flex justify-center space-x-4">
          <Link
            href={`/countdowns/${countdown.id}/edit`}
            className={`px-4 py-2 rounded-md ${textColor} border ${textColor.replace('text', 'border')} hover:bg-white/10`}
          >
            编辑
          </Link>
          <DeleteButton id={countdown.id} />
        </div>
        
        <Link
          href="/countdowns"
          className={`mt-6 inline-block ${textColor} hover:underline`}
        >
          ← 返回列表
        </Link>
      </div>
    </div>
  )
}