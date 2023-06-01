'use client'

import { api } from '@/lib/api'
import { Loader2, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type DeleteButtonProps = {
  id: string
}

export function DeleteButton({ id }: DeleteButtonProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleClickToDelete(id: string) {
    try {
      setLoading(true)
      await api.delete(`${process.env.NEXT_PUBLIC_URL}/users/api/${id}`)

      return router.refresh()
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={() => handleClickToDelete(id)}
      className="cursor-pointer text-emerald-300 hover:text-emerald-400 "
      disabled={loading}
    >
      {loading ? <Loader2 className="animate-spin" /> : <Trash />}
    </button>
  )
}
