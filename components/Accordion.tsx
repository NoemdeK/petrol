"use client"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  
import petrologo from "@/assets/image.svg"
import record from "@/assets/records_type_logo-03293050.svg.svg"
import Image from "next/image"
import AccordLogin from "./AccordLogin"

  export function AccordionDemo() {
    return (
      <Accordion type="single" collapsible className="w-full text-black">
        <AccordionItem value="item-1" className="text-black">
          <AccordionTrigger>
            <div className="flex gap-4 flex-col ">
              <div className="w-32">
                <Image src={petrologo} alt="petrodata-logo" width={150} height={100} className="object-contain w-full" />
              </div>
              <div className="text-left flex flex-col gap-2">
                <p className="text-xs">
                  Offers real-time data analytics and visulaization tools for the petroluem sector. Users
                  can access the comprhensive information on production rates, market trends, and prices. The app also includes analytics for better 
                  decision-making.
                </p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <AccordLogin />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2" className="text-black">
          <AccordionTrigger>
          <div className="flex gap-4 flex-col">
            <div className="w-32">
              <Image src={record} width={150} alt="record-logo" height={100} className="object-contain w-full" />
              </div>
              <div className="text-left flex flex-col gap-2">
                <p className="text-xs">
                This is a short description of the Records application.
                </p>
                <p className="text-xs opacity-0">
                  Offers real-time data analytics and visulaization tools for the petroluem sector. Users
                  can access the comprhensive information on production rates, market trends, and prices. The app also includes analytics for better 
                  decision-making.
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
  