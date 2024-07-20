import { NavBar } from "@components/explore/Navbar";
import { Suspense } from "react";

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function ConsoleLayout({ children }: RootLayoutProps) {
  const randomNumber = Math.random();
  return (
    <div className="w-full flex flex-col justify-start items-center relative !z-50 !hide-scrollbar">
      <div className="w-full flex flex-col justify-start items-center space-y-5 bg-red-100 sticky top-0 z-50">
        <NavBar />
      </div>
      {/* <Suspense fallback={<div>Loading...</div>} key={randomNumber}>
        {children}
      </Suspense> */}
      {children}
    </div>
  );
}
