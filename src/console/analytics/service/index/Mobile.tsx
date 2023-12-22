import { FetchTrackingServiceResponse } from "@api_functions/analytics/fetch-tracking-service";
import LineHeader from "@components/LineHeader";
import Setting from "@components/Setting";
import RadioInput from "@components/input/RadioInput";
import MobileWrapper from "@wrapper/responsive/MobileWrapper";
import router from "next/router";
import { AiOutlineArrowUp } from "react-icons/ai";

export default function Mobile({
  response,
}: {
  response: FetchTrackingServiceResponse;
}) {
  return (
    <MobileWrapper
      className="flex flex-col items-center justify-center space-y-5 w-full"
      showNavBar={true}
      header="Service Analytics"
      backLink="/console"
    >
      <div className="flex flex-col items-center justify-center space-y-5 w-full">
        <RadioInput
          cols="grid-cols-2"
          options={[
            {
              icon: (
                <p className="text-xl flex items-center justify-center">
                  {response.services
                    .map((service) => service.totalViews)
                    .reduce((a, b) => a + b, 0)}
                </p>
              ),
              onClick: () => {},
              title: "Service views",
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
      </div>
      <LineHeader title="Services" />
      {response.services
        .sort((a, b) => b.totalViews - a.totalViews)
        .map((service) => (
          <Setting
            title={service.title}
            subtitle={service.visible ? "Visible" : "Hidden"}
            icon={
              <p className="w-7 h-7 flex items-center justify-center bg-info text-white rounded-full text-base">
                {service.totalViews}
              </p>
            }
            onClick={() => {
              router.push("/console/analytics/service/" + service.serviceId);
            }}
            key={service.serviceId}
          />
        ))}
    </MobileWrapper>
  );
}
