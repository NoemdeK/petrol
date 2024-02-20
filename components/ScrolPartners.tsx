// "use client";
// import * as React from "react";

// // import { ScrollArea } from "@/components/ui/scroll-area";
// // import { Separator } from "@/components/ui/separator";
// import Image from "next/image";

// import enterscale from "@/assets/logo 1.svg";
// import kira from "@/assets/Kian_Smith 1.svg";
// // import madison from "@/assets/Madisonpark-L/ogo-2-reviewed-2v 1.svg";
// import gacn from "@/assets/logo3.ea68878976beba677b68cf7c4c316514 1.svg";
// import keramide from "@/assets/KERAMIDA-logo 1.svg";

// import { Swiper, SwiperSlide } from "swiper/react";

// // Import Swiper styles
// import "swiper/css";

// export function ScrollPartners() {
//   return (
//     <Swiper spaceBetween={50} slidesPerView={"auto"}>
//       <SwiperSlide className="">
//         <div className="w-36 md:w-44 mx-4">
//           <Image
//             src={enterscale}
//             alt="partners"
//             width={150}
//             height={68}
//             className="object-contain"
//           />
//         </div>
//       </SwiperSlide>
//       <SwiperSlide className="">
//         <div className="w-36 md:w-44 mx-4">
//           <Image
//             src={kira}
//             alt="partners"
//             width={150}
//             height={68}
//             className="object-contain"
//           />
//         </div>
//       </SwiperSlide>
//       {/* <SwiperSlide  className="w-auto">
//        <div  className="w-36 md:w-44 mx-4">
//          <Image src={madison} alt="partners" width={150} height={68} className="object-contain" />
//        </div>
//       </SwiperSlide> */}
//       <SwiperSlide className="">
//         <div className="w-36 md:w-44 mx-4">
//           <Image
//             src={gacn}
//             alt="partners"
//             width={150}
//             height={68}
//             className="object-contain"
//           />
//         </div>
//       </SwiperSlide>
//       <SwiperSlide className="">
//         <div className="w-36 md:w-44 mx-4">
//           <Image
//             src={keramide}
//             alt="partners"
//             width={150}
//             height={68}
//             className="object-contain"
//           />
//         </div>
//       </SwiperSlide>
//     </Swiper>
//     //   <div className="grid grid-cols-5  overflow-x-auto">
//     //   {[enterscale, kira, madison, gacn, keramide].map((tag, i) => (
//     //     <div key={i} className="w-52 mx-4">
//     //       <Image src={tag} alt="partners" width={150} height={68} className="object-contain" />
//     //     </div>
//     //   ))}
//     // </div>
//   );
// }

import React from "react";
import styled from "styled-components";
import Image from "next/image";
import enterscale from "@/assets/logo 1.svg";
import kira from "@/assets/Kian_Smith 1.svg";
import hawiti from "@/assets/hawiti.svg";
import applied from "@/assets/applied.svg";
import flutterwave from "@/assets/flutterwave.svg";
// import madison from "@/assets/Madisonpark-L/ogo-2-reviewed-2v 1.svg";
import gacn from "@/assets/logo3.ea68878976beba677b68cf7c4c316514 1.svg";
import keramide from "@/assets/KERAMIDA-logo 1.svg";

export const ScrollPartners = () => {
  return (
    <Wrapper>
      <div className="partners">
        <div className="marquee">
          <div className="exts">
            <div className="flex1">
              <Image
                src={enterscale}
                alt=""
                width={150}
                height={68}
                className="object-contain"
              />
              <Image
                src={kira}
                alt=""
                width={150}
                height={68}
                className="object-contain"
              />
              <Image
                src={gacn}
                alt=""
                width={150}
                height={68}
                className="object-contain"
              />
              <Image
                src={keramide}
                alt=""
                width={150}
                height={68}
                className="object-contain"
              />
              <Image
                src={hawiti}
                alt=""
                width={150}
                height={68}
                className="object-contain"
              />
              <Image
                src={applied}
                alt=""
                width={150}
                height={68}
                className="object-contain"
              />
              <Image
                src={flutterwave}
                alt=""
                width={150}
                height={68}
                className="object-contain"
              />
            </div>
            <div className="flex1">
              <Image
                src={enterscale}
                alt=""
                width={150}
                height={68}
                className="object-contain"
              />
              <Image
                src={kira}
                alt=""
                width={150}
                height={68}
                className="object-contain"
              />
              <Image
                src={gacn}
                alt=""
                width={150}
                height={68}
                className="object-contain"
              />
              <Image
                src={keramide}
                alt=""
                width={150}
                height={68}
                className="object-contain"
              />
              <Image
                src={hawiti}
                alt=""
                width={150}
                height={68}
                className="object-contain"
              />
              <Image
                src={applied}
                alt=""
                width={150}
                height={68}
                className="object-contain"
              />
              <Image
                src={flutterwave}
                alt=""
                width={150}
                height={68}
                className="object-contain"
              />
            </div>
            <div className="flex1">
              <Image
                src={enterscale}
                alt=""
                width={150}
                height={68}
                className="object-contain"
              />
              <Image
                src={kira}
                alt=""
                width={150}
                height={68}
                className="object-contain"
              />
              <Image
                src={gacn}
                alt=""
                width={150}
                height={68}
                className="object-contain"
              />
              <Image
                src={keramide}
                alt=""
                width={150}
                height={68}
                className="object-contain"
              />
              <Image
                src={hawiti}
                alt=""
                width={150}
                height={68}
                className="object-contain"
              />
              <Image
                src={applied}
                alt=""
                width={150}
                height={68}
                className="object-contain"
              />
              <Image
                src={flutterwave}
                alt=""
                width={150}
                height={68}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  z-index: 199;
  display: flex;
  left: 0;
  justify-content: center;
  /* padding: 0 3rem; */

  .partners {
    overflow-x: scroll;
    display: flex;
    align-items: center;
    /* background: #fff; */
    flex-shrink: 1 0 auto;
    /* padding: 2rem 1rem; */
    /* border: 1px solid #ededed; */
    /* box-shadow: 0px 34px 74px rgba(80, 86, 141, 0.15); */
    border-radius: 20px;
    gap: 1rem;
    .section1 {
      padding: 1rem 2rem 1rem 0.5rem;
      color: #7e7e7e;
      border-right: 1px solid #7e7e7e5a !important;
    }
    .marquee {
      padding: 0 1rem !important;
      overflow-x: hidden;

      .exts {
        width: 440%;
        display: flex;
        align-items: center;
        gap: 8rem;
        justify-content: space-between;
        padding-left: 1rem;
        animation: 100s marquee infinite linear;

        .flex1 {
          display: flex;
          width: 100%;
          align-items: center;
          gap: 5rem;
        }
        &:hover {
          animation-play-state: paused;
        }
      }

      @keyframes marquee {
        from {
          transform: translateX(0);
        }
        to {
          transform: translateX(-100%);
        }
      }
    }
  }

  @media only screen and (max-width: 800px) {
    padding: 0 1rem;
    top: -2rem;
    .partners {
      padding: 1.5rem 0.3rem;
      border-radius: 10px;

      .section1 {
        padding: 0.3rem 0.2rem 0.3rem 0.5rem;

        p {
          font-size: 0.5rem;
        }
      }
      .marquee {
        .exts {
          gap: 2rem;
          width: 430%;

          .flex1 {
            gap: 2rem;

            img {
              width: 100px;
              height: 40px;
            }
          }
        }
      }
    }
  }
  @media only screen and (max-width: 600px) {
    padding: 0 1rem;
    top: -2rem;
    .partners {
      padding: 1.5rem 0.3rem;
      border-radius: 10px;

      .section1 {
        padding: 0.3rem 0.2rem 0.3rem 0.5rem;

        p {
          font-size: 0.5rem;
        }
      }
      .marquee {
        .exts {
          gap: 2rem;
          width: 590%;

          .flex1 {
            gap: 2rem;

            img {
              width: 70px;
              height: 30px;
            }
          }
        }
      }
    }
  }

  @media only screen and (max-width: 450px) {
    padding: 0 1rem;
    top: -2rem;
    .partners {
      padding: 1.5rem 0.3rem;
      border-radius: 10px;

      .section1 {
        padding: 0.3rem 0.2rem 0.3rem 0.5rem;

        p {
          font-size: 0.5rem;
        }
      }
      .marquee {
        .exts {
          gap: 2rem;
          width: 630%;

          .flex1 {
            gap: 2rem;

            img {
              width: 70px;
              height: 20px;
            }
          }
        }
      }
    }
  }
  @media only screen and (max-width: 418px) {
    padding: 0 1rem;
    top: -2rem;
    .partners {
      padding: 1.5rem 0.3rem;
      border-radius: 10px;

      .section1 {
        padding: 0.3rem 0.2rem 0.3rem 0.5rem;

        p {
          font-size: 0.5rem;
        }
      }
      .marquee {
        .exts {
          gap: 5rem;
          width: 640%;

          .flex1 {
            gap: 2rem;

            img {
              width: 70px;
              height: 20px;
            }
          }
        }
      }
    }
  }
`;
