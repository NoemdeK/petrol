import React from "react";
import Report from "./Report";

const MostRead = () => {
  return (
    <div className="border border-[#E0E0E0] p-4 rounded-md">
      {" "}
      <h3 className="text-sm font-medium">Most Read</h3>
      <div className="mt-4 flex flex-col gap-4">
        {" "}
        {Array.from({ length: 3 }).map((_, i) => (
          <Report key={i} recent={true} />
        ))}
      </div>
    </div>
  );
};

export default MostRead;
