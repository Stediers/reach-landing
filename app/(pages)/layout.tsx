import { CustomDrawer } from "@components/DrawerPopup";
import { Button } from "@components/ui/button";
import { DrawerClose } from "@components/ui/drawer";
import { Separator } from "@components/ui/separator";

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function ConsoleLayout({ children }: RootLayoutProps) {
  return (
    <div className="flex flex-1 flex-col items-center md:space-y-0 space-y-0 bg-white !p-0">
      {/* <NavBar /> */}
      <div className="flex flex-col items-center justify-start w-full flex-1 px-0">
        {children}
      </div>
    </div>
  );
}
