export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full px-5 lg:px-10">
      {children}
      {/* <SelectCity cities={["New York", "San Francisco", "Los Angeles"]} /> */}
    </div>
  );
}
