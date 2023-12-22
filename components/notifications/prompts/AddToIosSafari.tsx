import React from "react";

import { TbShare2 } from "react-icons/tb";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { FaTimes } from "react-icons/fa";
import { ImArrowDown } from "react-icons/im";
import Button from "@components/Button";

interface Props {
  closePrompt: () => void;
  doNotShowAgain: () => void;
}

export default function AddToIosSafari(props: Props) {
  const { closePrompt, doNotShowAgain } = props;

  return (
    // <div className="fixed bottom-0 left-0 right-0 h-[60%] z-50 pb-12 px-4 text-white">
    //   <div className="relative bg-primary p-4 h-full rounded-xl flex flex-col justify-around items-center text-center">
    //     <button className="absolute top-0 right-0 p-3" onClick={closePrompt}>
    //       <FaTimes className="text-2xl" />
    //     </button>
    //     <p className="text-lg">
    //       For the best experience, we recommend installing the Reach App to your
    //       home screen!
    //     </p>
    //     <div className="flex gap-2 items-center text-lg">
    //       <p>Click the</p>
    //       <TbShare2 className="text-4xl" />
    //       <p>icon</p>
    //     </div>
    //     <div className="flex flex-col gap-2 items-center text-lg w-full px-4">
    //       <p>Scroll down and then click:</p>
    //       <div className="bg-zinc-800 flex justify-between items-center w-full px-4 py-2 rounded-lg">
    //         <p>Add to Home Screen</p>
    //         <AiOutlinePlusSquare className="text-2xl" />
    //       </div>
    //     </div>
    //     <Button
    //       text="Dont show again"
    //       onClick={doNotShowAgain}
    //       className="bg-white text-primary"
    //     />
    //     <ImArrowDown className="text-4xl absolute -bottom-[50px] text-indigo-700 -z-10 animate-bounce" />
    //   </div>
    // </div>
    <div className="fixed bottom-5 left-0 right-0 z-50 pt-12 px-4">
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
          <TbShare2 className="text-4xl" />
          <p>icon</p>
        </div>
        <div className="flex flex-col gap-4 items-center text-md w-full px-4">
          <p>Scroll down and then click:</p>
          <div className="bg-gray flex space-x-4 justify-center items-center w-full px-4 py-2 rounded-lg">
            <AiOutlinePlusSquare className="text-2xl" />
            <p>Add to Home Screen</p>
          </div>
          <Button
            text="Dont show again"
            onClick={doNotShowAgain}
            className="bg-white text-primary"
          />
        </div>
        <ImArrowDown className="text-4xl absolute -bottom-[50px] text-indigo-700 -z-10 animate-bounce" />
      </div>
    </div>
  );
}
