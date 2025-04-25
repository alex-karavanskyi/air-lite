import { createClient } from '@supabase/supabase-js'

const bucket = 'air-lite'

export const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string
)

export const uploadImage = async (image: File) => {
  try {
    const timestamp = Date.now()
    const newName = `${timestamp}-${image.name}`
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(newName, image, {
        cacheControl: '3600',
      })

    if (error) {
      console.error('Upload error:', error.message)
      throw new Error(`Image upload failed: ${error.message}`)
    }

    if (!data) {
      throw new Error('Image upload failed: No data returned')
    }

    const { publicUrl } = supabase.storage
      .from(bucket)
      .getPublicUrl(newName).data
    return publicUrl
  } catch (err) {
    console.error('Unexpected error during image upload:', err)
    throw err
  }
}
