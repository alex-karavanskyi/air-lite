import {
  deleteReviewAction,
  fetchPropertyReviewsByUser,
} from '@/shared/actions/reviews'
import { IconButton } from '@/components/form/Buttons'
import EmptyList from '@/components/home/EmptyList'
import ReviewCard from '@/components/reviews/ReviewCard'
import FormContainer from '@/components/form/FormContainer'
import { auth } from '@clerk/nextjs/server'
import PageHeader from '@/components/layout/PageHeader'

async function ReviewsPage() {
  await auth.protect()

  const reviews = await fetchPropertyReviewsByUser()

  if (reviews.length === 0)
    return (
      <EmptyList
        heading='No reviews written yet'
        message='After your next stay, share your experience with other travelers.'
        btnText='Explore stays'
      />
    )
  return (
    <section className='pb-12'>
      <PageHeader
        eyebrow='Your feedback'
        title='Reviews'
        description={`${reviews.length} ${reviews.length === 1 ? 'review' : 'reviews'} shared with the community.`}
      />
      <div className='grid gap-5 md:grid-cols-2'>
        {reviews.map((review) => {
          const { comment, rating } = review
          const { name, image } = review.property
          const reviewInfo = {
            comment,
            rating,
            name,
            image,
          }
          return (
            <ReviewCard key={review.id} reviewInfo={reviewInfo}>
              <DeleteReview reviewId={review.id} />
            </ReviewCard>
          )
        })}
      </div>
    </section>
  )
}

const DeleteReview = ({ reviewId }: { reviewId: string }) => {
  const deleteReview = deleteReviewAction.bind(null, { reviewId })
  return (
    <FormContainer action={deleteReview}>
      <IconButton actionType='delete' />
    </FormContainer>
  )
}

export default ReviewsPage
