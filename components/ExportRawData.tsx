"use client";

import React, { useState } from "react";
import useExportButton from "@/lib/useExportButton";

import close from "../assets/icons/close.svg";
import Image from "next/image";

import { Checkbox } from "./ui/checkbox";
import { toast } from "./ui/use-toast";
import { useSession } from "next-auth/react";
import { TailSpin } from "react-loader-spinner";
import { AnimatePresence, motion } from "framer-motion";
import { Input } from "./ui/input";

const ExportRawData = () => {
  const { data: userData } = useSession();
  const [filterData, setFilterData] = useState<any>([]);

  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { isExportRawDataOpen, onExportRawDataClose } = useExportButton();

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

  const products = [
    // { name: "ICE Brent Crude (ICE)", value: "ICE" },
    { name: "Premium Motor Spirit (PMS)", value: "PMS" },
    { name: "Dual Purpose Kerosene (DPK)", value: "DPK" },
    { name: "Liquefied Petroleum Gas (LPG)", value: "LPG" },
    { name: "Automotive Gas Oil (AGO)", value: "AGO" },
  ];

  const handleStartDateChange = (event: any) => {
    const selectedStartDate = event.target.value;
    setStartDate(selectedStartDate);

    // Calculate the maximum end date (2 months from the selected start date)
    const maxEndDate = new Date(selectedStartDate);
    maxEndDate.setMonth(maxEndDate.getMonth() + 2);
    setEndDate(maxEndDate.toISOString().split("T")[0]);

    // Reset end date if it exceeds the maximum range
    if (endDate && new Date(endDate) > maxEndDate) {
      setEndDate("");
    }
  };

  const handleEndDateChange = (event: any) => {
    const selectedEndDate = event.target.value;
    setEndDate(selectedEndDate);
  };

  async function onSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/v1/petro-data/export?startDate=${startDate}&endDate=${endDate}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userData?.user.accessToken}`,
          },
          body: JSON.stringify({ products: filterData }),
        }
      );
      const data = await response.json();
      setLoading(false);
      if (response.status !== 200) {
        toast({
          title: "Error",
          description:
            data.message || "Something went wrong, please try again.",
          variant: "destructive",
        });
      } else {
        const downloadLink = document.createElement("a");
        downloadLink.href = data?.data?.url;
        downloadLink.target = "_blank";
        downloadLink.download = `downloaded_file_${data?.data?.name}.csv`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        toast({
          title: "Success",
          description: data.message || "Successfully exported data to csv",
          variant: "default",
        });
        onExportRawDataClose();
      }
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error",
        description: "Something went wrong, please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <>
      <AnimatePresence>
        {isExportRawDataOpen && (
          <div className="bg-[#262626a3] fixed top-0 left-0 right-0 bottom-0 z-50 backdrop-blur-[3.1px] shadow-[0_4px_30px_#00000019] flex justify-end">
            <motion.div
              initial={{ opacity: 1, x: 420 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 1, x: 420 }}
              transition={{ duration: 0.3 }}
              className="bg-accent md:min-w-[400px] max-w-[400px] rounded-l-[0.7rem] overflow-hidden relative"
            >
              <div className="bg-accent p-[1rem] flex justify-between items-center border-b-[#0000001f] border h-[60px]">
                <p className="text-sm font-medium text-[0.8rem]">
                  Export Raw Data
                </p>
                <span
                  onClick={() => {
                    onExportRawDataClose();
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
              <p className="p-[1rem] text-[0.7rem]">
                Data Download Limitation: You can download up to two months'
                worth of data per month using the button below. If you require
                more data bandwidth, please contact support for assistance.
                Thank you for your understanding.
              </p>

              <div className="p-[1rem]">
                <form onSubmit={onSubmit}>
                  <p className="font-medium">Products</p>
                  <div className="flex flex-col gap-2 mt-2">
                    {products.map(
                      (
                        product: { name: string; value: string },
                        index: number
                      ) => {
                        return (
                          <div key={index} className="flex items-center gap-2">
                            <Checkbox
                              name="product"
                              value={product.value}
                              onCheckedChange={(checked) => {
                                console.log(product.value);
                                if (checked) {
                                  if (!filterData.includes(product.value)) {
                                    setFilterData((prev: string[]) => [
                                      ...prev,
                                      product.value,
                                    ]);
                                  }
                                } else {
                                  setFilterData((prev: string[]) =>
                                    prev.filter(
                                      (item) => item !== product.value
                                    )
                                  );
                                }
                              }}
                            />
                            <p className="text-[0.9rem]">{product.name}</p>
                          </div>
                        );
                      }
                    )}
                  </div>
                  <div className="mt-[1.4rem] grid gap-4">
                    <div className="grid gap-1">
                      <p className="font-medium">From</p>
                      <Input
                        type="date"
                        disabled={loading}
                        name="startDate"
                        value={startDate}
                        onChange={handleStartDateChange}
                      />
                    </div>
                    <div className="grid gap-1">
                      <p className="font-medium">To</p>
                      <Input
                        type="date"
                        disabled={loading}
                        name="endDate"
                        value={endDate}
                        min={startDate} // Ensure end date is after start date
                        max={endDate} // Limit end date based on calculated maximum
                        onChange={handleEndDateChange}
                      />
                    </div>
                  </div>
                  <div className="w-full flex items-center gap-6 p-[1rem] absolute bottom-0 right-[0.05rem]">
                    <p
                      className="bg-accent border border-[#0000001f] rounded-[5px] px-[0.9rem] py-[0.4rem] font-normal cursor-pointer text-[0.85rem]"
                      onClick={() => {
                        onExportRawDataClose();
                      }}
                    >
                      Cancel
                    </p>
                    <button
                      className="bg-[#000] text-white border border-[#0000001f] rounded-[5px] w-full px-[0.6rem] py-[0.4rem] font-normal cursor-pointer text-[0.85rem] flex justify-center items-center"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? (
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
                        "Export Raw Data"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ExportRawData;
