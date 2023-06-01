import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

export async function GET(req: NextRequest, { params }: any) {
  try {
    const getUserSchema = z.string()

    const id = getUserSchema.parse(params.id)

    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id,
      },
    })

    return NextResponse.json(user, { status: 200 })
  } catch (error) {
    return new Response('FAILED TO GET USER!', { status: 400 })
  }
}

export async function DELETE(req: NextRequest, { params }: any) {
  try {
    const deleteUserSchema = z.string()

    const id = deleteUserSchema.parse(params.id)

    await prisma.user.delete({
      where: {
        id,
      },
    })

    console.log('successfully deleted!')
    return NextResponse.json('', { status: 200 })
  } catch (error) {
    return new Response('FAILED TO DELETED!', { status: 400 })
  }
}
