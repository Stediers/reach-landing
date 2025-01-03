import TopBreadCrumb from "./[city]/TopBreadCrumb";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full px-5 lg:px-10 py-5 space-y-5 max-w-7xl">
      <TopBreadCrumb />
      {children}
      {/* <SelectCity cities={["New York", "San Francisco", "Los Angeles"]} /> */}
    </div>
  );
}
