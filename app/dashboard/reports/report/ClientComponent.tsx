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

const ClientComponent = () => {
  const { data: session } = useSession();
  const role = session && session.user.role;

  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");
  const [loading, setLoading] = useState(false);
  const { isOpen, id, onClose, setId } = useDeleteReport();

  const fetchReports = async () => {
    const token = session && session.user.accessToken;
    setLoading(true);
    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_BASE_URL
        }api/v1/research-report/retrieve?flag=latest_reports&limit=5&search=${
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
      setLoading(false);
      setReports(data?.data.result);
      console.log(data);
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
  }, [session, debounced]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(search);
    }, 1000);
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div>
      <div className="border border-[#0000001F] p-4 rounded-md">
        <h3 className="text-sm font-medium">Research & Reports</h3>
        <div className="mt-4 flex flex-col md:flex-row justify-between items-center gap-[0.6rem] md:gap-[2rem]">
          <div className="flex items-center gap-1 text-xs md:flex-1 w-full">
            <p>View:</p>
            <button>Latest Reports</button>
            <button>Top Reports</button>
          </div>
          <div className="border border-[#0000004d] p-[0.25rem] rounded-[0.2rem] flex gap-1 items-center  lg:flex-1 w-full md:w-[250px]">
            <Search color="#00000099" size={12} />
            <input
              type="text"
              placeholder="Search Tags. E.g., AGO, Petrol"
              className="text-sm text-[#00000099] flex-1 h-[25px] outline-none placeholder:text-xs"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {role === "rwx_admin" && (
            <Link
              href="/dashboard/reports/create-report"
              className="bg-[#000000] px-4 rounded-md text-white text-xs h-[33px] flex items-center justify-center w-full md:w-[150px]"
            >
              Add New Report
            </Link>
          )}
        </div>
      </div>

      {loading ? (
        <div className="mt-4 flex-col flex gap-4">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <SkeletonContainer key={i} width="100%" height="130px" />
            ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4 mt-4">
          {reports?.length > 0 ? (
            reports?.map((report: any, i: number) => (
              <Report recent={false} report={report} key={i} />
            ))
          ) : (
            <div className="justify-center flex mt-8">
              <p className="font-medium text-[#666666]">
                There are no reports for now
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
