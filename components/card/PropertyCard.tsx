import Image from 'next/image'
import Link from 'next/link'
import CountryFlagAndName from './CountryFlagAndName'
import PropertyRating from './PropertyRating'
import FavoriteToggleButton from './FavoriteToggleButton'
import { PropertyCardProps } from '@/utils/types'
import { formatCurrency } from '@/utils/format'

function PropertyCard({ property }: { property: PropertyCardProps }) {
  const { name, image, price } = property
  const { country, id: propertyId, tagline } = property

  return (
    <article className='group relative rounded-3xl border border-transparent p-2 transition-all duration-300 hover:border-border/70 hover:bg-card hover:shadow-[0_20px_55px_-35px_rgba(28,25,23,0.5)]'>
      <Link href={`/properties/${propertyId}`}>
        <div className='relative mb-3 h-[290px] overflow-hidden rounded-[1.25rem] bg-muted'>
          <Image
            src={image}
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw'
            alt={name}
            className='object-cover transition-transform duration-700 group-hover:scale-105'
          />
        </div>
        <div className='flex items-center justify-between gap-3 px-1'>
          <h3 className='mt-1 truncate text-sm font-semibold'>
            {name.substring(0, 30)}
          </h3>
          <PropertyRating inPage={false} propertyId={propertyId} />
        </div>
        <p className='mt-1 truncate px-1 text-sm text-muted-foreground'>
          {tagline.substring(0, 40)}
        </p>
        <div className='mt-2 flex items-center justify-between px-1 pb-1'>
          <p className='text-sm'>
            <span className='font-semibold'>{formatCurrency(price)} </span>
            night
          </p>
          <CountryFlagAndName countryCode={country} />
        </div>
      </Link>
      <div className='absolute right-5 top-5 z-5'>
        <FavoriteToggleButton propertyId={propertyId} />
      </div>
    </article>
  )
}
export default PropertyCard
