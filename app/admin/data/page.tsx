import React from 'react'
import { authOptions } from '@/utils/auth'
import { getServerSession } from 'next-auth'
import { History } from '@/app/analyst/history/History'


async function getData(header: string, limit: string, date: string, endDate: string) {

    try{
      const res = await fetch(`https://petrodata.zainnovations.com/api/v1/data-entry/retrieve/ice?batch=1${date || ''}${endDate || ''}&limit=${limit || '10'}`, {
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
        <History data={data.data.result} />
    </div>
  )
}

export default Page