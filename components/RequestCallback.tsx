"use client";

import { CallbackStatus, State } from "@data/enums";
import LoadingWrapper from "@wrapper/LoadingWrapper";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
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
import { requestCallback } from "@api_functions/appointments/callback/request-callback";
import {
  Country as CountryType,
  ICity,
  City,
  IState,
  State as StateType,
} from "country-state-city";
import SelectStateAndCity from "./SelectStateAndCity";
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

export function RequestCallback({ serviceId }: { serviceId: string }) {
  return window.innerWidth < 768 ? (
    <RequestCallbackMobile serviceId={serviceId} />
  ) : (
    <RequestCallbackDesktop serviceId={serviceId} />
  );
}

function RequestCallbackMobile({ serviceId }: { serviceId: string }) {
  const [buttonState, setButtonState] = useState(State.LOADING);
  const [response, setResponse] =
    useState<FetchCallbackByServiceIdResponse | null>(null);

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

  const [message, setMessage] = useState("");
  const [state, setState] = useState<IState | null>(null);
  const [city, setCity] = useState<ICity | null>(null);

  return (
    <LoadingWrapper
      pageState={buttonState}
      showLogo={false}
      loadingJSX={
        <Button buttonstate={buttonState} variant="info">
          <p className="text-md font-medium">Please wait...</p>
        </Button>
      }
    >
      {response ? (
        response.callback ? (
          <CustomSheet
            triggerJSX={
              <Button variant="success" id="open">
                Callback Details
              </Button>
            }
            title="Callback Requested"
            description="Your callback request has been successfully sent to the partner. They will get back to you shortly."
            footerJSX={
              <div className="grid grid-cols-2 gap-4 w-full">
                <Button
                  variant="info"
                  id="open"
                  onClick={() => {
                    openInNewTab(
                      `tel:${response.callback!!.partner.mobileNumber}`
                    );
                  }}
                >
                  Call Partner
                </Button>
                <DrawerClose className="w-full" id="close-drawer">
                  <Button variant="outline">Close</Button>
                </DrawerClose>
              </div>
            }
          >
            <div className="flex flex-col space-y-5 w-full">
              <div className="flex flex-col space-y-2 w-full">
                <div className="flex flex-row justify-between items-start w-full space-x-4">
                  <p className="text-lg font-medium first-letter:capitalize break-words">
                    {response.callback.service.title}
                  </p>
                  <div className="flex flex-row justify-start space-x-3 items-center shrink-0">
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
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-1 w-full">
                <p className="text-sm font-medium first-letter:capitalize text-textsubtle">
                  Your Partner
                </p>
                <ProfileDialog
                  available={response.callback.partner.available}
                  gender={response.callback.partner.gender}
                  imageUrl={response.callback.partner.imageUrl}
                  name={
                    response.callback.partner.firstName +
                    " " +
                    response.callback.partner.lastName
                  }
                  rating={response.callback.partner.rating}
                  footerJSX={
                    <Button
                      variant="success"
                      onClick={() => {
                        console.log("Call Partner");
                      }}
                    >
                      Call Partner
                    </Button>
                  }
                  triggerJSX={
                    <p className="text-base font-medium first-letter:capitalize underline underline-offset-4 text-info">
                      {response.callback.partner.firstName}{" "}
                      {response.callback.partner.lastName}
                    </p>
                  }
                />
              </div>

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
              <PriceComponent price={response.callback.service.price} />
            </div>
          </CustomSheet>
        ) : response.loggedIn ? (
          <CustomDrawer
            triggerJSX={
              <Button variant="info" id="open">
                Request a Call
              </Button>
            }
            title="Request a Call"
            description="Let the partner know you are interested in their service. They will get back to you shortly."
            footerJSX={
              <div className="flex flex-col space-y-2 w-full">
                <Button
                  variant="success"
                  disabled={message.length === 0 || !state || !city}
                  asyncOnClick={async () => {
                    if (!state || !city) return;
                    const res = await requestCallback({
                      message: message,
                      serviceId: serviceId,
                      location: {
                        city: city.name,
                        state: state.name,
                      },
                    });
                    if (res) {
                      setResponse({
                        loggedIn: true,
                        callback: res,
                      });
                    }
                    const closeDoc = document.getElementById("close-drawer");
                    if (closeDoc) {
                      closeDoc.click();
                    }
                  }}
                >
                  <p className="text-md font-medium">Request a Call</p>
                </Button>
                <DrawerClose className="w-full" id="close-drawer">
                  <Button variant="outline">
                    <p className="text-md font-medium">Cancel</p>
                  </Button>
                </DrawerClose>
              </div>
            }
          >
            <div className="flex flex-col space-y-5 w-full">
              <SelectStateAndCity
                city={city ? city.name : ""}
                state={state ? state.name : ""}
                onCityChange={(city) => setCity(city)}
                onStateChange={(state) => setState(state)}
                selectCity={true}
              />
              <TextArea
                onChange={(value) => setMessage(value)}
                value={message}
                placeholder="Enter your message here..."
                title="Ask me anything"
              />
            </div>
          </CustomDrawer>
        ) : (
          <CustomDrawer
            triggerJSX={
              <Button variant="info" id="open">
                Request a Call
              </Button>
            }
            title="Login Required"
            description="This feature is only available to logged in users."
            footerJSX={
              <DrawerClose className="w-full" id="close-drawer" asChild>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            }
          >
            <SelectStateAndCity
              city={city ? city.name : ""}
              state={state ? state.name : ""}
              onCityChange={(city) => setCity(city)}
              onStateChange={(state) => setState(state)}
              selectCity={true}
            />
            <TextArea
              onChange={(value) => setMessage(value)}
              value={message}
              placeholder="Enter your message here..."
              title="Ask me anything"
            />
            <MobileLoginPopup
              triggerJSX={
                <Button
                  variant="info"
                  disabled={message.length === 0 || !state || !city}
                >
                  Request
                </Button>
              }
              onVerifyOTP={(loggedIn) => {
                if (loggedIn) {
                  setButtonState(State.LOADING);
                  requestCallback({
                    location: {
                      city: city ? city.name : "",
                      state: state ? state.name : "",
                    },
                    message: message,
                    serviceId: serviceId,
                  }).then((res) => {
                    if (res) {
                      setResponse({
                        loggedIn: true,
                        callback: res,
                      });
                    } else {
                      window.location.reload();
                    }
                    setButtonState(State.SUCCESS);
                  });
                }
              }}
            />
          </CustomDrawer>
        )
      ) : (
        <MobileLoginPopup
          onVerifyOTP={(loggedIn) => {
            if (loggedIn) {
              setButtonState(State.LOADING);
              requestCallback({
                location: {
                  city: city ? city.name : "",
                  state: state ? state.name : "",
                },
                message: message,
                serviceId: serviceId,
              }).then((res) => {
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
          triggerJSX={
            <Button variant="info" id="open">
              Request a Call
            </Button>
          }
        />
      )}
    </LoadingWrapper>
  );
}

function RequestCallbackDesktop({ serviceId }: { serviceId: string }) {
  const [buttonState, setButtonState] = useState(State.LOADING);
  const [response, setResponse] =
    useState<FetchCallbackByServiceIdResponse | null>(null);

  useEffect(() => {
    setButtonState(State.LOADING);
    fetchCallbackByServiceId({ serviceId }).then((response) => {
      setButtonState(State.SUCCESS);
      if (response) {
        setResponse(response);
      }
    });
  }, []);

  const [message, setMessage] = useState("");
  const [state, setState] = useState<IState | null>(null);
  const [city, setCity] = useState<ICity | null>(null);

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
        ) : response.loggedIn ? (
          <Card className="!p-10 !items-start shadow-lg">
            <SelectStateAndCity
              city={city ? city.name : ""}
              state={state ? state.name : ""}
              onCityChange={(city) => setCity(city)}
              onStateChange={(state) => setState(state)}
              selectCity={true}
            />
            <TextArea
              onChange={(value) => setMessage(value)}
              value={message}
              placeholder="Enter your message here..."
              title="Ask me anything"
            />
            <Button
              variant="info"
              disabled={message.length === 0 || !state || !city}
              asyncOnClick={async () => {
                if (!state || !city) return;
                const res = await requestCallback({
                  message: message,
                  serviceId: serviceId,
                  location: {
                    city: city.name,
                    state: state.name,
                  },
                });
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
          </Card>
        ) : (
          <Card className="!p-10 !items-start shadow-lg">
            <p className="text-center text-xl font-medium">
              Request a call from the partner
            </p>
            <div className="flex flex-col space-y-5 w-full">
              <SelectStateAndCity
                city={city ? city.name : ""}
                state={state ? state.name : ""}
                onCityChange={(city) => setCity(city)}
                onStateChange={(state) => setState(state)}
                selectCity={true}
              />
              <TextArea
                onChange={(value) => setMessage(value)}
                value={message}
                placeholder="Enter your message here..."
                title="What would you like to ask?"
              />
            </div>
            <MobileLoginPopup
              triggerJSX={
                <Button
                  variant="info"
                  disabled={message.length === 0 || !state || !city}
                >
                  Request a Call
                </Button>
              }
              onVerifyOTP={(loggedIn) => {
                if (loggedIn) {
                  setButtonState(State.LOADING);
                  requestCallback({
                    location: {
                      city: city ? city.name : "",
                      state: state ? state.name : "",
                    },
                    message: message,
                    serviceId: serviceId,
                  }).then((res) => {
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
