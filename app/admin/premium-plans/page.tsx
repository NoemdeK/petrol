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

const page = async () => {
  const session = await getServerSession(authOptions);
  const token: string | undefined = session?.user.accessToken;
  const data = await getPlans(token);

  return (
    <div>
      <ClientComponent availablePlans={data?.data} />
    </div>
  );
};

export default page;
