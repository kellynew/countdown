import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

// 获取所有倒数日
export async function GET() {
  const countdowns = await prisma.countdown.findMany({
    orderBy: {
      targetDate: 'asc',
    },
  })
  return NextResponse.json(countdowns)
}

// 创建新倒数日
export async function POST(request: Request) {
  const body = await request.json()
  
  const countdown = await prisma.countdown.create({
    data: {
      title: body.title,
      targetDate: new Date(body.targetDate),
      backgroundColor: body.backgroundColor,
      backgroundImage: body.backgroundImage,
    },
  })
  
  return NextResponse.json(countdown, { status: 201 })
}

// 更新倒数日
export async function PUT(request: Request) {
  const body = await request.json()
  
  const countdown = await prisma.countdown.update({
    where: { id: body.id },
    data: {
      title: body.title,
      targetDate: new Date(body.targetDate),
      backgroundColor: body.backgroundColor,
      backgroundImage: body.backgroundImage,
    },
  })
  
  return NextResponse.json(countdown)
}

// 删除倒数日
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  
  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 })
  }
  
  await prisma.countdown.delete({
    where: { id: parseInt(id) },
  })
  
  return NextResponse.json({ success: true })
}