"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "./Sidebar";
import LogoDash from "./sections/LogoDash";
import LogoDashTwo from "./sections/LogoDash2";
import useNavbar from "@/lib/useNavbar";

export const MobileSidebar = ({session}: any) => {
  const [isMounted, setIsMounted] = useState(false);
  const { isOpen, onClose} = useNavbar()


  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Sheet  onOpenChange={onClose} open={isOpen}  defaultOpen={isOpen}>

      <SheetContent side="left" className="p-0">
       <div className="py-4 h-full">
        {
            session === "rwx_user" ? 
            <LogoDash />
            :
            <LogoDashTwo role={session} />
          }
        <Sidebar session={session} />
       </div>
      </SheetContent>
    </Sheet>
  );
};