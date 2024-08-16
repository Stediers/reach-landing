"use client";

import { BsPhone } from "react-icons/bs";
import Setting from "../Setting";
import { FaWhatsapp } from "react-icons/fa";
import { BiChat } from "react-icons/bi";
import { State } from "@data/enums";
import { useState } from "react";
import Loading from "../Loading";
import { openInNewTab } from "@helper_functions/newTab";
import { Button } from "../ui/button";
import { FetchPartnerByPartnerIdResponse } from "@api_functions/gig/fetch-gig-profile-by-gigId";
import Link from "next/link";
import { Star } from "lucide-react";
import { CustomDrawer } from "@components/DrawerPopup";
import { DrawerClose } from "@components/ui/drawer";
import { CustomSheet } from "@components/CustomSheet";
import { SheetClose } from "@components/ui/sheet";

export function CallSetting({ mobileNumber }: { mobileNumber: string }) {
  return (
    <Setting
      title="Call Me"
      subtitle="For a direct 1-on-1 conversation"
      onClick={() => window.open(`tel:${mobileNumber}`, "_self")}
      icon={<BsPhone className="text-3xl text-primary" />}
    />
  );
}

export function WhatsAppSetting({ mobileNumber }: { mobileNumber: string }) {
  return (
    <Setting
      title="WhatsApp"
      subtitle="If you prefer to chat"
      icon={<FaWhatsapp className="text-3xl text-success" />}
      onClick={() => {
        // window.open(`https://wa.me/${mobileNumber}`);
        openInNewTab(`https://wa.me/${mobileNumber}`);
      }}
    />
  );
}

export function ContactMeDrawer({ mobileNumber }: { mobileNumber: string }) {
  return (
    <CustomDrawer
      title="Contact Me"
      description="Reach me via"
      footerJSX={
        <DrawerClose asChild>
          <Button variant="close">Close</Button>
        </DrawerClose>
      }
      triggerJSX={<Button variant="default">Contact Me</Button>}
    >
      <div className="grid lg:grid-cols-2 gap-5 w-full">
        <CallSetting mobileNumber={mobileNumber} />
        <WhatsAppSetting mobileNumber={mobileNumber} />
      </div>
    </CustomDrawer>
  );
}

export function ContactMeSheet({ mobileNumber }: { mobileNumber: string }) {
  return (
    <CustomSheet
      title="Contact Me"
      description="Reach me via"
      triggerJSX={<Button variant="default">Contact Me</Button>}
      footerJSX={
        <SheetClose asChild>
          <Button variant="close">Close</Button>
        </SheetClose>
      }
    >
      <div className="grid lg:grid-cols-1 gap-5 w-full">
        <CallSetting mobileNumber={mobileNumber} />
        <WhatsAppSetting mobileNumber={mobileNumber} />
      </div>
    </CustomSheet>
  );
}
