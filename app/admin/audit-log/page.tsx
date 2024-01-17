import { authOptions } from '@/utils/auth'
import { getServerSession } from 'next-auth'
import React from 'react'
import Client from './Client'

async function getData(header: string, limit:string, date: string, endDate: string) {

  try{
    const res = await fetch(`https://petrodata.zainnovations.com/api/v1/audit-log/retrieve?batch=1${date || ''}${endDate || ''}&limit=${limit || '10'}`, {
      headers: {
        "Authorization": `Bearer ${header}`
      }
    })
    return res.json()

  } catch(error: any){
    console.log(error)
    return []

  }
}
const Page = async ({searchParams}: any) => {
  const user = await getServerSession(authOptions);
  const data = await getData(`${user?.user.accessToken}`, searchParams.rows, `&${searchParams.date}`, `&${searchParams.endDate}`)

  return (
    <div>
      <Client data={data.data.result} />
    </div>
  )
}

export default Page