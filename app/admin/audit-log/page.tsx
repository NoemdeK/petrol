import { authOptions } from '@/utils/auth'
import { getServerSession } from 'next-auth'
import React from 'react'
import Client from './Client'

async function getData(header: string, limit:string, date?: string, endDate?: string, datePeriod?: string, userId?:string) {
console.log(`https://petrodata.zainnovations.com/api/v1/audit-log/retrieve?batch=1${datePeriod || ""}${date || ''}${endDate || ''}${userId || ""}&limit=${limit || '10'}`)
  try{
    const res = await fetch(`https://petrodata.zainnovations.com/api/v1/audit-log/retrieve?batch=1${datePeriod || ""}${date || ''}${endDate || ''}${userId || ""}&limit=${limit || '10'}`, {
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

async function getDataUser(header: string) {
    try{
      const res = await fetch(`https://petrodata.zainnovations.com/api/v1/audit-log/retrieve/audit-log-users`, {
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
  const data = await getData(`${user?.user.accessToken}`, searchParams.rows, searchParams.date && `&filterStartDate=${searchParams.date}`,
  searchParams.endDate && `&filterEndDate=${searchParams.endDate}`,searchParams.datePeriod && `&datePeriod=${searchParams.datePeriod}`,
    searchParams.user && `&userId=${searchParams.user}`
  )

  const userx = await getDataUser(`${user?.user.accessToken}`)
  console.log(data.data.result, "autiot")
  return (
    <div>
      <Client data={data?.data?.result || []} selectData={userx.data} />
    </div>
  )
}

export default Page