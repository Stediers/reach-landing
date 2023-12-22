import { FetchAppointmentResponse } from "@api_functions/appointment/fetch-appointment";
import { updatePaymentStatus } from "@api_functions/appointment/update-payment-status";
import { requestRating } from "@api_functions/feedback/request-rating";
import Button from "@components/Button";
import Card from "@components/Card";
import IconWrapper from "@components/IconWrapper";
import ImageComponent from "@components/ImageComponent";
import LineHeader from "@components/LineHeader";
import ListItem from "@components/ListItem";
import Loading from "@components/Loading";
import { LocationCard, LocationCardWithName } from "@components/LocationCard";
import PriceComponent from "@components/Price";
import Rating from "@components/Rating";
import Setting from "@components/Setting";
import UnderlinedHeader from "@components/UnderlinedHeader";
import RadioInput from "@components/input/RadioInput";
import { showCustomJSXPopup } from "@components/notifications/Popup";
import { showSnackBar } from "@components/notifications/Snackbar";
import {
  AppointmentStatus,
  PaymentMode,
  PreferredGender,
  ServiceType,
  State,
} from "@data/enums";
import ListWrapper from "@wrapper/ListWrapper";
import DesktopHeaderWrapper from "@wrapper/responsive/DesktopHeaderWrapper";
import DesktopWrapper from "@wrapper/responsive/DesktopWrapper";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  AiOutlineLaptop,
  AiFillQuestionCircle,
  AiOutlineQuestionCircle,
  AiFillHome,
  AiFillVideoCamera,
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiFillRightCircle,
  AiOutlineAlert,
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import { BsGenderFemale, BsGenderMale, BsGenderTrans } from "react-icons/bs";
import { FaLaptop } from "react-icons/fa";
import { FcRating } from "react-icons/fc";
import { GiBowTieRibbon } from "react-icons/gi";
import { HiLocationMarker } from "react-icons/hi";

export default function Desktop({
  response,
  setResponse,
  paymentButtonState,
  setPaymentButtonState,
  requestRatingButtonState,
  setRequestRatingButtonState,
  cancelButtonState,
  setCancelButtonState,
}: {
  response: FetchAppointmentResponse;
  setResponse: React.Dispatch<
    React.SetStateAction<FetchAppointmentResponse | null>
  >;
  paymentButtonState: State;
  setPaymentButtonState: React.Dispatch<React.SetStateAction<State>>;
  requestRatingButtonState: State;
  setRequestRatingButtonState: React.Dispatch<React.SetStateAction<State>>;
  cancelButtonState: State;
  setCancelButtonState: React.Dispatch<React.SetStateAction<State>>;
}) {
  return (
    <DesktopWrapper
      className="flex flex-col items-center justify-start space-y-10"
      header="View Appointment"
    >
      <DesktopHeaderWrapper title="Status">
        <div className="max-w-[20rem] w-full">
          <Appointment
            bookedAt={null}
            cancelledAt={response.cancelledAt}
            completedAt={response.completedAt}
            ratedAt={response.ratedAt}
            scheduledAt={response.scheduledAt}
            status={response.appointment.status}
            id={response.appointment.id}
            setRequestRatingButtonState={setRequestRatingButtonState}
            requestRatingButtonState={requestRatingButtonState}
          />
        </div>
      </DesktopHeaderWrapper>
      {response.offlineSnapShotData ? (
        <DesktopHeaderWrapper title="Service Details">
          <ServicePopup service={response.offlineSnapShotData.service} />
        </DesktopHeaderWrapper>
      ) : response.onlineSnapShotData ? (
        <DesktopHeaderWrapper title="Service Details">
          <ServicePopup service={response.onlineSnapShotData.service} />
        </DesktopHeaderWrapper>
      ) : response.homeSnapShotData ? (
        <DesktopHeaderWrapper title="Service Details">
          <ServicePopup service={response.homeSnapShotData.service} />
        </DesktopHeaderWrapper>
      ) : null}
      <DesktopHeaderWrapper title="Customer Details">
        <UserDetails
          user={response.customer}
          appointmentId={response.appointment.id}
        />
      </DesktopHeaderWrapper>
      {response.onlineSnapShotData ? (
        <DesktopHeaderWrapper title="Meeting Details">
          <OnlineServiceDetails
            onlineSnapShotData={response.onlineSnapShotData}
          />
        </DesktopHeaderWrapper>
      ) : response.offlineSnapShotData ? (
        <DesktopHeaderWrapper title="Meeting Details">
          <OfflineServiceDetails
            offlineSnapShotData={response.offlineSnapShotData}
          />
        </DesktopHeaderWrapper>
      ) : response.homeSnapShotData ? (
        <DesktopHeaderWrapper title="Meeting Details">
          <HomeServiceDetails homeSnapShotData={response.homeSnapShotData} />
        </DesktopHeaderWrapper>
      ) : null}
    </DesktopWrapper>
  );
}

function UserDetails({
  user,
}: {
  user: FetchAppointmentResponse["customer"];
  appointmentId: string;
}) {
  return (
    <div className="flex flex-col items-start justify-center space-y-2 w-fit">
      <p className="text-base font-medium">Name: {user!!.name}</p>
      <p className="text-base font-medium">Mobile: {user!!.mobileNumber}</p>
    </div>
  );
}

function OnlineServiceDetails({
  onlineSnapShotData,
}: {
  onlineSnapShotData: FetchAppointmentResponse["onlineSnapShotData"];
}) {
  return (
    <div className="flex flex-col items-center justify-center !space-y-3 max-w-lg">
      <p className="text-base w-full">
        The meeting took place on{" "}
        {onlineSnapShotData?.platform.replace("_", " ").toUpperCase()}
      </p>
    </div>
  );
}

function OfflineServiceDetails({
  offlineSnapShotData,
}: {
  offlineSnapShotData: FetchAppointmentResponse["offlineSnapShotData"];
}) {
  return (
    <div className="max-w-lg flex flex-col items-center justify-center !space-y-3">
      <LocationCard
        location={offlineSnapShotData!!.location}
        getDirections={true}
      />
    </div>
  );
}

function HomeServiceDetails({
  homeSnapShotData,
}: {
  homeSnapShotData: FetchAppointmentResponse["homeSnapShotData"];
}) {
  return <LocationCardWithName address={homeSnapShotData!!.address} />;
}

function ServicePopup({
  service,
}: {
  service: {
    title: string;
    whatsIncluded: string[];
    whatsNotIncluded: string[];
    requirements: string[];
    serviceId: string;
    imageUrls: string[];
  };
}) {
  return (
    <div className="flex flex-col items-start justify-start !space-y-5 w-full">
      <div className="flex flex-col items-start justify-start space-y-2 w-full">
        <p className="text-lg font-medium">{service.title}</p>
        <Rating rating={4} />
      </div>
      <div className="flex flex-col items-start justify-start space-y-1 w-full">
        <p className="text-md font-medium">What&apos;s Included</p>
        {service.whatsIncluded.length > 3
          ? service.whatsIncluded.slice(0, 3).map((item) => (
              <p className="text-base/7" key={item}>
                {item}
              </p>
            ))
          : service.whatsIncluded.map((item) => (
              <p className="text-base/7" key={item}>
                {item}
              </p>
            ))}
        {service.whatsIncluded.length > 3 && (
          <p className="text-base/7">
            +{service.whatsIncluded.length - 3} more
          </p>
        )}
      </div>
      <div className="flex flex-col items-start justify-start space-y-1 w-full">
        <p className="text-md font-medium">What&apos;s Not Included</p>
        {service.whatsNotIncluded.length > 3
          ? service.whatsNotIncluded.slice(0, 3).map((item) => (
              <p className="text-base/7" key={item}>
                {item}
              </p>
            ))
          : service.whatsNotIncluded.map((item) => (
              <p className="text-base/7" key={item}>
                {item}
              </p>
            ))}
        {service.whatsNotIncluded.length > 3 && (
          <p className="text-base/7">
            +{service.whatsNotIncluded.length - 3} more
          </p>
        )}
      </div>
      <div className="flex flex-col items-start justify-start space-y-1 w-full">
        <p className="text-md font-medium">Requirements</p>
        {service.requirements.length > 3 ? (
          service.requirements.slice(0, 3).map((item) => (
            <p className="text-base/7" key={item}>
              {item}
            </p>
          ))
        ) : (
          <p className="text-base/7">{service.requirements}</p>
        )}
        {service.requirements.length > 3 && (
          <p className="text-base/7">+{service.requirements.length - 3} more</p>
        )}
      </div>
    </div>
  );
}

function Appointment({
  cancelledAt,
  completedAt,
  scheduledAt,
  bookedAt,
  status,
  ratedAt,
  setRequestRatingButtonState,
  requestRatingButtonState,
  id,
}: {
  scheduledAt: Date;
  bookedAt: Date | null;
  completedAt: Date | null;
  cancelledAt: Date | null;
  status: AppointmentStatus;
  ratedAt: Date | null;
  setRequestRatingButtonState: React.Dispatch<React.SetStateAction<State>>;
  id: string;
  requestRatingButtonState: State;
}) {
  return (
    <ListWrapper className="flex flex-col items-center justify-start w-full space-y-5">
      {status == AppointmentStatus.COMPLETED ||
      status == AppointmentStatus.RATED ? (
        <RadioInput
          options={[
            {
              icon: completedAt ? (
                <AiOutlineCheckCircle className="text-4xl text-white shrink-0 " />
              ) : (
                <AiOutlineCloseCircle className="text-4xl text-white shrink-0 " />
              ),
              title: "Completed",
              onClick: () => {},
              className: completedAt ? "bg-success" : "bg-danger",
              textColor: "text-white",
            },
            {
              icon:
                requestRatingButtonState === State.SUCCESS ? (
                  status == AppointmentStatus.RATED ? (
                    <AiOutlineCheckCircle className="text-4xl text-white shrink-0 " />
                  ) : (
                    <AiOutlineCloseCircle className="text-4xl text-white shrink-0 " />
                  )
                ) : (
                  <Loading className="w-8 h-8 text-white" />
                ),

              title: status == AppointmentStatus.RATED ? "Rated" : "Not Rated",
              onClick: () => {
                if (status == AppointmentStatus.COMPLETED) {
                  showCustomJSXPopup({
                    jsx: (
                      <div className="flex flex-col items-center justify-center w-full space-y-5">
                        <div className="flex flex-col items-center justify-center w-full space-y-3">
                          <FcRating className="w-12 h-12 shrink-0 text-success" />
                          <p className="text-lg text-center font-medium">
                            No Feedback provided
                          </p>
                          <p className="text-base text-center">
                            It is very important to get feedback from the user
                            to improve your profile. Hurry up and request
                            feedback from the user.
                          </p>
                        </div>
                      </div>
                    ),
                    okText: "Request Feedback",
                    okButtonClassName: "bg-success text-white font-medium",
                    onOk: async () => {
                      setRequestRatingButtonState(State.LOADING);
                      const res = await requestRating({
                        appointmentId: id,
                      });
                      if (res) {
                        showSnackBar({
                          message: "Feedback requested successfully",
                          state: State.SUCCESS,
                        });
                      }
                      setRequestRatingButtonState(State.SUCCESS);
                    },
                    showCancelButton: false,
                    preventDefault: true,
                  });
                } else if (status === AppointmentStatus.RATED) {
                  //scroll to div with id feedback
                  document.getElementById("feedback")?.scrollIntoView();
                }
              },
              //
              className:
                status == AppointmentStatus.RATED ? "bg-success" : "bg-danger",
              textColor: "text-white",
            },
          ]}
          cols="grid-cols-2"
        />
      ) : status === AppointmentStatus.CANCELLED ? (
        <RadioInput
          options={[
            {
              icon: (
                <AiOutlineCloseCircle className="text-4xl text-white shrink-0 " />
              ),
              title: "Cancelled",
              onClick: () => {},
              className: "bg-danger",
              textColor: "text-white",
            },
          ]}
          cols="grid-cols-1"
        />
      ) : (
        <RadioInput
          options={[
            {
              icon: (
                <AiOutlineAlert className="text-4xl text-white shrink-0 " />
              ),
              title: "Pending",
              onClick: () => {},
              className: "bg-warning",
              textColor: "text-white",
            },
          ]}
          cols="grid-cols-2"
        />
      )}
    </ListWrapper>
  );
}

// function Appointment({ item }: { item: FetchAppointment_Appointment }) {
//   return (
//     <ListWrapper className="flex flex-col items-center justify-start w-full space-y-5">
//       {item.bookedAt && (
//         <ListItem
//           title="Booked"
//           value={new Date(item.bookedAt).toDateString()}
//         />
//       )}
//       {!(item.bookedAt && item.cancelledAt) && (
//         <ListItem
//           title="Scheduled"
//           value={new Date(item.scheduledAt).toDateString()}
//         />
//       )}
//       {item.status == AppointmentStatus.CANCELLED ? (
//         <ListItem
//           title="Cancelled"
//           value={
//             item.cancelledAt
//               ? new Date(item.cancelledAt).toDateString()
//               : "Not yet"
//           }
//         />
//       ) : (
//         <div className="flex flex-col space-y-5 w-full">
//           <ListItem
//             title="Completed"
//             value={
//               item.completedAt
//                 ? new Date(item.completedAt).toDateString()
//                 : "Not yet"
//             }
//           />
//           <ListItem
//             title="Paid"
//             value={
//               item.paidAt ? new Date(item.paidAt).toDateString() : "Not yet"
//             }
//           />
//           <ListItem
//             title="Rated"
//             value={
//               item.ratedAt ? new Date(item.ratedAt).toDateString() : "Not yet"
//             }
//           />
//           {item.ratedAt && item.userBehaviourRating && (
//             <div className="flex flex-col items-start justify-start space-y-5 w-full">
//               <LineHeader title="Feedback" />
//               <Card className="flex flex-col items-start justify-start !space-y-3 w-full">
//                 <div className="flex flex-row items-center justify-between w-full">
//                   <div className="flex flex-row items-center justify-start space-x-2">
//                     <p className="text-base font-medium">User Behaviour</p>
//                     <AiOutlineQuestionCircle className="text-base text-textsubtle" />
//                   </div>
//                   <Rating rating={item.userBehaviourRating} />
//                 </div>
//                 <div className="flex flex-row items-center justify-between w-full">
//                   <div className="flex flex-row items-center justify-start space-x-2">
//                     <p className="text-base font-medium">Service Quality</p>
//                     <AiOutlineQuestionCircle className="text-base text-textsubtle" />
//                   </div>
//                   <Rating rating={item.serviceQualityRating} />
//                 </div>
//                 <div className="flex flex-col items-start justify-start space-y-2 w-full">
//                   <p className="text-base font-medium">Feedback</p>
//                   {item.feedback ? (
//                     <p className="text-base/7 text-textsubtle">
//                       {item.feedback}
//                     </p>
//                   ) : (
//                     <p className="text-base/7 text-textsubtle">
//                       No feedback provided
//                     </p>
//                   )}
//                 </div>
//               </Card>
//             </div>
//           )}
//         </div>
//       )}
//     </ListWrapper>
//   );
// }

// function Appointment({ item }: { item: FetchAppointment_Appointment }) {
//   return (
//     <div className="flex flex-col space-y-5 items-start justify-start col-span-2 w-full">
//       <div className="grid grid-cols-11 w-full gap-2 justify-items-center items-center">
//         <div className="flex flex-col items-center justify-center space-y-2 w-full col-span-3">
//           <Item
//             title="Booked"
//             date={item.bookedAt}
//             active={item.status === AppointmentStatus.BOOKED}
//           />
//           <Item
//             title="Scheduled"
//             date={item.scheduledAt}
//             active={item.status === AppointmentStatus.SCHEDULED}
//           />
//         </div>
//         <AiFillRightCircle className="text-4xl text-textsubtle col-span-1" />
//         <div className="flex flex-col items-center justify-center space-y-2 w-full col-span-3">
//           <Item
//             title="Completed"
//             date={item.completedAt}
//             active={item.status === AppointmentStatus.COMPLETED}
//           />
//           <Item title="Paid" date={item.paidAt} />
//         </div>
//         <AiFillRightCircle className="text-4xl text-textsubtle col-span-1" />
//         <div className="flex flex-col items-center justify-center space-y-2 w-full col-span-3">
//           {item.cancelledAt ? (
//             <Item
//               title="Cancelled"
//               date={item.cancelledAt}
//               active={item.status === AppointmentStatus.CANCELLED}
//               className="col-span-3 h-full"
//             />
//           ) : (
//             <Item
//               title="Rated"
//               date={item.ratedAt}
//               active={item.status === AppointmentStatus.RATED}
//               className="col-span-3 h-full"
//             >
//               {item.ratedAt && <Feedback item={item} />}
//             </Item>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// function Feedback({ item }: { item: FetchAppointment_Appointment }) {
//   return (
//     <div className="flex flex-col items-center justify-start !space-y-5 pt-3 w-full">
//       <div className="flex flex-col items-start justify-start space-y-2 w-full">
//         <div className="flex flex-row items-center justify-between w-full">
//           <p className="text-base font-medium">User Behaviour</p>
//           <Rating rating={item.userBehaviourRating} />
//         </div>
//         <div className="flex flex-row items-center justify-between w-full">
//           <p className="text-base font-medium">Service Quality</p>
//           <Rating rating={item.serviceQualityRating} />
//         </div>
//       </div>
//       {item.feedback ? (
//         <p className="text-base/7 text-textsubtle text-center">
//           {item.feedback}
//         </p>
//       ) : (
//         <p className="text-base/7 text-textsubtle text-center">
//           No feedback provided
//         </p>
//       )}
//     </div>
//   );
// }

// function Item({
//   title,
//   date,
//   className,
//   children,
//   active,
// }: {
//   title: string;
//   date: Date | null;
//   className?: string;
//   children?: React.ReactNode;
//   active?: boolean;
// }) {
//   return (
//     <motion.div
//       className={`col-span-1 w-full flex flex-col rounded-md items-center justify-center !space-y-2 p-3 lg:p-5 shrink-0 border ${
//         active ? "border-primary" : "border-gray"
//       } ${className}`}
//     >
//       {date ? (
//         <AiFillCheckCircle className="text-2xl text-success" />
//       ) : (
//         <AiFillCloseCircle className="text-2xl text-error" />
//       )}
//       <div className="flex flex-col items-center justify-center space-y-2 w-full">
//         <p className={`text-base lg:text-md font-medium text-center`}>
//           {title}
//         </p>
//         <p className={`text-base/7 lg:text-sm text-center`}>
//           {date ? new Date(date).toDateString() : "Not yet"}
//         </p>
//       </div>
//       {children}
//     </motion.div>
//   );
// }

// function UserCard({ item }: { item: FetchAppointment_User }) {
//   return (
//     <Card className="flex flex-col items-center !space-y-5 w-full">
//       <ImageComponent
//         src={item!!.imageUrl ?? "/images/default_profile.png"}
//         className="rounded-full w-[100px] h-[100px] border border-primary"
//         alt=""
//       />
//       <div className="flex flex-col items-center space-y-1">
//         <span className="text-md font-medium">{item!!.name}</span>
//         <span className="text-textsubtle text-sm">{item!!.mobileNumber}</span>
//       </div>
//       <div className="flex flex-col items-center justify-start space-y-2 w-full">
//         <Button
//           text="View Profile"
//           link={`/user/${item!!.id}`}
//           newTab={true}
//           className="w-full bg-primary text-white py-3 text-base rounded-md text-center font-medium"
//         />
//       </div>
//     </Card>
//   );
// }

// function ServiceCard({ item }: { item: FetchAppointment_Service }) {
//   const experienceString =
//     new Date().getFullYear() -
//       new Date(item.baseData.experience).getFullYear() >
//     0
//       ? `${
//           new Date().getFullYear() -
//           new Date(item.baseData.experience).getFullYear()
//         } years`
//       : `${
//           new Date().getMonth() - new Date(item.baseData.experience).getMonth()
//         } months`;
//   return (
//     <Card className="flex flex-col items-center justify-start !space-y-8 w-full !py-4">
//       <h2 className="text-lg font-medium first-letter:capitalize text-center">
//         {item.baseData.title}
//       </h2>
//       <div className="grid grid-cols-3 gap-2 justify-items-center w-full">
//         <IconWrapper
//           // title={new Date() - new Date(service.experience) + " years"}
//           title={experienceString}
//           icon={<GiBowTieRibbon className="text-xl text-warning" />}
//         />
//         {item.baseData.serviceType === ServiceType.HOME && (
//           <Link href={`/console/profile/manage-addresses`}>
//             <IconWrapper
//               title={item.baseData.location || "Somewhere in the world"}
//               icon={<AiFillHome className="text-xl text-info" />}
//               whileTap={{ scale: 0.9 }}
//             />
//           </Link>
//         )}
//         {item.baseData.serviceType === ServiceType.ONLINE && (
//           <IconWrapper
//             title="Online"
//             icon={<AiFillVideoCamera className="text-xl text-info" />}
//           />
//         )}
//         {item.baseData.serviceType === ServiceType.OFFLINE && (
//           <IconWrapper
//             title="Offline"
//             icon={<HiLocationMarker className="text-2xl text-info" />}
//           />
//         )}
//         <IconWrapper
//           title={
//             item.baseData.preferredGender === PreferredGender.FEMALE
//               ? "Female"
//               : item.baseData.preferredGender === PreferredGender.MALE
//               ? "Male"
//               : "Unisex"
//           }
//           icon={
//             item.baseData.preferredGender === PreferredGender.FEMALE ? (
//               <BsGenderFemale className="text-2xl text-pink-500" />
//             ) : item.baseData.preferredGender === PreferredGender.MALE ? (
//               <BsGenderMale className="text-2xl text-blue-500" />
//             ) : (
//               <BsGenderTrans className="text-2xl text-purple-500" />
//             )
//           }
//         />
//       </div>
//       <div className="self-start px-1 flex flex-col items-start justify-start space-y-4 w-full">
//         <PriceComponent price={item.price} />
//       </div>
//       <div className="flex flex-col items-start justify-start space-y-2 w-full">
//         <Button
//           text="View Service"
//           link={`https://reach-web-phi.vercel.app/service/${item.baseData.id}`}
//           newTab={true}
//           className="w-full bg-primary text-white py-3 text-base rounded-md text-center font-medium"
//         />
//       </div>
//     </Card>
//   );
// }
