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
import { toast } from "../ui/use-toast";
import { useSession } from "next-auth/react";
import { format, set } from "date-fns";
import Loader from "../ui/loader";
import { PlainTransportDekApi } from "@/utils/axios";
import { ChevronRight } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import useReceiveInvoice from "@/lib/useReceiveInvoice";

const ReceiveInvoicePayment = () => {
  const { data: userData } = useSession();
  const { onOpen, onClose, isOpen, data, setData } = useReceiveInvoice();
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = z.object({
    amountPaid: z.string().trim(),
    paymentDate: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onBlur",
    resolver: zodResolver(formSchema),
    defaultValues: {
      amountPaid: "",
      paymentDate: "",
    },
  });

  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails((prevState) => !prevState);
  };

  async function onSubmit(values: any) {
    if (values.amountPaid === "" || values.paymentDate === "") {
      toast({
        title: "Error",
        description: "Please fill all the fields",
        variant: "destructive",
      });
      return;
    }
    console.log(values);

    const {
      client,
      clientEmail,
      invoiceDate,
      dueDate,
      premiumPlanPackage,
      rate,
      quantity,
      percentageDiscount,
      monetaryDiscount,
      attachment,
    } = data;
    const payload = {
      ...values,
      client,
      clientEmail,
      invoiceDate,
      dueDate,
      premiumPlanPackage,
      rate,
      quantity,
      percentageDiscount,
      monetaryDiscount,
      totalAmount: values.amountPaid * 1,
      invoiceAmountPaidDate: values.paymentDate,
      attachment,
    };
    console.log(payload);

    setIsLoading(true);

    await PlainTransportDekApi.patch(
      `premium-plan/invoice/confirm-payment?invoiceId=${data.invoiceId}`,
      JSON.stringify(payload),
      {
        headers: {
          Authorization: `Bearer ${userData?.user.accessToken}`,
        },
      }
    )
      .then(() => {
        toast({
          title: "Success",
          description: "Payment confirmed successfully",
          variant: "default",
        });
        onClose();
      })
      .catch((error) => {
        toast({
          title: "Error",
          description:
            error.response.data.message ||
            "There was an issue with your request",
          variant: "destructive",
        });
      })
      .finally(() => {
        setIsLoading(false);
        onClose();
        window.location.reload();
      });
  }

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
                Invoice 0001 <span className="ml-4 text-red-500">Overdue</span>
              </p>
              <span
                onClick={() => {
                  onClose();
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
              {/* <Form {...form}>
              <form></form>
            </Form> */}
              <div className="mt-6">
                <p className="font-medium text-sm">Total Due</p>
                <h2 className="font-medium text-2xl">
                  {" "}
                  ${data.totalAmount.toLocaleString()}
                </h2>
              </div>
              <div className="mt-6 flex justify-between">
                <div className="flex-1">
                  <p className="font-medium text-sm">Invoice Date</p>
                  <p className="font-normal text-[1em]">
                    {" "}
                    {format(new Date(data.invoiceDate), "dd/MM/yyyy")}
                  </p>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Due Date</p>
                  <p className="font-normal text-[1em]">
                    {" "}
                    {format(new Date(data.dueDate), "dd/MM/yyyy")}
                  </p>
                </div>
              </div>
              <div className="mt-6 border rounded-lg p-[1rem]">
                <p className="font-medium">{data.client}</p>
                <p>{data.clientEmail}</p>
              </div>
              <div className="mt-6 border rounded-lg p-[1rem]">
                <div className="flex justify-between" onClick={toggleDetails}>
                  <p className="font-medium">Premium Details</p>
                  <span style={{ transition: "transform 0.3s" }}>
                    <ChevronRight
                      size={20}
                      style={{
                        transform: showDetails
                          ? "rotate(90deg)"
                          : "rotate(0deg)",
                      }}
                    />
                  </span>
                </div>
                {showDetails && (
                  <div className="mt-6 flex flex-col gap-2">
                    <div className="flex justify-between">
                      <p className="flex-1">Enterprise(Company)</p>
                      <p className="flex-1">${data.rate.toLocaleString()}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="flex-1">Quantity (Year)</p>
                      <p className="flex-1">{data.quantity}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="flex-1">Dsicount (%)</p>
                      <p className="flex-1">{data.percentageDiscount}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="flex-1">Discount ($)</p>
                      <p className="flex-1">{data.monetaryDiscount}</p>
                    </div>
                  </div>
                )}
              </div>
              {/* <div className="mt-6 border rounded-lg p-[1rem]">
              <div className="flex justify-between" onClick={toggleActivity}>
                <p className="font-medium">Activity</p>
                <span style={{ transition: "transform 0.3s" }}>
                  <ChevronRight
                    size={20}
                    style={{
                      transform: showActivity
                        ? "rotate(90deg)"
                        : "rotate(0deg)",
                    }}
                  />
                </span>
              </div>
              {showActivity && (
                <div className="mt-6 flex flex-col gap-2">
                  <div className="flex justify-between">
                    <p className="flex-1">Invoice Created</p>
                    <p className="flex-1">01/02/2024</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="flex-1">Sent</p>
                    <p className="flex-1"></p>
                  </div>
                  <div className="flex justify-between">
                    <p className="flex-1">Paid</p>
                    <p className="flex-1"></p>
                  </div>
                </div>
              )}
            </div> */}
              <Form {...form}>
                <form className="mt-10 flex flex-col gap-8">
                  <div>
                    <FormField
                      name="paymentDate"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-0">
                          <FormLabel>Payment Date</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="DD/MM/YYYY"
                              {...field}
                              required
                              type="date"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      name="amountPaid"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-0">
                          <FormLabel>Amount Paid</FormLabel>
                          <FormControl>
                            <div className="border border-[#00000066] flex items-center bg-white px-2 rounded gap-1">
                              <p className="text-[#00000099] text-sm">$</p>
                              <Input
                                placeholder="0"
                                {...field}
                                className="w-full border-none text-sm focus-visible:ring-0 focus-visible:ring-offset-0 pl-0"
                                required
                              />
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
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
                }}
              >
                Cancel
              </p>

              <button
                className="bg-[#000] text-white border border-[#0000001f] rounded-[5px] w-full px-[0.6rem] py-[0.4rem] font-normal cursor-pointer text-[0.85rem] flex justify-center items-center"
                // type="submit"
                disabled={false}
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
                  "Receive Payment"
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ReceiveInvoicePayment;
