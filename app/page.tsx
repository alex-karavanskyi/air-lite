import LoadingCards from '@/components/card/LoadingCards'
import CategoriesList from '@/components/home/CategoriesList'
import PropertiesContainer from '@/components/home/PropertiesContainer'
import { Suspense } from 'react'

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>
}) {
  const resolvedSearchParams = await searchParams
  return (
    <section>
      <CategoriesList
        category={resolvedSearchParams?.category}
        search={resolvedSearchParams?.search}
      />
      <Suspense fallback={<LoadingCards />}>
        <PropertiesContainer
          category={resolvedSearchParams?.category}
          search={resolvedSearchParams?.search}
        />
      </Suspense>
    </section>
  )
}
