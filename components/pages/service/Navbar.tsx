"use client";
import { Button } from "@components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export function Navbar() {
  const searchParams = useSearchParams();
  const backLink = searchParams.get("backLink");
  return (
    <div className="sticky top-0 z-50 bg-white flex flex-col w-full items-center border-b justify-center dark:border-gray-700 ">
      <div className="flex flex-row items-center justify-center w-full lg:px-10 px-5 py-3 max-w-[85rem]">
        <div className="lg:grid flex grid-cols-2 w-full justify-between">
          <Link className="flex flex-col w-fit" href={"/explore"}>
            <h1 className="text-xl font-medium">ReachGig</h1>
            <h2 className="text-sm text-gray-500 tracking-wide">
              Be your own Boss.
            </h2>
          </Link>
        </div>
        {backLink && (
          <Link href={backLink} className="w-fit">
            <Button variant="link">Back</Button>
          </Link>
        )}
      </div>
    </div>
  );
}
