import { FetchProfileTrackingResponse } from "@api_functions/analytics/fetch-tracking-profile";
import { FetchTrackingServiceResponse } from "@api_functions/analytics/fetch-tracking-service";
import Card from "@components/Card";
import LineHeader from "@components/LineHeader";
import Setting from "@components/Setting";
import RadioInput from "@components/input/RadioInput";
import MobileWrapper from "@wrapper/responsive/MobileWrapper";
import router from "next/router";
import { AiOutlineArrowUp } from "react-icons/ai";
import { FaRobot } from "react-icons/fa";
import { MdReport } from "react-icons/md";

export default function Mobile({
  response,
}: {
  response: FetchProfileTrackingResponse;
}) {
  return (
    <MobileWrapper
      className="flex flex-col items-center justify-center space-y-5 w-full"
      showNavBar={true}
      header="Profile Analytics"
      backLink="/console"
    >
      <div className="flex flex-col items-center justify-center space-y-5 w-full">
        <RadioInput
          cols="grid-cols-2"
          options={[
            {
              icon: (
                <p className="text-xl flex items-center justify-center">
                  {response.views}
                </p>
              ),
              onClick: () => {},
              title: "Profile views",
            },
            {
              icon: (
                <p className="text-xl flex items-center justify-center">
                  + {response.gain}
                </p>
              ),
              onClick: () => {},
              title: "Last 7 days",
            },
          ]}
        />
        <Card className="flex flex-col items-center justify-center !space-y-2 w-full">
          <MdReport className="w-12 h-12 text-danger" />
          <p className="text-center text-md font-medium">Reports</p>
          <p className="text-center text-base text-gray-500">
            {response.flags < 3
              ? "No reports. Keep up the good work!"
              : response.flags + "reports. Please review your profile."}
          </p>
        </Card>
      </div>
      <LineHeader title="Profile Review Summary" />
      <Card className="flex flex-col items-center justify-center !space-y-2 w-full">
        <FaRobot className="w-12 h-12 text-info" />
        <p className="text-center text-md font-medium">In Development</p>
        <p className="text-center text-base text-gray-500">
          In the future, you will be able to see a summary of your profile
          reviewed by an AI.
        </p>
      </Card>
    </MobileWrapper>
  );
}
