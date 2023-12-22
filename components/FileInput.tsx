import Dropzone from "react-dropzone";
import { Controller } from "react-hook-form";

import {  FileUp } from "lucide-react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";



export const FileInput = ({ form, name, data }: any) => {
  return (
    <Controller
      control={form.control}
      name={name}
      defaultValue={[]}
      render={({ field }) => (
        <>
          <Dropzone onDrop={field.onChange}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()} className="flex gap-4 items-center rounded-md cursor-pointer">
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
                {
                    !field.value && (
                    <img src={data.avatar} alt="Uploaded File" className="w-32 h-32 aspect-square object-contain" />
                    )
                }
                </div>
               <div>
               <input {...getInputProps()}  name={name} onBlur={field.onBlur} />
                <Label>
                    Change avatar
                </Label>
                <Button>
                    Upload
                </Button>
               </div>
              </div>
            )}
          </Dropzone>
          
        </>
      )}
    />

  );
};


