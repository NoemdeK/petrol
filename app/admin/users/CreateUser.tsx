"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"


import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

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
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
  

const formSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(), // Assuming you will store the file path as a string
    role: z.string(),
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
    }
  ]

const CreateUser = () => {

    const { isOpen, onClose } = useCreate()
    const loading = useLoading()
    const router = useRouter()
    const {data} = useSession()

    const [generate, setGenerate] = useState(false)
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
 
        loading.onOpen()

        await PlainTransportDekApi.post(
            'user/create', 
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
              description: "New User Created",
              })
            router.refresh()
            onClose()
          })
          .catch((error) => {
            console.error("Error:", error);
            toast({
              variant: "destructive",
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
        <SheetTitle>Create New User</SheetTitle>
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
                        <Input placeholder=""  {...field} />
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
                        <Input placeholder="Last name"  {...field} />
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
                        <Input placeholder="email@gmail.com" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
        </div>
        <div className="grid gap-1 my-2">

        <div className="">

          <div className="items-top flex space-x-2">
            <Checkbox id="terms1" 
                onCheckedChange={() => setGenerate(!generate)}
            /> 
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="terms1"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Generate Password
              </label>

            </div>
          </div>

              {  
                !generate && (
                  <FormField
                      name="password"
                      control={form.control}
                      render={({ field }) => (
                    <FormItem  className="flex flex-col gap-1 mt-4">
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
                )
              }
          </div>


        </div>

        <div>
        <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select onValueChange={field.onChange}  defaultValue={field.value}>
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
         <SheetFooter>
        
        <div className="w-full flex justify-between mb-10">
            <SheetClose asChild>
              <Button type="button" variant="ghost" onClick={onCancel}>Close</Button>
            </SheetClose>
              <Button  type="submit">Create</Button>
        </div>
      </SheetFooter>
        </form>
      </Form>
    
    </SheetContent>
  </Sheet>
   )
}

export default CreateUser