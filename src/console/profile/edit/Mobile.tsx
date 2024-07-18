import { FetchMyProfileResponse } from "@api_functions/profile/fetch-my-profile";
import { ProfilePictureInput } from "@components/input/MediaInput";
import TextInput from "@components/input/TextInput";
import { Button } from "@components/ui/button";
import { State } from "@data/enums";
import MobileWrapper from "@wrapper/responsive/MobileWrapper";
import { Dispatch, SetStateAction } from "react";

export default function Mobile({
  response,
  name,
  setName,
  imageFile,
  setImageFile,
  editProfile,
  verifyForm,
}: {
  response: FetchMyProfileResponse;
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  imageFile: File | null;
  setImageFile: Dispatch<SetStateAction<File | null>>;
  editProfile: () => Promise<void>;
  verifyForm: () => boolean;
}) {
  return (
    <MobileWrapper
      header="Edit Profile"
      className="flex flex-col items-center justify-start space-y-5 w-full"
    >
      <ProfilePictureInput
        profilePicture={imageFile}
        setProfilePicture={setImageFile}
      />
      <TextInput
        onChange={(value) => setName(value)}
        value={name}
        title="Name"
        placeholder={response.user.name}
      />
      <Button
        asyncOnClick={editProfile}
        variant="success"
        disabled={verifyForm()}
      >
        Save
      </Button>
    </MobileWrapper>
  );
}
