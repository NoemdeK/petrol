"use client";

import Link from "next/link";
import Image from "next/image";
import { BarChart4, Code, Database,  Settings, VideoIcon } from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";


const routes = [
  {
    label: 'Analytics',
    icon:  BarChart4,
    color: "text-green-700",
    href: '/dashboard/analytics',
  },
  {
    label: 'Raw Data',
    icon: Database,
    color: "text-green-700",
    href: '/dashboard/raw-data',
  },
  {
    label: 'Settings',
    icon: Settings,
    href: '/dashboard/settings',
  },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 rounded-lg flex flex-col h-full bg-[#ededed] text-black">
      <div className="px-3 py-2 flex-1">

        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href} 
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer  hover:bg-white/50 rounded-lg transition",
                pathname === route.href ? "text-black font-bold bg-white/50 " : "text-black",
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