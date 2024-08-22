import { FetchMyProfileResponse } from "@api_functions/profile/fetch-my-profile";
import CustomerProfileCard from "@components/ProfileCard";
import Setting from "@components/Setting";
import { userMenus } from "@data/menu";
import DesktopWrapper from "@wrapper/responsive/DesktopWrapper";
import Link from "next/link";

export default function Desktop({
  response,
}: {
  response: FetchMyProfileResponse;
}) {
  return (
    <DesktopWrapper
      title="My Profile"
      className="grid grid-cols-3 gap-5 w-full justify-items-start"
    >
      <CustomerProfileCard
        fluentLanguages={[]}
        imageUrl={response.user.imageUrl}
        mobileNumber={response.user.mobileNumber}
        name={response.user.name}
        rating={4}
        className="col-span-1"
      />
      <div className="grid grid-cols-2 gap-5 w-full justify-items-start items-start col-span-2">
        {userMenus.map((menu, index) => (
          <Link key={index} href={menu.path} passHref className="w-full">
            <Setting
              key={index}
              icon={menu.icon}
              subtitle={menu.subtitle}
              title={menu.title}
            />
          </Link>
        ))}
      </div>
    </DesktopWrapper>
  );
}
