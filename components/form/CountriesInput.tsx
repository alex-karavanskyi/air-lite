'use client'
import Image from 'next/image'
import { useState } from 'react'
import { Label } from '@/shared/ui/label'
import { formattedCountries, findCountryByCode } from '@/utils/countries'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select'

const name = 'country'

const Flag = ({ code, name }: { code: string; name: string }) => (
  <span className='relative inline-block h-4 w-6 overflow-hidden rounded-sm shrink-0'>
    <Image
      src={`https://flagcdn.com/${code.toLowerCase()}.svg`}
      alt={name}
      fill
      className='object-cover'
    />
  </span>
)

const CountriesInput = ({ defaultValue }: { defaultValue?: string }) => {
  const [value, setValue] = useState(defaultValue || formattedCountries[0].code)
  const selected = findCountryByCode(value)

  return (
    <div className='mb-2'>
      <Label htmlFor={name} className='capitalize mb-2'>
        country
      </Label>

      <Select value={value} onValueChange={setValue} name={name} required>
        <SelectTrigger id={name}>
          <SelectValue>
            {selected && (
              <span className='flex items-center gap-2'>
                <Flag code={selected.code} name={selected.name} />
                {selected.name}
              </span>
            )}
          </SelectValue>
        </SelectTrigger>

        <SelectContent>
          {formattedCountries.map((item) => (
            <SelectItem key={item.code} value={item.code}>
              <span className='flex items-center gap-2'>
                <Flag code={item.code} name={item.name} />
                {item.name}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default CountriesInput
