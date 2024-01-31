"use client"

import React from 'react'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
import { Pending } from './Pending'
import { Approved } from './Approved'
import { Rejected } from './Rejected'
import Filter from '@/components/Filter'
import useTab from '@/lib/useTab'
import { usePathname } from 'next/navigation'
import { PendingUser } from './PendingUser'
import { ApprovedUser } from './ApprovedUser'
import { RejectedUser } from './RejectedUser'

interface ClientComponentProps{
    rejected: any[]
    approved: any[]
    pending: any[]
}

const ClientComponent = ({rejected, approved, pending}: ClientComponentProps ) => {
  const {tab, setTab} = useTab()
  const pathname = usePathname()


  return (
    <div>
        <div>
        <h4 className="text-lg md:text-xl font-medium my-4">
           Field Data
          </h4>
        </div>
        <div className=" w-full ">  
            <Tabs defaultValue={tab} className="w-full">
              
                <div className="flex flex-wrap justify-between flex-col md:flex-row gap-4 w-full p-2">
                   <TabsList className="grid w-full max-w-[400px] grid-cols-3">
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="approved">Approved</TabsTrigger>
                    <TabsTrigger value="rejected">Rejected</TabsTrigger>
                  </TabsList>
                  <Filter />
                </div>

                <TabsContent value="pending">
                  {
                    pathname === "/admin" ?
                    <Pending  data={pending} />
                    :
                    <PendingUser  data={pending} />
                  }
                </TabsContent>
                <TabsContent value="approved">
                {
                    pathname === "/admin" ?
                    <Approved data={approved} />
                    :
                    <ApprovedUser data={approved} />
                  }
                </TabsContent>
                <TabsContent value="rejected">
                {
                    pathname === "/admin" ?
                    <Rejected data={rejected} />
                    :
                    <RejectedUser data={rejected} />
                  }
                </TabsContent>
            </Tabs>
    </div>
    </div>
  )
}

export default ClientComponent