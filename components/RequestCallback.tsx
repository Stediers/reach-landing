"use client";

import { CallbackStatus, State } from "@data/enums";
import LoadingWrapper from "@wrapper/LoadingWrapper";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { CustomDrawer } from "./DrawerPopup";
import TextArea from "./input/TextArea";
import { sendOTP } from "@api_functions/auth/send-otp";
import { verifyOTP } from "@api_functions/auth/verify-otp";
import { setCookie } from "@api_functions/internal/cookie";
import { Country, countries } from "@data/countries";
import { isValidPhoneNumber } from "libphonenumber-js";
import { useRouter } from "next-nprogress-bar";
import { useSearchParams } from "next/navigation";
import Logo from "./Logo";
import TextInput from "./input/TextInput";
import OtpInput from "react-otp-input";
import { DrawerClose } from "./ui/drawer";
import { CustomDialog, ProfileDialog } from "./DialogPopup";
import {
  RequestCallbackRequest,
  requestCallback,
} from "@api_functions/appointments/callback/request-callback";
import {
  Country as CountryType,
  ICity,
  City,
  IState,
  State as StateType,
} from "country-state-city";
import { SelectStateAndCityAPI } from "./SelectStateAndCity";
import { showSnackBar } from "./notifications/Snackbar";
import Link from "next/link";
import ImageComponent from "./ImageComponent";
import { Callback } from "@data/types";
import {
  FetchCallbackByServiceIdResponse,
  fetchCallbackByServiceId,
} from "@api_functions/appointments/callback/fetch-callback-by-serviceId";
import { openInNewTab } from "@helper_functions/newTab";
import Chip from "./Chip";
import PriceComponent from "./price/MobilePrice";
import MobileLogin from "./sign-in/MobileNumber";
import LoginPerks from "./LoginPerks";
import MobileLoginPopup from "./sign-in/MobileLoginPopup";
import Card from "./Card";
import { Skeleton } from "./ui/skeleton";
import { CustomSheet } from "./CustomSheet";
import TextInputWithDropdown from "./input/TextInputWithDropdown";
import { fetchCity } from "@api_functions/location/get-city";
import Loading from "./Loading";
import { debounce } from "lodash";
import { SheetClose } from "./ui/sheet";
import UnderlinedHeader, { SubUnderlinedHeader } from "./UnderlinedHeader";

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

  const [request, setRequest] = useState<RequestCallbackRequest>({
    location: {
      city: "",
      state: "",
    },
    message: "",
    serviceId: serviceId,
  });

  useEffect(() => {
    console.log("serviceId", serviceId);
    setButtonState(State.LOADING);
    fetchCallbackByServiceId({ serviceId }).then((response) => {
      setButtonState(State.SUCCESS);
      if (response) {
        setResponse(response);
      }
    });
  }, []);

  const [isMobile, setIsMobile] = useState(type === "mobile");

  useEffect(() => {
    if (type !== "both") return;
    //check if mobile
    if (typeof window === "undefined") return;
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, []);
  return isMobile ? (
    <RequestCallbackMobile
      serviceId={serviceId}
      response={response}
      request={request}
      buttonState={buttonState}
      setRequest={setRequest}
      setResponse={setResponse}
      setButtonState={setButtonState}
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
    />
  );
}

export function RequestCallbackDesktop({
  serviceId,
  response,
  request,
  setRequest,
  buttonState,
  setResponse,
  setButtonState,
}: {
  serviceId: string;
  response: FetchCallbackByServiceIdResponse | null;
  request: RequestCallbackRequest;
  setRequest: Dispatch<SetStateAction<RequestCallbackRequest>>;
  buttonState: State;
  setResponse: Dispatch<
    SetStateAction<FetchCallbackByServiceIdResponse | null>
  >;
  setButtonState: Dispatch<SetStateAction<State>>;
}) {
  return (
    <LoadingWrapper
      pageState={buttonState}
      showLogo={false}
      loadingJSX={
        <Card className="!p-10 !items-start shadow-lg">
          <p className="text-center text-xl font-medium">Please wait...</p>
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-full h-40" />
          <Button buttonstate={buttonState} variant="info" className="w-full">
            <p className="text-md font-medium">Please wait...</p>
          </Button>
        </Card>
      }
    >
      {response ? (
        response.callback ? (
          <Card className="!p-10 !items-start shadow-lg">
            <p className="text-center text-xl font-medium">
              Callback Requested
            </p>
            {response.callback.status === CallbackStatus.PENDING ? (
              <Chip title="Pending" className={`text-white bg-info text-xs`} />
            ) : response.callback.status === CallbackStatus.SUCCESS ? (
              <Chip
                title="Success"
                className={`text-white bg-success text-xs`}
              />
            ) : response.callback.status === CallbackStatus.FAILED ? (
              <Chip
                title="Rejected"
                className={`text-white bg-error text-xs`}
              />
            ) : null}
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
            <Button variant="info">Call Partner</Button>
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
                disabled={
                  request.message.length === 0 ||
                  request.location.city.length === 0 ||
                  request.location.state.length === 0
                }
                asyncOnClick={async () => {
                  if (request.message.length === 0) {
                    showSnackBar({
                      message: "Message is required",
                      state: State.ERROR,
                    });
                    return;
                  } else if (request.location.city.length === 0) {
                    showSnackBar({
                      message: "City is required",
                      state: State.ERROR,
                    });
                    return;
                  } else if (request.location.state.length === 0) {
                    showSnackBar({
                      message: "State is required",
                      state: State.ERROR,
                    });
                    return;
                  }
                  const res = await requestCallback(request);
                  if (res) {
                    setResponse({
                      loggedIn: true,
                      callback: res,
                    });
                  }
                }}
              >
                Request a Call
              </Button>
            ) : (
              <MobileLoginPopup
                triggerJSX={
                  <Button
                    variant="info"
                    disabled={
                      request.message.length === 0 ||
                      request.location.city.length === 0 ||
                      request.location.state.length === 0
                    }
                  >
                    Request a Call
                  </Button>
                }
                onVerifyOTP={(loggedIn) => {
                  if (loggedIn) {
                    setButtonState(State.LOADING);
                    requestCallback(request).then((res) => {
                      if (res) {
                        setResponse({
                          loggedIn: true,
                          callback: res,
                        });
                      }
                      setButtonState(State.SUCCESS);
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
          <div className="flex flex-col space-y-5 w-full">
            <ImageComponent
              alt="Login"
              src="/images/login.svg"
              className="w-full h-60"
            />
            <Button variant="success" asChild onClick={() => {}}>
              <Link href={`/user/sign-in?redirectUrl=/service/${serviceId}`}>
                <p className="text-md font-medium">Login</p>
              </Link>
            </Button>
          </div>
        </CustomDialog>
      )}
    </LoadingWrapper>
  );
}

export function RequestCallbackMobile({
  serviceId,
  response,
  request,
  setRequest,
  buttonState,
  setResponse,
  setButtonState,
}: {
  serviceId: string;
  response: FetchCallbackByServiceIdResponse | null;
  request: RequestCallbackRequest;
  setRequest: Dispatch<SetStateAction<RequestCallbackRequest>>;
  buttonState: State;
  setResponse: Dispatch<
    SetStateAction<FetchCallbackByServiceIdResponse | null>
  >;
  setButtonState: Dispatch<SetStateAction<State>>;
}) {
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
                      `tel:${response.callback!!.partner.mobileNumber}`,
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
                {response.callback.status === CallbackStatus.PENDING ? (
                  <Chip
                    title="Pending"
                    className={`text-white bg-info text-xs`}
                  />
                ) : response.callback.status === CallbackStatus.SUCCESS ? (
                  <Chip
                    title="Success"
                    className={`text-white bg-success text-xs`}
                  />
                ) : response.callback.status === CallbackStatus.FAILED ? (
                  <Chip
                    title="Rejected"
                    className={`text-white bg-error text-xs`}
                  />
                ) : null}
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
            description="Fill in the details below to request a callback from the partner."
            footerJSX={
              <div className="grid grid-cols-2 gap-5 w-full">
                <SheetClose asChild>
                  <Button variant="outline">Close</Button>
                </SheetClose>
                {response.loggedIn ? (
                  <Button
                    variant="info"
                    disabled={
                      request.message.length === 0 ||
                      request.location.city.length === 0 ||
                      request.location.state.length === 0
                    }
                    asyncOnClick={async () => {
                      if (request.message.length === 0) {
                        showSnackBar({
                          message: "Message is required",
                          state: State.ERROR,
                        });
                        return;
                      } else if (request.location.city.length === 0) {
                        showSnackBar({
                          message: "City is required",
                          state: State.ERROR,
                        });
                        return;
                      } else if (request.location.state.length === 0) {
                        showSnackBar({
                          message: "State is required",
                          state: State.ERROR,
                        });
                        return;
                      }
                      const res = await requestCallback(request);
                      if (res) {
                        setResponse({
                          loggedIn: true,
                          callback: res,
                        });
                      }
                    }}
                  >
                    Request a Call
                  </Button>
                ) : (
                  <MobileLoginPopup
                    triggerJSX={
                      <Button
                        variant="info"
                        disabled={
                          request.message.length === 0 ||
                          request.location.city.length === 0 ||
                          request.location.state.length === 0
                        }
                      >
                        Request a Call
                      </Button>
                    }
                    onVerifyOTP={(loggedIn) => {
                      if (loggedIn) {
                        setButtonState(State.LOADING);
                        requestCallback(request).then((res) => {
                          if (res) {
                            setResponse({
                              loggedIn: true,
                              callback: res,
                            });
                          }
                          setButtonState(State.SUCCESS);
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
                placeholder="Enter your message here..."
                title="Ask me anything"
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
          <div className="flex flex-col space-y-5 w-full">
            <ImageComponent
              alt="Login"
              src="/images/login.svg"
              className="w-full h-60"
            />
            <Button variant="success" asChild onClick={() => {}}>
              <Link href={`/user/sign-in?redirectUrl=/service/${serviceId}`}>
                <p className="text-md font-medium">Login</p>
              </Link>
            </Button>
          </div>
        </CustomDrawer>
      )}
    </LoadingWrapper>
  );
}
