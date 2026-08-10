'use client'
import { useState } from 'react'
import Image from 'next/image'
import { Button } from '../../shared/ui/button'
import FormContainer from './FormContainer'
import ImageInput from './ImageInput'
import { SubmitButton } from './Buttons'
import { type actionFunction } from '@/utils/types'
import { LuUser } from 'react-icons/lu'

type ImageInputContainerProps = {
  image: string
  name: string
  action: actionFunction
  text: string
  children?: React.ReactNode
}

const ImageInputContainer = (props: ImageInputContainerProps) => {
  const { image, name, action, text } = props
  const [isUpdateFormVisible, setUpdateFormVisible] = useState(false)

  const userIcon = (
    <div className='mb-4 flex size-24 items-center justify-center rounded-3xl bg-primary/10 text-primary'>
      <LuUser className='size-10' />
    </div>
  )
  return (
    <div>
      {image ? (
        <Image
          src={image}
          width={100}
          height={100}
          className='mb-4 size-24 rounded-3xl border-4 border-background object-cover shadow-md'
          alt={name}
        />
      ) : (
        userIcon
      )}

      <Button
        variant='outline'
        size='sm'
        type='button'
        className='rounded-xl bg-background'
        onClick={() => setUpdateFormVisible((prev) => !prev)}
      >
        {text}
      </Button>
      {isUpdateFormVisible && (
        <div className='mt-4 max-w-lg rounded-2xl border bg-background p-4'>
          <FormContainer action={action}>
            {props.children}
            <ImageInput />
            <SubmitButton size='sm' className='mt-3 rounded-lg' />
          </FormContainer>
        </div>
      )}
    </div>
  )
}
export default ImageInputContainer
