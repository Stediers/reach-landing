import { StepData } from "@data/types";
import { Dispatch, SetStateAction } from "react";
import { AiOutlineBars } from "react-icons/ai";
import Setting from "./Setting";
import { showCustomJSXPopup } from "./notifications/Popup";
import { GoArrowSwitch } from "react-icons/go";

export default function Steps({
  steps,
  currentStep,
  setCurrentStep,
  title,
}: {
  steps: StepData[];
  currentStep: StepData;
  setCurrentStep: Dispatch<SetStateAction<StepData>>;
  title: string;
}) {
  return (
    <Setting
      title={currentStep.title}
      subtitle={`Step ${currentStep.index + 1} of ${steps.length}`}
      icon={<GoArrowSwitch className="text-xl" />}
      onClick={() => {
        showCustomJSXPopup({
          jsx: (
            <StepsPopup
              steps={steps}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
            />
          ),
          title: title,
          onOk: () => {},
        });
      }}
    />
  );
}

function StepsPopup({
  steps,
  currentStep,
  setCurrentStep,
}: {
  steps: StepData[];
  currentStep: StepData;
  setCurrentStep: Dispatch<SetStateAction<StepData>>;
}) {
  return (
    <div className="w-full flex flex-col items-center space-y-3">
      {steps.map((step, index) => (
        <div
          className={`w-full flex flex-row items-center justify-between space-x-3 p-3 rounded-md ${
            step.index === currentStep.index ? "bg-info text-white" : ""
          }`}
          key={index}
          onClick={() => {
            setCurrentStep(step);
            localStorage.setItem("step", index.toString());
          }}
        >
          <p className="text-base font-medium">{step.title}</p>
        </div>
      ))}
    </div>
  );
}
