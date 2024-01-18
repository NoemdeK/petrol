"use client"

import { useRouter } from 'next/navigation'
import React from 'react'
import { Button } from './ui/button'

const Back = () => {
    const router = useRouter()
  return (
    <Button onClick={() => router.back()} className='m-8'>
        Go Back
    </Button>
  )
}

export default Back