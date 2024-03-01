"use client";
import React from "react";
import { Tag, Clock } from "lucide-react";
import report from "../../../assets/report.png";
import Image from "next/image";
import edit from "@/assets/icons/edit.svg";
import deleteIcon from "@/assets/icons/delete.svg";
import { useSession } from "next-auth/react";

interface ReportProps {
  recent: boolean;
  report?: any;
}
const Report: React.FC<ReportProps> = ({ recent, report }) => {
  const { data: session } = useSession();
  return (
    <div
      className={`border border-[#E0E0E0] flex ${
        recent ? "gap-1" : "gap-3"
      } rounded-md`}
    >
      <div className={recent ? `flex-[0.6]` : `flex-[0.4]`}>
        <Image
          src={report ? report.headlinePicture : ""}
          alt="report_image"
          width={recent ? 500 : 500}
          height={recent ? 500 : 500}
          className={`${
            recent ? "w-full h-[100px]" : "w-[200px] h-[120px]"
          } object-fit`}
        />
      </div>

      <div className={`flex-1 ${recent ? "p-[0.7rem]" : "p-[0.5rem]"}`}>
        <div className="flex items-start gap-1 justify-between">
          <h3
            className={`font-medium ${
              recent ? "text-[0.7rem]" : "text-[0.7rem]"
            }`}
          >
            {report
              ? report.reportHeadline
              : "After its Shell acquisition, Renaissance will become pillar of Nigeria’s local content and gas monetization strategy"}
          </h3>
          {session?.user?.role === "rwx_admin" && (
            <>
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
            </>
          )}
        </div>

        {recent || (
          <p className="font-normal text-[0.7rem] mt-[0.6rem]">
            {report ? report.reportBody : ""}
          </p>
        )}
        <div
          className={`flex items-center ${
            recent ? "gap-3" : "gap-10"
          } mt-[0.6rem]`}
        >
          <div className="flex items-center gap-1">
            <Tag size={13} color="#666666" />
            {report?.tagAGO && (
              <p className="font-normal text-[0.6rem] text-[#666666]">AGO</p>
            )}
            {report?.tagPMS && (
              <p className="font-bold text-[0.6rem] text-[#666666]">.</p>
            )}
            {report?.tagPMS && (
              <p className="font-normal text-[0.6rem] text-[#666666]">PMS</p>
            )}
            {report?.tagICE && (
              <p className="font-bold text-[0.6rem] text-[#666666]">.</p>
            )}
            {report?.tagICE && (
              <p className="font-normal text-[0.6rem] text-[#666666]">ICE</p>
            )}
            {report?.tagDPK && (
              <p className="font-bold text-[0.6rem] text-[#666666]">.</p>
            )}
            {report?.tagDPK && (
              <p className="font-normal text-[0.6rem] text-[#666666]">DPK</p>
            )}
            {report?.tagLPG && (
              <p className="font-bold text-[0.6rem] text-[#666666]">.</p>
            )}
            {report?.tagLPG && (
              <p className="font-normal text-[0.6rem] text-[#666666]">LPG</p>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Clock size={13} color="#666666" />
            <p className="font-normal text-[0.6rem] text-[#666666]">
              {report ? report.duration : ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
