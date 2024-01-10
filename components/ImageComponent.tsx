import Image, { StaticImageData } from "next/image";
import Loading from "./Loading";
import { useState } from "react";
import { showImagePopup } from "./notifications/Popup";
import { BiError } from "react-icons/bi";
import { motion } from "framer-motion";
import devLog from "@helper_functions/devLog";

export default function ImageComponent({
  src,
  className = "w-[120px] h-[120px] shrink-0",
  alt,
  priority = false,
  loading = "lazy",
  border = true,
  popup = true,
  whileHover,
}: {
  src: string | StaticImageData;
  className?: string;
  alt: string;
  priority?: boolean;
  loading?: "lazy" | "eager";
  border?: boolean;
  popup?: boolean;
  whileHover?: { scale: number };
}) {
  const [isLoaded, setIsLoaded] = useState(true);
  const [isError, setIsError] = useState(false);
  return (
    <motion.div
      className={`relative overflow-hidden ${className} ${
        border ? "border border-gray" : ""
      }`}
      whileHover={whileHover}
    >
      {!isLoaded || isError ? (
        <div className="w-full h-full flex justify-center items-center">
          {isError ? (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="flex flex-col justify-center items-center space-y-2">
                <BiError className="text-white text-2xl" />
              </div>
            </div>
          ) : (
            <Loading className="w-10 h-10" />
          )}
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          sizes="100%"
          loading={loading}
          fill
          className="shrink-0"
          style={{ objectFit: "cover" }}
          onClick={() => {
            if (!popup) return;
            showImagePopup({ alt, src });
          }}
          onError={() => {
            setIsError(true);
          }}
          // onLoadingComplete={() => {
          //   setIsLoaded(true);
          // }}
          onLoad={() => {
            devLog("loaded image");
            setIsLoaded(true);
          }}
          onLoadStart={() => {
            devLog("loading image");
            setIsLoaded(false);
          }}
        />
      )}
    </motion.div>
  );
}

// function Loader() {
//   return (
//     <div className="w-full h-full flex justify-center items-center">
//       <Loading className="w-10 h-10" />
//     </div>
//   );
// }
