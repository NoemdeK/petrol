"use client";

import React, { useEffect, useState } from "react";
import arrowBack from "@/assets/icons/arrow_back.svg";
import Link from "next/link";
import Image from "next/image";
import report from "@/assets/report.svg";
import { useSession } from "next-auth/react";
import { toast } from "@/components/ui/use-toast";
import { useParams } from "next/navigation";
import { format } from "date-fns";
import SkeletonContainer from "@/components/ui/skeleton";
import MostRead from "../../MostRead";
import { useRouter } from "next/navigation";
import { DeleteReportModal } from "@/components/DeleteReport";
import useDeleteReport from "@/lib/useDeleteReport";

const ClientComponent = () => {
  const { data: session } = useSession();
  const [report, setReport] = useState<any>();
  const [loading, setLoading] = useState(false);
  const { report: reportId } = useParams();
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDeleteReport();
  const token = session && session.user.accessToken;

  const fetchReport = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/v1/research-report/view?reportId=${reportId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          method: "GET",
        }
      );

      const data = await response.json();

      setLoading(false);

      if (response.status === 200) {
        setReport(data?.data);
      } else if (response.status === 401) {
        console.log("getting access");
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

  useEffect(() => {
    fetchReport();
  }, [session]);

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

  console.log(report);

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
            src={report ? report.headlinePicture : ""}
            alt="report"
            width={500}
            height={500}
            className="w-full"
          />

          <h3 className="text-[1.5rem] font-medium mt-4 leading-tight">
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
          <p className="mt-4 text-sm">{report ? report.reportBody : ""}</p>
        </div>
      )}

      {session && session.user.role === "rwx_admin" && (
        <div className="mt-3">
          <button
            onClick={() => {
              onOpen();
            }}
            className="bg-red-500 text-white w-[130px] h-[40px] rounded"
          >
            Delete
          </button>
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

export default ClientComponent;
