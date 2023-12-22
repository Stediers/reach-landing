export default function UnderlinedHeader({
  title,
  align,
}: {
  title: string;
  align?: "items-start" | "items-center" | "items-end";
}) {
  return (
    <div className={`w-fit flex flex-col ${align} space-y-1`}>
      <h1 className="text-xl lg:text-xl font-medium text-center first-letter:capitalize">
        {title}
      </h1>
      <div className="h-px w-[80%] bg-primary ml-1" />
    </div>
  );
}
