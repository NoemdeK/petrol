"use client";
import { PlainTransportDekApi } from "@/utils/axios";
import React from "react";
import Plan from "./Plan";

const Plans = () => {
  //   const retreivePlans = async () => {
  //     await PlainTransportDekApi.get()
  //   };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array(5)
        .fill(1)
        .map((_, i) => (
          <Plan key={i} />
        ))}
    </div>
  );
};

export default Plans;
