export default function HeaderWrapper({
  title,
  children,
  className,
  underlineClassName = "bg-primary",
  mobileAlign = "start",
  desktopAlign = "start",
  maxWidth = "",
  paddingTopRemove = false,
}: {
  title: JSX.Element | string;
  children: React.ReactNode;
  className?: string;
  underlineClassName?: string;
  mobileAlign?: "center" | "start";
  desktopAlign?: "center" | "start";
  maxWidth?: string;
  paddingTopRemove?: boolean;
}) {
  return (
    <section
      className={`w-full flex flex-col lg:py-10 ${
        paddingTopRemove ? "lg:pt-0" : ""
      } items-center ${className}`}
    >
      <div
        className={`flex flex-col max-w-7xl ${
          mobileAlign === "start" ? "items-start" : "items-center"
        } ${desktopAlign === "start" ? "lg:items-start" : "lg:items-center"}
      justify-center space-y-7 lg:space-y-20 w-full px-5 lg:px-10 ${maxWidth} py-10`}
      >
        <h2 className="text-4xl lg:text-5xl font-medium leading-snug">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}
