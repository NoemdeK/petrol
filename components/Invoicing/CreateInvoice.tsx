"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import close from "@/assets/icons/close.svg";
import { TailSpin } from "react-loader-spinner";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { EditUploadFile } from "../EditUploadFile";
import useCreateInvoice from "@/lib/useCreateInvoice";
import { toast } from "../ui/use-toast";
import { useSession } from "next-auth/react";
import { set } from "date-fns";
import Loader from "../ui/loader";
import { UploadFileInput } from "../UploadFile";
import { PlainTransportDekApi } from "@/utils/axios";
import { format } from "date-fns";
import { VercelLogoIcon } from "@radix-ui/react-icons";

const CreateInvoice = () => {
  const {
    isOpen,
    onClose,
    data: clientData,
    isEditing,
    setIsEditing,
  } = useCreateInvoice();
  const [clientDataState, setClientDataState] = useState(clientData);
  console.log(clientDataState);
  const [priceState, setPriceState] = React.useState<any>({
    rate: 0,
    quantity: 0,
    percentageDiscount: 0,
    monetaryDiscount: 0,
  });
  const [totalAmount, setTotalAmount] = React.useState<number>(0);
  const [discountTouched, setDiscountTouched] = useState("");
  const [attachment, setAttachment] = useState<string>("");
  const [attachmentUploading, setAttachmentUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const { data: userData } = useSession();

  const formSchema = z.object({
    client: z.string(),
    clientEmail: z.string(),
    invoiceDate: z.string(),
    dueDate: z.string(),
    premiumPlanPackage: z.string(),
    rate: z.string(),
    quantity: z.string(),
    percentageDiscount: z.string(),
    monetaryDiscount: z.string(),
    // totalAmount: z.number(),
    // attachment: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onBlur",
    resolver: zodResolver(formSchema),
    defaultValues: {
      client: "",
      clientEmail: "",
      invoiceDate: "",
      dueDate: "",
      premiumPlanPackage: "",
      rate: "",
      quantity: "",
      percentageDiscount: "",
      monetaryDiscount: "",
      //   totalAmount: 0,
      //   attachment: "",
    },
  });

  useEffect(() => {
    setClientDataState(clientData);
  });
  useEffect(() => {
    form.setValue(
      "client",
      clientDataState.firstName
        ? `${clientDataState?.firstName} ${clientDataState?.lastName}`
        : clientDataState.client
        ? clientDataState.client
        : ""
    );
    form.setValue(
      "clientEmail",
      clientDataState.email
        ? clientDataState?.email || ""
        : clientDataState.clientEmail
        ? clientDataState.clientEmail
        : ""
    );
    form.setValue(
      "invoiceDate",
      clientDataState.invoiceDate
        ? format(new Date(clientDataState.invoiceDate), "yyyy-MM-dd")
        : ""
    );
    form.setValue(
      "dueDate",
      clientDataState.invoiceDate
        ? format(new Date(clientDataState.dueDate), "yyyy-MM-dd")
        : ""
    );
    form.setValue(
      "premiumPlanPackage",
      clientDataState.premiumPlanPackage === "starter"
        ? "Starter Package (Individual)"
        : clientDataState.premiumPlanPackage === "enterprise"
        ? "Enterprise (Company)"
        : ""
    );
    form.setValue("rate", clientDataState.rate ? clientDataState.rate : "");
    form.setValue(
      "quantity",
      clientDataState.quantity ? clientDataState.quantity : ""
    );
    form.setValue(
      "percentageDiscount",
      clientDataState.percentageDiscount
        ? clientDataState.percentageDiscount
        : ""
    );
    form.setValue(
      "monetaryDiscount",
      clientDataState.monetaryDiscount ? clientDataState.monetaryDiscount : ""
    );
    if (clientDataState.totalAmount) {
      setTotalAmount(clientDataState.totalAmount);
    }
  }, [clientDataState]);

  const premiumPlans = [
    {
      name: "Starter Package (Individual)",
      short: "starter",
      value: 50000,
    },
    {
      name: "Enterprise (Company)",
      short: "enterprise",
      value: 150000,
    },
  ];

  async function createAndSaveInvoice(values: any) {
    let tempData = { ...values };
    if (tempData.premiumPlanPackage === "Starter Package (Individual)") {
      tempData.premiumPlanPackage = "starter";
    } else if (tempData.premiumPlanPackage === "Enterprise (Company)") {
      tempData.premiumPlanPackage = "enterprise";
    } else {
      tempData.premiumPlanPackage = "";
    }
    setIsSaving(true);
    const data = {
      ...tempData,
      attachment: attachment,
      totalAmount: totalAmount,
      rate: tempData.rate * 1,
      quantity: tempData.quantity * 1,
      percentageDiscount: tempData.percentageDiscount * 1,
      monetaryDiscount: tempData.monetaryDiscount * 1,
    };
    console.log(data);

    await PlainTransportDekApi.post(
      "premium-plan/invoice/create",
      JSON.stringify(data),
      {
        headers: {
          Authorization: `Bearer ${userData?.user.accessToken}`,
        },
      }
    )
      .then(() => {
        form.reset();
        toast({
          title: "New Invoice Created",
          description: "Done",
        });
        window.location.reload();
      })
      .catch((error) => {
        console.log("Error", error);
        toast({
          variant: "destructive",
          title: "Error",
          description:
            `${error.response.data.message}` || "Something went wrong",
        });
      })
      .finally(() => {
        setIsSaving(false);
      });
  }

  async function updateAndSaveInvoice(values: any) {
    let tempData = { ...values };
    if (tempData.premiumPlanPackage === "Starter Package (Individual)") {
      tempData.premiumPlanPackage = "starter";
    } else if (tempData.premiumPlanPackage === "Enterprise (Company)") {
      tempData.premiumPlanPackage = "enterprise";
    } else {
      tempData.premiumPlanPackage = "";
    }

    // console.log(tempData);
    // setIsSaving(true);
    const data = {
      ...tempData,
      attachment: clientDataState.attachment,
      totalAmount: totalAmount,
      rate: tempData.rate * 1,
      quantity: tempData.quantity * 1,
      percentageDiscount: tempData.percentageDiscount * 1,
      monetaryDiscount: tempData.monetaryDiscount * 1,
    };
    console.log(data);

    setIsSaving(true);

    await PlainTransportDekApi.patch(
      `premium-plan/invoice/update?invoiceId=${clientDataState.invoiceId}`,
      JSON.stringify(data),
      {
        headers: {
          Authorization: `Bearer ${userData?.user.accessToken}`,
        },
      }
    )
      .then(() => {
        form.reset();
        toast({
          title: "Invoice Updated Successfully",
          description: "Done",
        });
        window.location.reload();
      })
      .catch((error) => {
        console.log("Error", error);
        toast({
          variant: "destructive",
          title: "Error",
          description:
            `${error.response.data.message}` || "Something went wrong",
        });
      })
      .finally(() => {
        setIsSaving(false);
      });
  }

  async function onSubmit(values: any) {
    let tempData = { ...values };
    if (tempData.premiumPlanPackage === "Starter Package (Individual)") {
      tempData.premiumPlanPackage = "starter";
    } else if (tempData.premiumPlanPackage === "Enterprise (Company)") {
      tempData.premiumPlanPackage = "enterprise";
    } else {
      tempData.premiumPlanPackage = "";
    }
    const data = {
      ...tempData,
      attachment: attachment ? attachment : clientDataState.attachment,
      totalAmount: totalAmount,
      rate: tempData.rate * 1,
      quantity: tempData.quantity * 1,
      percentageDiscount: tempData.percentageDiscount * 1,
      monetaryDiscount: tempData.monetaryDiscount * 1,
    };
    console.log(data);
    setIsSending(true);
    await PlainTransportDekApi.patch(
      `premium-plan/invoice/send?invoiceId=${clientDataState.invoiceId}`,
      JSON.stringify(data),
      {
        headers: {
          Authorization: `Bearer ${userData?.user.accessToken}`,
        },
      }
    )
      .then(() => {
        form.reset();
        toast({
          title: "Invoice Semt Successfully",
          description: "Done",
        });
        onClose();
        window.location.reload();
      })
      .catch((error) => {
        console.log("Error", error);
        toast({
          variant: "destructive",
          title: "Error",
          description:
            `${error.response.data.message}` || "Something went wrong",
        });
      })
      .finally(() => {
        setIsSending(false);
      });
  }

  async function uploadFileToDigitalOcean(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);

    try {
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

      const data = await response.json();
      const imageURL = data?.data?.url;
      return imageURL;
    } catch (error) {
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
        const imageURL = await uploadFileToDigitalOcean(file);
        uploadedImageURLs.push(imageURL);
      } catch (error) {
        console.error(`Error uploading file ${file.name}:`, error);
      }
    }

    return uploadedImageURLs;
  }

  const handleFileUpload = async (newDocument: any) => {
    setAttachmentUploading(true);
    const urls = await uploadFilesToDigitalOcean(newDocument);
    setAttachment(urls[0]);
    setAttachmentUploading(false);
  };

  useEffect(() => {
    if (discountTouched === "monetary" || discountTouched === "") {
      setTotalAmount(
        priceState.rate * priceState.quantity - priceState.monetaryDiscount
      );
    } else if (discountTouched === "percentage") {
      setTotalAmount(
        priceState.rate * priceState.quantity -
          (priceState.rate *
            priceState.quantity *
            priceState.percentageDiscount) /
            100
      );
    }
  }, [priceState, priceState.percentageDiscount]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="bg-[#262626a3] fixed top-0 left-0 right-0 bottom-0 z-50 backdrop-blur-[3.1px] shadow-[0_4px_30px_#00000019] flex justify-end">
          <motion.div
            initial={{ opacity: 1, x: 420 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 1, x: 420 }}
            transition={{ duration: 0.3 }}
            className="bg-accent w-screen  md:w-[500px] md:min-w-[500px] md:rounded-l-[0.7rem] overflow-x-hidden max-h-screen overflow-y-scroll"
          >
            <div className="bg-accent p-[1rem] flex justify-between items-center border-b-[#0000001f] border h-[60px]">
              <p className="text-sm font-medium text-[0.8rem]">
                {isEditing ? "Edit Invoice" : "Create Invoice"}
              </p>
              <span
                onClick={() => {
                  onClose();
                  form.reset();
                  setTotalAmount(0);
                  setIsEditing(false);
                }}
              >
                <Image
                  src={close}
                  width={27}
                  height={27}
                  alt="close_button"
                  className="cursor-pointer"
                />
              </span>
            </div>
            <div className="p-[1rem] min-h-[calc(100vh-120px)] max-h-[calc(100vh-120px)] overflow-y-scroll">
              <Form {...form}>
                <form>
                  <div className="flex items-center gap-2">
                    <FormField
                      control={form.control}
                      name="client"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Client</FormLabel>
                          <FormControl>
                            <Input
                              disabled={false}
                              {...field}
                              type="text"
                              className="ml-auto"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="clientEmail"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Client Email</FormLabel>
                          <FormControl>
                            <Input
                              disabled={false}
                              {...field}
                              type="email"
                              className="ml-auto"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex items-center mt-4 gap-2">
                    <FormField
                      control={form.control}
                      name="invoiceDate"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Invoice Date</FormLabel>
                          <FormControl>
                            <Input
                              disabled={false}
                              {...field}
                              type="date"
                              className="ml-auto w-full"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="dueDate"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Due Date</FormLabel>
                          <FormControl>
                            <Input
                              disabled={false}
                              {...field}
                              type="date"
                              className="ml-auto w-full"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="premiumPlanPackage"
                    render={({ field }) => (
                      <FormItem className="mt-4">
                        <FormLabel>Premium Plan</FormLabel>
                        <Select
                          onValueChange={(selectedPlan) => {
                            field.onChange(selectedPlan);
                            const selectedPlanObject = premiumPlans.find(
                              (plan) => plan.name === selectedPlan
                            );
                            if (selectedPlanObject) {
                              form.setValue(
                                "rate",
                                selectedPlanObject.value.toString()
                              );
                              form.setValue("quantity", "0");
                              form.setValue("monetaryDiscount", "0");
                              form.setValue("percentageDiscount", "0");
                              setTotalAmount(selectedPlanObject.value * 1);
                            }
                          }}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select plan">
                                {field.value}
                              </SelectValue>
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {premiumPlans.map((item: any, i: number) => (
                              <SelectItem key={i} value={item.name}>
                                {item.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  <div className="mt-6 border rounded-md border-[#999999] bg-[#dcdcdc] p-[1rem]">
                    <div className="flex justify-between gap-2">
                      <FormField
                        control={form.control}
                        name="rate"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel className="text-sm text-accent">
                              Rate
                            </FormLabel>
                            <FormControl>
                              <div className="border border-[#00000066] flex items-center bg-accent px-2 rounded">
                                <p className="text-sm">$</p>
                                <Input
                                  {...field}
                                  disabled={true}
                                  type="number"
                                  className="w-full border-none text-sm focus-visible:ring-0 focus-visible:ring-offset-0 bg-accent disabled:bg-accent"
                                  onChange={(value: any) => {
                                    field.onChange(value);
                                    const rate = value.target.value;
                                    setPriceState({ ...priceState, rate });
                                  }}
                                />
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="quantity"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel className="text-accent">
                              QTY (year)
                            </FormLabel>
                            <FormControl>
                              <div className="border border-[#00000066] flex items-center bg-accent px-2 rounded">
                                <p className="text-sm">$</p>
                                <Input
                                  disabled={false}
                                  {...field}
                                  type="number"
                                  className="w-full border-none text-sm focus-visible:ring-0 focus-visible:ring-offset-0 bg-accent"
                                  onChange={(value: any) => {
                                    field.onChange(value);

                                    const quantity = value.target.value * 1;
                                    const log = form.getValues();
                                    form.setValue("monetaryDiscount", "0");
                                    form.setValue("percentageDiscount", "0");
                                    let amt = quantity * Number(log.rate);
                                    setTotalAmount(amt);
                                    setPriceState({
                                      ...priceState,
                                      quantity,
                                      rate: log.rate,
                                    });
                                  }}
                                />
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="percentageDiscount"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel className="text-accent">
                              Discount (%)
                            </FormLabel>
                            <FormControl>
                              <div className="border border-[#00000066] flex items-center bg-accent px-2 rounded">
                                <p className="text-sm">%</p>
                                <Input
                                  disabled={false}
                                  {...field}
                                  type="number"
                                  className="w-full border-none text-sm focus-visible:ring-0 focus-visible:ring-offset-0 bg-accent"
                                  onChange={(value: any) => {
                                    setDiscountTouched("percentage");
                                    field.onChange(value);
                                    const discount = value.target.value * 1;
                                    const discPerc =
                                      (discount / 100) *
                                      form.getValues<any>("rate");
                                    form.setValue(
                                      "monetaryDiscount",
                                      discPerc.toString()
                                    );
                                    setPriceState({
                                      ...priceState,
                                      percentageDiscount: discount,
                                    });
                                  }}
                                />
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="monetaryDiscount"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel className="text-accent">
                              Discount ($)
                            </FormLabel>
                            <FormControl>
                              <div className="border border-[#00000066] flex items-center bg-accent px-2 rounded">
                                <p className="text-sm">$</p>
                                <Input
                                  disabled={false}
                                  {...field}
                                  type="number"
                                  className="w-full border-none text-sm focus-visible:ring-0 focus-visible:ring-offset-0 bg-accent"
                                  onChange={(value: any) => {
                                    setDiscountTouched("monetary");
                                    field.onChange(value);
                                    console.log(form.getValues());
                                    const discount = value.target.value * 1;
                                    const discMonetary =
                                      (discount / form.getValues<any>("rate")) *
                                      100;

                                    form.setValue(
                                      "percentageDiscount",
                                      discMonetary.toString()
                                    );
                                    setPriceState({
                                      ...priceState,
                                      monetaryDiscount: discount,
                                    });
                                  }}
                                />
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex justify-end mt-4">
                      <h3 className="text-xl font-medium text-accent">
                        Amount: ${totalAmount.toLocaleString()}
                      </h3>
                    </div>
                  </div>
                  <div className="mt-6 flex-col gap-2">
                    <Label className="pb-2">Attachment</Label>
                    <EditUploadFile
                      name="attachment"
                      form={form}
                      onUpload={handleFileUpload}
                      acceptMultipleFiles={false}
                      isUploading={attachmentUploading}
                    />
                  </div>
                </form>
              </Form>
            </div>
            <div className="w-full flex items-center gap-6 p-[1rem]">
              <p
                className="bg-accent border border-[#0000001f] rounded-[5px] px-[0.9rem] py-[0.4rem] font-normal cursor-pointer text-[0.85rem]"
                onClick={() => {
                  onClose();
                  setTotalAmount(0);
                  setIsEditing(false);
                }}
              >
                Cancel
              </p>
              {clientDataState.invoiceCreated || (
                <button
                  className="bg-[#000] text-white border border-[#0000001f] rounded-[5px] w-full px-[0.6rem] py-[0.4rem] font-normal cursor-pointer text-[0.85rem] flex justify-center items-center"
                  disabled={isSaving || attachmentUploading}
                  onClick={() => {
                    createAndSaveInvoice(form.getValues());
                  }}
                >
                  {isSaving ? (
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
                    "Save"
                  )}
                </button>
              )}
              {clientDataState.invoiceCreated && (
                <button
                  className="bg-[#000] text-white border border-[#0000001f] rounded-[5px] w-full px-[0.6rem] py-[0.4rem] font-normal cursor-pointer text-[0.85rem] flex justify-center items-center"
                  disabled={isSaving || attachmentUploading}
                  onClick={() => {
                    updateAndSaveInvoice(form.getValues());
                  }}
                >
                  {isSaving ? (
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
                    "Update Invoice"
                  )}
                </button>
              )}

              <button
                className="bg-[#000] text-white border border-[#0000001f] rounded-[5px] w-full px-[0.6rem] py-[0.4rem] font-normal cursor-pointer text-[0.85rem] flex justify-center items-center"
                // type="submit"
                disabled={isSaving || attachmentUploading}
                onClick={() => {
                  onSubmit(form.getValues());
                }}
              >
                {isSending ? (
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
                  "Send Invoice"
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CreateInvoice;
