export default function LineHeader({
  title,
  titleClassName = "text-sm text-textsubtle font-medium",
  className = "",
}: {
  title: string;
  titleClassName?: string;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-row items-center justify-center space-x-3 w-full ${className}`}
    >
      <div className="h-px bg-gray-300 w-1/2"></div>
      <p className={`${titleClassName} shrink-0 tracking-widest uppercase`}>
        {title}
      </p>
      <div className="h-px bg-gray-300 w-1/2"></div>
    </div>
  );
}
