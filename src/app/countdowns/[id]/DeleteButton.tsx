'use client'

import { useRouter } from 'next/navigation'

export default function DeleteButton({ id }: { id: number }) {
  const router = useRouter()

  const handleDelete = async () => {
    if (confirm('确定要删除这个倒数日吗？')) {
      try {
        const response = await fetch(`/api/countdowns?id=${id}`, {
          method: 'DELETE',
        })
        
        if (response.ok) {
          router.push('/countdowns')
        }
      } catch (error) {
        console.error('Error deleting countdown:', error)
      }
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
    >
      删除
    </button>
  )
}