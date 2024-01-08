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

interface ClientComponentProps{
    rejected: any[]
    approved: any[]
    pending: any[]
}

const ClientComponent = ({rejected, approved, pending}: ClientComponentProps ) => {
  
  return (
    <div>
        <div>
            <h4 className='text-xl font-bold'>Data</h4>
        </div>
        <div className="bg-white w-full ">  
            <Tabs defaultValue="pending" className="w-full">
              
                <div className="flex justify-between flex-col md:flex-row gap-4 w-full p-2">
                   <TabsList className="grid w-full max-w-[400px] grid-cols-3">
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="approved">Approved</TabsTrigger>
                    <TabsTrigger value="rejected">Rejected</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="pending">
                    <Pending  data={pending} />
                </TabsContent>
                <TabsContent value="approved">
                    <Approved data={approved} />
                </TabsContent>
                <TabsContent value="rejected">
                    <Rejected data={rejected} />
                </TabsContent>
            </Tabs>
    </div>
    </div>
  )
}

export default ClientComponent