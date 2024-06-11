import Setting from "@components/Setting";
import MobileWrapper from "@wrapper/responsive/MobileWrapper";
import { FetchMyProfileResponse } from "@api_functions/profile/fetch-my-profile";
import { AiFillStar } from "react-icons/ai";

export default function Mobile({
  response,
}: {
  response: FetchMyProfileResponse;
}) {
  return (
    <MobileWrapper
      header="My Rating"
      className="flex flex-col justify-center items-center space-y-5 w-full"
    >
      <div className="flex flex-col justify-center items-center space-y-5 w-full">
        <Setting
          title="Rating"
          subtitle="Your rating from partners"
          icon={
            <div className="flex flex-row justify-center items-center space-x-2">
              <p className="text-xl font-medium">
                {response.user.rating > 0
                  ? response.user.rating.toFixed(1)
                  : "N/A"}
              </p>
              <AiFillStar className="text-2xl text-yellow-500" />
            </div>
          }
        />
        <p className="text-base text-gray-500 text-center">
          Your rating is based on you behaved with your partners and how
          satisfied they were with your work.
        </p>
      </div>
    </MobileWrapper>
  );
}
