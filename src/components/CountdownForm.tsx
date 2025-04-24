'use client'

import { useState } from 'react'
import { formatDate } from '@/lib/utils'
import ColorPicker from './ColorPicker'

interface CountdownFormProps {
  initialData?: {
    id?: number
    title?: string
    targetDate?: string
    backgroundColor?: string
    backgroundImage?: string
  }
  onSubmit: (data: {
    title: string
    targetDate: string
    backgroundColor?: string
    backgroundImage?: string
  }) => void
}

export default function CountdownForm({ initialData, onSubmit }: CountdownFormProps) {
  const [title, setTitle] = useState(initialData?.title || '')
  const [targetDate, setTargetDate] = useState(
    initialData?.targetDate || formatDate(new Date())
  )
  const [backgroundColor, setBackgroundColor] = useState(
    initialData?.backgroundColor || '#3b82f6'
  )
  const [backgroundImage, setBackgroundImage] = useState(
    initialData?.backgroundImage || ''
  )
  const [showColorPicker, setShowColorPicker] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      title,
      targetDate,
      backgroundColor,
      backgroundImage,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <div>
        <label className="block text-sm font-medium mb-1">标题</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">目标日期</label>
        <input
          type="date"
          value={targetDate}
          onChange={(e) => setTargetDate(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">背景</label>
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={() => setShowColorPicker(!showColorPicker)}
            className="px-3 py-2 border rounded-md"
          >
            选择颜色
          </button>
          <input
            type="text"
            placeholder="或输入图片URL"
            value={backgroundImage}
            onChange={(e) => setBackgroundImage(e.target.value)}
            className="flex-1 px-3 py-2 border rounded-md"
          />
        </div>
        
        {showColorPicker && (
          <div className="mt-2">
            <ColorPicker
              color={backgroundColor}
              onChange={setBackgroundColor}
            />
          </div>
        )}
      </div>
      
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          {initialData?.id ? '更新' : '创建'}
        </button>
      </div>
    </form>
  )
}