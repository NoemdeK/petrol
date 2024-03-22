"use client";

import { Badge } from "@/components/ui/badge";
import urlFor from "@/sanity/lib/urlFor";
import axios from "axios";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";
import newsFallback from "../../../assets/news-fb.png";
import React, { useEffect, useState } from "react";
import crudebent from "@/assets/projections images/crudebent.png";
import fuelpump from "@/assets/projections images/fuelpump.png";
import gasplant from "@/assets/projections images/gasplant.png";
import oilcash from "@/assets/projections images/oilcash.png";
import pipeline from "@/assets/projections images/pipeline.png";
import { match } from "path-to-regexp";

const News = ({ posts, other }: any) => {
  // if (!posts || posts.length < 1) {
  //   return (
  //     <div className="m-6 w-full overflow-hidden">
  //       <p className="text-center font-medium">No posts available</p>
  //     </div>
  //   );
  // }

  interface KeywordImageMap {
    [key: string]: any;
  }

  function articleImageHandler(title: string, article: string): any {
    // Define a mapping of keywords to image URLs
    const keywordImageMap: Record<string, any> = {
      "crude oil": crudebent,
      fuel: fuelpump,
      oil: oilcash,
      gas: gasplant,
      kerosene: oilcash,
      "gas plant": gasplant,
      brent: crudebent,
      dpk: pipeline,
      lpg: gasplant,
      ago: oilcash,
      ice: crudebent,
      pms: fuelpump,
      petroleum: fuelpump,
      petrol: fuelpump,
    };

    // Combine title and article for searching
    const text = (title + " " + article).toLowerCase();

    // Iterate through keywords and return image URL if found
    for (const keyword in keywordImageMap) {
      if (text.includes(keyword)) {
        return keywordImageMap[keyword];
      }
    }

    // Fallback image if no keywords found
    return gasplant;
  }

  console.log(articleImageHandler("gas plant", "gas plant"));

  return (
    <div className="space-y-4">
      {other?.map((item: any, i: number) => (
        <div
          key={`${item.title}-${i}`}
          className="flex  flex-col md:flex-row items-center gap-2 cursor-pointer rounded-md transition-all hover:scale-95 bg-muted p-1"
        >
          <div className="bg-muted md:w-40 md:h-32 h-40 w-full flex items-center">
            <Image
              alt={item.title}
              className={`object-cover object-center h-full w-full hover:opacity-80`}
              height={500}
              src={articleImageHandler(item?.title, item?.description)}
              width={500}
            />
          </div>
          <div className="w-full space-y-0.5 py-2 md:py-0 px-3 md:px-0">
            <a
              href={item.url}
              target="_blank"
              className="text-sm font-semibold hover:underline leading-snug"
            >
              {item?.title}
            </a>

            <p className="text-xs font-medium text-accent-foreground"></p>

            <p className="text-[0.8em] lg:text-[0.9vw]">{`${item?.description.substring(
              0,
              80
            )}...`}</p>
            <div className="flex gap-2">
              <p className="text-xs">
                <strong>Source</strong> :{" "}
                {item?.source.charAt(0).toUpperCase() + item?.source.slice(1) ||
                  "Noemdek"}
              </p>
            </div>
          </div>
        </div>
      ))}

      {posts.map((item: any, i: number) => (
        <div
          key={`${item.slug}-${i}`}
          className="flex  flex-col md:flex-row items-center gap-2 cursor-pointer rounded-md transition-all hover:scale-95 bg-muted p-1"
        >
          <div className="bg-muted md:w-40 md:h-32 h-40 w-full flex items-center">
            <Image
              alt={item.title}
              className={`object-cover object-center h-full w-full `}
              height={500}
              src={urlFor(item?.mainImage).url()}
              width={500}
            />
          </div>
          <div className="w-full space-y-0.5 py-2 md:py-0">
            <a
              className="text-sm font-semibold"
              href={item.source}
              target="_blank"
            >
              {item?.title}
            </a>
            {/* 
            <p className="text-xs font-medium text-accent-foreground">
              {format(new Date(item.publishedAt), "dd MMMM, yyyy.")}
            </p> */}

            <p className="text-[0.8em] lg:text-[0.9vw]">{item?.description}</p>
            <div className="flex gap-2">
              <p className="text-xs">
                <strong>Source</strong> : {item?.author || "Diophalytics"}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default News;
