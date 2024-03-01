"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
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
import Link from "next/link";
import { EditUploadFile } from "@/components/EditUploadFile";
import { useSession } from "next-auth/react";
import { toast } from "@/components/ui/use-toast";
import { UploadReportHeader } from "@/components/UploadReportHeader";
import { XSquare } from "lucide-react";
import { PlainTransportDekApi } from "@/utils/axios";
import Loader from "@/components/ui/loader";
import { useRouter } from "next/navigation";
// interface IAddReport {
//   setShowAddReport: Dispatch<SetStateAction<boolean>>;
//   showReports: boolean;
// }

const AddReport = () => {
  const { data: userData } = useSession();
  const [fileUrl, setFileUrl] = useState<string>("");
  const [reportCategory, setReportCategory] = useState<Array<string>>([]);
  const [tags, setTags] = useState<Array<string>>([]);
  const [loading, setLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const router = useRouter();

  const formSchema = z.object({
    reportHeadline: z.string(),
    reportBody: z.string(),
    category: z.string(),
    tag: z.string(),
    headlinePicture: z.any(),
    attachments: z.any(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onBlur",
    resolver: zodResolver(formSchema),
    defaultValues: {
      reportHeadline: "",
      reportBody: "",
      category: "",
      tag: "",
      headlinePicture: "",
      attachments: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const { tag, category, ...data } = values;
    console.log(data);
    const formatedData = {
      ...data,
      tags,
      reportCategory,
    };
    console.log(formatedData);

    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/v1/research-report/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userData?.user.accessToken}`,
          },
          body: JSON.stringify(formatedData),
        }
      );
      const responseData = await response.json();
      if (response.status !== 201) {
        toast({
          title: "Error",
          description: responseData.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Report added successfully",
        });
        router.push("/dashboard/reports/report");
      }
      setLoading(false);
      console.log(responseData);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast({
        title: "Error",
        description: "Something went wrong, please try again!",
        variant: "destructive",
      });
    }
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
              name="reportHeadline"
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
            <>
              {uploadLoading ? (
                <div className="flex items-center justify-center h-[300px]">
                  <Loader />
                </div>
              ) : (
                <div className="flex items-center justify-between gap-3">
                  <div className="flex-[1] flex-col gap-2">
                    <Label className="mb-2">
                      Attachment (Headline Picture)
                    </Label>
                    <UploadReportHeader
                      name={"headlinePicture"}
                      form={form}
                      acceptMultipleFiles={false}
                      setFileUrl={setFileUrl}
                      setUploadLoading={setUploadLoading}
                    />
                  </div>
                  {fileUrl && (
                    <div>
                      <img
                        src={fileUrl}
                        alt=""
                        className="w-[200px] h-[200px]"
                      />
                    </div>
                  )}
                </div>
              )}
            </>
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
              <div className="flex-[1] flex-col gap-2">
                <Label className="mb-2">Attachment</Label>
                <UploadReportHeader
                  name={"attachments"}
                  form={form}
                  acceptMultipleFiles={false}
                />{" "}
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Report Category </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="E.g., Latest Report, e.t.c."
                          disabled={isLoading}
                          {...field}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              const value = form.getValues("category");
                              setReportCategory((prev) => [...prev, value]);
                              form.setValue("category", "");
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {reportCategory.length > 0 && (
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {reportCategory.map((item, index) => (
                      <div
                        key={index}
                        className="flex gap-1 items-center bg-[#E0E0E0] rounded-[5px] px-[0.3rem] py-[0.4rem] font-normal cursor-pointer text-[0.85rem] w-max"
                      >
                        <XSquare
                          onClick={() => {
                            setReportCategory((prev) =>
                              prev.filter((_, i) => i !== index)
                            );
                          }}
                        />

                        {item}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="tag"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tag </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="E.g., AGO, PMS, e.t.c."
                          disabled={isLoading}
                          {...field}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              const value = form.getValues("tag");
                              setTags((prev) => [...prev, value]);
                              form.setValue("tag", "");
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {tags.length > 0 && (
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {tags.map((item, index) => (
                      <div
                        key={index}
                        className="flex gap-1 items-center bg-[#E0E0E0] rounded-[5px] px-[0.3rem] py-[0.4rem] font-normal cursor-pointer text-[0.85rem] w-max"
                      >
                        <XSquare
                          onClick={() => {
                            setTags((prev) =>
                              prev.filter((_, i) => i !== index)
                            );
                          }}
                        />

                        {item}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="w-full flex items-center justify-between">
              <Link
                href={"/dashboard/reports/report"}
                className="bg-accent border border-[#0000001f] rounded-[5px] px-[0.9rem] py-[0.4rem] font-normal cursor-pointer text-[0.85rem]"
              >
                Cancel
              </Link>
              <button
                className="bg-[#000] text-white border border-[#0000001f] rounded-[5px] px-[0.6rem] py-[0.4rem] font-normal cursor-pointer text-[0.85rem] flex justify-center items-center"
                type="submit"
                disabled={isLoading}
                onClick={form.handleSubmit(onSubmit)}
              >
                {isLoading ? (
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
