export default function ListItem({
  title,
  value,
  titleClassName = "text-base font-medium",
  valueClassName = "text-sm",
}: {
  title: string;
  value: string;
  titleClassName?: string;
  valueClassName?: string;
}) {
  return (
    <div className="flex w-full justify-between items-center space-x-5">
      <p className={`${titleClassName} shrink-0`}>{title}</p>
      <div className="h-px bg-gray w-1/2"></div>
      <p className={`${valueClassName} shrink-0`}>{value}</p>
    </div>
  );
}
