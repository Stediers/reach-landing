import React from "react";
import Setting from "@components/Setting";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import {
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  Dialog,
} from "@components/ui/dialog";
import { Button } from "@components/ui/button";
import { FetchVerificationStatusResponse } from "@api_functions/user/fetch-verification-status";
import DesktopWrapper from "@wrapper/responsive/DesktopWrapper";

export default function Desktop({
  response,
}: {
  response: FetchVerificationStatusResponse;
}) {
  return (
    <DesktopWrapper
      title="Verification"
      className="flex flex-col justify-center items-center space-y-5 w-full"
    >
      <div className="grid grid-cols-2 gap-5 w-full">
        <SettingDialog
          title="Mobile Number"
          isVerified={response.mobileNumberVerified}
          footerJSX={
            <div className="flex flex-col space-y-5 w-full items-start justify-start">
              <p className="text-gray-500 text-base">
                Your mobile number is used to send you notifications and
                verification codes.
              </p>
            </div>
          }
        />
        <SettingDialog
          title="Profile Profanity Filter"
          isVerified={response.profileVerified}
          footerJSX={
            <div className="flex flex-col space-y-5 w-full items-start justify-start">
              <p className="text-gray-500 text-base ">
                Your profile is checked for profanity and inappropriate content.
              </p>
            </div>
          }
        />
        {/* <SettingDialog
          title="Call Verification"
          isVerified={false}
          footerJSX={
            <Button variant="default" size="sm">
              Change Password
            </Button>
          }
        /> */}
      </div>
      {response.mobileNumberVerified && response.profileVerified ? (
        <p className="text-center text-gray-500">
          You are verified and can now access all features.
        </p>
      ) : (
        <p className="text-center text-gray-500">
          Please verify your identity to access all features. This will help the
          partner know that you are a real person, leading to a better
          experience for both of you.
        </p>
      )}
    </DesktopWrapper>
  );
}

function SettingDialog({
  title,
  isVerified,
  footerJSX,
}: {
  title: string;
  isVerified: boolean;
  footerJSX: React.JSX.Element;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Setting
          title={title}
          subtitle={isVerified ? "Verified" : "Not verified"}
          icon={
            isVerified ? (
              <AiOutlineCheck className="text-success text-2xl" />
            ) : (
              <AiOutlineClose className="text-error text-2xl" />
            )
          }
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-medium">
            <p className="text-gray-900">{title}</p>
          </DialogTitle>
          <DialogDescription className="text-base text-gray-400">
            <p>{isVerified ? "Verified" : "Not verified"}</p>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col space-y-5 w-full items-start justify-start">
          {footerJSX}
        </DialogFooter>
        <DialogClose className="w-full flex">
          <Button variant="close">Close</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
