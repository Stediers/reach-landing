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
import { requestCallback } from "@api_functions/callback/request-callback";
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
} from "@api_functions/callback/fetch-callback-by-serviceId";
import { openInNewTab } from "@helper_functions/newTab";
import Chip from "./Chip";
import PriceComponent from "./price/MobilePrice";

export function RequestCallback({ serviceId }: { serviceId: string }) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, []);
  return isMobile ? (
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
          <CustomDrawer
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
                  variant="success"
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
            </div>
            <PriceComponent price={response.callback.service.price} />
          </CustomDrawer>
        ) : response.loggedIn ? (
          <CustomDrawer
            triggerJSX={
              <Button variant="info" id="open">
                Request Callback
              </Button>
            }
            title="Request Callback"
            description="Let the partner know you are interested in their service. They will get back to you shortly."
            footerJSX={
              <div className="flex flex-col space-y-2 w-full">
                <Button
                  variant="success"
                  disabled={message.length === 0}
                  onclick={async () => {
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
                  <p className="text-md font-medium">Request Callback</p>
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
            triggerJSX={<Button variant="info">Request Callback</Button>}
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
        )
      ) : (
        <CustomDrawer
          triggerJSX={<Button variant="info">Request Callback</Button>}
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

function LoginMobile({
  setIsLoggedIn,
}: {
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}) {
  const [showOTP, setShowOTP] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [country, setCountry] = useState<Country>(countries["India"]);
  const [sendOTPButtonState, setSendOTPButtonState] = useState(State.SUCCESS);

  return (
    <div className="flex flex-col items-center justify-center space-y-5 flex-1 w-full">
      <div className="flex bg-white flex-col items-center w-full rounded-xl space-y-5 h-fit">
        {showOTP ? (
          <VerifyOTP
            mobileNumber={mobileNumber}
            country={country}
            setIsLoggedIn={setIsLoggedIn}
            id="close-login-drawer"
          />
        ) : (
          <MobileNumberInput
            setShowOTP={setShowOTP}
            mobileNumber={mobileNumber}
            setMobileNumber={setMobileNumber}
            country={country}
            setCountry={setCountry}
            setSendOTPButtonState={setSendOTPButtonState}
            sendOTPButtonState={sendOTPButtonState}
          />
        )}
        <div className="grid grid-cols-1 gap-4 w-full">
          {!showOTP ? (
            <Button
              variant="success"
              disabled={!verifyMobileNumber(mobileNumber, country.maxLength)}
              className="!w-full"
              onClick={async () => {
                setSendOTPButtonState(State.LOADING);
                const response = await sendOTP(country.code + mobileNumber);
                if (response) {
                  setShowOTP(true);
                }
                setSendOTPButtonState(State.SUCCESS);
              }}
            >
              {sendOTPButtonState == State.LOADING
                ? "Sending OTP..."
                : "Send OTP"}
            </Button>
          ) : (
            <Button
              variant="default"
              disabled={!verifyMobileNumber(mobileNumber, country.maxLength)}
              className={`!w-full`}
              onClick={async () => {
                setShowOTP(false);
              }}
            >
              Change Mobile Number
            </Button>
          )}
          <DrawerClose className="w-full" id="close-login-drawer">
            <Button variant="outline">
              <p className="text-md font-medium">Cancel</p>
            </Button>
          </DrawerClose>
        </div>
      </div>
    </div>
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
        <Button buttonstate={buttonState} variant="info">
          <p className="text-md font-medium">Please wait...</p>
        </Button>
      }
    >
      {response ? (
        response.callback ? (
          <CustomDialog
            triggerJSX={
              <Button variant="success" id="open">
                Callback Details
              </Button>
            }
            title="Callback Requested"
            description="Your callback request has been successfully sent to the partner. They will get back to you shortly."
            footerJSX={
              <Button
                variant="success"
                onClick={() => {
                  openInNewTab(
                    `tel:${response.callback!!.partner.mobileNumber}`
                  );
                }}
              >
                Call Partner
              </Button>
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
            </div>
            <PriceComponent price={response.callback.service.price} />
          </CustomDialog>
        ) : response.loggedIn ? (
          <CustomDialog
            triggerJSX={
              <Button variant="info" id="open">
                Request Callback
              </Button>
            }
            title="Request Callback"
            description="Let the partner know you are interested in their service. They will get back to you shortly."
            footerJSX={
              <div className="flex flex-col space-y-2 w-full">
                <Button
                  variant="success"
                  disabled={message.length === 0}
                  onclick={async () => {
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
                  <p className="text-md font-medium">Request Callback</p>
                </Button>
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
          </CustomDialog>
        ) : (
          <CustomDialog
            triggerJSX={<Button variant="info">Request Callback</Button>}
            title="Login Required"
            description="This feature is only available to logged in users."
            footerJSX={
              <Button variant="success" asChild onClick={() => {}}>
                <Link href={`/user/sign-in?redirectUrl=/service/${serviceId}`}>
                  <p className="text-md font-medium">Login</p>
                </Link>
              </Button>
            }
          >
            <div className="flex flex-col space-y-5 w-full">
              <ImageComponent
                alt="Login"
                src="/images/login.svg"
                className="w-full h-60"
              />
            </div>
          </CustomDialog>
        )
      ) : (
        <CustomDialog
          triggerJSX={<Button variant="info">Request Callback</Button>}
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

function MobileNumberInput({
  setShowOTP,
  mobileNumber,
  setMobileNumber,
  country,
  setCountry,
  setSendOTPButtonState,
  sendOTPButtonState,
}: {
  setShowOTP: Dispatch<SetStateAction<boolean>>;
  mobileNumber: string;
  setMobileNumber: Dispatch<SetStateAction<string>>;
  country: Country;
  setCountry: Dispatch<SetStateAction<Country>>;
  setSendOTPButtonState: Dispatch<SetStateAction<State>>;
  sendOTPButtonState: State;
}) {
  return (
    <div className="space-y-4 w-full flex flex-col items-center">
      <TextInput
        type="tel"
        placeholder="Ex: 9876543210"
        title="Mobile Number"
        onChange={(value) => setMobileNumber(value)}
        value={mobileNumber}
        autoFocus={true}
        errorText={
          isValidPhoneNumber(country.code + mobileNumber)
            ? ""
            : "Invalid mobile number"
        }
        maxLength={country.maxLength}
        onKeyDown={async (e) => {
          if (mobileNumber.length == country.maxLength) {
            if (e.key == "Enter") {
              setSendOTPButtonState(State.LOADING);
              const response = await sendOTP(country.code + mobileNumber);
              if (response) {
                setShowOTP(true);
              }
              setSendOTPButtonState(State.SUCCESS);
            }
          } else return;
        }}
      />
    </div>
  );
}

function verifyMobileNumber(mobileNumber: string, maxLength: number) {
  if (mobileNumber.length != maxLength) {
    return false;
  } else if (!mobileNumber.match(/^[0-9]+$/)) {
    return false;
  } else {
    return true;
  }
}

function VerifyOTP({
  mobileNumber,
  country,
  setIsLoggedIn,
  id,
}: {
  mobileNumber: string;
  country: Country;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  id: string;
}) {
  const [OTP, setOTP] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  return !loading ? (
    <div className="flex flex-col items-center w-full space-y-4">
      <p className="text-center text-base font-normal">
        Enter the OTP sent to <br />
        <span className="font-medium text-md">
          {country.code} {mobileNumber}
        </span>
      </p>
      <OtpInput
        containerStyle={{
          width: "100%",
          display: "flex",
          gap: "0.5rem",
          justifyContent: "center",
        }}
        value={OTP.join("")}
        onChange={async (value) => {
          if (isNaN(Number(value))) return;
          setOTP(value.split(""));
          if (value.length == 4) {
            setLoading(true);
            const response = await verifyOTP(
              country.code + mobileNumber,
              value
            );
            if (response) {
              localStorage.setItem("mobileNumber", mobileNumber);
              setCookie("user-token", response.token, 30);
              const closeDoc = document.getElementById(id);
              if (closeDoc) {
                setIsLoggedIn(true);
                closeDoc.click();
                setTimeout(() => {
                  const openDoc = document.getElementById("open");
                  if (openDoc) {
                    openDoc.click();
                  }
                }, 1000);
              }
              return;
            } else {
              setLoading(false);
              setOTP([]);
            }
          }
        }}
        numInputs={4}
        inputType="number"
        renderSeparator={<span>-</span>}
        renderInput={(props) => (
          <input
            {...props}
            className="!text-base border-[1px] border-text rounded-md !w-10 h-10 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
          />
        )}
      />
    </div>
  ) : (
    <p className="text-center pt-3 text-[#a0a0a0]">Verifying OTP...</p>
  );
}
