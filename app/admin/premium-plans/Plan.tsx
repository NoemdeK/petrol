import React from "react";
import { LuDot } from "react-icons/lu";

const Plan = () => {
  return (
    <div className="border rounded-md p-4">
      <p className="text-[#0A98A9] font-medium text-[1.1rem]">
        Starter Package (Individual)
      </p>
      <h2 className="text-[2rem] font-medium mt-3">
        $30<span className="font-medium text-[1rem]">/Month</span>
      </h2>
      <div className="flex flex-col gap-2 mt-4">
        <span className="flex gap-1 items-center">
          <LuDot size={30} />
          <p className="text-[0.9rem]">Access to Downloads and Printing</p>
        </span>
        <span className="flex gap-1 items-center">
          <LuDot size={30} />
          <p className="text-[0.9rem]">Access to the Office Space</p>
        </span>
        <span className="flex gap-1 items-center">
          <LuDot size={30} />
          <p className="text-[0.9rem]">Access to download Raw files</p>
        </span>
      </div>
      <button
        className="bg-[#000] text-white border border-[#0000001f] rounded-[5px] px-[0.6rem] py-[0.4rem] font-normal cursor-pointer text-[0.85rem] flex justify-center items-center w-full mt-4"
        type="submit"
        disabled={false}
        onClick={() => {}}
      >
        Edit
      </button>
    </div>
  );
};

export default Plan;
