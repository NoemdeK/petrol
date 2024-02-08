"use client";

import Link from "next/link";
import Image from "next/image";
import {
  BarChart4,
  Code,
  Database,
  History,
  Rows,
  Settings,
  Table,
  Upload,
  UserCog,
  Users,
  VideoIcon,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { AccordionDemo } from "./Menu";
import useNavbar from "@/lib/useNavbar";
import useEditFieldData from "@/lib/useEditFieldData";
import { useEffect } from "react";

export const Sidebar = ({ session }: any) => {
  const pathname = usePathname();
  const router = useRouter();
  const { onClose } = useNavbar();

  // let routes = [
  //   {
  //     label: 'Raw Data',
  //     icon: Table,
  //     href: '/dashboard/table/1',
  //   },
  // ];

  // if (session === 'rwx_data_entry_user') {
  //   // Modify or add routes for the 'rwx_data_entry_user' role
  //   routes.push(
  //     // Add or modify routes for this role

  // {
  //   label: 'Upload',
  //   icon: Upload,
  //   href: '/data-entry',
  // },
  // {
  //   label: 'Settings',
  //   icon: Settings,
  //   href: '/data-entry/settings',
  // },

  //   );
  // } else if (session === 'rwx_admin') {
  //   // Modify or add routes for the 'rwx_admin' role
  //   routes.push(
  //     // Add or modify routes for this role
  //     {
  //       label: 'Data',
  //       icon: Database,
  //       href: '/admin',
  //     },
  //     {
  //       label: 'Users',
  //       icon: Users,
  //       href: '/admin/users',
  //     },
  //     {
  //       label: 'Audit Log',
  //       icon: Rows,
  //       href: '/admin/audit-log',
  //     },
  //     {
  //       label: 'Settings',
  //       icon: Settings,
  //       href: '/admin/settings',
  //     },
  //   );
  // } else if (session === 'rwx_data_entry_analyst') {
  //   // Modify or add routes for the 'rwx_data_entry_analyst' role
  //   routes.push(
  //     // Add or modify routes for this role

  //     {
  //       label: 'Data',
  //       icon: Database,
  //       href: '/analyst/data',
  //     },
  //     {
  //       label: 'Upload',
  //       icon: Upload,
  //       href: '/analyst',
  //     },
  //     {
  //       label: 'Upload History',
  //       icon: History ,
  //       href: '/analyst/history',
  //     },
  //     {
  //       label: 'Settings',
  //       icon: Settings,
  //       href: '/analyst/settings',
  //     },
  //   );
  // } else {
  //   // Default routes if none of the roles match
  //   routes.push(
  //     {
  //       label: 'Settings',
  //       icon: Settings,
  //       href: '/dashboard/settings',
  //     },
  //   );
  // }
  const routes = [
    {
      label: "Upload",
      icon: Upload,
      href: "/data-entry",
    },
    {
      label: "Upload History",
      icon: History,
      href: "/data-entry/history",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/data-entry/settings",
    },
  ];

  const { setUserType } = useEditFieldData();

  useEffect(() => {
    setUserType(session);
  }, [session]);

  return (
    <div className="my-9 md:my-0 space-y-4 py-4 rounded-lg flex flex-col h-full bg-accent">
      <div className="px-3 py-2 flex-1">
        <div className="space-y-1">
          {session === "rwx_data_entry_user" ? (
            <div className="space-y-1">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer  hover:bg-white/50 rounded-lg transition",
                    pathname === route.href
                      ? "text-black font-bold bg-white/50 "
                      : "text-accent-foreground"
                  )}
                  onClick={onClose}
                >
                  <div className="flex items-center flex-1">
                    <route.icon className={cn("h-5 w-5 mr-3")} />
                    {route.label}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <>
              <Link
                href={"/dashboard/analytics/PMS"}
                className={cn(
                  "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer  hover:bg-white/50 rounded-lg transition",
                  pathname.includes("analytics")
                    ? "text-black font-bold bg-white/50 "
                    : "text-accent-foreground"
                )}
                onClick={onClose}
              >
                <div className="flex items-center flex-1">
                  <BarChart4 className={cn("h-5 w-5 mr-3")} />
                  Analytics
                </div>
              </Link>

              {session !== "rwx_user" ? (
                <AccordionDemo session={session} />
              ) : (
                <>
                  <Link
                    href={"/dashboard/table/1"}
                    className={cn(
                      "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer  hover:bg-white/50 rounded-lg transition",
                      pathname === "/dashboard/table/1"
                        ? "text-black font-bold bg-white/50 "
                        : "text-accent-foreground"
                    )}
                    onClick={onClose}
                  >
                    <div className="flex items-center flex-1">
                      <Table className={cn("h-5 w-5 mr-3")} />
                      Raw Data
                    </div>
                  </Link>
                  <Link
                    href={"/dashboard/settings"}
                    className={cn(
                      "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer  hover:bg-white/50 rounded-lg transition",
                      pathname === "/dashboard/settings"
                        ? "text-black font-bold bg-white/50 "
                        : "text-accent-foreground"
                    )}
                    onClick={onClose}
                  >
                    <div className="flex items-center flex-1">
                      <UserCog className={cn("h-5 w-5 mr-3")} />
                      Settings
                    </div>
                  </Link>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
