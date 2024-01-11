import React from 'react'
import ClientComponent from './ClientComponent'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/auth';


async function getDataAnalysts(header: string) {

    try{
      const res = await fetch("https://petrodata.zainnovations.com/api/v1/user/retrieve?flag=analysts&batch=1", {
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

  async function getDatafield(header: string) {

    try{
      const res = await fetch("https://petrodata.zainnovations.com/api/v1/user/retrieve?flag=analysts&batch=1", {
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
  const analyst = await getDataAnalysts(`${user?.user.accessToken}`)
  const field = await getDatafield(`${user?.user.accessToken}`)

  console.log(field.data.result, "name")

  return (
    <div>
        <ClientComponent data={analyst?.data?.result} field={field?.data?.result} />
    </div>
  )
}

export default Page