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
  subtitle = "Start earning with ReachGig in 3 simple steps",
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
    { isActive: true, text: "New sale | Rs.30" },
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
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`w-full lg:max-w-7xl lg:rounded-3xl bg-black text-white flex flex-col lg:py-20 py-10 items-center ${className}`}
    >
      <div className="flex flex-col items-center justify-center space-y-12 lg:space-y-20 w-full px-5 lg:px-10">
        <div className="flex flex-col lg:flex-row items-center justify-between lg:gap-x-24 gap-y-12 w-full">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-1/2"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl lg:text-5xl !leading-snug font-medium mb-6"
            >
              {title}&nbsp;
              <span className="text-primary first-letter:capitalize">
                {titleHighlight}
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl mb-8"
            >
              {subtitle}
            </motion.p>

            <div className="space-y-8 mt-12">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  <span className="text-primary text-lg font-medium align-middle">
                    {step.number}
                  </span>
                  <div>
                    <h3 className="text-xl lg:text-2xl font-medium mb-2">
                      {step.title}
                    </h3>
                    <p className="">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <AppDownload
                triggerJSX={
                  <Button variant={"default"} className="mt-8" size={"xl"}>
                    {buttonText}
                  </Button>
                }
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:w-1/2 lg:h-[35rem] justify-center hidden lg:flex"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              src="/videos/landing-video-black.mp4"
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
