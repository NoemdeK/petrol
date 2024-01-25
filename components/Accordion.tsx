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
import { Button } from "./ui/button"
import { ArrowUpRight } from "lucide-react"

  export function AccordionDemo() {
    return (
      <Accordion type="single" collapsible className="w-full h-full text-black">
        <AccordionItem value="item-1" className="text-black">
          <AccordionTrigger>
            <div className="flex gap-4 flex-col ">
              <div className="w-32">
                <Image src={petrologo} alt="petrodata-logo" width={150} height={100} className="object-contain w-full" />
              </div>
              <div className="text-left flex flex-col gap-2">
              <p className="text-xs md:text-sm">
                Offers real-time data analytics and visualization tools for the petroleum sector. Users can access comprehensive information on production rates, market trends, and prices. The app also includes analytics for better decision-making.
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
                <p className="text-xs md:text-sm">
                Professional due diligence and KYC verification for African vendors and high-profile individuals. Elevate business integrity with advanced algorithms, real-time monitoring, and regulatory compliance assurance.
                </p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div>
              <a href="https://recordsclient.vercel.app/auth/login" target="_blank" className="flex items-center gap-4">
                Login   <ArrowUpRight size={16} />
              </a>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  }
  