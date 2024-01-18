"use client"

import React from 'react'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
import { UsersTable } from './UserTable'
import { Button } from '@/components/ui/button'
import useCreate from '@/lib/useCreate'
import useEditUser from '@/lib/useEdit'

interface ClientComponentProps{
    data: any[]
    field: any[]
}

const ClientComponent = ({data, field}: any ) => {
    const edit = useEditUser()
  return (
    <div>
        <div>
            <h4 className='text-xl font-bold'>Users</h4>
        </div>
        <div className=" w-full ">  
            <Tabs defaultValue={edit.tab} className="w-full">
              
                <div className="flex justify-between flex-col md:flex-row gap-4 w-full p-2">
                   <TabsList className="grid w-full max-w-[500px] grid-cols-3">
                    <TabsTrigger onClick={() => edit.setTab("rwx_data_entry_analyst")} value="rwx_data_entry_analyst">Analysts</TabsTrigger>
                    <TabsTrigger onClick={() => edit.setTab("rwx_data_entry_user")} value="rwx_data_entry_user">Field Agents</TabsTrigger>
                    <TabsTrigger onClick={() => edit.setTab("rwx_user")} value="rwx_user">Clients</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="rwx_data_entry_analyst">
                    <UsersTable data={data || []} />
                </TabsContent>
                <TabsContent value="rwx_data_entry_user">
                  <UsersTable data={field || []} />
                </TabsContent>
                <TabsContent value="rwx_user">
                  <UsersTable data={[]} />
                </TabsContent>
            </Tabs>
           
    </div>
    </div>
  )
}

export default ClientComponent