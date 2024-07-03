import { Button } from "@components/ui/button";
import {
  AiOutlineCheck,
  AiOutlineClose,
  AiFillExclamationCircle,
  AiFillStar,
  AiFillHome,
  AiFillVideoCamera,
} from "react-icons/ai";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Gender,
  PreferredGender,
  S3BucketName,
  ServiceType,
  State,
} from "@data/enums";
import { BsGenderFemale, BsGenderMale, BsGenderTrans } from "react-icons/bs";
import { FetchPartnerResponse, FetchServiceResponse, Price } from "@data/types";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import PriceComponent from "./price/MobilePrice";
import {
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  Sheet,
  SheetTitle,
  SheetDescription,
} from "./ui/sheet";
import BoxRating from "./BoxRating";

export function ServicePopupMobile({
  service,
  triggerJSX = (
    <Button variant="default" className="!w-full !bg-info">
      <p className="text-base font-medium">View</p>
    </Button>
  ),
  footerJSX,
  price,
}: {
  service: FetchServiceResponse;
  triggerJSX?: React.ReactNode;
  footerJSX?: React.ReactNode;
  price?: Price;
}) {
  return (
    // <Drawer closeThreshold={0.5}>
    //   <DrawerTrigger asChild>
    //     <div className="w-full">{triggerJSX}</div>
    //   </DrawerTrigger>
    //   <DrawerContent className="">
    //     <DrawerHeader>
    //       <DrawerTitle className="text-xl font-medium first-letter:capitalize">
    //         {service.title}
    //       </DrawerTitle>
    //       {service.rating !== null && service.rating > 0 ? (
    //         <DrawerDescription className="flex flex-row items-center justify-center space-x-3">
    //           <Badge
    //             variant="infoOutline"
    //             className="flex flex-row items-center space-x-1"
    //           >
    //             <p className="text-info text-sm font-medium">
    //               {service.rating.toFixed(1)}
    //             </p>
    //             <AiFillStar className="text-info !w-4 !h-4" />
    //           </Badge>
    //           {/* <Badge variant="infoOutline">
    //             <p className="text-info text-sm font-medium">
    //               {service.category.charAt(0).toUpperCase() +
    //                 service.category.slice(1)}
    //             </p>
    //           </Badge> */}
    //         </DrawerDescription>
    //       ) : (
    //         <DrawerDescription className="flex flex-row items-center justify-center space-x-3">
    //           <Badge variant="successOutline">
    //             <p className="text-success text-sm font-medium">New</p>
    //           </Badge>
    //           {/* <Badge variant="infoOutline">
    //             <p className="text-info text-sm font-medium">
    //               {service.category.charAt(0).toUpperCase() +
    //                 service.category.slice(1)}
    //             </p>
    //           </Badge> */}
    //         </DrawerDescription>
    //       )}
    //     </DrawerHeader>
    //     <DrawerFooter className="flex flex-col space-y-5 w-full items-start justify-start relative">
    //       <div className="flex flex-col items-start justify-start w-full space-y-5 !overflow-y-scroll hide-scrollbar max-h-[50svh]">
    //         {price && <PriceComponent price={price} />}
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
    //       <div className="flex flex-col items-start justify-start space-y-3 w-full sticky bottom-5">
    //         {footerJSX}
    //         <DrawerClose className="w-full">
    //           <Button className="w-full text-base" variant="outline">
    //             Close
    //           </Button>
    //         </DrawerClose>
    //       </div>
    //     </DrawerFooter>
    //   </DrawerContent>
    // </Drawer>
    <CustomDrawer
      title={service.title}
      description={
        service.rating !== null && service.rating > 0
          ? "Rating: " + service.rating.toFixed(1)
          : "New"
      }
      triggerJSX={triggerJSX}
      footerJSX={footerJSX}
    >
      {price && <PriceComponent price={price} />}
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
    </CustomDrawer>
  );
}

export function ServicePopupDesktop({
  service,
  location,
  triggerJSX = (
    <Button variant="default" className="!w-full !bg-info">
      <p className="text-base font-medium">View</p>
    </Button>
  ),
  footerJSX,
  price,
}: {
  service: FetchServiceResponse;
  triggerJSX?: React.ReactNode;
  footerJSX?: React.ReactNode;
  price?: Price;
  location: string;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="w-full">{triggerJSX}</div>
      </SheetTrigger>
      <SheetContent className="flex flex-col items-start justify-between w-full space-y-5">
        <div className="flex flex-col items-start justify-start w-full space-y-5 overflow-y-scroll">
          <SheetHeader className="w-full flex flex-col items-start justify-start space-y-5 border-b pb-5">
            <SheetTitle className="text-xl font-medium first-letter:capitalize pr-2">
              {service.title}
            </SheetTitle>
            <SheetDescription className="flex flex-row items-start justify-start gap-x-3 gap-y-3 flex-wrap w-full">
              {service.rating !== null && service.rating > 0 ? (
                <Badge
                  variant="infoOutline"
                  className="flex flex-row items-center space-x-1"
                >
                  <p className="text-info text-sm font-medium">
                    {service.rating.toFixed(1)}
                  </p>
                  <AiFillStar className="text-info !w-4 !h-4" />
                </Badge>
              ) : null}
              <Badge variant="hardOutline">
                <p className="text-sm font-medium">
                  {service.experience} of Experience
                </p>
              </Badge>
              <Badge variant="hardOutline">
                <p className="text-sm font-medium">
                  {service.preferredGender === PreferredGender.FEMALE
                    ? "Female"
                    : service.preferredGender === PreferredGender.MALE
                    ? "Male"
                    : "All"}{" "}
                  Audiences
                </p>
              </Badge>
              <Badge variant="hardOutline">
                <p className="text-sm font-medium">
                  Provided{" "}
                  {service.serviceType.charAt(0).toUpperCase() +
                    service.serviceType.slice(1)}
                </p>
              </Badge>
              {service.serviceType === ServiceType.OFFLINE ? (
                <Badge variant="hardOutline">
                  <p className="text-sm font-medium">{location}</p>
                </Badge>
              ) : null}
              {service.rating && service.rating > 0 ? (
                <BoxRating rating={service.rating} />
              ) : null}
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-col items-start justify-start w-full space-y-10 overflow-y-scroll hide-scrollbar">
            {price && <PriceComponent price={price} />}
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
              icon={
                <AiFillExclamationCircle className="text-danger text-2xl" />
              }
            />
          </div>
        </div>
        <SheetFooter className="w-full sticky bottom-5">
          <div className="flex flex-col items-start justify-start space-y-5 w-full">
            {footerJSX}
            <SheetTrigger asChild>
              <Button className="w-full text-base" variant="outline">
                Close
              </Button>
            </SheetTrigger>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
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

export function ProfilePopup({
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
    <Drawer closeThreshold={0.5}>
      <DrawerTrigger asChild>
        <div className="w-full">{triggerJSX}</div>
      </DrawerTrigger>
      <DrawerContent className="">
        <DrawerHeader>
          <DrawerTitle className="text-xl font-medium">
            <div className="flex flex-col items-center justify-center space-y-3">
              <div className="p-1 border border-gray-100">
                <Avatar className="rounded-md !h-32 !w-32">
                  <AvatarImage
                    src={imageUrl || "https://github.com/shadcn.png"}
                    alt="Shad Mirza"
                    className="object-cover rounded-md"
                  />
                  <AvatarFallback>{name}</AvatarFallback>
                </Avatar>
              </div>
              <p className="text-xl font-medium">{name}</p>
            </div>
          </DrawerTitle>
        </DrawerHeader>
        <DrawerFooter className="flex flex-col space-y-5 w-full items-start justify-start">
          {/* <RadioInput
            options={[
              {
                icon:
                  gender === Gender.FEMALE ? (
                    <BsGenderFemale className="text-3xl text-pink-500" />
                  ) : gender === Gender.MALE ? (
                    <BsGenderMale className="text-3xl text-blue-500" />
                  ) : (
                    <BsGenderTrans className="text-3xl text-purple-500" />
                  ),
                title: gender,
                onClick: () => {},
              },
              {
                icon: <AiFillStar className="text-4xl text-yellow-500" />,
                onClick: () => {},
                title: Number(rating) > 0 ? Number(rating).toFixed(1) : "N/A",
              },
              {
                icon: available ? (
                  <AiOutlineCheck className="text-3xl text-success" />
                ) : (
                  <AiOutlineClose className="text-3xl text-error" />
                ),
                title: available ? "Available" : "Not Available",
                onClick: () => {},
              },
            ]}
            cols="grid-cols-3"
          /> */}
          <div className="grid grid-cols-3 gap-3 w-full">
            <BoxDetail
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
            <BoxDetail
              icon={<AiFillStar className="text-4xl text-yellow-500" />}
              title={Number(rating) > 0 ? Number(rating).toFixed(1) : "N/A"}
            />
            <BoxDetail
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
          <DrawerClose className="w-full">
            <div className="flex flex-col items-start justify-start space-y-3 w-full">
              {footerJSX}
              <DrawerClose className="w-full">
                <Button className="w-full text-base" variant="outline">
                  Close
                </Button>
              </DrawerClose>
            </div>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function BoxDetail({ title, icon }: { title: string; icon: React.ReactNode }) {
  return (
    <Card className="flex flex-col items-center justify-center w-full col-span-1 border-none outline-none bg-white !shadow-none">
      <CardHeader className="pt-4 pb-2">{icon}</CardHeader>
      <CardContent className="pb-3">
        <p className="text-base font-medium text-center">{title}</p>
      </CardContent>
    </Card>
  );
}

export function CustomDrawer({
  title,
  triggerJSX,
  footerJSX,
  children,
  description,
  triggerClassName,
  scaleBackground = true,
}: {
  title: string;
  triggerJSX: React.ReactNode;
  footerJSX: React.ReactNode;
  children: React.ReactNode;
  description?: string;
  triggerClassName?: string;
  scaleBackground?: boolean;
}) {
  return (
    <Drawer closeThreshold={0.5} shouldScaleBackground={scaleBackground}>
      <DrawerTrigger asChild className={triggerClassName}>
        <div className="w-full flex justify-center">{triggerJSX}</div>
      </DrawerTrigger>
      <DrawerContent className="max-h-[80vh] w-full">
        <DrawerHeader className="flex flex-col items-start text-left">
          <DrawerTitle className="text-xl font-medium first-letter:capitalize">
            {title}
          </DrawerTitle>
          {description && (
            <DrawerDescription className="text-base">
              {description}
            </DrawerDescription>
          )}
        </DrawerHeader>
        <DrawerFooter className="flex flex-col space-y-5 w-full items-start justify-start overflow-y-scroll hide-scrollbar">
          <div className="flex flex-col items-start justify-start w-full space-y-5">
            {children}
          </div>
          {footerJSX}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
