import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function About() {
  return (
    <div>
      <Link
        href="/"
        className="flex text-emerald-500 hover:text-emerald-400 gap-2 items-center"
      >
        <ArrowLeft size={18} />
        <p>voltar à listagem</p>
      </Link>

      <h1 className="text-gray-600 font-bold text-2xl mt-8">Sobre</h1>

      <p className="text-gray-500 mt-2">
        Projeto criado com o objetivo de enfrentar o desafio de um processo
        seletivo, que exige a implementação das funcionalidades de criar,
        editar, buscar e deletar usuários.
      </p>
    </div>
  )
}
