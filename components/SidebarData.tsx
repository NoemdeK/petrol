"use client";

import Link from "next/link";
import Image from "next/image";
import { BarChart4, Code, Database,  Settings, Upload, VideoIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";


const routes = [
  
  {
    label: 'Upload',
    icon: Upload,
    href: '/data-entry',
  },
  {
    label: 'Settings',
    icon: Settings,
    href: '/data-entry/settings',
  },
];

export const SidebarData = () => {
  const pathname = usePathname();



  return (
    <div className="my-9 md:my-0 space-y-4 py-4 rounded-lg flex flex-col h-full bg-accent">
      <div className="px-3 py-2 flex-1">

        <div className="space-y-1">
          
          {routes.map((route) => (
            <Link
              key={route.href} 
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer  hover:bg-white/50 rounded-lg transition",
                pathname === route.href ? "text-black font-bold bg-white/50 " : "text-accent-foreground",
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3")} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    
    </div>
  );
};