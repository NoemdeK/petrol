"use client"

import { useRouter } from 'next/navigation'
import React from 'react'
import { Button } from './ui/button'

const Reload = () => {
    const router = useRouter()
  return (
    <Button onClick={() => window.location.reload()} className='m-8'>
        Retry
    </Button>
  )
}

export default Reload