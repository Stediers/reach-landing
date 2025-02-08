import { ReactNode } from "react";

export default function FeatureCard({
  icon,
  heading,
  description,
  className,
}: {
  icon: ReactNode;
  heading: string;
  description: string;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center space-y-6 lg:space-y-10 ${className}`}
    >
      {icon}
      <div className="flex flex-col items-start justify-center lg:space-y-2 space-y-3">
        <h3 className="lg:text-2xl text-2xl font-medium w-full">{heading}</h3>
        <p className="text-lg lg:text-lg max-w-[20rem]">{description}</p>
      </div>
    </div>
  );
}
