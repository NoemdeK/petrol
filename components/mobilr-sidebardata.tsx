"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "./Sidebar";
import { SidebarData } from "./SidebarData";
import useNavbar from "@/lib/useNavbar";

export const MobileSidebarData = () => {
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
        <SidebarData />
      </SheetContent>
    </Sheet>
  );
};