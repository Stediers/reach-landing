import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import { FetchPartnerResponse } from "@data/types";
import getFullName from "@helper_functions/text/get-full-name";
import Image from "next/image";
import * as motion from "motion/react-client";

export default function People({
  response,
}: {
  response: FetchPartnerResponse[] | null;
}) {
  return (
    <div className="px-5 lg:px-10 max-w-7xl w-full flex flex-col items-center justify-center space-y-8 lg:space-y-16 relative py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center justify-center space-y-2 w-full"
      >
        <p className="text-md lg:text-xl text-center w-full font-semibold text-textsubtle tracking-wide">
          USED BY THESE AMAZING PEOPLE
        </p>
        <p className="text-sm lg:text-base text-center w-full font-medium text-textsubtle tracking-wide">
          Click on one of the profiles to see their website
        </p>
      </motion.div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 w-full">
        {response?.map((partner, index) => (
          <ProfilePopup data={partner} key={partner.handle} index={index} />
        ))}
      </div>
    </div>
  );

  function Profile({
    name,
    image,
    des,
  }: {
    name: string;
    image: string;
    des: string;
  }) {
    return (
      <div className="flex flex-col items-center justify-center space-y-3 lg:space-y-5">
        <div className="w-40 h-40 lg:w-56 lg:h-56 rounded-lg overflow-hidden">
          <Image
            src={image}
            alt={name}
            width={80}
            height={80}
            className="w-full h-full bg-black object-cover"
          />
        </div>
        <div className="flex flex-col items-center justify-center space-y-0 lg:space-y-2">
          <p className="text-lg lg:text-xl font-medium text-center line-clamp-1">
            {name}
          </p>
          <p className="text-sm lg:text-lg font-normal text-textsubtle">
            {des}
          </p>
        </div>
      </div>
    );
  }

  function ProfilePopup({
    data,
    index,
  }: {
    data: FetchPartnerResponse;
    index: number;
  }) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
              scale: 0.95,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            viewport={{
              once: true,
              amount: 0.6,
            }}
            transition={{
              duration: 0.5,
              delay: Math.min(0.1 * index, 0.8),
              type: "spring",
              bounce: 0.2,
            }}
            className="w-full hover:cursor-pointer transition-transform duration-300 hover:scale-105"
          >
            <Profile
              name={getFullName(data.firstName, data.lastName)}
              image={data.imageUrl}
              des={data.designation}
            />
          </motion.div>
        </DialogTrigger>
        <DialogContent className={`!p-0 !m-0 !space-y-0 !gap-y-0 h-[90vh]`}>
          <DialogHeader className="w-full flex flex-col items-start justify-start space-y-2 border-b p-5 h-[10vh]">
            <DialogTitle className="font-medium text-xl first-letter:capitalize">
              {getFullName(data.firstName, data.lastName)}
            </DialogTitle>
            <DialogDescription className="text-sm text-textsubtle">
              {data.designation}
            </DialogDescription>
          </DialogHeader>
          <iframe
            src={`https://reachgig.com/${data.handle}`}
            className="w-full h-[82vh]"
          />
        </DialogContent>
      </Dialog>
    );
  }
}
