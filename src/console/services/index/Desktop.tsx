import { ServicesScreen } from "@api_functions/service/fetch-services-screen";
import Button from "@components/Button";
import Card from "@components/Card";
import Chip from "@components/Chip";
import IconWrapper from "@components/IconWrapper";
import PriceComponent from "@components/Price";
import Rating from "@components/Rating";
import AnimatedTabs from "@components/Tabs";
import { ServiceType, PreferredGender } from "@data/enums";
import { TabData } from "@data/types";
import DesktopWrapper from "@wrapper/responsive/DesktopWrapper";
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

export default function Desktop({ services }: { services: ServicesScreen[] }) {
  return (
    <DesktopWrapper className="grid grid-cols-3 gap-5 w-full" header="Services">
      {services && services.length > 0 ? (
        services.map((item) => <ServiceCard key={item.serviceId} item={item} />)
      ) : (
        <div className="w-full col-span-5 flex flex-col items-center justify-center space-y-3">
          <p className="text-md font-medium">Create a service to get started</p>
          <div className="max-w-[20rem]">
            <Button
              text="Add Service"
              link="/console/services/add-service"
              className="bg-primary text-white font-medium"
            />
          </div>
        </div>
      )}
    </DesktopWrapper>
  );
}

function ServiceCard({ item }: { item: ServicesScreen }) {
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
    <Card className="flex flex-col items-center justify-between !space-y-8 !pb-7 w-full min-h-full">
      <div className="flex flex-col items-center justify-start space-y-8 w-full">
        <div className="flex flex-col items-center justify-start space-y-3 w-full">
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
            <AnalyticsCard
              ratedAppointments={item.baseData.totalRatedAppointments}
              totalAppointments={item.baseData.totalAppointments}
            />
          )} */}
        </div>
      </div>

      <div className="flex flex-row items-start justify-center space-x-2 w-full">
        <Button
          text="View"
          newTab={true}
          link={`https://reach-web-phi.vercel.app/service/${item.serviceId}`}
          className="w-full bg-info text-white py-3 text-base rounded-md text-center font-medium"
        />
        <Button
          text="Request Feedback"
          link={`/console/appointments/request-feedback?serviceId=${item.serviceId}&&backLink=/console/services`}
          className="w-full bg-primary text-white py-3 text-base rounded-md text-center font-medium"
        />
      </div>
    </Card>
  );
}
