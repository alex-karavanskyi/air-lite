import Image from 'next/image'
import { Card, CardContent, CardHeader } from '@/shared/ui/card'
import Rating from './Rating'
import Comment from './Comment'

type ReviewCardProps = {
  reviewInfo: {
    comment: string
    rating: number
    name: string
    image: string
  }
  children?: React.ReactNode
}

const ReviewCard = ({ reviewInfo, children }: ReviewCardProps) => {
  return (
    <Card className='relative rounded-3xl border-border/70 shadow-[0_18px_50px_-40px_rgba(28,25,23,0.45)]'>
      <CardHeader>
        <div className='flex items-center'>
          <Image
            src={reviewInfo.image}
            alt='profile'
            width={48}
            height={48}
            className='size-12 rounded-2xl object-cover'
          />
          <div className='ml-4'>
            <h3 className='mb-1 text-sm font-semibold capitalize'>
              {reviewInfo.name}
            </h3>
            <Rating rating={reviewInfo.rating} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Comment comment={reviewInfo.comment} />
      </CardContent>
      {/* delete button later */}
      <div className='absolute top-3 right-3'>{children}</div>
    </Card>
  )
}

export default ReviewCard
