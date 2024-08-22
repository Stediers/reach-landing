import { FetchMyProfileResponse } from "@api_functions/profile/fetch-my-profile";
import IconWrapper from "@components/IconWrapper";
import LineHeader from "@components/LineHeader";
import CustomerProfileCard from "@components/ProfileCard";
import Setting from "@components/Setting";
import { userMenus } from "@data/menu";
import MobileWrapper from "@wrapper/responsive/MobileWrapper";
import Link from "next/link";

export default function Mobile({
  response,
}: {
  response: FetchMyProfileResponse;
}) {
  return (
    <MobileWrapper
      header="My Profile"
      className="flex flex-col items-center justify-start space-y-5 w-full"
    >
      <CustomerProfileCard
        fluentLanguages={[]}
        imageUrl={response.user.imageUrl}
        mobileNumber={response.user.mobileNumber}
        name={response.user.name}
        rating={4}
      />

      <LineHeader title="Quick Actions" />
      {userMenus.map((menu, index) => (
        <Link key={index} href={menu.path} passHref className="w-full">
          <Setting
            key={index}
            icon={menu.icon}
            subtitle={menu.subtitle}
            title={menu.title}
            onClick={() => {}}
          />
        </Link>
      ))}
    </MobileWrapper>
  );
}
