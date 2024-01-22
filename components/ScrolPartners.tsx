import * as React from "react"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"

import enterscale from "@/assets/logo 1.svg"
import kira from "@/assets/Kian_Smith 1.svg"
import madison from "@/assets/Madisonpark-Logo-2-reviewed-2v 1.svg"
import gacn from "@/assets/logo3.ea68878976beba677b68cf7c4c316514 1.svg"
import keramide from "@/assets/KERAMIDA-logo 1.svg"

export function ScrollPartners() {
  return (
    <ScrollArea className="max-w-7xl">
      <div className="p-4 flex flex-row gap-4 sm:gap-5 md:gap-8 items-center justify-between">
        {[enterscale, kira, madison, gacn, keramide].map((tag, i) => (
          <>
            <div key={i} className="w-52">
              <Image src={tag} alt="partners" width={150} height={68} className="object-contain" /> 
            </div>
          </>
        ))}
      </div>
    </ScrollArea>
  )
}
