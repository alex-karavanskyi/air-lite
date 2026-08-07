import { Label } from '../../shared/ui/label'
import { LuImagePlus } from 'react-icons/lu'

const ImageInput = () => {
  const name = 'image'
  return (
    <div className='mb-2'>
      <Label htmlFor={name} className='mb-2 capitalize'>
        Cover photo
      </Label>
      <label
        htmlFor={name}
        className='flex h-28 cursor-pointer items-center gap-4 rounded-2xl border border-dashed border-border bg-muted/15 px-5 transition-colors hover:border-primary/40 hover:bg-primary/[0.03]'
      >
        <span className='flex size-11 shrink-0 items-center justify-center rounded-xl bg-card text-primary shadow-sm'>
          <LuImagePlus className='size-5' />
        </span>
        <span>
          <span className='block text-sm font-medium'>Choose an image</span>
          <span className='mt-1 block text-xs text-muted-foreground'>
            JPG, PNG or WebP
          </span>
        </span>
      </label>
      <input
        id={name}
        name={name}
        type='file'
        required
        accept='image/*'
        className='sr-only'
      />
    </div>
  )
}
export default ImageInput
