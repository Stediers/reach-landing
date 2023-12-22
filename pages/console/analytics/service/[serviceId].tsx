import {
  FetchTrackingResponse,
  fetchTrackingByServiceId,
} from "@api_functions/analytics/fetch-tracking-by-serviceId";
import { State } from "@data/enums";
import { Tracking } from "@data/types";
import Mobile from "@src/console/analytics/service/[serviceId]/Mobile";
import ConsoleWrapper from "@wrapper/ConsoleWrapper";
import { GetServerSidePropsContext } from "next";
import { useEffect, useState } from "react";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const params = context.params;
  const serviceId = params?.serviceId;
  if (typeof serviceId !== "string") {
    return {
      redirect: {
        destination: "/console/analytics",
        permanent: false,
      },
    };
  }
  return {
    props: {
      serviceId,
    },
  };
}

export default function Main({ serviceId }: { serviceId: string }) {
  const [response, setResponse] = useState<FetchTrackingResponse | null>(null);

  const [pageState, setPageState] = useState<State>(State.LOADING);

  useEffect(() => {
    fetchTrackingByServiceId(serviceId).then((res) => {
      if (res) {
        setResponse(res);
      }
      setPageState(State.SUCCESS);
    });
  }, []);
  return (
    <ConsoleWrapper
      mobileJSX={response && <Mobile response={response} />}
      desktopJSX={<></>}
      title="Analytics"
      state={pageState}
    />
  );
}
