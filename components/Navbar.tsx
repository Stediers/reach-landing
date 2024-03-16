"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@components/ui/sheet";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { Button } from "@components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@components/ui/navigation-menu";
import React from "react";
import { cn } from "@lib/utils";
import { learn, legal, menus } from "@data/menu";
import UnderlinedHeader from "./UnderlinedHeader";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const path = usePathname();
  return (
    <div className="py-4 px-5 border-b sticky top-0 z-10 bg-white">
      <MobileNav path={path} />
      <DesktopNav path={path} />
    </div>
  );
}

function DesktopNav({ path }: { path: string }) {
  return (
    <div className="lg:flex justify-start space-x-10 w-full items-center hidden">
      <Link
        className="flex items-center space-x-4 shrink-0 hover:cursor-pointer"
        href="/"
        passHref
      >
        <div className="flex flex-col">
          <p className="text-xl font-medium">ReachGig</p>
          <p className="text-sm text-gray-500 tracking-wide">
            Be your own Boss.
          </p>
        </div>
      </Link>
      <div className="flex justify-between items-center space-x-5 w-full">
        <NavigationMenu orientation="vertical">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Compliance</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 grid-cols-2 w-[600px]">
                  {legal.map((component) => (
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
            <NavigationMenuItem>
              <NavigationMenuTrigger>How does it work?</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 grid-cols-2 w-[600px]">
                  {learn.map((component) => (
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
            {menus.map((menu) => (
              <NavigationMenuItem key={menu.title}>
                <Link href={menu.path} passHref legacyBehavior>
                  <NavigationMenuLink
                    className={`${navigationMenuTriggerStyle()} ${
                      path === menu.path ? "border-primary border" : ""
                    }`}
                  >
                    {menu.title}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="grid grid-cols-2 gap-5">
          <Button
            variant="success"
            size="default"
            className="text-base"
            onClick={() => window.open("https://partner.reachgig.com/")}
          >
            Become a Partner
          </Button>
          <Button
            variant="outline"
            size="default"
            className="text-base"
            onClick={() => window.open("https://customer.reachgig.com/")}
          >
            Find Partners
          </Button>
        </div>
      </div>
    </div>
  );
}

function MobileNav({ path }: { path: string }) {
  return (
    <div className="flex justify-between space-x-5 w-full items-center lg:hidden">
      <Link
        className="flex items-center space-x-4 shrink-0 hover:cursor-pointer"
        href="/"
        passHref
      >
        <div className="flex flex-col">
          <p className="text-xl font-medium">ReachGig</p>
          <p className="text-sm text-gray-500 tracking-wide">
            Be your own Boss.
          </p>
        </div>
      </Link>
      <div className="lg:hidden flex items-center space-x-5 self-end">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-fit">
              <GiHamburgerMenu />
            </Button>
          </SheetTrigger>
          <SheetContent className="space-y-5">
            <SheetHeader>
              <SheetTitle className="text-xl justify-center items-end flex flex-col space-y-1 ">
                <UnderlinedHeader title="Where to?" align="items-end" />
              </SheetTitle>
            </SheetHeader>
            <div className=" w-full flex flex-col items-end justify-center font-medium text-lg space-y-5">
              {menus.map((menu) => (
                <SheetClose key={menu.title} asChild>
                  <Link
                    href={menu.path}
                    className={`${path === menu.path ? "text-primary" : ""}`}
                  >
                    {menu.title}
                  </Link>
                </SheetClose>
              ))}
              {legal.map((component) => (
                <SheetClose key={component.title} asChild>
                  <Link href={component.href}>{component.title}</Link>
                </SheetClose>
              ))}
              {/* <DropdownMenu>
                <DropdownMenuTrigger>Compliance</DropdownMenuTrigger>
                <DropdownMenuContent>
                  {components.map((component) => (
                    <DropdownMenuItem key={component.title}>
                      <Link
                        target="_blank"
                        href={component.href}
                        legacyBehavior
                        passHref
                      >
                        {component.title}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu> */}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li className="row-span-3 shrink-0">
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground shrink-0",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
