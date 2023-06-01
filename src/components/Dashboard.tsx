'use client'

import { Search, UserCircle2 } from 'lucide-react'
import { UpdateButton } from './UpdateButton'
import { DeleteButton } from './DeleteButton'
import { useState } from 'react'

interface User {
  id: string
  name: string
  email: string
  tel: number
  street: string
  number_house: number
  district: string
}

type DashboardProps = {
  data: User[]
}

export function Dashboard({ data }: DashboardProps) {
  const [inputValue, setInputValue] = useState('')

  const users = inputValue
    ? data.filter((user) =>
        user?.name?.toLowerCase().includes(inputValue.toLocaleLowerCase()),
      )
    : data

  return (
    <div className="flex flex-col justify-center items-center">
      <label
        htmlFor="searchInput"
        className="text-gray-50 flex items-center gap-2 rounded-lg bg-gray-600 p-2 w-[305px]"
      >
        <Search size={18} />
        <input
          autoFocus
          type="text"
          id="searchInput"
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Filtrar pelo nome"
          className=" outline-none bg-gray-600"
        />
      </label>

      <div
        className="flex flex-wrap gap-4 sm-max:justify-center sm-max:max-h-[25rem] overflow-auto py-4
       sm:px-5 max-h-[35rem] scrollbar-thin scrollbar-thumb-gray-600 w-full"
      >
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-gray-600 p-4 mt-2 w-[300px] rounded-lg space-y-1 hover:scale-[1.02]
         transition-all cursor-default"
          >
            <div className="flex items-center justify-end gap-12 -mt-8 text-emerald-500">
              <UserCircle2 size={64} className="bg-gray-600 rounded-full p-1" />

              <div className="flex items-center gap-2 pt-2">
                <UpdateButton id={user.id} />
                <DeleteButton id={user.id} />
              </div>
            </div>

            <p className="text-ellipsis overflow-hidden">{user.name}</p>

            <div className="text-sm text-gray-200">
              <p className="">{user.email}</p>
              <p className="">{user.tel}</p>
              <p className="mt-2">
                {user.street}, {user.number_house}, {user.district}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
