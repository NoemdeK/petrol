"use client"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
  } from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import React from "react";

export default function NavigationBar() {
    const components: { title: string; href: string; description: string }[] = [
        {
        title: "About Us",
        href: "/",
        description:
            "A modal dialog that interrupts the user with important content and expects a response.",
        },
        {
        title: "Our Process",
        href: "/process",
        description:
            "For sighted users to preview content available behind a link.",
        },
        {
        title: "Contact Us",
        href: "/contact",
        description:
            "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
        },

    ]

    const pathname = usePathname()
    
    let trigger = "About Us" 

    switch(pathname) {
      case "/process":
        trigger = "Our Process";
      break;
      case "/contact":
        trigger= "Contact Us";
      break;
        default:
          trigger = "About Us"
    }
    
  return(
    <NavigationMenu>
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuTrigger>

          {trigger}
        </NavigationMenuTrigger>
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
