import { FetchConsoleGigProfileResponse } from "@api_functions/gig/fetch-console-gig-profile";
import { updateGigAvailability } from "@api_functions/gig/update-gig-availability";
import Card from "@components/Card";
import ImageComponent from "@components/ImageComponent";
import LineHeader from "@components/LineHeader";
import Loading from "@components/Loading";
import ProfileCard, { ProfileRatingPopupInfo } from "@components/ProfileCard";
import Rating from "@components/Rating";
import Setting from "@components/Setting";
import BarGraph from "@components/graph/BarGraph";
import PieGraph from "@components/graph/PieGraph";
import {
  showCustomJSXPopup,
  showInfoPopup,
} from "@components/notifications/Popup";
import { LetterFrequency } from "@visx/mock-data/lib/mocks/letterFrequency";
import DesktopHeaderWrapper from "@wrapper/responsive/DesktopHeaderWrapper";
import DesktopWrapper from "@wrapper/responsive/DesktopWrapper";
import LinkCard from "@wrapper/responsive/LinkCard";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AiOutlineSetting,
  AiOutlineShareAlt,
  AiFillHome,
  AiFillVideoCamera,
  AiOutlineLogin,
  AiOutlineUser,
  AiFillStar,
} from "react-icons/ai";
import { BsGenderFemale, BsGenderMale, BsGenderTrans } from "react-icons/bs";
import { FaCopy, FaMobileAlt } from "react-icons/fa";
import { GiBowTieRibbon } from "react-icons/gi";
import { HiLocationMarker } from "react-icons/hi";
import { IoLogoFacebook, IoLogoLinkedin, IoLogoWhatsapp } from "react-icons/io";
import { MdWork, MdWorkOff } from "react-icons/md";
import { RiSpeakFill, RiUserLocationFill } from "react-icons/ri";

export default function Desktop({
  gig,
}: {
  gig: FetchConsoleGigProfileResponse;
}) {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const dummyData: LetterFrequency[] = [
    { letter: "Total Appointments", frequency: gig.totalAppointments },
    { letter: "Rated Appointments", frequency: gig.totalRatedAppointments },
  ];
  useEffect(() => {
    const profileGraph = document.getElementById("profile-graph");
    if (profileGraph) {
      setWidth(profileGraph.offsetWidth - 20);
      setHeight(profileGraph.offsetHeight - 27);
    }
  }, []);
  const [availableState, setAvailableState] = useState(gig.availability);
  const [loading, setLoading] = useState(false);
  return (
    <DesktopWrapper
      className="flex flex-col items-center justify-start h-full w-full space-y-10"
      header="Profile"
    >
      <div className="grid grid-cols-5 gap-5 w-full">
        <div className="col-span-2 flex flex-col items-start justify-start space-y-5">
          <Card className="p-5 bg-white min-h-full">
            <div className="flex flex-row items-start justify-start w-full space-x-3">
              {gig.imageUrl != null ? (
                <ImageComponent
                  src={gig.imageUrl}
                  className="rounded-md w-[8rem] h-[8rem] shrink-0"
                  alt="Profile Picture"
                />
              ) : (
                <div className="flex items-center justify-center bg-background rounded-full p-2 shrink-0">
                  <AiOutlineUser className="text-6xl " />
                </div>
              )}
              <div className="flex flex-col items-start justify-start space-y-1 w-full">
                <p className="text-lg font-medium w-full">
                  {gig.firstName + " " + gig.lastName}
                </p>
                <p className="text-base font-normal text-textsubtle">
                  {gig.designation}
                </p>
                <p className="text-base font-normal text-textsubtle">
                  {gig.mobileNumber}
                </p>
              </div>
            </div>
          </Card>
        </div>
        <div
          className="col-span-3 grid grid-cols-2 gap-5 w-full"
          id="profile-graph"
        >
          <Setting
            title="Rating"
            icon={<Rating rating={gig.rating} />}
            subtitle={`From ${gig.totalRatedAppointments} appointments`}
            className="bg-white text-textsubtle"
            onClick={() => {
              showCustomJSXPopup({
                jsx: (
                  <ProfileRatingPopupInfo
                    title="Behaviour Rating"
                    icon={
                      <Rating rating={gig.rating} textClassName="text-lg" />
                    }
                    description="This is your average rating from all your appointments"
                  />
                ),
                onOk: () => {},
              });
            }}
          />
          <Setting
            title={availableState ? "I am available" : "I am not available"}
            icon={
              loading ? (
                <Loading />
              ) : availableState ? (
                <MdWork className="text-2xl " />
              ) : (
                <MdWorkOff className="text-2xl" />
              )
            }
            titleColor="text-white"
            subtitle="Tap to change your availability"
            onClick={async () => {
              setLoading(true);
              const res = await updateGigAvailability();
              if (res) {
                setAvailableState(res.available);
              }
              setLoading(false);
            }}
            className={`${
              availableState ? "bg-success" : "bg-error"
            } text-white cursor-pointer`}
          />
          <Setting
            title="Completed Appointments"
            icon={
              <p className="text-lg text-text font-medium">
                {gig.totalAppointments}
              </p>
            }
            subtitle="Tap to change your availability"
            className="bg-white text-textsubtle"
            hover={false}
          />
          <Setting
            title="Fluent Languages"
            icon={
              <p className="text-lg text-text font-medium">
                {gig.fluentLanguages.length}
              </p>
            }
            subtitle={`Helps you get the right customers`}
            className="bg-white text-textsubtle"
            onClick={() => {
              showCustomJSXPopup({
                jsx: (
                  <ProfileRatingPopupInfo
                    title="Languages"
                    icon={<RiSpeakFill className="w-14 h-14" />}
                    description={gig.fluentLanguages
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
          />
          {/* <Card className="flex !flex-row items-start justify-start !space-x-3 !space-y-0 w-full">
            <div className="flex flex-row items-center justify-start space-x-3">
              <p className="text-lg font-medium">Rating</p>
              <Rating rating={gig.rating} />
            </div>
            <PieGraph
              height={height}
              width={width}
              animate={true}
              data={dummyData}
              range={["#1174D6", "#F472B6"]}
            />
          </Card> */}
        </div>
      </div>
      <DesktopHeaderWrapper title="Manage Profile">
        <div className="grid grid-cols-3 gap-5 w-full">
          <LinkCard
            description="Edit your profile"
            link="/console/profile/edit"
            title="Edit Profile"
          />
          <LinkCard
            title={`${gig.location.state}, ${gig.location.city}`}
            link={`/console/profile/update-location?state=${gig.location.state}&city=${gig.location.city}`}
            description="Change your location"
          />
          <LinkCard
            description="View your profile"
            link={`/profile/${gig.gigId}`}
            title="View Profile"
          />
        </div>
      </DesktopHeaderWrapper>
      <DesktopHeaderWrapper title="Share">
        <div className="grid grid-cols-3 gap-5 w-full">
          <Setting
            subtitle="Send a link of your profile to potential customers"
            onClick={() => {
              showInfoPopup({
                title: "Share",
                message: "Share your profile with your friends",
              });
            }}
            title="WhatsApp"
            icon={
              <IoLogoWhatsapp className="text-3xl text-whatsapp shrink-0" />
            }
          />
          <Setting
            subtitle="Make a post about yourself from the variety of templates we offer"
            icon={
              <IoLogoFacebook className="text-4xl text-facebook shrink-0" />
            }
            title="Facebook"
          />
          <Setting
            subtitle="Share your progress with your network through the variety of templates we offer"
            icon={
              <IoLogoLinkedin className="text-4xl text-linkedin shrink-0" />
            }
            title="LinkedIn"
          />
          <Setting
            subtitle="Copy a link of your profile and share it with your friends"
            icon={<FaCopy className="text-xl" />}
            title="Copy Link"
          />
        </div>
      </DesktopHeaderWrapper>
    </DesktopWrapper>
  );
}
