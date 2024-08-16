export default function Card({
  children,
  className = "bg-white",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}) {
  return (
    <div
      className={`p-3 w-full border-[1px] overflow-hidden border-gray rounded-lg flex flex-col space-y-6 ${className} ${
        onClick ? "cursor-pointer" : ""
      }`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
