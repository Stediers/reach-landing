import ListWrapper from "@wrapper/ListWrapper";
import MobileWrapper from "@wrapper/responsive/MobileWrapper";

import Link from "next/link";
import { AiOutlineEdit, AiOutlineLogin, AiOutlineUser } from "react-icons/ai";

import { FetchConsoleGigProfileResponse } from "@api_functions/gig/fetch-console-gig-profile";
import { updateGigAvailability } from "@api_functions/gig/update-gig-availability";
import { eraseCookie } from "@api_functions/internal/cookie";
import LineHeader from "@components/LineHeader";
import Loading from "@components/Loading";
import ProfileCard from "@components/ProfileCard";
import Setting from "@components/Setting";
import { useState } from "react";
import { FaMobileAlt } from "react-icons/fa";
import { MdWork, MdWorkOff } from "react-icons/md";
import { RiUserLocationFill } from "react-icons/ri";
import { showOkPopup, showYesNoPopup } from "@components/notifications/Popup";
import { MdEditLocationAlt } from "react-icons/md";

export default function Mobile({
  gig,
}: {
  gig: FetchConsoleGigProfileResponse | null;
}) {
  return (
    <MobileWrapper
      className="flex flex-col items-center justify-start w-full space-y-5"
      header="Your Profile"
    >
      {gig !== null && (
        <ProfileCard
          name={gig.firstName + " " + gig.lastName}
          imageUrl={gig.imageUrl}
          mobileNumber={gig.mobileNumber}
          rating={gig.rating}
          key={1}
          totalAppointments={gig.totalAppointments}
          ratedAppointments={gig.totalRatedAppointments}
          gigId={gig.gigId}
          designation={gig.designation}
          fluentLanguages={gig.fluentLanguages}
        />
      )}
      {gig !== null ? (
        <div className="flex flex-col items-center justify-start space-y-8 w-full">
          <Menu gig={gig} />
        </div>
      ) : null}
    </MobileWrapper>
  );
}

function Menu({ gig }: { gig: FetchConsoleGigProfileResponse }) {
  const [availableState, setAvailableState] = useState(gig.availability);
  const [loading, setLoading] = useState(false);
  return (
    <ListWrapper>
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
        whileTap={{ scale: 0.95 }}
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
      <Link className="w-full" href="/console/profile/manage-addresses">
        <Setting
          title="My Addresses"
          subtitle="Manage your saved addresses"
          icon={<MdEditLocationAlt className="text-2xl" />}
          whileTap={{ scale: 0.95 }}
        />
      </Link>
      {/* <Setting
        title={gig.isVerified ? "Verified" : "Not Verified"}
        titleColor="text-white"
        icon={
          gig.isVerified ? (
            <BsFillShieldFill className="text-2xl" />
          ) : (
            <BsFillShieldSlashFill className="text-2xl" />
          )
        }
        subtitle={gig.isVerified ? "Your profile is verified" : "Verify now"}
        className={`${gig.isVerified ? "bg-success" : "bg-danger"} text-white`}
      /> */}
      <LineHeader title="Account" />
      <Link className="w-full" href="/console/profile/edit">
        <Setting
          title="Edit Profile"
          subtitle="Edit your profile information"
          icon={<AiOutlineEdit className="text-2xl" />}
          whileTap={{ scale: 0.95 }}
        />
      </Link>
      {/* <Link
        className="w-full"
        href={{
          pathname: "/console/profile/update-mobile-number",
          query: {
            mobileNumber: gig.mobileNumber,
          },
        }}
      >
        <Setting
          title="Change Mobile Number"
          subtitle={gig.mobileNumber}
          icon={<FaMobileAlt className="text-2xl" />}
          whileTap={{ scale: 0.95 }}
        />
      </Link> */}
      {/* <Link
          className="w-full"
          href={{
            pathname: "/console/profile/socials/instagram",
          }}
        >
          <Setting
            title="Connect Instagram"
            subtitle="Connect your Instagram account"
            icon={<AiOutlineInstagram className="text-2xl" />}
            whileTap={{ scale: 0.95 }}
          />
        </Link> */}
      <LineHeader title="Location" />
      <Link
        href={`/console/profile/update-location?state=${gig.location.state}&city=${gig.location.city}`}
        className="w-full"
      >
        <Setting
          title={`${gig.location.state}, ${gig.location.city}`}
          subtitle="Change your location"
          icon={<RiUserLocationFill className="text-2xl" />}
          whileTap={{ scale: 0.95 }}
        />
      </Link>
      <LineHeader title="Critical" />
      <Setting
        title="Log Out"
        titleColor="text-white"
        subtitle="Log out of your account"
        icon={<AiOutlineLogin className="text-2xl text-white" />}
        className="text-white bg-error"
        onClick={() => {
          showYesNoPopup({
            title: "Log Out",
            message: "Are you sure you want to log out?",
            okText: "Log Out",
            cancelText: "Cancel",
          }).then((res) => {
            if (res) {
              eraseCookie("gig-token");
              localStorage.clear();
              window.location.href = "/";
            }
          });
        }}
        whileTap={{ scale: 0.95 }}
      />
    </ListWrapper>
  );
}
