import React, { Children } from "react";
import MostRead from "./MostRead";

const ReportsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="py-4 flex flex-col lg:flex-row lg:justify-between lg:gap-8 gap-10">
      <div className="flex-1 lg:flex-[0.76]">{children}</div>
      <div className="flex-1 lg:flex-[0.34]">
        <MostRead />
      </div>
    </div>
  );
};

export default ReportsLayout;
