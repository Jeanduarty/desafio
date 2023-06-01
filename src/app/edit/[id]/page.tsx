import { Form } from '@/components/Form'
import { api } from '@/lib/api'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

type EditUserProps = {
  params: {
    id: string
  }
}

interface User {
  id: string
  name: string
  email: string
  tel: number
  street: string
  number_house: number
  district: string
}

export default async function EditUser({ params }: EditUserProps) {
  const response = await api.get(
    `${process.env.NEXT_PUBLIC_URL}/users/api/${params.id}`,
  )

  const user: User = response.data

  return (
    <div>
      <Link
        href="/"
        className="flex text-emerald-500 hover:text-emerald-400 gap-2 items-center"
      >
        <ArrowLeft size={18} />
        <p>voltar à listagem</p>
      </Link>

      <h1 className="text-gray-600 font-bold text-2xl mt-6">Editar usuário</h1>

      <Form type="update" data={user} />
    </div>
  )
}
