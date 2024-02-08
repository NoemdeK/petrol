"use client";
import Dropzone from "react-dropzone";
import { Controller } from "react-hook-form";
import { useEffect, useState, SetStateAction } from "react";
import { FileUp } from "lucide-react";
import React from "react";
import useEditFieldData from "@/lib/useEditFieldData";

export const EditUploadFile = ({
  form,
  name,
  onUpload,
  existingFiles,
}: any) => {
  const { updateSupportDocs } = useEditFieldData();
  const [uploadedData, setUploadedData] = useState<Array<any>>([]);

  const imageee = form.watch("file") || [];

  useEffect(() => {
    const changedUploadedData = uploadedData.map((d) => URL.createObjectURL(d));

    updateSupportDocs(uploadedData);
  }, [uploadedData]);

  return (
    <Controller
      control={form.control}
      name={name}
      defaultValue={[]}
      render={({ field }) => {
        return (
          <>
            <Dropzone
              onDrop={(acceptedFiles) => {
                if (onUpload) {
                  onUpload(acceptedFiles);
                }
                console.log(acceptedFiles);
                // Append new files to the existing uploadedData array
                setUploadedData((prevUploadedData) => [
                  ...prevUploadedData,
                  ...acceptedFiles,
                ]);
                // Call the onChange function provided by react-hook-form
                field.onChange([...field.value, ...acceptedFiles]);
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <div
                  {...getRootProps()}
                  className=" p-4 py-6 text-center rounded-md h-20 cursor-pointer border-2 border-dashed border-primary"
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <div className="animate-bounce">
                      <FileUp />
                    </div>
                  </div>
                  <input
                    {...getInputProps()}
                    multiple
                    name={name}
                    onBlur={field.onBlur}
                  />
                  <p className="text-xs">
                    Drag & drop files here, or click to select files
                  </p>
                </div>
              )}
            </Dropzone>
            <ul className="flex gap-1 flex-wrap">
              {field.value &&
                uploadedData &&
                uploadedData.map((f: any, index: any) => {
                  console.log(f);
                  return (
                    <li key={index} className="text-xs cursor-pointer relative">
                      <img
                        src={URL.createObjectURL(f)}
                        alt="Uploaded File"
                        className="w-16 aspect-square object-contain"
                      />
                    </li>
                  );
                })}
            </ul>
          </>
        );
      }}
    />
  );
};
