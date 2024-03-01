import React, { Children } from "react";
import MostRead from "./MostRead";

const ReportsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="py-4 reportsPage">
      <div className="leftReportsPanel">{children}</div>
      <div className="rightReportsPanel">
        <MostRead />
      </div>
    </div>
  );
};

export default ReportsLayout;
