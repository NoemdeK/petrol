import React from 'react'
import ClientComponent from './ClientComponent'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/utils/auth'

async function getData(header: string, limit: string, date: string, endDate: string) {

  try{
    const res = await fetch(`https://petrodata.zainnovations.com/api/v1/data-entry/retrieve?batch=1&flag=pending${date || ''}${endDate || ''}&limit=${limit || '10'}`, {
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

async function getDataApproved(header: string, limit:string, date: string, endDate: string) {

  try{
    const res = await fetch(`https://petrodata.zainnovations.com/api/v1/data-entry/retrieve?batch=1&flag=approved${date || ''}${endDate || ''}&limit=${limit || '10'}`, {
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

async function getDataRejected(header: string, limit:string, date: string, endDate: string) {

  try{
    const res = await fetch(`https://petrodata.zainnovations.com/api/v1/data-entry/retrieve?batch=1&flag=rejected${date || ''}${endDate || ''}&limit=${limit || '10'}`, {
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
  const approved = await getDataApproved(`${user?.user.accessToken}`, searchParams.rows, `&${searchParams.date}`, `&${searchParams.endDate}`)
  const rejected = await getDataRejected(`${user?.user.accessToken}`, searchParams.rows, `&${searchParams.date}`, `&${searchParams.endDate}`)


  return (
    <div>
      <ClientComponent rejected={rejected?.data?.result || []} approved={approved?.data?.result || []} pending={data?.data?.result || []} />
    </div>
  )
}

export default Page