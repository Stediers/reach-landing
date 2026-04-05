import SelectCity from "../SelectCity";
import TopBreadCrumb from "./TopBreadCrumb";

export const dynamic = "force-dynamic";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col space-y-5 w-full">{children}</div>;
}
