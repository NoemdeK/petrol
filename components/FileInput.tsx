import Dropzone from "react-dropzone";
import { Controller } from "react-hook-form";




export const FileInput = ({ form, name, data }: any) => {
  const imageee = form.watch("file") || []

  console.log(data, "data")
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
                   
                    imageee.length === 0 && (
                      <img src={data?.avatar} alt="" className="w-24 rounded-full border aspect-square" />
                    )                    
                }
                </div>
               <div>
               <input {...getInputProps()}  name={name} onBlur={field.onBlur} />
               </div>
              </div>
            )}
          </Dropzone>
          
        </>
      )}
    />

  );
};


