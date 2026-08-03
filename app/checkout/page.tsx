import { auth } from '@clerk/nextjs/server'
import React from 'react'

async function CheckoutPage() {
  await auth.protect()
  return <div>page</div>
}

export default CheckoutPage
