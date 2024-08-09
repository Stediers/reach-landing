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
