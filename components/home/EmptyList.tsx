import { Button } from '../../shared/ui/button'
import Link from 'next/link'
import { LuCompass } from 'react-icons/lu'

const EmptyList = ({
  heading = 'No items in the list.',
  message = 'Keep exploring our properties.',
  btnText = 'back home',
  btnHref = '/',
}: {
  heading?: string
  message?: string
  btnText?: string
  btnHref?: string
}) => {
  return (
    <div className='mx-auto my-16 flex max-w-xl flex-col items-center rounded-[2rem] border border-dashed border-border bg-card px-6 py-14 text-center shadow-[0_18px_60px_-42px_rgba(28,25,23,0.4)]'>
      <div className='mb-5 flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary'>
        <LuCompass className='size-6' />
      </div>
      <h2 className='text-xl font-semibold tracking-tight sm:text-2xl'>{heading}</h2>
      <p className='mt-2 max-w-sm text-sm leading-6 text-muted-foreground'>
        {message}
      </p>
      <Button asChild className='mt-6 h-11 rounded-xl px-6 capitalize' size='lg'>
        <Link href={btnHref}>{btnText}</Link>
      </Button>
    </div>
  )
}
export default EmptyList
