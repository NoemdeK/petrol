import Navbar from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";


const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {


  return ( 
    <div className="h-full relative m-4">
        <Navbar />
        <div className="flex gap-4 w-full"> 
            <div className="hidden md:flex h-full md:h-[90vh]  md:w-60 md:flex-col  md:fidxed md:inset-y-0 z-80">
                <Sidebar />
            </div>
            <main className=" pb-10 w-full">
                {children}
            </main>
      </div>

    </div>
   );
}
 
export default DashboardLayout;