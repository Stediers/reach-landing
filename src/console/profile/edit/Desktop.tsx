import { FetchMyProfileResponse } from "@api_functions/profile/fetch-my-profile";
import { ProfilePictureInput } from "@components/input/MediaInput";
import TextInput from "@components/input/TextInput";
import { Button } from "@components/ui/button";
import { State } from "@data/enums";
import DesktopHeaderWrapper from "@wrapper/responsive/DesktopHeaderWrapper";
import DesktopWrapper from "@wrapper/responsive/DesktopWrapper";
import { Dispatch, SetStateAction } from "react";

export default function Desktop({
  response,
  name,
  setName,
  imageFile,
  setImageFile,
  saveButtonState,
  editProfile,
  verifyForm,
}: {
  response: FetchMyProfileResponse;
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  imageFile: File | null;
  setImageFile: Dispatch<SetStateAction<File | null>>;
  saveButtonState: State;
  editProfile: () => Promise<void>;
  verifyForm: () => boolean;
}) {
  return (
    <DesktopWrapper
      title="Edit Profile"
      className="py-5 space-y-10 items-start w-full flex flex-col"
      maxWidth={false}
    >
      <div className="flex flex-col space-y-5 w-1/2 max-w-xl items-start ">
        <div className="flex">
          <ProfilePictureInput
            profilePicture={imageFile}
            setProfilePicture={setImageFile}
          />
        </div>
        <TextInput
          onChange={(value) => setName(value)}
          value={name}
          title="Name"
          placeholder={response.user.name}
        />
        {/* <Button
          onClick={editProfile}
          buttonState={saveButtonState}
          className="bg-success text-white self-center"
          text="Save"
          disabled={verifyForm()}
        /> */}
        <Button
          variant="success"
          asyncOnClick={editProfile}
          disabled={verifyForm()}
        >
          Save
        </Button>
      </div>
    </DesktopWrapper>
  );
}
