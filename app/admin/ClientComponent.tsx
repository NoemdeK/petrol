"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pending } from "./Pending";
import { Approved } from "./Approved";
import { Rejected } from "./Rejected";
import Filter from "@/components/Filter";
import useTab from "@/lib/useTab";
import { usePathname, useRouter } from "next/navigation";
import { PendingUser } from "./PendingUser";
import { ApprovedUser } from "./ApprovedUser";
import { RejectedUser } from "./RejectedUser";

interface ClientComponentProps {
  rejected: any[];
  approved: any[];
  pending: any[];
  searchParams: any;
}

const ClientComponent = ({
  rejected,
  approved,
  pending,
  searchParams,
}: ClientComponentProps) => {
  const { tab, setTab } = useTab();
  const pathname = usePathname();

  const { replace } = useRouter();

  const [currentBatch, setCurrentBatch] = React.useState(1);
  const params = new URLSearchParams(searchParams);

  const resetBatchAndChangeURL = () => {
    setCurrentBatch(1); // Reset the batch to 1
    params.set("batch", "1"); // Update batch parameter in URLSearchParams
    replace(`${pathname}?${params.toString()}`); // Replace URL with updated parameters
  };
  return (
    <div>
      <div>
        <h4 className="text-lg md:text-xl font-medium my-4">Field Data</h4>
      </div>
      <div className=" w-full ">
        <Tabs defaultValue={tab} className="w-full">
          <div className="flex flex-wrap justify-between flex-col md:flex-row gap-4 w-full p-2">
            <TabsList className="grid w-full max-w-[400px] grid-cols-3">
              <TabsTrigger
                value="pending"
                onClick={() => resetBatchAndChangeURL()}
              >
                Pending
              </TabsTrigger>
              <TabsTrigger
                value="approved"
                onClick={() => resetBatchAndChangeURL()}
              >
                Approved
              </TabsTrigger>
              <TabsTrigger
                value="rejected"
                onClick={() => resetBatchAndChangeURL()}
              >
                Rejected
              </TabsTrigger>
            </TabsList>
            <Filter />
          </div>

          <TabsContent value="pending">
            <Pending
              data={pending}
              searchParams={searchParams}
              currentBatch={currentBatch}
              setCurrentBatch={setCurrentBatch}
            />
          </TabsContent>
          <TabsContent value="approved">
            <Approved
              data={approved}
              searchParams={searchParams}
              currentBatch={currentBatch}
              setCurrentBatch={setCurrentBatch}
            />
          </TabsContent>
          <TabsContent value="rejected">
            <Rejected
              data={rejected}
              searchParams={searchParams}
              currentBatch={currentBatch}
              setCurrentBatch={setCurrentBatch}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ClientComponent;
