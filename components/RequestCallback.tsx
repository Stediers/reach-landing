"use client";

import { CallbackStatus, CustomerRoutes, State } from "@data/enums";
import LoadingWrapper from "@wrapper/LoadingWrapper";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useMemo,
} from "react";
import { Button } from "./ui/button";
import { CustomDrawer } from "./DrawerPopup";
import TextArea from "./input/TextArea";
import {
  requestCallback,
  RequestCallbackRequest,
} from "@api_functions/appointments/callback/request-callback";
import {
  fetchCallbackByServiceId,
  FetchCallbackByServiceIdResponse,
} from "@api_functions/appointments/callback/fetch-callback-by-serviceId";
import { useRouter } from "next-nprogress-bar";
import { useSearchParams } from "next/navigation";
import TextInput from "./input/TextInput";
import { DrawerClose } from "./ui/drawer";
import { CustomDialog } from "./DialogPopup";
import { SelectStateAndCityAPI } from "./SelectStateAndCity";
import { showSnackBar } from "./notifications/Snackbar";
import Link from "next/link";
import ImageComponent from "./ImageComponent";
import { Callback } from "@data/types";
import Chip from "./Chip";
import MobileLoginPopup from "./sign-in/MobileLoginPopup";
import Card from "./Card";
import { Skeleton } from "./ui/skeleton";
import { CustomSheet } from "./CustomSheet";
import { SheetClose } from "./ui/sheet";
import { SubUnderlinedHeader } from "./UnderlinedHeader";

// Initial request state
const createInitialRequest = (serviceId: string) => ({
  location: { city: "", state: "" },
  message: "",
  serviceId,
});

// Shared component props interface
interface RequestCallbackProps {
  serviceId: string;
  response: FetchCallbackByServiceIdResponse | null;
  request: RequestCallbackRequest;
  setRequest: Dispatch<SetStateAction<RequestCallbackRequest>>;
  buttonState: State;
  setResponse: Dispatch<
    SetStateAction<FetchCallbackByServiceIdResponse | null>
  >;
  setButtonState: Dispatch<SetStateAction<State>>;
  handle: string;
}

// Status chip component
const StatusChip = ({ status }: { status: CallbackStatus }) => {
  switch (status) {
    case CallbackStatus.PENDING:
      return <Chip title="Pending" className="text-white bg-info text-xs" />;
    case CallbackStatus.SUCCESS:
      return <Chip title="Success" className="text-white bg-success text-xs" />;
    case CallbackStatus.FAILED:
      return <Chip title="Rejected" className="text-white bg-error text-xs" />;
    default:
      return null;
  }
};

// Common validation logic
const validateRequest = (request: RequestCallbackRequest) => {
  if (request.message.length === 0) {
    showSnackBar({
      message: "Message is required",
      state: State.ERROR,
    });
    return false;
  } else if (request.location.city.length === 0) {
    showSnackBar({
      message: "City is required",
      state: State.ERROR,
    });
    return false;
  } else if (request.location.state.length === 0) {
    showSnackBar({
      message: "State is required",
      state: State.ERROR,
    });
    return false;
  }
  return true;
};

// Loading skeleton
const LoadingSkeleton = () => (
  <Card className="!p-10 !items-start shadow-lg">
    <p className="text-center text-xl font-medium">Please wait...</p>
    <Skeleton className="w-full h-10" />
    <Skeleton className="w-full h-10" />
    <Skeleton className="w-full h-40" />
    <Button buttonstate={State.LOADING} variant="info" className="w-full">
      <p className="text-md font-medium">Please wait...</p>
    </Button>
  </Card>
);

// Login required component
const LoginRequired = ({
  serviceId,
  handle,
}: {
  serviceId: string;
  handle: string;
}) => {
  const redirectUrl = CustomerRoutes.SERVICE.replace(
    "[serviceId]",
    serviceId
  ).replace("[partnerHandle]", handle);

  return (
    <div className="flex flex-col space-y-5 w-full">
      <ImageComponent
        alt="Login"
        src="/images/login.svg"
        className="w-full h-60"
      />
      <Button variant="success" asChild onClick={() => {}}>
        <Link href={`/user/sign-in?redirectUrl=${redirectUrl}`}>
          <p className="text-md font-medium">Login</p>
        </Link>
      </Button>
    </div>
  );
};

// Main RequestCallback component
export function RequestCallback({
  serviceId,
  type = "both",
}: {
  serviceId: string;
  type?: "mobile" | "desktop" | "both";
}) {
  const [buttonState, setButtonState] = useState(State.LOADING);
  const [response, setResponse] =
    useState<FetchCallbackByServiceIdResponse | null>(null);
  const [request, setRequest] = useState<RequestCallbackRequest>(
    createInitialRequest(serviceId)
  );
  const [isMobile, setIsMobile] = useState(type === "mobile");

  // Load callback data
  useEffect(() => {
    const loadCallbackData = async () => {
      setButtonState(State.LOADING);
      try {
        const result = await fetchCallbackByServiceId({ serviceId });
        if (result) {
          setResponse(result);
        }
        setButtonState(State.SUCCESS);
      } catch (error) {
        console.error("Error fetching callback data:", error);
        setButtonState(State.ERROR);
      }
    };

    loadCallbackData();
  }, [serviceId]);

  // Check device type
  useEffect(() => {
    if (type !== "both") return;
    if (typeof window === "undefined") return;

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [type]);

  const handle = response?.callback?.partner.handle ?? "";

  return isMobile ? (
    <RequestCallbackMobile
      serviceId={serviceId}
      response={response}
      request={request}
      buttonState={buttonState}
      setRequest={setRequest}
      setResponse={setResponse}
      setButtonState={setButtonState}
      handle={handle}
    />
  ) : (
    <RequestCallbackDesktop
      serviceId={serviceId}
      response={response}
      request={request}
      buttonState={buttonState}
      setRequest={setRequest}
      setResponse={setResponse}
      setButtonState={setButtonState}
      handle={handle}
    />
  );
}

// Desktop version
export function RequestCallbackDesktop({
  serviceId,
  response,
  request,
  setRequest,
  buttonState,
  setResponse,
  setButtonState,
  handle,
}: RequestCallbackProps) {
  const isFormValid = useMemo(
    () =>
      request.message.length > 0 &&
      request.location.city.length > 0 &&
      request.location.state.length > 0,
    [request]
  );

  const handleRequestCallback = async () => {
    if (!validateRequest(request)) return;

    try {
      const res = await requestCallback(request);
      if (res) {
        setResponse({
          loggedIn: true,
          callback: res,
        });
      }
    } catch (error) {
      console.error("Error requesting callback:", error);
      showSnackBar({
        message: "Failed to request callback",
        state: State.ERROR,
      });
    }
  };

  return (
    <LoadingWrapper
      pageState={buttonState}
      showLogo={false}
      loadingJSX={<LoadingSkeleton />}
    >
      {response ? (
        response.callback ? (
          <Card className="!p-10 !items-start shadow-lg">
            <p className="text-center text-xl font-medium">
              Callback Requested
            </p>
            <StatusChip status={response.callback.status} />
            <div className="flex flex-col space-y-1 w-full">
              <p className="text-sm font-medium first-letter:capitalize text-textsubtle">
                Location
              </p>
              <p className="text-base font-medium first-letter:capitalize">
                {response.callback.location.city},{" "}
                {response.callback.location.state}
              </p>
            </div>

            <div className="flex flex-col space-y-1 w-full">
              <p className="text-sm font-medium first-letter:capitalize text-textsubtle">
                Message
              </p>
              <p className="text-base font-medium first-letter:capitalize">
                {response.callback.message}
              </p>
            </div>
            <Button
              variant="info"
              onClick={() =>
                window.open(
                  `tel:${response.callback?.partner.mobileNumber}`,
                  "_self"
                )
              }
            >
              Call Partner
            </Button>
          </Card>
        ) : (
          <Card className="!p-10 !items-start shadow-lg">
            <SubUnderlinedHeader title="Request a Callback" />
            <SelectStateAndCityAPI
              onSelect={(location) => {
                setRequest({
                  ...request,
                  location,
                });
              }}
            />
            <TextArea
              onChange={(value) => setRequest({ ...request, message: value })}
              value={request.message}
              placeholder="Enter your message here..."
              title="Ask me anything"
            />
            {response.loggedIn ? (
              <Button
                variant="info"
                disabled={!isFormValid}
                asyncOnClick={handleRequestCallback}
              >
                Request a Call
              </Button>
            ) : (
              <MobileLoginPopup
                triggerJSX={
                  <Button variant="info" disabled={!isFormValid}>
                    Request a Call
                  </Button>
                }
                onVerifyOTP={(loggedIn) => {
                  if (loggedIn) {
                    setButtonState(State.LOADING);
                    requestCallback(request)
                      .then((res) => {
                        if (res) {
                          setResponse({
                            loggedIn: true,
                            callback: res,
                          });
                        }
                        setButtonState(State.SUCCESS);
                      })
                      .catch(() => {
                        setButtonState(State.ERROR);
                      });
                  }
                }}
              />
            )}
          </Card>
        )
      ) : (
        <CustomDialog
          triggerJSX={<Button variant="info">Request a Call</Button>}
          title="Login Required"
          description="This feature is only available to logged in users."
          footerJSX={<></>}
        >
          <LoginRequired serviceId={serviceId} handle={handle} />
        </CustomDialog>
      )}
    </LoadingWrapper>
  );
}

// Mobile version
export function RequestCallbackMobile({
  serviceId,
  response,
  request,
  setRequest,
  buttonState,
  setResponse,
  setButtonState,
  handle,
}: RequestCallbackProps) {
  const isFormValid = useMemo(
    () =>
      request.message.length > 0 &&
      request.location.city.length > 0 &&
      request.location.state.length > 0,
    [request]
  );

  const handleRequestCallback = async () => {
    if (!validateRequest(request)) return;

    try {
      const res = await requestCallback(request);
      if (res) {
        setResponse({
          loggedIn: true,
          callback: res,
        });
      }
    } catch (error) {
      console.error("Error requesting callback:", error);
      showSnackBar({
        message: "Failed to request callback",
        state: State.ERROR,
      });
    }
  };

  return (
    <LoadingWrapper
      pageState={buttonState}
      showLogo={false}
      loadingJSX={
        <Button
          variant="info"
          className="w-full"
          buttonstate={buttonState}
          disabled
        >
          <p className="text-md font-medium">Please wait...</p>
        </Button>
      }
    >
      {response ? (
        response.callback ? (
          <CustomSheet
            title="Callback Requested"
            description="Your callback request has been sent to the partner. You will be contacted shortly."
            footerJSX={
              <div className="grid grid-cols-2 gap-5 w-full">
                <SheetClose asChild>
                  <Button variant="outline">Close</Button>
                </SheetClose>
                <Button
                  variant="info"
                  onClick={() =>
                    window.open(
                      `tel:${response.callback?.partner.mobileNumber}`,
                      "_self"
                    )
                  }
                >
                  Call Partner
                </Button>
              </div>
            }
            triggerJSX={<Button variant="info">Already Requested</Button>}
          >
            <div className="flex flex-col space-y-1 w-full">
              <p className="text-sm font-medium first-letter:capitalize text-textsubtle">
                Status
              </p>
              <div className="flex flex-col !items-start w-full space-y-5">
                <StatusChip status={response.callback.status} />
                <div className="flex flex-col space-y-1 w-full">
                  <p className="text-sm font-medium first-letter:capitalize text-textsubtle">
                    Location
                  </p>
                  <p className="text-base font-medium first-letter:capitalize">
                    {response.callback.location.city},{" "}
                    {response.callback.location.state}
                  </p>
                </div>

                <div className="flex flex-col space-y-1 w-full">
                  <p className="text-sm font-medium first-letter:capitalize text-textsubtle">
                    Message
                  </p>
                  <p className="text-base font-medium first-letter:capitalize">
                    {response.callback.message}
                  </p>
                </div>
              </div>
            </div>
          </CustomSheet>
        ) : (
          <CustomSheet
            title="Request a Callback"
            description="This is how you can know if this partner is right for you. Request a callback and ask them anything."
            footerJSX={
              <div className="grid grid-cols-2 gap-5 w-full">
                <SheetClose asChild>
                  <Button variant="outline">Close</Button>
                </SheetClose>
                {response.loggedIn ? (
                  <Button
                    variant="info"
                    disabled={!isFormValid}
                    asyncOnClick={handleRequestCallback}
                  >
                    Request a Call
                  </Button>
                ) : (
                  <MobileLoginPopup
                    triggerJSX={
                      <Button variant="info" disabled={!isFormValid}>
                        Request a Call
                      </Button>
                    }
                    onVerifyOTP={(loggedIn) => {
                      if (loggedIn) {
                        setButtonState(State.LOADING);
                        requestCallback(request)
                          .then((res) => {
                            if (res) {
                              setResponse({
                                loggedIn: true,
                                callback: res,
                              });
                            }
                            setButtonState(State.SUCCESS);
                          })
                          .catch(() => {
                            setButtonState(State.ERROR);
                          });
                      }
                    }}
                  />
                )}
              </div>
            }
            triggerJSX={<Button variant="info">Request a Call</Button>}
          >
            <div className="flex flex-col !items-start w-full space-y-5">
              <SelectStateAndCityAPI
                onSelect={(location) => {
                  setRequest({
                    ...request,
                    location,
                  });
                }}
              />
              <TextArea
                onChange={(value) => setRequest({ ...request, message: value })}
                value={request.message}
                title="Ask me anything..."
                placeholder="Ex. Can we have a call at 5 PM?"
              />
            </div>
          </CustomSheet>
        )
      ) : (
        <CustomDrawer
          triggerJSX={<Button variant="info">Request a Call</Button>}
          title="Login Required"
          description="This feature is only available to logged in users."
          footerJSX={<></>}
        >
          <LoginRequired serviceId={serviceId} handle={handle} />
        </CustomDrawer>
      )}
    </LoadingWrapper>
  );
}
