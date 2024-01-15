import React from 'react'
import ClientComponent from './ClientComponent'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/utils/auth'

async function getData(header: string, limit: string) {

  try{
    const res = await fetch(`https://petrodata.zainnovations.com/api/v1/data-entry/retrieve?batch=1&flag=pending&limit=${limit || '10'}`, {
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

async function getDataApproved(header: string, limit:string) {

  try{
    const res = await fetch(`https://petrodata.zainnovations.com/api/v1/data-entry/retrieve?batch=1&flag=approved&limit=${limit || '10'}`, {
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

async function getDataRejected(header: string, limit:string) {

  try{
    const res = await fetch(`https://petrodata.zainnovations.com/api/v1/data-entry/retrieve?batch=1&flag=rejected&limit=${limit || '10'}`, {
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
  const data = await getData(`${user?.user.accessToken}`, searchParams.rows)
  const approved = await getDataApproved(`${user?.user.accessToken}`, searchParams.rows)
  const rejected = await getDataRejected(`${user?.user.accessToken}`, searchParams.rows)

  console.log(rejected, "rejeced")

  return (
    <div>
      <ClientComponent rejected={rejected?.data?.result} approved={approved?.data?.result} pending={data?.data?.result} />
    </div>
  )
}

export default Page