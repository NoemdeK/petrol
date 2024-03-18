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
import { FileUp, XSquare } from "lucide-react";
import { PlainTransportDekApi } from "@/utils/axios";
import Loader from "@/components/ui/loader";
import { useRouter } from "next/navigation";
import { MultiSelect } from "primereact/multiselect";
import "primereact/resources/themes/tailwind-light/theme.css";
import uploadFileToDigitalOcean from "@/lib/uploadToiDigitalOcean";
import { FileUploader } from "@/components/FileUploader";
import { Plus } from "lucide-react";
import { Type } from "lucide-react";
import { FolderUp } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Trash } from "lucide-react";

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
    reportCategory: z.string(),
    tag: z.string(),
    headlinePicture: z.any(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onBlur",
    resolver: zodResolver(formSchema),
    defaultValues: {
      reportHeadline: "",
      reportCategory: "",
      tag: "",
      headlinePicture: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const { tag, reportCategory, ...data } = values;
    console.log(data);
    const formatedData = {
      ...data,
      tags: selectedTag,
      reportCategory: selectedCategoryies,
      reportBody,
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
  const [selectedCategoryies, setSlectedCategoryies] = useState(null);
  const categories = [
    { name: "Latest Report", value: "latest_reports" },
    { name: "Top Report", value: "top_reports" },
  ];
  const [selectedTag, setSlectedTag] = useState(null);
  const availableTags = [
    { name: "AGO", value: "AGO" },
    { name: "PMS", value: "PMS" },
    { name: "ICE", value: "ICE" },
    { name: "DPK", value: "DPK" },
    { name: "LPG", value: "LPG" },
  ];

  const onFileUplooadHandler = async (
    files: any,
    fieldName: any,
    index: number
  ) => {
    console.log(files);
    const fileName = await uploadFileToDigitalOcean(
      files[0],
      userData?.user.accessToken
    );
    setReportBody((prev) => {
      return prev.map((item, i) => {
        if (i === index) {
          return { ...item, attachment: fileName };
        }
        return item;
      });
    });
  };

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const handleDeleteForm = (index: number) => {
    setReportBody((prev) => prev.filter((_, i) => i !== index));
  };

  const [isAddingField, setIsAddingField] = useState(false);
  const [reportBody, setReportBody] = useState<any[]>([
    { paragraph: "", attachment: "" },
  ]);

  const addFieldHandler = () => {
    // setIsAddingField(!isAddingField);
    setReportBody((prev) => [...prev, { paragraph: "", attachment: "" }]);
  };

  const handleTextInputChange = (event: any, index: number) => {
    setReportBody((prev) => {
      return prev.map((item, i) => {
        if (i === index) {
          return { ...item, paragraph: event.target.value };
        }
        return item;
      });
    });
  };
  console.log(reportBody);

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
                  <div className="flex-1 flex-col gap-2">
                    <Label className="mb-4">
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
                    <div className="flex-1">
                      <img src={fileUrl} alt="" className="w-full" />
                    </div>
                  )}
                </div>
              )}
            </>
            <div className="flex flex-col gap-[4rem]">
              {reportBody.map((item, index) => (
                <div
                  key={index}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  {index !== 0 && hoveredIndex === index && (
                    <AnimatePresence>
                      <motion.div
                        initial={{ opacity: 0.5 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute -top-4 right-0 cursor-pointer w-[30px] h-[30px] flex justify-center items-center border rounded-full"
                        onClick={() => handleDeleteForm(index)}
                      >
                        <Trash size={18} color="#7E7E7E" />
                      </motion.div>
                    </AnimatePresence>
                  )}
                  <div className="mb-5">
                    <Label className="mb-2">Report Body {index + 1}</Label>
                    <Textarea
                      name="paragraph"
                      onChange={(e) => {
                        handleTextInputChange(e, index);
                      }}
                      className="resize-none h-[200px]"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex-1 flex-col gap-2">
                      <Label className="mb-2">Attachment {index + 1}</Label>
                      <FileUploader
                        name={`attachment${index + 1}`}
                        form={form}
                        acceptMultipleFiles={false}
                        handleDrop={(file: File) =>
                          onFileUplooadHandler(
                            file,
                            `attachment${index + 1}`,
                            index
                          )
                        }
                      />{" "}
                    </div>

                    <div className="">
                      {reportBody.map((item: any, i: number) => {
                        if (index === i && item.attachment !== "") {
                          return (
                            <div key={i}>
                              <img
                                src={item.attachment}
                                alt=""
                                className="w-[200px] h-[200px]"
                              />
                            </div>
                          );
                        }
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-8 mt-8">
              <div
                className="w-[30px] h-[30px] flex justify-center items-center border rounded-full cursor-pointer"
                onClick={addFieldHandler}
              >
                <Plus
                  color="#7E7E7E"
                  size={20}
                  className={
                    isAddingField
                      ? "transition rotate-45"
                      : "transition rotate-0"
                  }
                />
              </div>
              {/* <div className="flex items-center gap-2">
                {isAddingField && (
                  <AnimatePresence mode="wait">
                    <motion.div
                      initial={{ opacity: 0.5, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -15 }}
                      transition={{ duration: 0.3 }}
                      className="w-[30px] h-[30px] flex justify-center items-center border rounded-full cursor-pointer"
                    >
                      <Type color="#7E7E7E" size={15} />
                    </motion.div>
                  </AnimatePresence>
                )}
                {isAddingField && (
                  <AnimatePresence mode="wait">
                    <motion.div
                      initial={{ opacity: 0.6, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="w-[30px] h-[30px] flex justify-center items-center border rounded-full cursor-pointer"
                    >
                      <FolderUp color="#7E7E7E" size={15} />
                    </motion.div>
                  </AnimatePresence>
                )}
              </div> */}
            </div>
            {/* 
            <FormField
              control={form.control}
              name="paragraph2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Paragraph 2</FormLabel>
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
            <div className="flex items-center justify-between gap-3">
              <div className="flex-[0.5] flex-col gap-2">
                <Label className="mb-2">Attachment 2</Label>
                <FileUploader
                  name={"attachment2"}
                  form={form}
                  acceptMultipleFiles={false}
                  handleDrop={(file: File) =>
                    onFileUplooadHandler(file, "attachment2")
                  }
                />{" "}
              </div>
              {form.watch("attachment2") && (
                <div className="flex-[0.5]">
                  <img
                    src={form.getValues("attachment2")}
                    alt=""
                    className="w-[200px] h-[200px]"
                  />
                </div>
              )}
            </div>
            <FormField
              control={form.control}
              name="paragraph3"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Paragraph 3</FormLabel>
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
            <div className="flex items-center justify-between gap-3">
              <div className="flex-[0.5] flex-col gap-2">
                <Label className="mb-2">Attachment 3</Label>
                <FileUploader
                  name={"attachment3"}
                  form={form}
                  acceptMultipleFiles={false}
                  handleDrop={(file: File) =>
                    onFileUplooadHandler(file, "attachment3")
                  }
                />{" "}
              </div>
              {form.watch("attachment3") && (
                <div className="flex-[0.5]">
                  <img
                    src={form.getValues("attachment3")}
                    alt=""
                    className="w-[200px] h-[200px]"
                  />
                </div>
              )}
            </div>
            <FormField
              control={form.control}
              name="paragraph4"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Paragraph 4</FormLabel>
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
            /> */}
            {/* <div className="flex items-center justify-between gap-3">
              <div className="flex-[0.5] flex-col gap-2">
                <Label className="mb-2">Attachment 4</Label>
                <FileUploader
                  name={"attachment4"}
                  form={form}
                  acceptMultipleFiles={false}
                  handleDrop={(file: File) =>
                    onFileUplooadHandler(file, "attachment4")
                  }
                />{" "}
              </div>
              {form.watch("attachment4") && (
                <div className="flex-[0.5]">
                  <img
                    src={form.getValues("attachment4")}
                    alt=""
                    className="w-[200px] h-[200px]"
                  />
                </div>
              )}
            </div>{" "} */}
            {/* Multiselects */}
            <div className="flex items-start gap-6">
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="reportCategory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Report Category </FormLabel>
                      <FormControl>
                        <MultiSelect
                          value={selectedCategoryies}
                          onChange={(e) => {
                            setSlectedCategoryies(e.value);
                          }}
                          options={categories}
                          optionLabel="name"
                          placeholder="Select Categories"
                          maxSelectedLabels={3}
                          className="w-full border h-[40px]"
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
                  name="tag"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tag </FormLabel>
                      <FormControl>
                        <MultiSelect
                          value={selectedTag}
                          onChange={(e) => {
                            setSlectedTag(e.value);
                          }}
                          options={availableTags}
                          optionLabel="name"
                          placeholder="Select Tags"
                          maxSelectedLabels={3}
                          className="w-full border h-[40px] placeholder:text-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            {/* // Action buttons */}
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
