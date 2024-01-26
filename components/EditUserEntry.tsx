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
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { PlainTransportDekApi, MultiTransportDekApi } from "@/utils/axios"
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
import useEditUserTwo from "@/lib/useEdit2"
import { FileInput } from "@/components/FileInputTwo"
import useEditEntry from "@/lib/useEditEntry"
import { UploadFileInput } from "./UploadFile"
import { Label } from "./ui/label"
import useDocumentView from "@/lib/useDocumentView"
  

const productsSchema = z.object({
    PMS: z.string().optional(),
    DPK: z.string().optional(),
    LPG: z.string().optional(),
    AGO: z.string().optional(),
  });
  
  export const formSchema = z.object({
      fillingStation: z.string().optional(),
      state: z.string().optional(),
      products: productsSchema,
      priceDate: z.string().optional(),
      supportingDocument: z.string().optional(),
      avatar: z.string().optional(),
    })
  
  
  
  
    const statesInNigeria = [
      'Abia',
      'Adamawa',
      'Akwa Ibom',
      'Anambra',
      'Bauchi',
      'Bayelsa',
      'Benue',
      'Borno',
      'Cross River',
      'Delta',
      'Ebonyi',
      'Edo',
      'Ekiti',
      'Enugu',
      'Gombe',
      'Imo',
      'Jigawa',
      'Kaduna',
      'Kano',
      'Katsina',
      'Kebbi',
      'Kogi',
      'Kwara',
      'Lagos',
      'Nasarawa',
      'Niger',
      'Ogun',
      'Ondo',
      'Osun',
      'Oyo',
      'Plateau',
      'Rivers',
      'Sokoto',
      'Taraba',
      'Yobe',
      'Zamfara',
      'Federal Capital Territory (FCT)'
    ];
    
    const fulling = [
      "NNPC",
      "IOCs (Total, ExxonMobil, etc)",
      "Private Owned  Filling Station"
    ]
const EditEntryUser = () => {

    const { isOpen, onClose, data: item } = useEditEntry()
    const loading = useLoading()
    const router = useRouter()
    const {data} = useSession()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),  
        defaultValues: {
  
        }
      })


      const isLoading = form.formState.isSubmitting;
  
      const onCancel = () => {
        onClose()
        form.reset()
      }

      const initialDate2 = new Date(item?.dateSubmitted).toISOString().split('T')[0];

      async function onSubmit(values: z.infer<typeof formSchema>) {
        loading.onOpen();
      
        // Filter out empty or falsy values
        let nonEmptyValues: Record<string, any> = {};
        Object.keys(values).forEach((key) => {
            //@ts-ignore
          if (values[key] !== null && values[key] !== undefined && values[key] !== "") {
            //@ts-ignore
            nonEmptyValues[key] = values[key];
          }
        });

        console.log(nonEmptyValues);
      
        // Now, update data entry with the non-empty values (including the file URL, if uploaded)
        try {
          await PlainTransportDekApi.patch(
            `data-entry/update?dataEntryId=${item.entryId}`,
            nonEmptyValues,
            {
              headers: {
                Authorization: `Bearer ${data?.user.accessToken}`,
              },
            }
          );
      
          form.reset();
          toast({
            description: "Successfully updated user profile settings",
          });
          router.refresh();
          onCancel();
        } catch (updateError) {
          console.error("Error updating data entry:", updateError);
          toast({
            variant: "destructive",
            description: `${"Update failed"}`,
          });
        } finally {
          loading.onClose();
        }
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

        <form onSubmit={form.handleSubmit(onSubmit)}  className="space-y-2">
        <div>
        <FormField
            control={form.control}
            name="fillingStation"
            render={({ field }) => (
            <FormItem>
                <FormLabel>Filling Station</FormLabel>
                <Select onValueChange={field.onChange}  defaultValue={field.value || item.fillingStation}>
                <FormControl>
                    <SelectTrigger>
                    <SelectValue placeholder="Select a Filling station">
                    {field.value || item.fillingStation}
                    </SelectValue>
                    </SelectTrigger>
                </FormControl>
                <SelectContent>
                {fulling.map((item: any, i: number) => (
                    <SelectItem key={i} value={item}>
                        {item}
                    </SelectItem>
                    ))}
                </SelectContent>
                </Select>
            </FormItem>
            )}
        />
        <div className="grid grid-cols-1 gap-4">
 


            <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
                <FormItem>
                <FormLabel>State</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value || `${item.state ?? ""}`}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a state" >{field.value || item.state}</SelectValue>
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent className="h-80">
                    {statesInNigeria.map((item: any, i: number) => (
                        <SelectItem key={i} value={item}>
                        {item}
                        </SelectItem>
                    ))}
                    </SelectContent>
                </Select>
                </FormItem>
            )}
            /> 
            </div>

            <div className="border border-1 p-4">
            <div className="grid grid-cols-2 gap-4">
                <p className=" text-sm font-medium">Product(s)</p>
                <p className=" ml-auto text-sm">₦</p>
            </div>
                <FormField
                control={form.control}
                name="products.AGO"
                render={({ field }) => (
                    <FormItem className="flex gap-4 items-center">
                    <FormLabel className="w-1/2 text-xs">Automotive Gas Oil</FormLabel>
                    <FormControl>
                        <Input  disabled={isLoading} {...field}  type="number" placeholder="0.00" 
                            defaultValue={item.products.AGO}
                            className="ml-auto w-32" />
                    </FormControl>
                    {/* <FormDescription>This is your public display name.</FormDescription> */}
                    <FormMessage />
                    </FormItem>
                )}
                />

                <FormField
                control={form.control}
                name="products.DPK"
                render={({ field }) => (
                    <FormItem className="flex gap-4 items-center">
                    <FormLabel className="w-1/2 text-xs">Dual Purpose Kerosene </FormLabel>
                    <FormControl>
                        <Input  disabled={isLoading} {...field}  type="number" placeholder="0.00" 
                             defaultValue={item.products.DPK}
                            className="ml-auto w-32" />
                    </FormControl>
                    {/* <FormDescription>This is your public display name.</FormDescription> */}
                    <FormMessage />
                    </FormItem>
                )}
                />

                
                <FormField
                control={form.control}
                name="products.LPG"
                render={({ field }) => (
                    <FormItem className="flex gap-4 items-center">
                    <FormLabel className="w-1/2 text-xs">Liquefied Petroluem Gas </FormLabel>
                    <FormControl>
                        <Input  disabled={isLoading} {...field}  type="number" placeholder="0.00"
                             defaultValue={item.products.LPG}
                            className="ml-auto w-32" />
                    </FormControl>
                    {/* <FormDescription>This is your public display name.</FormDescription> */}
                    <FormMessage />
                    </FormItem>
                )}
                />


                <FormField
                control={form.control}
                name="products.PMS"
                render={({ field }) => (
                    <FormItem className="flex gap-4 items-center">
                    <FormLabel className="w-1/2 text-xs">Premium Motor Spirit  </FormLabel>
                    <FormControl>
                        <Input  disabled={isLoading} {...field}  type="number" placeholder="0.00" 
                             defaultValue={item.products.PMS}
                            className="ml-auto w-32" />
                    </FormControl>
                    {/* <FormDescription>This is your public display name.</FormDescription> */}
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>




        <div className="grid gap-4">
            
            <FormField
            control={form.control}
            name="priceDate"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Price Date</FormLabel>
                <FormControl>
                    <Input type="date" defaultValue={initialDate2} disabled={isLoading} {...field} />
                </FormControl>
                {/* <FormDescription>This is your public display name.</FormDescription> */}
                <FormMessage />
                </FormItem>
            )}
            />
        </div>

        {/* <div>
            <Label className="pb-2">
            Supporting Document
            </Label>
            <UploadFileInput name={"file"} form={form} />
            <View entry={item} />


        </div> */}

        <div className='w-full flex gap-6 mt-12 justify-end items-baseline'>

            <Button type="submit" disabled={isLoading} className="flex-1" >Edit Entry</Button>
        </div>
        </div>
        </form>

        </Form>

   </SheetContent>
 </Sheet>
  )
}

const View = ({entry}: any) => {
    const { onOpen, setData} = useDocumentView()
  
    const onclickSet = () => {
      setData(entry.supportingDocument)
      onOpen()
    }
    return (
      <div className="capitalize text-xs">
          <Button variant={"link" } type="button" onClick={onclickSet} className="text-sky-600"> 
          View
          </Button>
      </div>
      )
  }
  
export default EditEntryUser