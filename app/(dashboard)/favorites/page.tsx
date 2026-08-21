import EmptyList from '@/components/home/EmptyList'
import PropertiesList from '@/components/home/PropertiesList'
import { fetchFavorites } from '@/shared/actions/favorites'
import { auth } from '@clerk/nextjs/server'
import PageHeader from '@/components/layout/PageHeader'

async function FavoritesPage() {
  await auth.protect()

  const favorites = await fetchFavorites()

  if (favorites.length === 0) {
    return (
      <EmptyList
        heading='No favorites yet'
        message='Save the places you love and come back to them anytime.'
        btnText='Find a stay'
      />
    )
  }
  return (
    <section className='pb-12'>
      <PageHeader
        eyebrow='Saved for later'
        title='Your favorites'
        description={`${favorites.length} ${favorites.length === 1 ? 'place' : 'places'} you would love to visit.`}
      />
      <PropertiesList properties={favorites} />
    </section>
  )
}
export default FavoritesPage
