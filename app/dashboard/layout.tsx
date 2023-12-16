import HeaderStat from "@/components/HeaderStat";
import Navbar from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";


async function getData() {
  const res = await fetch(process.env.BACKEND_URL+'api/v1/petro-data/analysis/price-percentage-change')
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

const DashboardLayout =  async ({
  children,
}: {
  children: React.ReactNode
}) => {
  const data = await getData()

  const result = data.data
  console.log(result)


  return ( 
    <div className="h-full relative m-4">
        <Navbar />
        <div className="flex gap-4 w-full"> 
            <div className="hidden md:flex h-full md:h-[90vh]  md:w-60 md:flex-col  md:fidxed md:inset-y-0 z-80">
                <Sidebar />
            </div>
            <main className=" pb-10 w-full">
              <HeaderStat data={result} />
                {children}
            </main>
      </div>

    </div>
   );
}
 
export default DashboardLayout;