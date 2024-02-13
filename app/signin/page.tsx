"use client";
import React, { useState, useEffect } from "react";

import { LoginAccount } from "./Component";
import Footer from "@/components/Footer";
import NavigationBar from "@/components/NavigationBar";
import { set } from "date-fns";

const Page = () => {
  const components: { title: string; href: string; description: string }[] = [
    {
      title: "About Us",
      href: "/",
      description:
        "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
      title: "Our Process",
      href: "/",
      description:
        "For sighted users to preview content available behind a link.",
    },
    {
      title: "Contact Us",
      href: "/",
      description:
        "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
  ];
  const [currBg, setBg] = useState(
    "https://res.cloudinary.com/dnir0cslk/image/upload/v1706148980/petrobg_eg3spo.jpg"
  );
  const getBg = async () => {
    try {
      const response = await fetch(
        "https://petrodata.zainnovations.com/api/v1/petro-data/periodic-image",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      if (response.status !== 200) {
        return;
      }
      setBg(result.data);
      console.log(result);
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getBg();
  }, []);
  return (
    <div className="petrodata relative w-full">
      <img
        src={currBg}
        alt="hero"
        className="h-full w-full grayscale-[100%] object-cover"
      />
      <div className="overlay">
        <div className="h-full grid grid-cols-1 md:grid-cols-2  max-w-7xl mx-auto px-[1rem]">
          <div className="h-full flex md:justify-normal justify-center items-center lg:mt-14 order-2 md:order-1 mx-2">
            <LoginAccount />
          </div>
          <div className=" relative order-1 md:order-2">
            <div className="absolute right-3 md:right-0 top-4 md:top-8">
              <NavigationBar />
            </div>
            <h4 className="lg:block hidden text-black text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-right mt-20 mx-2">
              Empower your business <br /> with{" "}
              <span className="text-[#FF9F27]">real-time</span> <br /> petroleum
              insights
            </h4>
            <h4 className="lg:hidden block text-black  text-2xl md:text-4xl lg:text-[2.5rem] font-bold text-right mt-20 mx-2">
              Empower your business with{" "}
              <span className="text-[#FF9F27]">real-time</span> petroleum
              insights
            </h4>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
