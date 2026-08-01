'use client'
import { Calendar } from '@/shared/ui/calendar'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { DateRange } from 'react-day-picker'
import { useProperty } from '@/utils/store'

import {
  generateDisabledDates,
  generateDateRange,
  defaultSelected,
  generateBlockedPeriods,
} from '@/utils/calendar'

function BookingCalendar() {
  const currentDate = new Date()

  const [range, setRange] = useState<DateRange | undefined>(defaultSelected)

  const bookings = useProperty((state) => state.bookings)
  const blockedPeriods = generateBlockedPeriods({
    bookings,
    today: currentDate,
  })

  const unavailableDates = generateDisabledDates(blockedPeriods)

  useEffect(() => {
    const selectedRange = generateDateRange(range)
    selectedRange.some((date) => {
      if (unavailableDates[date]) {
        setRange(defaultSelected)
        toast('Some dates are booked. Please select again.')
        return true
      }
      return false
    })
    useProperty.setState({ range })
  }, [range, unavailableDates])

  return (
    <Calendar
      mode='range'
      defaultMonth={currentDate}
      selected={range}
      onSelect={setRange}
      className='mb-4'
      disabled={blockedPeriods}
    />
  )
}
export default BookingCalendar
