import { redirect } from "next/navigation";

export default async function DownloadAppRoute() {
  redirect("/");

  return <div></div>;
}
