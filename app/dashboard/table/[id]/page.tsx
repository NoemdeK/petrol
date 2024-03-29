import React from "react";
import { RawDataTable } from "@/app/dashboard/raw-data/RawdataTable";
import { toast } from "@/components/ui/use-toast";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";

async function getData(id: number, token: any) {
  const res = await fetch(
    process.env.BACKEND_URL + `api/v1/petro-data/raw?batch=${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    console.log("Failed to fetch data");
  }

  return await res.json();
}

async function getAnalytics() {
  try {
    const product = "LPG";
    const regions = [
      "NORTH EAST",
      "NORTH WEST",
      "SOUTH SOUTH",
      "SOUTH WEST",
      "SOUTH EAST",
      "NORTH CENTRAL",
    ];

    const url =
      "https://petrodata.zainnovations.com/api/v1/petro-data/analysis";
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    // headers.append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTc4N2QzMTI1NWIxYTA1ZGZhZDQ4MTIiLCJyb2xlIjoicnd4X3VzZXIiLCJpYXQiOjE3MDIzOTUyMDF9.iZXOHmjSEBIG-kBJscRKMCd9WpZZEdRXGzN7_yDxTIg');

    const requestOptions = {
      method: "POST",
      headers,
      body: JSON.stringify({
        product,
        regions,
      }),
    };

    const response = await fetch(`${url}?period=MAX`, requestOptions);
    // console.log(response.json()), "repso"
    const result = await response.json();

    return result.data;
  } catch (error: any) {
    console.error("Error:", error.message);
    toast({
      title: "An error has occured",
      description: `${error?.response?.data?.message || "Cannot fetch data"}`,
      variant: "destructive",
    });
  }
}

const Page = async ({ params }: any) => {
  const dassd = await getAnalytics();
  const session = await getServerSession(authOptions);
  const token = session && session.user.accessToken;

  const data = await getData(params.id, token);

  const page = parseInt(params.id, 10);

  const result = data.data?.result;
  return (
    <div>
      <div className="my-4">
        <h4 className="font-bold text-black opacity-50 text-xl">
          Data Repository
        </h4>
        <p className=" opacity-50 text-lg">
          Find statistics on crude oil, gasoline, diesel, propane, jet fuel,
          etc.. Click below to download, graph and track current and historical
          information on petroleum prices, stocks, and consumption/sales. Or use
          our flexi export tool to create your own data series
        </p>
      </div>
      <RawDataTable data={result ? result : []} page={page} />
    </div>
  );
};

export default Page;
