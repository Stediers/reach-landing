import React from "react";
import * as motion from "motion/react-client";
import Image from "next/image";
import { Button } from "@components/ui/button";
import AppDownload from "@components/DownloadApp";
import { FaUser } from "@node_modules/react-icons/fa";

interface PageCreationProps {
  title?: string;
  titleHighlight?: string;
  subtitle?: string;
  steps?: Array<{
    number: string;
    title: string;
    description: string;
  }>;
  className?: string;
  buttonText?: string;
  notifications?: Array<{
    isActive?: boolean;
    text: string;
  }>;
  profileData?: {
    name: string;
    handle: string;
    image?: string;
  };
}

export default function PageCreation({
  title = "Creating your page is easy as",
  titleHighlight = "1, 2, 3",
  subtitle = "Start earning $$ by the time you finish reading our website",
  steps = [
    {
      number: "01",
      title: "Create your profile",
      description: "Build your professional presence in minutes",
    },
    {
      number: "02",
      title: "Complete your service catalogue",
      description: "AI-powered tools to optimize your offerings",
    },
    {
      number: "03",
      title: "Start landing elite clients",
      description: "Connect with high-value opportunities",
    },
  ],
  buttonText = "Launch your page Now",
  notifications = [
    { isActive: true, text: "New sale | $30" },
    { isActive: true, text: "A new testimonial" },
    { isActive: false, text: "New booking | $100" },
  ],
  profileData = {
    name: "Rithanya Babu",
    handle: "rithanyamakeover",
    image: "/api/placeholder/100/100",
  },
  className = "",
}: PageCreationProps) {
  return (
    <section
      className={`w-full lg:max-w-7xl lg:rounded-3xl bg-black text-white flex flex-col lg:py-20 py-10 items-center ${className}`}
    >
      <div className="flex flex-col items-center justify-center space-y-12 lg:space-y-20 w-full px-5 lg:px-10">
        <div className="flex flex-col lg:flex-row items-center justify-between lg:gap-x-24 gap-y-12 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:w-1/2"
          >
            <h2 className="text-4xl lg:text-5xl !leading-snug font-medium mb-6">
              {title}&nbsp;
              <span className="text-primary first-letter:capitalize">
                {titleHighlight}
              </span>
            </h2>
            <p className="text-xl mb-8">{subtitle}</p>
            <div className="space-y-8 mt-12">
              {steps.map((step) => (
                <div key={step.number} className="flex items-start gap-4">
                  <span className="text-primary text-lg font-medium align-middle">
                    {step.number}
                  </span>
                  <div>
                    <h3 className="text-xl lg:text-2xl font-medium mb-2">
                      {step.title}
                    </h3>
                    <p className="">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <AppDownload
              triggerJSX={
                <Button variant={"default"} className="mt-8" size={"xl"}>
                  {buttonText}
                </Button>
              }
            />
          </motion.div>

          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:w-1/2"
          >
            <div className="bg-[#FDF5F3] p-6 rounded-3xl relative text-text">
              <div className="bg-white rounded-xl p-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border p-2 bg-white">
                    <FaUser className="w-full h-full text-text" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text">
                      {profileData.name}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      reachgig.com/{profileData.handle}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 mt-4">
                  <div className="h-4 bg-gray-100 rounded w-32"></div>
                  <div className="h-4 bg-gray-100 rounded w-32"></div>
                </div>
              </div>

              <div className="bg-[#E38B5D] p-6 rounded-xl mb-4">
                <div className="text-white text-6xl font-bold">⚡️</div>
              </div>

              <div className="space-y-2">
                {notifications.map((notification, index) => (
                  <div
                    key={index}
                    className={`${
                      notification.isActive ? "bg-white" : "bg-white/50"
                    } rounded-full px-4 py-2 flex items-center gap-2`}
                  >
                    <span
                      className={`w-4 h-4 rounded-full ${
                        notification.isActive ? "bg-primary" : "bg-gray-300"
                      }`}
                    ></span>
                    <span
                      className={notification.isActive ? "" : "text-gray-500"}
                    >
                      {notification.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div> */}
          {/* <video
            autoPlay
            loop
            muted
            playsInline
            className="lg:w-1/2 rounded-3xl"
            src="/vides/landing-video-black.mp4"
          /> */}
          <div className="lg:w-1/2 lg:h-[35rem] justify-center hidden lg:flex">
            <video
              autoPlay
              loop
              muted
              playsInline
              src="/videos/landing-video-black.mp4"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
