"use client";
import { PlainTransportDekApi } from "@/utils/axios";
import React, { useEffect, useState } from "react";
import Plan from "./Plan";
import { useSession } from "next-auth/react";
import { toast } from "@/components/ui/use-toast";

const Plans = ({ availablePlans }: any) => {
  console.log(availablePlans);
  // const { data: session } = useSession();
  // const retreivePlans = async () => {
  //   await PlainTransportDekApi.get("premium-plan/retrieve/available-plans", {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${session?.user.accessToken}`,
  //     },
  //   })
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log("Error", err);
  //       toast({
  //         variant: "destructive",
  //         title: "Entry Error",
  //         description:
  //           err.response.data.message ||
  //           "Something went wrong while fetching available plans",
  //       });
  //     })
  //     .finally(() => {});
  // };

  // useEffect(() => {
  //   retreivePlans();
  // }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
      {availablePlans.map((plan: any, i: number) => (
        <Plan key={i} plan={plan} />
      ))}
    </div>
  );
};

export default Plans;
