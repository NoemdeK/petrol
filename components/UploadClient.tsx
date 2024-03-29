"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { toast } from "@/components/ui/use-toast";

import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MultiTransportDekApi, PlainTransportDekApi } from "@/utils/axios";
import { useSession } from "next-auth/react";
import { UploadFileInput } from "./UploadFile";
import { data as dataproduct } from "./SelectProductNew";
import { useRouter } from "next/navigation";
import useLoading from "@/lib/useLoading";
import { useState } from "react";

const productsSchema = z.object({
  PMS: z.string().optional(),
  DPK: z.string().optional(),
  LPG: z.string().optional(),
  AGO: z.string().optional(),
});

export const formSchema = z.object({
  fillingStation: z.string(),
  state: z.string(),
  city: z.string(),
  products: productsSchema,
  priceDate: z.string(),
  supportingDocument: z.array(z.string()).optional(),
  file: z.any(),
});

const statesInNigeria = [
  "Abia",
  "Abuja",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];

const fulling = [
  "NNPC",
  "IOCs (Total, ExxonMobil, etc)",
  "Private Owned  Filling Station",
];

export function UploadClient({ setBatchData, batchData }: any) {
  const { data: userData } = useSession();
  const router = useRouter();
  const loading = useLoading();

  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onBlur",
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });
  const onCancel = () => {
    form.reset();
  };

  const isLoading = form.formState.isSubmitting;

  async function uploadFileToDigitalOcean(file: File): Promise<string> {
    // Create FormData object to append the file
    const formData = new FormData();
    formData.append("file", file);

    try {
      // Make a POST request to upload the file
      const response = await fetch(
        "https://petrodata.zainnovations.com/api/v1/upload/files",
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

      // Return the uploaded image URL
      return imageURL;
    } catch (error) {
      // Handle any errors that occur during the file upload
      console.error("Error uploading file to DigitalOcean:", error);
      toast({
        title: "Error",
        description: "Error uploading files",
      });
      throw new Error("Failed to upload file to DigitalOcean");
    }
  }

  async function uploadFilesToDigitalOcean(files: File[]): Promise<string[]> {
    const uploadedImageURLs: string[] = [];

    for (const file of files) {
      try {
        // Upload file to DigitalOcean and obtain image URL
        const imageURL = await uploadFileToDigitalOcean(file);
        uploadedImageURLs.push(imageURL);
      } catch (error) {
        // Handle individual file upload errors
        console.error(`Error uploading file ${file.name}:`, error);
      }
    }

    return uploadedImageURLs;
  }
  const onAddToBatch = async () => {
    // Validate the current form data before adding to the batch
    await form.handleSubmit(async (values) => {
      try {
        // await form.validateForm(values);

        const uploadedImageURLs = await uploadFilesToDigitalOcean(values.file);

        setBatchData((prevBatchData: any) => [
          ...prevBatchData,
          { ...values, supportingDocument: uploadedImageURLs },
        ]);

        router.refresh();

        form.reset(); // Reset the form after adding to batch
        form.setValue("fillingStation", "");
        form.setValue("state", "");
        form.setValue("city", "");
        form.setValue("state", "");
        form.setValue("products.AGO", "");
        form.setValue("products.DPK", "");
        form.setValue("products.PMS", "");
        form.setValue("products.LPG", "");
        form.setValue("priceDate", "");
        form.setValue("file", null);
        // Reset other fields as needed

        // Clear errors
        form.clearErrors();
      } catch (error) {
        console.error("Validation Error:", error);
      }
    })();
  };
  // 2. Define a submit handler.
  async function onSubmit(values: any) {
    loading.onOpen();
    const uploadedImageURLs = await uploadFilesToDigitalOcean(values.file);

    values.supportingDocument = uploadedImageURLs;

    const payload = {
      dataEntry: [values],
    };

    console.log(payload);

    await PlainTransportDekApi.post(
      "data-entry/upload",
      JSON.stringify(payload),
      {
        headers: {
          Authorization: `Bearer ${userData?.user.accessToken}`,
        },
      }
    )
      .then(() => {
        form.reset();
        toast({
          title: "New Data Entry Added",
          description: "Done",
        });
        router.refresh();
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
        toast({
          variant: "destructive",
          title: "Entry Error",
          description: `${error.response.data.message}`,
        });
      })
      .finally(() => {
        loading.onClose();
      });
  }

  return (
    <div className="grid gap-4  max-w-xl my-4 p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <div>
            <Label className="text-lg md:text-xl mt-8">Upload Data</Label>
            <p className="text-sm">
              Fill in the form below to upload and submit your data.
            </p>
          </div>

          <FormField
            control={form.control}
            name="fillingStation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Filling Station</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Filling station">
                        {field.value || "Select a Filling station"}
                      </SelectValue>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {fulling.map((item: any, i: number) => (
                      <SelectItem key={i} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} {...field} />
                  </FormControl>
                  {/* <FormDescription>This is your public display name.</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a state">
                          {field.value || "Select a state"}
                        </SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="h-80">
                      {statesInNigeria.map((item: any, i: number) => (
                        <SelectItem key={i} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>

          <div className="border border-1 p-4">
            <div className="grid grid-cols-2 gap-4">
              <p className=" text-sm font-medium">Product(s)</p>
              <p className=" ml-auto text-sm">₦</p>
            </div>
            <FormField
              control={form.control}
              name="products.AGO"
              render={({ field }) => (
                <FormItem className="flex gap-4 items-center">
                  <FormLabel className="w-1/2 text-xs">
                    Automotive Gas Oil
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      {...field}
                      type="number"
                      placeholder="0.00"
                      className="ml-auto w-32"
                    />
                  </FormControl>
                  {/* <FormDescription>This is your public display name.</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="products.DPK"
              render={({ field }) => (
                <FormItem className="flex gap-4 items-center">
                  <FormLabel className="w-1/2 text-xs">
                    Dual Purpose Kerosene{" "}
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      {...field}
                      type="number"
                      placeholder="0.00"
                      className="ml-auto w-32"
                    />
                  </FormControl>
                  {/* <FormDescription>This is your public display name.</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="products.LPG"
              render={({ field }) => (
                <FormItem className="flex gap-4 items-center">
                  <FormLabel className="w-1/2 text-xs">
                    Liquefied Petroluem Gas{" "}
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      {...field}
                      type="number"
                      placeholder="0.00"
                      className="ml-auto w-32"
                    />
                  </FormControl>
                  {/* <FormDescription>This is your public display name.</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="products.PMS"
              render={({ field }) => (
                <FormItem className="flex gap-4 items-center">
                  <FormLabel className="w-1/2 text-xs">
                    Premium Motor Spirit{" "}
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      {...field}
                      type="number"
                      placeholder="0.00"
                      className="ml-auto w-32"
                    />
                  </FormControl>
                  {/* <FormDescription>This is your public display name.</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="priceDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price Date</FormLabel>
                  <FormControl>
                    <Input type="date" disabled={isLoading} {...field} />
                  </FormControl>
                  {/* <FormDescription>This is your public display name.</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <Label className="pb-2">Supporting Document</Label>
            <UploadFileInput name={"file"} form={form} />
          </div>

          <div className="w-full flex gap-6 mt-2">
            <Button
              type="button"
              onClick={onAddToBatch}
              variant={"outline"}
              disabled={isLoading}
              className="border-2"
            >
              Add to Batch
            </Button>
            {batchData.length === 0 && (
              <Button type="submit" disabled={isLoading} className="flex-1">
                Submit
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
