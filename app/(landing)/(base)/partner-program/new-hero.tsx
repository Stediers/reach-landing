import React from "react";
import * as motion from "motion/react-client";
import Image from "next/image";
import { AiFillStar } from "@node_modules/react-icons/ai";

const PaymentHero = () => {
  return (
    <section className="w-full lg:max-w-7xl lg:rounded-3xl bg-white flex flex-col lg:py-20 py-10">
      <div className="flex flex-col items-center justify-center w-full px-5 lg:px-10">
        <div className="flex flex-col lg:flex-row items-center justify-between lg:gap-x-24 gap-y-12 w-full">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:w-1/2"
          >
            <h2 className="text-4xl lg:text-6xl xl:text-6xl font-semibold !leading-normal xl:!leading-[5.2rem]">
              Grow your Business with a Free Website
            </h2>

            <p className="text-md xl:text-xl font-normal xl:leading-relaxed text-textsubtle mt-5">
              Lorem ipsum dolor sit amet consectetur. Amet ullamcorper atsit
              eros risus eget tristique diam imperdiet. Eleifend et porttitor.
            </p>

            <div className="flex gap-4 mt-12 mb-12">
              <button className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl">
                <img
                  src="/api/placeholder/20/20"
                  alt="Apple logo"
                  className="w-5 h-5"
                />
                App Store
              </button>
              <button className="flex items-center gap-2 bg-white border border-gray-200 px-6 py-3 rounded-xl">
                <img
                  src="/api/placeholder/20/20"
                  alt="Google Play logo"
                  className="w-5 h-5"
                />
                Google Play
              </button>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="flex items-center justify-start gap-2 mb-4">
                  <p className="text-4xl lg:text-6xl xl:text-6xl font-semibold">
                    4.8
                  </p>
                  <AiFillStar className="text-yellow-500 text-4xl lg:text-6xl xl:text-6xl" />
                </div>
                <p className="text-md xl:text-xl text-textsubtle">
                  App Store Rating
                </p>
              </div>
              <div>
                <p className="text-4xl lg:text-6xl xl:text-6xl font-semibold mb-4">
                  500+
                </p>
                <p className="text-md xl:text-xl text-textsubtle">
                  Freelancers
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Content */}
          <div className="lg:w-1/2 lg:h-[35rem] justify-center hidden lg:flex">
            <Image
              alt="Hero"
              src="/images/landing-profiles/home.webp"
              className="w-full h-full pt-10 md:h-[30rem] md:w-[30rem] xl:h-[30rem] xl:w-[30rem]"
              width={1000}
              height={900}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentHero;
