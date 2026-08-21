import EmptyList from '@/components/home/EmptyList'
import CountryFlagAndName from '@/components/card/CountryFlagAndName'
import Link from 'next/link'

import { formatDate, formatCurrency } from '@/utils/format'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table'

import FormContainer from '@/components/form/FormContainer'
import { IconButton } from '@/components/form/Buttons'
import { fetchBookings, deleteBookingAction } from '@/shared/actions/bookings'
import { auth } from '@clerk/nextjs/server'
import PageHeader from '@/components/layout/PageHeader'

async function BookingsPage() {
  await auth.protect()

  const bookings = await fetchBookings()

  if (bookings.length === 0) {
    return (
      <EmptyList
        heading='No trips booked yet'
        message='When you book a stay, all the details will appear here.'
        btnText='Explore stays'
      />
    )
  }
  return (
    <section className='pb-12'>
      <PageHeader
        eyebrow='Your travel'
        title='Bookings'
        description={`${bookings.length} ${bookings.length === 1 ? 'trip' : 'trips'} in your booking history.`}
      />
      <div className='overflow-hidden rounded-3xl border border-border/70 bg-card shadow-[0_18px_60px_-42px_rgba(28,25,23,0.4)] [&_[data-slot=table-head]]:px-5 [&_[data-slot=table-cell]]:px-5 [&_[data-slot=table-cell]]:py-4 [&_[data-slot=table-header]]:bg-muted/35'>
        <Table>
        <TableCaption>A list of your recent bookings.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Property Name</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Nights</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Check In</TableHead>
            <TableHead>Check Out</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => {
            const { id, orderTotal, totalNights, checkIn, checkOut } = booking
            const { id: propertyId, name, country } = booking.property
            const startDate = formatDate(checkIn)
            const endDate = formatDate(checkOut)
            return (
              <TableRow key={id}>
                <TableCell>
                  <Link
                    href={`/properties/${propertyId}`}
                    className='font-medium transition-colors hover:text-primary'
                  >
                    {name}
                  </Link>
                </TableCell>
                <TableCell>
                  <CountryFlagAndName countryCode={country} />
                </TableCell>
                <TableCell>{totalNights}</TableCell>
                <TableCell>{formatCurrency(orderTotal)}</TableCell>
                <TableCell>{startDate}</TableCell>
                <TableCell>{endDate}</TableCell>
                <TableCell>
                  <DeleteBooking bookingId={id} />
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
        </Table>
      </div>
    </section>
  )
}

function DeleteBooking({ bookingId }: { bookingId: string }) {
  const deleteBooking = deleteBookingAction.bind(null, { bookingId })
  return (
    <FormContainer action={deleteBooking}>
      <IconButton actionType='delete' />
    </FormContainer>
  )
}

export default BookingsPage
