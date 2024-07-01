import {
  AiFillCloseCircle,
  AiFillLeftCircle,
  AiFillLeftSquare,
  AiFillRightCircle,
} from "react-icons/ai";
import { DrawerTitle } from "./ui/drawer";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { BiLeftArrowAlt, BiRightArrow, BiRightArrowAlt } from "react-icons/bi";
import { CrossIcon } from "lucide-react";
import { MdClose } from "react-icons/md";

export function CustomSheet({
  title,
  triggerJSX,
  footerJSX,
  children,
  description,
  canClose,
}: {
  title: string;
  triggerJSX: React.ReactNode;
  footerJSX: React.ReactNode;
  children: React.ReactNode;
  description?: string;
  canClose?: boolean;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="w-full">{triggerJSX}</div>
      </SheetTrigger>
      <SheetContent className="flex flex-col items-start justify-between w-full space-y-5 hide-scrollbar">
        <div className="flex flex-col items-start justify-start w-full !space-y-5 overflow-y-scroll hide-scrollbar">
          <SheetHeader className="w-full flex flex-col items-start justify-start space-y-1">
            <div className="flex flex-row items-center justify-between space-x-2 w-full">
              <SheetTitle className="text-xl font-medium first-letter:capitalize pr-2">
                {title}
              </SheetTitle>
              {canClose && (
                <SheetClose>
                  <MdClose className="w-6 h-6" />
                </SheetClose>
              )}
            </div>
            {description && (
              <SheetDescription className="text-base font-normal">
                {description}
              </SheetDescription>
            )}
          </SheetHeader>
          {children}
        </div>
        <SheetFooter className="w-full sticky bottom-5">
          <div className="flex flex-col items-start justify-start space-y-5 w-full">
            {footerJSX}
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
