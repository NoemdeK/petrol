"use client"

import { Button } from "@/components/ui/button"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import useTab from "@/lib/useTab"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Suspense } from "react"

export function NotifyDrop({length,notification}: {length: number, notification: any}) {
  const router = useRouter()
  const {tab, setTab} = useTab()
  const {data:session} = useSession()


    const handleFetch = async  (id: string, title:string) => {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${session?.user.accessToken}`);
      try {
        const response = await fetch(
          `https://petrodata.zainnovations.com/api/v1/notification/view?notificationId=${id}`,
          {
            method: 'GET',
            redirect: 'follow',
            headers: myHeaders,
          }
        );
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const result = await response.text();
        console.log(result);
        router.push("/admin")
        router.refresh()
        if(title === 'Data Uploaded'){
          setTab("pending")
          console.log("eze")
        } else if(title === "Upload Approved") {
          setTab("approved")
          console.log("ezea")
        } else if(title === "Upload Rejected"){
          setTab("rejected")
        } else {
          setTab("pending")
        }
      } catch (error: any) {
        console.error('Error:', error.message);
      }
      
    }

  

  return (
    <Popover >
      <PopoverTrigger asChild>
        <Button variant="outline" className=""> <span className="bg-[#D38320] px-3 mr-1 text-white">{length}</span>Notifications</Button>
      </PopoverTrigger>      
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <Suspense fallback={<p>Notifications Cleared</p>}>
            {
              notification?.map((item: any, i:number) => {
                return (
                  <div
                    key={i}
                    className="mb-4 grid grid-cols-[20px_1fr] items-start pb-4 last:mb-0 last:pb-0 cursor-pointer
                    border-b last:border-none hover:scale-95 transition-all"
                    onClick={() => handleFetch(item.notificationId, item.title)}
                >
                  <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {item.title}
                    </p>
                    <div className="flex gap-1 flex-wrap text-xs text-[#0A98A9]">
                          <p>{item.fillingStation || "Unknown"} |</p>
                          <p>{item.city} |</p>
                          <p>{item.priceDate}</p>
                        </div>
                  </div>
                </div>

                )
              })
            }
            
          </Suspense>
        </div>
      </PopoverContent>
    </Popover>
  )
}
