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

import type { Metadata } from 'next'

import hero from "@/assets/how-to-solve-worlds-biggest-problems 1.png"
import { AccordionDemo } from '@/components/Accordion'
import Footer from '@/components/Footer'
import Partners from '@/components/sections/Partners'


export default function Home() {
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

  ]
  return (
    <main className='min-h-screen flex-col flex hero'>
      <div className='bg-whiteh/30  w-full h-full'>

        <div className="max-w-7xl w-full mx-auto  items-center justify-between flex py-4 px-4 md:px-0 md:py-8">
          <p className=" left-0 top-0 flex w-full text-lg sm:text-2xl md:text-4xl pb-6 pt-8 text-sky-400  lg:static lg:w-auto   lg:p-4 ">
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
        <div className="max-w-7xl mx-auto flex h-full flex-col w-full pb-8  gap-12 p-4 ">
          <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4">

            <div className='text-secondary  h-full w-full flex items-center flex-col justify-center text-left md:text-lefkt md:itejms-start'>
              <div className='h-full flex flex-col gap-8 mt-16 justify-center items-center md:items-start'>
                  <h4 className='text-black text-3xl sm:text-4xl lg:text-5xl font-bold '>
                    Solving the <span className='text-purple-800'>hardest</span> <br />
                    data collection and <br />
                    verification challenges
                  </h4>
                  <div className='flex  gap-4 w-full h-full flex-col'>
                    <p className='text-sm md:text-base text-black  text-left font-semibold'>Check out our tools:</p>
                      <AccordionDemo />
                      

                  </div>
                </div>
            </div>

            <div className='w-full md:flex hidden'>
              <Image src={hero} width={600} height={500} alt='hero' className='w-full h-auto max-h-96' />
            </div>

          </div>
        

        </div>

      </div>
      <Partners />
      <Footer />
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
