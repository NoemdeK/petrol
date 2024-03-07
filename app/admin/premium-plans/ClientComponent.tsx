"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import Plans from "./Plans";
import useCreatePricing from "@/lib/useCreatePricing";
import SubTable from "./SubTable";
import { usePathname, useRouter } from "next/navigation";

const ClientComponent = ({
  availablePlans,
  searchParams,
  activeSubscriptions,
  inactiveSubscriptions,
}: any) => {
  const { onOpen } = useCreatePricing();
  const params = new URLSearchParams(searchParams);
  console.log(inactiveSubscriptions, activeSubscriptions);
  const { replace } = useRouter();
  const pathname = usePathname();
  return (
    <div>
      <div className="h-[80px] w-full rounded bg-accent"></div>
      <Tabs defaultValue="available_plans">
        <div className="mt-4 w-full border rounded-lg p-[1rem]">
          <p className="font-medium">Premium Plans</p>
          <div className="mt-7 flex lg:justify-between flex-col lg:flex-row justify-start gap-[5rem]">
            <TabsList className="flex items-center gap-3 flex-col lg:flex-row mt-4 lg:mt-0 bg-transparent">
              <TabsTrigger value="available_plans" onClick={() => {}}>
                Available Plans
              </TabsTrigger>
              <TabsTrigger value="active_subs" onClick={() => {}}>
                Active Subscriptions
              </TabsTrigger>
              <TabsTrigger value="inactive_subs" onClick={() => {}}>
                Inactive Subscriptions
              </TabsTrigger>
            </TabsList>
            <button
              className="bg-[#000] text-white border border-[#0000001f] rounded-[5px] px-[0.6rem] py-[0.4rem] font-normal cursor-pointer text-[0.85rem] flex justify-center items-center"
              type="submit"
              disabled={false}
              onClick={() => {
                onOpen();
              }}
            >
              Create Premium Plan
            </button>
          </div>
        </div>
        <div className="mt-10">
          <TabsContent value="available_plans">
            <Plans availablePlans={availablePlans} />
          </TabsContent>
          <TabsContent
            value="active_subs"
            onClick={() => {
              params.set("flag", "active_subscriptions");
              replace(`${pathname}?${params.toString()}`);
            }}
          >
            <SubTable
              data={activeSubscriptions?.data?.result || []}
              searchParams={searchParams}
              value="active_subscriptions"
            />
          </TabsContent>
          <TabsContent
            value="inactive_subs"
            onClick={() => {
              params.set("flag", "inactive_subscriptions");
              replace(`${pathname}?${params.toString()}`);
              alert("hi");
            }}
          >
            <SubTable
              data={inactiveSubscriptions?.data?.result || []}
              searchParams={searchParams}
              value="active_subscriptions"
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default ClientComponent;
