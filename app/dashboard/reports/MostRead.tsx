"use client";

import React from "react";
import Report from "./Report";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import SkeletonContainer from "@/components/ui/skeleton";

const MostRead = () => {
  const { data: session } = useSession();
  const role = session && session.user.role;

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMostReadReports = async () => {
    const token = session && session.user.accessToken;
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/v1/research-report/retrieve?flag=most_read_reports&limit=3`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          method: "GET",
        }
      );

      const data = await response.json();
      setReports(data?.data.result);
      setLoading(false);
      console.log(data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fetchMostReadReports();
    }, 1000);
  }, [session]);
  return (
    <div className="border border-[#E0E0E0] p-4 rounded-md">
      <h3 className="text-sm font-medium">Most Read</h3>
      {loading ? (
        <div className="mt-4 flex-col flex gap-4">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <SkeletonContainer width="100%" height="100px" />
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
                <Report recent={true} report={report} />
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

export default MostRead;
