import { DeleteReportModal } from "@/components/DeleteReport";
import SkeletonContainer from "@/components/ui/skeleton";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import arrowBack from "@/assets/icons/arrow_back.svg";
import useDeleteReport from "@/lib/useDeleteReport";
import { useParams, useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import reportFallback from "@/assets/reportFallback.jpg";

const HawiltiReportBody = ({ loading, setLoading, report, session }: any) => {
  const { report: reportId } = useParams();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDeleteReport();

  const handleDeleteReport = async () => {
    const token = session && session.user.accessToken;
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/v1/research-report/delete?reportId=${reportId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          method: "DELETE",
        }
      );

      const data = await response.json();
      setLoading(false);
      console.log(data);

      if (response.status === 200) {
        toast({
          title: "Success",
          description: `${data?.message || "Report deleted successfully"}`,
          variant: "default",
        });
        router.push("/dashboard/reports/report");
      } else {
        toast({
          title: "An error has occured",
          description: `${data?.message || "Cannot fetch data"}`,
          variant: "destructive",
        });
        console.log(data);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const handleCancelDelete = () => {
    onClose();
  };
  return (
    <div>
      <Link
        href={"/dashboard/reports/report"}
        className="flex gap-2 items-center"
        style={{ color: "#000000" }}
      >
        <Image src={arrowBack} alt="arrowBack" width={15} height={15} />
        <p className="text-xs">Research & Reports</p>
      </Link>

      {loading ? (
        <div>
          <SkeletonContainer width="100%" height="500px" />
          <div className="mt-4">
            <SkeletonContainer width="130px" height="30px" />
          </div>
          <div className="mt-4">
            <SkeletonContainer width="100%" height="30px" />
          </div>
        </div>
      ) : (
        <div className="mt-5">
          <Image
            src={
              report && report.headlinePicture
                ? report.headlinePicture
                : reportFallback
            }
            alt="report"
            width={500}
            height={500}
            className="w-full rounded object-fill"
          />

          <h3 className="text-[2rem] font-medium mt-4 leading-tight">
            {report ? report.reportHeadline : ""}
          </h3>
          <div className="mt-3 text-xs text-[#666666] flex gap-6">
            <div className="flex items-center gap-2">
              <p>Tags:</p>
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
            <div className="flex items-center gap-2">
              <p>Posted on:</p>
              <p>
                {report
                  ? format(new Date(report.createdAt), "MMMM dd, yyyy")
                  : ""}
              </p>
            </div>
          </div>
          {/* <p className="mt-4 text-sm">{report ? report.reportBody : ""}</p> */}
          <div className="flex flex-col gap-[3rem]">
            {report &&
              report.reportBody.map((body: any, index: number) => {
                return (
                  <div key={index}>
                    <p className="mt-4 text-sm">{body.paragraph}</p>
                    {body.attachment && (
                      <img
                        src={body.attachment}
                        alt="attachment_image"
                        className="w-[300px] mt-5 h-[300px] md:w-[600px] md:h-[500px] aspect-square object-fill mx-auto"
                      />
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {isOpen && (
        <DeleteReportModal
          onSubmit={handleDeleteReport}
          onCancel={handleCancelDelete}
        />
      )}

      <div className="mt-5">{/* <MostRead /> */}</div>
    </div>
  );
};

export default HawiltiReportBody;
