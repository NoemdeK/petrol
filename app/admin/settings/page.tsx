
import React from 'react'
import ClientComponent from './ClientComponent'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/utils/auth'


async function getMe(header: string) {
  try{
    const res = await fetch(process.env.BACKEND_URL+'api/v1/auth/me', {
      headers: {
        "Authorization": `Bearer ${header}`
      }
    })
    return res.json()

  } catch(error: any){
    console.log(error)
  }
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

 
}

const Page = async () => {
  const user = await getServerSession(authOptions);
  const me = await getMe(`${user?.user.accessToken}`)

  console.log(me);

  return (
    <ClientComponent data={me.data} /> 
  )
}

export default Page