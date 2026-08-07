'use client'
import { useState } from 'react'
import { amenities, Amenity } from '@/utils/amenities'
import { Checkbox } from '@/shared/ui/checkbox'

const AmenitiesInput = ({ defaultValue }: { defaultValue?: Amenity[] }) => {
  const amenitiesWithIcons = defaultValue?.map(({ name, selected }) => {
    return {
      name,
      selected,
      icon: amenities.find((amenity) => amenity.name === name)!.icon,
    }
  })
  const [selectedAmenities, setSelectedAmenities] = useState<Amenity[]>(
    amenitiesWithIcons || amenities,
  )
  const handleChange = (amenity: Amenity) => {
    setSelectedAmenities((prev) => {
      return prev.map((a) => {
        if (a.name === amenity.name) {
          return { ...a, selected: !a.selected }
        }
        return a
      })
    })
  }

  return (
    <section>
      <input
        type='hidden'
        name='amenities'
        value={JSON.stringify(selectedAmenities)}
      />
      <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
        {selectedAmenities.map((amenity) => (
          <label
            key={amenity.name}
            htmlFor={amenity.name}
            className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition-all ${
              amenity.selected
                ? 'border-primary/30 bg-primary/[0.06] text-foreground'
                : 'border-border/70 bg-muted/10 text-muted-foreground hover:border-primary/20 hover:bg-muted/25'
            }`}
          >
            <span className='flex size-9 shrink-0 items-center justify-center rounded-xl bg-card shadow-sm'>
              <amenity.icon className='size-4' />
            </span>
            <span className='flex-1 text-sm font-medium capitalize'>
              {amenity.name}
            </span>
            <Checkbox
              id={amenity.name}
              checked={amenity.selected}
              onCheckedChange={() => handleChange(amenity)}
              className='size-5 rounded-md'
            />
          </label>
        ))}
      </div>
    </section>
  )
}
export default AmenitiesInput
