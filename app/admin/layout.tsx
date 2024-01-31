import HeaderStat from "@/components/HeaderStat";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "../providers/theme-provider";
import { authOptions } from "@/utils/auth";
import { getServerSession } from "next-auth";


import type { Metadata } from 'next';
import { DocumentView } from "@/components/DocumentView";

import CreateUser from "./users/CreateUser";
import EditUser from "./users/EditUser";
import EditUserTwo from "../data-entry/settings/EditUser";
import { Sidebar } from "@/components/Sidebar";
import TabData from "./TabData";


export const metadata: Metadata = {
  title: 'Admin',
  description: 'Solving the data',
}


async function getData() {
  try{
    const res = await fetch(process.env.BACKEND_URL+'api/v1/petro-data/analysis/price-percentage-change')
    return res.json()

  } catch(error: any){
    console.log(error)
  }
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

 
}

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


async function getNotification(header: string) {
  try{
    const res = await fetch(process.env.BACKEND_URL+'api/v1/notification/retrieve', {
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




const DashboardLayout =  async ({
  children,
}: {
  children: React.ReactNode
}) => {
  const data = await getData()
  const user = await getServerSession(authOptions);
  const me = await getMe(`${user?.user.accessToken}`)
  const notify = await getNotification(`${user?.user.accessToken}`)


  return ( 
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >

<div className="h-full relative mx-2 my-4 md:m-4">
            <Navbar data={me?.data} length={notify.data.result.length} notification={notify.data.result} />
            <div className="flex gap-4 w-full"> 
                <div className="hidden md:flex h-full md:h-[85vh]  md:w-60 md:flex-col  md:fidxed md:inset-y-0 z-80">
                <Sidebar session={me?.data?.role}  />
                </div>
                <main className="pt-10 md:pt-4 w-full h-[90vh] overflow-hidden overflow-y-scroll">
                  {/* <HeaderStat data={result} /> */}
                  <TabData />

                    {children}
                    <CreateUser />
                    <EditUser />
                    <EditUserTwo />
                    
                </main>
          </div>

        </div>
        </ThemeProvider>

   );
}
 
export default DashboardLayout;