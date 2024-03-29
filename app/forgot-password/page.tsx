"use client";
import React, { useEffect } from "react";
import { Forgot } from "./Component";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Forgotpage = () => {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();

  return <Forgot />;
};

export default Forgotpage;
