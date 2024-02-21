import React from "react";
import { ScrollPartners } from "../ScrolPartners";

const Partners = () => {
  return (
    <div className="bg-[#38BDF80F] py-6 md:py-8 p-4 md:px-0 ">
      <div className="mx-auto max-w-7xl">
        <h4 className="text-base text-black font-semibold text-left my-4 px[4rem] lg:px-0">
          Our Partners:
        </h4>
        <ScrollPartners />
      </div>
    </div>
  );
};

export default Partners;
