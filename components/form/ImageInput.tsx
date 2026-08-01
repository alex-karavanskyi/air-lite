import { Label } from '../../shared/ui/label'
import { Input } from '../../shared/ui/input'

const ImageInput = () => {
  const name = 'image'
  return (
    <div className='mb-2'>
      <Label htmlFor={name} className='capitalize mb-2'>
        Image
      </Label>
      <Input
        id={name}
        name={name}
        type='file'
        required
        accept='image/*'
        className='max-w-xs'
      />
    </div>
  )
}
export default ImageInput
