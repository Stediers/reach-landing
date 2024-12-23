"use client";

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@components/ui/breadcrumb";
import { CustomerRoutes } from "@data/enums";
import { usePathname } from "next/navigation";

export default function TopBreadCrumb() {
  const path = usePathname();
  const params = path.split("/");
  console.log("top breadcrumb", params);
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          {params.length < 4 ? (
            <BreadcrumbPage>Vendors</BreadcrumbPage>
          ) : (
            <BreadcrumbLink
              href={CustomerRoutes.VENDORS.replace("[city]", params[2])}
            >
              Vendors
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
        {params.length > 3 && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Makeup Artists</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
