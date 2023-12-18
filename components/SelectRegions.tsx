"use client"
import * as React from "react"
import { CheckIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { BiSolidDownArrow } from "react-icons/bi"

import { regionalOptions } from '@/data';
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"


export function Region({ selectedNames, setSelectedNames }: any) {
  const { selectedRegions, product } = useSelector(
    (state: RootState) => state.prices
  );

  return (
    <>
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="">
          Select Regions
          <span className="bg-[#CACCCB] h-8 w-6 flex justify-center items-center rounded-r-lg ml-4">
            <BiSolidDownArrow className="text-sm  text-accent" />
          </span>
          {/* <PlusCircledIcon className="mr-2 h-4 w-4" /> */}
          {selectedNames?.length > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {selectedNames.length}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selectedNames.length > 0 && (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {selectedNames.length} selected
                  </Badge>
                )
                 }
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px]  capitalize p-0" align="start">
        <Command>
          <CommandInput placeholder={''} />
          <CommandList className="">
            <CommandEmpty>No names found.</CommandEmpty>
            <CommandGroup>
              {regionalOptions.map((name: any, i: number) => {
                // const isSelected = selectedRegions.includes(name);
                const isSelected = selectedNames.some((n: any) => n.label === name.label);

                console.log(name);
                console.log(selectedNames, "selectedNames");
                return (
                  <CommandItem
                    key={i}
                    onSelect={() => {
                        if (isSelected) {
                          setSelectedNames(selectedNames.filter((n: any) => n.label !== name.label));
                        } else {
                          setSelectedNames([...selectedNames, name]);
                        }
                      }}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-secondary"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <CheckIcon className={cn("h-4 w-4")} />
                    </div>
                    <span className="capitalize">{name.label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedNames?.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => setSelectedNames([])}
                    className="justify-center text-center"
                  >
                    Clear selection
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
    </>

  );
}