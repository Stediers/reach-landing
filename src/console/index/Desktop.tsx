import { FetchConsoleResponse } from "@api_functions/gig/fetch-console";
import Card from "@components/Card";
import Loading from "@components/Loading";
import { menus } from "@data/menu";
import formatLargeNumber from "@helper_functions/text/large-number";
import DesktopHeaderWrapper from "@wrapper/responsive/DesktopHeaderWrapper";
import DesktopWrapper from "@wrapper/responsive/DesktopWrapper";
import Link from "next/link";
import { useState } from "react";
import { FaCaretRight } from "react-icons/fa6";
import { FcDocument, FcOnlineSupport } from "react-icons/fc";
import { IoMdArrowRoundForward } from "react-icons/io";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

export default function Desktop({
  response,
}: {
  response: FetchConsoleResponse;
}) {
  return (
    <DesktopWrapper className="flex flex-col space-y-10 items-start justify-start">
      <DesktopHeaderWrapper title="Analytics">
        <div className="grid grid-cols-3 gap-5 w-full">
          <ViewCard
            title="Profile Views"
            description="This is the number of times your profile has been viewed"
            count={formatLargeNumber(response.profileViews)}
            link="/console/analytic/profile"
          />
          <ViewCard
            title="Service Views"
            description="This is the number of times your services have been viewed"
            count={formatLargeNumber(response.serviceViews)}
            link="/console/analytic/service"
          />
          <ViewCard
            title="Appointments Completed"
            description="This is the number of orders you have received"
            count={formatLargeNumber(response.completedAppointments)}
            link="/console/analytic/appointment"
          />
        </div>
      </DesktopHeaderWrapper>
      <DesktopHeaderWrapper title="Quick Actions">
        <div className="grid grid-cols-3 gap-5 w-full">
          {menus.map((menu) =>
            menu.submenus
              ? menu.submenus.map((submenu) => (
                  <LinkCard
                    title={submenu.title}
                    description={submenu.description}
                    link={submenu.path}
                    key={submenu.title}
                  />
                ))
              : null
          )}
        </div>
      </DesktopHeaderWrapper>
      <DesktopHeaderWrapper title="Support">
        <div className="grid grid-cols-3 gap-5 w-full">
          <LinkCard
            title="Contact Support"
            description="Contact support"
            link="/console/support"
            icon={
              <FcOnlineSupport className="w-7 h-7 group-hover:scale-110 transform transition-all duration-300" />
            }
          />
          <LinkCard
            title="FAQ"
            description="Frequently asked questions"
            link="/console/faq"
            icon={
              <IoChatbubbleEllipsesOutline className="w-7 h-7 group-hover:scale-110 transform transition-all duration-300 text-info" />
            }
          />
          <LinkCard
            title="Terms of Service"
            description="Terms of service"
            link="/console/tos"
            icon={
              <FcDocument className="w-7 h-7 group-hover:scale-110 transform transition-all duration-300" />
            }
          />
        </div>
      </DesktopHeaderWrapper>
    </DesktopWrapper>
  );
}

function LinkCard({
  title,
  description,
  link,
  icon = (
    <IoMdArrowRoundForward className="w-5 h-5 text-textsubtle group-hover:scale-110 transform transition-all duration-300 group-hover:text-text" />
  ),
}: {
  title: string;
  description: string;
  link: string;
  icon?: JSX.Element;
}) {
  const [loading, setLoading] = useState(false);
  return (
    <Link href={link} passHref onClick={() => setLoading(!loading)}>
      <Card className="!px-5 items-center justify-between flex !flex-row space-x-3 !space-y-0 group">
        <div className="flex flex-col space-y-1">
          <p className="text-md font-medium">{title}</p>
          <p className="text-sm text-textsubtle">{description}</p>
        </div>
        {loading ? <Loading className="w-7 h-7" /> : icon}
      </Card>
    </Link>
  );
}

function ViewCard({
  title,
  description,
  count,
  link,
}: {
  title: string;
  description: string;
  count: string;
  link: string;
}) {
  const [loading, setLoading] = useState(false);
  return (
    <Card className="flex flex-col !space-y-2">
      <p className="text-3xl leading-none font-medium">{count}</p>
      <div className="flex flex-col space-y-2 justify-start items-start group hover:cursor-pointer">
        <p className="text-center text-lg font-medium">{title}</p>
        <p className="text-textsubtle">{description}</p>
      </div>
      <Link
        className="flex flex-row space-x-2 items-center w-full group hover:cursor-pointer"
        href={link}
        onClick={() => setLoading(!loading)}
      >
        <p className="text-info">View</p>
        {loading ? (
          <Loading className="w-3 h-3" />
        ) : (
          <FaCaretRight className="text-md text-info group-hover:scale-110 transform transition-all duration-300 group-hover:text-text" />
        )}
      </Link>
    </Card>
  );
}
