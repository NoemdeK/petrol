"use client";

import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import close from "../assets/icons/close.svg";
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
import { EditUploadFile } from "./EditUploadFile";
import useCreateInvoice from "@/lib/useCreateInvoice";

const CreateInvoice = () => {
  const { isOpen, onClose, data: clientData } = useCreateInvoice();
  const [priceState, setPriceState] = React.useState<any>({
    rate: 0,
    quantity: 0,
    percentageDiscount: 0,
    monetaryDiscount: 0,
  });
  const [totalAmount, setTotalAmount] = React.useState<number>(0);

  const formSchema = z.object({
    client: z.string(),
    clientEmail: z.string(),
    invoiceDate: z.string(),
    dueDate: z.string(),
    premiumPackage: z.string(),
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
      premiumPackage: "",
      rate: "",
      quantity: "",
      percentageDiscount: "",
      monetaryDiscount: "",
      //   totalAmount: 0,
      //   attachment: "",
    },
  });

  useEffect(() => {
    if (clientData) {
      form.setValue(
        "client",
        `${clientData?.firstName} ${clientData?.lastName}` || ""
      );
      form.setValue("clientEmail", clientData?.email || "");
    }
  }, [clientData]);

  const premiumPlans = [
    {
      name: "Starter Package (Individual)",
      value: 50000,
    },
    {
      name: "Enterprise (Company",
      value: 150000,
    },
  ];

  async function onSubmit(values: any) {
    const data = { ...values, attachment: "" };
    console.log(data);
  }

  const handleFileUpload = async (newDocument: any) => {
    console.log(newDocument);
  };

  useEffect(() => {
    setTotalAmount(
      priceState.rate * priceState.quantity - priceState.monetaryDiscount
    );
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
                Create Invoice
              </p>
              <span
                onClick={() => {
                  onClose();
                  form.reset();
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
                    name="premiumPackage"
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
                            <FormLabel className="text-sm">Rate</FormLabel>
                            <FormControl>
                              <div className="border border-[#00000066] flex items-center bg-white px-2 rounded">
                                <p className="text-[#00000099] text-sm">$</p>
                                <Input
                                  disabled={true}
                                  {...field}
                                  type="number"
                                  className="w-full border-none text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
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
                            <FormLabel>QTY (year)</FormLabel>
                            <FormControl>
                              <div className="border border-[#00000066] flex items-center bg-white px-2 rounded">
                                <p className="text-[#00000099] text-sm">$</p>
                                <Input
                                  disabled={false}
                                  {...field}
                                  type="number"
                                  className="w-full border-none text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
                                  onChange={(value: any) => {
                                    field.onChange(value);
                                    const quantity = value.target.value * 1;
                                    const log = form.getValues();
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
                            <FormLabel>Discount (%)</FormLabel>
                            <FormControl>
                              <div className="border border-[#00000066] flex items-center bg-white px-2 rounded">
                                <p className="text-[#00000099] text-sm">$</p>
                                <Input
                                  disabled={false}
                                  {...field}
                                  type="number"
                                  className="w-full border-none text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
                                  onChange={(value: any) => {
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
                            <FormLabel>Discount ($)</FormLabel>
                            <FormControl>
                              <div className="border border-[#00000066] flex items-center bg-white px-2 rounded">
                                <p className="text-[#00000099] text-sm">$</p>
                                <Input
                                  disabled={false}
                                  {...field}
                                  type="number"
                                  className="w-full border-none text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
                                  onChange={(value: any) => {
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
                      <h3 className="text-xl font-medium">
                        Amount: ${totalAmount}
                      </h3>
                      {/* <FormField
                        control={form.control}
                        name="totalAmount"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="flex items-center px-2 rounded">
                          
                                <Input
                                  disabled={true}
                                  {...field}
                                  type="number"
                                  className="border-none w-[90px] min-w-[90px] focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent text-xl font-medium py-0 px-1"
                                />
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      /> */}
                    </div>
                  </div>
                  <div className="mt-6 flex-col gap-2">
                    <Label className="pb-2">Attachment</Label>
                    <EditUploadFile
                      name="attachment"
                      form={form}
                      onUpload={handleFileUpload}
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
                disabled={false}
                //   onClick={form.handleSubmit(onSubmit)}
              >
                Save
              </button>
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
