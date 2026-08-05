'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { db } from '../utils/db'
import { calculateTotals } from '../utils/calculateTotals'
import { getAuthUser } from './common'
import { renderError } from '../utils/renderError'

export const createBookingAction = async (prevState: {
  propertyId: string
  checkIn: Date
  checkOut: Date
}) => {
  const user = await getAuthUser()

  const { propertyId, checkIn, checkOut } = prevState
  const property = await db.property.findUnique({
    where: { id: propertyId },
    select: { price: true },
  })
  if (!property) {
    return { message: 'Property not found' }
  }
  const { orderTotal, totalNights } = calculateTotals({
    checkIn,
    checkOut,
    price: property.price,
  })

  try {
    await db.booking.create({
      data: {
        checkIn,
        checkOut,
        orderTotal,
        totalNights,
        profileId: user.id,
        propertyId,
      },
    })
  } catch (error) {
    return renderError(error)
  }
  redirect('/bookings')
}

export const fetchBookings = async () => {
  const user = await getAuthUser()
  const bookings = await db.booking.findMany({
    where: {
      profileId: user.id,
    },
    include: {
      property: {
        select: {
          id: true,
          name: true,
          country: true,
        },
      },
    },
    orderBy: {
      checkIn: 'desc',
    },
  })
  return bookings
}

export async function deleteBookingAction(prevState: { bookingId: string }) {
  const { bookingId } = prevState
  const user = await getAuthUser()

  try {
    await db.booking.delete({
      where: {
        id: bookingId,
        profileId: user.id,
      },
    })

    revalidatePath('/bookings')
    return { message: 'Booking deleted successfully' }
  } catch (error) {
    return renderError(error)
  }
}

export const fetchReservations = async () => {
  const user = await getAuthUser()

  const reservations = await db.booking.findMany({
    where: {
      property: {
        profileId: user.id,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      property: {
        select: {
          id: true,
          name: true,
          price: true,
          country: true,
        },
      },
    },
  })
  return reservations
}
