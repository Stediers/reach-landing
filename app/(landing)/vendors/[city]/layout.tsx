import SelectCity from "../SelectCity";

//revalidate every 10 minutes
export const revalidate = 0;

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
