import EmptyList from '@/components/home/EmptyList'
import PropertiesList from '@/components/home/PropertiesList'
import { fetchFavorites } from '@/shared/action/favorites'
import { auth } from '@clerk/nextjs/server'

async function FavoritesPage() {
  await auth.protect()

  const favorites = await fetchFavorites()

  if (favorites.length === 0) {
    return <EmptyList />
  }
  return <PropertiesList properties={favorites} />
}
export default FavoritesPage
