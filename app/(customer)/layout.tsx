import { NavBar } from "@components/explore/Navbar";

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function ConsoleLayout({ children }: RootLayoutProps) {
  return (
    <div className="w-full flex flex-col justify-start items-center relative !z-50 !hide-scrollbar">
      <div className="w-full flex flex-col justify-start items-center space-y-5 bg-red-100 sticky top-0 z-50">
        <NavBar />
      </div>
      {children}
    </div>
  );
}
