"use client";

import {
  FetchAvilableCitiesResponse,
  fetchAvilableCities,
} from "@api_functions/explore/fetch-available-cities";
import Card from "@components/Card";
import { CustomDialog } from "@components/DialogPopup";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@components/ui/breadcrumb";
import { Button } from "@components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { CustomerRoutes, State } from "@data/enums";
import { getCityStateCountry } from "@helper_functions/getIpAddress";
import { ChevronDown } from "lucide-react";
import { useParams, usePathname } from "next/navigation";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { AiFillCheckSquare } from "react-icons/ai";
import Link from "next/link";
import stringFormater from "@helper_functions/text/string-formater";

export default function TopBreadCrumb() {
  const path = usePathname();
  const params = path.split("/");
  console.log("top breadcrumb", params);
  const designation = params[3] ? params[3] : undefined;
  const [state, setState] = useState<State>(State.LOADING);
  const city = params[2] ? params[2].replace("-", " ") : "";
  const [cities, setCities] = useState<FetchAvilableCitiesResponse | null>(
    null
  );
  useEffect(() => {
    setState(State.LOADING);
    Promise.all([
      fetchAvilableCities().then((res) => {
        if (res) {
          setCities(res);
          console.log("cities", res);
        } else {
          setCities(null);
        }
      }),
    ]).then(() => {
      setState(State.SUCCESS);
    });
  }, []);
  return (
    <Breadcrumb>
      {/* <BreadcrumbList>
        {params.map((param, index) => (
          <BreadcrumbItem key={index}>
            {param === "" ? (
              <BreadcrumbLink>Home</BreadcrumbLink>
            ) : (
              <BreadcrumbLink href={`/${param}`}>
                {param.replace("-", " ")}
              </BreadcrumbLink>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList> */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Breadcrumb>vendors</Breadcrumb>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {city && (
            <>
              <BreadcrumbItem>
                {/* {params.length === 3 ? (
                  <BreadcrumbPage>{city}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={`/vendors/${city}`}>
                    {city}
                  </BreadcrumbLink>
                )} */}
                {state === State.SUCCESS ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1">
                      <span>{city}</span>
                      <ChevronDown size={14} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuLabel className="!font-medium">
                        Choose City
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {cities
                        ? cities.cities.map((cityData) => (
                            <DropdownMenuItem key={cityData.name} asChild>
                              <Link
                                href={
                                  designation
                                    ? CustomerRoutes.VENDORS_BY_DESIGNATION.replace(
                                        "[city]",
                                        cityData.name
                                      ).replace("[designation]", designation)
                                    : CustomerRoutes.VENDORS_BY_CITY.replace(
                                        "[city]",
                                        cityData.name
                                      )
                                }
                                className="flex items-center gap-x-4"
                              >
                                {cityData.name}
                                {cityData.name === city ? (
                                  <AiFillCheckSquare className="text-base text-success lg:bg-white shrink-0" />
                                ) : null}
                              </Link>
                            </DropdownMenuItem>
                          ))
                        : null}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Link
                          href={CustomerRoutes.VENDORS_BY_CITY.replace(
                            "[city]",
                            "all"
                          )}
                          className="flex items-center gap-x-4"
                        >
                          <span>Explore around the world</span>
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : state === State.LOADING ? (
                  <p className="flex items-center gap-1">Locating...</p>
                ) : null}
              </BreadcrumbItem>
              {params.length > 3 ? <BreadcrumbSeparator /> : null}
            </>
          )}
          <BreadcrumbItem>
            {params.length === 4 ? (
              <BreadcrumbPage>
                {stringFormater(params[3].replace("-", " "))}
              </BreadcrumbPage>
            ) : (
              <BreadcrumbLink href={`/vendors/${city}/${designation}`}>
                {designation}
              </BreadcrumbLink>
            )}
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </Breadcrumb>
  );
}
