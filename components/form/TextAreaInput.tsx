import { Label } from '@/shared/ui/label'
import { Textarea } from '@/shared/ui/textarea'

type TextAreaInputProps = {
  name: string
  labelText?: string
  defaultValue?: string
}

const TextAreaInput = ({
  name,
  labelText,
  defaultValue,
}: TextAreaInputProps) => {
  return (
    <div className='mb-2'>
      <Label htmlFor={name} className='capitalize mb-2'>
        {labelText || name}
      </Label>
      <Textarea
        id={name}
        name={name}
        defaultValue={defaultValue || tempDefaultDescription}
        rows={5}
        required
        className='leading-loose'
      />
    </div>
  )
}

const tempDefaultDescription = `Escape to a stylish modern retreat designed for comfort, relaxation, and unforgettable stays. This cozy home features a spacious queen bed, high-speed Wi-Fi, smart TV, air conditioning, a fully equipped kitchen, and a private outdoor patio where you can enjoy your morning coffee or unwind under the stars. Located just minutes from local restaurants, scenic hiking trails, beautiful beaches, and vibrant downtown attractions, it's the perfect base for exploring the area or simply slowing down and recharging. Guests have access to free parking, a fire pit, outdoor seating, and a peaceful garden surrounded by nature.`

export default TextAreaInput
