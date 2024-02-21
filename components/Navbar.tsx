"use client";
import {
  Sheet,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";
import { cn } from "@lib/utils";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Terms of Service",
    href: "/compliance/terms-of-service",
    description:
      "The rules and guidelines that users must agree to in order to use a service.",
  },
  {
    title: "Privacy Policy",
    href: "/compliance/privacy-policy",
    description:
      "A legal document that discloses how a website gathers, stores, and shares a user's data.",
  },
  {
    title: "Data Retention Policy",
    href: "/compliance/data-retention-policy",
    description:
      "A policy that outlines how long data is stored after the data is no longer needed.",
  },
  {
    title: "Refund Policy",
    href: "/compliance/refund-policy",
    description: "A document that outlines the terms of a refund.",
  },
  {
    title: "Chat Guidelines",
    href: "/compliance/chat-guidelines",
    description:
      "A set of rules and guidelines that users must agree to in order to use a chat service.",
  },
];

export default function Navbar() {
  return (
    <div className="py-4 px-5 border-b sticky top-0 z-10 bg-white">
      <MobileNav />
      <DesktopNav />
    </div>
  );
}

function DesktopNav() {
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
              <Link href="/about-us" passHref legacyBehavior>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  About Us
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/contact" passHref legacyBehavior>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Contact Us
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/pricing" passHref legacyBehavior>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Pricing
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/bookings" passHref legacyBehavior>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Bookings
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Compliance</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 grid-cols-2 w-[600px]">
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
            onClick={() => window.open("https://app.reachgig.com/")}
          >
            Find Partners
          </Button>
        </div>
      </div>
    </div>
  );
}

function MobileNav() {
  return (
    <div className="flex justify-between space-x-5 w-full items-center lg:hidden">
      <div className="flex items-center space-x-4 shrink-0">
        <div className="flex flex-col">
          <p className="text-2xl font-medium">ReachGig</p>
          <p className="text-sm text-gray-500 tracking-wide">
            Relax, we got you covered
          </p>
        </div>
      </div>
      <div className="lg:hidden flex items-center space-x-5 self-end">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-fit">
              <GiHamburgerMenu />
            </Button>
          </SheetTrigger>
          <SheetContent className="space-y-5">
            <SheetHeader>
              <SheetTitle className="text-xl justify-center items-center flex flex-col space-y-1 ">
                <p>Menu</p>
                <div className="w-[30%] border-b border-primary"></div>
              </SheetTitle>
            </SheetHeader>
            <div className=" w-full flex flex-col items-center justify-center font-medium text-lg space-y-5">
              <Link target="_blank" href={"http://www.reachgig.com/about-us"}>
                About Us
              </Link>
              <Link target="_blank" href={"http://www.partner.reachgig.com/"}>
                Partner with us
              </Link>
              <Link target="_blank" href={"http://www.reachgig.com/pricing"}>
                Pricing
              </Link>
              <Link target="_blank" href={"http://www.reachgig.com/bookings"}>
                Bookings
              </Link>
              <Link target="_blank" href={"http://www.reachgig.com/blog"}>
                Blogs
              </Link>
              <Link target="_blank" href={"http://www.reachgig.com/contact"}>
                Contact Us
              </Link>
              <DropdownMenu>
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
              </DropdownMenu>
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
