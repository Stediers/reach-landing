import { ReactNode } from "react";

export default function HeaderWrapper({
  children,
  title,
  bgColor = "bg-white text-text",
  className,
  id,
  showHeader = true,
}: {
  children: ReactNode;
  title: string;
  bgColor?: string;
  className?: string;
  id?: string;
  showHeader?: boolean;
}) {
  return (
    <section id={id} className={`${className} py-16 w-full px-7 ${bgColor}`}>
      {showHeader && (
        <div className="flex flex-col items-center justify-center space-y-2 lg:space-y-4">
          <h2 className="text-3xl lg:text-4xl font-medium text-center first-letter:capitalize">
            {title}
          </h2>
          <div className="h-px w-[80%] bg-primary" />
        </div>
      )}
      {children}
    </section>
  );
}
