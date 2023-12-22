import { FcIdea, FcHighPriority } from "react-icons/fc";
import Card from "./Card";
import { PropsWithChildren } from "react";

export default function Tip({
  type,
  text,
}: {
  type: "tip" | "warning";
  text: string;
}) {
  return (
    <div className="flex flex-col items-start space-y-2">
      <div className="flex space-x-2 items-center justify-start">
        {type === "tip" ? (
          <p
            className={` flex items-baseline first-letter:capitalize font-medium text-base`}
          >
            Tip
          </p>
        ) : (
          <p
            className={` flex items-center first-letter:capitalize font-medium`}
          >
            Warning
          </p>
        )}
        {type == "tip" ? (
          <FcIdea className="text-xl shrink-0 mb-1" />
        ) : (
          <FcHighPriority className="text-xl shrink-0" />
        )}
      </div>
      <p className="text-sm/6 space-y-2 flex flex-col">{text}</p>
    </div>
  );
}
