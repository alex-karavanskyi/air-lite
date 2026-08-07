import { fetchReservations } from '@/shared/actions/bookings'
import Link from 'next/link'
import EmptyList from '@/components/home/EmptyList'
import CountryFlagAndName from '@/components/card/CountryFlagAndName'
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
import { auth } from '@clerk/nextjs/server'
import PageHeader from '@/components/layout/PageHeader'

async function ReservationsPage() {
  await auth.protect()

  const reservations = await fetchReservations()

  if (reservations.length === 0) {
    return (
      <EmptyList
        heading='No reservations yet'
        message='Guest reservations for your properties will appear here.'
        btnText='View rentals'
        btnHref='/rentals'
      />
    )
  }
  return (
    <section className='pb-12'>
      <PageHeader
        eyebrow='Host dashboard'
        title='Reservations'
        description={`${reservations.length} guest ${reservations.length === 1 ? 'reservation' : 'reservations'} across your rentals.`}
      />
      <div className='overflow-hidden rounded-3xl border border-border/70 bg-card shadow-[0_18px_60px_-42px_rgba(28,25,23,0.4)] [&_[data-slot=table-head]]:px-5 [&_[data-slot=table-cell]]:px-5 [&_[data-slot=table-cell]]:py-4 [&_[data-slot=table-header]]:bg-muted/35'>
        <Table>
        <TableCaption>A list of your recent reservations.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Property Name</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Nights</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Check In</TableHead>
            <TableHead>Check Out</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reservations.map((item) => {
            const { id, orderTotal, totalNights, checkIn, checkOut } = item
            const { id: propertyId, name, country } = item.property
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
              </TableRow>
            )
          })}
        </TableBody>
        </Table>
      </div>
    </section>
  )
}
export default ReservationsPage
