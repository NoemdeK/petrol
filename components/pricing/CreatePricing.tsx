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
import useCreatePricing from "@/lib/useCreatePricing";
import { XSquare } from "lucide-react";
import { da } from "date-fns/locale";

const CreatePricing = () => {
  const { isOpen, onClose, data: pricingData, setData } = useCreatePricing();
  const [planDetails, setPlanDetails] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  // const [dataState, setDataState] = useState(pricingData);

  console.log(pricingData);

  const { data: userData } = useSession();

  const formSchema = z.object({
    planName: z.string().trim(),
    amount: z.string().trim(),
    period: z.string().trim(),
    detail: z.string().trim(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onBlur",
    resolver: zodResolver(formSchema),
    defaultValues: {
      planName: "",
      amount: "",
      period: "",
      detail: "",
    },
  });

  const periods = [
    {
      name: "Per Week",
      period: "per_week",
    },
    {
      name: "Per Month",
      period: "per_month",
    },
    {
      name: "Per Year",
      period: "per_year",
    },
  ];

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    let tempData = {
      ...values,
    };
    if (tempData.period === "Per Month") {
      tempData.period = "per_month";
    }
    if (tempData.period === "Per Week") {
      tempData.period = "per_week";
    }
    if (tempData.period === "Per Year") {
      tempData.period = "per_year";
    }
    const { detail, ...tempDataWithoutDetail } = tempData;

    const data = {
      ...tempDataWithoutDetail,
      planDetails,
    };

    console.log(data);

    const token = userData && userData.user.accessToken;
    await PlainTransportDekApi.post("premium-plan/create", data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res);
        toast({
          title: "Success",
          description: "Pricing plan created successfully",
        });
      })
      .finally(() => {
        onClose();
        setPlanDetails([]);
        form.reset();
        setIsLoading(false);
        window.location.reload();
      });
  }
  async function updatePlan(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    let tempData = {
      ...values,
    };
    if (tempData.period === "Per Month") {
      tempData.period = "per_month";
    }
    if (tempData.period === "Per Week") {
      tempData.period = "per_week";
    }
    if (tempData.period === "Per Year") {
      tempData.period = "per_year";
    }
    const { detail, ...tempDataWithoutDetail } = tempData;

    const data = {
      ...tempDataWithoutDetail,
      planDetails,
    };

    console.log(data);

    const token = userData && userData.user.accessToken;
    await PlainTransportDekApi.patch(
      `premium-plan/update/available-plan?premiumPlanId=${pricingData?._id}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        console.log(res);
        toast({
          title: "Success",
          description: "Pricing plan updated successfully",
        });
      })
      .finally(() => {
        onClose();
        setPlanDetails([]);
        form.reset();
        setIsLoading(false);
        window.location.reload();
      });
  }
  async function handlePlanDelete() {
    setIsDeleting(true);

    const token = userData && userData.user.accessToken;
    await PlainTransportDekApi.delete(
      `premium-plan/delete/available-plan?premiumPlanId=${pricingData?._id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        console.log(res);
        toast({
          title: "Success",
          description: "Pricing plan deleted successfully",
        });
      })
      .finally(() => {
        onClose();
        setPlanDetails([]);
        form.reset();
        setIsDeleting(false);
        window.location.reload();
      });
  }

  useEffect(() => {
    if (pricingData) {
      form.setValue("planName", pricingData?.planName);
      form.setValue("amount", pricingData?.amount);
      form.setValue("period", pricingData?.period);
      setPlanDetails(pricingData?.planDetails);
    }
  }, [pricingData]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="bg-[#262626a3] fixed top-0 left-0 right-0 bottom-0 z-50 backdrop-blur-[3.1px] shadow-[0_4px_30px_#00000019] flex justify-end">
          <motion.div
            initial={{ opacity: 1, x: 420 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 1, x: 420 }}
            transition={{ duration: 0.3 }}
            className="bg-accent w-screen  md:w-[450px] md:min-w-[450px] md:rounded-l-[0.7rem] overflow-x-hidden max-h-screen overflow-y-scroll"
          >
            <div className="bg-accent p-[1rem] flex justify-between items-center border-b-[#0000001f] border h-[60px]">
              <p className="text-sm font-medium text-[0.8rem]">
                Create Premium Plan
              </p>
              <span
                onClick={() => {
                  onClose();
                  setPlanDetails([]);
                  form.reset();
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
              <Form {...form}>
                <form className="flex flex-col gap-3">
                  <FormField
                    control={form.control}
                    name="planName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Plan Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter plan name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amount ($)</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter amount" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="period"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Period</FormLabel>
                        <Select onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select period">
                                {field.value}
                              </SelectValue>
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {periods.map((item) => (
                              <SelectItem key={item.period} value={item.name}>
                                {item.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="detail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Plan Details</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter a plan detail and press enter"
                            {...field}
                            onKeyDown={(e: any) => {
                              if (e.key === "Enter") {
                                setPlanDetails((prev) => [
                                  ...prev,
                                  e.target.value,
                                ]);
                                form.setValue("detail", "");
                              }
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex flex-col gap-2 mt-2">
                    {planDetails.map((detail, index) => (
                      <div
                        key={index}
                        className="bg-accent p-[0.3rem] flex items-center gap-2"
                      >
                        <XSquare
                          className="cursor-pointer"
                          onClick={() => {
                            setPlanDetails((prev) =>
                              prev.filter((_, i) => i !== index)
                            );
                          }}
                        />

                        {detail}
                      </div>
                    ))}
                  </div>
                </form>
              </Form>
            </div>
            <div className="w-full flex items-center gap-6 p-[1rem]">
              <p
                className="bg-accent border border-[#0000001f] rounded-[5px] px-[0.9rem] py-[0.4rem] font-normal cursor-pointer text-[0.85rem]"
                onClick={() => {
                  onClose();
                  setPlanDetails([]);
                  form.reset();
                  setData(null);
                }}
              >
                Cancel
              </p>

              {pricingData !== null && (
                <button
                  className="bg-transparent text-red-500 border border-red-500 rounded-[5px] w-full px-[0.6rem] py-[0.4rem] font-normal cursor-pointer text-[0.85rem] flex justify-center items-center"
                  onClick={handlePlanDelete}
                >
                  {isDeleting ? (
                    <TailSpin
                      visible={true}
                      height="20"
                      width="20"
                      color="#e52f2f"
                      ariaLabel="tail-spin-loading"
                      radius="1"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  ) : (
                    "Delete Plan"
                  )}
                </button>
              )}

              {pricingData === null ? (
                <button
                  className="bg-[#000] text-white border border-[#0000001f] rounded-[5px] w-full px-[0.6rem] py-[0.4rem] font-normal cursor-pointer text-[0.85rem] flex justify-center items-center"
                  // type="submit"
                  disabled={false}
                  onClick={() => {
                    onSubmit(form.getValues());
                  }}
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
                    "Create Plan"
                  )}
                </button>
              ) : (
                <button
                  className="bg-[#000] text-white border border-[#0000001f] rounded-[5px] w-full px-[0.6rem] py-[0.4rem] font-normal cursor-pointer text-[0.85rem] flex justify-center items-center"
                  // type="submit"
                  disabled={false}
                  onClick={() => {
                    updatePlan(form.getValues());
                  }}
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
                    "Update Plan"
                  )}
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CreatePricing;
