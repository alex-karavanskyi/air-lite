import FormInput from '@/components/form/FormInput'
import FormContainer from '@/components/form/FormContainer'
import PriceInput from '@/components/form/PriceInput'
import CategoriesInput from '@/components/form/CategoriesInput'
import TextAreaInput from '@/components/form/TextAreaInput'
import CountriesInput from '@/components/form/CountriesInput'
import ImageInput from '@/components/form/ImageInput'
import CounterInput from '@/components/form/CounterInput'
import AmenitiesInput from '@/components/form/AmenitiesInput'
import { createPropertyAction } from '@/shared/actions/properties'
import { SubmitButton } from '@/components/form/Buttons'
import { auth } from '@clerk/nextjs/server'
import {
  LuArrowLeft,
  LuBadgeCheck,
  LuBedDouble,
  LuHouse,
  LuImage,
  LuMapPin,
  LuSparkles,
} from 'react-icons/lu'
import Link from 'next/link'

const steps = [
  { href: '#basics', label: 'The basics', icon: LuHouse },
  { href: '#location', label: 'Location & photo', icon: LuMapPin },
  { href: '#space', label: 'Your space', icon: LuBedDouble },
  { href: '#amenities', label: 'Amenities', icon: LuSparkles },
]

type FormSectionProps = {
  id: string
  step: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}

const FormSection = ({
  id,
  step,
  title,
  description,
  icon: Icon,
  children,
}: FormSectionProps) => (
  <section
    id={id}
    className='scroll-mt-24 overflow-hidden rounded-3xl border border-border/70 bg-card shadow-[0_18px_60px_-36px_rgba(28,25,23,0.35)]'
  >
    <div className='flex gap-4 border-b border-border/60 bg-muted/25 px-5 py-5 sm:px-7'>
      <div className='flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary'>
        <Icon className='size-5' />
      </div>
      <div>
        <p className='mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary'>
          Step {step}
        </p>
        <h2 className='text-lg font-semibold tracking-tight sm:text-xl'>{title}</h2>
        <p className='mt-1 text-sm leading-6 text-muted-foreground'>{description}</p>
      </div>
    </div>
    <div className='p-5 sm:p-7'>{children}</div>
  </section>
)

const CreateProperty = async () => {
  await auth.protect()

  return (
    <div className='mx-auto max-w-6xl pb-16'>
      <header className='relative mb-10 overflow-hidden rounded-[2rem] border border-primary/10 bg-[linear-gradient(135deg,var(--card),color-mix(in_oklab,var(--primary)_8%,var(--card)))] px-6 py-8 shadow-[0_24px_80px_-48px_rgba(28,25,23,0.45)] sm:px-10 sm:py-10'>
        <div className='absolute -right-16 -top-20 size-64 rounded-full bg-primary/10 blur-3xl' />
        <div className='absolute -bottom-24 right-1/3 size-48 rounded-full bg-orange-300/10 blur-3xl' />
        <div className='relative max-w-2xl'>
          <Link
            href='/rentals'
            className='mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground'
          >
            <LuArrowLeft className='size-4' />
            Back to rentals
          </Link>
          <div className='mb-4 flex items-center gap-2 text-sm font-medium text-primary'>
            <LuSparkles className='size-4' />
            Host your place
          </div>
          <h1 className='max-w-xl text-3xl font-semibold tracking-[-0.035em] sm:text-4xl lg:text-5xl'>
            Create a stay guests will remember
          </h1>
          <p className='mt-4 max-w-xl text-base leading-7 text-muted-foreground'>
            Share the essentials, highlight what makes your place special, and
            publish your rental when everything feels right.
          </p>
        </div>
      </header>

      <div className='grid items-start gap-8 lg:grid-cols-[240px_minmax(0,1fr)]'>
        <aside className='hidden lg:sticky lg:top-24 lg:block'>
          <p className='mb-3 px-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground'>
            Your listing
          </p>
          <nav className='space-y-1' aria-label='Listing sections'>
            {steps.map(({ href, label, icon: Icon }, index) => (
              <a
                key={href}
                href={href}
                className='group flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-card hover:text-foreground hover:shadow-sm'
              >
                <span className='flex size-9 items-center justify-center rounded-xl border bg-card transition-colors group-hover:border-primary/25 group-hover:text-primary'>
                  <Icon className='size-4' />
                </span>
                <span className='flex-1'>{label}</span>
                <span className='text-xs tabular-nums opacity-45'>0{index + 1}</span>
              </a>
            ))}
          </nav>
          <div className='mt-6 rounded-2xl border border-primary/10 bg-primary/5 p-4'>
            <LuBadgeCheck className='mb-3 size-5 text-primary' />
            <p className='text-sm font-medium'>A few details go a long way</p>
            <p className='mt-1 text-xs leading-5 text-muted-foreground'>
              Clear photos and an honest description help guests book with
              confidence.
            </p>
          </div>
        </aside>

        <FormContainer action={createPropertyAction}>
          <div className='space-y-6 [&_[data-slot=input]]:h-11 [&_[data-slot=select-trigger]]:h-11 [&_[data-slot=select-trigger]]:w-full [&_[data-slot=textarea]]:min-h-36'>
            <FormSection
              id='basics'
              step='01'
              title='Start with the basics'
              description='Give guests a quick, clear picture of your property.'
              icon={LuHouse}
            >
              <div className='grid gap-x-6 sm:grid-cols-2'>
                <FormInput
                  name='name'
                  type='text'
                  label='Property name'
                  placeholder='e.g. Forest cabin near Kyiv'
                />
                <FormInput
                  name='tagline'
                  type='text'
                  label='Short tagline'
                  placeholder='What makes your place special?'
                />
                <PriceInput />
                <CategoriesInput />
              </div>
              <div className='mt-4 border-t border-border/60 pt-6'>
                <TextAreaInput
                  name='description'
                  labelText='Tell guests about your place'
                />
                <p className='mt-2 text-xs text-muted-foreground'>
                  Include the atmosphere, nearby highlights, and anything guests
                  should know before booking.
                </p>
              </div>
            </FormSection>

            <FormSection
              id='location'
              step='02'
              title='Set the scene'
              description='Choose the location and add a photo that feels inviting.'
              icon={LuMapPin}
            >
              <div className='grid gap-6 sm:grid-cols-2'>
                <CountriesInput />
                <ImageInput />
              </div>
            </FormSection>

            <FormSection
              id='space'
              step='03'
              title='Describe your space'
              description='Help guests understand who and what the property can accommodate.'
              icon={LuBedDouble}
            >
              <div className='grid gap-3 sm:grid-cols-2'>
                <CounterInput detail='guests' />
                <CounterInput detail='bedrooms' />
                <CounterInput detail='beds' />
                <CounterInput detail='baths' />
              </div>
            </FormSection>

            <FormSection
              id='amenities'
              step='04'
              title='Add the finishing touches'
              description='Select everything guests can enjoy during their stay.'
              icon={LuSparkles}
            >
              <AmenitiesInput />
            </FormSection>

            <div className='flex flex-col gap-5 rounded-3xl border border-primary/15 bg-primary/[0.06] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7'>
              <div className='flex gap-3'>
                <div className='flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground'>
                  <LuImage className='size-4' />
                </div>
                <div>
                  <p className='font-semibold'>Ready to welcome your first guest?</p>
                  <p className='mt-1 text-sm text-muted-foreground'>
                    You can update your listing at any time.
                  </p>
                </div>
              </div>
              <SubmitButton
                text='Create rental'
                size='lg'
                className='h-12 rounded-xl px-7 shadow-lg shadow-primary/20'
              />
            </div>
          </div>
        </FormContainer>
      </div>
    </div>
  )
}

export default CreateProperty
