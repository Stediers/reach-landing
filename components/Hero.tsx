import { ArrowDownCircle } from "lucide-react";
import ImageComponent from "./ImageComponent";
import { Button } from "./ui/button";

export default function Hero({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`lg:min-h-[75vh] min-h-[60vh] bg-foreground w-full flex flex-col items-center justify-center ${className}`}
    >
      <div className="max-w-4xl text-center">{children}</div>
    </div>
  );
}
