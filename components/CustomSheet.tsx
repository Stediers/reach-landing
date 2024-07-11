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
  description,
  triggerJSX,
  footerJSX,
  children,
  canClose = true,
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
      <SheetContent className="flex flex-col items-start justify-between w-full space-y-5 !p-0 overflow-y-scroll hide-scrollbar">
        <div className="flex flex-col items-start justify-start w-full space-y-0">
          <SheetHeader className="w-full flex flex-row !items-start justify-start space-x-5 border-b bg-white p-5">
            <div className="flex flex-col space-y-2  items-start justify-start w-full">
              <SheetTitle className="text-xl font-medium first-letter:capitalize pr-2 text-left">
                {title}
              </SheetTitle>
              {description && (
                <SheetDescription className="text-base text-left">
                  {description}
                </SheetDescription>
              )}
            </div>
            {canClose && (
              <SheetClose className="shrink-0">
                <MdClose className="w-6 h-6" />
              </SheetClose>
            )}
          </SheetHeader>
          <div className="p-5 w-full">{children}</div>
        </div>
        <SheetFooter className="w-full px-5 sticky bottom-0 bg-white border-t py-4">
          <div className="flex flex-col items-start justify-start space-y-5 w-full">
            {footerJSX}
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
