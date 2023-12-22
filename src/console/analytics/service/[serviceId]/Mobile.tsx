import { FetchTrackingResponse } from "@api_functions/analytics/fetch-tracking-by-serviceId";
import Card from "@components/Card";
import LineHeader from "@components/LineHeader";
import Setting from "@components/Setting";
import RadioInput from "@components/input/RadioInput";
import { Tracking } from "@data/types";
import MobileWrapper from "@wrapper/responsive/MobileWrapper";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function Mobile({
  response,
}: {
  response: FetchTrackingResponse;
}) {
  //group tracking by city
  const [groupedTracking, setGroupedTracking] = useState<Tracking[][]>([]);
  useEffect(() => {
    const groupedTracking: Tracking[][] = [];
    response.tracking.forEach((tracking) => {
      const index = groupedTracking.findIndex(
        (group) => group[0].city === tracking.city
      );
      if (index === -1) {
        groupedTracking.push([tracking]);
      } else {
        groupedTracking[index].push(tracking);
      }
    });
    setGroupedTracking(groupedTracking);
  }, [response]);
  return (
    <MobileWrapper
      className="flex flex-col items-center justify-center space-y-5"
      showNavBar={true}
      header="Views"
      backLink="/console/analytics"
    >
      <div className="flex flex-col items-start justify-start w-full !space-y-2">
        <p className="text-base text-textsubtle font-medium">
          You are currently viewing
        </p>
        <p className="text-lg text-text font-medium first-letter:capitalize">
          {response.baseData.title}
        </p>
      </div>
      <LineHeader title="Total views" />
      <div className="flex flex-col items-center justify-center space-y-5 w-full">
        <RadioInput
          cols="grid-cols-2"
          options={[
            {
              icon: (
                <p className="text-xl flex items-center justify-center">
                  {response.tracking.length}
                </p>
              ),
              onClick: () => {},
              title: "Total views",
            },
            {
              icon: (
                <p className="text-xl flex items-center justify-center">
                  {
                    response.tracking.filter((tracking) => tracking.followUp)
                      .length
                  }
                </p>
              ),
              onClick: () => {},
              title: "Follow up views",
            },
          ]}
        />
      </div>
      <LineHeader title="Views by city" />
      {groupedTracking.length > 0 ? (
        groupedTracking.map((tracking) => (
          <Setting
            title={tracking[0].city + ", " + tracking[0].state}
            key={tracking[0].city}
            subtitle={tracking[0].country}
            icon={
              <p className="w-7 h-7 text-center text-white bg-info flex items-center justify-center rounded-full text-base">
                {tracking.length}
              </p>
            }
          />
        ))
      ) : (
        <Card className="w-full h-20 flex items-center justify-center">
          <p className="text-gray-400">No views yet</p>
        </Card>
      )}
    </MobileWrapper>
  );
}
