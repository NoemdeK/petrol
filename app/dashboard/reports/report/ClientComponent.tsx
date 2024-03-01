"use client";

import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import Report from "../Report";
import Link from "next/link";

import { useSession } from "next-auth/react";
import SkeletonContainer from "@/components/ui/skeleton";

const ClientComponent = () => {
  const { data: session } = useSession();
  const role = session && session.user.role;

  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");
  const [loading, setLoading] = useState(false);

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
        <div className="mt-4 flex justify-between items-center gap-[2rem]">
          <div className="flex items-center gap-1 text-xs">
            <p>View:</p>
            <button>Latest Reports</button>
            <button>Top Reports</button>
          </div>
          <div className="border border-[#0000004d] p-[0.25rem] rounded-[0.2rem] flex gap-1 items-center flex-1">
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
              className="bg-[#000000] px-4 rounded-md text-white text-xs h-[33px] flex items-center"
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
              <SkeletonContainer width="100%" height="130px" />
            ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4 mt-4">
          {reports.length > 0 ? (
            reports.map((report: any, i: number) => (
              <Link
                href={`/dashboard/reports/report/${report?.reportId}`}
                key={i}
              >
                <Report recent={false} report={report} />
              </Link>
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
    </div>
  );
};

export default ClientComponent;
