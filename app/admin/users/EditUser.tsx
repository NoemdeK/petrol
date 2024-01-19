"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"


import { Button } from "@/components/ui/button"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"


import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  
  

import { useForm } from "react-hook-form"
import useCreate from "@/lib/useCreate"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { PlainTransportDekApi } from "@/utils/axios"
import useLoading from "@/lib/useLoading"
import { useSession } from "next-auth/react"
import { Input } from "@/components/ui/input"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import useEditUser from "@/lib/useEdit"
  

const formSchema = z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().optional(), // Assuming you will store the file path as a string
    role: z.string().optional(),
    password: z.string().optional(),
  });

  
  const fulling = [
    {
        name: "Analyst",
        role: "rwx_data_entry_analyst"
    },
    {
        name: "Field Agent",
        role: "rwx_data_entry_user"
    },
    {
      name: "Client",
      role: "rwx_user"
    }
  ]

const EditUser = () => {

    const { isOpen, onClose, data: item } = useEditUser()
    const loading = useLoading()
    const router = useRouter()
    const {data} = useSession()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),  
        defaultValues: {
  
        }
      })

  
      const onCancel = () => {
        onClose()
        form.reset()
      }

      async function onSubmit(values: z.infer<typeof formSchema>) {
 console.log(values)
        loading.onOpen()

        await PlainTransportDekApi.patch(
            `user/update?id=${item.data._id}`, 
            values,
          {
            headers: {
                Authorization: `Bearer ${data?.user.accessToken}`
            }
          }
        )
          .then(() => {
            form.reset()
            toast({
              title: "New User Edited",
              description: "Done",
              })
            router.refresh()
            onCancel()
          })
          .catch((error) => {
            console.error("Error:", error);
            toast({
              variant: "destructive",
              title: "Edit User Error",
              description: `${error.response.data.message}`,
              })
          })
          .finally(() => {
            loading.onClose()
          })        
        }

  return (
   <Sheet  onOpenChange={onClose} open={isOpen}  defaultOpen={isOpen}>
   <SheetContent>
     <SheetHeader>
       <SheetTitle>Edit User</SheetTitle>
       <SheetDescription>
       </SheetDescription>
     </SheetHeader>
     <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex justify-between flex-col h-full">
          <div className="">    
          <div className="grid gap-2">
        <div className="grid gap-1">
            <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                        <Input placeholder="" defaultValue={item.data.firstName}  {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
        </div>
        <div className="grid gap-1">
            <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                        <Input placeholder="Last name" defaultValue={item?.data?.lastName}  {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
        </div>
        <div className="grid gap-1">
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input placeholder="email@gmail.com" type="email" defaultValue={item.data.email} {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
        </div>
        <div className="grid gap-1">
        <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
            <FormItem  className="flex flex-col gap-1">
                <FormLabel>Password </FormLabel>
                <FormControl>
                    <div className="relative">
                    <Input  {...field} />
                   
                    </div>
                </FormControl>
            <FormMessage />
            </FormItem>
          )}
      />
        </div>

        <div>
        <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select onValueChange={field.onChange}  defaultValue={item.data.role || field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                  {fulling.map((item: any, i: number) => (
                      <SelectItem key={i} value={item.role}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>
      </div>
         </div>
         <SheetFooter className="flex items-end justify-end">
        
        <div className="w-full flex justify-between mb-10">
            <SheetClose asChild>
              <Button type="submit" variant="ghost" onClick={onCancel}>Close</Button>
            </SheetClose>
              <Button  type="submit">Save</Button>
        </div>
        </SheetFooter>
        </form>
      </Form>
   
   </SheetContent>
 </Sheet>
  )
}

export default EditUser