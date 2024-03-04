import MainPeriod from "@/components/MainPeriod";
import PMStest from "@/components/PMStest";
import React from "react";
import ClientComponent from "./ClientComponent";
import LPG from "@/components/LPG";
import AGO from "@/components/AGO";
import DPK from "@/components/DPK";
import ICE from "@/components/ICE";
import { Separator } from "@/components/ui/separator";
import News from "../News";

import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";

async function getAnalytics(params: string | undefined, search: string) {
  let product = "PMS"; // Default value for product if params is undefined or invalid

  if (
    params !== undefined &&
    ["PMS", "LPG", "ICE", "DPK", "AGO"].includes(params)
  ) {
    product = params;
  }

  let periodParam = "";

  if (
    search === undefined ||
    !["1W", "1M", "MAX", "1Y", "YTD", "3M", "6M", "5Y", "MAX"].includes(search)
  ) {
    periodParam = "?period=1W"; // Default to 'MAX' if undefined or invalid search value
  } else {
    periodParam = `?period=${search}`;
  }
  try {
    const regions = [
      "National",
      "North East",
      "North West",
      "South South",
      "South West",
      "South East",
      "North Central",
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

    const response = await fetch(`${url}${periodParam}`, requestOptions);
    // console.log(response.json()), "repso"
    const result = await response.json();

    return result.data;
  } catch (error: any) {
    console.error("Error:", error.message);
    return [];
  }
}

async function getData() {
  try {
    const res = await fetch(
      process.env.BACKEND_URL +
        "api/v1/petro-data/analysis/price-percentage-change"
    );
    return res.json();
  } catch (error: any) {
    console.log(error);
  }
}

async function getDataNews(product: string) {
  try {
    const res = await fetch(
      process.env.BACKEND_URL +
        `api/v1/petro-data/analysis/projections?flag=${
          product || "PMS"
        }&page=1`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjU3Yzc2YjhmMGVjOTgzMGZhODJlYTY4Iiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzAyOTg2MjgwfQ.-cCnAO9oHGC7HkQWswONWVNcGbn0VUozPE2mVIOuuto`,
        },
        method: "GET",
      }
    );
    // console.log(await res.json());
    return await res.json();
  } catch (error: any) {
    console.log(error);
  }
}

const query = groq`
  *[_type=="post"] {
    ...,
 
  } 
`;

const fetchPosts = async () => {
  try {
    const posts = await client.fetch(query);
    // Handle the fetched posts data
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return null;
  }
};

export const revalidate = 0;

const Productpage = async ({ params, searchParams }: any) => {
  const posts = await fetchPosts();
  const news = await getDataNews(params.product);

  console.log(news);

  const main = await getAnalytics(
    `${params.product}`,
    `${searchParams.period}`
  );
  const dataa = await getData();

  const data = main.analysis;

  const result = dataa;

  let selectedComponent;

  switch (params.product) {
    case "LPG":
      selectedComponent = <LPG resData={data} />;
      break;
    case "PMS":
      selectedComponent = <PMStest resData={data} />;
      break;
    case "AGO":
      selectedComponent = <AGO resData={data} />;
      break;
    case "DPK":
      selectedComponent = <DPK resData={data} />;
      break;
    case "ICE":
      selectedComponent = <ICE resData={data} />;
      break;
    default:
      selectedComponent = <PMStest data={data} />; // Handle the case when product doesn't match any known type
  }

  return (
    <div>
      <div className="md:pb-4  h-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 w-full gap-4  md:gap-12 flex-1 p-2 md:py-4">
          <div className="flex flex-col flex-1 w-full lg:col-span-8 ">
            <ClientComponent
              stats={result}
              page={params?.product}
              overall={main?.overallPriceChange}
              recent={main?.recentPriceChange}
            />

            <MainPeriod page={params.product} />

            <div className=" pb-2 md:pb-4">{selectedComponent}</div>
          </div>
          <div className="lg:col-span-4 w-full lg:h-[65vh] overflow-y-scroll scroll">
            <div className=" flex items-center">
              <h4 className="h-[70px] text-sm md:text-base font-semibold flex items-end">
                Analysis & Projections
              </h4>
            </div>
            <Separator className="h-[1px] my-1" />
            <div className="">
              <News
                news={params?.product}
                posts={posts}
                other={news?.data?.data}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productpage;
