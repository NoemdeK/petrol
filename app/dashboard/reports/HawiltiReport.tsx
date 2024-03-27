import { Clock, Tag } from "lucide-react";
import Image from "next/image";
import React from "react";
import reportFallback from "@/assets/reportFallback.jpg";
import { useRouter } from "next/navigation";

const HawiltiReport = ({ report, recent }: any) => {
  const router = useRouter();

  const handleViewReport = (e: any) => {
    e.stopPropagation();
    router.push(`/dashboard/reports/report/${report?.reportId}`);
  };

  return (
    <div
      className={`border border-[#E0E0E0] flex ${
        recent
          ? "gap-1 flex-col"
          : "gap-3 lg:h-[190px] overflow-hidden flex-col lg:flex-row"
      } rounded-md cursor-pointer hover:scale-95 transition-all duration-300 overflow-hidden`}
      onClick={handleViewReport}
    >
      <div className={recent ? `flex-[0.6]` : `flex-[0.35]`}>
        <Image
          src={
            report && report.headlinePicture
              ? report.headlinePicture
              : reportFallback
          }
          alt="report_image"
          width={500}
          height={500}
          className={`${
            recent ? "w-full h-[200px]" : "w-[400px] h-full"
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
              recent ? "text-[1rem] font-semibold" : "text-[1rem] font-semibold"
            }`}
          >
            {report
              ? report.reportHeadline
              : "After its Shell acquisition, Renaissance will become pillar of Nigeria’s local content and gas monetization strategy"}
          </h3>
        </div>

        {recent || (
          <p className="font-normal text-[0.8rem] mt-[1rem]">
            {report
              ? `${report?.thirdPartyReportBody[0]?.QQ1.substring(0, 90)}...`
              : ""}
          </p>
        )}
        <div
          className={`flex items-center ${
            recent ? "gap-3" : "gap-10"
          } mt-[0.6rem]`}
        >
          {" "}
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

export default HawiltiReport;
