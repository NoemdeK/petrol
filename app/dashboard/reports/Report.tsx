import React from "react";
import { Tag, Clock } from "lucide-react";
import report from "../../../assets/report.png";
import Image from "next/image";
import edit from "@/assets/icons/edit.svg";
import deleteIcon from "@/assets/icons/delete.svg";

interface ReportProps {
  recent: boolean;
}
const Report: React.FC<ReportProps> = ({ recent }) => {
  return (
    <div className="border border-[#E0E0E0] flex gap-3 rounded-md">
      <Image
        src={report}
        alt="report_image"
        className={`${recent ? "w-[170px]" : "w-[200px]"} h-full object-cover`}
      />
      <div className={`flex-1 ${recent ? "p-[0.7rem]" : "p-[0.5rem]"}`}>
        <div className="flex items-start gap-1">
          <h3
            className={`font-medium ${
              recent ? "text-[0.7rem]" : "text-[0.7rem]"
            }`}
          >
            After its Shell acquisition, Renaissance will become pillar of
            Nigeria’s local content and gas monetization strategy
          </h3>
          {recent || (
            <div className="flex gap-2">
              <Image
                src={edit}
                alt='"edit_icon'
                width={15}
                height={15}
                className="cursor-pointer"
              />
              <Image
                src={deleteIcon}
                alt='"delete_icon'
                width={15}
                height={15}
                className="cursor-pointer"
              />
            </div>
          )}
        </div>

        {recent || (
          <p className="font-normal text-[0.7rem] mt-[0.6rem]">
            The Renaissance consortium comprises some of Nigeria’s most
            respected upstream companies demonstrated track ...
          </p>
        )}
        <div
          className={`flex items-center ${
            recent ? "gap-3" : "gap-10"
          } mt-[0.6rem]`}
        >
          <div className="flex items-center gap-1">
            <Tag size={13} color="#666666" />
            <p className="font-normal text-[0.6rem] text-[#666666]">AGO</p>
            <p className="font-bold text-[0.6rem] text-[#666666]">.</p>
            <p className="font-normal text-[0.6rem] text-[#666666]">PMS</p>
            <p className="font-bold text-[0.6rem] text-[#666666]">.</p>
            <p className="font-normal text-[0.6rem] text-[#666666]">ICE</p>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={13} color="#666666" />
            <p className="font-normal text-[0.6rem] text-[#666666]">3hrs</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
