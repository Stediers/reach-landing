"use client";

import { BsPhone } from "react-icons/bs";
import Setting from "./Setting";
import { FaWhatsapp } from "react-icons/fa";
import { BiChat } from "react-icons/bi";
import { State } from "@data/enums";
import { useState } from "react";
import Loading from "./Loading";
import { openInNewTab } from "@helper_functions/newTab";
import { Button } from "./ui/button";

export function CallSetting({ mobileNumber }: { mobileNumber: string }) {
  return (
    <Button
      variant="default"
      size={"lg"}
      onClick={() => window.open(`tel:${mobileNumber}`, "_self")}
    >
      Reach Me
    </Button>
  );
}

export function WhatsAppSetting({ mobileNumber }: { mobileNumber: string }) {
  return (
    <Setting
      title="WhatsApp"
      subtitle="tap to chat"
      icon={<FaWhatsapp className="text-3xl text-success" />}
      onClick={() => {
        // window.open(`https://wa.me/${mobileNumber}`);
        openInNewTab(`https://wa.me/${mobileNumber}`);
      }}
    />
  );
}
