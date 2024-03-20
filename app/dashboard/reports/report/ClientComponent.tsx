"use client";

import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import Report from "../Report";
import Link from "next/link";
import { useSession } from "next-auth/react";
import SkeletonContainer from "@/components/ui/skeleton";
import { DeleteReportModal } from "@/components/DeleteReport";
import useDeleteReport from "@/lib/useDeleteReport";
import { toast } from "@/components/ui/use-toast";
import coverBg from "@/assets/rCover.png";
import Image from "next/image";

const ClientComponent = () => {
  const { data: session } = useSession();
  const role = session && session.user.role;

  const [reports, setReports] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");
  const [loading, setLoading] = useState(true);
  const { isOpen, id, onClose, setId } = useDeleteReport();
  const [flag, setFlag] = useState<string>("latest_reports");

  const fetchReports = async () => {
    const token = session && session.user.accessToken;
    setLoading(true);
    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_BASE_URL
        }api/v1/research-report/retrieve?flag=${flag}&limit=5&search=${
          debounced || ""
        }`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          method: "GET",
        }
      );

      const data = await response.json();

      console.log(data);
      setLoading(false);
      setReports(data?.data.result);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleDeleteReport = async () => {
    const token = session && session.user.accessToken;
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/v1/research-report/delete?reportId=${id}`,
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
        fetchReports();
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
    setId("");
    onClose();
  };

  useEffect(() => {
    setTimeout(() => {
      fetchReports();
    }, 1000);
  }, [session, debounced, flag]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(search);
    }, 1000);
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div>
      <div className="border border-[#0000001F] p-4 rounded-md relative bg-reports-cover w-full h-[250px] md:h-[150px] bg-cover bg-center bg-no-repeat">
        <div>
          <Image
            src={coverBg}
            alt="cover_background"
            className="absolute left-0 w-full h-[250px] md:h-[150px] top-0 rounded-md object-cover"
          />
        </div>
        <div className="absolute w-full md:h-[150px] left-0 top-0 p-4 grid grid-rows-2">
          <h3 className="text-sm font-semibold">Research & Reports</h3>
          <div className="mt-1 lg:mt-4 flex flex-col md:flex-row justify-between items-center gap-[0.6rem] md:gap-[2rem]">
            <div className="flex items-center gap-1 text-xs md:flex-1 w-full">
              <p>View:</p>
              <button
                className={
                  flag === "latest_reports" ? `underline leading-relaxed` : ""
                }
                onClick={() => setFlag("latest_reports")}
              >
                Latest Reports
              </button>
              <button
                className={
                  flag === "top_reports" ? `underline leading-relaxed` : ""
                }
                onClick={() => setFlag("top_reports")}
              >
                Top Reports
              </button>
            </div>
            <div className="border border-[#0000004d] p-[0.25rem] rounded-[0.2rem] flex gap-1 items-center  lg:flex-1 w-full md:w-[250px] bg-[#fff]">
              <Search className="text-tremor-background-emphasis" size={12} />
              <input
                type="text"
                placeholder="Search Tags. E.g., AGO, Petrol"
                className="text-sm text-[#000] flex-1 h-[25px] outline-none placeholder:text-xs bg-[#fff]"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            {role === "rwx_admin" && (
              <Link
                href="/dashboard/reports/create-report"
                className="bg-accent hover:bg-[accent] px-4 rounded-md text-xs h-[33px] flex items-center justify-center w-full md:w-[150px]"
              >
                Add New Report
              </Link>
            )}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="mt-4 flex-col flex gap-4">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <SkeletonContainer key={i} width="100%" height="190px" />
            ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4 mt-8">
          {reports?.length > 0 ? (
            reports?.map((report: any, i: number) => (
              <Report recent={false} report={report} key={i} />
            ))
          ) : (
            <div className="justify-center flex mt-8">
              <p className="font-medium text-[#666666]">
                {flag === "latest_reports"
                  ? "There are no latest reports for now"
                  : " There are no top reports for now"}
              </p>
            </div>
          )}
        </div>
      )}

      {isOpen && (
        <DeleteReportModal
          onSubmit={handleDeleteReport}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default ClientComponent;
