import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import {
  AiOutlineCamera,
  AiOutlineClose,
  AiOutlineCloseCircle,
  AiOutlineCloudUpload,
  AiOutlineEdit,
  AiOutlineUser,
} from "react-icons/ai";
import ImageComponent from "@components/ImageComponent";
import { S3BucketName, State } from "@data/enums";
import PopupWrapper from "@wrapper/PopupWrapper";
import AvatarEditor from "react-avatar-editor";
import { showSnackBar } from "@components/notifications/Snackbar";
import path from "path";
import RangeInput from "./RangeInput";
import { Button } from "@components/ui/button";
import { createBlobfromUrl } from "@api_functions/utility/create-blob-from-url";
import uploadFileS3 from "@api_functions/utility/upload-file-to-S3";
import { Edit, Upload } from "lucide-react";
import { CustomDialog } from "@components/DialogPopup";
import LoadingWrapper from "@wrapper/LoadingWrapper";

export function ProfilePictureInput({
  onChange,
  previewClassName = "w-[10rem] h-[10rem] lg:w-[12rem] lg:h-[12rem]",
  previewTextClassName = "text-sm font-medium text-textsubtle",
  url,
  title = "Profile Picture",
}: {
  onChange: (image: string) => void;
  previewClassName?: string;
  previewTextClassName?: string;
  url: string | null;
  title?: string;
}) {
  const [state, setState] = useState(State.IDLE);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    setState(State.LOADING);
    if (!url) {
      setState(State.SUCCESS);
      return;
    }
    createBlobfromUrl({ url: url }).then((blob) => {
      setProfilePicture(blob);
      setState(State.SUCCESS);
      onChange(url);
    });
  }, []);

  return (
    <div className="flex flex-row items-start justify-start w-full space-x-5">
      <div className="flex flex-col items-center justify-center">
        <input
          type="file"
          //only jpg and png
          accept="image/jpeg, image/png, image/jpg, image/heic"
          onClick={(e) => {
            e.currentTarget.value = "";
          }}
          onChange={async (e) => {
            if (e.target.files == null || e.target.files[0] == null) {
              e.target.value = "";
              return;
            } else {
              let file = e.target.files[0];
              setState(State.LOADING);
              if (verifyImage(file)) {
                if (file.type === "image/heic") {
                  file = await convertHeictoPng(file);
                }
                setProfilePicture(file);
              } else {
                e.target.value = "";
                return;
              }
              const imageEditingModal =
                document.getElementById("profileImageXXX");
              if (imageEditingModal) {
                imageEditingModal.click();
              } else {
                const res = await uploadFileS3({
                  bucketName: S3BucketName.USER,
                  file: file,
                  fileName: file.name.split(".")[0],
                });
                if (res) {
                  onChange(res);
                  setProfilePicture(file);
                  setState(State.SUCCESS);
                }
              }
              setState(State.SUCCESS);
            }
          }}
          className="hidden"
          id="profile-pic"
          multiple={false}
        />
        <div className="flex flex-col items-center justify-center space-y-5 w-full">
          <label
            htmlFor={!profilePicture ? "profile-pic" : ""}
            className="flex flex-col items-center justify-center space-y-2 w-full"
          >
            {state === State.LOADING ? (
              <div
                className={`flex flex-row items-center justify-center space-x-2 relative ${previewClassName} border`}
              >
                <div className="animate-spin w-5 h-5 border-t-2 border-b-2 border-text rounded-full"></div>
              </div>
            ) : !profilePicture && !url ? (
              <div className="flex flex-row items-center justify-center space-x-2 relative">
                <AiOutlineUser
                  className={`${previewClassName} p-2 border border-text rounded-md z-10 bg-white`}
                />
              </div>
            ) : url ? (
              <div className="flex flex-row items-center justify-center space-x-2 relative">
                <ImageComponent
                  src={url}
                  alt="Profile Picture"
                  className={`${previewClassName} rounded-md overflow-hidden border`}
                  popup={false}
                />
              </div>
            ) : profilePicture ? (
              <div className="flex flex-row items-center justify-center space-x-2 relative">
                <ImageComponent
                  src={URL.createObjectURL(profilePicture)}
                  alt="Profile Picture"
                  className={`${previewClassName} rounded-md overflow-hidden border`}
                  popup={false}
                />
              </div>
            ) : (
              <div className="flex flex-row items-center justify-center space-x-2 relative">
                <AiOutlineUser
                  className={`${previewClassName} p-2 border border-text rounded-md z-10 bg-white`}
                />
              </div>
            )}
          </label>
        </div>
      </div>
      <div className="flex flex-col space-y-3 w-full justify-between h-[10rem]">
        <div className="grid grid-cols-2 gap-4 w-full">
          <Button
            variant="outline"
            onClick={() => {
              const profilePic = document.getElementById("profile-pic");
              if (profilePic) {
                profilePic.click();
              }
            }}
            type="button"
          >
            <Upload className="w-5 h-5 shrink-0" />
          </Button>
          <ImageEditingModal
            image={profilePicture}
            onChange={onChange}
            setImage={setProfilePicture}
            scale={scale}
            setScale={setScale}
            setState={setState}
            state={state}
            borderRadius={10}
            key="profileImage"
          />
        </div>
      </div>
    </div>
  );
}

export function ImageEditingModal({
  image,
  setImage,
  borderRadius = 250,
  scale,
  setScale,
  state,
  setState,
  onChange,
}: {
  image: File | null;
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
  scale: number;
  setScale: React.Dispatch<React.SetStateAction<number>>;
  borderRadius?: number;
  state: State;
  setState: Dispatch<SetStateAction<State>>;
  onChange: (image: string) => void;
}) {
  const editor = useRef<AvatarEditor>(null);
  return image === null ? null : (
    <CustomDialog
      title="Edit Image"
      description="Make changes to your image"
      triggerJSX={
        <Button variant="outline" id="profileImage" type="button">
          <Edit className="w-5 h-5" />
        </Button>
      }
      closeId="profileImage"
      footerJSX={
        <Button
          variant="success"
          asyncOnClick={async () => {
            if (!image) return;
            if (editor.current) {
              const canvas = editor.current.getImageScaledToCanvas();
              const blob = await new Promise<Blob | null>((resolve) => {
                canvas.toBlob((blob) => {
                  resolve(blob);
                });
              });

              if (!blob) {
                setImage(null);
                showSnackBar({
                  message: "Something went wrong",
                  state: State.ERROR,
                });
                return;
              } else {
                const url = await uploadFileS3({
                  bucketName: S3BucketName.USER,
                  file: new File([blob], image.name, {
                    type: image.type,
                  }),
                  fileName: image.name.split(".")[0],
                });
                if (!url) {
                  showSnackBar({
                    message: "Could not upload image",
                    state: State.ERROR,
                  });
                  return;
                }
                onChange(url);
                const close = document.getElementById("profileImage");
                if (close) {
                  close.click();
                }
              }
            } else {
              setImage(null);
              showSnackBar({
                message: "Something went wrong",
                state: State.ERROR,
              });
            }
          }}
        >
          Save
        </Button>
      }
    >
      <LoadingWrapper
        pageState={state}
        loadingJSX={<div>Loading...</div>}
        errorJSX={<div>Error...</div>}
      >
        <div className="flex flex-col items-center justify-center space-y-5 w-full">
          {image && (
            <AvatarEditor
              image={image}
              width={250}
              height={250}
              border={50}
              color={[0, 0, 0, 0.6]} // RGBA
              scale={scale}
              rotate={0}
              ref={editor}
              borderRadius={borderRadius}
              disableHiDPIScaling={false}
            />
          )}
          <RangeInput
            value={scale}
            max={2}
            min={1}
            step={0.01}
            onChange={setScale}
            title="Zoom"
          />
        </div>
      </LoadingWrapper>
    </CustomDialog>
  );
}

export function VideoInput({
  subText = "Upload a video for your service",
  setVideo,
  video,
}: {
  subText?: string;
  setVideo: React.Dispatch<React.SetStateAction<File | null>>;
  video: File | null;
}) {
  const [pageState, setPageState] = useState<State>(State.LOADING);
  return (
    <div className="flex flex-col space-y-2 w-full bg-[#F7F7F7] p-2 rounded-md border border-[#E5E5E5]">
      {video == null ? (
        <label
          htmlFor="dropzone-video"
          className={`flex flex-col items-center justify-center w-full sm:h-56 h-34 border-2 border-textsubtle border-dashed rounded-md cursor-pointer ${
            video ? "hidden" : ""
          }`}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6 space-y-1">
            <AiOutlineCloudUpload className="w-12 h-12 text-text" />
            <p className="text-base">{subText}</p>
            <p className="text-sm">
              <span className="font-semibold">Click to upload</span> or&nbsp;
              <span className="font-semibold">drag and drop</span>
            </p>
            <p className="text-sm">MP4, AVI, MOV up to 50MB</p>
          </div>
          <input
            id="dropzone-video"
            type="file"
            className="hidden"
            accept="video/mp4, video/avi, video/mov"
            onChange={async (e) => {
              setVideo(e.target.files![0]);
            }}
          />
        </label>
      ) : (
        <div className="flex flex-col space-y-2 items-center">
          <video
            className="rounded-lg"
            src={URL.createObjectURL(video)}
            controls
          />
          <Button
            variant="close"
            onClick={() => {
              setVideo(null);
            }}
          >
            Remove
          </Button>
        </div>
      )}
      <div className="flex space-x-2"></div>
    </div>
  );
}

export function ImagesInput({
  subText = "Upload images for your service",
  setImages,
  images,
  maxFiles = 5,
}: {
  subText?: string;
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
  images: File[];
  maxFiles?: number;
}) {
  return (
    <div className="flex flex-col space-y-2 w-full bg-[#F7F7F7] p-2 rounded-md border border-[#E5E5E5]">
      <label
        htmlFor="dropzone-image"
        className={`flex flex-col items-center justify-center w-full sm:h-56 h-34 border-2 border-textsubtle border-dashed rounded-md cursor-pointer ${
          images.length > 0 ? "hidden" : ""
        }`}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6 space-y-1">
          <AiOutlineCloudUpload className="w-12 h-12 text-text" />
          <p className="text-base text-center">{subText}</p>
          <p className="text-sm">
            <span className="font-semibold text-center">Click to upload</span>{" "}
            or&nbsp;
            <span className="font-semibold text-center">drag and drop</span>
          </p>
          <p className="text-sm">JPG, PNG up to 5MB</p>
        </div>
        <input
          id="dropzone-image"
          type="file"
          className="hidden"
          //only jpeg images allowed
          accept="image/jpeg, image/png, image/jpg, image/heic"
          maxLength={maxFiles - images.length}
          multiple
          onChange={async (e) => {
            const files = Array.from(e.target.files!);
            const validFiles = files.filter((file) => verifyImage(file));
            //if file type is heic convert it to jpeg
            await Promise.all(
              validFiles.map(async (file) => {
                if (file.type === "image/heic") {
                  const convertedFile = await convertHeictoPng(file);
                  const index = validFiles.findIndex(
                    (validFile) => validFile.name === file.name
                  );
                  validFiles[index] = convertedFile;
                }
              })
            );

            // check if the number of files is greater than the max limit
            if (validFiles.length > maxFiles - images.length) {
              return alert(
                `You can only upload ${maxFiles - images.length} images`
              );
            }

            //check if image is already uploaded
            validFiles.forEach((file) => {
              if (images.some((image) => image.name === file.name)) {
                //remove the file from the array
                const index = validFiles.findIndex(
                  (validFile) => validFile.name === file.name
                );
                validFiles.splice(index, 1);
              }
            });

            setImages([...images, ...validFiles]);
            e.target.value = "";
          }}
        />
      </label>
      {images.length > 0 && (
        <ImagesController
          {...{
            images,
            setImages,
            maxFiles,
          }}
        />
      )}
    </div>
  );
}

function ImagesController({
  images,
  setImages,
  maxLimit = 5,
}: {
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
  maxLimit?: number;
}) {
  return (
    <div className="flex flex-col space-y-2 items-center">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 justify-items-center w-full">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative border rounded-lg h-40 w-40 lg:h-[15rem] lg:w-full cursor-pointer"
          >
            <ImageController key={index} image={image} index={index} />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4 w-full">
        {images.length > 0 && images.length < maxLimit && (
          <Button
            variant="info"
            onClick={() => {
              document.getElementById("dropzone-image")?.click();
            }}
          >
            Add More
          </Button>
        )}
        {images.length > 0 && (
          <Button
            variant="close"
            onClick={() => {
              setImages([]);
              const input = document.getElementById(
                "dropzone-image"
              ) as HTMLInputElement;
              input.value = "";
            }}
          >
            Remove All
          </Button>
        )}
      </div>
    </div>
  );

  function ImageController({ image, index }: { image: File; index: number }) {
    const [showRemove, setShowRemove] = useState(false);
    return (
      <div className="w-full h-full" onClick={() => setShowRemove(!showRemove)}>
        <div
          className="w-full h-full"
          onClick={() => {
            setShowRemove(!showRemove);
          }}
        >
          <ImageComponent
            alt={image.name}
            src={URL.createObjectURL(image)}
            className="w-full h-full rounded-lg"
            key={index}
            popup={false}
          />
        </div>
        {showRemove ? (
          <div
            className="absolute top-0 right-0 w-full h-full bg-black/50 flex items-center justify-center z-50"
            onClick={(e) => {
              setShowRemove(false);
              e.stopPropagation();
            }}
          >
            <AiOutlineCloseCircle
              className="text-white text-2xl hover:scale-110 transition-all duration-200"
              onClick={(e) => {
                e.stopPropagation();
                setImages(images.filter((_, i) => i !== index));
              }}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

export function verifyImage(image: File) {
  if (image.size > 5 * 1024 * 1024) {
    return alert("Image size should be less than 5MB");
  }

  if (!image.type.includes("image")) {
    return alert("Only images are allowed");
  }

  //only jpeg and png images allowed
  if (
    image.type !== "image/jpeg" &&
    image.type !== "image/png" &&
    image.type !== "image/jpg" &&
    image.type !== "image/heic"
  ) {
    return alert("Only jpg, png and heic images are allowed");
  }

  return true;
}

async function convertHeictoPng(file: File): Promise<File> {
  const heic2any = (await import("heic2any")).default;

  const convertedBlob = await heic2any({
    blob: file,
    toType: "image/png",
    quality: 1,
  });

  const fileExt = path.extname(file.name);
  const fileNameNoExt = path.basename(file.name, fileExt);

  const convertedFile = new File(
    [convertedBlob as Blob],
    `${fileNameNoExt}.png`,
    {
      type: "image/png",
    }
  );

  return convertedFile;
}
