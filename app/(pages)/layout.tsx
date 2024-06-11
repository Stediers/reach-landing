import { CustomDrawer } from "@components/DrawerPopup";
import { Button } from "@components/ui/button";
import { DrawerClose } from "@components/ui/drawer";
import { Separator } from "@components/ui/separator";

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function ConsoleLayout({ children }: RootLayoutProps) {
  return (
    <div className="flex flex-1 flex-col md:space-y-0 space-y-0 bg-white !p-0">
      {/* <NavBar /> */}
      <section
        className="flex flex-col items-center justify-start w-full flex-1 px-0"
        vaul-drawer-wrapper=""
      >
        {children}
      </section>
    </div>
  );
}
