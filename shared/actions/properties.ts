'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { db } from '../utils/db'
import {
  imageSchema,
  propertySchema,
  validateWithZodSchema,
} from '../utils/schemas'
import { uploadImage } from '../utils/supabase'
import { getAuthUser } from './common'
import { renderError } from '../utils/renderError'

export const createPropertyAction = async (
  prevState: unknown,
  formData: FormData,
): Promise<{ message: string }> => {
  const user = await getAuthUser()
  try {
    const rawData = Object.fromEntries(formData)
    const file = formData.get('image') as File

    const validatedFields = validateWithZodSchema(propertySchema, rawData)
    const validatedFile = validateWithZodSchema(imageSchema, { image: file })
    const fullPath = await uploadImage(validatedFile.image)

    await db.property.create({
      data: {
        ...validatedFields,
        image: fullPath,
        profileId: user.id,
      },
    })
  } catch (error) {
    return renderError(error)
  }
  redirect('/')
}

export const fetchProperties = async ({
  search = '',
  category,
}: {
  search?: string
  category?: string
}) => {
  const properties = await db.property.findMany({
    where: {
      category,
      OR: [
        { name: { contains: search, mode: 'insensitive' } },
        { tagline: { contains: search, mode: 'insensitive' } },
      ],
    },
    select: {
      id: true,
      name: true,
      tagline: true,
      country: true,
      image: true,
      price: true,
    },
  })
  return properties
}

export const fetchPropertyDetails = async (id: string) => {
  return db.property.findUnique({
    where: {
      id,
    },
    include: {
      profile: true,
      bookings: {
        select: {
          checkIn: true,
          checkOut: true,
        },
      },
    },
  })
}

export const fetchRentals = async () => {
  const user = await getAuthUser()
  const rentals = await db.property.findMany({
    where: {
      profileId: user.id,
    },
    select: {
      id: true,
      name: true,
      price: true,
    },
  })

  const rentalsWithBookingSums = await Promise.all(
    rentals.map(async (rental) => {
      const totalNightsSum = await db.booking.aggregate({
        where: {
          propertyId: rental.id,
        },
        _sum: {
          totalNights: true,
        },
      })

      const orderTotalSum = await db.booking.aggregate({
        where: {
          propertyId: rental.id,
        },
        _sum: {
          orderTotal: true,
        },
      })

      return {
        ...rental,
        totalNightsSum: totalNightsSum._sum.totalNights,
        orderTotalSum: orderTotalSum._sum.orderTotal,
      }
    }),
  )

  return rentalsWithBookingSums
}

export async function deleteRentalAction(prevState: { propertyId: string }) {
  const { propertyId } = prevState
  const user = await getAuthUser()

  try {
    await db.property.delete({
      where: {
        id: propertyId,
        profileId: user.id,
      },
    })

    revalidatePath('/rentals')
    return { message: 'Rental deleted successfully' }
  } catch (error) {
    return renderError(error)
  }
}

export const fetchRentalDetails = async (propertyId: string) => {
  const user = await getAuthUser()

  return db.property.findUnique({
    where: {
      id: propertyId,
      profileId: user.id,
    },
  })
}

export const updatePropertyAction = async (
  prevState: unknown,
  formData: FormData,
): Promise<{ message: string }> => {
  const user = await getAuthUser()
  const propertyId = formData.get('id') as string

  try {
    const rawData = Object.fromEntries(formData)
    const validatedFields = validateWithZodSchema(propertySchema, rawData)
    await db.property.update({
      where: {
        id: propertyId,
        profileId: user.id,
      },
      data: {
        ...validatedFields,
      },
    })

    revalidatePath(`/rentals/${propertyId}/edit`)
    return { message: 'Update Successful' }
  } catch (error) {
    return renderError(error)
  }
}

export const updatePropertyImageAction = async (
  prevState: unknown,
  formData: FormData,
): Promise<{ message: string }> => {
  const user = await getAuthUser()
  const propertyId = formData.get('id') as string

  try {
    const image = formData.get('image') as File
    const validatedFields = validateWithZodSchema(imageSchema, { image })
    const fullPath = await uploadImage(validatedFields.image)

    await db.property.update({
      where: {
        id: propertyId,
        profileId: user.id,
      },
      data: {
        image: fullPath,
      },
    })
    revalidatePath(`/rentals/${propertyId}/edit`)
    return { message: 'Property Image Updated Successful' }
  } catch (error) {
    return renderError(error)
  }
}
