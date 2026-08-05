'use server'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { db } from '../utils/db'

export const getAuthUser = async () => {
  const user = await currentUser()
  if (!user) {
    throw new Error('You must be logged in to access this route')
  }

  const profile = await db.profile.findUnique({
    where: {
      clerkId: user.id,
    },
  })

  if (!profile) redirect('/profile/create')
  return user
}
