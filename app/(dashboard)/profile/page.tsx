import FormContainer from '@/components/form/FormContainer'
import FormInput from '@/components/form/FormInput'
import ImageInputContainer from '@/components/form/ImageInputContainer'
import { SubmitButton } from '@/components/form/Buttons'
import {
  updateProfileAction,
  fetchProfile,
  updateProfileImageAction,
} from '@/shared/actions/profile'
import { auth } from '@clerk/nextjs/server'
import PageHeader from '@/components/layout/PageHeader'
import { LuShieldCheck } from 'react-icons/lu'

async function ProfilePage() {
  await auth.protect()

  const profile = await fetchProfile()

  return (
    <section className='mx-auto max-w-4xl pb-12'>
      <PageHeader
        eyebrow='Personal settings'
        title='Your profile'
        description='Keep your personal information and profile photo up to date.'
      />
      <div className='grid overflow-hidden rounded-3xl border border-border/70 bg-card shadow-[0_24px_70px_-48px_rgba(28,25,23,0.5)] md:grid-cols-[260px_1fr]'>
        <aside className='border-b border-border/70 bg-muted/25 p-7 md:border-b-0 md:border-r'>
          <ImageInputContainer
            image={profile.profileImage}
            name={profile.username}
            action={updateProfileImageAction}
            text='Change photo'
          />
          <div className='mt-7 flex gap-3 rounded-2xl bg-background/70 p-4'>
            <LuShieldCheck className='mt-0.5 size-5 shrink-0 text-primary' />
            <p className='text-xs leading-5 text-muted-foreground'>
              Your profile helps hosts and guests recognize who they are
              connecting with.
            </p>
          </div>
        </aside>
        <div className='p-6 sm:p-8'>
          <h2 className='text-lg font-semibold'>Personal details</h2>
          <p className='mt-1 text-sm text-muted-foreground'>
            This information is shown across AirLite.
          </p>
          <FormContainer action={updateProfileAction}>
            <div className='mt-7 grid gap-2 [&_[data-slot=input]]:h-11'>
            <FormInput
              type='text'
              name='firstName'
              label='First Name'
              defaultValue={profile.firstName}
            />
            <FormInput
              type='text'
              name='lastName'
              label='Last Name'
              defaultValue={profile.lastName}
            />
            <FormInput
              type='text'
              name='username'
              label='Username'
              defaultValue={profile.username}
            />
            </div>
            <SubmitButton
              text='Save changes'
              className='mt-6 h-11 rounded-xl px-6'
            />
          </FormContainer>
        </div>
      </div>
    </section>
  )
}
export default ProfilePage
