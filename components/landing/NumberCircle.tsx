export function NumberCircle({
  number,
  size = "base",
  color = "success",
}: {
  number: number;
  size?: "base" | "lg";
  color?: "success" | "primary" | "danger" | "text";
}) {
  const classes = {
    base: "w-8 h-8 lg:w-10 lg:h-10 text-base lg:text-lg",
    lg: "w-12 h-12 lg:w-16 lg:h-16 text-xl lg:text-2xl",
  };
  const colors = {
    success: "text-success border-success",
    primary: "text-primary border-primary",
    danger: "text-danger border-danger",
    text: "text-text border-text",
  };
  return (
    <div
      className={`${classes[size]} ${colors[color]} border-2 rounded-full flex items-center justify-center shrink-0`}
    >
      <p className="font-medium">{number}</p>
    </div>
  );
}
