import {
  UserAutoCompleteResult,
  fetchUserAutoComplete,
} from "@api_functions/gig/fetch-user-autocomplete-result";
import Button from "./Button";
import Card from "./Card";
import ImageComponent from "./ImageComponent";
import Link from "next/link";
import TextInput from "./input/TextInput";
import { State } from "@data/enums";
import { useState } from "react";
import { AiFillExclamationCircle, AiFillQuestionCircle } from "react-icons/ai";
import { verifyMobileNumber } from "@helper_functions/verify";
import getVitalLocalStoragStingData from "@api_functions/utility/get-vital-local-storage-data";
import ContactInfoIcon from "@public/lottie/contact-info.json";
import Lottie from "lottie-react";

export default function UserSelect({
  selectedUser,
  setSelectedUser,
  mobileNumber,
  setMobileNumber,
  showInfo,
}: {
  selectedUser: UserAutoCompleteResult | null;
  setSelectedUser: React.Dispatch<
    React.SetStateAction<UserAutoCompleteResult | null>
  >;
  mobileNumber: string;
  setMobileNumber: React.Dispatch<React.SetStateAction<string>>;
  showInfo?: boolean;
}) {
  const [state, setState] = useState<State>(State.SUCCESS);
  return (
    <div className="flex flex-col items-start justify-center space-y-3 w-full">
      <TextInput
        type="tel"
        placeholder="Enter Customer's Mobile Number"
        value={mobileNumber}
        errorText={
          getVitalLocalStoragStingData({ key: "mobileNumber" }) === mobileNumber
            ? "You cannot select yourself"
            : ""
        }
        onChange={async (value) => {
          setState(State.SUCCESS);
          setMobileNumber(value);
          if (verifyMobileNumber(value, 10)) {
            setState(State.LOADING);
            if (
              getVitalLocalStoragStingData({ key: "mobileNumber" }) === value
            ) {
              setState(State.SUCCESS);
              return;
            }
            fetchUserAutoComplete(value).then((res) => {
              if (res && res.users.length > 0) {
                setSelectedUser(res.users[0]);
              } else {
                setState(State.SUCCESS);
                setSelectedUser(null);
                return;
              }
              setState(State.SUCCESS);
            });
          }
          setSelectedUser(null);
        }}
        title="Mobile Number"
        showInfo={showInfo}
        infoIcon={
          <Lottie
            animationData={ContactInfoIcon}
            loop
            className="h-64 my-[-5rem]"
          />
        }
        infoText="Please Enter the customer's mobile number so we can ask them for their feedback."
        loading={state}
      />
      {getVitalLocalStoragStingData({ key: "mobileNumber" }) ===
      mobileNumber ? (
        <Card className="!space-y-3 items-center justify-center">
          <AiFillExclamationCircle className="text-4xl text-text" />
          <div className="flex flex-col items-center justify-center space-y-1">
            <p className="text-md font-medium">This is you</p>
          </div>
          <p className="text-textsubtle text-base text-center">
            Please enter a different mobile number.
          </p>
        </Card>
      ) : (
        verifyMobileNumber(mobileNumber, 10) &&
        state !== State.LOADING && <UserCard user={selectedUser} />
      )}
    </div>
  );
}

function UserCard({ user }: { user: UserAutoCompleteResult | null }) {
  return user === null ? (
    <Card className="!space-y-3 items-center justify-center">
      <AiFillQuestionCircle className="text-4xl text-text" />
      <div className="flex flex-col items-center justify-center space-y-1">
        <p className="text-md font-medium">No User Found</p>
      </div>
      <p className="text-textsubtle text-base text-center">
        They will recieve an SMS with a link to follow.
      </p>
    </Card>
  ) : (
    <Card className="!space-y-5">
      <div className="flex flex-col items-center justify-center space-y-5">
        <ImageComponent
          src={user.imageUrl ?? "/images/default_profile.png"}
          className="rounded-full w-[100px] h-[100px]"
          alt=""
        />
        <div className="flex flex-col items-center justify-center space-y-1">
          <Link
            href={`/user/${user.userId}`}
            target="_blank"
            rel="noopener noreferrer"
            passHref
          >
            <p className="text-md font-medium">{user.name}</p>
          </Link>
          <p className="text-textsubtle text-sm">{user.mobileNumber}</p>
        </div>
      </div>
    </Card>
  );
}
