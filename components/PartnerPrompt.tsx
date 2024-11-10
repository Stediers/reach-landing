"use client";
import { useState, useEffect } from "react";
import { CustomDrawer } from "./DrawerPopup";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Separator } from "./ui/separator";
import { CustomSheet } from "./CustomSheet";
import { SheetClose } from "./ui/sheet";
import LinkButton from "./Button";
import { Button } from "./ui/button";
import AppDownload from "./DownloadApp";

export default function PartnerPrompt() {
  const [isDiv1OnTop, setIsDiv1OnTop] = useState(false);

  useEffect(() => {
    const div1 = document.getElementById("div1");
    const div2 = document.getElementById("contact-me");

    const checkIfDivIsOnTop = () => {
      if (div1 && div2) {
        const rect1 = div1.getBoundingClientRect();
        const rect2 = div2.getBoundingClientRect();

        // Check if div1 is on top of div2
        if (
          rect1.top < rect2.bottom &&
          rect1.bottom > rect2.top &&
          rect1.left < rect2.right &&
          rect1.right > rect2.left
        ) {
          setIsDiv1OnTop(true);
        } else {
          setIsDiv1OnTop(false);
        }
      }
    };

    checkIfDivIsOnTop();
    window.addEventListener("resize", checkIfDivIsOnTop);
    window.addEventListener("scroll", checkIfDivIsOnTop);

    return () => {
      window.removeEventListener("resize", checkIfDivIsOnTop);
      window.removeEventListener("scroll", checkIfDivIsOnTop);
    };
  }, []);
  return (
    <div
      className="sticky bottom-0 right-0 z-50 flex items-center justify-center bg-white w-full"
      id="div1"
    >
      <div
        className={`flex flex-col items-center justify-center border-t p-4 space-y-2 w-full ${
          isDiv1OnTop ? "bg-black text-white" : "bg-white"
        } transition-all duration-300 ease-in-out`}
      >
        {/* <Drawer closeThreshold={0.5} shouldScaleBackground>
          <DrawerTrigger asChild>
            <p className="text-base text-center">
              Are you a freelancer as well?
              <br />
              <span className="text-primary underline underline-offset-4">
                Click here
              </span>
            </p>
          </DrawerTrigger>
          <DrawerContent className="max-h-[80vh] w-full !py-0">
            <div className=" overflow-y-scroll hide-scrollbar w-full">
              <DrawerHeader className="flex flex-col items-start text-left">
                <DrawerTitle className="text-xl font-medium first-letter:capitalize">
                  Get your own profile!
                </DrawerTitle>
                <DrawerDescription className="text-base">
                  It costs nothing to create your profile. Get started in 3 easy
                  steps.
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter className="flex flex-col space-y-5 w-full items-start justify-start">
                <div className="flex flex-col items-start justify-start w-full space-y-5">
                  <div className="flex flex-col items-start justify-center space-y-5 lg:space-y-7">
                    <Separator orientation="horizontal" />
                    <StepDetails
                      number={1}
                      title="Login with your mobile number"
                      description="We will send you a one-time password to verify your number. This is to ensure that you are a real person."
                    />
                    <Separator orientation="horizontal" />
                    <StepDetails
                      number={2}
                      title={
                        <>
                          Let us and your clients{" "}
                          <span className="text-info">know</span> more about you
                        </>
                      }
                      description="Tell us about your skills, experience, and the services you offer."
                    />
                    <Separator orientation="horizontal" />
                    <StepDetails
                      number={3}
                      title="All set!"
                      description="You are now ready to start getting hired by clients. Be your own Boss!"
                    />
                  </div>
                </div>
                <div className=" sticky bottom-0 py-3 w-full bg-white">
                  <DrawerClose asChild>
                    <Button
                      text="Get started"
                      className="w-full bg-success text-white"
                      link="https://partner.reachgig.com/user/sign-in"
                      newTab
                    />
                  </DrawerClose>
                </div>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer> */}
        <CustomSheet
          title="Get your own profile!"
          description="It costs nothing to create your profile. Get started in 3 easy steps."
          triggerJSX={
            <p className="text-base text-center hover:cursor-pointer">
              Are you a freelancer as well?
              <br />
              <span className="text-primary underline underline-offset-4">
                Click here
              </span>
            </p>
          }
          footerJSX={
            <div className="grid grid-cols-2 gap-5 w-full">
              <AppDownload
                triggerJSX={<Button variant="success">Get started</Button>}
              />
            </div>
          }
        >
          <div className="flex flex-col items-start justify-start space-y-5">
            <StepDetails
              number={1}
              title="Login with your mobile number"
              description="We will send you a one-time password to verify your number. This is to ensure that you are a real person."
            />
            <Separator orientation="horizontal" />
            <StepDetails
              number={2}
              title={
                <>
                  Let us and your clients{" "}
                  <span className="text-info">know</span> more about you
                </>
              }
              description="Tell us about your skills, experience, and the services you offer."
            />
            <Separator orientation="horizontal" />
            <StepDetails
              number={3}
              title="All set!"
              description="You are now ready to start getting hired by clients. Be your own Boss!"
            />
          </div>
        </CustomSheet>
      </div>
    </div>
  );
}

function StepDetails({
  title,
  description,
  number,
}: {
  title: string | React.ReactNode;
  description: string;
  number: number;
}) {
  return (
    <div className="flex flex-row items-start justify-start space-x-5">
      <NumberCircle number={number} />
      <div className="flex flex-col items-start justify-center space-y-2 lg:space-y-3">
        <div className="flex items-center justify-center space-x-3">
          <h2 className="lg:text-xl text-lg font-medium">{title}</h2>
        </div>
        <p className="lg:text-lg lg:!leading-relaxed text-base">
          {description}
        </p>
      </div>
    </div>
  );
}

function NumberCircle({ number }: { number: number }) {
  return (
    <div className="w-8 h-8 shrink-0 lg:w-8 lg:h-8 border-success border-2 rounded-full flex items-center justify-center">
      <p className="text-success font-medium text-sm lg:text-base">{number}</p>
    </div>
  );
}
