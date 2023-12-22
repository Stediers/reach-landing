import { PreferredGender, State } from "@data/enums";
import ConsoleWrapper from "@wrapper/ConsoleWrapper";
import { useEffect, useState } from "react";
import { GetServerSidePropsContext } from "next";
import Mobile from "@src/console/services/manage/Mobile";
import Desktop from "@src/console/services/manage/Desktop";
import {
  FetchEditServiceMetadataResponse,
  fetchEditServiceMetaData,
} from "@api_functions/service/edit-service";

export function getServerSideProps(context: GetServerSidePropsContext) {
  const serviceId = context.query.serviceId;
  if (typeof serviceId !== "string") {
    return {
      redirect: {
        destination: "/console/services",
        permanent: false,
      },
    };
  }
  return {
    props: {
      serviceId: serviceId,
    },
  };
}

export default function Main({ serviceId }: { serviceId: string }) {
  const [service, setService] =
    useState<FetchEditServiceMetadataResponse | null>(null);
  const [pageState, setPageState] = useState<State>(State.LOADING);
  useEffect(() => {
    fetchEditServiceMetaData(serviceId).then((res) => {
      if (res) {
        setService(res);
        setPageState(State.SUCCESS);
      } else {
        setPageState(State.ERROR);
      }
    });
  }, [serviceId]);

  const [loading, setLoading] = useState(false);

  return (
    <ConsoleWrapper
      title="Manage Service"
      state={pageState}
      mobileJSX={
        service ? (
          <Mobile
            loading={loading}
            setLoading={setLoading}
            service={service}
            serviceId={serviceId}
            setService={setService}
          />
        ) : null
      }
      desktopJSX={
        service && (
          <Desktop
            loading={loading}
            setLoading={setLoading}
            service={service}
            serviceId={serviceId}
            setService={setService}
          />
        )
      }
    />
  );
}
