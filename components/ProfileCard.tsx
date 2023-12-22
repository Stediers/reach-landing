import {
  AiFillCalendar,
  AiFillEye,
  AiFillStar,
  AiOutlineUser,
} from "react-icons/ai";
import { FaMobileAlt, FaShare } from "react-icons/fa";
import Button from "./Button";
import Card from "./Card";
import Chip from "./Chip";
import ImageComponent from "./ImageComponent";
import PerformanceCard from "./PerformanceCard";
import Rating from "./Rating";
import { IndianLanguages } from "@data/enums";
import { showCustomJSXPopup, showSharePopup } from "./notifications/Popup";
import IconWrapper from "./IconWrapper";
import { motion } from "framer-motion";
import { RiSpeakFill } from "react-icons/ri";

export default function ProfileCard({
  mobileNumber,
  imageUrl,
  rating,
  name,
  ratedAppointments,
  totalAppointments,
  gigId,
  designation,
  fluentLanguages,
}: {
  name: string;
  mobileNumber: string;
  imageUrl: string | null;
  rating: number | null;
  ratedAppointments?: number;
  totalAppointments?: number;
  gigId: string;
  designation: string;
  fluentLanguages: IndianLanguages[];
}) {
  return (
    <Card className="p-5 bg-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-between">
          <Chip
            title="Languages"
            iconPlacement="left"
            icon={<RiSpeakFill />}
            onClick={() => {
              showCustomJSXPopup({
                jsx: (
                  <ProfileRatingPopupInfo
                    title="Languages"
                    icon={<RiSpeakFill className="w-14 h-14" />}
                    description={fluentLanguages
                      .map((language) => language)
                      //make first letter capital
                      .map(
                        (language) =>
                          language[0].toUpperCase() + language.slice(1)
                      )
                      .join(", ")}
                  />
                ),
                onOk: () => {},
              });
            }}
            className="border-gray border"
          />
        </div>
        <div
          onClick={() => {
            showCustomJSXPopup({
              jsx: (
                <ProfileRatingPopupInfo
                  title="Behaviour Rating"
                  icon={<Rating rating={rating} textClassName="text-lg" />}
                  description="This is your average rating from all your appointments"
                />
              ),
              onOk: () => {},
            });
          }}
        >
          <Rating rating={rating} />
        </div>
      </div>
      <div className="flex flex-col items-center justify-start space-y-5">
        {imageUrl != null ? (
          <ImageComponent
            src={imageUrl}
            className="rounded-md w-[10rem] h-[10rem] object-cover overflow-hidden"
            alt="Profile Picture"
          />
        ) : (
          <div className="flex items-center justify-center bg-background rounded-full p-2 shrink-0">
            <AiOutlineUser className="text-6xl " />
          </div>
        )}
        <div className="flex flex-col items-center justify-start space-y-1 w-full">
          <p className="text-lg font-medium w-full text-center">{name}</p>
          <p className="text-base font-normal text-textsubtle">{designation}</p>
        </div>
        {ratedAppointments != undefined &&
        totalAppointments != undefined &&
        totalAppointments > 0 ? (
          <PerformanceCard
            total={totalAppointments}
            value={ratedAppointments}
            totalName="Total Appointments"
            valueName="Rated Appointments"
          />
        ) : null}
        <div className="flex items-center space-x-3 w-full">
          <Button
            text="View Profile"
            newTab={true}
            link={`https://reach-web-phi.vercel.app/partner/${gigId}`}
            className="bg-primary text-white font-medium"
          />
          <Button
            text="Share Profile"
            onClick={() => {
              // navigator.share({
              //   title: "Gig",
              //   text: "Check out my profile on Gig",
              //   url: `https://reach-web-phi.vercel.app/gig/${gigId}`,
              // });
              showSharePopup({
                link: `https://reach-web-phi.vercel.app/partner/${gigId}`,
              });
            }}
            className="bg-info text-white font-medium"
          />
        </div>
      </div>
    </Card>
  );
}

export function ProfileRatingPopupInfo({
  title,
  icon,
  description,
}: {
  title: string;
  icon: JSX.Element;
  description: string;
}) {
  return (
    <div className="flex flex-col space-y-3 items-center justify-start w-full">
      {icon}
      <p className="text-lg font-medium">{title}</p>
      <p className="text-md font-normal text-textsubtle text-center">
        {description}
      </p>
    </div>
  );
}
