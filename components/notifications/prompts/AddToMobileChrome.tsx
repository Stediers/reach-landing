import React from "react";

import { FaTimes } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { MdAddToHomeScreen } from "react-icons/md";
import { ImArrowUp } from "react-icons/im";
import Button from "@components/Button";

interface Props {
  closePrompt: () => void;
  doNotShowAgain: () => void;
}

export default function AddToMobileChrome(props: Props) {
  const { closePrompt, doNotShowAgain } = props;

  return (
    <div className="fixed top-5 left-0 right-0 z-50 pt-12 px-4">
      <ImArrowUp className="text-4xl absolute top-[10px] right-[10px] text-info z-10 animate-bounce" />
      <div className="relative bg-white p-4 pt-10 h-full rounded-xl flex flex-col justify-around items-center text-center space-y-10">
        <div className="flex flex-col items-center space-y-4">
          <p className="text-xl font-medium">Make Reach your own</p>
          <p className="text-md">
            For the best experience, we recommend installing the Reach App to
            your home screen!
          </p>
        </div>
        <div className="flex gap-2 items-center text-lg">
          <p>Click the</p>
          <HiDotsVertical className="text-4xl" />
          <p>icon</p>
        </div>
        <div className="flex flex-col gap-4 items-center text-md w-full px-4">
          <p>Scroll down and then click:</p>
          <div className="bg-gray flex space-x-4 justify-center items-center w-full px-4 py-2 rounded-lg">
            <MdAddToHomeScreen className="text-2xl" />
            <p>Add to Home Screen</p>
          </div>
          <Button
            text="Dont show again"
            onClick={doNotShowAgain}
            className="bg-white text-primary"
          />
        </div>
      </div>
    </div>
  );
}
