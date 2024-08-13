import Link from "next/link";
import { BiRightArrowAlt, BiRupee } from "react-icons/bi";
import Card from "./Card";
import { AddOn } from "@data/types";
import ImageCarousel from "./carousel/ImageCarousel";

export function AddOnMobile({ addOn }: { addOn: AddOn }) {
  return (
    <div className="flex flex-col !space-y-3 w-full" key={addOn.id}>
      <ImageCarousel images={addOn.imageUrls} />
      <div className="flex flex-col justify-between items-start w-full space-y-2">
        <div className="flex flex-row justify-between items-start w-full space-x-4">
          <p className="text-lg font-medium first-letter:capitalize break-all">
            {addOn.title}
          </p>
          <div className="flex flex-row justify-start space-x-3 items-center shrink-0">
            <p className="text-lg font-medium">
              <BiRupee className="inline" />
              {addOn.price}
            </p>
          </div>
        </div>
        <p className="text-base">
          {addOn.description.length > 100
            ? addOn.description.slice(0, 100) + "..."
            : addOn.description}
        </p>
      </div>
    </div>
  );
}
