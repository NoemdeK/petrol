"use client";

import { Badge } from "@/components/ui/badge";
import urlFor from "@/sanity/lib/urlFor";
import axios from "axios";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";

import React, { useEffect, useState } from "react";

const News = ({ posts, other }: any) => {
  if (!posts || posts.length < 1) {
    return (
      <div className="m-6 w-full overflow-hidden">
        <p className="text-center font-medium">No posts available</p>
      </div>
    );
  }
  console.log(posts);
  return (
    <div className="space-y-4">
      {other?.map((item: any, i: number) => (
        <div
          key={`${item.title}-${i}`}
          className="flex  flex-col md:flex-row items-center gap-2 cursor-pointer rounded-md transition-all hover:scale-95 bg-muted p-1"
        >
          <div className="bg-muted md:w-32 md:h-32 h-40 w-full flex items-center">
            <img
              alt={item.title}
              className={`object-cover object-center h-full w-full hover:opacity-80 `}
              height={128}
              src={item.image}
              width={128}
            />
          </div>
          <div className="w-full space-y-0.5 py-2 md:py-0 px-3 md:px-0">
            <a
              href={item.url}
              target="_blank"
              className="text-sm font-semibold hover:underline"
            >
              {item?.title}
            </a>

            <p className="text-xs font-medium text-accent-foreground"></p>

            <p className="text-[10px]">{item?.description}</p>
            <div className="flex gap-2">
              <p className="text-xs">
                <strong>Source</strong> : {item?.source.name || "Noemdek"}
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
          <div className="bg-muted md:w-32 md:h-32 h-40 w-full flex items-center">
            <Image
              alt={item.title}
              className={`object-cover object-center h-full w-full `}
              height={128}
              src={urlFor(item?.mainImage).url()}
              width={128}
            />
          </div>
          <div className="w-full space-y-0.5 py-2 md:py-0">
            <h4 className="text-sm font-semibold">{item?.title}</h4>

            <p className="text-xs font-medium text-accent-foreground">
              {format(new Date(item.publishedAt), "dd MMMM, yyyy.")}
            </p>

            <p className="text-[10px]">{item?.description}</p>
            <div className="flex gap-2">
              <p className="text-xs">
                <strong>Source</strong> : {item?.source || "Noemdek"}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default News;
