"use client";
import {
  WordSearchServiceResponse,
  wordSearchService,
} from "@api_functions/explore/word-search-service";
import { ServiceTrigger } from "@components/ServiceCard";
import { Gender, PreferredGender, SortType, State } from "@data/enums";
import LoadingWrapper from "@wrapper/LoadingWrapper";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { Render } from "./Render";

export default function PaginatedResults({
  search,
  searchParams,
  responseData,
}: {
  search: string;
  searchParams: {
    category: string;
    customerGender: string;
    partnerGender: string;
    sort: string;
    state: string;
    online: string;
    verified: string;
    range: string;
    search: string;
  };
  responseData: WordSearchServiceResponse;
}) {
  const [pageState, setPageState] = useState<State>(State.LOADING);
  const [response, setResponse] =
    useState<WordSearchServiceResponse>(responseData);
  const [nextPage, setNextPage] = useState<number>(2);

  const fetch = async () => {
    setPageState(State.LOADING);
    const res = await wordSearchService({
      query: searchParams.search ?? "",
      filter: {
        state: searchParams.state ?? null,
        verified: searchParams.verified === "false" ? false : true,
        online: searchParams.online === "false" ? false : true,
        sort: {
          range:
            Object.values(SortType).find(
              (item) => item === searchParams.range
            ) ?? SortType.HIGH_TO_LOW,
          type: searchParams.sort === "price" ? "price" : "rating",
        },
        customerGender:
          Object.values(PreferredGender).find(
            (item) => item === searchParams.customerGender
          ) ?? PreferredGender.UNISEX,
        partnerGender:
          Object.values(Gender).find(
            (item) => item === searchParams.partnerGender
          ) ?? null,
      },
      category: null,
      pagination: {
        limit: 10,
        page: nextPage,
      },
    });
    if (res) {
      console.log("res", res);
      setResponse((prev) => {
        return prev
          ? {
              data: [...prev.data, ...res.data],
              nextPage: res.nextPage,
            }
          : res;
      });
      res.nextPage && setNextPage((prev) => (prev += 1));
      setPageState(State.SUCCESS);
    } else {
      setPageState(State.ERROR);
    }
  };

  //check if loadingWrapper is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetch();
        }
      },
      { threshold: 0.5 }
    );
    const loadingDoc = document.getElementById("next-page-" + nextPage);
    if (loadingDoc) observer.observe(loadingDoc);
    return () => observer.disconnect();
  }, [nextPage]);

  const backLink = `/explore?search=${search}&category=${searchParams.category}&customerGender=${searchParams.customerGender}&partnerGender=${searchParams.partnerGender}&sort=${searchParams.sort}&state=${searchParams.state}&online=${searchParams.online}&verified=${searchParams.verified}&range=${searchParams.range}`;

  return (
    <div className="flex flex-col w-full space-y-10">
      <div className="grid grid-cols-1 gap-x-14 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 w-full">
        {response && response.data.length > 0
          ? response.data.map((res, index) => (
              <Link
                href={`/service/${res.service.id}?backLink=${backLink}`}
                key={res.service.id}
                className="w-full"
                shallow={true}
              >
                <ServiceTrigger
                  service={res.service}
                  key={res.service.id}
                  partner={res.partner}
                  eager={index === 0}
                />
              </Link>
            ))
          : null}
        {response.nextPage && response.data.length > 0 ? (
          <LoadingWrapper
            showLogo={false}
            text="loading more results..."
            pageState={pageState}
            loadingTextClassName="text-md font-medium"
            loadingSVGClassName="w-6 h-6"
            id={"next-page-" + nextPage}
          />
        ) : null}
      </div>
    </div>
  );
}
