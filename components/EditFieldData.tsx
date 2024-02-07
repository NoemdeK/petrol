"use client";

import React, { useEffect, useState } from "react";
import useEditFieldData from "@/lib/useEditFieldData";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import close from "../assets/icons/close.svg";
import Image from "next/image";
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
import { UploadFileInput } from "./UploadFile";
import useLoading from "@/lib/useLoading";
import { PlainTransportDekApi } from "@/utils/axios";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { TailSpin } from "react-loader-spinner";
import { AnimatePresence, motion } from "framer-motion";

const EditFieldData = () => {
  const loading = useLoading();

  const [dataId, setDataId] = useState<string>("");

  const router = useRouter();
  const { data: userData } = useSession();

  const [updateLoading, setUpdateLoading] = useState<boolean>(false);

  const { isEditFeieldDataOpen, onEditFieldDataClose, editFielddata } =
    useEditFieldData();

  useEffect(() => {
    if (editFielddata) {
      setDataId(editFielddata?.data?.entryId);
    }
  }, [editFielddata]);

  const formatDate = (inputDate = "2024-01-01") => {
    type MonthMap = {
      Jan: string;
      Feb: string;
      Mar: string;
      Apr: string;
      May: string;
      Jun: string;
      Jul: string;
      Aug: string;
      Sep: string;
      Oct: string;
      Nov: string;
      Dec: string;
      [key: string]: string;
    };
    const monthMap: MonthMap = {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12",
    };

    const parts = inputDate?.split("-");

    const year = parts[0];
    const month = monthMap[parts[1]];
    const day = parts[2];

    return `${year}-${month}-${day}`;
  };

  const productsSchema = z.object({
    PMS: z.string().optional(),
    DPK: z.string().optional(),
    LPG: z.string().optional(),
    AGO: z.string().optional(),
  });

  const formSchema = z.object({
    fillingStation: z.string().optional(), // Make fillingStation not required
    state: z.string().optional(), // Make state not required
    city: z.string().optional(), // Make city not required
    products: productsSchema,
    priceDate: z.string().optional(), // Make priceDate not required
    supportingDocument: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onBlur",
    resolver: zodResolver(formSchema),
    defaultValues: {
      fillingStation: editFielddata?.data?.fillingStation,
      state: editFielddata?.data?.state,
      city: editFielddata?.data?.city,
      products: {
        PMS: editFielddata?.data?.products?.PMS,
        DPK: editFielddata?.data?.products?.DPK,
        LPG: editFielddata?.data?.products?.LPG,
        AGO: editFielddata?.data?.products?.AGO,
      },
      priceDate: editFielddata?.data?.priceDate,
      supportingDocument: editFielddata?.data?.supportingDocument,
    },
  });

  useEffect(() => {
    if (editFielddata && form) {
      form.setValue(
        "fillingStation",
        editFielddata?.data?.fillingStation || ""
      );
      form.setValue("state", editFielddata?.data?.state || "");
      form.setValue("city", editFielddata?.data?.city || "");
      form.setValue(
        "products.PMS",
        editFielddata?.data?.products?.PMS.toString() || ""
      );
      form.setValue(
        "products.DPK",
        editFielddata?.data?.products?.DPK.toString() || ""
      );
      form.setValue(
        "products.LPG",
        editFielddata?.data?.products?.LPG.toString() || ""
      );
      form.setValue(
        "products.AGO",
        editFielddata?.data?.products?.AGO.toString() || ""
      );
      form.setValue(
        "priceDate",
        formatDate(editFielddata?.data?.dateSubmitted) || ""
      );
      form.setValue(
        "supportingDocument",
        editFielddata?.data?.supportingDocument || ""
      );
    }
  }, [editFielddata, form.setValue]);

  const fulling = [
    "NNPC",
    "IOCs (Total, ExxonMobil, etc)",
    "Private Owned  Filling Station",
  ];

  const isLoading = form.formState.isSubmitting;
  const statesInNigeria = [
    "Abia",
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
    "Federal Capital Territory (FCT)",
  ];

  async function onSubmit(data: any) {
    // loading.onOpen();

    setUpdateLoading(true);

    const payload = data;

    await PlainTransportDekApi.patch(
      `data-entry/update?dataEntryId=${dataId}`,
      JSON.stringify(payload),
      {
        headers: {
          Authorization: `Bearer ${userData?.user.accessToken}`,
        },
      }
    )
      .then(() => {
        setUpdateLoading(false);
        form.reset();
        toast({
          title: "Data Entry Updated Successfully",
          description: "Done",
        });
        router.refresh();
        window.location.reload();
        onEditFieldDataClose();
      })
      .catch((error) => {
        setUpdateLoading(false);

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
    <>
      <AnimatePresence>
        {isEditFeieldDataOpen && (
          <div className="bg-[#262626a3] fixed top-0 left-0 right-0 bottom-0 z-50 backdrop-blur-[3.1px] shadow-[0_4px_30px_#00000019] flex justify-end">
            <motion.div
              initial={{ opacity: 1, x: 420 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 1, x: 420 }}
              transition={{ duration: 0.3 }}
              className="bg-white min-w-[420px] rounded-l-[0.7rem] overflow-hidden"
            >
              <div className="bg-[#FAFAFA] p-[1rem] flex justify-between items-center border-b-[#0000001f] border h-[60px]">
                <p className="text-sm font-medium text-[0.8rem]">Edit Data</p>
                <span
                  onClick={() => {
                    onEditFieldDataClose();
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
              <div className="p-[1rem] max-h-[calc(100vh-60px)] overflow-y-scroll border">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-3"
                  >
                    <FormField
                      control={form.control}
                      name="fillingStation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Filling Station</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={""}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue
                                  placeholder={`${editFielddata?.data?.fillingStation}`}
                                >
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
                              defaultValue={""}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue
                                    placeholder={`${editFielddata?.data?.state}`}
                                  >
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
                                className="ml-auto w-32 "
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
                                defaultValue={`${editFielddata?.data?.products?.DPK}`}
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
                                defaultValue={`${editFielddata?.data?.products?.LPG}`}
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
                                defaultValue={`${editFielddata?.data?.products?.PMS}`}
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
                              <Input
                                type="date"
                                disabled={isLoading}
                                defaultValue={`${formatDate(
                                  editFielddata?.data?.dateSubmitted
                                )}`}
                                {...field}
                              />
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
                    <div>
                      {/* <Image
                      src={editFielddata?.data?.supportingDocument}
                      alt="supporting document"
                      width={300}
                      height={300}
                      className="object-contain"
                    /> */}
                      <img
                        src={editFielddata?.data?.supportingDocument}
                        alt="supporting document"
                        width={150}
                        height={150}
                        className="object-contain"
                      />
                    </div>
                    <div className="w-full flex items-center gap-6">
                      <button
                        className="bg-[#F5F5F5] border border-[#0000001f] rounded-[5px] px-[0.9rem] py-[0.4rem] font-normal cursor-pointer text-[0.85rem]"
                        onClick={() => {
                          onEditFieldDataClose();
                          form.reset();
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        className="bg-[#000] text-white border border-[#0000001f] rounded-[5px] w-full px-[0.6rem] py-[0.4rem] font-normal cursor-pointer text-[0.85rem] flex justify-center items-center"
                        type="submit"
                        disabled={isLoading}
                      >
                        {updateLoading ? (
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
                          "Submit"
                        )}
                      </button>
                    </div>
                  </form>
                </Form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EditFieldData;
