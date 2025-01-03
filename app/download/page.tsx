import { redirect } from "next/navigation";

export default async function DownloadAppRoute() {
  redirect("/partner-program");

  return <div></div>;
}
