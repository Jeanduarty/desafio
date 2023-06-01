import { Dashboard } from '@/components/Dashboard'

interface User {
  id: string
  name: string
  email: string
  tel: number
  street: string
  number_house: number
  district: string
}

export default async function Home() {
  const users: User[] = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/users/api`,
    {
      cache: 'no-store',
    },
  ).then((res) => res.json())

  return (
    <main className="">
      <h1 className="text-gray-600 font-bold text-2xl mb-8">
        Lista de usuários
      </h1>

      <Dashboard data={users} />
    </main>
  )
}
