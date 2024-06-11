export default function UnderlinedHeader({
  title,
  align,
  className,
}: {
  title: string;
  align?: "items-start" | "items-center" | "items-end";
  className?: string;
}) {
  return (
    <div className={`w-fit flex flex-col ${align} space-y-1`}>
      <h3
        className={`text-xl lg:text-2xl font-medium first-letter:capitalize ${className} ${
          align === "items-start"
            ? "text-left"
            : align === "items-end"
            ? "text-right"
            : "text-center"
        }`}
      >
        {title}
      </h3>
      <div className="h-px w-[80%] bg-primary ml-1" />
    </div>
  );
}

export function SubUnderlinedHeader({
  title,
  align,
  className,
}: {
  title: string;
  align?: "items-start" | "items-center" | "items-end";
  className?: string;
}) {
  return (
    <div className={`w-fit flex flex-col ${align} space-y-1`}>
      <p
        className={`text-lg lg:text-xl font-medium first-letter:capitalize ${className} ${
          align === "items-start"
            ? "text-left"
            : align === "items-end"
            ? "text-right"
            : "text-center"
        }`}
      >
        {title}
      </p>
      <div className="h-px w-[80%] bg-primary ml-1" />
    </div>
  );
}
