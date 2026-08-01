'use client'
import { Skeleton } from '@/shared/ui/skeleton'

const loading = () => {
  return <Skeleton className='h-[300px] md:h-[500px] w-full rounded' />
}

export default loading
