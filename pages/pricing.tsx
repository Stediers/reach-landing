import { getCookie } from "@helper_functions/cookie";
import LandingWrapper from "@wrapper/LandingWrapper";
import { State } from "@data/enums";
import { useState, useEffect } from "react";
import AnimatedTabs from "@components/Tabs";
import Button from "@components/Button";
import Checker from "@components/Checker";
import Card from "@components/Card";

export default function Main() {
  const [cookieExists, setCookieExists] = useState(false);
  useEffect(() => {
    const cookie = getCookie("gig-token");
    if (cookie) {
      setCookieExists(true);
    }
  }, []);
  // take user to console if they are logged in
  // useEffect(() => {
  //   const token = getCookie("gig-token");
  //   if (token) {
  //     Router.push("/console");
  //   }
  // });

  // onscroll down hide navbar, onscroll up show navbar

  useEffect(() => {
    // scroll to top of page on load
    window.scrollTo(0, 0);
  }, []);

  const [showNavbar, setShowNavbar] = useState(true);
  const [tabs, setTabs] = useState(["Partner", "Customer"]);
  const [selectedTab, setSelectedTab] = useState("Partner");

  return (
    <LandingWrapper
      title="Reach"
      showFooter={true}
      state={State.SUCCESS}
      className="relative flex flex-col items-center justify-center scroll-smooth lg:p-10 p-5"
      showNavbar={showNavbar}
    >
      <OrganizationSubscription
        advantages={[
          "First premium advantage",
          "Second advantage weekly",
          "Third advantage donate to project",
          "Fourth, access to all components weekly",
        ]}
        discountPercentage={2}
        phoneNumber="+1 (234) 567-8901"
        title="Help us help you"
        key={"organization"}
      />
    </LandingWrapper>
  );
}

interface OrganizationSubscriptionProps {
  title: string;
  discountPercentage: number;
  advantages: string[];
  phoneNumber: string;
}

const OrganizationSubscription: React.FC<OrganizationSubscriptionProps> = ({
  title,
  discountPercentage,
  advantages,
  phoneNumber,
}) => {
  return (
    <div className="w-full flex flex-col items-center justify-start lg:space-y-12">
      <div className="m-auto text-center lg:w-8/12 xl:w-7/12">
        <h2 className="text-2xl text-text font-semibold md:text-4xl">
          {title}
        </h2>
      </div>
      <Card className="lg:mt-12 mt-10 items-center justify-center lg:max-w-[400px] lg:!p-5">
        <h3 className="text-3xl font-semibold text-center">Platform Fee</h3>
        <div>
          <div className="relative flex flex-col items-center justify-center space-y-0">
            <div className="flex items-end space-x-2">
              <span className="text-[5rem] text-gray-700 font-bold">
                {discountPercentage}
              </span>
              <div className="pb-1">
                <span className="block text-[4rem] font-bold">%</span>
              </div>
            </div>
            <span className="text-textsubtle font-medium">(Capped at 800)</span>
          </div>
        </div>
        <ul role="list" className="w-full space-y-4 py-6 m-auto text-gray-600">
          {advantages.map((advantage, index) => (
            <li key={index} className="space-x-2">
              <span className="text-primary font-semibold">&#10003;</span>
              <span>{advantage}</span>
            </li>
          ))}
        </ul>
        <button
          type="submit"
          title="Submit"
          className="block w-full py-3 px-6 text-center rounded-xl transition bg-primary hover:bg-primarydark"
        >
          <span className="text-white font-semibold">Send us an email</span>
        </button>
      </Card>
    </div>
  );
};
