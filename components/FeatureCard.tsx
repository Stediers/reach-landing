import { ReactNode } from "react";

export default function FeatureCard({
  icon,
  heading,
  description,
}: {
  icon: ReactNode;
  heading: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 lg:space-y-10">
      {icon}
      <div className="flex flex-col items-center justify-center lg:space-y-5 space-y-3">
        <h3 className="lg:text-3xl text-2xl font-medium text-center">
          {heading}
        </h3>
        <p className="text-lg text-center max-w-[20rem]">{description}</p>
      </div>
    </div>
  );
}
