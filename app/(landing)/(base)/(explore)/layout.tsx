import * as motion from "motion/react-client";
import { Badge } from "@components/ui/badge";
import { Button } from "@components/ui/button";
import { Designation } from "@data/enums";
import React from "react";

// Animation variants
const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

const fadeScale = {
  initial: { opacity: 0, scale: 0.9 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function ConsoleLayout({ children }: RootLayoutProps) {
  return (
    <div className="w-full flex flex-col justify-start items-center relative !hide-scrollbar">
      <Hero />
      {children}
    </div>
  );
}

function Hero() {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={containerVariants}
      className="w-full flex flex-col items-center justify-center space-y-5 relative lg:pt-10 lg:min-h-[50vh] pt-8"
    >
      {/* Background decoration */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-success/5 rounded-full blur-3xl" />
      </motion.div>

      <div className="flex flex-col lg:justify-between lg:items-center items-center justify-center pb-5 space-y-5 w-full px-5 lg:px-10 max-w-7xl relative z-10">
        <motion.div
          variants={containerVariants}
          className="flex flex-col items-center justify-center space-y-6 lg:space-y-8 w-full max-w-3xl"
        >
          <motion.div variants={fadeScale}>
            <Badge
              variant="successOutline"
              className="px-4 py-2 text-sm shadow-sm hover:shadow-md transition-shadow"
            >
              Safe and Secure
            </Badge>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-4xl lg:text-6xl xl:text-6xl font-medium !leading-normal xl:!leading-[5.2rem] text-center"
          >
            <motion.span variants={fadeInUp} className="font-medium block">
              India&apos;s
            </motion.span>
            <motion.span
              variants={fadeInUp}
              className="bg-primary px-3 py-2 rounded-lg text-white text-3xl lg:text-5xl xl:text-5xl"
            >
              Best Experts
            </motion.span>
            <motion.span variants={fadeInUp} className="block">
              at your service
            </motion.span>
          </motion.h1>

          <motion.h2
            variants={fadeInUp}
            className="text-md lg:text-lg xl:text-xl font-normal xl:leading-relaxed text-textsubtle text-center max-w-2xl"
          >
            Flawless bookings, safe advance payments, and a dedicated support
            team to ensure quality service.
          </motion.h2>

          {/* <motion.div variants={fadeInUp} className="flex gap-4 mt-4">
            <Button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
              Get Started
            </Button>
            <Button
              variant="outline"
              className="px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Learn More
            </Button>
          </motion.div> */}
        </motion.div>
      </div>
    </motion.div>
  );
}
