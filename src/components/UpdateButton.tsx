'use client'

import { Settings } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type UpdateButtonProps = {
  id: string
}

export function UpdateButton({ id }: UpdateButtonProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  function animation() {
    const animation = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(router.push(`/edit/${id}`))
      }, 500)
    })
    return animation
  }

  async function handleClickToUpdate(id: string) {
    setLoading(true)
    try {
      await animation()
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      className="cursor-pointer text-gray-50"
      disabled={loading}
      onClick={() => handleClickToUpdate(id)}
    >
      {loading ? <Settings className="animate-spin" /> : <Settings />}
    </button>
  )
}
