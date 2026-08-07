import EmptyList from '@/components/home/EmptyList'
import { fetchRentals, deleteRentalAction } from '@/shared/actions/properties'
import Link from 'next/link'
import { formatCurrency } from '@/utils/format'
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
import { auth } from '@clerk/nextjs/server'
import PageHeader from '@/components/layout/PageHeader'
import { Button } from '@/shared/ui/button'
import { LuPlus } from 'react-icons/lu'

async function RentalsPage() {
  await auth.protect()

  const rentals = await fetchRentals()

  if (rentals.length === 0) {
    return (
      <EmptyList
        heading='No rentals to display.'
        message="Don't hesitate to create a rental."
        btnText='Create a rental'
        btnHref='/rentals/create'
      />
    )
  }
  return (
    <section className='pb-12'>
      <PageHeader
        eyebrow='Host dashboard'
        title='Your rentals'
        description={`${rentals.length} active ${rentals.length === 1 ? 'property' : 'properties'} ready to welcome guests.`}
      >
        <Button asChild className='h-11 rounded-xl px-5'>
          <Link href='/rentals/create'>
            <LuPlus /> New rental
          </Link>
        </Button>
      </PageHeader>
      <div className='overflow-hidden rounded-3xl border border-border/70 bg-card shadow-[0_18px_60px_-42px_rgba(28,25,23,0.4)] [&_[data-slot=table-head]]:px-5 [&_[data-slot=table-cell]]:px-5 [&_[data-slot=table-cell]]:py-4 [&_[data-slot=table-header]]:bg-muted/35'>
        <Table>
        <TableCaption>A list of all your properties.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Property Name</TableHead>
            <TableHead>Nightly Rate </TableHead>
            <TableHead>Nights Booked</TableHead>
            <TableHead>Total Income</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rentals.map((rental) => {
            const { id: propertyId, name, price } = rental
            const { totalNightsSum, orderTotalSum } = rental
            return (
              <TableRow key={propertyId}>
                <TableCell>
                  <Link
                    href={`/properties/${propertyId}`}
                    className='font-medium transition-colors hover:text-primary'
                  >
                    {name}
                  </Link>
                </TableCell>
                <TableCell>{formatCurrency(price)}</TableCell>
                <TableCell>{totalNightsSum || 0}</TableCell>
                <TableCell>{formatCurrency(orderTotalSum)}</TableCell>

                <TableCell className='flex items-center gap-x-2'>
                  <Link href={`/rentals/${propertyId}/edit`}>
                    <IconButton actionType='edit'></IconButton>
                  </Link>
                  <DeleteRental propertyId={propertyId} />
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

function DeleteRental({ propertyId }: { propertyId: string }) {
  const deleteRental = deleteRentalAction.bind(null, { propertyId })
  return (
    <FormContainer action={deleteRental}>
      <IconButton actionType='delete' />
    </FormContainer>
  )
}

export default RentalsPage
