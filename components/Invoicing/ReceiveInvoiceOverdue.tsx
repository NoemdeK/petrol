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
import { set } from "date-fns";
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

const ReceiveInvoiceOverdue = () => {
  const { data: userData } = useSession();

  const { onOpen, onClose, isOpen, data, setData } = useReceiveInvoice();

  const formSchema = z.object({
    // client: z.string().trim(),
    // clientEmail: z.string().trim(),
    // invoiceDate: z.string(),
    // dueDate: z.string(),
    // premiumPlanPackage: z.string(),
    // rate: z.string(),
    // quantity: z.string(),
    // percentageDiscount: z.string(),
    // monetaryDiscount: z.string(),
    amountPaid: z.string(),
    paymentDate: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onBlur",
    resolver: zodResolver(formSchema),
    defaultValues: {
      // client: "",
      // clientEmail: "",
      // invoiceDate: "",
      // dueDate: "",
      // premiumPlanPackage: "",
      // rate: "",
      // quantity: "",
      // percentageDiscount: "",
      // monetaryDiscount: "",
      amountPaid: "",
      paymentDate: "",
    },
  });

  const [showDetails, setShowDetails] = useState(false);
  //   const [showActivity, setShowActivity] = useState(true);

  const toggleDetails = () => {
    setShowDetails((prevState) => !prevState);
  };
  //   const toggleActivity = () => {
  //     setShowActivity((prevState) => !prevState);
  //   };

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
              <span onClick={() => {}}>
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
                <h2 className="font-medium text-2xl">$300,000</h2>
              </div>
              <div className="mt-6 flex justify-between">
                <div className="flex-1">
                  <p className="font-medium text-sm">Invoice Date</p>
                  <p className="font-normal text-[1em]">01/02/2024</p>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Due Date</p>
                  <p className="font-normal text-[1em]">29/02/2024</p>
                </div>
              </div>
              <div className="mt-6 border rounded-lg p-[1rem]">
                <p className="font-medium">Isaac Adeleke</p>
                <p>isaacadeleke@gmail.com</p>
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
                      <p className="flex-1">$150,000</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="flex-1">Quantity (Year)</p>
                      <p className="flex-1">2</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="flex-1">Dsicount (%)</p>
                      <p className="flex-1">0</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="flex-1">Discount ($)</p>
                      <p className="flex-1">0</p>
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
                            <Input placeholder="DD/MM/YYYY" {...field} />
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
                onClick={() => {}}
              >
                Cancel
              </p>

              <button
                className="bg-[#000] text-white border border-[#0000001f] rounded-[5px] w-full px-[0.6rem] py-[0.4rem] font-normal cursor-pointer text-[0.85rem] flex justify-center items-center"
                // type="submit"
                disabled={false}
                //   onClick={form.handleSubmit(onSubmit)}
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

export default ReceiveInvoiceOverdue;
