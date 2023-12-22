import { State } from "@data/enums";
import ConsoleWrapper from "@wrapper/ConsoleWrapper";
import { GetServerSidePropsContext } from "next";
import { useEffect, useState } from "react";
import Mobile from "@src/console/appointments/view-appointment/Mobile";
import devLog from "@helper_functions/devLog";
import {
  FetchAppointmentResponse,
  fetchAppointment,
} from "@api_functions/appointment/fetch-appointment";
import Desktop from "@src/console/appointments/view-appointment/Desktop";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const appointmentId = context.params?.appointmentId;
  if (!appointmentId || typeof appointmentId !== "string") {
    return {
      redirect: {
        destination: "/console/appointments",
        permanent: false,
      },
    };
  } else {
    return {
      props: {
        appointmentId: appointmentId,
      },
    };
  }
}

export default function Main({ appointmentId }: { appointmentId: string }) {
  const [pageState, setPageState] = useState(State.LOADING);
  const [response, setResponse] = useState<FetchAppointmentResponse | null>(
    null
  );

  useEffect(() => {
    setPageState(State.LOADING);
    fetchAppointment(appointmentId).then((res) => {
      if (res) {
        devLog(res);
        setResponse(res);
      } else {
        setPageState(State.ERROR);
      }
      setPageState(State.SUCCESS);
    });
  }, []);

  const [paymentButtonState, setPaymentButtonState] = useState(State.SUCCESS);
  const [cancelButtonState, setCancelButtonState] = useState(State.SUCCESS);
  const [requestRatingButtonState, setRequestRatingButtonState] = useState(
    State.SUCCESS
  );
  return (
    <ConsoleWrapper
      title="View Appointment"
      state={pageState}
      mobileJSX={
        response && (
          <Mobile
            response={response}
            setResponse={setResponse}
            paymentButtonState={paymentButtonState}
            setPaymentButtonState={setPaymentButtonState}
            cancelButtonState={cancelButtonState}
            setCancelButtonState={setCancelButtonState}
            requestRatingButtonState={requestRatingButtonState}
            setRequestRatingButtonState={setRequestRatingButtonState}
          />
        )
      }
      desktopJSX={
        response && (
          <Desktop
            response={response}
            setResponse={setResponse}
            paymentButtonState={paymentButtonState}
            setPaymentButtonState={setPaymentButtonState}
            cancelButtonState={cancelButtonState}
            setCancelButtonState={setCancelButtonState}
            requestRatingButtonState={requestRatingButtonState}
            setRequestRatingButtonState={setRequestRatingButtonState}
          />
        )
      }
    />
  );
}
