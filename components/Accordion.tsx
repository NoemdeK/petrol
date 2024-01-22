"use client"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  
import petrologo from "@/assets/image.svg"
import record from "@/assets/records_type_logo-03293050.svg.png"
import Image from "next/image"
import AccordLogin from "./AccordLogin"

  export function AccordionDemo() {
    return (
      <Accordion type="single" collapsible className="w-full text-black">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <div className="flex gap-4 sm:gap-8 md:gap-12">
              <div>
                <Image src={petrologo} alt="petrodata-logo" width={100} height={75} className="object-contain" />
              </div>
              <div className="text-left flex flex-col gap-4">
                <h4 className="text-sm">
                  Petro-data Application
                </h4>
                <p className="text-xs">
                  This is a short description of the PetroData application.
                </p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <AccordLogin />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            <div className="flex gap-4 sm:gap-8 md:gap-12">
              <div>
              <Image src={record} width={100} alt="record-logo" height={75} className="object-contain" />
              </div>
              <div className="text-left flex flex-col gap-4">
                <h4 className="text-sm">
                  Records Application
                </h4>
                <p className="text-xs">
                This is a short description of the Records application.
                </p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <AccordLogin />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  }
  