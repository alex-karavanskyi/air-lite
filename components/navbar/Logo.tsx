import Link from 'next/link'
import { GiTreehouse } from 'react-icons/gi'
import { Button } from '../../shared/ui/button'

const Logo = () => {
  return (
    <Button size='icon' className='size-10' asChild>
      <Link href='/'>
        <GiTreehouse className='size-10' />
      </Link>
    </Button>
  )
}

export default Logo
