import React from "react";
import { RawDataTable } from "./RawdataTable";
import HeaderStat from "@/components/HeaderStat";

async function getData() {
  const res = await fetch(
    process.env.BACKEND_URL + "api/v1/petro-data/raw?batch=1"
  );
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    console.log("Failed to fetch data");
  }

  return res.json();
}

const Page = async () => {
  const data = await getData();

  const result = data.data.result;
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
      <RawDataTable data={result} />
    </div>
  );
};

export default Page;
