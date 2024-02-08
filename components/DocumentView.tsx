"use client";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import useDocumentView from "@/lib/useDocumentView";

export function DocumentView() {
  const { isOpen, onClose, data, setData } = useDocumentView();
  const [docs, setDocs] = useState<Array<any>>([]);

  if (!data) {
    return null;
  }

  useEffect(() => {
    setDocs(data?.data);
  }, [data]);

  const closeIt = () => {
    onClose();
  };

  return (
    <Sheet onOpenChange={onClose} open={isOpen} defaultOpen={isOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>View Document</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="flex items-center justify-center my-8 h-[70vh] gap-4 py-4 overflow-y-scroll">
          {typeof data?.data === "string" ? (
            <div className="w-full h-96">
              <img src={data?.data} alt="" className="object-contain" />
            </div>
          ) : (
            <div className="grid grid-cols-1">
              {data &&
                data?.data?.map((item: any, idx: any) => (
                  <img
                    src={item}
                    alt=""
                    className="object-contain"
                    key={`doc${idx}`}
                  />
                ))}
            </div>
          )}
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit" onClick={closeIt}>
              Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
