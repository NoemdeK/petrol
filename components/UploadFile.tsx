"use client";
import Dropzone from "react-dropzone";
import { Controller } from "react-hook-form";
import { useEffect, useState, SetStateAction } from "react";
import { FileUp, Archive, Loader } from "lucide-react";
import React from "react";
import Document from "./Document";

export const UploadFileInput = ({ form, name, acceptMultipleFiles }: any) => {
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
          const updatedFiles = [...uploadedFiles, ...files];
          form.setValue(name, updatedFiles);
        };

        return (
          <>
            <Dropzone
              // onDrop={(files) => field.onChange([...uploadedFiles, ...files])}
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

            <ul className="flex gap-2 flex-wrap mt-4">
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
          </>
        );
      }}
    />
  );
};
