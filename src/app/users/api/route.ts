import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        tel: true,
        street: true,
        number_house: true,
        district: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(users, { status: 200 })
  } catch (error) {
    return new Response('FAILED TO GET USERS!', { status: 400 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const createUserSchema = z.object({
      name: z.string(),
      email: z.string(),
      tel: z.number(),
      street: z.string(),
      numberHouse: z.number(),
      district: z.string(),
    })

    const { district, email, name, numberHouse, street, tel } =
      createUserSchema.parse(body.data)

    const isExist = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (isExist) {
      return NextResponse.json({ alreadyExists: true })
    }

    await prisma.user.create({
      data: {
        name,
        email,
        tel,
        street,
        number_house: numberHouse,
        district,
      },
    })

    console.log('successfully created!')
    return NextResponse.json('', { status: 201 })
  } catch (error) {
    console.log(error)
    return new Response('FAILED TO CREATED!', { status: 400 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()

    const updateUserSchema = z.object({
      id: z.string(),
      name: z.string(),
      email: z.string(),
      tel: z.number(),
      street: z.string(),
      numberHouse: z.number(),
      district: z.string(),
    })

    const { id, name, tel, email, street, numberHouse, district } =
      updateUserSchema.parse(body)

    try {
      await prisma.user.update({
        where: {
          id,
        },
        data: {
          name,
          email,
          tel,
          street,
          number_house: numberHouse,
          district,
        },
      })
      console.log('successfully updated!')
      return NextResponse.json('', { status: 200 })
    } catch (error) {
      return NextResponse.json({ alreadyExists: true })
    }
  } catch (error) {
    return new Response('FAILED TO UPDATED!', { status: 400 })
  }
}
