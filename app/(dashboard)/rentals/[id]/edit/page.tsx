import {
  fetchRentalDetails,
  updatePropertyImageAction,
  updatePropertyAction,
} from '@/shared/actions/properties'
import FormContainer from '@/components/form/FormContainer'
import FormInput from '@/components/form/FormInput'
import CategoriesInput from '@/components/form/CategoriesInput'
import PriceInput from '@/components/form/PriceInput'
import TextAreaInput from '@/components/form/TextAreaInput'
import CountriesInput from '@/components/form/CountriesInput'
import CounterInput from '@/components/form/CounterInput'
import AmenitiesInput from '@/components/form/AmenitiesInput'
import ImageInputContainer from '@/components/form/ImageInputContainer'
import { type Amenity } from '@/utils/amenities'
import { SubmitButton } from '@/components/form/Buttons'
import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'
import PageHeader from '@/components/layout/PageHeader'
import Link from 'next/link'
import { LuArrowLeft, LuBedDouble, LuHouse, LuSparkles } from 'react-icons/lu'

async function EditRentalPage({ params }: { params: Promise<{ id: string }> }) {
  await auth.protect()
  const { id } = await params
  const property = await fetchRentalDetails(id)

  if (!property) redirect('/')

  const defaultAmenities: Amenity[] = JSON.parse(property.amenities)

  return (
    <section className='mx-auto max-w-5xl pb-16'>
      <Link
        href='/rentals'
        className='mb-5 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground'
      >
        <LuArrowLeft className='size-4' /> Back to rentals
      </Link>
      <PageHeader
        eyebrow='Listing editor'
        title='Edit your rental'
        description='Fine-tune the details guests see before they book.'
      />

      <div className='mb-6 rounded-3xl border border-border/70 bg-card p-6 shadow-[0_18px_60px_-42px_rgba(28,25,23,0.4)] sm:p-7'>
        <div className='mb-5'>
          <h2 className='text-lg font-semibold'>Cover photo</h2>
          <p className='mt-1 text-sm text-muted-foreground'>
            Keep your strongest, most inviting image up front.
          </p>
        </div>
        <ImageInputContainer
          name={property.name}
          text='Change image'
          action={updatePropertyImageAction}
          image={property.image}
        >
          <input type='hidden' name='id' value={property.id} />
        </ImageInputContainer>
      </div>

      <FormContainer action={updatePropertyAction}>
        <input type='hidden' name='id' value={property.id} />
        <div className='space-y-6 [&_[data-slot=input]]:h-11 [&_[data-slot=select-trigger]]:h-11 [&_[data-slot=select-trigger]]:w-full [&_[data-slot=textarea]]:min-h-36'>
          <div className='rounded-3xl border border-border/70 bg-card p-6 shadow-[0_18px_60px_-42px_rgba(28,25,23,0.4)] sm:p-7'>
            <div className='mb-6 flex items-center gap-3 border-b border-border/60 pb-5'>
              <span className='flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary'>
                <LuHouse className='size-5' />
              </span>
              <div>
                <h2 className='text-lg font-semibold'>Property details</h2>
                <p className='text-sm text-muted-foreground'>Name, pricing and location</p>
              </div>
            </div>
            <div className='grid gap-x-6 md:grid-cols-2'>
            <FormInput
              name='name'
              type='text'
              label='Property name'
              defaultValue={property.name}
            />
            <FormInput
              name='tagline'
              type='text '
              label='Short tagline'
              defaultValue={property.tagline}
            />
            <PriceInput defaultValue={property.price} />
            <CategoriesInput defaultValue={property.category} />
              <CountriesInput defaultValue={property.country} />
            </div>
            <div className='mt-3 border-t border-border/60 pt-6'>
              <TextAreaInput
                name='description'
                labelText='Property description'
                defaultValue={property.description}
              />
            </div>
          </div>

          <div className='rounded-3xl border border-border/70 bg-card p-6 shadow-[0_18px_60px_-42px_rgba(28,25,23,0.4)] sm:p-7'>
            <div className='mb-6 flex items-center gap-3 border-b border-border/60 pb-5'>
              <span className='flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary'>
                <LuBedDouble className='size-5' />
              </span>
              <div>
                <h2 className='text-lg font-semibold'>Accommodation</h2>
                <p className='text-sm text-muted-foreground'>Capacity and sleeping arrangements</p>
              </div>
            </div>
            <div className='grid gap-3 sm:grid-cols-2'>
              <CounterInput detail='guests' defaultValue={property.guests} />
              <CounterInput detail='bedrooms' defaultValue={property.bedrooms} />
              <CounterInput detail='beds' defaultValue={property.beds} />
              <CounterInput detail='baths' defaultValue={property.baths} />
            </div>
          </div>

          <div className='rounded-3xl border border-border/70 bg-card p-6 shadow-[0_18px_60px_-42px_rgba(28,25,23,0.4)] sm:p-7'>
            <div className='mb-6 flex items-center gap-3 border-b border-border/60 pb-5'>
              <span className='flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary'>
                <LuSparkles className='size-5' />
              </span>
              <div>
                <h2 className='text-lg font-semibold'>Amenities</h2>
                <p className='text-sm text-muted-foreground'>Everything included in the stay</p>
              </div>
            </div>
            <AmenitiesInput defaultValue={defaultAmenities} />
          </div>

          <div className='flex justify-end rounded-3xl border border-primary/15 bg-primary/[0.06] p-5 sm:p-6'>
            <SubmitButton
              text='Save changes'
              className='h-12 rounded-xl px-7 shadow-lg shadow-primary/20'
            />
          </div>
        </div>
      </FormContainer>
    </section>
  )
}
export default EditRentalPage
