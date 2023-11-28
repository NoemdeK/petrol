"use client"


import Logo from '@/components/sections/Logo'
import Image from 'next/image'
import Link from 'next/link'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import React from 'react'
import { cn } from '@/lib/utils'
import Canvas from '@/components/Canvas'

export default function Home() {
  const components: { title: string; href: string; description: string }[] = [
    {
      title: "Our approach",
      href: "/",
      description:
        "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
      title: "Tools",
      href: "/",
      description:
        "For sighted users to preview content available behind a link.",
    },
    {
      title: "Contact",
      href: "/",
      description:
        "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },

  ]
  return (
    <main className='min-h-screen h-full flex-col flex'>
        <div className="z-10 w-full items-center justify-between flex p-4 md:p-8">
          <p className=" left-0 top-0 flex w-full text-2xl md:text-5xl pb-6 pt-8 text-sky-400  lg:static lg:w-auto   lg:p-4 ">
            dio<span className='font-bold'>phalytics</span><span className='text-black'>.io</span>
          </p>

          <div className="w-fit items-end justify-end bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">

                <NavigationMenu>
            <NavigationMenuList>

              <NavigationMenuItem>
                <NavigationMenuTrigger>About Us</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-2 w-36">
                    {components.map((component) => (
                      <ListItem
                        key={component.title}
                        title={component.title}
                        href={component.href}
                      >
                        {component.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            
            </NavigationMenuList>
          </NavigationMenu>
          </div>
        </div>
      <div className="flex h-full flex-col justify-center w-full md:items-start gap-12 p-4 md:p-12 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          <div className='h-full flex items-center flex-col justify-center text-center md:text-left md:items-start'>
            <div className='h-full flex flex-col gap-8 mt-16 px-4 justify-center items-center md:items-start'>
                <h4 className='text-4xl sm:text-5xl lg:text-6xl font-bold '>
                  Solving the <span className='text-purple-800'>hardest</span> <br />
                  data collection and 
                  veification challenges
                </h4>
                <div className='flex items-center gap-4'>
                  <p className='text-lg md:text-xl'>Check out our tools</p>
                  <Link href={'/signin'} className='bg-white p-2 border rounded-md'>
                    <Logo />
                  </Link>
                </div>
              </div>
          </div>
          <div className='hidden lg:flex w-full '>
            {/* <Canvas /> */}
          </div>
        </div>
      

      </div>
    </main>

  )
}


const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
