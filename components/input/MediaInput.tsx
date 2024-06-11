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
import { State } from "@data/enums";
import PopupWrapper from "@wrapper/PopupWrapper";
import AvatarEditor from "react-avatar-editor";
import { showSnackBar } from "@components/notifications/Snackbar";
import path from "path";
import RangeInput from "./RangeInput";
import { Button } from "@components/ui/button";

export function ProfilePictureInput({
  profilePicture,
  setProfilePicture,
}: {
  profilePicture: File | null;
  setProfilePicture: Dispatch<SetStateAction<File | null>>;
}) {
  const [showModal, setShowModal] = useState(false);
  const [editButtonState, setEditButtonState] = useState(State.SUCCESS);
  const [uploadButtonState, setUploadButtonState] = useState(State.SUCCESS);

  useEffect(() => {
    if (uploadButtonState === State.LOADING) {
      setTimeout(() => {
        setUploadButtonState(State.SUCCESS);
      }, 1000);
    }
  }, [uploadButtonState]);

  useEffect(() => {
    if (editButtonState === State.LOADING) {
      setTimeout(() => {
        setEditButtonState(State.SUCCESS);
      }, 1000);
    }
  }, [editButtonState]);
  return (
    <div className="flex flex-row items-start justify-start w-full space-x-5">
      <div className="flex flex-col items-center justify-center">
        <input
          type="file"
          //only jpg and png
          accept="image/jpeg, image/png, image/jpg, image/heic"
          onClick={(e) => {
            e.currentTarget.value = "";
            setUploadButtonState(State.LOADING);
          }}
          onChange={async (e) => {
            if (e.target.files == null || e.target.files[0] == null) {
              setProfilePicture(null);
              setShowModal(false);
              setEditButtonState(State.SUCCESS);
              setUploadButtonState(State.SUCCESS);
              return;
            }
            setUploadButtonState(State.LOADING);
            var file = e.target.files[0];
            if (file) {
              if (!verifyImage(file)) {
                setUploadButtonState(State.SUCCESS);
                e.target.value = "";
                return;
              }
              if (file.type === "image/heic") {
                file = await convertHeictoPng(file);
              }
              setProfilePicture(file);
              setShowModal(true);
            } else {
              setProfilePicture(null);
              setShowModal(false);
              setEditButtonState(State.SUCCESS);
            }
            setUploadButtonState(State.SUCCESS);
          }}
          className="hidden"
          id="profile-pic"
          multiple={false}
        />
        {profilePicture && showModal ? (
          <ImageEditingModal
            image={profilePicture}
            setImage={setProfilePicture}
            setShowModal={setShowModal}
            borderRadius={10}
          />
        ) : null}
        <div className="flex flex-col items-center justify-center space-y-5 w-full">
          <label
            htmlFor={!profilePicture ? "profile-pic" : ""}
            className="flex flex-col items-center justify-center space-y-2 w-full"
          >
            {profilePicture ? (
              <div className="flex flex-row items-center justify-center space-x-2 relative">
                <ImageComponent
                  src={URL.createObjectURL(profilePicture)}
                  alt="Profile Picture"
                  className={`w-[10rem] h-[10rem] rounded-md overflow-hidden border`}
                />
              </div>
            ) : (
              <div className="flex flex-row items-center justify-center space-x-2 relative">
                <AiOutlineUser
                  className={`w-[10rem] h-[10rem] p-2  border border-text rounded-md z-10 bg-white`}
                />
              </div>
            )}
          </label>
        </div>
      </div>
      <div className="flex flex-col space-y-3 w-full justify-between min-h-full">
        <div className="flex flex-col space-y-1 w-full">
          {profilePicture ? (
            <div className="flex flex-col space-y-3 w-full">
              <p className="text-base font-medium text-textsubtle">
                Size: {(profilePicture.size / 1000).toFixed(2)} KB
              </p>
              <p className="text-base font-medium text-textsubtle">
                Type:{" "}
                {profilePicture.type.toUpperCase() ||
                  profilePicture.name.split(".")[1].toUpperCase() ||
                  "N/A"}
              </p>
            </div>
          ) : (
            <p className="text-sm font-medium text-textsubtle">
              Please upload a profile picture of yourself. This will help your
              customers identify you.
            </p>
          )}
        </div>
        {profilePicture ? (
          <Button
            variant="info"
            onClick={() => {
              if (profilePicture) {
                setEditButtonState(State.LOADING);
                setShowModal(true);
              }
            }}
            disabled={profilePicture === null}
            buttonstate={editButtonState}
          >
            <div className="flex flex-row items-center justify-center space-x-2">
              <AiOutlineEdit />
              <p>Edit</p>
            </div>
          </Button>
        ) : (
          <Button
            variant="info"
            onClick={() => {
              setUploadButtonState(State.LOADING);
              document.getElementById("profile-pic")?.click();
            }}
            buttonstate={uploadButtonState}
          >
            <div className="flex flex-row items-center justify-center space-x-2">
              <AiOutlineCloudUpload />
              <p>Upload</p>
            </div>
          </Button>
        )}
      </div>
    </div>
  );
}

export function ImageEditingModal({
  image,
  setImage,
  setShowModal,
  borderRadius = 250,
}: {
  image: File;
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  borderRadius?: number;
}) {
  const editor = useRef<AvatarEditor>(null);
  const [scale, setScale] = useState(1);
  return (
    <PopupWrapper
      onClose={() => {
        setShowModal(false);
      }}
    >
      <div className="flex flex-col items-center justify-center space-y-5 w-full">
        <AvatarEditor
          image={URL.createObjectURL(image)}
          width={250}
          height={250}
          border={50}
          color={[255, 255, 255, 0.6]} // RGBA
          scale={scale}
          rotate={0}
          ref={editor}
          borderRadius={borderRadius}
        />
        <RangeInput
          value={scale}
          max={2}
          min={1}
          step={0.01}
          onChange={setScale}
          title="Zoom"
        />
        <div className="flex flex-row items-center justify-center space-x-2 w-full">
          <Button
            variant="close"
            onClick={() => {
              setShowModal(false);
              setImage(null);
            }}
          >
            Remove
          </Button>
          <Button
            variant="success"
            onClick={async () => {
              setShowModal(false);
              if (editor.current) {
                const canvas = editor.current.getImageScaledToCanvas();
                canvas.toBlob((blob) => {
                  setImage(new File([blob!], image.name, { type: image.type }));
                });
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
        </div>
      </div>
    </PopupWrapper>
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
