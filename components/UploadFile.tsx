"use client";
import Dropzone from "react-dropzone";
import { Controller } from "react-hook-form";
import { useEffect, useState, SetStateAction } from "react";
import { FileUp } from "lucide-react";
import React from "react";

export const UploadFileInput = ({ form, name, onUpload }: any) => {
  return (
    <Controller
      control={form.control}
      name={name}
      defaultValue={[]}
      render={({ field }) => {
        const uploadedFiles = field.value || [];

        return (
          <>
            <Dropzone
              onDrop={(files) => field.onChange([...uploadedFiles, ...files])}
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
                uploadedFiles &&
                uploadedFiles.map((f: any, index: any) => {
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
