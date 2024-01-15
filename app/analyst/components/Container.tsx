"use client"
import * as z from "zod"

import {  formSchema } from '@/components/UploadClient';
import {  UploadClientIce } from '@/components/UploadClientIce';
import React, { useState } from 'react'
import { Batch } from "./Batch";
import { useBatchStore } from "@/lib/useBatch";
import { Button } from "@/components/ui/button";

const Container = () => {
    const [batchData, setBatchData] = useState<z.infer<typeof formSchema>[]>([]);
    // const { batchData, setBatchData } = useBatchStore()

  return (
    <div>


      <UploadClientIce batchData={batchData} setBatchData={setBatchData} />
    </div>
  )
}

export default Container