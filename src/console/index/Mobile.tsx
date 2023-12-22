import { updateScheduledAppointmentStatus } from "@api_functions/appointment/update-scheduled-appointment-status";
import { FetchConsoleResponse } from "@api_functions/gig/fetch-console";
import Button from "@components/Button";
import Card from "@components/Card";
import LineHeader from "@components/LineHeader";
import Setting from "@components/Setting";
import RadioInput from "@components/input/RadioInput";
import { menus } from "@data/menu";
import MobileWrapper from "@wrapper/responsive/MobileWrapper";
import { useState } from "react";
import {
  AiOutlineArrowRight,
  AiOutlineExclamationCircle,
} from "react-icons/ai";
import "swiper/css/pagination";
import "swiper/css";
import { MdWork } from "react-icons/md";
import { FcBullish, FcCalendar, FcGraduationCap } from "react-icons/fc";
import Link from "next/link";
import router from "next/router";
import Logo from "@components/Logo";

export default function Mobile({
  response,
}: {
  response: FetchConsoleResponse;
}) {
  return (
    <MobileWrapper
      className="flex flex-col px-5 items-center space-y-5 w-full"
      header={response.services ? "Dashboard" : "Welcome"}
      showNavBar={false}
    >
      {response.services ? (
        <div className="flex flex-col items-center justify-center space-y-5 w-full">
          <RadioInput
            cols="grid-cols-2"
            options={[
              {
                icon: (
                  <p
                    className={`text-xl flex items-center justify-center ${
                      response.serviceViews == 0
                        ? "text-textsubtle"
                        : "text-text"
                    }`}
                  >
                    {response.serviceViews == 0 ? "_" : response.serviceViews}
                  </p>
                ),
                onClick: () => {
                  router.push(`/console/analytics/service?backLink=/console`);
                },
                title: "Service views",
              },
              {
                icon: (
                  <p
                    className={`text-xl flex items-center justify-center ${
                      response.profileViews == 0
                        ? "text-textsubtle"
                        : "text-text"
                    }`}
                  >
                    {response.profileViews == 0 ? "_" : response.profileViews}
                  </p>
                ),
                onClick: () => {
                  router.push(`/console/analytics/profile?backLink=/console`);
                },
                title: "Profile views",
              },
            ]}
          />
          <Card className="flex flex-col items-center justify-center !space-y-2 !pl-7">
            <div className="flex flex-col items-center justify-start space-y-2 shrink-0">
              <FcGraduationCap className="w-16 h-16 text-info" />
              <p className="text-md font-medium text-info">Tip of the day</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-1">
              <p className="text-base text-center">
                Your profile is the first thing people see when they visit your
                page. Make sure it&apos;s up to date and looks good.
              </p>
            </div>
          </Card>
          <LineHeader title="Start with" />
          {menus.map(
            (menu, index) =>
              menu.title !== "Dashboard" && (
                <Link
                  href={menu.path}
                  key={index}
                  passHref
                  className="w-full flex items-center justify-start"
                >
                  <Setting
                    title={menu.title}
                    subtitle={menu.subtitle}
                    key={index}
                    icon={menu.icon}
                  />
                </Link>
              )
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center !space-y-7 w-full">
          <div className="flex flex-col items-center justify-center space-y-3">
            <Logo wings="w-44" textStyle="text-2xl font-medium pt-2" />
            <p className="text-lg font-medium text-center">Congratulations!</p>
            <p className="text-base font-medium text-center">
              You have taken the first step towards building you brand.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center space-y-2">
            <p className="text-md font-medium text-center">
              Let your customers know what and how you can help them.
            </p>
            <Button
              text="Create my first service"
              link="/console/services/add-service?firsTime=true"
              icon={<AiOutlineArrowRight className="w-4 h-4" />}
              className="bg-primary text-white w-full font-medium"
            />
          </div>
        </div>
      )}
    </MobileWrapper>
  );
}
