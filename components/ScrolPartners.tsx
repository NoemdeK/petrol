"use client";
import * as React from "react";

// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Separator } from "@/components/ui/separator";
import Image from "next/image";

import enterscale from "@/assets/logo 1.svg";
import kira from "@/assets/Kian_Smith 1.svg";
// import madison from "@/assets/Madisonpark-L/ogo-2-reviewed-2v 1.svg";
import gacn from "@/assets/logo3.ea68878976beba677b68cf7c4c316514 1.svg";
import keramide from "@/assets/KERAMIDA-logo 1.svg";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

export function ScrollPartners() {
  return (
    <Swiper spaceBetween={50} slidesPerView={"auto"}>
      <SwiperSlide className="">
        <div className="w-36 md:w-44 mx-4">
          <Image
            src={enterscale}
            alt="partners"
            width={150}
            height={68}
            className="object-contain"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide className="">
        <div className="w-36 md:w-44 mx-4">
          <Image
            src={kira}
            alt="partners"
            width={150}
            height={68}
            className="object-contain"
          />
        </div>
      </SwiperSlide>
      {/* <SwiperSlide  className="w-auto">
       <div  className="w-36 md:w-44 mx-4">
         <Image src={madison} alt="partners" width={150} height={68} className="object-contain" /> 
       </div>
      </SwiperSlide> */}
      <SwiperSlide className="">
        <div className="w-36 md:w-44 mx-4">
          <Image
            src={gacn}
            alt="partners"
            width={150}
            height={68}
            className="object-contain"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide className="">
        <div className="w-36 md:w-44 mx-4">
          <Image
            src={keramide}
            alt="partners"
            width={150}
            height={68}
            className="object-contain"
          />
        </div>
      </SwiperSlide>
    </Swiper>
    //   <div className="grid grid-cols-5  overflow-x-auto">
    //   {[enterscale, kira, madison, gacn, keramide].map((tag, i) => (
    //     <div key={i} className="w-52 mx-4">
    //       <Image src={tag} alt="partners" width={150} height={68} className="object-contain" />
    //     </div>
    //   ))}
    // </div>
  );
}
