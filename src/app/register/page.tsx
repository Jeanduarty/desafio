import { Form } from '@/components/Form'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function RegisterUser() {
  return (
    <div>
      <Link
        href="/"
        className="flex text-emerald-500 hover:text-emerald-400 gap-2 items-center"
      >
        <ArrowLeft size={18} />
        <p>voltar à listagem</p>
      </Link>

      <h1 className="text-gray-600 font-bold text-2xl mt-6">
        Cadastrar usuário
      </h1>

      <Form type="create" />
    </div>
  )
}
