import Dropzone from "react-dropzone";
import { Controller } from "react-hook-form";

import {  FileUp } from "lucide-react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { AspectRatio } from "./ui/aspect-ratio";
import useEditUserTwo from "@/lib/useEdit2";


export const FileInput = ({ form, name, data }: any) => {
  const edit = useEditUserTwo()
  const imageee = form.watch("file") || []
  return (
    <Controller
      control={form.control}
      name={name}
      defaultValue={[]}
      render={({ field }) => (
        <>
          <Dropzone onDrop={field.onChange}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()} className="flex gap-4 items-center justify-center rounded-md cursor-pointer w-full mx-auto">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }} className="rounded-full">
                  {/* <div  className="">
                  <img src={data.avatar} alt="Uploaded File" className="w-16 aspect-square object-contain" />
                  </div> */}
                  {field.value && 
                    field.value.map((f: any, index: any) => (
                    <div key={index} className="w-32 h-32 aspect-square object-contain">
                        <img src={URL.createObjectURL(f)} alt="Uploaded File" className="w-full aspect-square object-contain" />
                    </div>
                    ))
                }

                </div>
               <div>
               <input {...getInputProps()}  name={name} onBlur={field.onBlur} />
               <div className='w-32 md:w-40'>
              {imageee.length === 0 && (
                <>
                    <AspectRatio ratio={1 / 1} className="bg-muted">
                    <img
                      src={edit.data.data?.avatar}
                      alt="Profile"
                      // fill
                      className="rounded-md "
                    />
                  </AspectRatio> 
                  <Label>Change Profile Picture</Label>
                  </>
               )}

                </div>
               </div>
              </div>
            )}
          </Dropzone>
          
        </>
      )}
    />

  );
};


