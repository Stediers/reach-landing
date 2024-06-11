import { SubUnderlinedHeader } from "@components/UnderlinedHeader";

export default function SubHeadingWrapper({
  children,
  title,
  className = "grid grid-cols-3 gap-5 justify-items-stretch w-full",
}: {
  children: React.ReactNode;
  title: string;
  className?: string;
}) {
  return (
    <div className="flex flex-col space-y-5 w-full">
      <SubUnderlinedHeader title={title} />
      <div className={className}>{children}</div>
    </div>
  );
}
