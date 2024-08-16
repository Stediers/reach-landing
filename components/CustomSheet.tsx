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

export function CustomSheet({
  title,
  description,
  triggerJSX,
  footerJSX,
  children,
  maxWidth,
  canClose,
}: {
  title: string;
  triggerJSX: React.ReactNode;
  footerJSX: React.ReactNode;
  children: React.ReactNode;
  description?: string;
  maxWidth?: string;
  canClose?: boolean;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="w-full">{triggerJSX}</div>
      </SheetTrigger>
      <SheetContent
        className={`flex flex-col items-start justify-between w-full space-y-5 !p-0 overflow-y-scroll hide-scrollbar ${maxWidth}`}
      >
        <div className="flex flex-col items-start justify-start w-full space-y-0">
          <SheetHeader className="w-full flex flex-col !items-start justify-start space-y-1 border-b bg-white p-5 sticky top-0 z-50">
            <SheetTitle className="text-xl font-medium first-letter:capitalize pr-2 !text-left">
              {title}
            </SheetTitle>
            {description && (
              <SheetDescription className="text-base text-left">
                {description}
              </SheetDescription>
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
