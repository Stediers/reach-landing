import * as motion from "motion/react-client";
import Image from "next/image";
import { Badge } from "@components/ui/badge";
import AppDownload from "@components/DownloadApp";
import LinkButton from "@components/Button";
import { Star, Users } from "lucide-react";

// Animation variants
const containerVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const fadeInUp = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const imageVariants = {
  initial: {
    opacity: 0,
    scale: 0.8,
    x: 100,
  },
  animate: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      delay: 0.4,
    },
  },
};

const badgeVariants = {
  initial: {
    opacity: 0,
    y: -20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

function Hero() {
  const reviews = [
    { store: "App Store", rating: 4.8, count: "200+" },
    { store: "Play Store", rating: 4.7, count: "300+" },
  ];
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={containerVariants}
      className="w-full flex flex-col items-center justify-center space-y-5 relative lg:pt-10 lg:min-h-[50vh] pt-8"
    >
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center items-center justify-center pb-10 space-y-5 w-full px-5 lg:px-10 max-w-7xl">
        <motion.div
          variants={containerVariants}
          className="flex flex-col lg:items-start items-center justify-center space-y-3 lg:space-y-5 w-full z-10 max-w-lg lg:max-w-none"
        >
          <motion.div variants={badgeVariants}>
            <Badge variant="defaultOutline">With Instagram Integration</Badge>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-4xl lg:text-left lg:text-6xl xl:text-6xl font-semibold lg:font-semibold !leading-normal xl:!leading-[5.2rem] text-center"
          >
            <motion.span variants={fadeInUp} className="font-medium">
              Grow your
            </motion.span>
            <br />
            <motion.span variants={fadeInUp} className="font-medium">
              Business with
            </motion.span>
            <br />
            <motion.span variants={fadeInUp} className="font-medium">
              <span className="bg-info px-3 rounded-lg text-white text-3xl lg:text-5xl xl:text-5xl">
                A Free&nbsp;Website
              </span>
            </motion.span>
          </motion.h1>

          <motion.h2
            variants={fadeInUp}
            className="text-md lg:text-left xl:text-xl font-normal xl:leading-relaxed text-textsubtle text-center max-w-md"
          >
            No more
            <span className="text-primary">
              {" "}
              &quot;DM me for details&quot;.{" "}
            </span>
            Get a free website for your business and start getting more clients.
          </motion.h2>

          <motion.div
            variants={fadeInUp}
            className="pt-3 flex flex-col space-y-5 items-center lg:items-start"
          >
            <div className="flex flex-col space-y-3 bg-white">
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-yellow-50 px-3 py-2 rounded-md">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="ml-2 font-semibold lg:text-lg text-base">
                    4.8
                  </span>
                </div>
                <div className="flex items-center bg-gray-50 px-3 py-2 rounded-md">
                  <Users className="w-6 h-6 mr-2" />
                  <span className="text-sm lg:text-base font-medium">
                    500+ Freelancers
                  </span>
                </div>
              </div>
            </div>
            <AppDownload
              triggerJSX={
                <LinkButton
                  link="/download"
                  className="bg-black text-white py-3 px-5 !w-fit text-md font-semibold"
                  text="Download the App"
                />
              }
            />
          </motion.div>
        </motion.div>

        <motion.div className="w-full h-full pt-10 md:h-[30rem] md:w-[30rem] xl:h-[30rem] xl:w-[30rem]">
          <Image
            alt="Hero"
            src="/images/landing-profiles/home.webp"
            className="w-full h-full pt-10 md:h-[30rem] md:w-[30rem] xl:h-[30rem] xl:w-[30rem]"
            width={1000}
            height={900}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Hero;
