import React from 'react'
import {Client} from './Client'

const Page = ({params}: any) => {
    console.log(params)
  return (
    <div className='auth bghero'>
        <div className='h-full flex justify-center items-center'>
                <Client id={params.id} />
        </div>
    </div>
  )
}

export default Page