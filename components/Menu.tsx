import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import useNavbar from "@/lib/useNavbar";
import { cn } from "@/lib/utils";
import { BarChart4, Database, HardDrive, History, Rows, Settings, Table, Upload, UserCog, Users } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
  

  export function AccordionDemo({session}: any) {
  const pathname = usePathname();
  const { onClose} = useNavbar()


  if(session === "rwx_data_entry_analyst"){
    return (
        <Accordion type="single" collapsible className="w-full">
    
        <AccordionItem value="item-1" >
          <AccordionTrigger>
              <div className="flex px-3 items-center">
              <span>
                    <HardDrive className={cn("h-5 w-5 mr-3")} />
                </span>
                <span className="text-sm" >
                    Data Collection
                </span>
              </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="ml-4">
                <Link
                href={'/analyst'}
                className={cn(
                    "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer  hover:bg-white/50 rounded-lg transition",
                    pathname === "/analyst" ? "text-black font-bold bg-white/50 " : "text-accent-foreground",
                )}

                onClick={onClose}

                >
                <div className="flex items-center flex-1">
                    <Upload className={cn("h-5 w-5 mr-3")} />
                    Upload Data
                </div>
                </Link>  

                <Link
                href={'/analyst/history'}
                className={cn(
                    "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer  hover:bg-white/50 rounded-lg transition",
                    pathname === '/analyst/history' ? "text-black font-bold bg-white/50 " : "text-accent-foreground",
                )}
                onClick={onClose}

                >
                <div className="flex items-center flex-1">
                    <History className={cn("h-5 w-5 mr-3")} />
                    Upload History
                </div>
                </Link>  

                <Link
                href={'/dashboard/table/1'}
                className={cn(
                    "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer  hover:bg-white/50 rounded-lg transition",
                    pathname === "/dashboard/table/1" ? "text-black font-bold bg-white/50 " : "text-accent-foreground",
                )}
                onClick={onClose}

                >
                <div className="flex items-center flex-1">
                    <Table className={cn("h-5 w-5 mr-3")} />
                    Raw Data
                </div>
                </Link> 
                 
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2" >
          <AccordionTrigger>
            <div className="flex items-center px-3">
                <span>
                    <Settings className={cn("h-5 w-5 mr-3")} />
                </span>
                <span className="text-sm" >
                    Setup
                </span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="ml-4">  
                <Link
                href={'/analyst/settings'}
                className={cn(
                    "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer  hover:bg-white/50 rounded-lg transition",
                    pathname === "/analyst/settings" ? "text-black font-bold bg-white/50 " : "text-accent-foreground",
                )}
                onClick={onClose}
                >
                <div className="flex items-center flex-1">
                    <UserCog className={cn("h-5 w-5 mr-3")} />
                    Settings
                </div>
                </Link>     
            </div>
          </AccordionContent>
        </AccordionItem>

      </Accordion>
    )
  }

    return (
      <Accordion type="single" collapsible className="w-full">
    
        <AccordionItem value="item-1" >
          <AccordionTrigger>
              <div className="flex px-3 items-center">
              <span>
                    <HardDrive className={cn("h-5 w-5 mr-3")} />
                </span>
                <span className="text-sm" >
                    Data Collection
                </span>
              </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="ml-4">
                <Link
                href={'/admin'}
                className={cn(
                    "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer  hover:bg-white/50 rounded-lg transition",
                    pathname === "/admin" ? "text-black font-bold bg-white/50 " : "text-accent-foreground",
                )}
                onClick={onClose}

                >
                <div className="flex items-center flex-1">
                    <Database className={cn("h-5 w-5 mr-3")} />
                    Data
                </div>
                </Link>   
                <Link
                href={'/dashboard/table/1'}
                className={cn(
                    "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer  hover:bg-white/50 rounded-lg transition",
                    pathname === "/dashboard/table/1" ? "text-black font-bold bg-white/50 " : "text-accent-foreground",
                )}
                onClick={onClose}
                >
                <div className="flex items-center flex-1">
                    <Table className={cn("h-5 w-5 mr-3")} />
                    Raw Data
                </div>
                </Link> 
                 
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2" >
          <AccordionTrigger>
            <div className="flex items-center px-3">
                <span>
                    <Settings className={cn("h-5 w-5 mr-3")} />
                </span>
                <span className="text-sm" >
                    Setup
                </span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="ml-4">
                <Link
                href={'/admin/users'}
                className={cn(
                    "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer  hover:bg-white/50 rounded-lg transition",
                    pathname === '/admin/users' ? "text-black font-bold bg-white/50 " : "text-accent-foreground",
                )}
                onClick={onClose}
                >
                <div className="flex items-center flex-1">
                    <Users className={cn("h-5 w-5 mr-3")} />
                    Users
                </div>
                </Link> 
                <Link
                href={'/admin/audit-log'}
                className={cn(
                    "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer  hover:bg-white/50 rounded-lg transition",
                    pathname === "/admin/audit-log" ? "text-black font-bold bg-white/50 " : "text-accent-foreground",
                )}
                onClick={onClose}
                >
                <div className="flex items-center flex-1">
                    <Rows className={cn("h-5 w-5 mr-3")} />
                    Audit Log
                </div>
                </Link>   
                <Link
                href={'/admin/settings'}
                className={cn(
                    "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer  hover:bg-white/50 rounded-lg transition",
                    pathname === "/admin/settings" ? "text-black font-bold bg-white/50 " : "text-accent-foreground",
                )}
                onClick={onClose}
                >
                <div className="flex items-center flex-1">
                    <UserCog className={cn("h-5 w-5 mr-3")} />
                    Settings
                </div>
                </Link>     
            </div>
          </AccordionContent>
        </AccordionItem>

      </Accordion>
    )
  }
  