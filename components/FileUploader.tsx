"use client";
import Dropzone from "react-dropzone";
import { Controller } from "react-hook-form";
import { FileUp } from "lucide-react";
import React from "react";

export const FileUploader = ({
  form,
  name,
  acceptMultipleFiles,
  handleDrop,
}: any) => {
  return (
    <Controller
      control={form.control}
      name={name}
      defaultValue={{}}
      render={({ field }) => {
        return (
          <>
            <Dropzone onDrop={handleDrop}>
              {({ getRootProps, getInputProps }) => (
                <div
                  {...getRootProps()}
                  className=" p-4 py-6 text-center rounded-md h-20 cursor-pointer border border-[#E0E0E0]"
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <div className="animate-bounce">
                      <FileUp />
                    </div>
                  </div>
                  <input
                    {...getInputProps()}
                    multiple={acceptMultipleFiles}
                    name={name}
                    onBlur={field.onBlur}
                  />
                  <p className="text-xs">
                    Drag & drop files here, or click to select files
                  </p>
                </div>
              )}
            </Dropzone>
          </>
        );
      }}
    />
  );
};
