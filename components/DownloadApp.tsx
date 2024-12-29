"use client";
import { useRouter } from "next/navigation";

export default function AppDownload({
  triggerJSX,
}: {
  triggerJSX: React.ReactNode;
}) {
  const router = useRouter();

  return <div onClick={() => router.push("/download")}>{triggerJSX}</div>;
}
