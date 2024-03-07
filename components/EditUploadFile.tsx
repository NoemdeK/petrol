"use client";
import Dropzone from "react-dropzone";
import { Controller } from "react-hook-form";
import { useEffect, useState, SetStateAction } from "react";
import { FileUp } from "lucide-react";
import React from "react";
import useEditFieldData from "@/lib/useEditFieldData";
import is from "date-fns/esm/locale/is/index.js";
import Loader from "./ui/loader";
import Document from "./Document";
import { on } from "events";

export const EditUploadFile = ({
  form,
  name,
  onUpload,
  existingFiles,
  acceptMultipleFiles,
  isUploading,
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
        let uploadedFiles = field.value || [];

        const onDelete = (index: number, file: any) => {
          uploadedFiles = uploadedFiles.filter(
            (_: any, i: number) => i !== index
          );
          form.setValue(name, uploadedFiles);
        };

        const handleDrop = (files: File[]) => {
          if (onUpload) {
            onUpload(files);
          }
          const updatedFiles = [...uploadedFiles, ...files];
          form.setValue(name, updatedFiles);
        };
        return (
          <>
            <Dropzone
              // onDrop={(acceptedFiles) => {
              //   if (onUpload) {
              //     onUpload(acceptedFiles);
              //   }
              //   console.log(acceptedFiles);
              //   // Append new files to the existing uploadedData array
              //   setUploadedData((prevUploadedData) => [
              //     ...prevUploadedData,
              //     ...acceptedFiles,
              //   ]);
              //   // Call the onChange function provided by react-hook-form
              // }}
              onDrop={handleDrop}
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
                    multiple={acceptMultipleFiles ? acceptMultipleFiles : true}
                    name={name}
                    onBlur={field.onBlur}
                  />
                  <p className="text-xs">
                    Drag & drop files here, or click to select files
                  </p>
                </div>
              )}
            </Dropzone>
            {isUploading ? (
              <div className="mt-3 h-[60px] flex justify-center items-center">
                <Loader />
              </div>
            ) : (
              <ul className="flex gap-1 flex-wrap mt-2">
                {field.value &&
                  uploadedFiles &&
                  uploadedFiles.map((f: any, index: any) => {
                    return (
                      <Document
                        key={index}
                        index={index}
                        data={f}
                        onDelete={() => onDelete(index, f)}
                      />
                    );
                  })}
              </ul>
            )}
          </>
        );
      }}
    />
  );
};
