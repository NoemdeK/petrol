import React from "react";
import ClientComponent from "./ClientComponent";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";

async function getPlans(token: string | undefined) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}api/v1/premium-plan/retrieve/available-plans`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
    }
  );
  const data = await response.json();
  return data;
}
async function getActiveSubscriptions(
  token: string | undefined,
  batch: any,
  limit: any
) {
  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_BASE_URL
    }api/v1/premium-plan/retrieve?flag=active_subscriptions&batch=${batch}&limit=${
      limit || 10
    }`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
    }
  );
  const data = await response.json();
  return data;
}
async function getInActiveSubscriptions(
  token: string | undefined,
  batch: any,
  limit: any
) {
  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_BASE_URL
    }api/v1/premium-plan/retrieve?flag=inactive_subscriptions&batch=${batch}&limit=${
      limit || 10
    }`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
    }
  );
  const data = await response.json();
  return data;
}

const page = async ({ searchParams }: any) => {
  const session = await getServerSession(authOptions);
  const token: string | undefined = session?.user.accessToken;
  const data = await getPlans(token);
  let flag = searchParams.flag;
  let batch = searchParams.batch;
  let limit = searchParams.limit;
  const activeSubscriptions = await getActiveSubscriptions(token, batch, limit);
  const inactiveSubscriptions = await getInActiveSubscriptions(
    token,
    batch,
    limit
  );

  return (
    <div>
      <ClientComponent
        availablePlans={data?.data}
        searchParams={searchParams}
        activeSubscriptions={activeSubscriptions}
        inactiveSubscriptions={inactiveSubscriptions}
      />
    </div>
  );
};

export default page;
