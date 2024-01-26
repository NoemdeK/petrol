import Dropzone from "react-dropzone";
import { Controller } from "react-hook-form";

import {  FileUp } from "lucide-react";



export const UploadFileInput = ({ form, name }: any) => {

  return (
    <Controller
      control={form.control}
      name={name}
      defaultValue={[]}
      render={({ field }) => (
        <>
          <Dropzone onDrop={field.onChange}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()} className=" p-4 py-6 text-center rounded-md h-20 cursor-pointer border-2 border-dashed border-primary">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                  <div  className="animate-bounce">
                    <FileUp />
                  </div>
                </div>
                <input {...getInputProps()} multiple name={name} onBlur={field.onBlur} />
                <p className="text-xs">Drag & drop files here, or click to select files</p>
              </div>
            )}
          </Dropzone>
          <ul className="flex gap-1 flex-wrap">
            {field.value && field.value.map((f: any, index: any) => (
              <li key={index} className="text-xs">
                <img src={URL.createObjectURL(f)} alt="Uploaded File" className="w-16 aspect-square object-contain" />

              </li>
            ))}
          </ul>
        </>
      )}
    />

  );
};


