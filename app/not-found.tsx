import Link from 'next/link'
import React from 'react'

const notfound = () => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <h2 className="text-xl font-bold">{`Couldn't find requested page`}</h2>
      <Link href="/dashboard/analytics/PMS" className="mt-5 btn btn-wide">
        Go Home
      </Link>
    </div>  )
}

export default notfound