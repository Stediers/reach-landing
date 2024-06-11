import Setting from "@components/Setting";
import MobileWrapper from "@wrapper/responsive/MobileWrapper";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import {
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
  Drawer,
} from "@components/ui/drawer";
import { Button } from "@components/ui/button";
import { FetchVerificationStatusResponse } from "@api_functions/user/fetch-verification-status";

export default function Mobile({
  response,
}: {
  response: FetchVerificationStatusResponse;
}) {
  return (
    <MobileWrapper
      header="Verification"
      className="flex flex-col justify-center items-center space-y-5 w-full"
    >
      <div className="flex flex-col justify-center items-center space-y-5 w-full">
        <SettingDrawer
          title="Mobile Number"
          isVerified={response.mobileNumberVerified}
          footerJSX={
            <div className="flex flex-col space-y-5 w-full items-start justify-start">
              <p className="text-gray-500 text-base text-center">
                Your mobile number is used to send you notifications and
                verification codes.
              </p>
            </div>
          }
        />
        <SettingDrawer
          title="Profile Profanity Filter"
          isVerified={response.profileVerified}
          footerJSX={
            <div className="flex flex-col space-y-5 w-full items-start justify-start">
              <p className="text-gray-500 text-base text-center">
                Your profile is checked for profanity and inappropriate content.
              </p>
            </div>
          }
        />
        {/* <SettingDrawer
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
    </MobileWrapper>
  );
}

function SettingDrawer({
  title,
  isVerified,
  footerJSX,
}: {
  title: string;
  isVerified: boolean;
  footerJSX: JSX.Element;
}) {
  return (
    <Drawer closeThreshold={0.5}>
      <DrawerTrigger asChild>
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
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-xl font-medium">
            <p className="text-gray-900">{title}</p>
          </DrawerTitle>
          <DrawerDescription className="text-base text-gray-400">
            <p>{isVerified ? "Verified" : "Not verified"}</p>
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="flex flex-col space-y-5 w-full items-start justify-start">
          {footerJSX}
          <DrawerClose asChild className="w-full">
            <Button variant="close">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
