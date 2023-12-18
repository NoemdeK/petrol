"use client"
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const Page = () => {
    const router = useRouter()

    useEffect(() => {
      router.push('/dashboard/analytics/PMS')
    }, [router])
  return (
    <div>

    </div>
  )
}

export default Page