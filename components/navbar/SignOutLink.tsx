'use client'
import { SignOutButton } from '@clerk/nextjs'
import { toast } from 'sonner'
import { LuLogOut } from 'react-icons/lu'

const SignOutLink = () => {
  const handleLogout = () => {
    toast('You have been signed out.')
  }
  return (
    <SignOutButton redirectUrl='/'>
      <button
        className='flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground'
        onClick={handleLogout}
      >
        <LuLogOut className='size-4' />
        Logout
      </button>
    </SignOutButton>
  )
}
export default SignOutLink
