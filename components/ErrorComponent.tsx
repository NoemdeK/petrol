import React from 'react'
import Reload from './Reload'
import { XCircle } from 'lucide-react'

const ErrorComponent = () => {
  return (
    <div className="absolute inset-0 flex flex-col gap-4 items-center justify-center">
    <h2 className="text-xl font-bold">{`Error occured on the requested page`}</h2>
    <XCircle size={35} />
   <Reload />
  </div>
    )
}

export default ErrorComponent