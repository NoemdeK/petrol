import useCreatePricing from "@/lib/useCreatePricing";
import React from "react";
import { LuDot } from "react-icons/lu";

const Plan = ({ plan }: any) => {
  const { onOpen, setData } = useCreatePricing();
  return (
    <div className="border rounded-md p-4 relative h-[290px]">
      <p className="text-[#0A98A9] font-medium text-[1.1rem]">
        {plan.planName || ""}
      </p>
      <h2 className="text-[2rem] font-medium mt-3">
        ${plan.amount}
        <span className="font-medium text-[1rem]">
          /
          {plan.period === "per_week"
            ? "Week"
            : plan.period === "per_month"
            ? "Month"
            : "Year"}
        </span>
      </h2>
      <div className="flex flex-col gap-2 mt-4">
        {plan.planDetails.map((item: any, i: any) => {
          return (
            <span className="flex gap-1 items-center" key={i}>
              <LuDot size={30} />
              <p className="text-[0.9rem]">{item.toUpperCase()}</p>
            </span>
          );
        })}
      </div>
      <button
        className="bg-[#000] text-white border border-[#0000001f] rounded-[5px] px-[0.6rem] py-[0.4rem] font-normal cursor-pointer text-[0.85rem] flex justify-center items-center mt-4 absolute top-[85%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] h-[38px]"
        type="submit"
        disabled={false}
        onClick={() => {
          onOpen();
          setData(plan);
        }}
      >
        Edit
      </button>
    </div>
  );
};

export default Plan;
