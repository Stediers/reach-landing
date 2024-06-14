export default function Loading({
  color = "bg-primary",
  className = "w-5 h-5",
  type = "pulse",
}: {
  color?: "bg-primary" | "bg-secondary" | "bg-accent" | "bg-text" | "bg-white";
  className?: string;
  type?: "pulse" | "circle";
}) {
  return type === "circle" ? (
    <div className="flex justify-center items-center flex-col space-y-5">
      <div className="relative inline-flex">
        <div
          className={`${className} border-2 border-b-info rounded-full inline-block animate-spin`}
        ></div>
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center flex-col space-y-5">
      <div className="relative inline-flex">
        <div className={`${className} ${color} rounded-full`}></div>
        <div
          className={`${className} ${color} rounded-full absolute top-0 left-0 animate-ping`}
        ></div>
        <div
          className={`${className} ${color} rounded-full absolute top-0 left-0 animate-pulse`}
        ></div>
      </div>
    </div>
  );
}
