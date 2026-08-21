import FormInput from '@/components/form/FormInput'
import FormContainer from '@/components/form/FormContainer'
import { SubmitButton } from '@/components/form/Buttons'
import { createProfileAction } from '@/shared/actions/profile'
import { db } from '@/shared/utils/db'
import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { LuUserRoundPlus } from 'react-icons/lu'

async function CreateProfile() {
  await auth.protect()

  const user = await currentUser()
  if (!user) return null

  const profile = await db.profile.findUnique({
    where: {
      clerkId: user.id,
    },
  })

  if (profile) redirect('/profile')
  return (
    <section className='mx-auto max-w-xl py-6 pb-16'>
      <div className='overflow-hidden rounded-[2rem] border border-border/70 bg-card shadow-[0_24px_80px_-48px_rgba(28,25,23,0.5)]'>
        <header className='border-b border-border/60 bg-muted/25 px-6 py-8 text-center sm:px-10'>
          <div className='mx-auto mb-5 flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary'>
            <LuUserRoundPlus className='size-6' />
          </div>
          <p className='mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary'>
            One last step
          </p>
          <h1 className='text-3xl font-semibold tracking-[-0.03em]'>
            Complete your profile
          </h1>
          <p className='mx-auto mt-3 max-w-sm text-sm leading-6 text-muted-foreground'>
            Tell us how you would like to be known around AirLite.
          </p>
        </header>
        <div className='p-6 sm:p-10'>
        <FormContainer action={createProfileAction}>
          <div className='grid gap-2 [&_[data-slot=input]]:h-11'>
            <FormInput type='text' name='firstName' label='First Name' />
            <FormInput type='text' name='lastName' label='Last Name' />
            <FormInput type='text' name='username' label='Username' />
          </div>
          <SubmitButton
            text='Create profile'
            className='mt-5 h-11 w-full rounded-xl'
          />
        </FormContainer>
        </div>
      </div>
    </section>
  )
}
export default CreateProfile
