'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { api } from '@/lib/api'
import { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

const createUserFormSchema = z.object({
  name: z.string().nonempty('O nome é obrigatório'),
  email: z
    .string()
    .nonempty('O e-mail é obrigatório')
    .email('Formato de e-mail inválido'),
  tel: z.number({
    invalid_type_error: 'Somente números',
  }),
  street: z.string().nonempty('A rua é obrigatório'),
  numberHouse: z.number({
    invalid_type_error: 'Somente números',
  }),
  district: z.string().nonempty('O bairro é obrigatório'),
})

type createUserFormData = z.infer<typeof createUserFormSchema>

interface User {
  id: string
  name: string
  email: string
  tel: number
  street: string
  number_house: number
  district: string
}

type FormProps = {
  type: 'create' | 'update'
  data?: User
}

export function Form({ type, data }: FormProps) {
  const [alreadyExistsThisEmail, setAlreadyExistsThisEmail] = useState(false)
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<createUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  })

  async function handleCreateUser(dataCreateUser: createUserFormData) {
    try {
      setLoading(true)
      const alreadyExists = await api.post(
        `${process.env.NEXT_PUBLIC_URL}/users/api`,
        {
          data: dataCreateUser,
        },
      )

      if (!!alreadyExists.data) {
        return setAlreadyExistsThisEmail(true)
      }

      setAlreadyExistsThisEmail(false)
      return window.location.replace('/')
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  async function handleUpdateUser(dataUpdateUser: createUserFormData) {
    try {
      setLoading(true)
      const alreadyExistsEmail = await api.put(
        `${process.env.NEXT_PUBLIC_URL}/users/api`,
        {
          id: data?.id,
          number_house: dataUpdateUser.numberHouse,
          ...dataUpdateUser,
        },
      )

      if (!!alreadyExistsEmail.data) {
        return setAlreadyExistsThisEmail(true)
      }

      setAlreadyExistsThisEmail(false)
      return window.location.replace('/')
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  function handleClickCancel() {
    router.push('/')
  }

  useEffect(() => {
    console.log('ninja')
    if (!!data) {
      setValue('name', data.name)
      setValue('email', data.email)
      setValue('tel', data.tel)
      setValue('street', data.street)
      setValue('numberHouse', data.number_house)
      setValue('district', data.district)
    }
  }, [data, setValue])

  return (
    <form
      action=""
      onSubmit={handleSubmit(
        type === 'create' ? handleCreateUser : handleUpdateUser,
      )}
      className="text-gray-50 mt-2
       border border-gray-100 rounded-lg px-8 py-3"
    >
      <div className="grid md:grid-cols-2 gap-4">
        <div className="relative flex flex-col max-w-[350px] w-full ">
          <label htmlFor="" className="text-gray-500 font-medium">
            Nome <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            className=" border border-gray-850 shadow-sm
            rounded h-10 px-3 bg-gray-800"
            {...register('name')}
          />
          <p className="invisible ">-</p>
          {errors.name && (
            <span className="text-crimson-500 absolute bottom-0 text-sm">
              {errors.name.message}
            </span>
          )}
        </div>

        <div className="relative flex flex-col max-w-[350px] w-full">
          <label htmlFor="" className="text-gray-500 font-medium">
            E-mail <span className="text-red-600">*</span>
          </label>
          <input
            type="email"
            className="border border-gray-850 shadow-sm
            rounded h-10 px-3 bg-gray-800"
            {...register('email')}
          />
          <p className="invisible ">-</p>
          {
            <span className="text-crimson-500 absolute bottom-0 text-sm">
              {alreadyExistsThisEmail
                ? 'Este e-mail já existe'
                : errors?.email?.message}
            </span>
          }
        </div>

        <div className="relative flex flex-col max-w-[350px] w-full">
          <label htmlFor="" className="text-gray-500 font-medium">
            Telefone <span className="text-red-600">*</span>
          </label>
          <input
            type="tel"
            className="border border-gray-850 shadow-sm
            rounded h-10 px-3 bg-gray-800"
            minLength={10}
            maxLength={11}
            {...register('tel', {
              valueAsNumber: true,
            })}
          />
          <p className="invisible ">-</p>
          {errors.tel && (
            <span className="text-crimson-500 absolute bottom-0 text-sm">
              {errors.tel.message}
            </span>
          )}
        </div>

        <div className="relative flex flex-col max-w-[350px] w-full">
          <label htmlFor="" className="text-gray-500 font-medium">
            Endereço <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            className="border border-gray-850 shadow-sm
              rounded h-10 px-3 bg-gray-800"
            {...register('street')}
          />
          <p className="invisible ">-</p>
          {errors.street && (
            <span className="text-crimson-500 absolute bottom-0 text-sm">
              {errors.street.message}
            </span>
          )}
        </div>

        <div className="relative flex flex-col max-w-[350px] w-full">
          <label htmlFor="" className="text-gray-500 font-medium">
            Nº <span className="text-red-600">*</span>
          </label>
          <input
            type="tel"
            className="border border-gray-850 shadow-sm
              rounded h-10 px-3 bg-gray-800"
            maxLength={6}
            {...register('numberHouse', { valueAsNumber: true })}
          />
          <p className="invisible ">-</p>
          {errors.numberHouse && (
            <span className="text-crimson-500 absolute bottom-0 text-sm">
              {errors.numberHouse.message}
            </span>
          )}
        </div>

        <div className="relative flex flex-col max-w-[350px] w-full">
          <label htmlFor="" className="text-gray-500 font-medium">
            Bairro <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            className="border border-gray-850 shadow-sm
              rounded h-10 px-3 bg-gray-800"
            {...register('district')}
          />
          <p className="invisible ">-</p>
          {errors.district && (
            <span className="text-crimson-500 absolute bottom-0 text-sm">
              {errors.district.message}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center justify-end gap-4">
        <button
          type="button"
          className="flex items-center justify-center border border-gray-500 text-gray-950
           hover:border-crimson-500 hover:text-crimson-500 font-semibold px-4 py-2 text-sm
            rounded-md transition ml-auto w-[125px]"
          onClick={handleClickCancel}
        >
          Cancelar
        </button>

        <button
          type="submit"
          className="flex items-center justify-center bg-emerald-500
           hover:bg-emerald-600 font-semibold px-4 py-2 text-sm rounded-md transition w-[125px] shadow-sm
           shadow-emerald-600"
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : type === 'create' ? (
            'Criar usuário'
          ) : (
            'Salvar'
          )}
        </button>
      </div>
    </form>
  )
}
