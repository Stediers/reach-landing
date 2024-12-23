import SelectCity from "../SelectCity";
import TopBreadCrumb from "./TopBreadCrumb";

//revalidate every 10 minutes
export const revalidate = 0;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col space-y-5 w-full py-5">
      <TopBreadCrumb />
      {children}
    </div>
  );
}
