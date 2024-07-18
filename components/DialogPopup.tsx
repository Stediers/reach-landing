import { Button } from "@components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogClose,
  DialogDescription,
  DialogTitle,
} from "@components/ui/dialog";
import { Gender, S3BucketName, State } from "@data/enums";
import { FetchServiceResponse } from "@data/types";
import React, { useState } from "react";
import {
  AiFillExclamationCircle,
  AiFillStar,
  AiOutlineCheck,
  AiOutlineClose,
} from "react-icons/ai";
import { Badge } from "@components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@components/ui/avatar";
import { BsGenderFemale, BsGenderMale, BsGenderTrans } from "react-icons/bs";
import IconWrapper from "./IconWrapper";

export function CustomDialog({
  title,
  description,
  triggerJSX,
  footerJSX,
  children,
  closeId = "close-dialog",
  maxWidth = "!max-w-lg",
  onInteractOutside,
  canClose,
  showCloseButton = true,
}: {
  title: string;
  description?: string;
  triggerJSX: React.ReactNode;
  footerJSX?: React.ReactNode;
  children: React.ReactNode;
  closeId?: string;
  maxWidth?: string;
  onInteractOutside?: () => void;
  canClose?: boolean;
  showCloseButton?: boolean;
}) {
  return (
    <Dialog open={canClose}>
      <DialogTrigger asChild>
        <div className="w-full hover:cursor-pointer">{triggerJSX}</div>
      </DialogTrigger>
      <DialogContent
        className={`!p-0 !m-0 !space-y-0 !gap-y-0 ${maxWidth}`}
        onInteractOutside={onInteractOutside}
      >
        <DialogHeader className="w-full flex flex-col items-start justify-start space-y-2 border-b p-5">
          <DialogTitle className="font-medium text-xl first-letter:capitalize">
            {title.length > 30 ? title.slice(0, 30) + "..." : title}
          </DialogTitle>
          {description && (
            <DialogDescription className="text-base text-left">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        <div className="flex flex-col items-center justify-start w-full space-y-5 px-5 py-3 max-h-[70vh] overflow-y-scroll hide-scrollbar">
          {children}
        </div>
        <div className="flex flex-row items-center justify-between w-full space-x-10 p-5 border-t">
          {showCloseButton && (
            <DialogClose asChild id={closeId} className="w-full">
              <Button variant="outline" className="w-full max-w-[100px]">
                Close
              </Button>
            </DialogClose>
          )}
          {footerJSX && (
            <div className="flex flex-col items-start justify-start gap-y-3 w-fit">
              {footerJSX}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function ServiceDialog({
  service,
  footerJSX,
  triggerJSX = (
    <Button variant="default" className="!w-full !bg-info">
      <p className="text-base font-medium">View</p>
    </Button>
  ),
}: {
  service: FetchServiceResponse;
  footerJSX?: JSX.Element;
  triggerJSX?: JSX.Element;
}) {
  return (
    // <Dialog>
    //   <DialogTrigger asChild>
    //     <div className="w-full">{triggerJSX}</div>
    //   </DialogTrigger>
    //   <DialogContent className="flex flex-col items-start justify-between w-full space-y-5 max-h-[90vh]">
    //     <div className="flex flex-col items-start justify-start w-full space-y-5 overflow-y-scroll hide-scrollbar">
    //       <DialogHeader className="w-full flex flex-col items-start justify-start space-y-5">
    //         <DialogTitle className="text-2xl font-medium first-letter:capitalize pr-2">
    //           {service.title}
    //         </DialogTitle>
    //         {service.rating !== null && service.rating > 0 ? (
    //           <DialogDescription className="flex flex-row items-center justify-center space-x-3">
    //             <Badge
    //               variant="infoOutline"
    //               className="flex flex-row items-center space-x-1"
    //             >
    //               <p className="text-info text-sm font-medium">
    //                 {service.rating.toFixed(1)}
    //               </p>
    //               <AiFillStar className="text-info !w-4 !h-4" />
    //             </Badge>
    //             <Badge className="text-sm" variant="default">
    //               {service.category.charAt(0).toUpperCase() +
    //                 service.category.slice(1)}
    //             </Badge>
    //           </DialogDescription>
    //         ) : (
    //           <DialogDescription className="flex flex-row items-center justify-center space-x-3">
    //             <Badge className="text-sm" variant="default">
    //               {service.category.charAt(0).toUpperCase() +
    //                 service.category.slice(1)}
    //             </Badge>
    //           </DialogDescription>
    //         )}
    //       </DialogHeader>
    //       <div className="flex flex-col items-start justify-start w-full space-y-5 overflow-y-scroll hide-scrollbar">
    //         <ListWrapper
    //           list={service.whatsIncluded}
    //           title="What's Included"
    //           icon={<AiOutlineCheck className="text-success text-2xl" />}
    //         />
    //         <ListWrapper
    //           list={service.whatsNotIncluded}
    //           title="What's Not Included"
    //           icon={<AiOutlineClose className="text-error text-2xl" />}
    //         />
    //         <ListWrapper
    //           list={service.requirements}
    //           title="Requirements"
    //           icon={
    //             <AiFillExclamationCircle className="text-danger text-2xl" />
    //           }
    //         />
    //       </div>
    //     </div>
    //     {footerJSX && (
    //       <DialogFooter className="w-full flex !flex-col space-y-5 !space-x-0">
    //         <div className="flex flex-col items-start justify-start space-y-5 w-full">
    //           {footerJSX}
    //         </div>
    //         <DialogClose asChild>
    //           <Button className="w-full text-base" variant="outline">
    //             Close
    //           </Button>
    //         </DialogClose>
    //       </DialogFooter>
    //     )}
    //   </DialogContent>
    // </Dialog>
    <CustomDialog
      title={service.title}
      triggerJSX={triggerJSX}
      footerJSX={footerJSX}
    >
      <div className="flex flex-col items-start justify-start w-full space-y-5 overflow-y-scroll hide-scrollbar">
        <ListWrapper
          list={service.whatsIncluded}
          title="What's Included"
          icon={<AiOutlineCheck className="text-success text-2xl" />}
        />
        <ListWrapper
          list={service.whatsNotIncluded}
          title="What's Not Included"
          icon={<AiOutlineClose className="text-error text-2xl" />}
        />
        <ListWrapper
          list={service.requirements}
          title="Requirements"
          icon={<AiFillExclamationCircle className="text-danger text-2xl" />}
        />
      </div>
    </CustomDialog>
  );
}

export function ProfileDialog({
  name,
  imageUrl,
  rating,
  triggerJSX = (
    <Button variant="default" className="!w-full !bg-info">
      <p className="text-base font-medium">View</p>
    </Button>
  ),
  footerJSX,
  gender,
  available,
}: {
  name: string;
  rating: number | null;
  imageUrl: string | null;
  triggerJSX?: React.ReactNode;
  footerJSX?: React.ReactNode;
  gender: Gender;
  available: boolean;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="w-full hover:cursor-pointer">{triggerJSX}</div>
      </DialogTrigger>

      <DialogContent>
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="p-1 border border-gray-100">
            <Avatar className="rounded-md !h-32 !w-32">
              <AvatarImage
                src={imageUrl || "https://github.com/shadcn.png"}
                alt="Shad Mirza"
                className="object-cover"
              />
              <AvatarFallback>{name}</AvatarFallback>
            </Avatar>
          </div>
          <p className="text-xl font-medium">{name}</p>
        </div>
        <div className="flex flex-col space-y-5 w-full items-start justify-start pt-5">
          <div className="grid grid-cols-3 gap-3 w-full">
            <IconWrapper
              icon={
                gender === Gender.FEMALE ? (
                  <BsGenderFemale className="text-3xl text-pink-500" />
                ) : gender === Gender.MALE ? (
                  <BsGenderMale className="text-3xl text-blue-500" />
                ) : (
                  <BsGenderTrans className="text-3xl text-purple-500" />
                )
              }
              title={gender.charAt(0).toUpperCase() + gender.slice(1)}
            />
            <IconWrapper
              icon={<AiFillStar className="text-4xl text-yellow-500" />}
              title={Number(rating) > 0 ? Number(rating).toFixed(1) : "N/A"}
            />
            <IconWrapper
              icon={
                available ? (
                  <AiOutlineCheck className="text-3xl text-success" />
                ) : (
                  <AiOutlineClose className="text-3xl text-error" />
                )
              }
              title={available ? "Available" : "Not Available"}
            />
          </div>
        </div>
        <DialogFooter>
          <div className="flex flex-col items-start justify-start space-y-3 w-full">
            {footerJSX}
          </div>
        </DialogFooter>
        <DialogClose asChild>
          <Button className="w-full text-base" variant="outline">
            Close
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

function ListWrapper({
  list,
  title,
  icon,
}: {
  list: string[];
  title: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-start justify-start w-full space-y-4">
      <p className="text-lg font-medium">{title}</p>
      <div className="flex flex-col items-start justify-start w-full space-y-5">
        {list.map((item, index) => (
          <div
            className="flex flex-row items-start justify-start space-x-3 w-full"
            key={index}
          >
            <div className="shrink-0">{icon}</div>
            <p className="text-base text-left break-words">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// export function EditProfileDialog({
//   response,
//   title,
//   triggerJSX,
//   footerJSX,
// }: {
//   response: FetchMyProfileResponse;
//   title: string;
//   triggerJSX?: JSX.Element;
//   footerJSX?: JSX.Element;
// }) {
//   const [name, setName] = useState<string>("");
//   const [imageFile, setImageFile] = useState<File | null>(null);

//   async function _editProfile() {
//     if (imageFile) {
//       const imageUrl = await uploadFileS3({
//         bucketName: S3BucketName.USER,
//         file: imageFile,
//         //create it under the folder gig/userId/profilePicture
//         fileName: `customer/${localStorage.getItem(
//           "mobileNumber"
//         )}/profilePicture`,
//       });
//       if (imageUrl) {
//         const response = await updateProfile({
//           name: name,
//           profilePicture: imageUrl,
//         });
//       }
//     } else {
//       showSnackBar({
//         message: "Please upload a profile picture",
//         state: State.ERROR,
//       });
//     }
//   }

//   function verifyForm(): boolean {
//     //set disabled to true if any of the fields are empty
//     if (name.length < 5 || imageFile === null) {
//       return true;
//     }
//     return false;
//   }

//   return (
//     <Dialog>
//       <DialogTrigger asChild>{triggerJSX}</DialogTrigger>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle className="text-xl font-medium">
//             <p className="text-gray-900">{title}</p>
//           </DialogTitle>
//         </DialogHeader>
//         <DialogFooter className="flex flex-col space-y-5 w-full items-start justify-start">
//           <div className="flex flex-col items-start justify-start w-full space-y-5">
//             <ProfilePictureInput
//               profilePicture={imageFile}
//               setProfilePicture={setImageFile}
//             />
//             <TextInput
//               onChange={(value) => setName(value)}
//               value={name}
//               title="Name"
//               placeholder={response?.user.name}
//             />
//             <Button
//               asyncOnClick={_editProfile}
//               variant="success"
//               disabled={verifyForm()}
//             >
//               Save
//             </Button>
//           </div>
//           {footerJSX}
//         </DialogFooter>
//         {/* <DialogClose asChild className="w-full">
//           <Button variant="close">Close</Button>
//         </DialogClose> */}
//       </DialogContent>
//     </Dialog>
//   );
// }
