'use client'

import { LuMinus, LuPlus } from 'react-icons/lu'
import { Button } from '../../shared/ui/button'
import { useState } from 'react'

const detailCopy: Record<string, string> = {
  guests: 'How many guests can stay?',
  bedrooms: 'Private sleeping rooms',
  beds: 'Total beds available',
  baths: 'Private and shared bathrooms',
}

function CounterInput({
  detail,
  defaultValue,
}: {
  detail: string
  defaultValue?: number
}) {
  const [count, setCount] = useState(defaultValue || 0)

  const increaseCount = () => {
    setCount((prevCount) => prevCount + 1)
  }

  const decreaseCount = () => {
    setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : prevCount))
  }

  return (
    <div className='flex min-h-24 items-center gap-4 rounded-2xl border border-border/70 bg-muted/15 p-4 transition-colors hover:border-primary/20 hover:bg-muted/25'>
      <input type='hidden' name={detail} value={count} />
      <div className='min-w-0 flex-1'>
        <h3 className='font-medium capitalize'>{detail}</h3>
        <p className='mt-1 text-xs leading-5 text-muted-foreground'>
          {detailCopy[detail] || `Specify the number of ${detail}`}
        </p>
      </div>
      <div className='flex shrink-0 items-center gap-2'>
            <Button
              variant='outline'
              size='icon'
              type='button'
              onClick={decreaseCount}
              disabled={count === 0}
              aria-label={`Decrease ${detail}`}
              className='size-9 rounded-full bg-card'
            >
              <LuMinus className='size-4' />
            </Button>
            <span className='w-6 text-center text-base font-semibold tabular-nums'>
              {count}
            </span>
            <Button
              variant='outline'
              size='icon'
              type='button'
              onClick={increaseCount}
              aria-label={`Increase ${detail}`}
              className='size-9 rounded-full bg-card'
            >
              <LuPlus className='size-4' />
            </Button>
      </div>
    </div>
  )
}

export default CounterInput
