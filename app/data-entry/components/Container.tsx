"use client";
import * as z from "zod";

import { UploadClient, formSchema } from "@/components/UploadClient";
import React, { useState } from "react";
import { Batch } from "./Batch";
import { useBatchStore } from "@/lib/useBatch";
import { Button } from "@/components/ui/button";

const Container = () => {
  const [batchData, setBatchData] = useState<z.infer<typeof formSchema>[]>([]);
  // const { batchData, setBatchData } = useBatchStore()

  return (
    <div>
      {batchData.length > 0 && (
        <>
          <Batch data={batchData} setBatchData={setBatchData} />
        </>
      )}

      <UploadClient batchData={batchData} setBatchData={setBatchData} />
    </div>
  );
};

export default Container;
