"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import Plans from "./Plans";
import useCreatePricing from "@/lib/useCreatePricing";

const ClientComponent = () => {
  const { onOpen } = useCreatePricing();
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
            <Plans />
          </TabsContent>
          <TabsContent value="active_subs">
            <p>active</p>
          </TabsContent>
          <TabsContent value="inactive_subs">
            <p>inactive</p>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default ClientComponent;
