import { ServicesScreen } from "@api_functions/service/fetch-services-screen";
import { ServiceType, PreferredGender } from "@data/enums";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  AiOutlineSetting,
  AiOutlineShareAlt,
  AiFillHome,
  AiFillVideoCamera,
} from "react-icons/ai";
import { BsGenderFemale, BsGenderMale, BsGenderTrans } from "react-icons/bs";
import { GiBowTieRibbon } from "react-icons/gi";
import { HiLocationMarker } from "react-icons/hi";
import Button from "./Button";
import Card from "./Card";
import Chip from "./Chip";
import IconWrapper from "./IconWrapper";
import PriceComponent from "./Price";
import Rating from "./Rating";

export default function ServiceCard({
  item,
  showView,
  showRequestFeedback,
  showTopBar = true,
}: {
  item: ServicesScreen;
  showView?: boolean;
  showRequestFeedback?: boolean;
  showTopBar?: boolean;
}) {
  const experienceString =
    new Date().getFullYear() -
      new Date(item.baseData.experience).getFullYear() >
    0
      ? `${
          new Date().getFullYear() -
          new Date(item.baseData.experience).getFullYear()
        } years`
      : `${
          new Date().getMonth() - new Date(item.baseData.experience).getMonth()
        } months`;
  return (
    <Card className="flex flex-col items-center justify-start !space-y-8 w-full">
      <div className="flex flex-col items-center justify-start space-y-3 w-full">
        {showTopBar && (
          <div className="flex flex-row items-center justify-between space-x-2 w-full">
            <Chip
              title={item.baseData.visible ? "Visible" : "Hidden"}
              className={`text-white ${
                item.baseData.visible ? "bg-success" : "bg-error"
              }`}
            />
            <div className="flex flex-row items-center justify-center space-x-3">
              <Link
                href={`/console/services/manage?serviceId=${item.serviceId}`}
              >
                <motion.div whileTap={{ scale: 0.9 }}>
                  <AiOutlineSetting className="text-textsubtle text-xl" />
                </motion.div>
              </Link>
              <motion.div
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  navigator.share({
                    title: `Share your service`,
                    text: `Checkout my service ${item.baseData.title} on Reach`,
                    url: `https://reach-web-phi.vercel.app/service/${item.serviceId}`,
                  });
                }}
              >
                <AiOutlineShareAlt className="text-textsubtle text-xl" />
              </motion.div>
            </div>
          </div>
        )}
        <h2 className="text-lg font-medium first-letter:capitalize text-center">
          {item.baseData.title}
        </h2>
        <div className="flex flex-row items-center justify-center space-x-2 w-full">
          <Rating rating={item.baseData.rating} />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 justify-items-center w-full">
        <IconWrapper
          // title={new Date() - new Date(service.experience) + " years"}
          title={experienceString}
          icon={<GiBowTieRibbon className="text-2xl text-warning" />}
        />
        {item.baseData.serviceType === ServiceType.HOME && (
          <Link href={`/console/profile/manage-addresses`}>
            <IconWrapper
              title={item.location.city || "Somewhere in the world"}
              icon={<AiFillHome className="text-2xl text-info" />}
              whileTap={{ scale: 0.9 }}
            />
          </Link>
        )}
        {item.baseData.serviceType === ServiceType.ONLINE && (
          <IconWrapper
            title="Online"
            icon={<AiFillVideoCamera className="text-2xl text-info" />}
          />
        )}
        {item.baseData.serviceType === ServiceType.OFFLINE && (
          <IconWrapper
            title="Offline"
            icon={<HiLocationMarker className="text-2xl text-info" />}
          />
        )}
        <IconWrapper
          title={
            item.baseData.preferredGender === PreferredGender.FEMALE
              ? "Female"
              : item.baseData.preferredGender === PreferredGender.MALE
              ? "Male"
              : "Unisex"
          }
          icon={
            item.baseData.preferredGender === PreferredGender.FEMALE ? (
              <BsGenderFemale className="text-2xl text-pink-500" />
            ) : item.baseData.preferredGender === PreferredGender.MALE ? (
              <BsGenderMale className="text-2xl text-blue-500" />
            ) : (
              <BsGenderTrans className="text-2xl text-purple-500" />
            )
          }
        />
      </div>
      <div className="self-start px-1 flex flex-col items-start justify-start space-y-4 w-full">
        <Link
          href={`/console/price?serviceId=${item.serviceId}`}
          className="w-full"
        >
          <PriceComponent price={item.price} />
        </Link>
        {/* {item.baseData.totalAppointments > 0 && (
              <PerformanceCard
                ratedAppointments={item.baseData.totalRatedAppointments}
                totalAppointments={item.baseData.totalAppointments}
              />
            )} */}
      </div>
      {showView && showRequestFeedback && (
        <div className="flex flex-col items-start justify-start space-y-3 w-full">
          <div className="flex flex-col items-start justify-start space-y-2 w-full">
            {showView && (
              <Button
                text="View"
                newTab={true}
                link={`https://reach-web-phi.vercel.app/service/${item.serviceId}`}
                className="w-full bg-info text-white py-3 text-base rounded-md text-center font-medium"
              />
            )}
            {showRequestFeedback && (
              <Button
                text="Request Feedback"
                link={`/console/appointments/request-feedback?serviceId=${item.serviceId}&&backLink=/console/services`}
                className="w-full bg-primary text-white py-3 text-base rounded-md text-center font-medium"
              />
            )}
          </div>
        </div>
      )}
    </Card>
  );
}
