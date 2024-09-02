import Footer from "@components/footer/Footer";
import { Navbar } from "@components/pages/service/Navbar";
import Link from "next/link";

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function ConsoleLayout({ children }: RootLayoutProps) {
  return (
    <div className="flex flex-1 flex-col items-center md:space-y-0 space-y-0 bg-white !p-0 w-full">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
