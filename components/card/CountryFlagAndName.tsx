import Image from 'next/image'
import { findCountryByCode } from '@/utils/countries'

const CountryFlagAndName = ({ countryCode }: { countryCode: string }) => {
  const validCountry = findCountryByCode(countryCode)

  if (!validCountry) return null

  const countryName =
    validCountry.name.length > 20
      ? `${validCountry.name.substring(0, 20)}...`
      : validCountry.name

  return (
    <span className='flex items-center gap-2 text-sm'>
      <span className='relative inline-block h-4 w-6 overflow-hidden rounded-sm shrink-0'>
        <Image
          src={`https://flagcdn.com/${validCountry.code.toLowerCase()}.svg`}
          alt={validCountry.name}
          fill
          className='object-cover'
        />
      </span>
      {countryName}
    </span>
  )
}

export default CountryFlagAndName
