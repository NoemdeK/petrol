"use client";

import React, { useEffect, useState } from "react";

import { AccordionDemo } from "@/components/Accordion";
import Footer from "@/components/Footer";
import Partners from "@/components/sections/Partners";
import NavigationBar from "@/components/NavigationBar";

import hero from "@/assets/how-to-solve-worlds-biggest-problems 1.svg";

import substract from "@/assets/Subtract.svg";
import Image from "next/image";
import Navigation from "./(root)/components/Navigation";

export default function Home() {
  const [scrolled, setScrolled] = useState<boolean>(false);

  const changeColor = () => {
    if (window.scrollY >= 100) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeColor);
    return () => {
      window.removeEventListener("scroll", changeColor);
    };
  }, [scrolled]);

  console.log(scrolled);

  return (
    <main className="flex-col flex p-0 m-0 justify-between gap-0 w-full min-h-full">
      <div className=" w-full min-h-full relative ">
        <Navigation />
        <div className="max-w-7xl mx-auto flex h-full flex-col  pb-8 gap-12 py-4 pt-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-4 px-4 md:px-4 lg:px-4 xl:px-0">
            <div className="text-secondary h-full w-full flex items-start flex-col justify-center text-left md:text-left md:items-start">
              <div className="h-full flex flex-col gap-8 mt-16 justify-center items-start md:items-start">
                <h4 className="text-black text-3xl sm:text-4xl lg:text-5xl font-bold ">
                  Solving the <span className="text-purple-800">hardest</span>{" "}
                  <br />
                  data collection and <br />
                  verification challenges
                </h4>
                <div className="flex  gap-4 w-full h-full flex-col">
                  <p className="text-sm md:text-base text-black  text-left font-semibold">
                    Check out our tools:
                  </p>
                  <AccordionDemo />
                </div>
              </div>
            </div>

            <div className="w-full lg:flex hidden">
              <Image
                src={hero}
                width={600}
                height={800}
                alt="hero"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
      <Partners />
      <Footer />
    </main>
  );
}
