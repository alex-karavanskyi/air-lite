import Image from 'next/image'
import { LuUser } from 'react-icons/lu'
import { fetchProfileImage } from '@/shared/action/profile'

async function UserIcon() {
  const profileImage = await fetchProfileImage()

  if (profileImage) {
    return (
      <Image
        src={profileImage}
        alt='Profile'
        width={24}
        height={24}
        className='rounded-full object-cover'
      />
    )
  }

  return <LuUser className='w-6 h-6 bg-primary rounded-full text-white' />
}

export default UserIcon
