"use client";
import React, { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Textarea } from "@/components/ui/textarea";
import { TailSpin } from "react-loader-spinner";
import { UploadFileInput } from "@/components/UploadFile";

interface IAddReport {
  setShowAddReport: Dispatch<SetStateAction<boolean>>;
  showReports: boolean;
}

const AddReport: React.FC<IAddReport> = ({ setShowAddReport, showReports }) => {
  const formSchema = z.object({
    headline: z.string(),
    reportBody: z.string(),
    reportCategory: z.string(),
    tags: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onBlur",
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="">
      <div className="border border-[#E0E0E0] p-4 rounded-[0.2rem] flex gap-1 items-center flex-1">
        {" "}
        <h3 className="text-sm font-medium">Add New Report</h3>
      </div>
      <div className="mt-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="headline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Report Headline </FormLabel>
                  <FormControl>
                    <Input type="text" disabled={isLoading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center">
              <div className="flex-[0.6] flex-col gap-2">
                <Label className="mb-2">Attachment (Headline Picture)</Label>
                <UploadFileInput name={"file"} form={form} />
              </div>
            </div>
            <FormField
              control={form.control}
              name="reportBody"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Report Body </FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isLoading}
                      {...field}
                      className="h-[200px] resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center">
              <div className="flex-[0.6] flex-col gap-2">
                <Label className="mb-2">Attachment</Label>
                <UploadFileInput name={"file"} form={form} />
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="reportCategory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Report Category </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="E.g., Latest Report, e.t.c."
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tag </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="E.g., AGO, PMS, e.t.c."
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="w-full flex items-center justify-between">
              <p
                className="bg-accent border border-[#0000001f] rounded-[5px] px-[0.9rem] py-[0.4rem] font-normal cursor-pointer text-[0.85rem]"
                onClick={() => {
                  setShowAddReport(!showReports);
                }}
              >
                Cancel
              </p>
              <button
                className="bg-[#000] text-white border border-[#0000001f] rounded-[5px] px-[0.6rem] py-[0.4rem] font-normal cursor-pointer text-[0.85rem] flex justify-center items-center"
                type="submit"
                disabled={isLoading}
                onClick={form.handleSubmit(onSubmit)}
              >
                {false ? (
                  <TailSpin
                    visible={true}
                    height="20"
                    width="20"
                    color="#fff"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                ) : (
                  "Add New Report"
                )}
              </button>
            </div>{" "}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddReport;
