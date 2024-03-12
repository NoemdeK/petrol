"use client";
import React from "react";
import { Tag, Clock } from "lucide-react";
import report from "../../../assets/report.png";
import Image from "next/image";
import edit from "@/assets/icons/edit.svg";
import deleteIcon from "@/assets/icons/delete.svg";
import { useSession } from "next-auth/react";
import useDeleteReport from "@/lib/useDeleteReport";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ReportProps {
  recent: boolean;
  report?: any;
}
const Report: React.FC<ReportProps> = ({ recent, report }) => {
  const { onOpen, setId } = useDeleteReport();
  const { data: session } = useSession();
  const router = useRouter();

  const handleViewReport = (e: any) => {
    e.stopPropagation();
    router.push(`/dashboard/reports/report/${report?.reportId}`);
  };

  const handleDeleteReport = (e: any) => {
    e.stopPropagation();
    onOpen();
    setId(report?.reportId);
  }; //handleDeleteReport

  const handleEditReport = (e: any) => {
    e.stopPropagation();
    router.push(`/dashboard/reports/edit-report/${report?.reportId}`);
  };

  return (
    <div
      className={`border border-[#E0E0E0] flex flex-col lg:flex-row ${
        recent
          ? "gap-1 flex-col h-[190px]"
          : "gap-3 lg:h-[190px] overflow-hidden"
      } rounded-md cursor-pointer hover:scale-95 transition-all duration-300 overflow-hidden`}
      // href={`/dashboard/reports/report/${report?.reportId}`}
      onClick={handleViewReport}
    >
      <div className={recent ? `flex-[0.6]` : `flex-[0.35]`}>
        <Image
          src={report ? report.headlinePicture : ""}
          alt="report_image"
          width={recent ? 500 : 500}
          height={recent ? 500 : 500}
          className={`${
            recent ? "w-full h-[110px]" : "w-[400px] h-full"
          } object-fill`}
        />
      </div>

      <div
        className={` ${
          recent ? "p-[0.7rem] flex-[0.4]" : "p-[0.5rem] flex-[0.65]"
        } flex flex-col justify-center`}
      >
        <div className="flex items-start gap-1 justify-between">
          <h3
            className={`font-medium ${
              recent ? "text-[0.7rem]" : "text-[1rem] font-semibold"
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
                  <div onClick={handleEditReport}>
                    <Image
                      src={edit}
                      alt='"edit_icon'
                      width={15}
                      height={15}
                      className="cursor-pointer"
                    />
                  </div>
                  <div onClick={handleDeleteReport}>
                    <Image
                      src={deleteIcon}
                      alt='"delete_icon'
                      width={15}
                      height={15}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {recent || (
          <p className="font-normal text-[1rem] mt-[1rem]">
            {report ? `${report.reportBody.substring(0, 90)}...` : ""}
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
