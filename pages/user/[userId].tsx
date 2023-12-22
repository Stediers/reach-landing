import {
  FetchCustomerProfile_AppointmentsWithYou,
  FetchCustomerProfile_User,
  fetchCustomerProfile,
} from "@api_functions/customer/fetch-customer-profile";
import { State } from "@data/enums";
import ConsoleWrapper from "@wrapper/ConsoleWrapper";
import { GetServerSidePropsContext } from "next";
import { useEffect, useState } from "react";
import Mobile from "@src/user/[userId]/Mobile";
import Desktop from "@src/user/[userId]/Desktop";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const userId = context.params?.userId;
  if (!userId || typeof userId !== "string") {
    return {
      redirect: {
        destination: "/console/appointments",
        permanent: false,
      },
    };
  } else {
    return {
      props: {
        userId: userId,
      },
    };
  }
}

export default function Main({ userId }: { userId: string }) {
  const [user, setUser] = useState<FetchCustomerProfile_User | null>(null);
  const [appointmentsWithYou, setAppointmentsWithYou] = useState<
    FetchCustomerProfile_AppointmentsWithYou[]
  >([]);

  useEffect(() => {
    setPageState(State.LOADING);
    fetchCustomerProfile(userId).then((res) => {
      if (res) {
        setUser(res.user);
        setAppointmentsWithYou(res.appointmentsWithYou);
        setPageState(State.SUCCESS);
      }
    });
  }, []);

  const [pageState, setPageState] = useState(State.LOADING);
  return (
    <ConsoleWrapper
      title="Customer Profile"
      state={pageState}
      mobileJSX={
        <Mobile user={user} appointmentsWithYou={appointmentsWithYou} />
      }
      desktopJSX={
        <Desktop user={user} appointmentsWithYou={appointmentsWithYou} />
      }
    />
  );
}
