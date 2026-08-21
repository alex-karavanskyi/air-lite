import { Show, SignInButton, SignUpButton } from '@clerk/nextjs'
import Link from 'next/link'
import { LuPanelLeft } from 'react-icons/lu'

import { Button } from '@/shared/ui/button'

import UserIcon from './UserIcon'

const AccountNavigation = () => {
  return (
    <div className='flex items-center gap-2'>
      <Show when='signed-out'>
        <SignInButton mode='modal'>
          <Button variant='ghost'>Login</Button>
        </SignInButton>
        <SignUpButton mode='modal'>
          <Button>Register</Button>
        </SignUpButton>
      </Show>

      <Show when='signed-in'>
        <Button
          asChild
          variant='outline'
          className='h-10 gap-3 rounded-xl px-3'
        >
          <Link href='/profile' aria-label='Open account workspace'>
            <LuPanelLeft className='size-5' />
            <UserIcon />
          </Link>
        </Button>
      </Show>
    </div>
  )
}

export default AccountNavigation
