"use client";
import { Menu, userMenus } from "@data/menu";
import Link from "next/link";
import { Button } from "@components/ui/button";
import { MdSunny } from "react-icons/md";
import { FaMoon, FaSearch } from "react-icons/fa";
import { AiFillRightCircle, AiOutlineMenu } from "react-icons/ai";
import { Badge } from "@components/ui/badge";
import { usePathname } from "next/navigation";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@components/ui/sheet";
import Logo from "@components/Logo";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { useEffect, useState } from "react";
import { State } from "@data/enums";
import Loading from "@components/Loading";
import {
  BadgeCheck,
  CornerDownRightIcon,
  LogIn,
  LogOutIcon,
} from "lucide-react";
import Setting from "@components/Setting";
import checkHere from "@helper_functions/check-path-nav";
import { FcExpand, FcSearch } from "react-icons/fc";
import { CustomDialog } from "@components/DialogPopup";
import { Skeleton } from "@components/ui/skeleton";
import LoadingWrapper from "@wrapper/LoadingWrapper";
import { showSnackBar } from "@components/notifications/Snackbar";
import { BiRightArrow } from "react-icons/bi";
import { debounce } from "lodash";
import {
  FetchMyProfileResponse,
  fetchMyProfile,
} from "@api_functions/profile/fetch-my-profile";
import { NavBar } from "@components/explore/Navbar";
import Footer from "@components/footer/Footer";

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function ConsoleLayout({ children }: RootLayoutProps) {
  return (
    <div className="w-full flex flex-col justify-start items-center relative !z-50 !hide-scrollbar">
      <div className="w-full flex flex-col justify-start items-center space-y-5  sticky top-0 z-50">
        <NavBar showMobileNav={true} />
      </div>
      <div className="max-w-7xl w-full flex flex-1 flex-col justify-start items-center space-y-5 lg:px-10">
        {children}
      </div>
      <Footer />
    </div>
  );
}
