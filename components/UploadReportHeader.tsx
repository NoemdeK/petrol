"use client";
import Dropzone from "react-dropzone";
import { Controller } from "react-hook-form";
import { useEffect, useState, SetStateAction } from "react";
import { FileUp, Archive } from "lucide-react";
import React from "react";
import { useSession } from "next-auth/react";
import { toast } from "./ui/use-toast";
import UploadedDocument from "./UploadedHeaderDocument";

export const UploadReportHeader = ({
  form,
  name,
  acceptMultipleFiles,
  setFileUrl,
  setUploadLoading,
}: any) => {
  const { data: userData } = useSession();

  async function uploadFileToDigitalOcean(file: File): Promise<string | any> {
    // Create FormData object to append the file
    const formData = new FormData();
    formData.append("file", file);
    setUploadLoading(true);

    try {
      // Make a POST request to upload the file
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/v1/upload/files`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${userData?.user.accessToken}`,
          },
          body: formData,
        }
      );

      // Parse the response to get the uploaded image URL
      const data = await response.json();
      const imageURL = data?.data?.url; // Adjust this according to your response structure
      setUploadLoading(false);
      return imageURL;
    } catch (error) {
      setUploadLoading(false);
      console.error("Error uploading file to DigitalOcean:", error);
      toast({
        title: "Error",
        description: "Error uploading files",
        variant: "destructive",
      });
    }
  }

  return (
    <Controller
      control={form.control}
      name={name}
      defaultValue={{}}
      render={({ field }) => {
        const onDelete = () => {
          form.setValue(name, {});
        };

        // const handleDrop = async (file: File) => {
        //   console.log(file);
        //   const fileUrl = await uploadFileToDigitalOcean(file);
        //   console.log(fileUrl);
        //   form.setValue(name, fileUrl);
        // };
        let fileUrl;

        const handleDrop = async (files: File[]) => {
          const fileName = await uploadFileToDigitalOcean(files[0]);
          form.setValue(name, fileName);
          setFileUrl(fileName);
        };

        return (
          <>
            <Dropzone
              // onDrop={(file) => field.onChange(file)}
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
