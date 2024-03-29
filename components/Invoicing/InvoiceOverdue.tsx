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
import { format } from "date-fns";
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
import useInvoiceOverdue from "@/lib/useInvoiceOverdue";
import useReceiveInvoice from "@/lib/useReceiveInvoice";
import useLoading from "@/lib/useLoading";

const InvoiceOverdue = () => {
  const { data: userData } = useSession();
  const { isOpen, onOpen, onClose, data, setData } = useInvoiceOverdue();
  const { onOpen: OpenReceivePayment, setData: setReceivedPaymentData } =
    useReceiveInvoice();
  const sendLoading = useLoading();
  const formSchema = z.object({});

  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onBlur",
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const [showDetails, setShowDetails] = useState(false);
  const [showActivity, setShowActivity] = useState(true);

  const toggleDetails = () => {
    setShowDetails((prevState) => !prevState);
  };
  const toggleActivity = () => {
    setShowActivity((prevState) => !prevState);
  };

  async function sendInvoice() {
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
      totalAmount,
      attachment,
    } = data;
    const payload = {
      client,
      clientEmail,
      invoiceDate,
      dueDate,
      premiumPlanPackage,
      rate,
      quantity,
      percentageDiscount,
      monetaryDiscount,
      totalAmount,
      attachment,
    };
    sendLoading.onOpen();
    await PlainTransportDekApi.patch(
      `premium-plan/invoice/send?invoiceId=${data.invoiceId}`,
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
          title: "Invoice Semt Successfully",
          description: "Done",
        });
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
        sendLoading.onClose();
        onClose();
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
                Invoice -
                {data.overdue === false && data.invoiceAmountPaid === false ? (
                  <span className="ml-1 text-indigo-600">Not Paid</span>
                ) : data.overdue === false &&
                  data.invoiceAmountPaid === true ? (
                  <span className="ml-1 text-green-500">Paid</span>
                ) : (
                  <span className="ml-1 text-red-500"> Overdue</span>
                )}
              </p>
              <span
                onClick={() => {
                  onClose();
                  setData(null);
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
                  ${data.totalAmount.toLocaleString()}
                </h2>
              </div>
              <div className="mt-6 flex justify-between">
                <div className="flex-1">
                  <p className="font-medium text-sm">Invoice Date</p>
                  <p className="font-normal text-[1em]">
                    {format(new Date(data.invoiceDate), "dd/MM/yyyy")}
                  </p>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Due Date</p>
                  <p className="font-normal text-[1em]">
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
              <div className="mt-6 border rounded-lg p-[1rem]">
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
                      <p className="flex-1">
                        {format(
                          new Date(data.invoiceCreatedDate),
                          "dd/MM/yyyy"
                        )}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="flex-1">Last Sent</p>
                      <p className="flex-1">
                        {format(new Date(data.invoiceSentDate), "dd/MM/yyyy")}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="flex-1">Paid</p>
                      <p className="flex-1">
                        {data.invoiceAmountPaid === true ? "Yes" : "No"}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="w-full flex items-center gap-6 p-[1rem]">
              <p
                className="bg-accent border border-[#0000001f] rounded-[5px] px-[0.9rem] py-[0.4rem] font-normal cursor-pointer text-[0.85rem]"
                onClick={() => {
                  onClose();
                  setData(null);
                }}
              >
                Cancel
              </p>

              <div className="border border-[#05050589] rounded-[5px] px-[0.9rem] py-[0.4rem] w-[360px]">
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex justify-between items-center w-full outline-none">
                    <p className="font-normal text-[0.85rem]">Actions</p>
                    <div
                      style={{
                        transition: "transform 0.3s",
                        transform: "rotate(90deg)",
                      }}
                    >
                      <ChevronRight size={17} />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[360px] flex flex-col mb-2 gap-2">
                    {data.invoiceAmountPaid === false && (
                      <>
                        <DropdownMenuItem
                          className="w-[360px] flex-1 text-sm"
                          onClick={() => {
                            OpenReceivePayment();
                            setReceivedPaymentData(data);
                          }}
                        >
                          Receive Payment
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="w-[360px] flex-1 text-sm"
                          onClick={() => sendInvoice()}
                        >
                          Send Invoice
                        </DropdownMenuItem>
                        <DropdownMenuItem className="w-[360px] flex-1 text-sm">
                          Download Invoice
                        </DropdownMenuItem>
                      </>
                    )}
                    {data.invoiceAmountPaid === true && (
                      <>
                        <DropdownMenuItem
                          className="w-[360px] flex-1 text-sm"
                          onClick={() => {}}
                        >
                          Send Receipt
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="w-[360px] flex-1 text-sm"
                          onClick={() => {}}
                        >
                          Download Receipt
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              {/* <button
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
                "Send Invoice"
              )}
            </button> */}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default InvoiceOverdue;
