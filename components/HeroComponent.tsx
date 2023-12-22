import Button from "@components/Button";
import Logo from "@components/Logo";
import { motion } from "framer-motion";
import { PropsWithChildren } from "react";

export default function HeroComponent({
  title,
  subTitle,
  children,
}: PropsWithChildren<{
  title: string;
  subTitle: string;
}>) {
  return (
    <motion.div
      className="z-40 w-full flex flex-col items-center justify-start bg-black space-y-6 pt-7 pb-8 rounded-b-3xl sticky top-0"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, staggerChildren: 0.2 }}
    >
      <div className="flex flex-col items-center justify-center space-y-3 px-3">
        <Logo
          text={title}
          textStyle="text-white text-2xl font-medium pt-2"
          wings="w-[11rem]"
        />
        <p className="text-white text-lg font-medium text-center">{subTitle}</p>
      </div>
      {children}
    </motion.div>
  );
}
