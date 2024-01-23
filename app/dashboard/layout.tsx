import HeaderStat from "@/components/HeaderStat";
import Navbar from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { ThemeProvider } from "../providers/theme-provider";
import { authOptions } from "@/utils/auth";
import { getServerSession } from "next-auth";
import Client from "@/components/Client";

import type { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Petrodata',
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


const DashboardLayout =  async ({
  children,
}: {
  children: React.ReactNode
}) => {
  const data = await getData()
  const user = await getServerSession(authOptions);
  const me = await getMe(`${user?.user.accessToken}`)

  const result = data?.data


  return ( 
    <ThemeProvider
    attribute="class"
    defaultTheme="light"
    enableSystem
    disableTransitionOnChange
  >

      <div className='h-full relative m-4'>
        <Navbar data={me?.data} />
        <div className="flex gap-4 w-full"> 
            <div className="hidden md:flex h-full md:h-[90vh]  md:w-60 md:flex-col  md:fidxed md:inset-y-0 z-80">
                <Sidebar session={me?.data?.role}  />
            </div>
            <main className=" pb-10 w-full h-[90vh] overflow-hidden overflow-y-scroll">
              <HeaderStat data={result} />
                {children}
            </main>
      </div>

    </div>
    </ThemeProvider>

   );
}
 
export default DashboardLayout;