import React from 'react'
import ClientComponent from './ClientComponent'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/utils/auth'

async function getData(header: string) {

  try{
    const res = await fetch("https://petrodata.zainnovations.com/api/v1/data-entry/retrieve?batch=1&flag=pending", {
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

async function getDataApproved(header: string) {

  try{
    const res = await fetch("https://petrodata.zainnovations.com/api/v1/data-entry/retrieve?batch=1&flag=approved", {
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

async function getDataRejected(header: string) {

  try{
    const res = await fetch("https://petrodata.zainnovations.com/api/v1/data-entry/retrieve?batch=1&flag=rejected", {
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



const Page = async () => {
  const user = await getServerSession(authOptions);
  const data = await getData(`${user?.user.accessToken}`)
  const approved = await getDataApproved(`${user?.user.accessToken}`)
  const rejected = await getDataRejected(`${user?.user.accessToken}`)

 

  return (
    <div>
      <ClientComponent rejected={rejected?.data?.result} approved={approved?.data?.result} pending={data?.data?.result} />
    </div>
  )
}

export default Page