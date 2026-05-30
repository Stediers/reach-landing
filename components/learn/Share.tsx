"use client";

import { Link } from "lucide-react";
import link from "next/link";
import { BsWhatsapp, BsInstagram } from "react-icons/bs";

export default function Share() {
  return (
    <div className="bg-white rounded-xl grid grid-cols-3 gap-x-10 border shadow-lg px-5 py-5 items-center justify-items-center">
      <BsWhatsapp
        className="w-6 h-6 text-primary hover:cursor-pointer hover:saturate-100"
        onClick={() => {
          window.open(
            `https://api.whatsapp.com/send?text=https://www.reachgig.com/learn/${link}`,
            "_blank"
          );
        }}
      />
      <BsInstagram
        className="w-6 h-6 text-primary hover:cursor-pointer hover:saturate-100"
        onClick={() => {
          window.open(`https://instagram.com/reachgig`, "_blank");
        }}
      />
      <Link
        className="w-6 h-6 text-primary hover:cursor-pointer hover:saturate-100"
        onClick={() => {
          //copy to clipboard
          //   navigator.clipboard.writeText(
          //     `https://www.reachgig.com/learn/${link}`
          //   );
        }}
      />
    </div>
  );
}
